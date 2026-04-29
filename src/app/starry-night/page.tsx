'use client';

import { useEffect,  useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

// ─── Star field component ─────────────────────────────────────────────────────
function StarField({ count = 80, className = "" }: { count?: number; className?: string }) {
  const [stars] = useState<Star[]>(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() < 0.8 ? Math.random() * 1.4 + 0.4 : Math.random() * 2.2 + 1.2,
      opacity: Math.random() * 0.35 + 0.15,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 6,
    }))
  );

  return (
    <div className={`star-field ${className}`} aria-hidden="true">
      {stars.map((s) => (
        <div
          key={s.id}
          className="star-dot"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animationDuration: `${s.duration}s`,
            animationDelay: `-${s.delay}s`,
            boxShadow: s.size > 1.8 ? "0 0 4px rgba(255,255,220,0.35)" : "none",
          }}
        />
      ))}
    </div>
  );
}

// ─── Forest SVG ───────────────────────────────────────────────────────────────
function ForestSVG() {
  return (
    <div className="forest-hero" aria-hidden="true">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1400 320"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="fg2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#030c06", stopOpacity: 0 }} />
            <stop offset="40%" style={{ stopColor: "#030c06", stopOpacity: 0.9 }} />
            <stop offset="100%" style={{ stopColor: "#020905", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <g fill="#020c04" opacity="0.45">
          {[
            [0,320,50,180,100], [60,320,120,155,180], [130,320,200,135,270],
            [220,320,295,120,370], [320,320,400,130,480], [420,320,500,115,580],
            [520,320,605,125,690], [630,320,715,110,800], [740,320,825,120,910],
            [850,320,935,130,1020], [960,320,1045,115,1130], [1070,320,1155,125,1240],
            [1180,320,1265,140,1350], [1290,320,1360,165,1430],
          ].map(([x1,y1,mx,my,x2], i) => (
            <polygon key={i} points={`${x1},${y1} ${mx},${my} ${x2},${y1}`} />
          ))}
        </g>
        <g fill="#020a04">
          {[
            [0,320,60,195,120], [40,320,115,155,190], [120,320,205,120,290],
            [220,320,315,100,410], [340,320,440,90,540], [460,320,565,100,670],
            [580,320,690,88,800], [720,320,830,95,940], [860,320,965,100,1070],
            [980,320,1085,90,1190], [1100,320,1200,105,1300], [1220,320,1315,120,1410],
            [1330,320,1400,155,1470],
          ].map(([x1,y1,mx,my,x2], i) => (
            <polygon key={i} points={`${x1},${y1} ${mx},${my} ${x2},${y1}`} />
          ))}
        </g>
        <rect x="0" y="0" width="1400" height="320" fill="url(#fg2)" />
      </svg>
    </div>
  );
}

// ─── Schedule data ────────────────────────────────────────────────────────────
const schedule = [
  { time: "5:00", period: "PM · Sat", icon: "🕔", heading: "Arrival & Check-in", desc: "Settle in, breathe the forest air, enjoy evening tea and snacks as the light softens." },
  { time: "6:00", period: "PM", icon: "🌿", heading: "Guided Forest Walk", desc: "A walk through Sumiran Forest as the sun goes down and the forest comes alive." },
  { time: "7:30", period: "PM", icon: "🍽️", heading: "Dinner Under the Open Sky", desc: "Served outdoors with the stars beginning to appear above — a meal you'll remember for the setting as much as the food." },
  { time: "8:30", period: "PM", icon: "🔭", heading: "Telescopic Stargazing + Storytelling Circles", desc: "Expert astronomers from Astrophiles India Club guide you through the night sky — planets, nebulae, star clusters — while storytelling circles weave together the cosmos and the human imagination. The centrepiece of the retreat.", featured: true },
  { time: "10:30", period: "PM", icon: "🦉", heading: "Night Jungle Walk", optional: true, desc: "For those who want to go deeper into the dark. A walk through the forest with a guide — sounds, shadows, and a sense of the world after dark." },
  { time: "11:00", period: "PM", icon: "🌙", heading: "Retire to AC Rooms", desc: "Sleep to the sounds of Sumiran Forest in comfortable air-conditioned accommodation." },
  { time: "6–7", period: "AM · Sun", icon: "🐦", heading: "Birdsong Morning Walk", desc: "Wake gently. A morning walk through the forest as the birds begin." },
  { time: "8:30", period: "AM", icon: "🍳", heading: "Hearty Breakfast", desc: "A full breakfast before you head home." },
  { time: "10:00", period: "AM", icon: "🚗", heading: "Check-out", desc: "Leave refreshed, with the forest still in your lungs and a sky full of stories in your heart.", last: true },
];

const includes = [
  "Evening tea & snacks on arrival",
  "Guided forest walk at sunset",
  "Open-sky dinner",
  "Telescopic stargazing session",
  "Storytelling circles",
  "Optional night jungle walk",
  "Morning walk & hearty breakfast",
];

const venueFacts = [
  { icon: "🗺️", label: "Location", val: "Sumiran Forest, near Bhopal, Madhya Pradesh" },
  { icon: "🚗", label: "Distance from Bhopal", val: "Approx. 1 hour by road" },
  { icon: "🌡️", label: "Accommodation", val: "Air-conditioned rooms (shared & private)" },
  { icon: "🌲", label: "Setting", val: "Forest property with open-air spaces for dining & stargazing" },
];

// ─── Main component ───────────────────────────────────────────────────────────
export default function StarryNights() {
  const [stickyVisible, setStickyVisible] = useState(false);

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;600;700&family=IM+Fell+English:ital@0;1&display=swap";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  // Sticky CTA visibility
  useEffect(() => {
    const handler = () => setStickyVisible(window.scrollY > window.innerHeight * 1.1);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <style>{CSS}</style>

   

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" />
        <ForestSVG />

        <div className="hero-content">
          <div className="hero-collab">
            <span className="dot" />
            Bharat Storytellers Foundation
            <span className="dot" />
            Astrophiles India Club
            <span className="dot" />
          </div>
          <h1 className="hero-title"><em>Starry</em> Nights</h1>
          <p className="hero-sub">Telescopic Stargazing &amp; Storytelling Retreat</p>
          <div className="hero-meta">
            <div className="meta-item">
              <span className="meta-label">Date</span>
              <span className="meta-value">2 – 3 May 2026</span>
              <span className="meta-note">Saturday eve to Sunday morning</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Venue</span>
              <span className="meta-value">Land&apos;s End — The Last Resort</span>
              <span className="meta-note">Sumiran Forest · 1 hr from Bhopal</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Format</span>
              <span className="meta-value">Overnight Retreat</span>
              <span className="meta-note">Check-in 5 PM · Check-out 10 AM</span>
            </div>
          </div>
          <div className="cta-group">
            <a href="#pricing" className="btn-primary">Book Your Spot</a>
            <a href="#schedule" className="btn-secondary">See the Schedule</a>
          </div>
        </div>

        <div className="scroll-hint">
          <span>Scroll</span>
          <svg viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 1v20M1 14l7 7 7-7" stroke="#c49030" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section-wrap about-section">
        <StarField count={60} className="section-stars" />
        <div className="section-label">About the Retreat</div>
        <div className="intro-grid">
          <div>
            <h2 className="section-heading">
              Step away from the city lights &amp; into a <em>universe of stories</em>
            </h2>
            <div className="intro-body">
              <p>This intimate overnight retreat at Land&apos;s End — The Last Resort invites you into a rare kind of evening: one where the forest comes alive as the sun goes down, experts guide your gaze across galaxies, and storytellers weave the cosmos and the human imagination into circles under an open sky.</p>
              <p>Spend the night to forest sounds in comfortable AC accommodation. Wake to birdsong. Leave refreshed, with something you&apos;won&apos;t easily forget.</p>
              <p>Designed for curious minds — whether you&apos;ve never looked through a telescope or you&apos;ve charted constellations for years, whether you love stories or simply want to be somewhere quiet and extraordinary.</p>
            </div>
          </div>
          <div className="intro-aside">
            <div className="aside-quote">&quot;The cosmos is within us. We are made of star-stuff.&quot;</div>
            <div className="aside-attr">— Carl Sagan</div>
          </div>
        </div>
      </section>

      {/* ── SCHEDULE ── */}
      <div id="schedule" className="schedule-bg">
        <div className="section-wrap">
          <StarField count={50} className="section-stars" />
          <div className="section-label">Programme</div>
          <h2 className="section-heading">Your Evening &amp; <em>Morning</em></h2>
          <div className="timeline">
            {schedule.map((item, i) => (
              <div className="tl-item" key={i}>
                <div className="tl-time">
                  <span className="time-val">{item.time}</span>
                  <span className="time-period">{item.period}</span>
                </div>
                <div className="tl-line">
                  <div
                    className="tl-dot"
                    style={
                      item.featured
                        ? { boxShadow: "0 0 14px 4px rgba(196,144,48,0.6)" }
                        : item.optional
                        ? { borderColor: "rgba(196,144,48,0.5)", background: "transparent" }
                        : item.last
                        ? { background: "var(--gold-pale)" }
                        : undefined
                    }
                  />
                  {!item.last && <div className="tl-connector" />}
                </div>
                <div className="tl-content" style={item.last ? { paddingBottom: 0 } : undefined}>
                  <div className="tl-icon">{item.icon}</div>
                  <div className="tl-heading">
                    {item.heading}
                    {item.optional && <span className="optional-badge">Optional</span>}
                  </div>
                  <div className="tl-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PRICING ── */}
      <section id="pricing" className="section-wrap pricing-section">
        <StarField count={70} className="section-stars" />
        <div className="section-label">Book Your Spot</div>
        <h2 className="section-heading">Limited Seats — <em>Book Early</em></h2>
        <div className="pricing-grid">
          {[
            { tag: "Option 1", type: "AC Shared Accommodation", note: "Shared room in air-conditioned comfort", price: "₹1,990", per: "per person", btn: "Book Shared Room", featured: false },
            { tag: "Option 2", type: "Private Room", note: "Double occupancy — your own private space", price: "₹5,990", per: "per room", btn: "Book Private Room", featured: true },
          ].map((card) => (
            <div key={card.tag} className={`price-card${card.featured ? " featured" : ""}`}>
              <div className="price-tag-top">{card.tag}</div>
              <div className="price-type">{card.type}</div>
              <div className="price-type-note">{card.note}</div>
              <div className="price-amount-big">{card.price}</div>
              <div className="price-per">{card.per}</div>
              <ul className="price-includes">
                {(card.featured ? ["Private AC room (double occupancy)", ...includes] : ["AC shared room for the night", ...includes]).map((inc) => (
                  <li key={inc}>{inc}</li>
                ))}
              </ul>
              <a href="#book" className={`book-btn${card.featured ? "" : " outline"}`}>{card.btn}</a>
            </div>
          ))}
        </div>
        <div className="seats-note">⚠ Seats are limited — early booking is strongly advised</div>

        <div id="book" className="payment-box">
          <div className="section-label" style={{ justifyContent: "center", marginBottom: 16 }}>Payment</div>
          <p className="payment-desc">To confirm your booking, complete payment below or write to us directly.</p>
          <a href="PAYMENT_LINK_HERE" className="btn-primary" style={{ display: "inline-block" }}>Proceed to Payment →</a>
          <p className="payment-contact">
            Queries? Write to{" "}
            <a href="mailto:CONTACT@EMAIL.COM">CONTACT@EMAIL.COM</a>
            {" · "}
            <a href="tel:+91XXXXXXXXXX">+91-XXXXXXXXXX</a>
          </p>
        </div>
      </section>

      {/* ── VENUE ── */}
      <div id="venue" className="venue-bg">
        <div className="section-wrap">
          <StarField count={45} className="section-stars" />
          <div className="section-label">The Setting</div>
          <h2 className="section-heading">Land&apos;s End — <em>The Last Resort</em></h2>
          <div className="venue-block">
            <div className="venue-desc">
              <p>Nestled within Sumiran Forest on the outskirts of Bhopal, Land&apos;s End is a forest retreat designed for those who want to step away from the city without travelling far. An hour&apos;s drive from Bhopal brings you to a place where the sky is dark enough to see the Milky Way.</p>
              <p>The property offers comfortable AC accommodation, open-air dining, and forest access — the ideal setting for an evening of stargazing and story.</p>
            </div>
            <div className="venue-facts">
              {venueFacts.map((f) => (
                <div key={f.label} className="venue-fact">
                  <span className="vf-icon">{f.icon}</span>
                  <div className="vf-text">
                    <span className="vf-label">{f.label}</span>
                    <span className="vf-val">{f.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── ORGS ── */}
      <section id="orgs" className="section-wrap orgs-section">
        <StarField count={55} className="section-stars" />
        <div className="section-label">Co-Presented By</div>
        <div className="orgs-grid">
          {[
            { name: "Bharat Storytellers Foundation", desc: "A Bhopal-based foundation dedicated to reviving, preserving, and celebrating the storytelling traditions of India — from folk narratives and oral histories to contemporary story arts. The Foundation creates spaces where stories are heard, shared, and carried forward." },
            { name: "Astrophiles India Club", desc: "A community of astronomy enthusiasts bringing telescopic stargazing, sky-watching, and a sense of wonder about the universe to people across India. Astrophiles India Club makes the night sky accessible, guiding curious eyes toward the cosmos with knowledge and genuine passion." },
          ].map((org) => (
            <div key={org.name} className="org-card">
              <div className="org-card-name">{org.name}</div>
              <div className="org-card-desc">{org.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <StarField count={40} className="section-stars" />
        <div className="footer-title"><em>Starry Nights</em> Retreat</div>
        <div className="footer-sub">2–3 May 2026 · Land&apos;s End, Sumiran Forest</div>
        <div className="footer-contact">
          Questions? Write to{" "}
          <a href="mailto:CONTACT@EMAIL.COM">CONTACT@EMAIL.COM</a>
          &nbsp;·&nbsp;
          Call <a href="tel:+91XXXXXXXXXX">+91-XXXXXXXXXX</a>
        </div>
        <div className="footer-bottom">© 2026 Bharat Storytellers Foundation &amp; Astrophiles India Club · All rights reserved</div>
        <div className="footer-credit">Hero image: <em>The Starry Night</em> (1889) by Vincent van Gogh · Public Domain · Museum of Modern Art, New York</div>
      </footer>

      {/* ── STICKY CTA ── */}
      <div className={`sticky-cta${stickyVisible ? " visible" : ""}`}>
        <div className="sticky-info">
          <div className="sticky-detail">
            <span className="sticky-label">Retreat Date</span>
            <span className="sticky-val">2–3 May 2026</span>
          </div>
          <div className="sticky-detail">
            <span className="sticky-label">Starting From</span>
            <span className="sticky-val">₹1,990/person</span>
          </div>
          <div className="sticky-detail">
            <span className="sticky-label">Venue</span>
            <span className="sticky-val">Sumiran Forest, Bhopal</span>
          </div>
        </div>
        <a href="#book" className="btn-primary" style={{ flexShrink: 0 }}>Book Now →</a>
      </div>
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const CSS = `

  :root {
    --midnight:   #03050e;
    --gold:       #c49030;
    --gold-light: #e4ab56;
    --gold-pale:  #f2d490;
    --text:       #e8e4d8;
    --text-muted: rgba(220,215,195,0.6);
    --border:     rgba(196,144,48,0.2);
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--midnight);
    color: var(--text);
    font-family: 'Cormorant Garamond', serif;
    line-height: 1.7;
    overflow-x: hidden;
  }

  /* ── Stars ── */
  .star-field {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 0;
  }

  .star-dot {
    position: absolute;
    border-radius: 50%;
    background: white;
    animation: twinkle 3s ease-in-out infinite;
  }

  @keyframes twinkle {
    0%, 100% { opacity: var(--op, 0.3); transform: scale(1); }
    50%       { opacity: 1;              transform: scale(1.4); }
  }

  .section-stars { z-index: 0; }

  /* ── Nav ── */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 18px 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(to bottom, rgba(3,5,14,0.95) 0%, transparent 100%);
    backdrop-filter: blur(2px);
  }

  .nav-brand {
    font-family: 'Cinzel', serif;
    font-size: 11px;
    letter-spacing: 0.22em;
    color: var(--gold-light);
    text-transform: uppercase;
  }

  .nav-links { display: flex; gap: 32px; list-style: none; }

  .nav-links a {
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(220,215,195,0.55);
    text-decoration: none;
    transition: color 0.3s;
  }

  .nav-links a:hover { color: var(--gold-light); }

  /* ── Hero ── */
  .hero {
  font-family: 'IM Fell English', serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 120px 40px 80px;
    position: relative;
    overflow: hidden;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg');
    background-size: cover;
    background-position: center 30%;
    background-repeat: no-repeat;
  }

  .hero-bg::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg,
      rgba(2,3,12,0.55) 0%,
      rgba(3,5,18,0.45) 40%,
      rgba(3,8,12,0.65) 70%,
      rgba(2,5,8,0.92)  100%
    );
  }

  .forest-hero {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 35%;
    pointer-events: none;
    z-index: 1;
  }

  .hero-content {
    position: relative;
    z-index: 10;
    max-width: 820px;
  }

  .hero-collab {
    font-family: 'Cinzel', serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.3em;
    color: rgba(196,144,48,1);
    text-transform: uppercase;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .dot { width: 3px; height: 3px; background: var(--gold); border-radius: 50%; opacity: 0.5; display: inline-block; }

  .hero-title {
    font-size: clamp(72px, 12vw, 110px);
    font-weight: 300;
    line-height: 0.9;
    margin-bottom: 12px;
    animation: fadeUp 1.2s ease forwards;
  }

  .hero-title em { font-style: italic; color: var(--gold-light); }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .hero-sub {
    font-family: 'IM Fell English', serif;
    font-style: italic;
    font-size: clamp(16px, 2.5vw, 21px);
    color: rgba(196,144,48,5);
    letter-spacing: 0.08em;
    margin-bottom: 36px;
    animation: fadeUp 1.2s 0.2s ease both;
  }

  .hero-meta {
    display: flex;
    justify-content: center;
    margin-bottom: 44px;
    animation: fadeUp 1.2s 0.35s ease both;
  }

  .meta-item {
    padding: 0 28px;
    text-align: center;
    border-right: 1px solid var(--border);
  }

  .meta-item:last-child { border-right: none; }

  .meta-label {
    font-family: 'Cinzel', serif;
    font-size: 8px;
    letter-spacing: 0.28em;
    color: rgba(196,144,48,0.5);
    text-transform: uppercase;
    display: block;
    margin-bottom: 4px;
  }

  .meta-value {
    font-size: 16px;
    font-weight: 600;
    color: var(--gold-pale);
    display: block;
    letter-spacing: 0.04em;
  }

  .meta-note {
    font-family: 'IM Fell English', serif;
    font-style: italic;
    font-size: 17px;
    color: rgba(196,144,48,5);
    display: block;
    margin-top: 2px;
  }

  .cta-group {
    display: flex;
    gap: 16px;
    justify-content: center;
    animation: fadeUp 1.2s 0.5s ease both;
  }

  .btn-primary {
    display: inline-block;
    padding: 14px 40px;
    background: var(--gold);
    color: #07050a;
    font-family: 'Cinzel', serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.3s;
  }

  .btn-primary:hover {
    background: var(--gold-light);
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(196,144,48,0.25);
  }

  .btn-secondary {
    display: inline-block;
    padding: 14px 40px;
    border: 1px solid var(--border);
    color: var(--gold-light);
    font-family: 'Cinzel', serif;
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.3s;
  }

  .btn-secondary:hover {
    border-color: rgba(196,144,48,0.5);
    background: rgba(196,144,48,0.05);
  }

  .scroll-hint {
    position: absolute;
    bottom: 36px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    opacity: 0.4;
    animation: bounce 2s ease-in-out infinite;
  }

  .scroll-hint span {
    font-family: 'Cinzel', serif;
    font-size: 7px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
  }

  .scroll-hint svg { width: 16px; height: 20px; }

  @keyframes bounce {
    0%,100% { transform: translateX(-50%) translateY(0); }
    50%      { transform: translateX(-50%) translateY(6px); }
  }

  /* ── Sections ── */
  .section-wrap {
    max-width: 960px;
    margin: 0 auto;
    padding: 100px 48px;
    position: relative;
  }

  .about-section,
  .pricing-section,
  .orgs-section { overflow: hidden; }

  .schedule-bg  { background: rgba(4,6,16,0.6); position: relative; overflow: hidden; }
  .venue-bg     { background: rgba(3,5,10,0.4); position: relative; overflow: hidden; }

  .schedule-bg  .section-wrap,
  .venue-bg     .section-wrap { max-width: 960px; margin: 0 auto; padding: 100px 48px; position: relative; }

  .section-label {
    font-family: 'Cinzel', serif;
    font-size: 8.5px;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: rgba(196,144,48,0.5);
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
    z-index: 1;
  }

  .section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, rgba(196,144,48,0.3), transparent);
  }

  .section-heading {
    font-size: clamp(38px, 5vw, 56px);
    font-weight: 300;
    line-height: 1.05;
    color: var(--text);
    margin-bottom: 24px;
    position: relative;
    z-index: 1;
  }

  .section-heading em { font-style: italic; color: var(--gold-light); }

  /* ── About ── */
  .intro-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 64px;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  .intro-body { font-size: 18px; line-height: 1.85; color: var(--text-muted); font-weight: 300; }
  .intro-body p + p { margin-top: 16px; }

  .intro-aside { border-left: 2px solid rgba(196,144,48,0.2); padding-left: 32px; }
  .aside-quote { font-family: 'IM Fell English', serif; font-style: italic; font-size: 24px; line-height: 1.5; color: var(--gold-pale); opacity: 0.8; }
  .aside-attr  { margin-top: 16px; font-family: 'Cinzel', serif; font-size: 8px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(196,144,48,0.4); }

  /* ── Timeline ── */
  .timeline { margin-top: 48px; display: flex; flex-direction: column; position: relative; z-index: 1; }

  .tl-item { display: grid; grid-template-columns: 120px 1px 1fr; gap: 0 28px; }

  .tl-time { text-align: right; padding-top: 2px; padding-bottom: 36px; }
  .time-val { font-family: 'Cinzel', serif; font-size: 11px; font-weight: 600; color: var(--gold); letter-spacing: 0.08em; display: block; }
  .time-period { font-family: 'IM Fell English', serif; font-style: italic; font-size: 11px; color: rgba(196,144,48,0.45); }

  .tl-line { display: flex; flex-direction: column; align-items: center; }

  .tl-dot {
    width: 9px; height: 9px;
    border-radius: 50%;
    background: var(--gold);
    border: 2px solid var(--midnight);
    box-shadow: 0 0 8px rgba(196,144,48,0.4);
    flex-shrink: 0;
    margin-top: 4px;
  }

  .tl-connector { flex: 1; width: 1px; background: linear-gradient(to bottom, rgba(196,144,48,0.3), rgba(196,144,48,0.1)); margin-top: 4px; }

  .tl-content { padding-bottom: 36px; }
  .tl-icon    { font-size: 18px; margin-bottom: 4px; }

  .tl-heading {
    font-size: 20px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 4px;
    letter-spacing: 0.02em;
  }

  .tl-desc { font-size: 15px; color: var(--text-muted); line-height: 1.6; font-weight: 300; }

  .optional-badge {
    display: inline-block;
    margin-left: 8px;
    padding: 2px 8px;
    border: 1px solid rgba(196,144,48,0.35);
    font-family: 'Cinzel', serif;
    font-size: 7px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(196,144,48,0.65);
    border-radius: 2px;
    vertical-align: middle;
  }

  /* ── Pricing ── */
  .pricing-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 48px; margin-bottom: 48px; position: relative; z-index: 1; }

  .price-card {
    border: 1px solid var(--border);
    padding: 40px 36px;
    background: rgba(4,6,15,0.6);
    transition: all 0.3s;
  }

  .price-card:hover { border-color: rgba(196,144,48,0.45); transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.4); }
  .price-card.featured { border-color: rgba(196,144,48,0.4); background: rgba(196,144,48,0.04); }

  .price-tag-top { font-family: 'Cinzel', serif; font-size: 8px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(196,144,48,0.5); margin-bottom: 20px; }
  .price-type    { font-size: 26px; font-weight: 600; color: var(--text); margin-bottom: 6px; }
  .price-type-note { font-family: 'IM Fell English', serif; font-style: italic; font-size: 14px; color: var(--text-muted); margin-bottom: 28px; }
  .price-amount-big { font-size: 56px; font-weight: 300; color: var(--gold-pale); line-height: 1; margin-bottom: 6px; }
  .price-per { font-family: 'IM Fell English', serif; font-style: italic; font-size: 14px; color: rgba(196,144,48,0.5); margin-bottom: 28px; }

  .price-includes { list-style: none; display: flex; flex-direction: column; gap: 8px; margin-bottom: 32px; }

  .price-includes li { font-size: 14px; color: var(--text-muted); display: flex; align-items: flex-start; gap: 8px; }

  .price-includes li::before { content: '✦'; color: var(--gold); font-size: 8px; flex-shrink: 0; margin-top: 5px; opacity: 0.6; }

  .book-btn {
    display: block;
    text-align: center;
    padding: 14px 20px;
    background: var(--gold);
    color: #07050a;
    font-family: 'Cinzel', serif;
    font-size: 9.5px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.3s;
  }

  .book-btn:hover { background: var(--gold-light); box-shadow: 0 6px 24px rgba(196,144,48,0.3); }

  .book-btn.outline { background: transparent; color: var(--gold-light); border: 1px solid rgba(196,144,48,0.4); }
  .book-btn.outline:hover { background: rgba(196,144,48,0.08); }

  .seats-note {
    text-align: center;
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(196,144,48,0.5);
    padding: 18px;
    border: 1px solid rgba(196,144,48,0.15);
    position: relative;
    z-index: 1;
  }

  .payment-box { margin-top: 48px; padding: 40px; border: 1px solid var(--border); background: rgba(4,6,15,0.6); text-align: center; position: relative; z-index: 1; }
  .payment-desc { font-family: 'IM Fell English', serif; font-style: italic; font-size: 18px; color: var(--text-muted); margin-bottom: 24px; }
  .payment-contact { margin-top: 20px; font-family: 'Cinzel', serif; font-size: 8px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(196,144,48,0.35); }
  .payment-contact a { color: rgba(196,144,48,0.55); text-decoration: none; }

  /* ── Venue ── */
  .venue-block { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; position: relative; z-index: 1; }

  .venue-desc { font-size: 17px; color: var(--text-muted); line-height: 1.85; font-weight: 300; }
  .venue-desc p + p { margin-top: 14px; }

  .venue-fact { display: flex; gap: 16px; padding: 18px 0; border-bottom: 1px solid rgba(196,144,48,0.12); }
  .venue-fact:first-child { border-top: 1px solid rgba(196,144,48,0.12); }

  .vf-icon  { font-size: 18px; flex-shrink: 0; margin-top: 2px; }
  .vf-label { font-family: 'Cinzel', serif; font-size: 8px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(196,144,48,0.5); display: block; margin-bottom: 3px; }
  .vf-val   { font-size: 16px; color: var(--text); line-height: 1.4; }

  /* ── Orgs ── */
  .orgs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-top: 48px; position: relative; z-index: 1; }

  .org-card { padding: 36px; border: 1px solid var(--border); background: rgba(4,6,15,0.5); }
  .org-card-name { font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: 0.15em; color: var(--gold-light); text-transform: uppercase; margin-bottom: 14px; padding-bottom: 14px; border-bottom: 1px solid var(--border); }
  .org-card-desc { font-size: 15px; color: var(--text-muted); line-height: 1.75; font-weight: 300; }

  /* ── Footer ── */
  footer {
    background: rgba(2,3,8,0.98);
    border-top: 1px solid rgba(196,144,48,0.12);
    padding: 60px 48px 40px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .footer-title { font-size: 28px; font-weight: 300; color: var(--text); margin-bottom: 6px; position: relative; z-index: 1; }
  .footer-title em { font-style: italic; color: var(--gold-light); }
  .footer-sub { font-family: 'IM Fell English', serif; font-style: italic; font-size: 14px; color: rgba(196,144,48,0.5); margin-bottom: 32px; position: relative; z-index: 1; }
  .footer-contact { font-family: 'Cinzel', serif; font-size: 8.5px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(196,144,48,0.4); margin-bottom: 32px; position: relative; z-index: 1; }
  .footer-contact a { color: rgba(196,144,48,0.6); text-decoration: none; }
  .footer-bottom { font-size: 11px; color: rgba(196,144,48,0.25); font-family: 'Cinzel', serif; letter-spacing: 0.1em; position: relative; z-index: 1; }
  .footer-credit { margin-top: 10px; font-size: 9px; opacity: 0.4; font-family: 'Cinzel', serif; letter-spacing: 0.08em; position: relative; z-index: 1; }

  /* ── Sticky CTA ── */
  .sticky-cta {
    position: fixed;
    bottom: 0; left: 0; right: 0;
    z-index: 50;
    background: rgba(3,5,14,0.95);
    border-top: 1px solid rgba(196,144,48,0.2);
    backdrop-filter: blur(12px);
    padding: 16px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transform: translateY(100%);
    transition: transform 0.4s ease;
  }

  .sticky-cta.visible { transform: translateY(0); }

  .sticky-info { display: flex; gap: 28px; }
  .sticky-detail { display: flex; flex-direction: column; }
  .sticky-label { font-family: 'Cinzel', serif; font-size: 7px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(196,144,48,0.45); }
  .sticky-val   { font-size: 15px; font-weight: 600; color: var(--gold-pale); }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    nav { padding: 16px 24px; }
    .nav-links { display: none; }
    .section-wrap,
    .schedule-bg .section-wrap,
    .venue-bg    .section-wrap { padding: 72px 24px; }
    .intro-grid, .venue-block, .orgs-grid, .pricing-grid { grid-template-columns: 1fr; gap: 36px; }
    .hero-meta { flex-wrap: wrap; gap: 16px; }
    .meta-item { border-right: none; padding: 0; }
    .tl-item { grid-template-columns: 90px 1px 1fr; gap: 0 16px; }
    .sticky-cta { flex-direction: column; gap: 12px; text-align: center; padding: 14px 20px; }
    .sticky-info { justify-content: center; }
    footer { padding: 48px 24px 32px; }
  }
`;
