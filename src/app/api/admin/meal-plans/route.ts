import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ensureAdmin } from "@/lib/admin-auth";

export async function GET(request: Request) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const plans = await prisma.mealPlan.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({
      data: plans.map((plan) => ({
        id: plan.id,
        name: plan.name,
        description: plan.description,
        pricePerPerson: Number(plan.pricePerPerson),
        isActive: plan.isActive,
      })),
    });
  } catch (error) {
    console.error("GET /api/admin/meal-plans failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to load meal plans." } },
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
    const description = body?.description ? String(body.description).trim() : null;
    const pricePerPerson = Number(body?.pricePerPerson ?? body?.price ?? 0);
    const isActive = body?.isActive === false ? false : true;

    if (!name || pricePerPerson <= 0) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "name and pricePerPerson are required." } },
        { status: 400 }
      );
    }

    const created = await prisma.mealPlan.create({
      data: {
        name,
        description,
        pricePerPerson,
        isActive,
      },
    });

    return NextResponse.json(
      {
        data: {
          id: created.id,
          name: created.name,
          description: created.description,
          pricePerPerson: Number(created.pricePerPerson),
          isActive: created.isActive,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/admin/meal-plans failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to create meal plan." } },
      { status: 500 }
    );
  }
}
