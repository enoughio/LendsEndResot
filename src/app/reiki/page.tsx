/*
  ─────────────────────────────────────────────────────────────
  FILE LOCATION:  app/reiki/page.tsx
                  (creates the route landsend.storyretreat.in/reiki)

  IMAGE:          Place Dr. Paula's photo at:
                  /public/images/paula-horan.jpg

  FONTS:          Already handled via next/font/google below.
                  No changes needed to globals.css or layout.tsx.

  TAILWIND:       Add custom fonts to tailwind.config.ts:
                  theme: {
                    extend: {
                      fontFamily: {
                        cinzel:    ['var(--font-cinzel)'],
                        cormorant: ['var(--font-cormorant)'],
                        lato:      ['var(--font-lato)'],
                        garamond:  ['var(--font-garamond)'],
                      },
                    },
                  }
  ─────────────────────────────────────────────────────────────
*/

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Cinzel, Cormorant_Garamond, Lato, EB_Garamond } from "next/font/google";

/* ── Fonts ── */
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cinzel",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});
const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
});
const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
});

const PAYMENT_URL = "https://rzp.io/rzp/8AloDe1";

export default function ReikiWorkshopPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fontVars = `${cinzel.variable} ${cormorant.variable} ${lato.variable} ${garamond.variable}`;

  return (
    <div className={`${fontVars} bg-[#f5ede0] text-[#2c1f0e] overflow-x-hidden`}>



      {/* HERO */}
      <div className="relative min-h-screen bg-[#0d2014] flex flex-col items-center justify-center overflow-hidden">

        {/* BG photo */}
        <div className="absolute inset-0">
          <Image
            src="/events/paula-horan.jpg"
            alt="Dr. Paula Horan"
            fill
            className="object-cover object-[center_25%]"
            style={{ opacity: 0.15, filter: "saturate(0.35) brightness(0.55)" }}
            priority
          />
        </div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg,rgba(8,22,14,0.55) 0%,rgba(13,32,20,0.25) 35%,rgba(8,22,14,0.75) 72%,rgba(5,15,9,1) 100%)",
          }}
        />

        <div
          className={`relative z-10 text-center px-6 py-24 max-w-4xl w-full transition-all duration-700 ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {/* Venue */}
          <p className="font-cinzel text-[13px] tracking-[5px] text-[#b89b4e] uppercase mb-7">
            Land&apos;s End – The Last Resort&nbsp;&nbsp;·&nbsp;&nbsp;Sumiran Forest&nbsp;&nbsp;·&nbsp;&nbsp;1 hr from Bhopal
          </p>

          {/* Title */}
          <h1
            className="font-cinzel font-bold text-[#e8d5a0] tracking-[8px] leading-none mb-3"
            style={{ fontSize: "clamp(52px,10vw,108px)" }}
          >
            REIKI
          </h1>
          <p
            className="font-cinzel text-[rgba(232,213,160,0.6)] tracking-[12px] mb-5"
            style={{ fontSize: "clamp(13px,2.5vw,22px)" }}
          >
            LEVEL ONE WORKSHOP
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-28 h-px" style={{ background: "linear-gradient(90deg,transparent,#b89b4e,transparent)" }} />
            <span className="text-[#b89b4e] text-sm">✦</span>
            <div className="w-28 h-px" style={{ background: "linear-gradient(90deg,transparent,#b89b4e,transparent)" }} />
          </div>

          {/* Sub-headings */}
          <p
            className="font-cormorant italic text-[rgba(232,213,160,0.92)] mb-3 leading-snug"
            style={{ fontSize: "clamp(20px,3.5vw,36px)" }}
          >
            Become a Certified Reiki Practitioner
          </p>
          <p
            className="font-lato font-light text-[rgba(210,192,148,0.78)] mb-10 leading-relaxed"
            style={{ fontSize: "clamp(14px,2vw,20px)" }}
          >
            Learn from Dr. Paula Horan, the woman who brought Reiki to India.
          </p>

          {/* Date badges */}
          <div className="flex justify-center flex-wrap mb-12">
            {[
              { label: "Weekend",   val: "9 – 10 May 2026" },
              { label: "Begins",    val: "Sat, 9 AM"        },
              { label: "Concludes", val: "Sun, 5 PM"        },
            ].map((d, i) => (
              <div
                key={i}
                className="text-center px-8 py-3.5"
                style={{
                  border: "0.5px solid rgba(184,155,78,0.35)",
                  borderLeft: i > 0 ? "none" : "0.5px solid rgba(184,155,78,0.35)",
                }}
              >
                <div className="font-cinzel text-[10px] tracking-[3px] text-[rgba(184,155,78,0.65)] uppercase mb-1.5">
                  {d.label}
                </div>
                <div className="font-garamond font-bold text-[#e8d5a0] text-[21px]">{d.val}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href={PAYMENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-cinzel text-[12px] tracking-[4px] uppercase bg-[#e2c97e] text-[#0d2014] px-14 py-5 mb-5 hover:bg-[#e8d5a0] transition-colors duration-300"
          >
            Reserve Your Seat
          </a>
          <p className="font-lato text-[13px] tracking-[2px] text-[rgba(184,155,78,0.55)]">
            Seats are strictly limited&nbsp;&nbsp;·&nbsp;&nbsp;₹&nbsp;11,990 per person
          </p>
        </div>

        {/* Scroll arrow */}
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 text-[rgba(184,155,78,0.45)] text-2xl animate-bounce">
          ↓
        </div>
      </div>


      {/* ══════════════════════════════════════════
          BIO
      ══════════════════════════════════════════ */}
      <div className="bg-[#0d2014] py-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start gap-16">

          {/* Photo */}
          <div
            className="relative flex-shrink-0 w-full md:w-80 h-96 overflow-hidden"
            style={{
              border: "1.5px solid rgba(184,155,78,0.35)",
              boxShadow: "0 0 0 8px rgba(184,155,78,0.06), 0 24px 60px rgba(0,0,0,0.6)",
            }}
          >
            <Image
              src="/events/paula-horan.jpg"
              alt="Dr. Paula Horan"
              fill
              className="object-cover object-[center_12%]"
              style={{ filter: "brightness(0.93) saturate(0.88)" }}
            />
          </div>

          {/* Bio text */}
          <div className="flex-1 pt-2">
            <p className="font-cinzel text-[11px] tracking-[5px] text-[#b89b4e] uppercase mb-3">
              Your Guide
            </p>
            <h2 className="font-cormorant font-light italic text-[#e8d5a0] text-[52px] leading-tight mb-2">
              Dr. Paula Horan
            </h2>
            <p className="font-lato text-[14px] tracking-widest text-[rgba(184,155,78,0.65)] mb-7">
              International Reiki Master&nbsp;·&nbsp;Author&nbsp;·&nbsp;Healer
            </p>
            <div className="space-y-5 font-lato font-light text-[17px] leading-[1.95] text-[rgba(220,205,175,0.82)]">
              <p>
                Dr. Paula Horan is widely credited as{" "}
                <em className="italic text-[rgba(232,213,160,0.9)]">
                  the woman who brought Reiki to India
                </em>{" "}
                — introducing the sacred Japanese healing art to the subcontinent in 1989, and to
                China shortly after. A world-renowned healer with over 40 years of practice, she
                was personally blessed by her Guru Sri H.W.L. Poonja (Papaji) to pioneer Reiki
                across Asia.
              </p>
              <p>
                The author of four books on Reiki — including the internationally acclaimed{" "}
                <em className="italic text-[rgba(232,213,160,0.9)]">Empowerment Through Reiki</em>{" "}
                — Dr. Horan has trained thousands of practitioners across the globe. She brings
                rare depth, authenticity, and grace to everything she teaches.
              </p>
              <p>
                Learning directly from Dr. Paula Horan is a rare privilege. This workshop offers
                exactly that — in an intimate forest setting with strictly limited seats.
              </p>
            </div>
          </div>
        </div>
      </div>


      {/* ══════════════════════════════════════════
          VENUE
      ══════════════════════════════════════════ */}
      <div className="bg-[#1a3a22] py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="font-cinzel text-[10px] tracking-[5px] text-[#b89b4e] uppercase mb-4">Where</p>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 flex-wrap">
            <div className="flex-1 min-w-[260px]">
              <h3
                className="font-cormorant font-semibold text-[#e8d5a0] leading-tight mb-2"
                style={{ fontSize: "clamp(26px,4vw,42px)" }}
              >
                Land&apos;s End – The Last Resort
              </h3>
              <p className="font-lato text-[17px] text-[rgba(210,192,148,0.75)] tracking-wide">
                Sumiran Forest&nbsp;·&nbsp;1 hr from Bhopal, Madhya Pradesh
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {["Healing Forest", "AC Stay Included", "All Meals Included", "Private Room Available"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="font-cinzel text-[11px] tracking-[3px] text-[rgba(184,155,78,0.75)] uppercase px-5 py-2.5"
                    style={{ border: "0.5px solid rgba(184,155,78,0.3)" }}
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>


      {/* ══════════════════════════════════════════
          BENEFITS
      ══════════════════════════════════════════ */}
      <div className="bg-[#f0e9d8] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="font-cinzel text-[10px] tracking-[5px] text-[#4a7c5a] uppercase mb-4">
            What You&apos;ll Gain
          </p>
          <h2
            className="font-cormorant text-[#1a3a22] mb-10"
            style={{ fontSize: "clamp(30px,4.5vw,48px)", fontWeight: 400 }}
          >
            An Opening, Not Just a Skill
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {[
              {
                title: "Universal Life Force Energy",
                body: "Learn to access and channel the fundamental energy that underlies all life — dissolving blockages and restoring the body's natural flow.",
              },
              {
                title: "Deep Relaxation & Clarity",
                body: "Experience profound states of calm and emotional clarity that recalibrate your nervous system and quiet the noise of daily life.",
              },
              {
                title: "Heightened Intuition",
                body: "Develop sensitivity to energy — in yourself and others — opening a new layer of awareness that informs every area of your life.",
              },
              {
                title: "Restored Harmony",
                body: "Rebalance body, mind, and spirit — returning to a state of wholeness that modern life systematically disrupts.",
              },
              {
                title: "Innate Self-Healing",
                body: "Awaken your body's remarkable capacity to heal itself. Reiki is not something given from outside — it is something remembered within.",
              },
              {
                title: "Recognised Certification",
                body: "Receive a globally recognised Level 1 Reiki certification from one of the world's most respected masters — a skill you carry for life.",
              },
            ].map((b, i) => (
              <div key={i} className="bg-white pl-6 pr-6 py-8 border-l-[3px] border-[#b89b4e]">
                <h4 className="font-cormorant font-semibold text-[#1a3a22] text-[23px] mb-3">
                  {b.title}
                </h4>
                <p className="font-lato font-light text-[15px] text-[#5a4a38] leading-[1.85]">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* ══════════════════════════════════════════
          HIGHLIGHTS
      ══════════════════════════════════════════ */}
      <div className="bg-[#1a3a22] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="font-cinzel text-[10px] tracking-[5px] text-[#b89b4e] uppercase mb-4">
            The Experience
          </p>
          <h2
            className="font-cormorant text-[#e8d5a0] mb-10"
            style={{ fontSize: "clamp(30px,4.5vw,48px)", fontWeight: 400 }}
          >
            Set in Sumiran Forest
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🌿",
                title: "Forest Setting",
                body: "Land's End sits within Sumiran Forest near Bhopal — a rare, restorative backdrop for deep inner work.",
              },
              {
                icon: "🏡",
                title: "Stay Included",
                body: "Shared air-conditioned accommodation on-site. Private room option available on request.",
              },
              {
                icon: "🍃",
                title: "All Meals Included",
                body: "Breakfast, lunch, high tea, and dinner throughout the weekend — nourishing you from arrival to farewell.",
              },
              {
                icon: "🌒",
                title: "Guided Forest Walk",
                body: "An evening walk through the forest on Day 1 — allowing the practice to settle into the body and breath.",
              },
            ].map((h, i) => (
              <div
                key={i}
                className="text-center p-8"
                style={{ border: "0.5px solid rgba(184,155,78,0.25)" }}
              >
                <div className="text-[30px] mb-4">{h.icon}</div>
                <h4 className="font-cinzel text-[12px] tracking-[2px] text-[#e2c97e] uppercase mb-3">
                  {h.title}
                </h4>
                <p className="font-lato font-light text-[14px] text-[rgba(220,205,175,0.7)] leading-[1.7]">
                  {h.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* ══════════════════════════════════════════
          ITINERARY
      ══════════════════════════════════════════ */}
      <div className="bg-white py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="font-cinzel text-[10px] tracking-[5px] text-[#4a7c5a] uppercase mb-4">
            Programme
          </p>
          <h2
            className="font-cormorant text-[#1a3a22] mb-12"
            style={{ fontSize: "clamp(30px,4.5vw,48px)", fontWeight: 400 }}
          >
            Two Days of Immersion
          </h2>

          {[
            {
              day: "Day One · Saturday, 9 May 2026",
              rows: [
                { time: "8:30 AM",  event: "Arrival & Breakfast",    detail: "Settle in, meet fellow participants" },
                { time: "9:00 AM",  event: "Morning Session Begins", detail: "Opening circle, history & principles of Reiki" },
                { time: "1:00 PM",  event: "Lunch Break",            detail: "" },
                { time: "2:00 PM",  event: "Afternoon Session",      detail: "Attunement, hands-on practice, energy work" },
                { time: "5:00 PM",  event: "Day 1 Concludes",        detail: "Reflection & High Tea" },
                { time: "6:00 PM",  event: "Guided Forest Walk",     detail: "Meditative evening walk through Sumiran Forest" },
                { time: "8:00 PM",  event: "Dinner",                 detail: "" },
                { time: "10:00 PM", event: "Lights Out",             detail: "" },
              ],
            },
            {
              day: "Day Two · Sunday, 10 May 2026",
              rows: [
                { time: "8:00 AM", event: "Breakfast",          detail: "" },
                { time: "9:00 AM", event: "Morning Session",     detail: "Deepening practice, self-healing techniques" },
                { time: "1:00 PM", event: "Lunch Break",         detail: "" },
                { time: "2:00 PM", event: "Afternoon Session",   detail: "Healing others, certification attunements, closing ceremony" },
                { time: "5:00 PM", event: "Workshop Concludes — Level 1 Certificates Awarded", detail: "High Tea · Departure" },
              ],
            },
          ].map((day) => (
            <div key={day.day} className="mb-14">
              <div className="font-cinzel text-[13px] tracking-[4px] text-[#1a3a22] uppercase border-b border-[rgba(74,124,90,0.25)] pb-4 mb-7">
                {day.day}
              </div>
              {day.rows.map((row, i) => (
                <div
                  key={i}
                  className="flex items-stretch border-b border-[rgba(200,190,175,0.4)]"
                >
                  <div className="w-32 md:w-36 shrink-0 font-garamond font-bold text-[#b89b4e] text-[17px] py-4 pr-4 md:pr-5 border-r border-[rgba(74,124,90,0.2)]">
                    {row.time}
                  </div>
                  <div className="py-4 pl-5 md:pl-7 font-lato text-[15px] text-[#4a3c2c] leading-[1.55] flex-1">
                    <span className="font-bold text-[#1a3a22]">{row.event}</span>
                    {row.detail && (
                      <span className="font-light text-[#7a6a58]"> — {row.detail}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>


      {/* ══════════════════════════════════════════
          PRICING
      ══════════════════════════════════════════ */}
      <div className="bg-[#ede0c8] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="font-cinzel text-[10px] tracking-[5px] text-[#4a7c5a] uppercase mb-4">
            Investment
          </p>
          <h2
            className="font-cormorant text-[#1a3a22] mb-10"
            style={{ fontSize: "clamp(30px,4.5vw,48px)", fontWeight: 400 }}
          >
            Energy Exchange
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">

            {/* Shared room */}
            <div className="bg-white p-10 border-t-[3px] border-[#b89b4e]">
              <p className="font-cinzel text-[11px] tracking-[3px] text-[#4a7c5a] uppercase mb-3">
                Shared Room
              </p>
              <p className="font-garamond font-bold text-[#1a3a22] text-[54px] leading-none mb-2">
                ₹&nbsp;11,990
              </p>
              <p className="font-lato font-light text-[13px] tracking-widest text-[rgba(90,74,56,0.6)] uppercase mb-6">
                per person
              </p>
              <ul className="space-y-0">
                {[
                  "Level 1 Reiki Certification",
                  "Two-day workshop with Dr. Paula Horan",
                  "Shared AC accommodation (1 night)",
                  "All meals — Sat breakfast through Sun high tea",
                  "Guided evening forest walk",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="font-lato text-[14px] text-[#5a4a38] py-2.5 flex items-start gap-3 border-b border-[rgba(200,190,175,0.35)] leading-snug"
                  >
                    <span className="text-[#b89b4e] text-[8px] mt-1.5 shrink-0">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Private room */}
            <div className="bg-[#1a3a22] p-10 border-t-[3px] border-[#e2c97e]">
              <p className="font-cinzel text-[11px] tracking-[3px] text-[#b89b4e] uppercase mb-3">
                Private Room
              </p>
              <p className="font-cormorant font-semibold text-[#e8d5a0] text-[40px] leading-none mb-2 pt-2">
                On Request
              </p>
              <p className="font-lato font-light text-[13px] tracking-widest text-[rgba(184,155,78,0.55)] uppercase mb-6">
                limited availability
              </p>
              <ul className="space-y-0">
                {[
                  "All inclusions of Shared Room",
                  "Private air-conditioned room",
                  "Enhanced personal space & privacy",
                  "Contact us for pricing & availability",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="font-lato text-[14px] text-[rgba(220,205,175,0.82)] py-2.5 flex items-start gap-3 border-b border-[rgba(184,155,78,0.15)] leading-snug"
                  >
                    <span className="text-[#b89b4e] text-[8px] mt-1.5 shrink-0">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>


      {/* ══════════════════════════════════════════
          REGISTER
      ══════════════════════════════════════════ */}
      <div id="register" className="bg-[#0d2014] py-28 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <p className="font-cinzel text-[10px] tracking-[5px] text-[#b89b4e] uppercase mb-4">
            Reserve Your Place
          </p>
          <h2
            className="font-cormorant text-[#e8d5a0] mb-6"
            style={{ fontSize: "clamp(30px,4.5vw,48px)", fontWeight: 400 }}
          >
            Seats Are Strictly Limited
          </h2>
          <p className="font-lato font-light text-[16px] text-[rgba(220,205,175,0.65)] max-w-xl mx-auto mb-10 leading-[1.9]">
            This is a rare opportunity to learn Reiki in an intimate forest setting, guided by one
            of the world&apos;s most respected masters. Once the cohort is full, registration closes.
          </p>
          <a
            href={PAYMENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-cinzel text-[12px] tracking-[4px] uppercase bg-[#e2c97e] text-[#0d2014] px-16 py-5 mb-8 hover:bg-[#e8d5a0] transition-colors duration-300"
          >
            Register Now
          </a>
          <p className="font-cormorant text-[26px] text-[rgba(232,213,160,0.75)] tracking-wide">
            Questions?&nbsp;&nbsp;+91 88713 17382
          </p>
        </div>
      </div>


      {/* ══════════════════════════════════════════
          STANDALONE FOOTER
      ══════════════════════════════════════════ */}
      <footer className="bg-[#060d08] py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-cormorant italic text-[#e8d5a0] text-[20px] mb-1">
              Land&apos;s End – The Last Resort
            </p>
            <p className="font-lato font-light text-[12px] tracking-[2px] text-[rgba(184,155,78,0.5)]">
              Sumiran Forest, Near Bhopal, Madhya Pradesh
            </p>
          </div>
          <div className="text-center">
            <p className="font-lato font-light text-[12px] tracking-[2px] text-[rgba(184,155,78,0.4)] mb-1">
              Enquiries & Registration
            </p>
            <p className="font-garamond text-[#e8d5a0] text-[20px]">+91 88713 17382</p>
          </div>
          <div className="text-center md:text-right">
            <a
              href={PAYMENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-cinzel text-[10px] tracking-[3px] uppercase bg-[#e2c97e] text-[#0d2014] px-6 py-3 hover:bg-[#e8d5a0] transition-colors duration-300 mb-3"
            >
              Register Now
            </a>
            <p className="font-lato text-[11px] tracking-[1px] text-[rgba(184,155,78,0.3)]">
              © 2026 Land&apos;s End – The Last Resort
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
