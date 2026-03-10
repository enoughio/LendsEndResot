import { NextResponse } from "next/server";
import type { VisitPackage } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { ensureAdmin } from "@/lib/admin-auth";
import { toVisitPackageDto } from "@/lib/admin-serializers";

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

function parsePackageType(input: unknown): "FULL_DAY" | "HALF_DAY" | "SHORT_VISIT" {
  const key = String(input || "short-visit");
  return PACKAGE_TYPE_MAP[key] ?? "SHORT_VISIT";
}

function parsePackageStatus(input: unknown): "ACTIVE" | "INACTIVE" {
  return String(input || "ACTIVE").toUpperCase() === "INACTIVE" ? "INACTIVE" : "ACTIVE";
}

export async function GET(request: Request) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const packages = await prisma.visitPackage.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ data: packages.map((pkg: VisitPackage) => toVisitPackageDto(pkg)) });
  } catch (error) {
    console.error("GET /api/admin/packages failed", error);
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Unable to load packages." } }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const name = String(body?.name || "").trim();
    const description = body?.description ? String(body.description).trim() : null;
    const duration = Number(body?.duration ?? 0);
    const basePrice = Number(body?.basePrice ?? 0);
    const maxActivity = Number(body?.maxActivity ?? 1);
    const maxGroupSize = Number(body?.maxGroupSize ?? body?.maxFroupSize ?? 1);
    const packageType = parsePackageType(body?.packageType);
    const status = parsePackageStatus(body?.status);
    const timing = body?.timing ? String(body.timing).trim() : null;
    const includes: string[] = Array.isArray(body?.includes)
      ? body.includes.map((item: unknown) => String(item)).filter(Boolean)
      : [];
    const image: string[] = Array.isArray(body?.image)
      ? body.image.map((item: unknown) => String(item)).filter(Boolean)
      : [];

    if (!name || duration <= 0 || basePrice <= 0) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "name, duration and basePrice are required." } },
        { status: 400 }
      );
    }

    const created = await prisma.visitPackage.create({
      data: {
        name,
        description,
        duration,
        basePrice,
        maxActivity,
        maxGroupSize,
        packageType,
        status,
        timing,
        includes,
        image,
      },
    });

    return NextResponse.json({ data: toVisitPackageDto(created) }, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/packages failed", error);
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Unable to create package." } }, { status: 500 });
  }
}
