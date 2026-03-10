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
    const activityIds: string[] = Array.isArray(body?.activityIds)
      ? body.activityIds.map((id: unknown) => String(id)).filter(Boolean)
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

    if (activityIds.length < 1) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "At least one activity is required." } },
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
    const available = availableCount > 0;

    const nights = calculateNights(checkIn, checkOut);
    const roomBaseAmount = Math.round(Number(roomType.basePrice) * nights);
    const activitiesAmount = sumActivityPrice(activities);
    const priceBreakdown = buildPriceBreakdown(roomBaseAmount, activitiesAmount);

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
