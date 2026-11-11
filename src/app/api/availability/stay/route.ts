import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { calculateNights, getAvailableRoomCount, parseDate, roomsLeftMessage } from "@/lib/booking-utils";
import { mealTierFromPlanName, quoteStay, stayOccupancyError } from "@/lib/stay-pricing";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const roomTypeId = String(body?.roomTypeId || "").trim();
    const guests = Number(body?.guests || 0);
    const roomsRequested = Math.max(1, Number(body?.roomsRequested || 1));
    const checkIn = parseDate(body?.checkIn);
    const checkOut = parseDate(body?.checkOut);
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

    const nights = calculateNights(checkIn, checkOut);
    const quote = quoteStay({
      room: roomType,
      tier: mealTierFromPlanName(tierName),
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

    const availableCount = await getAvailableRoomCount({ roomTypeId, checkIn, checkOut });
    const available = availableCount >= quote.roomsNeeded;

    if (!available) {
      return NextResponse.json(
        {
          error: {
            code: "CONFLICT",
            message: roomsLeftMessage(availableCount, quote.roomsNeeded),
          },
          data: {
            available: false,
            availableCount,
            roomsNeeded: quote.roomsNeeded,
          },
        },
        { status: 409 },
      );
    }

    return NextResponse.json({
      data: {
        available,
        availableCount,
        roomsNeeded: quote.roomsNeeded,
        priceBreakdown: quote,
      },
    });
  } catch (error) {
    console.error("POST /api/availability/stay failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to check availability." } },
      { status: 500 },
    );
  }
}
