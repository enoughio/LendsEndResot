// update details of the guest and create an orderId and open getway checkout page

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isStayHoldActive } from "@/lib/booking-utils";
import { ConsentLinkError, linkHouseRulesConsent } from "@/lib/link-consent";
import { createRazorpayOrder, getRazorpayKeys } from "@/lib/payments";
import {
  ONLINE_BOOKING_ENABLED,
  ONLINE_BOOKING_UNAVAILABLE_MESSAGE,
} from "@/lib/service-status";
import type { ConsentPurpose } from "@/lib/house-rules";

type Params = { params: Promise<{ id: string }> };

const HOLD_EXPIRED_MESSAGE = "This room hold has expired. Please choose your dates again.";

class HoldExpiredError extends Error {
  constructor() {
    super(HOLD_EXPIRED_MESSAGE);
    this.name = "HoldExpiredError";
  }
}

function checkoutStillOpen(booking: { status: string; updatedAt: Date; razorPayOrderId: string | null }) {
  return booking.status === "PENDING" && Boolean(booking.razorPayOrderId) && isStayHoldActive(booking.updatedAt);
}

export async function POST(request: Request, { params }: Params) {
  try {
    if (!ONLINE_BOOKING_ENABLED) {
      return NextResponse.json(
        { error: { code: "SERVICE_UNAVAILABLE", message: ONLINE_BOOKING_UNAVAILABLE_MESSAGE } },
        { status: 503 },
      );
    }

    const body = await request.json();
    const { id } = await params;

    const name = String(body?.name || "").trim();
    const phone = String(body?.phone || "").trim();
    const email = String(body?.email || "").trim();
    const specialRequest = String(body?.specialRequest || "").trim();
    const consentId = String(body?.consentId || "").trim();
    const guestListInput = Array.isArray(body?.guestList) ? body.guestList : [];

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "name, email and phone are required." } },
        { status: 400 },
      );
    }

    const existing = await prisma.booking.findFirst({ where: { id, deletedAt: null } });
    if (!existing) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Booking not found." } },
        { status: 404 },
      );
    }

    if (existing.paymentStatus === "PAID") {
      return NextResponse.json(
        { error: { code: "CONFLICT", message: "Booking is already paid." } },
        { status: 409 },
      );
    }

    const maxGuests = Math.max(1, Number(existing.guests || 1));
    const otherGuests = guestListInput
      .map((guest: { name?: string; phone?: string }) => ({
        name: String(guest?.name || "").trim(),
        phone: String(guest?.phone || "").trim(),
      }))
      .filter((guest: { name: string; phone: string }) => guest.name && guest.phone)
      .filter((guest: { name: string; phone: string }) => guest.name !== name || guest.phone !== phone);

    if (otherGuests.length + 1 > maxGuests) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "Guest list cannot include more people than this booking." } },
        { status: 400 },
      );
    }

    const guestList = [{ name, phone }, ...otherGuests];
    const purpose: ConsentPurpose = existing.bookingType === "VISIT" ? "VISIT" : "STAY";

    await prisma.$transaction(async (tx) => {
      const current = await tx.booking.findFirst({ where: { id, deletedAt: null } });
      if (!current) {
        throw new HoldExpiredError();
      }

      if (current.bookingType === "STAY" && current.status !== "CONFIRMED" && current.paymentStatus !== "PAID") {
        const originalHold = current.status === "PENDING" && isStayHoldActive(current.createdAt);
        if (!originalHold) {
          if (current.status === "PENDING" && !checkoutStillOpen(current)) {
            await tx.booking.update({ where: { id }, data: { status: "CANCELLED" } });
          }
          throw new HoldExpiredError();
        }
      }

      const linkedConsent = await tx.houseRulesConsent.findUnique({ where: { bookingId: id } });
      if (!linkedConsent) {
        if (!consentId) {
          throw new ConsentLinkError(400, "BAD_REQUEST", "Please accept the house rules before paying.");
        }
        await linkHouseRulesConsent(tx, { consentId, purpose, bookingId: id });
      }

      await tx.booking.update({
        where: { id },
        data: {
          guestName: name,
          guestEmail: email,
          guestPhone: phone,
          specialRequest,
          guestList,
        },
      });
    });

    const { keyId } = getRazorpayKeys();
    const order = await createRazorpayOrder({
      amountInRupees: Number(existing.totalAmount),
      currency: existing.currency || "INR",
      receipt: `booking_${existing.id}`,
    });

    const saved = await prisma.booking.updateMany({
      where: {
        id,
        deletedAt: null,
        paymentStatus: { not: "PAID" },
        ...(existing.bookingType === "STAY" ? { status: "PENDING" } : {}),
      },
      data: { razorPayOrderId: order.id },
    });

    if (saved.count !== 1) {
      return NextResponse.json(
        { error: { code: "CONFLICT", message: HOLD_EXPIRED_MESSAGE } },
        { status: 409 },
      );
    }

    return NextResponse.json({
      data: {
        bookingId: id,
        detailsSaved: true,
        payment: {
          provider: "razorpay",
          keyId,
          name: "Land's End",
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          bookingId: id,
          guest: {
            name,
            email,
            phone,
          },
        },
      },
    });
  } catch (error) {
    if (error instanceof HoldExpiredError) {
      return NextResponse.json(
        { error: { code: "CONFLICT", message: error.message } },
        { status: 409 },
      );
    }
    if (error instanceof ConsentLinkError) {
      return NextResponse.json(
        { error: { code: error.code, message: error.message } },
        { status: error.status },
      );
    }
    console.error("POST /api/bookings/:id/pay failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to initiate payment." } },
      { status: 500 },
    );
  }
}
