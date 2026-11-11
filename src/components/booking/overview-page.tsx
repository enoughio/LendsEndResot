"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarRange, Mail, Phone } from "lucide-react";
import { QUIET_STAY_NOTE } from "@/lib/house-rules";
import { roomImages } from "@/lib/rooms-images";
import {
  ASK_ON_ARRIVAL_NOTE,
  CHECK_IN_LABEL,
  CHECK_OUT_LABEL,
  RESORT_EMAIL,
  RESORT_PHONE_DISPLAY,
  RESORT_PHONE_TEL,
  STAY_ADDONS,
  STAY_DINING_NOTE,
  STAY_INCLUSIONS,
  visitMealsText,
  splitIncludedAndAddons,
} from "@/lib/resort-copy";
import { MEAL_TIERS, buildPriceBreakdown, nightlyRateForTier, type RoomRateSource } from "@/lib/stay-pricing";

type RoomApi = RoomRateSource & {
  id: string;
  description?: string | null;
  extraPersonPrice?: number | null;
};

type VisitApi = {
  id: string;
  name: string;
  description?: string | null;
  packageType: "FULL_DAY" | "HALF_DAY" | "SHORT_VISIT";
  duration: number;
  basePrice: number;
  minGroupSize?: number;
  maxGroupSize?: number;
  timing?: string | null;
  includes?: string[];
  status?: string;
};

const ROOM_ORDER = ["sangat", "nikunj", "aranya", "vyom"];
const VISIT_ORDER: VisitApi["packageType"][] = ["FULL_DAY", "HALF_DAY", "SHORT_VISIT"];
const DEFAULT_ROOM_IMAGE = "/rooms/default.jpeg";
const RESORT_PHOTO = "/gallery/building.jpeg";

const FALLBACK_ROOMS: RoomApi[] = [
  {
    id: "sangat",
    name: "Sangat",
    description: "Shared AC dormitory. Priced per person, per night.",
    basePrice: 1200,
    breakfastOnlyPrice: 1200,
    breakfastPlusMealPrice: 1600,
    allMealsPrice: 2000,
    extraPersonPrice: 0,
    isDormRoom: true,
  },
  {
    id: "nikunj",
    name: "Nikunj",
    description: "AC double room, flower-themed. Rate is for two. Extra person ₹1,000 per night, with all meals.",
    basePrice: 3200,
    breakfastOnlyPrice: 3200,
    breakfastPlusMealPrice: 4000,
    allMealsPrice: 4800,
    extraPersonPrice: 1000,
    isDormRoom: false,
  },
  {
    id: "aranya",
    name: "Aranya",
    description: "AC double room, forest-themed. Rate is for two. Extra person ₹2,000 per night, with all meals.",
    basePrice: 4200,
    breakfastOnlyPrice: 4200,
    breakfastPlusMealPrice: 5000,
    allMealsPrice: 5800,
    extraPersonPrice: 2000,
    isDormRoom: false,
  },
  {
    id: "vyom",
    name: "Vyom",
    description: "AC tower room, the one with the view. Rate is for two. Extra person ₹2,000 per night, with all meals.",
    basePrice: 5200,
    breakfastOnlyPrice: 5200,
    breakfastPlusMealPrice: 6000,
    allMealsPrice: 6800,
    extraPersonPrice: 2000,
    isDormRoom: false,
  },
];

const FALLBACK_VISITS: VisitApi[] = [
  {
    id: "full",
    name: "Day-Long Retreat",
    packageType: "FULL_DAY",
    duration: 8.5,
    basePrice: 1500,
    minGroupSize: 4,
    timing: "9:00 AM – 5:30 PM",
    description: "Breakfast on arrival · Lunch · Evening High Tea",
    includes: [
      "Guided Forest Walk",
      "Archery & Target Shooting",
      "Fun Games & Activities",
      "Storytelling Circle (groups of 10+)",
      "Lake-side Reflection",
      "Farm Visit",
      "Harvest Experience (in season)",
      "Boating, Kayaking & Zipline (at extra cost)",
    ],
    status: "ACTIVE",
  },
  {
    id: "half",
    name: "Half-Day Visit",
    packageType: "HALF_DAY",
    duration: 4,
    basePrice: 1000,
    minGroupSize: 4,
    timing: "4 hours · morning or afternoon",
    description: "Lunch · Tea & Snacks (on arrival or departure)",
    includes: ["Guided Forest Walk", "Archery & Target Shooting", "Farm Visit", "Fun Games & Activities", "Optional Lake Visit"],
    status: "ACTIVE",
  },
  {
    id: "short",
    name: "Short Visit",
    packageType: "SHORT_VISIT",
    duration: 2,
    basePrice: 500,
    minGroupSize: 4,
    timing: "2 hours",
    description: "Tea and snacks are included. Buffet dining is available separately.",
    includes: ["90-minute Guided Forest Walk", "Farm Visit", "Tea & Snacks"],
    status: "ACTIVE",
  },
];

function inr(value: number) {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

function afterFees(sheetPrice: number) {
  return buildPriceBreakdown({ baseAmount: Number(sheetPrice) || 0 }).totalAmount;
}

function visitTypeParam(packageType: VisitApi["packageType"]) {
  if (packageType === "HALF_DAY") return "half";
  if (packageType === "SHORT_VISIT") return "short";
  return "full";
}

function roomPhoto(roomName: string) {
  const normalizedName = roomName.toLowerCase().replace(/[^a-z0-9]/g, "");
  const roomKey = Object.keys(roomImages).find((key) => normalizedName.includes(key));
  const photos = roomKey ? roomImages[roomKey] : [];
  return photos.find((src) => src.trim().length > 0) || DEFAULT_ROOM_IMAGE;
}

export function OverviewPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState<RoomApi[]>(FALLBACK_ROOMS);
  const [visits, setVisits] = useState<VisitApi[]>(FALLBACK_VISITS);

  useEffect(() => {
    const load = async () => {
      const response = await fetch("/api/bookings");
      if (!response.ok) return;
      const json = await response.json();
      const nextRooms = (json?.data?.rooms || []) as RoomApi[];
      const nextVisits = ((json?.data?.visitPackages || []) as VisitApi[]).filter(
        (item) => !item.status || item.status === "ACTIVE",
      );
      if (nextRooms.length) setRooms(nextRooms);
      if (nextVisits.length) setVisits(nextVisits);
    };
    void load();
  }, []);

  const orderedRooms = useMemo(() => {
    return [...rooms].sort((left, right) => {
      const leftIndex = ROOM_ORDER.findIndex((name) => left.name.toLowerCase().includes(name));
      const rightIndex = ROOM_ORDER.findIndex((name) => right.name.toLowerCase().includes(name));
      return (leftIndex === -1 ? 99 : leftIndex) - (rightIndex === -1 ? 99 : rightIndex);
    });
  }, [rooms]);

  const orderedVisits = useMemo(() => {
    return VISIT_ORDER.map((type) => visits.find((item) => item.packageType === type)).filter((item): item is VisitApi => Boolean(item));
  }, [visits]);

  const fullDay = orderedVisits.find((visit) => visit.packageType === "FULL_DAY") || orderedVisits[0];
  const dayVisitHref = `/booking/visit?type=full${fullDay ? `&packageId=${fullDay.id}` : ""}`;

  return (
    <div className="min-h-screen bg-[#f6f1e6] px-4 pb-20 pt-24 text-stone-800 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6d5a38]">Land&apos;s End · The Last Resort</p>
          <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-[#1f3d2e] sm:text-5xl">Reservations</h1>
          <p className="mt-4 text-base leading-7 text-stone-700">
            Stay the night, or come for the day. Meal plans are already inside the nightly stay rate.
          </p>
          <p className="mt-3 text-sm text-stone-800">{QUIET_STAY_NOTE}</p>
        </header>

        <figure className="relative mt-8 h-56 overflow-hidden sm:h-80">
          <Image
            src={RESORT_PHOTO}
            alt="Land's End in Sumiran Forest"
            fill
            priority
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover"
          />
        </figure>

        <section className="mt-8 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => router.push("/booking/stay")}
            className="bg-[#1f3d2e] px-6 py-6 text-left text-[#f6f1e6] transition hover:bg-[#173026]"
          >
            <span className="block font-serif text-3xl leading-none">Stay With Us</span>
            <span className="mt-3 block text-sm text-[#e7dcc6]">Individual or small group</span>
          </button>
          <button
            type="button"
            onClick={() => router.push(dayVisitHref)}
            className="bg-[#1f3d2e] px-6 py-6 text-left text-[#f6f1e6] transition hover:bg-[#173026]"
          >
            <span className="block font-serif text-3xl leading-none">Day Visit</span>
            <span className="mt-3 block text-sm text-[#e7dcc6]">Small group</span>
          </button>
        </section>

        <section className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl font-medium text-[#1f3d2e]">Rooms</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
                Nightly rate for the meal plan. Meals are not added again per guest.
              </p>
            </div>
          </div>
          <div className="mt-4 divide-y divide-[#e4d7c3] border-y border-[#e4d7c3]">
            {orderedRooms.map((room) => (
              <article key={room.id} className="flex flex-col gap-4 py-5 lg:flex-row lg:items-center">
                <div className="relative h-44 w-full shrink-0 overflow-hidden sm:h-36 lg:h-28 lg:w-40">
                  <Image
                    src={roomPhoto(room.name)}
                    alt={`${room.name} at Land's End`}
                    fill
                    sizes="(min-width: 1024px) 160px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-2xl text-stone-900">{room.name}</h3>
                  <p className="mt-1 max-w-md text-sm leading-6 text-stone-600">{room.description}</p>
                </div>
                <dl className="grid grid-cols-3 gap-3 lg:w-80">
                  {MEAL_TIERS.map((tier) => (
                    <div key={tier.id}>
                      <dt className="text-[11px] uppercase tracking-wide text-stone-500">{tier.label}</dt>
                      <dd className="mt-1 font-serif text-xl text-stone-900">{inr(nightlyRateForTier(room, tier.id))}</dd>
                    </div>
                  ))}
                </dl>
                <button
                  type="button"
                  onClick={() => router.push("/booking/stay")}
                  className="shrink-0 bg-[#1f3d2e] px-5 py-2.5 text-sm font-semibold text-[#f6f1e6] hover:bg-[#173026]"
                >
                  Book
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-serif text-3xl font-medium text-[#1f3d2e]">Day visits</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
            Per person, from 4 guests. Listed meals are included in the price. Online booking is for up to 10 guests.
          </p>
          <p className="mt-1 text-sm text-stone-700">
            <Link href="/booking/group" className="underline decoration-stone-400 underline-offset-4 hover:text-[#1f3d2e]">
              More than 10 guests? Send a group enquiry.
            </Link>
          </p>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {orderedVisits.map((visit) => {
              const parts = splitIncludedAndAddons(visit.includes || []);
              const hours = visit.timing || `${visit.duration} hours`;
              return (
                <article key={visit.id} className="flex flex-col bg-[#fffdf8] p-5 ring-1 ring-[#e4d7c3]">
                  <h3 className="font-serif text-2xl text-[#1f3d2e]">{visit.name}</h3>
                  <p className="mt-2 text-sm text-stone-700">{hours}</p>
                  <p className="text-sm text-stone-500">{visit.duration} hours · from {visit.minGroupSize || 4} guests</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#6d5a38]">Included</p>
                  <ul className="mt-2 flex-1 space-y-1 text-sm leading-6 text-stone-700">
                    {parts.included.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  {parts.askOnArrival.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-stone-900">{ASK_ON_ARRIVAL_NOTE}</p>
                      <ul className="mt-1 space-y-1 text-sm text-stone-600">
                        {parts.askOnArrival.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#6d5a38]">Meals</p>
                  <p className="mt-1 text-sm leading-6 text-stone-700">{visitMealsText(visit.description, visit.packageType)}</p>
                  <p className="mt-4 font-serif text-3xl text-stone-900">
                    {inr(visit.basePrice)}
                    <span className="ml-2 font-sans text-sm text-stone-600">per person</span>
                  </p>
                  <p className="mt-1 text-sm text-stone-600">
                    About {inr(afterFees(visit.basePrice))} after GST and the online fee
                  </p>
                  <button
                    type="button"
                    onClick={() => router.push(`/booking/visit?type=${visitTypeParam(visit.packageType)}&packageId=${visit.id}`)}
                    className="mt-5 bg-[#1f3d2e] px-4 py-2.5 text-sm font-semibold text-[#f6f1e6] hover:bg-[#173026]"
                  >
                    Book
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="gatherings-heading" className="mt-10 border border-[#e4d7c3] bg-[#fffdf8]">
          <div className="border-b border-[#e4d7c3] px-5 py-6 sm:px-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6d5a38]">Sumiran forest</p>
            <h2 id="gatherings-heading" className="mt-2 font-serif text-3xl font-medium text-[#1f3d2e]">
              Gatherings
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-700">
              A retreat led from outside the house, or a party of more than ten, is written to Land&apos;s End rather than paid for on this page. The resort receives the enquiry and replies.
            </p>
          </div>
          <div className="grid md:grid-cols-2">
            <article className="border-b border-[#e4d7c3] px-5 py-6 sm:px-7 md:border-b-0 md:border-r">
              <h3 className="font-serif text-2xl text-[#1f3d2e]">Retreat</h3>
              <p className="mt-3 text-sm leading-7 text-stone-700">
                For a facilitator hosting a retreat at The Last Resort. The form asks for your name, email and mobile, the retreat date, the nature of the retreat, and how many people you expect.
              </p>
              <p className="mt-3 text-sm leading-6 text-stone-600">An enquiry, not an instant booking. Nothing is charged when you send it.</p>
              <Link
                href="/booking/retreat"
                className="mt-5 inline-block border border-[#1f3d2e] px-5 py-2.5 text-sm font-semibold text-[#1f3d2e] hover:bg-[#1f3d2e] hover:text-[#f6f1e6]"
              >
                Retreat enquiry
              </Link>
            </article>
            <article className="px-5 py-6 sm:px-7">
              <h3 className="font-serif text-2xl text-[#1f3d2e]">Larger group</h3>
              <p className="mt-3 text-sm leading-7 text-stone-700">
                For more than ten guests, either a day in the forest or a stay. Tell us which, and leave the group lead&apos;s name, email, mobile, the date, and an organization if there is one.
              </p>
              <p className="mt-3 text-sm leading-6 text-stone-600">An enquiry, not an instant booking. The house reads it and writes back.</p>
              <Link
                href="/booking/group"
                className="mt-5 inline-block border border-[#1f3d2e] px-5 py-2.5 text-sm font-semibold text-[#1f3d2e] hover:bg-[#1f3d2e] hover:text-[#f6f1e6]"
              >
                Group enquiry
              </Link>
            </article>
          </div>
        </section>

        <section className="mt-14 grid gap-8 border-t border-[#e4d7c3] pt-8 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl text-[#1f3d2e]">Included with every stay</h2>
            <ul className="mt-3 space-y-1 text-sm leading-6 text-stone-700">
              {STAY_INCLUSIONS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-[#1f3d2e]">Add-ons</h2>
            <p className="mt-3 text-sm font-medium text-stone-800">{ASK_ON_ARRIVAL_NOTE}</p>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-stone-700">
              {STAY_ADDONS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-10 border-t border-[#e4d7c3] pt-8 text-sm leading-6 text-stone-700">
          <div className="flex items-center gap-2 text-stone-900">
            <CalendarRange className="h-4 w-4 text-[#1f3d2e]" />
            <h2 className="font-serif text-2xl font-medium text-[#1f3d2e]">Before you book</h2>
          </div>
          <p className="mt-3">Check-in {CHECK_IN_LABEL} · Check-out {CHECK_OUT_LABEL}. Discounted tariffs on longer stays on request.</p>
          <p>{STAY_DINING_NOTE}</p>
          <p>5% GST extra. A 3% online convenience fee is added at checkout.</p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-6">
            <a href={`tel:${RESORT_PHONE_TEL}`} className="inline-flex items-center gap-2 font-medium text-[#1f3d2e]">
              <Phone className="h-4 w-4" /> {RESORT_PHONE_DISPLAY}
            </a>
            <a href={`mailto:${RESORT_EMAIL}`} className="inline-flex items-center gap-2 font-medium text-[#1f3d2e]">
              <Mail className="h-4 w-4" /> {RESORT_EMAIL}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
