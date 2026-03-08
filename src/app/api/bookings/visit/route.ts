import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { buildPriceBreakdown, parseDate, sumActivityPrice } from "@/lib/booking-utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const visitPackageId = String(body?.visitPackageId || "").trim();
    const visitDate = parseDate(body?.visitDate);
    const guests = Number(body?.guests || 0);
    const userId = body?.userId ? String(body.userId) : undefined;
    const activityIds: string[] = Array.isArray(body?.activityIds)
      ? body.activityIds.map((id: unknown) => String(id)).filter(Boolean)
      : [];

    if (!visitPackageId || !visitDate || guests < 1) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "visitPackageId, visitDate and guests are required." } },
        { status: 400 }
      );
    }

    if (activityIds.length < 1) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "At least one activity is required." } },
        { status: 400 }
      );
    }

    const [visitPackage, activities] = await Promise.all([
      prisma.visitPackage.findUnique({ where: { id: visitPackageId } }),
      prisma.activity.findMany({ where: { id: { in: activityIds } } }),
    ]);

    if (!visitPackage) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Visit package not found." } },
        { status: 404 }
      );
    }

    if (activities.length !== activityIds.length) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "One or more selected activities are invalid." } },
        { status: 400 }
      );
    }

    const packageAmount = Math.round(Number(visitPackage.basePrice));
    const activitiesAmount = sumActivityPrice(activities);
    const { totalAmount, taxAmount } = buildPriceBreakdown(packageAmount, activitiesAmount);

    const booking = await prisma.booking.create({
      data: {
        userId,
        bookingType: "VISIT",
        status: "PENDING",
        visitDate,
        guests,
        visitPackageId,
        totalAmount,
        currency: "INR",
        bookingActivities: {
          create: activityIds.map((activityId) => ({ activityId })),
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
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/bookings/visit failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to create visit booking." } },
      { status: 500 }
    );
  }
}
