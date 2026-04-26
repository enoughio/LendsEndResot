import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { buildPriceBreakdown, parseDate } from "@/lib/booking-utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const visitPackageId = String(body?.visitPackageId || "").trim();
    const visitDate = parseDate(body?.visitDate);
    const guests = Number(body?.guests || 0);
    const userId = body?.userId ? String(body.userId) : undefined;
    const mealPlanId = body?.mealPlanId ? String(body.mealPlanId) : null;

    if (!visitPackageId || !visitDate || guests < 1) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "visitPackageId, visitDate and guests are required." } },
        { status: 400 }
      );
    }

    // find visit package and active meal plan
    const [visitPackage, mealPlan] = await Promise.all([
      prisma.visitPackage.findUnique({ where: { id: visitPackageId } }),
      mealPlanId
        ? prisma.mealPlan.findUnique({ where: { id: mealPlanId } })
        : prisma.mealPlan.findFirst({ where: { isActive: true }, orderBy: { createdAt: "desc" } }),
    ]);


    if (!visitPackage) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Visit package not found." } },
        { status: 404 }
      );
    }

    if (!mealPlan || !mealPlan.isActive) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Meal plan not available." } },
        { status: 404 }
      );
    }
     
    // later add promocode and discount options
    const packageAmount = Math.round(Number(visitPackage.basePrice));
    const baseAmount = packageAmount * guests;
    const mealPlanAmount = Math.round(Number(mealPlan.pricePerPerson || 0) * guests);
    const { totalAmount, taxAmount } = buildPriceBreakdown({
      baseAmount,
      mealPlanAmount,
      extraGuestAmount: 0,
    });


    // create a pending booking 
    const booking = await prisma.booking.create({
      data: {
        userId,
        bookingType: "VISIT",
        status: "PENDING",
        paymentStatus : "PENDING",
        visitDate,
        guests,
        visitPackageId,
        totalAmount,
        currency: "INR",
        mealPlanId: mealPlan.id,
        mealPlanName: mealPlan.name,
        mealPlanPrice: Number(mealPlan.pricePerPerson || 0),
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
