import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ensureAdmin } from "@/lib/admin-auth";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Params) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const enquiry = await prisma.bookingEnquiry.findUnique({
      where: { id },
      include: {
        consent: {
          select: {
            id: true,
            signerName: true,
            signatureData: true,
            acceptedRuleIds: true,
            exitPolicyAccepted: true,
            purpose: true,
            createdAt: true,
          },
        },
      },
    });

    if (!enquiry) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Enquiry not found." } },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: enquiry });
  } catch (error) {
    console.error("GET /api/admin/enquiries/:id failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to load this enquiry." } },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, { params }: Params) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const body = await request.json();
    const status = String(body?.status || "").trim().toUpperCase();
    if (status !== "NEW" && status !== "REVIEWED") {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "Status must be NEW or REVIEWED." } },
        { status: 400 },
      );
    }

    const existing = await prisma.bookingEnquiry.findUnique({ where: { id }, select: { id: true } });
    if (!existing) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Enquiry not found." } },
        { status: 404 },
      );
    }

    const updated = await prisma.bookingEnquiry.update({
      where: { id },
      data: { status },
      select: { id: true, status: true },
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("PATCH /api/admin/enquiries/:id failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to update this enquiry." } },
      { status: 500 },
    );
  }
}
