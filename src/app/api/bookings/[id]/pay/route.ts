
// update details of the guest and create an orderId and open getway checkout page 

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createRazorpayOrder, getRazorpayKeys } from "@/lib/payments";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: Params) {
  try {
    const body = await request.json();
    const { id } = await params;

    const name = String(body?.name || "").trim();
    const phone = String(body?.phone || "").trim();
    const email = String(body?.email || "").trim();
    const specialRequest = String(body?.specialRequest || "").trim();

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "name, email and phone are required." } },
        { status: 400 }
      );
    }

    const existing = await prisma.booking.findFirst({ where: { id, deletedAt: null } });
    if (!existing) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Booking not found." } },
        { status: 404 }
      );
    }

    if (existing.paymentStatus === "PAID") {
      return NextResponse.json(
        { error: { code: "CONFLICT", message: "Booking is already paid." } },
        { status: 409 }
      );
    }

    const { keyId } = getRazorpayKeys();
    const order = await createRazorpayOrder({
      amountInRupees: Number(existing.totalAmount ),
      currency: existing.currency  || "INR",
      receipt: `booking_${existing.id}`,
    });

    const booking = await prisma.booking.update({
      where: { id },
      data: {
        guestName: name,
        guestEmail: email,
        guestPhone: phone,
        specialRequest,
        razorPayOrderId: order.id,
      },
    });

    return NextResponse.json({
      data: {
        bookingId: booking.id,
        detailsSaved: true,
        payment: {
          provider: "razorpay",
          keyId,
          name: "Lend's End",
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          bookingId: booking.id,
          guest: {
            name,
            email,
            phone,
          },
        },
      },
    });
  } catch (error) {
    console.error("POST /api/bookings/:id/pay failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to initiate payment." } },
      { status: 500 }
    );
  }
}
