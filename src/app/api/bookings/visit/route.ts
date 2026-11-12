import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { parseDate } from "@/lib/booking-utils";
import {
  ONLINE_BOOKING_ENABLED,
  ONLINE_BOOKING_UNAVAILABLE_MESSAGE,
} from "@/lib/service-status";
import { quoteVisit } from "@/lib/stay-pricing";

export async function POST(request: Request) {
  try {
    if (!ONLINE_BOOKING_ENABLED) {
      return NextResponse.json(
        { error: { code: "SERVICE_UNAVAILABLE", message: ONLINE_BOOKING_UNAVAILABLE_MESSAGE } },
        { status: 503 },
      );
    }

    const body = await request.json();
    const visitPackageId = String(body?.visitPackageId || "").trim();
    const visitDate = parseDate(body?.visitDate);
    const guests = Number(body?.guests || 0);
    const userId = body?.userId ? String(body.userId) : undefined;

    if (!visitPackageId || !visitDate || guests < 1) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "visitPackageId, visitDate and guests are required." } },
        { status: 400 },
      );
    }

    const visitPackage = await prisma.visitPackage.findUnique({ where: { id: visitPackageId } });
    if (!visitPackage || visitPackage.status !== "ACTIVE") {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Visit package not found." } },
        { status: 404 },
      );
    }

    const quote = quoteVisit(Number(visitPackage.basePrice), guests);

    const booking = await prisma.booking.create({
      data: {
        userId,
        bookingType: "VISIT",
        status: "PENDING",
        paymentStatus: "PENDING",
        visitDate,
        guests,
        visitPackageId,
        totalAmount: quote.totalAmount,
        currency: "INR",
        mealPlanId: null,
        mealPlanName: null,
        mealPlanPrice: 0,
        quotedRoomAmount: quote.quotedRoomAmount,
        quotedMealAmount: 0,
        quotedExtraGuestAmount: 0,
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
          taxAmount: quote.taxAmount,
          convenienceFeeAmount: quote.convenienceFeeAmount,
          currency: booking.currency,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/bookings/visit failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to create visit booking." } },
      { status: 500 },
    );
  }
}
