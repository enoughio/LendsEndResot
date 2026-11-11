"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HouseRulesAcceptance, saveHouseRulesConsent } from "@/components/booking/house-rules-acceptance";
import { emptyHouseRulesAcceptance, isHouseRulesAcceptanceComplete, type ConsentPurpose, type HouseRulesAcceptanceValue } from "@/lib/house-rules";
import { RESORT_EMAIL, RESORT_PHONE_DISPLAY, RESORT_PHONE_TEL, whatsAppLink } from "@/lib/resort-copy";

type EnquiryKind = "RETREAT" | "GROUP";

const inputClass = "w-full border border-[#e4d7c3] bg-white px-3 py-2.5 text-stone-900 outline-none ring-[#1f3d2e] focus:ring-2";

const ENQUIRY_COPY = {
  RETREAT: {
    title: "Retreat booking",
    lead: "This enquiry is for a facilitator hosting a retreat at Land's End, in Sumiran forest. It is not an instant booking, and nothing is paid when you send it.",
    detail:
      "Write your name, email and mobile, the retreat date, the nature of the retreat, and how many people you expect. The resort receives the enquiry and replies.",
  },
  GROUP: {
    title: "Group booking",
    lead: "This enquiry is for a group of more than ten, coming for a day visit or a stay at The Last Resort. It is not an instant booking, and nothing is paid when you send it.",
    detail:
      "Say whether the group wants a day visit or a stay, and leave the group lead’s name, an email, a mobile number, the date, and an organization if there is one. The resort receives the enquiry and replies.",
  },
} as const;

export function EnquiryForm({ kind }: { kind: EnquiryKind }) {
  const router = useRouter();
  const purpose = kind as ConsentPurpose;
  const [houseRules, setHouseRules] = useState<HouseRulesAcceptanceValue>(emptyHouseRulesAcceptance());
  const [consentId, setConsentId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [natureOfRetreat, setNatureOfRetreat] = useState("");
  const [expectedParticipants, setExpectedParticipants] = useState("");
  const [groupType, setGroupType] = useState<"DAY_VISIT" | "STAY">("DAY_VISIT");
  const [organization, setOrganization] = useState("");

  const whatsappHref = whatsAppLink(
    [
      "Hello, I have sent an enquiry to Land's End.",
      `Kind: ${kind === "RETREAT" ? "Retreat" : "Group"}`,
      `Name: ${contactName}`,
      `Email: ${email}`,
      `Mobile: ${phone}`,
      `Date: ${preferredDate}`,
      ...(kind === "RETREAT"
        ? [`Nature of retreat: ${natureOfRetreat}`, `Expected participants: ${expectedParticipants}`]
        : [`Group type: ${groupType === "STAY" ? "Stay with us" : "Day visit"}`, organization ? `Organization: ${organization}` : ""].filter(Boolean)),
    ].join("\n"),
  );

  const submit = async () => {
    if (!isHouseRulesAcceptanceComplete(houseRules)) {
      setError("Please accept every house rule and sign before sending.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      const activeConsent = consentId || (await saveHouseRulesConsent(purpose, houseRules));
      setConsentId(activeConsent);
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          consentId: activeConsent,
          contactName,
          email,
          phone,
          preferredDate,
          natureOfRetreat,
          expectedParticipants: Number(expectedParticipants || 0),
          groupType,
          organization,
        }),
      });
      const json = await response.json();
      if (!response.ok) {
        if (response.status === 409) setConsentId(null);
        throw new Error(json?.error?.message || "Unable to send this enquiry.");
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send this enquiry.");
    } finally {
      setSubmitting(false);
    }
  };

  const copy = ENQUIRY_COPY[kind];

  return (
    <div className="min-h-screen bg-[#f6f1e6] px-4 pb-16 pt-24 text-stone-800 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <button type="button" onClick={() => router.push("/booking")} className="text-sm text-stone-600 underline decoration-stone-400 underline-offset-4 hover:text-[#1f3d2e]">
          Back to booking
        </button>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#6d5a38]">Land&apos;s End · The Last Resort</p>
        <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-[#1f3d2e]">{copy.title}</h1>
        <p className="mt-4 text-base leading-7 text-stone-700">{copy.lead}</p>
        <p className="mt-3 text-sm leading-7 text-stone-600">{copy.detail}</p>
        <figure className="relative mt-8 h-48 overflow-hidden sm:h-64">
          <Image
            src="/gallery/building.jpeg"
            alt="Land's End in Sumiran Forest"
            fill
            sizes="(min-width: 672px) 672px, 100vw"
            className="object-cover"
          />
        </figure>
        <div className="mt-8 bg-[#fffdf8] p-5 ring-1 ring-[#e4d7c3] sm:p-7">

          {done ? (
            <div className="border border-[#d7c7ae] bg-[#f6f1e6] p-4 text-[#1f3d2e]">
              <p className="font-semibold">We have your enquiry.</p>
              <p className="mt-2 text-sm">The resort has it, and will reply. You can also send the same note on WhatsApp.</p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex font-semibold text-[#1f3d2e] underline decoration-stone-400 underline-offset-4"
              >
                WhatsApp {RESORT_PHONE_DISPLAY}
              </a>
            </div>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                void submit();
              }}
            >
              {kind === "GROUP" && (
                <fieldset>
                  <legend className="mb-2 text-sm font-medium text-stone-800">Type</legend>
                  <div className="grid grid-cols-2 gap-2">
                    {([
                      ["DAY_VISIT", "Day visit"],
                      ["STAY", "Stay with us"],
                    ] as const).map(([value, label]) => (
                      <label key={value} className={`border px-3 py-3 text-sm ${groupType === value ? "border-[#1f3d2e] bg-[#f6f1e6]" : "border-[#e4d7c3] bg-white"}`}>
                        <input type="radio" name="groupType" className="mr-2 accent-[#1f3d2e]" checked={groupType === value} onChange={() => setGroupType(value)} />
                        {label}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              <label className="block text-sm font-medium text-stone-800">
                {kind === "RETREAT" ? "Facilitator name" : "Group lead name"}
                <input required value={contactName} onChange={(event) => setContactName(event.target.value)} className={`${inputClass} mt-1`} />
              </label>
              <label className="block text-sm font-medium text-stone-800">
                Email
                <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={`${inputClass} mt-1`} />
              </label>
              <label className="block text-sm font-medium text-stone-800">
                Mobile
                <input required type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className={`${inputClass} mt-1`} />
              </label>
              <label className="block text-sm font-medium text-stone-800">
                {kind === "RETREAT" ? "Date of retreat" : "Date for booking"}
                <input required type="date" value={preferredDate} onChange={(event) => setPreferredDate(event.target.value)} className={`${inputClass} mt-1`} />
              </label>

              {kind === "RETREAT" ? (
                <>
                  <label className="block text-sm font-medium text-stone-800">
                    Nature of retreat
                    <textarea required value={natureOfRetreat} onChange={(event) => setNatureOfRetreat(event.target.value)} rows={4} className={`${inputClass} mt-1`} />
                  </label>
                  <label className="block text-sm font-medium text-stone-800">
                    Expected number of participants
                    <input required min={1} type="number" value={expectedParticipants} onChange={(event) => setExpectedParticipants(event.target.value)} className={`${inputClass} mt-1`} />
                  </label>
                </>
              ) : (
                <label className="block text-sm font-medium text-stone-800">
                  Organization <span className="font-normal text-stone-500">(optional)</span>
                  <input value={organization} onChange={(event) => setOrganization(event.target.value)} className={`${inputClass} mt-1`} />
                </label>
              )}

              <HouseRulesAcceptance idPrefix={`enquiry-${kind}`} onChange={setHouseRules} />
              {error && <p className="border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
              <button type="submit" disabled={submitting} className="w-full bg-[#1f3d2e] px-4 py-3 font-semibold text-[#f6f1e6] hover:bg-[#173026] disabled:opacity-60">
                {submitting ? "Sending..." : "Send enquiry"}
              </button>
            </form>
          )}

          <p className="mt-5 text-sm text-stone-600">
            <a className="font-medium text-[#1f3d2e]" href={`tel:${RESORT_PHONE_TEL}`}>{RESORT_PHONE_DISPLAY}</a>
            {" · "}
            <a className="font-medium text-[#1f3d2e]" href={`mailto:${RESORT_EMAIL}`}>{RESORT_EMAIL}</a>
          </p>
        </div>
      </div>
    </div>
  );
}
