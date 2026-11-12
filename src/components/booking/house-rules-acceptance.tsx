"use client";

import {
  EXIT_POLICY_TEXT,
  HOUSE_RULES,
  type ConsentPurpose,
  type HouseRulesAcceptanceValue,
} from "@/lib/house-rules";

type HouseRulesAcceptanceProps = {
  idPrefix?: string;
  value: HouseRulesAcceptanceValue;
  onChange: (value: HouseRulesAcceptanceValue) => void;
};

export async function saveHouseRulesConsent(purpose: ConsentPurpose, value: HouseRulesAcceptanceValue) {
  const response = await fetch("/api/consents", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      signerName: value.signerName.trim(),
      signatureData: value.signatureData ?? "",
      acceptedRuleIds: value.acceptedRuleIds,
      exitPolicyAccepted: value.exitPolicyAccepted,
      purpose,
    }),
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json?.error?.message || "Unable to save house rules consent.");
  }
  return String(json.data.id);
}

export function HouseRulesAcceptance({ idPrefix = "house-rules", value, onChange }: HouseRulesAcceptanceProps) {
  const accepted = new Set(value.acceptedRuleIds);
  const selectAll = HOUSE_RULES.every((rule) => accepted.has(rule.id)) && value.exitPolicyAccepted;

  const toggleSelectAll = (checked: boolean) => {
    onChange({
      ...value,
      acceptedRuleIds: checked ? HOUSE_RULES.map((rule) => rule.id) : [],
      exitPolicyAccepted: checked,
    });
  };

  const toggleRule = (id: string, checked: boolean) => {
    const next = new Set(value.acceptedRuleIds);
    if (checked) next.add(id);
    else next.delete(id);
    onChange({
      ...value,
      acceptedRuleIds: HOUSE_RULES.filter((rule) => next.has(rule.id)).map((rule) => rule.id),
    });
  };

  return (
    <section aria-labelledby={`${idPrefix}-title`} className="space-y-3">
      <div>
        <h3 id={`${idPrefix}-title`} className="font-serif text-2xl font-medium text-[#1f3d2e]">
          House rules
        </h3>
        <p className="mt-1 text-sm text-stone-600">Every rule, the exit policy, and your name are required.</p>
      </div>
      {HOUSE_RULES.map((rule) => (
        <label key={rule.id} className="flex items-start gap-3 border border-[#e4d7c3] bg-[#fffdf8] p-3 text-sm text-stone-800">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 accent-[#1f3d2e]"
            checked={accepted.has(rule.id)}
            onChange={(event) => toggleRule(rule.id, event.target.checked)}
          />
          <span>{rule.text}</span>
        </label>
      ))}
      <label className="flex items-start gap-3 border border-[#e4d7c3] bg-[#f6f1e6] p-3 text-sm font-medium text-stone-800">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 accent-[#1f3d2e]"
          checked={value.exitPolicyAccepted}
          onChange={(event) => onChange({ ...value, exitPolicyAccepted: event.target.checked })}
        />
        <span>{EXIT_POLICY_TEXT}</span>
      </label>
      <label className="flex items-start gap-3 border border-[#1f3d2e] bg-[#fffdf8] p-3 text-sm font-medium text-stone-800">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 accent-[#1f3d2e]"
          checked={selectAll}
          onChange={(event) => toggleSelectAll(event.target.checked)}
        />
        <span>Select all</span>
      </label>
      <div>
        <label htmlFor={`${idPrefix}-signer-name`} className="mb-1 block text-sm font-medium text-stone-800">
          Your name
        </label>
        <input
          id={`${idPrefix}-signer-name`}
          value={value.signerName}
          onChange={(event) => onChange({ ...value, signerName: event.target.value })}
          className="w-full border border-[#e4d7c3] bg-white px-3 py-2.5 text-stone-900 outline-none ring-[#1f3d2e] focus:ring-2"
          placeholder="Type your full name"
          autoComplete="name"
        />
      </div>
    </section>
  );
}
