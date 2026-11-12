export const RESORT_PHONE_DISPLAY = "+91 88713 17382";
export const RESORT_PHONE_TEL = "+918871317382";
export const RESORT_WHATSAPP_NUMBER = "918871317382";
export const RESORT_EMAIL = "landsend.sumiran@gmail.com";

export const ASK_ON_ARRIVAL_NOTE = "Ask us when you arrive. Not added to this booking.";

const ASK_ON_ARRIVAL_PATTERN = /kayak|boating|\bboat\b|zipline|zip-line|rope course|stargaz|storytell|meditation|journal/i;

export function isAskOnArrivalItem(label: string) {
  return ASK_ON_ARRIVAL_PATTERN.test(label);
}

export function splitIncludedAndAddons(items: string[]) {
  const included: string[] = [];
  const askOnArrival: string[] = [];
  for (const item of items) {
    if (isAskOnArrivalItem(item)) askOnArrival.push(item);
    else included.push(item);
  }
  return { included, askOnArrival };
}

export function whatsAppLink(text: string) {
  return `https://wa.me/${RESORT_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const STAY_INCLUSIONS = [
  "Organic meals as per meal plan",
  "Guided forest walk",
  "Sacred grove trail",
  "Farm visit",
  "Lake & water-bodies access",
  "Archery & target shooting",
  "Fun games & activities",
];

export const STAY_ADDONS = [
  "Kayaking on the lake",
  "Boating on the lake",
  "Zipline through the canopy",
  "Rope course",
  "Telescopic stargazing",
  "Storytelling circles",
  "Guided meditation & journaling",
];

export const CHECK_IN_LABEL = "12:00 PM";
export const CHECK_OUT_LABEL = "11:00 AM";

export const SMALL_GROUP_MAX_GUESTS = 20;

export const SHORT_VISIT_MEALS_COPY =
  "Tea and snacks are included. Buffet dining is available separately.";

export const STAY_DINING_NOTE = "All rooms are air-conditioned. Buffet dining is available.";

export function visitMealsText(description?: string | null, packageType?: string) {
  const text = (description || "").replace(/\s+/g, " ").trim();
  if (/la carte/i.test(text) || (packageType === "SHORT_VISIT" && !text)) {
    return SHORT_VISIT_MEALS_COPY;
  }
  return text;
}
