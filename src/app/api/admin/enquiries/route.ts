import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ensureAdmin } from "@/lib/admin-auth";

export async function GET(request: Request) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const enquiries = await prisma.bookingEnquiry.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        kind: true,
        contactName: true,
        email: true,
        phone: true,
        preferredDate: true,
        natureOfRetreat: true,
        expectedParticipants: true,
        groupType: true,
        organization: true,
        status: true,
        emailSent: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ data: enquiries });
  } catch (error) {
    console.error("GET /api/admin/enquiries failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to load enquiries." } },
      { status: 500 },
    );
  }
}
