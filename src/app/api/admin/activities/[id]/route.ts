import { NextResponse } from "next/server";
import type { ActivityStatus } from "@/generated/prisma/enums";
import { ensureAdmin } from "@/lib/admin-auth";
import { toActivityDto } from "@/lib/admin-serializers";
import prisma from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const body = await request.json();
    const nextStatus = body?.status !== undefined ? String(body.status).trim().toUpperCase() : undefined;

    if (nextStatus !== undefined && nextStatus !== "ACTIVE" && nextStatus !== "INACTIVE") {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "status must be ACTIVE or INACTIVE." } },
        { status: 400 }
      );
    }

    const existing = await prisma.activity.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Activity not found." } },
        { status: 404 }
      );
    }

    const updated = await prisma.activity.update({
      where: { id },
      data: {
        name: body?.name ?? undefined,
        duration: body?.duration !== undefined ? Number(body.duration) : undefined,
        price: body?.price !== undefined ? Number(body.price) : undefined,
        status: nextStatus as ActivityStatus | undefined,
      },
    });

    return NextResponse.json({ data: toActivityDto(updated) });
  } catch (error) {
    console.error("PATCH /api/admin/activities/:id failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to update activity." } },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;

    const linkedBookings = await prisma.bookingActivity.count({
      where: {
        activityId: id,
      },
    });

    if (linkedBookings > 0) {
      return NextResponse.json(
        { error: { code: "CONFLICT", message: "Cannot delete activity that is linked to bookings." } },
        { status: 409 }
      );
    }

    await prisma.activity.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("DELETE /api/admin/activities/:id failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to delete activity." } },
      { status: 500 }
    );
  }
}
