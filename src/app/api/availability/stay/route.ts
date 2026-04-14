import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  buildPriceBreakdown,
  calculateNights,
  getAvailableRoomCount,
  parseDate,
} from "@/lib/booking-utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const roomTypeId = String(body?.roomTypeId || "").trim();
    const guests = Number(body?.guests || 0);
    const checkIn = parseDate(body?.checkIn);
    const checkOut = parseDate(body?.checkOut);
    const mealPlanId = body?.mealPlanId ? String(body.mealPlanId) : null;

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

    const [roomType, mealPlan] = await Promise.all([
      prisma.roomType.findUnique({ where: { id: roomTypeId } }),
      mealPlanId
        ? prisma.mealPlan.findUnique({ where: { id: mealPlanId } })
        : prisma.mealPlan.findFirst({ where: { isActive: true }, orderBy: { createdAt: "desc" } }),
    ]);

    if (!roomType) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Room type not found." } },
        { status: 404 }
      );
    }

    if (!mealPlan || !mealPlan.isActive) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Meal plan not available." } },
        { status: 404 }
      );
    }

    if (guests > roomType.capacity) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "Guests exceed max occupancy for this room type." } },
        { status: 400 }
      );
    }

    const availableCount = await getAvailableRoomCount({ roomTypeId, checkIn, checkOut });
    const available = availableCount > 0;

    const nights = calculateNights(checkIn, checkOut);
    const roomBaseAmount = Math.round(Number(roomType.basePrice) * nights);
    const extraGuestCount = Math.max(0, guests - Number(roomType.baseOccupancy || 0));
    const extraGuestAmount = Math.round(Number(roomType.extraPersonPrice || 0) * extraGuestCount * nights);
    const mealPlanAmount = Math.round(Number(mealPlan.pricePerPerson || 0) * guests * nights);
    const priceBreakdown = buildPriceBreakdown({
      baseAmount: roomBaseAmount,
      mealPlanAmount,
      extraGuestAmount,
    });

    return NextResponse.json({
      data: {
        available,
        availableCount,
        priceBreakdown,
      },
    });
  } catch (error) {
    console.error("POST /api/availability/stay failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to check availability." } },
      { status: 500 }
    );
  }
}
