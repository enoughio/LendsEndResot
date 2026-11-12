import { Prisma, type Activity, type BookingStatus } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { calculateNights, formatIndiaDate, indiaDateKey, parseDate, todayIndiaInput } from "@/lib/india-date";

export { buildPriceBreakdown, calculateConvenienceFee } from "@/lib/stay-pricing";
export { calculateNights, formatIndiaDate, indiaDateKey, parseDate, todayIndiaInput };

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

/** India nights a stay occupies: check-in day inclusive, check-out day exclusive. */
export function stayNightBounds(checkIn: Date, checkOut: Date): { start: Date; end: Date } | null {
  const start = parseDate(indiaDateKey(checkIn));
  const end = parseDate(indiaDateKey(checkOut));
  if (!start || !end || end.getTime() <= start.getTime()) return null;
  return { start, end };
}

/**
 * Blocked rooms reduce availability by one each.
 * A room that already has an active stay is left to the booking count, so a block on that room is not subtracted twice.
 */
export function availableRoomCount(input: {
  totalRooms: number;
  bookedCount: number;
  blockedRoomIds: readonly string[];
  bookedRoomIds: ReadonlySet<string>;
}) {
  const blockedExtra = input.blockedRoomIds.filter((roomId) => !input.bookedRoomIds.has(roomId)).length;
  return Math.max(0, input.totalRooms - input.bookedCount - blockedExtra);
}

export function unblockedDuringStayWhere(checkIn: Date, checkOut: Date) {
  const bounds = stayNightBounds(checkIn, checkOut);
  if (!bounds) return {};
  return {
    blocks: {
      none: {
        date: { gte: bounds.start, lt: bounds.end },
      },
    },
  };
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
  const bounds = stayNightBounds(checkIn, checkOut);
  const blockedRooms = bounds
    ? await db.room.findMany({
        where: {
          roomTypeId,
          roomStatus: "AVAILABLE",
          blocks: {
            some: {
              date: { gte: bounds.start, lt: bounds.end },
            },
          },
        },
        select: {
          id: true,
          bookings: {
            where: activeStayOverlapWhere(checkIn, checkOut, now),
            select: { id: true },
            take: 1,
          },
        },
      })
    : [];

  return availableRoomCount({
    totalRooms,
    bookedCount,
    blockedRoomIds: blockedRooms.map((room) => room.id),
    bookedRoomIds: new Set(blockedRooms.filter((room) => room.bookings.length > 0).map((room) => room.id)),
  });
}
