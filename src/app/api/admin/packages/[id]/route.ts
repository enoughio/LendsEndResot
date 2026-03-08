import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ensureAdmin } from "@/lib/admin-auth";
import { toVisitPackageDto } from "@/lib/admin-serializers";

type Params = { params: Promise<{ id: string }> };

const PACKAGE_TYPE_MAP: Record<string, "FULL_DAY" | "HALF_DAY" | "SHORT_VISIT"> = {
  "full-day": "FULL_DAY",
  full_day: "FULL_DAY",
  fullDay: "FULL_DAY",
  FULL_DAY: "FULL_DAY",
  "half-day": "HALF_DAY",
  half_day: "HALF_DAY",
  halfDay: "HALF_DAY",
  HALF_DAY: "HALF_DAY",
  short: "SHORT_VISIT",
  "short-visit": "SHORT_VISIT",
  short_visit: "SHORT_VISIT",
  SHORT_VISIT: "SHORT_VISIT",
};

function parsePackageType(input: unknown): "FULL_DAY" | "HALF_DAY" | "SHORT_VISIT" | undefined {
  if (input === undefined) return undefined;
  const key = String(input);
  return PACKAGE_TYPE_MAP[key] ?? "SHORT_VISIT";
}

function parsePackageStatus(input: unknown): "ACTIVE" | "INACTIVE" | undefined {
  if (input === undefined) return undefined;
  return String(input).toUpperCase() === "INACTIVE" ? "INACTIVE" : "ACTIVE";
}

export async function PATCH(request: Request, { params }: Params) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.visitPackage.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: { code: "NOT_FOUND", message: "Package not found." } }, { status: 404 });
    }

    const updated = await prisma.visitPackage.update({
      where: { id },
      data: {
        name: body?.name ?? undefined,
        description: body?.description ?? undefined,
        duration: body?.duration !== undefined ? Number(body.duration) : undefined,
        basePrice: body?.basePrice !== undefined ? Number(body.basePrice) : undefined,
        maxActivity: body?.maxActivity !== undefined ? Number(body.maxActivity) : undefined,
        maxGroupSize:
          body?.maxGroupSize !== undefined
            ? Number(body.maxGroupSize)
            : body?.maxFroupSize !== undefined
            ? Number(body.maxFroupSize)
            : undefined,
        packageType: parsePackageType(body?.packageType),
        status: parsePackageStatus(body?.status),
        timing: body?.timing !== undefined ? String(body.timing) : undefined,
        includes: Array.isArray(body?.includes) ? body.includes : undefined,
        image: Array.isArray(body?.image) ? body.image : undefined,
      },
    });

    return NextResponse.json({ data: toVisitPackageDto(updated) });
  } catch (error) {
    console.error("PATCH /api/admin/packages/:id failed", error);
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Unable to update package." } }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;

    const linked = await prisma.booking.count({
      where: {
        visitPackageId: id,
        deletedAt: null,
        status: { in: ["PENDING", "CONFIRMED"] },
      },
    });

    if (linked > 0) {
      return NextResponse.json(
        { error: { code: "CONFLICT", message: "Cannot delete package with active bookings." } },
        { status: 409 }
      );
    }

    await prisma.visitPackage.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("DELETE /api/admin/packages/:id failed", error);
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Unable to delete package." } }, { status: 500 });
  }
}
