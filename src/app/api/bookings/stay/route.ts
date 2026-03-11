import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  buildPriceBreakdown,
  calculateNights,
  getAvailableRoomCount,
  parseDate,
  sumActivityPrice,
} from "@/lib/booking-utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const roomTypeId = String(body?.roomTypeId || "").trim();
    const guests = Number(body?.guests || 0);
    const checkIn = parseDate(body?.checkIn);
    const checkOut = parseDate(body?.checkOut);
    const userId = body?.userId ? String(body.userId) : undefined;
    const activityIds: string[] = Array.isArray(body?.activityIds)
      ? body.activityIds.map((id: unknown) => String(id)).filter(Boolean)
      : [];
    const freeActivityIds: string[] = Array.isArray(body?.freeActivityIds)
      ? body.freeActivityIds.map((id: unknown) => String(id)).filter(Boolean)
      : [];

    if (!roomTypeId || !checkIn || !checkOut || guests < 1) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "roomTypeId, checkIn, checkOut and guests are required." } },
        { status: 400 }
      );
    }

    if (checkOut <= checkIn) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "checkOut must be after checkIn." } },
        { status: 400 }
      );
    }

    if (activityIds.length < 2) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "At least two activities are required for stay bookings." } },
        { status: 400 }
      );
    }

    if (freeActivityIds.length !== 2) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "Exactly two complimentary activities are required for stay bookings." } },
        { status: 400 }
      );
    }

    if (new Set(freeActivityIds).size !== freeActivityIds.length) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "Duplicate complimentary activities are not allowed." } },
        { status: 400 }
      );
    }

    if (!freeActivityIds.every((id) => activityIds.includes(id))) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "Complimentary activities must be part of selected activities." } },
        { status: 400 }
      );
    }

    const [roomType, activities] = await Promise.all([
      prisma.roomType.findUnique({ where: { id: roomTypeId } }),
      prisma.activity.findMany({ where: { id: { in: activityIds } } }),
    ]);


    if (!roomType) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Room type not found." } },
        { status: 404 }
      );
    }

    if (activities.length !== activityIds.length) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "One or more selected activities are invalid." } },
        { status: 400 }
      );
    }

    const availableCount = await getAvailableRoomCount({ roomTypeId, checkIn, checkOut });
    if (availableCount < 1) {
      return NextResponse.json(
        {
          error: {
            code: "CONFLICT",
            message: "No rooms available for the selected dates.",
          },
        },
        { status: 409 }
      );
    }


    // select a room for which no booking is done at the required time
    const availableRoom = await prisma.room.findFirst({
      where: {
        roomTypeId,
        roomStatus: "AVAILABLE",
        bookings: {
          none: {
            deletedAt: null,
            bookingType: "STAY",
            status: "CONFIRMED",
            NOT: {
              OR: [
                { checkOut: { lte: checkIn } },
                { checkIn: { gte: checkOut } },
              ],
            },
          },
        },
      },
      orderBy: { roomNo: "asc" },
      select: { id: true },
    });

    if (!availableRoom) {
      return NextResponse.json(
        {
          error: {
            code: "CONFLICT",
            message: "No rooms available for the selected dates.",
          },
        },
        { status: 409 }
      );
    }


    // charges are on night stay basis
    const nights = calculateNights(checkIn, checkOut);
    const roomBaseAmount = Math.round(Number(roomType.basePrice) * nights);
    const additionalActivities = activities.filter((activity) => !freeActivityIds.includes(activity.id));
    const activitiesAmount = sumActivityPrice(additionalActivities);
    const { totalAmount, taxAmount } = buildPriceBreakdown(roomBaseAmount, activitiesAmount);

    const booking = await prisma.booking.create({
      data: {
        userId,
        bookingType: "STAY",
        status: "PENDING",
        roomId: availableRoom.id,
        checkIn,
        checkOut,
        guests,
        paymentStatus : "PENDING",
        totalAmount,
        currency: "INR",
        bookingActivities: {
          create: activityIds.map((activityId) => ({
            activityId,
            type: freeActivityIds.includes(activityId) ? "FREE" : "ADDITIONAL",
          })),
        },
      },
    });

    return NextResponse.json(
      {
        data: {
          bookingId: booking.id,
          type: booking.bookingType,
          status: booking.status,
          paymentStatus: booking.paymentStatus,
          totalAmount: booking.totalAmount,
          taxAmount,
          currency: booking.currency,
          expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/bookings/stay failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to create stay booking." } },
      { status: 500 }
    );
  }
}
