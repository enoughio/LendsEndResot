
// update details of the guest and create an orderId

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

import Razorpay from "razorpay"; 



type Params = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: Params) {

try {

  const body = await request.json()

    const name = String(body?.name || "").trim();
    const phone = String(body?.phone || "").trim();
    const email = String(body?.email || "").trim()
    const id = String(body?.id || "").trim()
    const specialRequest = String(body?.specialRequest || "").trim()


    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "name, email and phone are required." } },
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

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_SECRET_KEY;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: { code: "CONFIG_ERROR", message: "Payment gateway keys are not configured." } },
        { status: 500 }
      );
    }

    const instance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const amount = Math.round(Number(existing.totalAmount));
    const order = await instance.orders.create({
      amount,
      currency: existing.currency || "INR",
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
