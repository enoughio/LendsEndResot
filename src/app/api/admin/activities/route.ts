import { NextResponse } from "next/server";
import type { Activity } from "@/generated/prisma/client";
import { ensureAdmin } from "@/lib/admin-auth";
import { toActivityDto } from "@/lib/admin-serializers";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const activities = await prisma.activity.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      data: activities.map((activity: Activity) => toActivityDto(activity)),
    });
  } catch (error) {
    console.error("GET /api/admin/activities failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to load activities." } },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const name = String(body?.name || "").trim();
    const duration = Number(body?.duration ?? 0);
    const price = Number(body?.price ?? 0);
    const status = String(body?.status || "ACTIVE").trim();

    if (!name || duration <= 0 || price < 0) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "name, duration (>0), and price (>=0) are required." } },
        { status: 400 }
      );
    }

    const created = await prisma.activity.create({
      data: {
        name,
        duration,
        price,
        status,
      },
    });

    return NextResponse.json({ data: toActivityDto(created) }, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/activities failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to create activity." } },
      { status: 500 }
    );
  }
}
