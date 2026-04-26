// Return a computed bill for a particular booking.

import prisma from "@/lib/prisma";
import { calculateNights } from "@/lib/booking-utils";
import { NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  try {
    const { id } = await params;

    const booking = await prisma.booking.findFirst({
      where: {
        id: id,
                deletedAt: null,
      },
            select: {
                bookingType: true,
                checkIn: true,
                checkOut: true,
                guests: true,
                roomsBooked: true,
                mealPlanName: true,
                mealPlanPrice: true,
                extraGuestCount: true,
                extraGuestPrice: true,
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
                { status: 404 }
            );
    }

                const roomBasePrice = Number(booking.room?.roomType?.basePrice || 0);
                const packageBasePrice = Number(booking.visitPackage?.basePrice || 0);
                const guests = Number(booking.guests || 1);
                const roomsBooked = Number(booking.roomsBooked || 1);
                const mealPlanRate = Number(booking.mealPlanPrice || 0);

        const nights =
            booking.bookingType === "STAY" && booking.checkIn && booking.checkOut
                ? calculateNights(new Date(booking.checkIn), new Date(booking.checkOut))
                : 0;

                const roomCharges = booking.bookingType === "STAY" ? roomBasePrice * nights * roomsBooked : 0;
                const packageCharges = booking.bookingType === "VISIT" ? packageBasePrice * guests : 0;
                const mealPlanAmount = booking.bookingType === "STAY"
                    ? mealPlanRate * guests * nights
                    : mealPlanRate * guests;
                const extraGuestAmount = booking.bookingType === "STAY"
                    ? Number(booking.extraGuestCount || 0) * Number(booking.extraGuestPrice || 0) * nights
                    : 0;

        const activityList = booking.bookingActivities.map((item) => ({
            id: item.activity.id,
            name: item.activity.name,
            price: Number(item.activity.price || 0),
            type: item.type,
        }));

        const complimentaryActivities = activityList.filter((a) => a.type === "FREE");
        const additionalActivities = activityList.filter((a) => a.type === "ADDITIONAL");
        const additionalActivitiesAmount = additionalActivities.reduce((sum, a) => sum + a.price, 0);

        const subTotal = roomCharges + packageCharges + mealPlanAmount + extraGuestAmount + additionalActivitiesAmount;
        const taxAmount = Math.round(subTotal * 0.05);
        const totalAmount = subTotal + taxAmount;

    const billData = {
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
            totalAmount,
            currency: "INR",
        };

        console.log(billData)

        return NextResponse.json({ data: billData });
    } catch (error) {
        console.error("GET /api/bookings/:id/bill failed", error);
        return NextResponse.json(
            { error: { code: "INTERNAL_ERROR", message: "Failed to calculate booking bill." } },
            { status: 500 }
        );
    }
}
