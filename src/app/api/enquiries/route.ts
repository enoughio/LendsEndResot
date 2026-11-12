import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { parseDate } from "@/lib/booking-utils";
import { sendBookingEnquiryEmail } from "@/lib/enquiry-email";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const kind = String(body?.kind || "").trim().toUpperCase();
    const contactName = String(body?.contactName || "").trim();
    const email = String(body?.email || "").trim();
    const phone = String(body?.phone || "").trim();
    const preferredDate = parseDate(body?.preferredDate);
    const organization = String(body?.organization || "").trim();
    const natureOfRetreat = String(body?.natureOfRetreat || "").trim();
    const expectedParticipants = Number(body?.expectedParticipants || 0);
    const groupTypeRaw = String(body?.groupType || "").trim().toUpperCase();

    if (kind !== "RETREAT" && kind !== "GROUP") {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "Enquiry kind must be retreat or group." } },
        { status: 400 },
      );
    }

    if (contactName.length < 2 || !isEmail(email) || phone.replace(/\D/g, "").length < 8 || !preferredDate) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "Name, email, mobile, and a preferred date are required." } },
        { status: 400 },
      );
    }

    let groupType: string | null = null;
    if (kind === "RETREAT") {
      if (!natureOfRetreat || !Number.isFinite(expectedParticipants) || expectedParticipants < 1) {
        return NextResponse.json(
          { error: { code: "BAD_REQUEST", message: "Nature of the retreat and expected participants are required." } },
          { status: 400 },
        );
      }
    } else {
      if (groupTypeRaw !== "DAY_VISIT" && groupTypeRaw !== "STAY") {
        return NextResponse.json(
          { error: { code: "BAD_REQUEST", message: "Choose day visit or stay with us." } },
          { status: 400 },
        );
      }
      groupType = groupTypeRaw;
    }

    const enquiry = await prisma.bookingEnquiry.create({
      data: {
        kind,
        contactName,
        email,
        phone,
        preferredDate,
        natureOfRetreat: kind === "RETREAT" ? natureOfRetreat : null,
        expectedParticipants: kind === "RETREAT" ? Math.round(expectedParticipants) : null,
        groupType,
        organization: organization || null,
        status: "NEW",
        emailSent: false,
      },
    });

    let emailSent = false;
    try {
      emailSent = await sendBookingEnquiryEmail({
        kind,
        contactName,
        email,
        phone,
        preferredDate,
        natureOfRetreat: enquiry.natureOfRetreat,
        expectedParticipants: enquiry.expectedParticipants,
        groupType: enquiry.groupType,
        organization: enquiry.organization,
      });

      if (emailSent) {
        await prisma.bookingEnquiry.update({
          where: { id: enquiry.id },
          data: { emailSent: true },
        });
      }
    } catch (emailError) {
      console.error("Booking enquiry was saved but the email failed", emailError);
    }

    return NextResponse.json(
      { data: { id: enquiry.id, emailSent, status: enquiry.status } },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/enquiries failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to save this enquiry." } },
      { status: 500 },
    );
  }
}
