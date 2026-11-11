import { Prisma, type Activity, type BookingStatus } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

export { buildPriceBreakdown, calculateConvenienceFee } from "@/lib/stay-pricing";
export { calculateNights, formatIndiaDate, indiaDateKey, parseDate, todayIndiaInput } from "@/lib/india-date";

export type StayAvailabilityInput = {
  roomTypeId: string;
  checkIn: Date;
  checkOut: Date;
};

type BookingDb = Prisma.TransactionClient | typeof prisma;

export const STAY_HOLD_MS = 15 * 60 * 1000;

export function stayHoldExpiry(createdAt: Date) {
  return new Date(createdAt.getTime() + STAY_HOLD_MS);
}

export function isStayHoldActive(createdAt: Date, now = Date.now()) {
  return createdAt.getTime() + STAY_HOLD_MS > now;
}

export function roomsLeftMessage(availableCount: number, roomsNeeded?: number) {
  const label = availableCount === 1 ? "room is" : "rooms are";
  const left = `Only ${availableCount} ${label} left for those dates.`;
  if (roomsNeeded != null && roomsNeeded > Math.max(availableCount, 1)) {
    return `${left} This stay needs ${roomsNeeded}.`;
  }
  return left;
}

export class RoomsUnavailableError extends Error {
  availableCount: number;
  roomsNeeded: number;

  constructor(availableCount: number, roomsNeeded: number) {
    super(roomsLeftMessage(availableCount, roomsNeeded));
    this.name = "RoomsUnavailableError";
    this.availableCount = availableCount;
    this.roomsNeeded = roomsNeeded;
  }
}

function holdCutoff(now: Date) {
  return new Date(now.getTime() - STAY_HOLD_MS);
}

// A pending stay holds its rooms for 15 minutes. After Razorpay checkout starts,
// keep the hold for 15 minutes from that order so the payment can finish.
export function activeStayOverlapWhere(checkIn: Date, checkOut: Date, now = new Date()) {
  const cutoff = holdCutoff(now);
  return {
    deletedAt: null,
    bookingType: "STAY" as const,
    AND: [
      {
        OR: [
          { status: "CONFIRMED" as const },
          { status: "PENDING" as const, createdAt: { gt: cutoff } },
          {
            status: "PENDING" as const,
            razorPayOrderId: { not: null },
            updatedAt: { gt: cutoff },
          },
        ],
      },
      {
        NOT: {
          OR: [{ checkOut: { lte: checkIn } }, { checkIn: { gte: checkOut } }],
        },
      },
    ],
  };
}

export async function releaseExpiredStayHolds(db: BookingDb = prisma, roomTypeId?: string, now = new Date()) {
  const cutoff = holdCutoff(now);
  await db.booking.updateMany({
    where: {
      deletedAt: null,
      bookingType: "STAY",
      status: "PENDING",
      paymentStatus: { not: "PAID" },
      createdAt: { lte: cutoff },
      OR: [{ razorPayOrderId: null }, { updatedAt: { lte: cutoff } }],
      ...(roomTypeId ? { room: { roomTypeId } } : {}),
    },
    data: { status: "CANCELLED" },
  });
}

export function sumActivityPrice(activities: Activity[]): number {
  return activities.reduce((sum, activity) => sum + Number(activity.price || 0), 0);
}

export function isValidStatus(status: string): status is BookingStatus {
  return ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED", "REFUNDED", "FAILED"].includes(status);
}

export async function getAvailableRoomCount(
  { roomTypeId, checkIn, checkOut }: StayAvailabilityInput,
  db: BookingDb = prisma,
) {
  const now = new Date();
  await releaseExpiredStayHolds(db, roomTypeId, now);

  const totalRooms = await db.room.count({
    where: {
      roomTypeId,
      roomStatus: "AVAILABLE",
    },
  });

  const overlappingBookedRooms = await db.booking.aggregate({
    where: {
      ...activeStayOverlapWhere(checkIn, checkOut, now),
      room: { roomTypeId },
    },
    _sum: { roomsBooked: true },
  });

  const bookedCount = Number(overlappingBookedRooms._sum.roomsBooked || 0);
  return Math.max(0, totalRooms - bookedCount);
}
