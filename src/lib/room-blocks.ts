import { indiaDateKey, parseDate, todayIndiaInput } from "@/lib/india-date";

export const ROOM_BLOCK_REASONS = ["RETREAT", "GROUP_BOOKING", "MAINTENANCE"] as const;

export type RoomBlockReasonValue = (typeof ROOM_BLOCK_REASONS)[number];

const MAX_DATES = 92;
const MAX_NOTE_LENGTH = 200;

export type RoomBlockGroup = {
  id: string;
  roomId: string;
  roomNo: string;
  roomTypeName: string;
  dates: string[];
  reason: RoomBlockReasonValue;
  note: string | null;
  createdAt: string;
};

type RoomBlockSource = {
  groupId: string;
  roomId: string;
  roomNo: string;
  roomTypeName: string;
  date: Date;
  reason: string;
  note: string | null;
  createdAt: Date;
};

export function parseBlockReason(input: unknown): RoomBlockReasonValue | null {
  const value = String(input ?? "")
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");
  if (value === "retreat") return "RETREAT";
  if (value === "group booking" || value === "group") return "GROUP_BOOKING";
  if (value === "maintenance") return "MAINTENANCE";
  return null;
}

export function parseBlockNote(input: unknown): { note: string | null } | { error: string } {
  if (input == null || input === "") return { note: null };
  if (typeof input !== "string") return { error: "Note must be text." };
  const note = input.trim();
  if (!note) return { note: null };
  if (note.length > MAX_NOTE_LENGTH) return { error: "Note must be 200 characters or fewer." };
  return { note };
}

export function parseBlockDates(input: unknown): { dates: Date[]; keys: string[] } | { error: string } {
  if (!Array.isArray(input) || input.length === 0) {
    return { error: "Select at least one date." };
  }

  const keys = new Set<string>();
  for (const value of input) {
    if (typeof value !== "string") return { error: "Dates must use YYYY-MM-DD." };
    const key = value.trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) return { error: "Dates must use YYYY-MM-DD." };
    const parsed = parseDate(key);
    if (!parsed || indiaDateKey(parsed) !== key) return { error: `Invalid date: ${key}.` };
    keys.add(key);
  }

  if (keys.size > MAX_DATES) return { error: `Select at most ${MAX_DATES} dates at a time.` };
  const sorted = [...keys].sort();
  return {
    keys: sorted,
    dates: sorted.map((key) => parseDate(key) as Date),
  };
}

export function parseBlockRoomIds(input: unknown): { roomIds: string[] } | { error: string } {
  if (!Array.isArray(input) || input.length === 0) return { error: "Select at least one room." };
  const roomIds = [...new Set(input.map((value) => String(value ?? "").trim()).filter(Boolean))];
  if (roomIds.length === 0) return { error: "Select at least one room." };
  if (roomIds.length > 200) return { error: "Select fewer rooms and try again." };
  return { roomIds };
}

export function isRoomBlockGroupId(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

export function toRoomBlockGroups(rows: RoomBlockSource[]): RoomBlockGroup[] {
  const today = todayIndiaInput();
  const groups = new Map<string, RoomBlockGroup & { createdMs: number }>();

  for (const row of rows) {
    if (row.reason !== "RETREAT" && row.reason !== "GROUP_BOOKING" && row.reason !== "MAINTENANCE") continue;
    const dateKey = indiaDateKey(row.date);
    const existing = groups.get(row.groupId);
    if (!existing) {
      groups.set(row.groupId, {
        id: row.groupId,
        roomId: row.roomId,
        roomNo: row.roomNo,
        roomTypeName: row.roomTypeName,
        dates: [dateKey],
        reason: row.reason,
        note: row.note,
        createdAt: row.createdAt.toISOString(),
        createdMs: row.createdAt.getTime(),
      });
      continue;
    }
    if (!existing.dates.includes(dateKey)) existing.dates.push(dateKey);
    if (row.createdAt.getTime() < existing.createdMs) {
      existing.createdMs = row.createdAt.getTime();
      existing.createdAt = row.createdAt.toISOString();
    }
  }

  return [...groups.values()]
    .map((group) => ({
      id: group.id,
      roomId: group.roomId,
      roomNo: group.roomNo,
      roomTypeName: group.roomTypeName,
      dates: [...group.dates].sort(),
      reason: group.reason,
      note: group.note,
      createdAt: group.createdAt,
    }))
    .sort((a, b) => compareBlockGroups(a, b, today));
}

function compareBlockGroups(a: RoomBlockGroup, b: RoomBlockGroup, today: string) {
  const aUpcoming = a.dates.some((date) => date >= today);
  const bUpcoming = b.dates.some((date) => date >= today);
  if (aUpcoming !== bUpcoming) return aUpcoming ? -1 : 1;
  const aKey = (aUpcoming ? a.dates.find((date) => date >= today) : a.dates[a.dates.length - 1]) ?? "";
  const bKey = (bUpcoming ? b.dates.find((date) => date >= today) : b.dates[b.dates.length - 1]) ?? "";
  const byDate = aKey.localeCompare(bKey);
  if (byDate !== 0) return aUpcoming ? byDate : -byDate;
  return a.roomNo.localeCompare(b.roomNo, undefined, { numeric: true });
}
