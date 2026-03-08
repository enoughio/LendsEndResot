import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ensureAdmin } from "@/lib/admin-auth";

export async function GET(request: Request) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const now = new Date();

    const shortPackages = await prisma.visitPackage.findMany({
      where: {
        OR: [
          { name: { contains: "short", mode: "insensitive" } },
          { description: { contains: "short", mode: "insensitive" } },
        ],
      },
      select: { id: true },
    });

    const shortPackageIds = shortPackages.map((pkg: { id: string }) => pkg.id);

    const [totalShortVisit, upcomingShortVisit] = await Promise.all([
      prisma.booking.count({
        where: {
          deletedAt: null,
          bookingType: "VISIT",
          status: { in: ["PENDING", "CONFIRMED"] },
          visitPackageId: { in: shortPackageIds.length ? shortPackageIds : ["__none__"] },
        },
      }),
      prisma.booking.count({
        where: {
          deletedAt: null,
          bookingType: "VISIT",
          status: "CONFIRMED",
          visitDate: { gte: now },
          visitPackageId: { in: shortPackageIds.length ? shortPackageIds : ["__none__"] },
        },
      }),
    ]);

    return NextResponse.json({
      data: {
        shortVisit: {
          total: totalShortVisit,
          avail: upcomingShortVisit,
        },
      },
    });
  } catch (error) {
    console.error("GET /api/admin/dashboard/visit-summary failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to load visit summary." } },
      { status: 500 }
    );
  }
}
