export type MealTier = "breakfast-only" | "breakfast-plus-one" | "all-meals";

export const MEAL_TIERS: { id: MealTier; label: string }[] = [
  { id: "breakfast-only", label: "Breakfast only" },
  { id: "breakfast-plus-one", label: "Breakfast + one meal" },
  { id: "all-meals", label: "All meals" },
];

const KNOWN_RATES: Record<string, { breakfastOnly: number; breakfastPlus: number; allMeals: number }> = {
  sangat: { breakfastOnly: 1200, breakfastPlus: 1600, allMeals: 2000 },
  nikunj: { breakfastOnly: 3200, breakfastPlus: 4000, allMeals: 4800 },
  aranya: { breakfastOnly: 4200, breakfastPlus: 5000, allMeals: 5800 },
  vyom: { breakfastOnly: 5200, breakfastPlus: 6000, allMeals: 6800 },
};

export type RoomRateSource = {
  name: string;
  basePrice: number;
  breakfastOnlyPrice?: number | null;
  breakfastPlusMealPrice?: number | null;
  allMealsPrice?: number | null;
  isDormRoom?: boolean | null;
  isSingleOccupancy?: boolean | null;
  baseOccupancy?: number | null;
  extraPersonPrice?: number | null;
  capacity?: number | null;
};

export function mealTierFromPlanName(name: string | null | undefined): MealTier {
  const value = (name || "").toLowerCase();
  if (value.includes("all meal")) return "all-meals";
  if (value.includes("one meal") || value.includes("breakfast +") || value.includes("breakfast plus") || value.includes("+ one")) {
    return "breakfast-plus-one";
  }
  return "breakfast-only";
}

export function mealTierLabel(tier: MealTier): string {
  return MEAL_TIERS.find((item) => item.id === tier)?.label ?? "Breakfast only";
}

function knownRatesFor(name: string) {
  const key = Object.keys(KNOWN_RATES).find((item) => name.toLowerCase().includes(item));
  return key ? KNOWN_RATES[key] : null;
}

export function nightlyRateForTier(room: RoomRateSource, tier: MealTier): number {
  const column =
    tier === "all-meals"
      ? Number(room.allMealsPrice || 0)
      : tier === "breakfast-plus-one"
        ? Number(room.breakfastPlusMealPrice || 0)
        : Number(room.breakfastOnlyPrice || 0);

  if (column > 0) return column;

  const known = knownRatesFor(room.name);
  if (known) {
    if (tier === "all-meals") return known.allMeals;
    if (tier === "breakfast-plus-one") return known.breakfastPlus;
    return known.breakfastOnly;
  }

  return Number(room.basePrice || 0);
}

export function calculateConvenienceFee(subTotal: number): number {
  return Math.round(subTotal * 0.03);
}

export function buildPriceBreakdown({
  baseAmount,
  mealPlanAmount = 0,
  extraGuestAmount = 0,
}: {
  baseAmount: number;
  mealPlanAmount?: number;
  extraGuestAmount?: number;
}) {
  const subTotal = baseAmount + mealPlanAmount + extraGuestAmount;
  const taxAmount = Math.round(subTotal * 0.05);
  const convenienceFeeAmount = calculateConvenienceFee(subTotal);
  const totalAmount = subTotal + taxAmount + convenienceFeeAmount;

  return {
    roomBaseAmount: baseAmount,
    mealPlanAmount,
    extraGuestAmount,
    subTotal,
    taxAmount,
    convenienceFeeAmount,
    totalAmount,
    currency: "INR" as const,
  };
}

export function quoteStay({
  room,
  tier,
  guests,
  roomsRequested,
  nights,
}: {
  room: RoomRateSource;
  tier: MealTier;
  guests: number;
  roomsRequested: number;
  nights: number;
}) {
  const safeNights = Math.max(1, nights);
  const safeGuests = Math.max(1, guests);
  const rate = nightlyRateForTier(room, tier);
  const isDorm = Boolean(room.isDormRoom);
  const isSingle = Boolean(room.isSingleOccupancy) && !isDorm;

  let roomsNeeded = 1;
  let extraGuestCount = 0;
  let quotedRoomAmount = 0;
  let quotedExtraGuestAmount = 0;

  if (isDorm) {
    roomsNeeded = 1;
    quotedRoomAmount = Math.round(rate * safeGuests * safeNights);
  } else if (isSingle) {
    roomsNeeded = safeGuests;
    quotedRoomAmount = Math.round(rate * roomsNeeded * safeNights);
  } else {
    roomsNeeded = Math.max(1, roomsRequested);
    const included = Number(room.baseOccupancy || 2) * roomsNeeded;
    extraGuestCount = Math.max(0, safeGuests - included);
    quotedRoomAmount = Math.round(rate * roomsNeeded * safeNights);
    quotedExtraGuestAmount = Math.round(Number(room.extraPersonPrice || 0) * extraGuestCount * safeNights);
  }

  const breakdown = buildPriceBreakdown({
    baseAmount: quotedRoomAmount,
    mealPlanAmount: 0,
    extraGuestAmount: quotedExtraGuestAmount,
  });

  return {
    nightlyRate: rate,
    roomsNeeded,
    extraGuestCount,
    extraGuestPrice: isDorm || isSingle ? 0 : Number(room.extraPersonPrice || 0),
    quotedRoomAmount,
    quotedMealAmount: 0,
    quotedExtraGuestAmount,
    ...breakdown,
  };
}

export function stayOccupancyError(room: RoomRateSource, guests: number, roomsNeeded: number): string | null {
  const capacity = Number(room.capacity || 0);
  if (room.isDormRoom) {
    if (capacity > 0 && guests > capacity) {
      return `This dorm allows up to ${capacity} guests.`;
    }
    return null;
  }
  if (room.isSingleOccupancy) return null;
  if (capacity > 0 && guests > capacity * Math.max(1, roomsNeeded)) {
    return "Guests exceed max occupancy for this room type.";
  }
  return null;
}

export function quoteVisit(basePrice: number, guests: number) {
  const quotedRoomAmount = Math.round(Number(basePrice || 0) * Math.max(1, guests));
  const breakdown = buildPriceBreakdown({
    baseAmount: quotedRoomAmount,
    mealPlanAmount: 0,
    extraGuestAmount: 0,
  });

  return {
    quotedRoomAmount,
    quotedMealAmount: 0,
    quotedExtraGuestAmount: 0,
    ...breakdown,
  };
}
