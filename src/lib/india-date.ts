const INDIA_TIME_ZONE = "Asia/Kolkata";

/** Calendar day in India, as YYYY-MM-DD. */
export function indiaDateKey(value: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: INDIA_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(value);
}

function indiaNoon(year: string, month: string, day: string): Date | null {
  if (!/^\d{4}$/.test(year) || !/^\d{2}$/.test(month) || !/^\d{2}$/.test(day)) return null;
  // Noon IST stays on this calendar day in India and in a UTC date slice.
  const date = new Date(`${year}-${month}-${day}T12:00:00+05:30`);
  if (Number.isNaN(date.getTime())) return null;
  if (indiaDateKey(date) !== `${year}-${month}-${day}`) return null;
  return date;
}

/**
 * A date-only string is that calendar day in Asia/Kolkata.
 * `new Date("YYYY-MM-DD")` is UTC midnight; treat that same string, and its
 * `.toISOString()` form, as the India calendar day it names.
 */
export function parseDate(value: unknown): Date | null {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  const dateOnly = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (dateOnly) return indiaNoon(dateOnly[1], dateOnly[2], dateOnly[3]);

  const utcMidnight = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})T00:00:00(?:\.000)?Z$/);
  if (utcMidnight) return indiaNoon(utcMidnight[1], utcMidnight[2], utcMidnight[3]);

  const parsed = new Date(trimmed);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function calculateNights(checkIn: Date, checkOut: Date): number {
  const [inYear, inMonth, inDay] = indiaDateKey(checkIn).split("-").map(Number);
  const [outYear, outMonth, outDay] = indiaDateKey(checkOut).split("-").map(Number);
  const nights = Math.round((Date.UTC(outYear, outMonth - 1, outDay) - Date.UTC(inYear, inMonth - 1, inDay)) / 86_400_000);
  return Math.max(1, nights);
}

export function todayIndiaInput(): string {
  return indiaDateKey(new Date());
}

export function formatIndiaDate(
  value: Date | string | null | undefined,
  options?: Intl.DateTimeFormatOptions,
): string {
  if (!value) return "";
  const date = value instanceof Date ? value : (parseDate(value) ?? new Date(value));
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-IN", {
    timeZone: INDIA_TIME_ZONE,
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options,
  });
}
