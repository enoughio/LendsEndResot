import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import {
  RoomsUnavailableError,
  activeStayOverlapWhere,
  calculateNights,
  getAvailableRoomCount,
  parseDate,
  stayHoldExpiry,
  unblockedDuringStayWhere,
} from "@/lib/booking-utils";
import {
  ONLINE_BOOKING_ENABLED,
  ONLINE_BOOKING_UNAVAILABLE_MESSAGE,
} from "@/lib/service-status";
import { mealTierFromPlanName, mealTierLabel, quoteStay, stayOccupancyError } from "@/lib/stay-pricing";

type HeldStayInput = {
  userId?: string;
  roomTypeId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  roomsNeeded: number;
  totalAmount: number;
  mealPlanId: string | null;
  mealPlanName: string;
  extraGuestCount: number;
  extraGuestPrice: number;
  quotedRoomAmount: number;
  quotedExtraGuestAmount: number;
};

function isSerializationConflict(error: unknown) {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2034";
}

async function createHeldStay(input: HeldStayInput) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      return await prisma.$transaction(
        async (tx) => {
          const availableCount = await getAvailableRoomCount(
            { roomTypeId: input.roomTypeId, checkIn: input.checkIn, checkOut: input.checkOut },
            tx,
          );
          if (availableCount < input.roomsNeeded) {
            throw new RoomsUnavailableError(availableCount, input.roomsNeeded);
          }

          const availableRoom = await tx.room.findFirst({
            where: {
              roomTypeId: input.roomTypeId,
              roomStatus: "AVAILABLE",
              bookings: { none: activeStayOverlapWhere(input.checkIn, input.checkOut) },
              ...unblockedDuringStayWhere(input.checkIn, input.checkOut),
            },
            orderBy: { roomNo: "asc" },
            select: { id: true },
          });

          if (!availableRoom) {
            throw new RoomsUnavailableError(0, input.roomsNeeded);
          }

          return tx.booking.create({
            data: {
              ...(input.userId ? { user: { connect: { id: input.userId } } } : {}),
              bookingType: "STAY",
              status: "PENDING",
              room: { connect: { id: availableRoom.id } },
              checkIn: input.checkIn,
              checkOut: input.checkOut,
              guests: input.guests,
              roomsBooked: input.roomsNeeded,
              paymentStatus: "PENDING",
              totalAmount: input.totalAmount,
              currency: "INR",
              ...(input.mealPlanId ? { mealPlan: { connect: { id: input.mealPlanId } } } : {}),
              mealPlanName: input.mealPlanName,
              mealPlanPrice: 0,
              extraGuestCount: input.extraGuestCount,
              extraGuestPrice: input.extraGuestPrice,
              quotedRoomAmount: input.quotedRoomAmount,
              quotedMealAmount: 0,
              quotedExtraGuestAmount: input.quotedExtraGuestAmount,
            },
          });
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
      );
    } catch (error) {
      if (error instanceof RoomsUnavailableError || !isSerializationConflict(error) || attempt === 2) {
        throw error;
      }
    }
  }

  throw new RoomsUnavailableError(0, input.roomsNeeded);
}

export async function POST(request: Request) {
  try {
    if (!ONLINE_BOOKING_ENABLED) {
      return NextResponse.json(
        { error: { code: "SERVICE_UNAVAILABLE", message: ONLINE_BOOKING_UNAVAILABLE_MESSAGE } },
        { status: 503 },
      );
    }

    const body = await request.json();
    const roomTypeId = String(body?.roomTypeId || "").trim();
    const guests = Number(body?.guests || 0);
    const roomsRequested = Math.max(1, Number(body?.roomsRequested || 1));
    const checkIn = parseDate(body?.checkIn);
    const checkOut = parseDate(body?.checkOut);
    const userId = body?.userId ? String(body.userId) : undefined;
    const mealPlanId = body?.mealPlanId ? String(body.mealPlanId) : null;
    const mealPlanNameInput = String(body?.mealPlanName || "").trim();

    if (!roomTypeId || !checkIn || !checkOut || guests < 1) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "roomTypeId, checkIn, checkOut and guests are required." } },
        { status: 400 },
      );
    }

    if (checkOut <= checkIn) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "checkOut must be after checkIn." } },
        { status: 400 },
      );
    }

    const roomType = await prisma.roomType.findUnique({ where: { id: roomTypeId } });
    if (!roomType) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Room type not found." } },
        { status: 404 },
      );
    }

    let mealPlan = mealPlanId ? await prisma.mealPlan.findUnique({ where: { id: mealPlanId } }) : null;
    if (mealPlanId && !mealPlan) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Meal plan not found." } },
        { status: 404 },
      );
    }
    if (!mealPlan && mealPlanNameInput) {
      mealPlan = await prisma.mealPlan.findFirst({
        where: { name: { equals: mealPlanNameInput, mode: "insensitive" } },
      });
    }

    const tierName = mealPlan?.name || mealPlanNameInput;
    if (!tierName) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "Select a meal plan." } },
        { status: 400 },
      );
    }

    const tier = mealTierFromPlanName(tierName);
    const nights = calculateNights(checkIn, checkOut);
    const quote = quoteStay({
      room: roomType,
      tier,
      guests,
      roomsRequested,
      nights,
    });

    const occupancyError = stayOccupancyError(roomType, guests, quote.roomsNeeded);
    if (occupancyError) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: occupancyError } },
        { status: 400 },
      );
    }

    const booking = await createHeldStay({
      userId,
      roomTypeId,
      checkIn,
      checkOut,
      guests,
      roomsNeeded: quote.roomsNeeded,
      totalAmount: quote.totalAmount,
      mealPlanId: mealPlan?.id ?? null,
      mealPlanName: mealTierLabel(tier),
      extraGuestCount: quote.extraGuestCount,
      extraGuestPrice: quote.extraGuestPrice,
      quotedRoomAmount: quote.quotedRoomAmount,
      quotedExtraGuestAmount: quote.quotedExtraGuestAmount,
    });

    return NextResponse.json(
      {
        data: {
          bookingId: booking.id,
          type: booking.bookingType,
          status: booking.status,
          paymentStatus: booking.paymentStatus,
          totalAmount: booking.totalAmount,
          taxAmount: quote.taxAmount,
          convenienceFeeAmount: quote.convenienceFeeAmount,
          currency: booking.currency,
          expiresAt: stayHoldExpiry(booking.createdAt).toISOString(),
        },
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof RoomsUnavailableError) {
      return NextResponse.json(
        {
          error: { code: "CONFLICT", message: error.message },
          data: { availableCount: error.availableCount, roomsNeeded: error.roomsNeeded },
        },
        { status: 409 },
      );
    }
    console.error("POST /api/bookings/stay failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to create stay booking." } },
      { status: 500 },
    );
  }
}
