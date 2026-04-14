import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ensureAdmin } from "@/lib/admin-auth";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.mealPlan.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: { code: "NOT_FOUND", message: "Meal plan not found." } }, { status: 404 });
    }

    const updated = await prisma.mealPlan.update({
      where: { id },
      data: {
        name: body?.name ?? undefined,
        description: body?.description ?? undefined,
        pricePerPerson: body?.pricePerPerson ?? body?.price ?? undefined,
        isActive: body?.isActive ?? undefined,
      },
    });

    return NextResponse.json({
      data: {
        id: updated.id,
        name: updated.name,
        description: updated.description,
        pricePerPerson: Number(updated.pricePerPerson),
        isActive: updated.isActive,
      },
    });
  } catch (error) {
    console.error("PATCH /api/admin/meal-plans/:id failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to update meal plan." } },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    await prisma.mealPlan.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("DELETE /api/admin/meal-plans/:id failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to delete meal plan." } },
      { status: 500 }
    );
  }
}
