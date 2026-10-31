import type { Metadata } from "next";
import Image from "next/image";
import { Lora, Poppins } from "next/font/google";

/* ------------------------------------------------------------------
   Van Deepotsav: event page
   Route: /van-deepotsav  (App Router: app/van-deepotsav/page.tsx)
   Images live in /public/van-deepotsav/
   ------------------------------------------------------------------ */

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--vd-sans" });
const lora = Lora({ subsets: ["latin"], style: ["italic"], weight: ["500", "600"], variable: "--vd-serif" });

export const metadata: Metadata = {
  title: "Van Deepotsav | A forest Diwali at Sumiran Forest, 8–9 Nov 2026",
  description:
    "A cracker-free, noise-free Diwali inside Sumiran Forest, a 1 hour drive from Bhopal. Diyas, Laxmi Pujan, bonfire, stargazing and adventure. 8–9 November 2026. Starts at ₹2,100 per person.",
  openGraph: {
    title: "Van Deepotsav | A family Diwali, wherever your family is",
    description: "A cracker-free Diwali inside Sumiran Forest, 8–9 November 2026. Only diyas. No crackers.",
    images: ["/van-deepotsav/hero.jpg"],
  },
};

/* ---------------------------- content ---------------------------- */

const PHONE_1 = "+91 88713 17382";
const PHONE_2 = "+91 81096 69604";
const EMAIL = "landsend.sumiran@gmail.com";
const REGISTRATION_LINK = "https://rzp.io/rzp/0YLr5Dx";
const WHATSAPP = `https://wa.me/918871317382?text=${encodeURIComponent(
  "Hi, I would like to book Van Deepotsav on 8–9 November."
)}`;

const audiences = [
  {
    title: "Away from home this Diwali?",
    text: "For students, professionals and anyone far from family. Light diyas, join the puja, share dinner and celebrate with a new family.",
    icon: "home",
  },
  {
    title: "Done with smoke and noise?",
    text: "A cracker-free, noise-free night. Clean air, quiet trees and a sky full of stars. Easy on little lungs and on elders.",
    icon: "air",
  },
  {
    title: "Love nature and adventure?",
    text: "Archery, target shooting, kayaking, a night forest walk, birding and stargazing, all in two days.",
    icon: "tree",
  },
] as const;

const promise = [
  "Zero crackers",
  "Clay diyas, natural oil",
  "Flower and leaf rangoli",
  "Kitchen-made sweets",
  "Leaf plates and kulhads",
  "No plastic décor",
  "Waste composted",
];

type Slot = { time: string; activity: string; highlight?: boolean };

const day1: Slot[] = [
  { time: "12:00 PM", activity: "Arrival and check-in" },
  { time: "1:00 PM", activity: "Lunch" },
  { time: "2:00 PM", activity: "Rangoli and diya painting" },
  { time: "3:30 PM", activity: "Archery, target shooting and outdoor games" },
  { time: "5:00 PM", activity: "High tea, change into festive clothes" },
  { time: "6:00 PM", activity: "Laxmi Pujan", highlight: true },
  { time: "7:15 PM", activity: "Festive Diwali dinner" },
  { time: "8:30 PM", activity: "Bonfire, storytelling, jamming and stargazing" },
  { time: "10:00 PM", activity: "Night forest walk" },
  { time: "11:00 PM", activity: "Lights out" },
];

const day2: Slot[] = [
  { time: "6:00 AM", activity: "Silent time and light exercise" },
  { time: "6:45 AM", activity: "Forest immersion walk and birding" },
  { time: "8:30 AM", activity: "Breakfast" },
  { time: "10:00 AM", activity: "Kayaking at the lake" },
  { time: "11:30 AM", activity: "Closing circle and departure" },
  { time: "1:00 PM", activity: "Optional lunch, charged at actual cost" },
];

const activities = [
  "Laxmi Pujan",
  "Diya Painting",
  "Rangoli",
  "Archery",
  "Target Shooting",
  "Bonfire and Storytelling",
  "Jamming",
  "Stargazing",
  "Night Forest Walk",
  "Birding",
  "Kayaking",
  "Outdoor Games",
];

const rooms = [
  { name: "Nikunj", note: "Leopard and tiger themed rooms", one: "₹4,000", two: "₹5,100", three: "₹7,000" },
  { name: "Aranya", note: "Rooms named after forest trees", one: "₹5,200", two: "₹6,200", three: "₹8,300" },
  { name: "Vyom", note: "Our sky-themed room with a view", one: "₹6,100", two: "₹7,200", three: "₹9,300" },
];

const includes = [
  "The full two-day programme and all activities",
  "Lunch, high tea and a festive Diwali dinner on Day 1",
  "Breakfast on Day 2",
  "One night in the stay you choose",
  "Day 2 lunch is optional, charged at actual cost",
];

const knowBeforeYouGo = [
  "Pure vegetarian kitchen, no eggs",
  "A forest property: power cuts happen and signal is patchy",
  "A silent space: soft voices, no speakers",
  "Bring a torch, a warm layer, festive wear and closed shoes",
  "No firecrackers of any kind",
];

/* ----------------------------- icons ----------------------------- */

function Icon({ name }: { name: "home" | "air" | "tree" | "pin" | "phone" | "chat" }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "home":
      return (
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24">
          <path d="M3 11 L12 4 L21 11 M5 10 V20 H19 V10" {...common} />
        </svg>
      );
    case "air":
      return (
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24">
          <path d="M3 8 H14 C16.5 8 16.5 4.5 14 4.5 M3 12 H18 C20.5 12 20.5 15.5 18 15.5 M3 16 H10" {...common} />
        </svg>
      );
    case "tree":
      return (
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24">
          <path d="M12 3 L6 12 H9 L5 18 H19 L15 12 H18 Z M12 18 V22" {...common} />
        </svg>
      );
    case "pin":
      return (
        <svg aria-hidden="true" width="14" height="18" viewBox="0 0 16 20">
          <path d="M8 1C4.1 1 1 4 1 7.8 1 13 8 19 8 19s7-6 7-11.2C15 4 11.9 1 8 1z" {...common} />
          <circle cx="8" cy="7.8" r="2.4" fill="currentColor" />
        </svg>
      );
    case "phone":
      return (
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24">
          <path d="M5 3 H9 L11 8 L8.5 9.5 A12 12 0 0 0 14.5 15.5 L16 13 L21 15 V19 A2 2 0 0 1 19 21 A16 16 0 0 1 3 5 A2 2 0 0 1 5 3 Z" {...common} />
        </svg>
      );
    case "chat":
      return (
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24">
          <path d="M4 20 L5.5 15.5 A8 8 0 1 1 8.5 18.5 Z" {...common} />
        </svg>
      );
    default:
      return null;
  }
}

/* ------------------------------ page ------------------------------ */

export default function VanDeepotsavPage() {
  return (
    <main className={`vd ${poppins.variable} ${lora.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* Hero */}
      <section className="mt-2 vd-hero ">
        <Image src="/events/van-deepotsav/ForestandDia.png" alt="Diyas around a campfire in the stone circle at dusk, Sumiran Forest" fill priority sizes="100vw" className="vd-hero-img" />
        <div className="vd-hero-scrim" />
        <div className="vd-hero-inner">
          <div className="vd-topline">
            <span className="vd-pill vd-pill-gold">Diwali 2026</span>
            <span className="vd-presenter">Land&apos;s End — The Last Resort</span>
          </div>
          <div className="vd-title-block">
            <span className="vd-title-van">Van</span>
            <h1 className="vd-title">DEEPOTSAV</h1>
            <p className="vd-tagline">
              A family Diwali, wherever your <em>family</em> is.
            </p>
            <p className="vd-location">
              <Icon name="pin" /> Inside Sumiran Forest · 1 hour drive from Bhopal
            </p>
          </div>
          <div className="vd-hero-bottom">
            <div>
              <p className="vd-date">8–9 November 2026</p>
              <p className="vd-date-sub">Sunday and Monday · One night in the forest</p>
              <div className="vd-cta-row">
                <a className="vd-btn vd-btn-gold" href={REGISTRATION_LINK} target="_blank" rel="noopener noreferrer">
                  Register now
                </a>
                <a className="vd-btn vd-btn-gold" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                  <Icon name="chat" /> Book on WhatsApp
                </a>
                <a className="vd-btn vd-btn-ghost" href="#stay">
                  See stays and prices
                </a>
              </div>
            </div>
            <div className="vd-price-badge" aria-label="Starts at 2,100 rupees per person">
              <span>Starts at</span>
              <strong>₹2,100</strong>
              <span>per person</span>
            </div>
          </div>
        </div>
        <span className="vd-sticker vd-sticker-gold">Only Diyas. No Crackers.</span>
      </section>

      {/* Why */}
      <section className="vd-section">
        <div className="vd-wrap">
          <p className="vd-kicker">Why Van Deepotsav</p>
          <h2 className="vd-h2">
            This is how Diwali <em>should</em> be celebrated.
          </h2>
          <p className="vd-lead">
            Van Deepotsav is a two-day, overnight Diwali inside Sumiran Forest, a 300-acre community-conserved forest
            near Bilkisganj. Everything that makes Diwali sacred stays: the diyas, the Laxmi Pujan, a shared festive
            meal. The smoke and the noise stay in the city.
          </p>
          <div className="vd-cards">
            {audiences.map((a) => (
              <article className="vd-card" key={a.title}>
                <span className="vd-card-icon">
                  <Icon name={a.icon} />
                </span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </article>
            ))}
          </div>
          <div className="vd-promise">
            <div className="vd-promise-head">
              <h3>Our green Diwali promise</h3>
              <em>Only diyas. No crackers.</em>
            </div>
            <ul className="vd-chips">
              {promise.map((p) => (
                <li key={p} className="vd-chip">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Image band */}
      <div className="vd-band">
        <Image src="/events/van-deepotsav/Diwali-Garden-Firelight-Glow.png" alt="Diyas glowing on the stones of the circle" fill sizes="100vw" />
      </div>

      {/* Programme */}
      <section className="vd-section" id="programme">
        <div className="vd-wrap">
          <p className="vd-kicker">The programme</p>
          <h2 className="vd-h2">
            Two days in the <em>forest</em>
          </h2>
          <div className="vd-days">
            <DayColumn label="Day 1" date="Sun 8 Nov · Diwali" slots={day1} />
            <div>
              <DayColumn label="Day 2" date="Mon 9 Nov" slots={day2} />
              <figure className="vd-figure">
                <Image src="/events/van-deepotsav/Diwali-Garden-Firelight-Glow.png" alt="Campfire and diyas in the stone circle" width={900} height={739} sizes="(max-width: 800px) 100vw, 520px" />
                <figcaption>The stone circle on Diwali night</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="vd-activities">
        <Image src="/events/van-deepotsav/LushGreenLeafyPlantationandForest.png" alt="" fill sizes="100vw" className="vd-activities-img" />
        <div className="vd-activities-scrim" />
        <div className="vd-wrap vd-activities-inner">
          <h2 className="vd-h3">Everything you get to do</h2>
          <ul className="vd-chips">
            {activities.map((a) => (
              <li key={a} className={a === "Laxmi Pujan" ? "vd-chip vd-chip-gold" : "vd-chip"}>
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stay and prices */}
      <section className="vd-section" id="stay">
        <div className="vd-wrap">
          <p className="vd-kicker">Stay and prices</p>
          <h2 className="vd-h2">
            Pick your corner of the <em>forest</em>
          </h2>

          <div className="vd-dorm">
            <div>
              <p className="vd-dorm-label">Most social · Best value</p>
              <h3>Sangat Shared Dorm</h3>
              <p>Dorm rooms themed on flocks of birds. Made for meeting new people.</p>
            </div>
            <div className="vd-dorm-price">
              <strong>₹2,100</strong>
              <span>per person</span>
            </div>
          </div>

          <div className="vd-table-wrap">
            <table className="vd-table">
              <caption className="vd-sr">Private room prices for Van Deepotsav</caption>
              <thead>
                <tr>
                  <th scope="col">Private rooms</th>
                  <th scope="col">
                    1 guest<span>per person</span>
                  </th>
                  <th scope="col">
                    2 guests<span>total</span>
                  </th>
                  <th scope="col">
                    3 guests<span>total</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((r) => (
                  <tr key={r.name}>
                    <th scope="row">
                      {r.name}
                      <span>{r.note}</span>
                    </th>
                    <td>{r.one}</td>
                    <td>{r.two}</td>
                    <td>{r.three}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="vd-two">
            <div className="vd-box">
              <h3>Every package includes</h3>
              <ul className="vd-list">
                {includes.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="vd-box">
              <h3>Know before you go</h3>
              <ul className="vd-list">
                {knowBeforeYouGo.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section className="vd-book">
        <div className="vd-wrap vd-book-inner">
          <div className="vd-book-logo">
            <Image src="/events/van-deepotsav/lands-end-logo.png" alt="Land's End, The Last Resort" width={219} height={379} />
          </div>
          <div className="vd-book-text">
            <p className="vd-book-label">Book your spot · 8–9 Nov 2026</p>
            <p className="vd-book-phones">
              <a href={`tel:${PHONE_1.replace(/\s/g, "")}`}>{PHONE_1}</a>
              <span aria-hidden="true"> · </span>
              <a href={`tel:${PHONE_2.replace(/\s/g, "")}`}>{PHONE_2}</a>
            </p>
            <p className="vd-book-mail">
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
          </div>
          <div className="vd-book-actions">
            <a className="vd-btn vd-btn-white" href={REGISTRATION_LINK} target="_blank" rel="noopener noreferrer">
              Register now
            </a>
            <a className="vd-btn vd-btn-black border " href={WHATSAPP} target="_blank" rel="noopener noreferrer">
              <Icon name="chat" /> WhatsApp us
            </a>
            <a className="vd-btn vd-btn-outline-white" href={`tel:${PHONE_1.replace(/\s/g, "")}`}>
              <Icon name="phone" /> Call now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function DayColumn({ label, date, slots }: { label: string; date: string; slots: Slot[] }) {
  return (
    <div className="vd-day">
      <div className="vd-day-head">
        <h3>{label}</h3>
        <span>{date}</span>
      </div>
      <ol className="vd-slots">
        {slots.map((s) => (
          <li key={s.time} className={s.highlight ? "is-highlight" : undefined}>
            <time>{s.time}</time>
            <span>{s.activity}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------ styles ------------------------------
   Scoped under .vd so nothing leaks into the rest of the site.
   Brand: warm charcoal ground, Sun Gold accent, festive pink highlight. */

const css = `
.vd{--ink:#15110F;--card:#2A2220;--cream:#FFF6E6;--soft:#E9DCC4;--gold:#FFC94D;--gold-ink:#241400;--pink:#E8457A;
  background:var(--ink);color:var(--cream);font-family:var(--vd-sans),system-ui,sans-serif;line-height:1.5;overflow-x:hidden}
.vd *{box-sizing:border-box}
.vd em{font-family:var(--vd-serif),Georgia,serif;font-style:italic;font-weight:600;color:var(--gold)}
.vd a{color:inherit}
.vd-wrap{width:100%;max-width:1080px;margin:0 auto;padding:0 24px}
.vd-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}

/* hero */
.vd-hero{position:relative;min-height:100svh;display:flex;overflow:hidden}
.vd-hero-img{object-fit:cover;object-position:50% 60%}
.vd-hero-scrim{position:absolute;inset:0;background:linear-gradient(180deg,rgba(16,18,14,.88) 0%,rgba(16,18,14,.4) 38%,rgba(16,18,14,.12) 58%,rgba(18,14,12,.9) 100%)}
.vd-hero-inner{position:relative;z-index:1;width:100%;max-width:1180px;margin:0 auto;padding:32px 24px 48px;display:flex;flex-direction:column;justify-content:space-between;gap:32px}
.vd-topline{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap}
.vd-pill{display:inline-block;padding:8px 16px;border-radius:999px;font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}
.vd-pill-gold{background:var(--gold);color:var(--gold-ink);transform:rotate(-4deg)}
.vd-presenter{font-size:12px;font-weight:500;letter-spacing:.22em;text-transform:uppercase}
.vd-title-block{display:flex;flex-direction:column;align-items:center;text-align:center}
.vd-title-van{font-family:var(--vd-serif),Georgia,serif;font-style:italic;font-weight:600;color:var(--gold);font-size:clamp(48px,8vw,96px);line-height:.9;transform:rotate(-4deg)}
.vd-title{margin:0;font-weight:700;font-size:clamp(56px,12.5vw,150px);line-height:1;letter-spacing:-.02em;text-shadow:0 4px 30px rgba(0,0,0,.45)}
.vd-tagline{margin:12px 0 0;font-size:clamp(18px,2.4vw,28px);font-weight:500;text-shadow:0 2px 14px rgba(0,0,0,.6)}
.vd-location{margin:14px 0 0;display:inline-flex;align-items:center;gap:8px;padding:7px 16px;border-radius:999px;background:rgba(26,20,18,.55);border:1px solid rgba(255,201,77,.55);color:var(--gold);font-size:clamp(11px,1.4vw,14px);font-weight:600;letter-spacing:.14em;text-transform:uppercase}
.vd-hero-bottom{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;flex-wrap:wrap}
.vd-date{margin:0;font-size:clamp(36px,6vw,64px);font-weight:700;line-height:1;letter-spacing:-.03em;color:var(--gold)}
.vd-date-sub{margin:8px 0 0;font-size:13px;font-weight:600;letter-spacing:.18em;text-transform:uppercase}
.vd-cta-row{display:flex;gap:12px;flex-wrap:wrap;margin-top:22px}
.vd-btn{display:inline-flex;align-items:center;gap:8px;min-height:48px;padding:12px 22px;border-radius:999px;font-weight:600;font-size:15px;text-decoration:none;transition:transform .15s ease,background .15s ease}
.vd-btn:hover{transform:translateY(-1px)}
.vd-btn-gold{background:var(--gold);color:var(--gold-ink)}
.vd-btn-ghost{border:1.5px solid rgba(255,246,230,.7);color:var(--cream)}
.vd-btn-ghost:hover{background:rgba(255,246,230,.1)}
.vd-price-badge{display:flex;flex-direction:column;align-items:center;gap:2px;line-height:1;background:var(--gold);color:var(--gold-ink);border-radius:20px;padding:12px 22px;transform:rotate(5deg);box-shadow:0 12px 30px rgba(0,0,0,.4)}
.vd-price-badge span{font-size:12px;font-weight:600;letter-spacing:.14em;text-transform:uppercase}
.vd-price-badge strong{font-size:40px;font-weight:700}
.vd-sticker{position:absolute;z-index:1;left:clamp(16px,6vw,80px);top:52%;padding:12px 22px;border-radius:16px;font-weight:700;font-size:clamp(15px,1.8vw,22px);box-shadow:0 10px 30px rgba(0,0,0,.35);transform:rotate(-6deg)}
.vd-sticker-gold{background:var(--gold);color:var(--gold-ink)}

/* sections */
.vd-section{padding:88px 0}
.vd-kicker{margin:0 0 10px;font-size:13px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--gold)}
.vd-h2{margin:0;font-size:clamp(32px,5vw,56px);font-weight:700;line-height:1.05;letter-spacing:-.02em;max-width:820px}
.vd-h3{margin:0 0 14px;font-size:24px;font-weight:700}
.vd-lead{margin:22px 0 0;max-width:760px;font-size:17px;line-height:1.65;color:var(--soft)}
.vd-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:36px}
.vd-card{background:var(--card);border-radius:20px;padding:24px 22px}
.vd-card-icon{display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:50%;background:rgba(255,201,77,.16);color:var(--gold)}
.vd-card h3{margin:14px 0 8px;font-size:20px;line-height:1.2}
.vd-card p{margin:0;font-size:15px;color:var(--soft)}
.vd-promise{margin-top:24px;border:1.5px dashed rgba(255,201,77,.6);border-radius:20px;padding:22px 24px}
.vd-promise-head{display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap;margin-bottom:14px}
.vd-promise-head h3{margin:0;font-size:20px}
.vd-chips{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:10px}
.vd-chip{padding:7px 15px;border-radius:999px;border:1.4px solid rgba(255,246,230,.55);font-size:14px;font-weight:500}
.vd-chip-gold{background:var(--gold);border-color:var(--gold);color:var(--gold-ink);font-weight:600}

.vd-band{position:relative;height:clamp(200px,32vw,380px)}
.vd-band img{object-fit:cover}
.vd-band::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,var(--ink) 0%,rgba(21,17,15,.1) 30%,rgba(21,17,15,.1) 70%,var(--ink) 100%)}

/* programme */
.vd-days{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:40px;margin-top:36px}
.vd-day-head{display:flex;align-items:baseline;gap:12px;padding-bottom:10px;border-bottom:2px solid var(--gold)}
.vd-day-head h3{margin:0;font-size:28px}
.vd-day-head span{font-size:13px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--gold)}
.vd-slots{list-style:none;margin:0;padding:0}
.vd-slots li{display:flex;gap:16px;align-items:baseline;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.1)}
.vd-slots time{flex:0 0 84px;font-size:14px;font-weight:700;color:var(--gold)}
.vd-slots span{font-size:16px;font-weight:500}
.vd-slots li.is-highlight time{color:var(--pink)}
.vd-slots li.is-highlight span{font-weight:700}
.vd-figure{margin:24px 0 0;position:relative;border-radius:18px;overflow:hidden}
.vd-figure img{display:block;width:100%;height:auto}
.vd-figure figcaption{position:absolute;left:0;right:0;bottom:0;padding:30px 16px 12px;background:linear-gradient(180deg,rgba(18,14,12,0),rgba(18,14,12,.85));font-family:var(--vd-serif),Georgia,serif;font-style:italic}

/* activities */
.vd-activities{position:relative;padding:96px 0}
.vd-activities-img{object-fit:cover}
.vd-activities-scrim{position:absolute;inset:0;background:linear-gradient(180deg,var(--ink) 0%,rgba(16,18,14,.7) 25%,rgba(6,22,15,.75) 100%)}
.vd-activities-inner{position:relative;z-index:1}

/* stay */
.vd-dorm{margin-top:36px;display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap;background:var(--gold);color:var(--gold-ink);border-radius:22px;padding:26px 30px}
.vd-dorm h3{margin:4px 0;font-size:28px}
.vd-dorm p{margin:0;font-size:15px;font-weight:500}
.vd-dorm-label{font-size:12px!important;font-weight:700!important;letter-spacing:.18em;text-transform:uppercase}
.vd-dorm-price{text-align:right;line-height:1}
.vd-dorm-price strong{display:block;font-size:52px;font-weight:700;letter-spacing:-.02em}
.vd-dorm-price span{display:block;margin-top:6px;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}
.vd-table-wrap{margin-top:18px;background:var(--card);border-radius:22px;overflow-x:auto}
.vd-table{width:100%;min-width:560px;border-collapse:collapse}
.vd-table th,.vd-table td{padding:16px 20px;text-align:center}
.vd-table thead th{font-size:14px;font-weight:700;vertical-align:bottom}
.vd-table thead th:first-child{text-align:left;font-size:17px}
.vd-table th span{display:block;font-size:11px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--soft)}
.vd-table tbody tr{border-top:1px solid rgba(255,255,255,.1)}
.vd-table tbody th{text-align:left;font-size:20px;font-weight:700}
.vd-table tbody th span{letter-spacing:0;text-transform:none;font-size:13px}
.vd-table td{font-size:24px;font-weight:700;color:var(--gold)}
.vd-two{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:18px}
.vd-box{border:1.5px solid rgba(255,246,230,.25);border-radius:20px;padding:22px 24px}
.vd-box h3{margin:0 0 12px;font-size:18px}
.vd-list{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:9px}
.vd-list li{position:relative;padding-left:18px;font-size:15px;color:var(--soft)}
.vd-list li::before{content:"";position:absolute;left:0;top:.6em;width:7px;height:7px;border-radius:50%;background:var(--gold)}

/* booking */
.vd-book{background:var(--pink);color:#fff;padding:40px 0}
.vd-book-inner{display:flex;align-items:center;gap:24px;flex-wrap:wrap}
.vd-book-logo{background:#F5EDDC;border-radius:16px;padding:8px 12px;display:flex}
.vd-book-logo img{height:84px;width:auto}
.vd-book-text{flex:1 1 320px}
.vd-book-label{margin:0;font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase}
.vd-book-phones{margin:4px 0;font-size:clamp(20px,2.6vw,28px);font-weight:700}
.vd-book-phones a,.vd-book-mail a{text-decoration:none}
.vd-book-phones a:hover,.vd-book-mail a:hover{text-decoration:underline}
.vd-book-mail{margin:0;font-size:15px}
.vd-book-actions{display:flex;gap:12px;flex-wrap:wrap}
.vd-btn-white{background:#fff;color:var(--pink)}
.vd-btn-outline-white{border:1.5px solid #fff;color:#fff}

/* responsive */
@media (max-width:860px){
  .vd-cards,.vd-days,.vd-two{grid-template-columns:minmax(0,1fr)}
  .vd-section{padding:64px 0}
  .vd-sticker{top:auto;bottom:46%}
  .vd-dorm-price{text-align:left}
}
@media (prefers-reduced-motion:reduce){.vd-btn{transition:none}}
`;
