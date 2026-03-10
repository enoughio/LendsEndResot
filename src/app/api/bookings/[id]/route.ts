import { NextResponse } from "next/server";
import type { BookingActivity } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const booking = await prisma.booking.findFirst({
      where: { id, deletedAt: null },
      include: {
        room: {
          include: {
            roomType: true,
          },
        },
        visitPackage: true,
        bookingActivities: {
          include: {
            activity: true,
          },
        },
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Booking not found." } },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: {
        bookingId: booking.id,
        type: booking.bookingType,
        status: booking.status,
        paymentStatus: booking.paymentStatus,
        guestDetails: {
          name: booking.guestName,
          email: booking.guestEmail,
          phone: booking.guestPhone,
        },
        stayDetails:
          booking.bookingType === "STAY"
            ? {
                roomType: booking.room?.roomType?.name ?? null,
                roomNo: booking.room?.roomNo ?? null,
                checkIn: booking.checkIn,
                checkOut: booking.checkOut,
              }
            : null,
        visitDetails:
          booking.bookingType === "VISIT"
            ? {
                packageName: booking.visitPackage?.name ?? null,
                visitDate: booking.visitDate,
              }
            : null,
        activities: booking.bookingActivities.map((bookingActivity: BookingActivity & { activity: { id: string; name: string; price: number } }) => ({
          id: bookingActivity.activity.id,
          name: bookingActivity.activity.name,
          price: Number(bookingActivity.activity.price),
        })),
        paymentDetails: {
          totalAmount: booking.totalAmount,
          paidAmount: booking.paymentStatus === "PAID" ? booking.totalAmount : 0,
          paymentStatus: booking.paymentStatus,
        },
      },
    });
  } catch (error) {
    console.error("GET /api/bookings/:id failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to fetch booking details." } },
      { status: 500 }
    );
  }
}
