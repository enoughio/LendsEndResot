import prisma from "@/lib/prisma";
import { calculateConvenienceFee, calculateNights, stayHoldExpiry } from "@/lib/booking-utils";
import { NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  try {
    const { id } = await params;

    const booking = await prisma.booking.findFirst({
      where: { id, deletedAt: null },
      select: {
        bookingType: true,
        createdAt: true,
        checkIn: true,
        checkOut: true,
        guests: true,
        roomsBooked: true,
        mealPlanName: true,
        mealPlanPrice: true,
        extraGuestCount: true,
        extraGuestPrice: true,
        quotedRoomAmount: true,
        quotedMealAmount: true,
        quotedExtraGuestAmount: true,
        visitPackage: {
          select: {
            basePrice: true,
            maxActivity: true,
          },
        },
        room: {
          select: {
            roomType: {
              select: {
                basePrice: true,
              },
            },
          },
        },
        bookingActivities: {
          select: {
            type: true,
            activity: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
          },
        },
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Booking not found" } },
        { status: 404 },
      );
    }

    const guests = Number(booking.guests || 1);
    const roomsBooked = Number(booking.roomsBooked || 1);
    const nights =
      booking.bookingType === "STAY" && booking.checkIn && booking.checkOut
        ? calculateNights(new Date(booking.checkIn), new Date(booking.checkOut))
        : 0;

    let roomCharges = 0;
    let packageCharges = 0;
    let mealPlanAmount = 0;
    let extraGuestAmount = 0;

    if (booking.quotedRoomAmount != null) {
      if (booking.bookingType === "STAY") {
        roomCharges = Number(booking.quotedRoomAmount);
      } else {
        packageCharges = Number(booking.quotedRoomAmount);
      }
      mealPlanAmount = Number(booking.quotedMealAmount || 0);
      extraGuestAmount = Number(booking.quotedExtraGuestAmount || 0);
    } else {
      const roomBasePrice = Number(booking.room?.roomType?.basePrice || 0);
      const packageBasePrice = Number(booking.visitPackage?.basePrice || 0);
      const mealPlanRate = Number(booking.mealPlanPrice || 0);
      roomCharges = booking.bookingType === "STAY" ? roomBasePrice * nights * roomsBooked : 0;
      packageCharges = booking.bookingType === "VISIT" ? packageBasePrice * guests : 0;
      mealPlanAmount =
        booking.bookingType === "STAY" ? mealPlanRate * guests * nights : mealPlanRate * guests;
      extraGuestAmount =
        booking.bookingType === "STAY"
          ? Number(booking.extraGuestCount || 0) * Number(booking.extraGuestPrice || 0) * nights
          : 0;
    }

    const activityList = booking.bookingActivities.map((item) => ({
      id: item.activity.id,
      name: item.activity.name,
      price: Number(item.activity.price || 0),
      type: item.type,
    }));

    const complimentaryActivities = activityList.filter((activity) => activity.type === "FREE");
    const additionalActivities = activityList.filter((activity) => activity.type === "ADDITIONAL");
    const additionalActivitiesAmount = additionalActivities.reduce((sum, activity) => sum + activity.price, 0);

    const subTotal = roomCharges + packageCharges + mealPlanAmount + extraGuestAmount + additionalActivitiesAmount;
    const taxAmount = Math.round(subTotal * 0.05);
    const convenienceFeeAmount = calculateConvenienceFee(subTotal);
    const totalAmount = subTotal + taxAmount + convenienceFeeAmount;

    return NextResponse.json({
      data: {
        bookingType: booking.bookingType,
        expiresAt: booking.bookingType === "STAY" ? stayHoldExpiry(booking.createdAt).toISOString() : null,
        roomCharges,
        packageCharges,
        roomsBooked,
        guests,
        mealPlanName: booking.mealPlanName,
        mealPlanAmount,
        extraGuestAmount,
        complimentaryActivityCount: complimentaryActivities.length,
        complimentaryActivities,
        additionalActivities,
        additionalActivitiesAmount,
        subTotal,
        taxAmount,
        convenienceFeeAmount,
        totalAmount,
        currency: "INR",
      },
    });
  } catch (error) {
    console.error("GET /api/bookings/:id/bill failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Failed to calculate booking bill." } },
      { status: 500 },
    );
  }
}
