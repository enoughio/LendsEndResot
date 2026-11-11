export const HOUSE_RULES = [
  { id: "no-alcohol", text: "I/my group will not consume alcohol on the property." },
  { id: "no-nonveg", text: "I/my group will not eat or bring any non-vegetarian food or eggs." },
  { id: "no-smoking", text: "I/my group will not smoke anywhere on the property." },
  { id: "no-loud-music", text: "I/my group will not play loud music or use speakers." },
  { id: "no-litter", text: "I/my group will not litter or pluck plants." },
  { id: "no-animals", text: "I/my group will not feed or chase animals." },
  { id: "no-water", text: "I/my group will not enter the water without the Land's End team." },
  { id: "no-forest-dark", text: "I/my group will not walk the forest alone after dark." },
  { id: "no-drones-pets-fires", text: "I/my group will not use drones, bring pets, or light fires without permission." },
] as const;

export const EXIT_POLICY_TEXT =
  "I understand that Land's End: The Last Resort holds the right to exit me/my group, without any refund, if any of the above conditions are violated by me or my group.";

export const CANCELLATION_POLICY =
  "You can change the date or cancel until 72 hours before check-in or the visit. After that, cancellation charges may apply. If the house rules are broken, Land's End can ask the guest or group to leave with no refund.";

export const CONSENT_PURPOSES = ["STAY", "VISIT", "RETREAT", "GROUP"] as const;
export type ConsentPurpose = (typeof CONSENT_PURPOSES)[number];

export const MAX_SIGNATURE_DATA_URL_LENGTH = 450_000;

export function consentStorageKey(purpose: ConsentPurpose) {
  return `landsend-house-rules:${purpose}`;
}

export function readStoredConsent(purpose: ConsentPurpose): string | null {
  if (typeof window === "undefined") return null;
  const value = window.sessionStorage.getItem(consentStorageKey(purpose));
  return value && value.trim() ? value : null;
}

export function storeConsent(purpose: ConsentPurpose, consentId: string) {
  window.sessionStorage.setItem(consentStorageKey(purpose), consentId);
}

export function clearStoredConsent(purpose: ConsentPurpose) {
  window.sessionStorage.removeItem(consentStorageKey(purpose));
}

export function isConsentPurpose(value: string): value is ConsentPurpose {
  return (CONSENT_PURPOSES as readonly string[]).includes(value);
}

export function ruleText(id: string) {
  return HOUSE_RULES.find((rule) => rule.id === id)?.text ?? id;
}

export const QUIET_STAY_NOTE = "These are quiet, vegetarian, alcohol-free stays.";

export type HouseRulesAcceptanceValue = {
  acceptedRuleIds: string[];
  exitPolicyAccepted: boolean;
  signerName: string;
  signatureData: string | null;
};

export function emptyHouseRulesAcceptance(): HouseRulesAcceptanceValue {
  return {
    acceptedRuleIds: [],
    exitPolicyAccepted: false,
    signerName: "",
    signatureData: null,
  };
}

export function isHouseRulesAcceptanceComplete(value: HouseRulesAcceptanceValue) {
  const accepted = new Set(value.acceptedRuleIds);
  return (
    HOUSE_RULES.every((rule) => accepted.has(rule.id)) &&
    value.exitPolicyAccepted &&
    value.signerName.trim().length >= 2 &&
    Boolean(value.signatureData)
  );
}
