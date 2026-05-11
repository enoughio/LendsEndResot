'use client';

import Link from "next/link";
import React, { useEffect } from "react";
 
// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

interface Package {
  nights: number;
  label: string;
  price: number;
  rack: number;
  discount: number;
  perNight: number;
  perks: { text: string; highlight: boolean }[];
  best?: boolean;
}

interface Amenity {
  icon: string;
  name: string;
  desc: string;
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const PACKAGES: Package[] = [
  {
    nights: 3,
    label: "Weekend Escape",
    price: 5399,
    rack: 5997,
    discount: 10,
    perNight: 1800,
    perks: [
      { text: "AC dorm stay · 3 nights", highlight: false },
      { text: "All meals throughout", highlight: false },
      { text: "1 guided forest walk", highlight: true },
    ],
  },
  {
    nights: 7,
    label: "Deep Work Week",
    price: 11899,
    rack: 13993,
    discount: 15,
    perNight: 1700,
    perks: [
      { text: "AC dorm stay · 7 nights", highlight: false },
      { text: "All meals throughout", highlight: false },
      { text: "2 guided forest walks", highlight: true },
      { text: "1 bonfire evening", highlight: true },
      { text: "Laundry (twice a week)", highlight: true },
    ],
  },
  {
    nights: 14,
    label: "Forest Fortnight",
    price: 22399,
    rack: 27986,
    discount: 20,
    perNight: 1600,
    perks: [
      { text: "AC dorm stay · 14 nights", highlight: false },
      { text: "All meals throughout", highlight: false },
      { text: "2 guided forest walks", highlight: true },
      { text: "1 bonfire evening", highlight: true },
      { text: "Laundry included", highlight: true },
      { text: "Weekly 1:1 with Naturalist", highlight: true },
      { text: "Welcome kit — local produce", highlight: true },
    ],
  },
  {
    nights: 30,
    label: "Work from Forest Month",
    price: 44999,
    rack: 59970,
    discount: 25,
    perNight: 1500,
    best: true,
    perks: [
      { text: "AC dorm stay · 30 nights", highlight: false },
      { text: "All meals throughout", highlight: false },
      { text: "Guided forest walks", highlight: true },
      { text: "Bonfire evenings", highlight: true },
      { text: "Laundry included", highlight: true },
      { text: "Weekly 1:1 with Naturalist", highlight: true },
      { text: "Welcome kit — local produce", highlight: true },
      { text: "Priority workspace reservation", highlight: true },
      { text: "Monthly community dinner & bonfire", highlight: true },
    ],
  },
];

const AMENITIES: Amenity[] = [
  {
    icon: "🌿",
    name: "Sumiran Forest Access",
    desc: "Morning walks, birdsong, dappled light. Step outside into the wild — any time of day.",
  },
  {
    icon: "💻",
    name: "AC Workspace",
    desc: "Comfortable indoor workspace with reliable connectivity — built for focused, productive days.",
  },
  {
    icon: "🌳",
    name: "Forest Work Zones",
    desc: "Open-air seating beneath the canopy — ideal for calls, writing, and creative thinking.",
  },
  {
    icon: "🍽️",
    name: "All Meals Included",
    desc: "Breakfast, lunch, evening tea and dinner — wholesome, home-style meals every single day.",
  },
  {
    icon: "🛏️",
    name: "AC Dorm Stay",
    desc: "Clean, cool, comfortable shared accommodation in a peaceful forest setting near Bhopal.",
  },
  {
    icon: "🔥",
    name: "Forest Experiences",
    desc: "Guided walks, bonfire evenings, naturalist sessions — woven through your stay, not bolted on.",
  },
];

const DAY_PASS_INCLUDES = [
  "Welcome drink",
  "Lunch",
  "High tea",
  "1 complimentary coffee",
  "AC workspace",
  "Forest work zones",
];

const HERO_PILLS = [
  "AC Dorm Stay",
  "All Meals",
  "AC Workspace",
  "Forest Work Zones",
  "Sumiran Forest",
];

const fmt = (n: number) =>
  "₹" + n.toLocaleString("en-IN");

// ─────────────────────────────────────────────
// STYLES (CSS-in-JS via <style> injection)
// ─────────────────────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --forest:      #182b1c;
  --forest-mid:  #1f3524;
  --forest-card: #243d29;
  --moss:        #3d6647;
  --cream:       #f6f1e9;
  --cream-warm:  #ede5d4;
  --amber:       #c8914a;
  --amber-lt:    #e5b878;
  --white:       #ffffff;
  --text:        #1c1a15;
  --muted:       #6b6255;
  --nav-h:       64px;
}

html { scroll-behavior: smooth; }
body { font-family: 'Jost', sans-serif; background: var(--cream); color: var(--text); font-weight: 300; line-height: 1.65; -webkit-font-smoothing: antialiased; }

/* NAV */
.wff-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; height: var(--nav-h); background: rgba(24,43,28,0.92); backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: space-between; padding: 0 48px; border-bottom: 0.5px solid rgba(200,145,74,0.18); }
.wff-nav-brand { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 400; color: var(--cream); text-decoration: none; }
.wff-nav-brand span { color: var(--amber-lt); font-style: italic; }
.wff-nav-links { display: flex; align-items: center; gap: 32px; list-style: none; }
.wff-nav-links a { font-size: 12px; letter-spacing: 1.8px; text-transform: uppercase; color: rgba(246,241,233,0.6); text-decoration: none; transition: color 0.2s; font-weight: 400; }
.wff-nav-links a:hover { color: var(--amber-lt); }
.wff-nav-cta { background: var(--amber) !important; color: var(--forest) !important; padding: 9px 18px !important; border-radius: 2px !important; font-weight: 500 !important; transition: background 0.2s !important; }
.wff-nav-cta:hover { background: var(--amber-lt) !important; }

/* HERO */
.wff-hero { min-height: 100vh; background: var(--forest); display: flex; align-items: center; position: relative; overflow: hidden; padding: calc(var(--nav-h) + 60px) 48px 80px; }
.wff-glow { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
.wff-glow-1 { width: 500px; height: 500px; background: rgba(61,102,71,0.22); top: -100px; right: -80px; }
.wff-glow-2 { width: 360px; height: 360px; background: rgba(200,145,74,0.08); bottom: 40px; left: -60px; }
.wff-hero-inner { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 380px; gap: 64px; align-items: center; }
.wff-eyebrow { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--amber-lt); font-weight: 400; margin-bottom: 18px; display: flex; align-items: center; gap: 10px; }
.wff-eyebrow::before { content: ''; display: inline-block; width: 28px; height: 0.5px; background: var(--amber); }
.wff-h1 { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: clamp(52px,7vw,82px); line-height: 1.0; color: var(--cream); letter-spacing: -0.5px; margin-bottom: 12px; }
.wff-h1 em { font-style: italic; color: var(--amber-lt); display: block; }
.wff-hero-tagline { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 20px; color: rgba(246,241,233,0.55); font-weight: 300; margin-bottom: 24px; }
.wff-hero-desc { font-size: 15px; color: rgba(246,241,233,0.70); line-height: 1.85; max-width: 480px; font-weight: 300; margin-bottom: 40px; }
.wff-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 44px; }
.wff-pill { font-size: 11px; letter-spacing: 1.2px; text-transform: uppercase; color: rgba(229,184,120,0.8); border: 0.5px solid rgba(200,145,74,0.35); padding: 5px 13px; border-radius: 999px; font-weight: 400; }
.wff-btn-primary { display: inline-flex; align-items: center; gap: 10px; background: var(--amber); color: var(--forest); font-family: 'Jost', sans-serif; font-size: 13px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; padding: 16px 32px; border-radius: 3px; text-decoration: none; transition: background 0.25s, transform 0.15s; cursor: pointer; border: none; }
.wff-btn-primary:hover { background: var(--amber-lt); transform: translateY(-1px); }
.wff-stat-card { background: rgba(255,255,255,0.04); border: 0.5px solid rgba(200,145,74,0.20); border-radius: 6px; padding: 32px; backdrop-filter: blur(8px); }
.wff-stat-label { font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: var(--amber-lt); font-weight: 400; margin-bottom: 24px; }
.wff-stat-row { display: flex; justify-content: space-between; align-items: baseline; padding: 10px 0; border-bottom: 0.5px solid rgba(200,145,74,0.12); }
.wff-stat-row:last-child { border-bottom: none; }
.wff-stat-name { font-size: 13px; color: rgba(246,241,233,0.7); font-weight: 300; }
.wff-stat-val { font-family: 'Cormorant Garamond', serif; font-size: 20px; color: var(--cream); font-weight: 400; }
.wff-stat-disc { font-size: 10px; background: rgba(61,102,71,0.5); color: #8fcca0; padding: 2px 7px; border-radius: 999px; margin-left: 6px; font-weight: 500; }
.wff-scroll-hint { position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 6px; color: rgba(246,241,233,0.25); font-size: 10px; letter-spacing: 2px; text-transform: uppercase; }
.wff-scroll-line { width: 0.5px; height: 40px; background: linear-gradient(to bottom, transparent, rgba(200,145,74,0.4)); animation: scrollPulse 2s ease-in-out infinite; }
@keyframes scrollPulse { 0%,100%{opacity:0.4;transform:scaleY(0.8)}50%{opacity:1;transform:scaleY(1)} }

/* SECTION LABEL */
.wff-section-label { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--amber); font-weight: 500; margin-bottom: 10px; display: flex; align-items: center; gap: 10px; }
.wff-section-label::before { content: ''; display: inline-block; width: 20px; height: 0.5px; background: var(--amber); }

/* DAY PASS */
.wff-daypass { background: var(--forest-mid); padding: 0 48px; }
.wff-daypass-inner { max-width: 1100px; margin: 0 auto; display: flex; align-items: stretch; }
.wff-daypass-content { flex: 1; padding: 52px 48px 52px 0; border-right: 0.5px solid rgba(200,145,74,0.15); }
.wff-daypass-title { font-family: 'Cormorant Garamond', serif; font-size: 38px; font-weight: 300; color: var(--cream); line-height: 1.1; margin-bottom: 16px; }
.wff-daypass-desc { font-size: 14px; color: rgba(246,241,233,0.55); margin-bottom: 24px; font-weight: 300; }
.wff-daypass-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.wff-incl-tag { font-size: 11.5px; color: rgba(246,241,233,0.7); border: 0.5px solid rgba(246,241,233,0.15); padding: 5px 12px; border-radius: 2px; font-weight: 300; display: flex; align-items: center; gap: 6px; }
.wff-incl-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--amber); flex-shrink: 0; }
.wff-daypass-price-block { flex-shrink: 0; width: 220px; display: flex; align-items: center; justify-content: center; padding: 0 48px; text-align: center; flex-direction: column; }
.wff-dp-amount { font-family: 'Cormorant Garamond', serif; font-size: 60px; font-weight: 300; color: var(--amber-lt); line-height: 1; }
.wff-dp-amount sup { font-size: 24px; vertical-align: top; margin-top: 12px; }
.wff-dp-unit { font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(246,241,233,0.35); margin-top: 6px; }
.wff-dp-cta { margin-top: 20px; display: inline-block; border: 0.5px solid var(--amber); color: var(--amber-lt); font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; padding: 9px 18px; border-radius: 2px; text-decoration: none; font-weight: 500; transition: background 0.2s, color 0.2s; }
.wff-dp-cta:hover { background: var(--amber); color: var(--forest); }

/* PACKAGES */
.wff-packages-wrap { padding: 88px 48px; max-width: 1100px; margin: 0 auto; }
.wff-section-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 48px; gap: 24px; flex-wrap: wrap; }
.wff-h2 { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: 46px; color: var(--forest); line-height: 1.05; }
.wff-h2 em { font-style: italic; color: var(--moss); }
.wff-section-note { font-size: 13px; color: var(--muted); max-width: 280px; text-align: right; font-weight: 300; line-height: 1.7; }
.wff-pkg-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1px; background: #ddd5c4; border: 1px solid #ddd5c4; border-radius: 6px; overflow: hidden; }
.wff-pkg { background: var(--white); display: flex; flex-direction: column; position: relative; transition: box-shadow 0.25s; }
.wff-pkg:hover { z-index: 2; box-shadow: 0 8px 40px rgba(24,43,28,0.14); }
.wff-pkg.best { background: var(--forest); }
.wff-pkg-top { padding: 28px 24px 22px; border-bottom: 1px solid #ede5d4; }
.wff-pkg.best .wff-pkg-top { border-bottom-color: rgba(200,145,74,0.2); }
.wff-badge-wrap { height: 22px; margin-bottom: 14px; }
.wff-best-badge { display: inline-block; background: var(--amber); color: var(--forest); font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; padding: 3px 10px; border-radius: 2px; font-weight: 600; }
.wff-pkg-duration { font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: var(--moss); font-weight: 500; margin-bottom: 4px; }
.wff-pkg.best .wff-pkg-duration { color: var(--amber-lt); }
.wff-pkg-name { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; color: var(--forest); line-height: 1.15; }
.wff-pkg.best .wff-pkg-name { color: var(--cream); }
.wff-pkg-mid { padding: 22px 24px 0; }
.wff-pkg-price { font-family: 'Cormorant Garamond', serif; font-size: 38px; font-weight: 400; color: var(--forest); line-height: 1; margin-bottom: 4px; }
.wff-pkg-price sup { font-size: 16px; vertical-align: super; }
.wff-pkg.best .wff-pkg-price { color: var(--amber-lt); }
.wff-rack-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.wff-rack { font-size: 12px; text-decoration: line-through; color: #b0a898; }
.wff-pkg.best .wff-rack { color: rgba(246,241,233,0.3); }
.wff-save { font-size: 10px; background: #edf5e6; color: #3b6611; padding: 2px 7px; border-radius: 2px; font-weight: 500; }
.wff-pkg.best .wff-save { background: rgba(61,102,71,0.5); color: #a8d8b0; }
.wff-nightly { font-size: 12px; color: var(--muted); margin-bottom: 22px; font-weight: 300; }
.wff-pkg.best .wff-nightly { color: rgba(246,241,233,0.45); }
.wff-pkg-perks { list-style: none; padding: 20px 24px; flex: 1; border-top: 1px solid #ede5d4; }
.wff-pkg.best .wff-pkg-perks { border-top-color: rgba(200,145,74,0.2); }
.wff-perk { font-size: 13px; padding: 6px 0 6px 18px; position: relative; color: #4a4438; line-height: 1.5; font-weight: 300; }
.wff-perk::before { content: ''; position: absolute; left: 0; top: 13px; width: 6px; height: 6px; border-radius: 50%; background: #c4b89e; }
.wff-perk.hi { color: var(--forest); font-weight: 400; }
.wff-perk.hi::before { background: var(--moss); }
.wff-pkg.best .wff-perk { color: rgba(246,241,233,0.72); }
.wff-pkg.best .wff-perk.hi { color: var(--cream); font-weight: 400; }
.wff-pkg.best .wff-perk.hi::before { background: var(--amber-lt); }
.wff-pkg.best .wff-perk::before { background: rgba(200,145,74,0.35); }
.wff-pkg-bottom { padding: 20px 24px 24px; border-top: 1px solid #ede5d4; margin-top: auto; }
.wff-pkg.best .wff-pkg-bottom { border-top-color: rgba(200,145,74,0.2); }
.wff-pkg-btn { display: block; width: 100%; text-align: center; padding: 11px 0; font-size: 11px; letter-spacing: 1.8px; text-transform: uppercase; font-weight: 500; border-radius: 3px; text-decoration: none; transition: all 0.2s; cursor: pointer; border: none; font-family: 'Jost', sans-serif; }
.wff-pkg-btn.outline { border: 0.5px solid #c4b89e; color: var(--forest); background: transparent; }
.wff-pkg-btn.outline:hover { border-color: var(--amber); color: var(--amber); }
.wff-pkg-btn.fill { background: var(--amber); color: var(--forest); border: none; }
.wff-pkg-btn.fill:hover { background: var(--amber-lt); }
.wff-base-note { display: flex; align-items: center; gap: 16px; padding: 20px 28px; background: #f0ead9; border-left: 2px solid var(--amber); border-radius: 3px; margin-top: 28px; flex-wrap: wrap; }
.wff-base-note p { font-size: 13px; color: var(--muted); font-weight: 300; }
.wff-base-note strong { color: var(--text); font-weight: 500; }

/* AMENITIES */
.wff-amenities { background: var(--forest); padding: 88px 48px; }
.wff-amenities-inner { max-width: 1100px; margin: 0 auto; }
.wff-amenities-header { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-bottom: 60px; align-items: end; }
.wff-amenities-h2 { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: 44px; color: var(--cream); line-height: 1.05; }
.wff-amenities-desc { font-size: 14px; color: rgba(246,241,233,0.55); line-height: 1.85; font-weight: 300; }
.wff-amenity-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: rgba(200,145,74,0.12); border: 0.5px solid rgba(200,145,74,0.12); border-radius: 4px; overflow: hidden; }
.wff-amenity { background: var(--forest-mid); padding: 28px 26px; transition: background 0.2s; }
.wff-amenity:hover { background: var(--forest-card); }
.wff-amenity-icon { font-size: 22px; margin-bottom: 12px; display: block; }
.wff-amenity-name { font-size: 15px; font-weight: 500; color: var(--cream); margin-bottom: 6px; }
.wff-amenity-desc { font-size: 12.5px; color: rgba(246,241,233,0.48); line-height: 1.7; font-weight: 300; }

/* CTA BANNER */
.wff-cta { background: var(--cream-warm); padding: 72px 48px; text-align: center; }
.wff-cta-inner { max-width: 620px; margin: 0 auto; }
.wff-cta-eyebrow { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--amber); font-weight: 500; margin-bottom: 14px; }
.wff-cta-h2 { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: 48px; color: var(--forest); line-height: 1.05; margin-bottom: 16px; }
.wff-cta-h2 em { font-style: italic; color: var(--moss); }
.wff-cta-sub { font-size: 14px; color: var(--muted); margin-bottom: 36px; line-height: 1.8; font-weight: 300; }
.wff-cta-buttons { display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; }
.wff-btn-secondary { display: inline-flex; align-items: center; gap: 8px; border: 0.5px solid var(--forest); color: var(--forest); font-family: 'Jost', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 1.8px; text-transform: uppercase; padding: 14px 26px; border-radius: 3px; text-decoration: none; transition: all 0.2s; }
.wff-btn-secondary:hover { background: var(--forest); color: var(--cream); }

/* FOOTER */
.wff-footer { background: var(--forest); padding: 40px 48px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; border-top: 0.5px solid rgba(200,145,74,0.15); }
.wff-footer-brand { font-family: 'Cormorant Garamond', serif; font-size: 19px; color: var(--cream); font-weight: 400; line-height: 1.3; }
.wff-footer-brand small { display: block; font-family: 'Jost', sans-serif; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: rgba(246,241,233,0.35); font-weight: 400; margin-bottom: 3px; }
.wff-footer-links { display: flex; gap: 28px; list-style: none; }
.wff-footer-links a { font-size: 12px; letter-spacing: 1.2px; text-transform: uppercase; color: rgba(246,241,233,0.38); text-decoration: none; font-weight: 400; transition: color 0.2s; }
.wff-footer-links a:hover { color: var(--amber-lt); }
.wff-footer-copy { font-size: 11px; color: rgba(246,241,233,0.22); font-weight: 300; }

/* RESPONSIVE */
@media (max-width: 900px) {
  .wff-nav { padding: 0 24px; }
  .wff-nav-links { display: none; }
  .wff-hero { padding: 120px 24px 80px; }
  .wff-hero-inner { grid-template-columns: 1fr; }
  .wff-stat-card { display: none; }
  .wff-daypass { padding: 0 24px; }
  .wff-daypass-inner { flex-direction: column; }
  .wff-daypass-content { padding: 40px 0 28px; border-right: none; border-bottom: 0.5px solid rgba(200,145,74,0.15); }
  .wff-daypass-price-block { width: 100%; flex-direction: row; padding: 28px 0 40px; justify-content: flex-start; gap: 28px; }
  .wff-packages-wrap { padding: 60px 24px; }
  .wff-pkg-grid { grid-template-columns: 1fr 1fr; }
  .wff-amenities { padding: 60px 24px; }
  .wff-amenities-header { grid-template-columns: 1fr; gap: 20px; }
  .wff-amenity-grid { grid-template-columns: 1fr 1fr; }
  .wff-cta { padding: 60px 24px; }
  .wff-footer { padding: 32px 24px; flex-direction: column; align-items: flex-start; gap: 20px; }
}
@media (max-width: 560px) {
  .wff-h1 { font-size: 48px; }
  .wff-pkg-grid { grid-template-columns: 1fr; }
  .wff-amenity-grid { grid-template-columns: 1fr; }
  .wff-section-header { flex-direction: column; align-items: flex-start; }
  .wff-section-note { text-align: left; }
}
`;

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

const ArrowRight: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const InfoIcon: React.FC = () => (
  <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
    style={{ flexShrink: 0, color: "#c8914a" }}>
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" d="M12 8v4m0 4h.01" />
  </svg>
);

const LeafSVG: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg style={{ position: "absolute", opacity: 0.055, pointerEvents: "none", ...style }}
    viewBox="0 0 300 300" fill="none">
    <path d="M150 20 Q260 150 150 280 Q40 150 150 20Z" fill="white" />
    <line x1="150" y1="20" x2="150" y2="280" stroke="#1a2f1e" strokeWidth="1" />
    <line x1="150" y1="80" x2="215" y2="110" stroke="#1a2f1e" strokeWidth="0.5" />
    <line x1="150" y1="120" x2="85" y2="150" stroke="#1a2f1e" strokeWidth="0.5" />
    <line x1="150" y1="160" x2="218" y2="185" stroke="#1a2f1e" strokeWidth="0.5" />
    <line x1="150" y1="200" x2="84" y2="225" stroke="#1a2f1e" strokeWidth="0.5" />
  </svg>
);

// ── Nav ──
const Nav: React.FC = () => (
  <nav className="wff-nav">
    <Link className="wff-nav-brand" href="/">
      <span>Land's End</span> — The Last Resort
    </Link>
    <ul className="wff-nav-links">
      <li><Link href="#packages">Packages</Link></li>
      <li><Link href="#daypass">Day Pass</Link></li>
      <li><Link href="#amenities">Amenities</Link></li>
      <li><Link href="#book" className="wff-nav-cta">Book Now</Link></li>
    </ul>
  </nav>
);

// ── Hero ──
const Hero: React.FC = () => (
  <section className="wff-hero">
    <div className="wff-glow wff-glow-1" />
    <div className="wff-glow wff-glow-2" />
    <LeafSVG style={{ top: "var(--nav-h)", right: 0, width: 420, height: 420 }} />

    <div className="wff-hero-inner">
      <div>
        <p className="wff-eyebrow">Sumiran Forest, near Bhopal · Madhya Pradesh</p>
        <h1 className="wff-h1">
          Work from<em>Forest.</em>
        </h1>
        <p className="wff-hero-tagline">Your office, reimagined beneath the canopy.</p>
        <p className="wff-hero-desc">
          Swap the city desk for dappled light and birdsong. Stay, eat well, connect to fast
          internet — and to nature. A working staycation designed for deep focus, genuine rest,
          and forest renewal.
        </p>
        <div className="wff-pills">
          {HERO_PILLS.map((p) => (
            <span key={p} className="wff-pill">{p}</span>
          ))}
        </div>
        <Link className="wff-btn-primary" href="#book">
          Book Your Staycation! <ArrowRight />
        </Link>
      </div>

      <div className="wff-stat-card">
        <p className="wff-stat-label">Staycation at a glance</p>
        <div className="wff-stat-row">
          <span className="wff-stat-name">Day Pass</span>
          <span className="wff-stat-val">₹999<span className="wff-stat-disc">Day</span></span>
        </div>
        {PACKAGES.map((pkg) => (
          <div key={pkg.nights} className="wff-stat-row">
            <span className="wff-stat-name">{pkg.label}</span>
            <span className="wff-stat-val">
              {fmt(pkg.price)}
              <span className="wff-stat-disc">{pkg.nights}N</span>
            </span>
          </div>
        ))}
      </div>
    </div>

    <div className="wff-scroll-hint">
      <div className="wff-scroll-line" />
      <span>Explore</span>
    </div>
  </section>
);

// ── Day Pass ──
const DayPass: React.FC = () => (
  <section id="daypass" className="wff-daypass">
    <div className="wff-daypass-inner">
      <div className="wff-daypass-content">
        <p className="wff-section-label">Drop In &amp; Work</p>
        <h2 className="wff-daypass-title">Forest Day Pass</h2>
        <p className="wff-daypass-desc">
          No overnight commitment needed. Drive in from Bhopal, work from the forest for a day
          — and drive back refreshed.
        </p>
        <div className="wff-daypass-tags">
          {DAY_PASS_INCLUDES.map((item) => (
            <span key={item} className="wff-incl-tag">
              <span className="wff-incl-dot" />
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="wff-daypass-price-block">
        <div className="wff-dp-amount"><sup>₹</sup>999</div>
        <p className="wff-dp-unit">Per person · Per day</p>
        <Link className="wff-dp-cta" href="#book">Book a Day →</Link >
      </div>
    </div>
  </section>
);

// ── Package Card ──
const PkgCard: React.FC<{ pkg: Package }> = ({ pkg }) => {
  const isBest = !!pkg.best;
  return (
    <div className={`wff-pkg${isBest ? " best" : ""}`}>
      <div className="wff-pkg-top">
        <div className="wff-badge-wrap">
          {isBest && <span className="wff-best-badge">Best Value</span>}
        </div>
        <p className="wff-pkg-duration">{pkg.nights} Nights</p>
        <p className="wff-pkg-name">{pkg.label}</p>
      </div>
      <div className="wff-pkg-mid">
        <p className="wff-pkg-price"><sup>₹</sup>{pkg.price.toLocaleString("en-IN")}</p>
        <div className="wff-rack-row">
          <span className="wff-rack">₹{pkg.rack.toLocaleString("en-IN")}</span>
          <span className="wff-save">Save {pkg.discount}%</span>
        </div>
        <p className="wff-nightly">₹{pkg.perNight.toLocaleString("en-IN")} per night</p>
      </div>
      <ul className="wff-pkg-perks">
        {pkg.perks.map((perk) => (
          <li key={perk.text} className={`wff-perk${perk.highlight ? " hi" : ""}`}>
            {perk.text}
          </li>
        ))}
      </ul>
      <div className="wff-pkg-bottom">
        <Link className={`wff-pkg-btn ${isBest ? "fill" : "outline"}`} href="#book">
          Book This →
        </Link >
      </div>
    </div>
  );
};

// ── Packages ──
const Packages: React.FC = () => (
  <section id="packages">
    <div className="wff-packages-wrap">
      <div className="wff-section-header">
        <div>
          <p className="wff-section-label">Staycation Packages</p>
          <h2 className="wff-h2">
            Stay longer,<br /><em>save more.</em>
          </h2>
        </div>
        <p className="wff-section-note">
          All packages include AC dorm stay, all meals (breakfast, lunch, evening tea &amp; dinner),
          AC workspace, and forest workspace areas.
        </p>
      </div>

      <div className="wff-pkg-grid">
        {PACKAGES.map((pkg) => (
          <PkgCard key={pkg.nights} pkg={pkg} />
        ))}
      </div>

      <div className="wff-base-note">
        <InfoIcon />
        <p>
          Base rate is <strong>₹1,999/night</strong> — comprising ₹999 AC dorm stay + ₹1,000
          all meals. Package prices reflect the discount applied to the total rack rate.
        </p>
      </div>
    </div>
  </section>
);

// ── Amenities ──
const Amenities: React.FC = () => (
  <section id="amenities" className="wff-amenities">
    <div className="wff-amenities-inner">
      <div className="wff-amenities-header">
        <h2 className="wff-amenities-h2">
          What awaits you<br />at Land's End
        </h2>
        <p className="wff-amenities-desc">
          Sumiran Forest is not a backdrop — it is the experience. Every element of your stay
          is designed to pull you out of the ordinary and into something quieter, slower, and
          far more alive.
        </p>
      </div>
      <div className="wff-amenity-grid">
        {AMENITIES.map((a) => (
          <div key={a.name} className="wff-amenity">
            <span className="wff-amenity-icon">{a.icon}</span>
            <p className="wff-amenity-name">{a.name}</p>
            <p className="wff-amenity-desc">{a.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── CTA Banner ──
const CTABanner: React.FC = () => (
  <section id="book" className="wff-cta">
    <div className="wff-cta-inner">
      <p className="wff-cta-eyebrow">Ready to work from the forest?</p>
      <h2 className="wff-cta-h2">
        Book Your<br /><em>Staycation!</em>
      </h2>
      <p className="wff-cta-sub">
        A short drive from Bhopal, a world away from the ordinary. Pick your package — or just
        drop in for a day.
      </p>
      <div className="wff-cta-buttons">
        <Link className="wff-btn-primary" href="tel:+918871317382">
          Book Your Staycation! <ArrowRight />
        </Link >
        <Link className="wff-btn-secondary" href="https://wa.me/918871317382">
          WhatsApp Us
        </Link >
      </div>
    </div>
  </section>
);

// ── Footer ──
const Footer: React.FC = () => (
  <footer className="wff-footer">
    <div className="wff-footer-brand">
      <small>Sumiran Forest, Near Bhopal, Madhya Pradesh</small>
      Land's End — The Last Resort
    </div>
    <ul className="wff-footer-links">
      {["About", "Packages", "Day Pass"].map((link) => (
        <li key={link}><Link href="">{link}</Link ></li>
        
    ))}
    <li key="contact"><Link href="/contact">CONTACT</Link ></li>
    </ul>
    <p className="wff-footer-copy">© {new Date().getFullYear()} Land's End. All rights reserved.</p>
  </footer>
);

// ─────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────

const WorkFromForest: React.FC = () => {
  // Inject scoped CSS once on mount
  useEffect(() => {
    const id = "wff-styles";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = CSS;
    document.head.appendChild(el);
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <DayPass />
      <Packages />
      <Amenities />
      <CTABanner />
      <Footer />
    </>
  );
};

export default WorkFromForest;
