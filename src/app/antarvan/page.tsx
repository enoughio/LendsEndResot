// Antarvan — An Ashtanga Yoga Retreat
// Next.js App Router page: place at app/antarvan/page.tsx (route: /antarvan)
// Images: copy public/images/antarvan/* into your project's public/ folder.
// Self-contained: no Tailwind or extra packages required.

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Antarvan — An Ashtanga Yoga Retreat | 11–13 December 2026",
  description:
    "A three-day Ashtanga Yoga retreat through Patanjali's eight limbs at Sumiran Forest, near Bhopal. Facilitated by Alifia, founder of Aadhara Yoga. 11–13 December 2026.",
  openGraph: {
    title: "Antarvan — An Ashtanga Yoga Retreat",
    description: "Eight limbs. One forest. Return to yourself. 11–13 December 2026, Sumiran Forest, near Bhopal.",
    images: ["/events/antarvan/hero.jpeg"],
  },
};

const IMG = {
  hero: "/events/antarvan/hero.jpeg",
  reflection: "/events/antarvan/p-reflection.jpeg",
  lakeYoga: "/events/antarvan/lake-side-yoga.jpeg",
  sunset: "/events/antarvan/sunset.jpeg",
  morning: "/events/antarvan/morning.jpeg",
  path: "/events/antarvan/path.jpeg",
  flowers: "/events/antarvan/flowers.jpeg",
  stars: "/events/antarvan/stars.jpeg",
  sunrise: "/events/antarvan/sunrise.jpeg",
};
const PHONES = [
  { display: "+91 89891 10232", tel: "+918989110232", wa: "918989110232" },
  { display: "+91 81096 69604", tel: "+918109669604", wa: "918109669604" },
];

const LIMBS = [
  { n: 1, name: "Yama", concept: "How we behave with others", exp: "Nature ethics" },
  { n: 2, name: "Niyama", concept: "How we relate to ourselves", exp: "Self-reflection ritual" },
  { n: 3, name: "Asana", concept: "Physical stability", exp: "Nature-inspired yoga" },
  { n: 4, name: "Pranayama", concept: "Regulation of breath", exp: "Forest breathing at dawn" },
  { n: 5, name: "Pratyahara", concept: "Withdrawal of the senses", exp: "Blindfold sensory experience" },
  { n: 6, name: "Dharana", concept: "Concentration", exp: "Nature gazing" },
  { n: 7, name: "Dhyana", concept: "Meditation", exp: "Silent forest meditation" },
  { n: 8, name: "Samadhi", concept: "Integration and oneness", exp: "Nature unity experience" },
];

const EXPERIENCES = [
  { name: "Silent forest walks", tag: "Morning and night", text: "Walk the forest in complete silence, by day and under the stars, and let it speak instead." },
  { name: "Blindfold sensory experience", tag: "Pratyahara", text: "Set sight aside and meet the forest through sound, touch and scent." },
  { name: "Trataka", tag: "Dharana", text: "Steady gazing on a flame to still the mind and sharpen focus." },
  { name: "Gratitude journaling", tag: "Niyama", text: "Quiet time under the trees to reflect, and to write down what you are grateful for." },
  { name: "Nature unity experience", tag: "Samadhi", text: "Extended silent sitting on the final morning, resting in stillness." },
];

type Slot = { t: string; s: string; tag?: string };
const DAYS: { day: string; date: string; theme: string; slots: Slot[] }[] = [
  {
    day: "Day 1", date: "Fri, 11 Dec", theme: "Arrive and settle",
    slots: [
      { t: "10:00 AM", s: "Pick-up from Bhopal" },
      { t: "12:00 PM", s: "Arrival and check-in" },
      { t: "1:00 PM", s: "Forest lunch" },
      { t: "2:00 PM", s: "Leisure time in the forest" },
      { t: "4:00 PM", s: "Opening circle and high tea" },
      { t: "4:30 PM", s: "Nature-inspired yoga and an introduction to the eight limbs", tag: "Asana" },
      { t: "6:00 PM", s: "Rest" },
      { t: "6:30 PM", s: "Dinner" },
      { t: "7:30 PM", s: "Silent walk, then sharing around the bonfire" },
      { t: "8:30 PM", s: "Trataka: nature gazing", tag: "Dharana" },
      { t: "9:30 PM", s: "Paad Abhyanga" },
      { t: "10:00 PM", s: "Lights out" },
    ],
  },
  {
    day: "Day 2", date: "Sat, 12 Dec", theme: "Go inward",
    slots: [
      { t: "6:00 AM", s: "Fall-in with Om chanting", tag: "Niyama" },
      { t: "6:30 AM", s: "Forest breathing and yoga", tag: "Pranayama · Asana" },
      { t: "7:30 AM", s: "Morning juice" },
      { t: "8:30 AM", s: "Breakfast" },
      { t: "9:00 AM", s: "Silent forest immersion walk" },
      { t: "11:00 AM", s: "Blindfold sensory experience", tag: "Pratyahara" },
      { t: "12:30 PM", s: "Rest" },
      { t: "1:00 PM", s: "Lunch" },
      { t: "2:00 PM", s: "Archery, target shooting and games" },
      { t: "4:00 PM", s: "High tea" },
      { t: "4:30 PM", s: "Gratitude journaling in the forest", tag: "Niyama" },
      { t: "6:00 PM", s: "Yoga Nidra", tag: "Dhyana" },
      { t: "6:30 PM", s: "Dinner" },
      { t: "7:30 PM", s: "Bonfire, stories and stargazing" },
      { t: "9:00 PM", s: "Silent night walk" },
      { t: "9:40 PM", s: "Paad Abhyanga" },
      { t: "10:00 PM", s: "Lights out" },
    ],
  },
  {
    day: "Day 3", date: "Sun, 13 Dec", theme: "Stillness",
    slots: [
      { t: "6:00 AM", s: "Fall-in with Om chanting", tag: "Niyama" },
      { t: "6:30 AM", s: "Couple’s yoga", tag: "Asana" },
      { t: "7:30 AM", s: "Kids’ yoga", tag: "Asana" },
      { t: "8:30 AM", s: "Breakfast" },
      { t: "9:30 AM", s: "Silent forest meditation", tag: "Dhyana" },
      { t: "10:45 AM", s: "Nature unity experience", tag: "Samadhi" },
      { t: "11:30 AM", s: "Your take-home practice" },
      { t: "12:00 PM", s: "Closing circle and departure" },
      { t: "1:00 PM", s: "Drop in Bhopal" },
    ],
  },
];

const FAQS = [
  { q: "What is Ashtanga Yoga?", a: "Ashtanga means “eight limbs”: the path of yoga described by Patanjali, from Yama and Niyama through Asana, Pranayama, Pratyahara, Dharana and Dhyana to Samadhi. Yoga is not just about poses. It means union: a deeper connection with yourself." },
  { q: "What will happen at the retreat?", a: "Silent nature walks, forest bathing, gratitude journaling, trataka, Paad Abhyanga (foot massage), conscious eating, and mindfulness in how you speak to others. Together, they bring all eight limbs of Ashtanga Yoga into daily life." },
  { q: "How will it benefit me?", a: "We live in a world full of distractions. Wellbeing is not only physical fitness; mental health matters just as much. Ashtanga Yoga helps you slow down, focus and build a deeper connection with yourself." },
  { q: "Who is it for?", a: "Anyone who feels stretched thin: office-goers with no time for themselves, people who skip meals or live on junk food, those stuck in negative thoughts, or tired of city air. A chance to cleanse from the inside out, mind, body and soul, through focus (Dharana) and self-awareness (Dhyana)." },
  { q: "Can families and children join?", a: "Yes. The retreat is open to all, and age is no limit. Families are welcome, and minors can join with adult supervision." },
  { q: "Why Sumiran Forest?", a: "Sumiran is a 300-acre living, breathing forest, with air quality (AQI) below 10 and naturally alkaline water. Away from the city and close to the earth, it is a space to root, rest and heal." },
  { q: "What food is served?", a: "Food is an important part of the retreat. Meals are sattvic and nourishing, mostly made from locally grown produce. Packaged food is not allowed, and as a practice of Niyama, everyone washes their own utensils." },
];

const PRICES = [
  { room: "Four sharing", price: "₹11,200" },
  { room: "Triple sharing", price: "₹12,400" },
  { room: "Double sharing", price: "₹15,400" },
  { room: "Single stay", price: "₹24,400" },
];

const INCLUDED = [
  "Return travel from Bhopal",
  "Two nights’ stay in your chosen room",
  "All meals, high tea and morning juice",
  "All yoga, pranayama and meditation sessions",
  "Guided forest walks, archery and target shooting",
  "Bonfire evenings, storytelling and stargazing",
  "Yoga mats and Paad Abhyanga oil",
];

const BRING = [
  "Warm layers for cold December nights",
  "A light shawl for Yoga Nidra",
  "Walking shoes and a torch",
  "A reusable water bottle",
  "A notebook for reflections",
];

const CSS = `
.av{--forest:#0F3D3A;--gold:#F4B13B;--clay:#E0745E;--sand:#F2E6D6;--deep:#0A2E2B;--claydark:#A9442E;
  font-family:'Jost',system-ui,sans-serif;color:var(--forest);background:var(--sand);line-height:1.6}
.av *{box-sizing:border-box}
.av h1,.av h2,.av h3{font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;margin:0;line-height:1.05;text-wrap:balance}
.av p{margin:0;text-wrap:pretty}
.av a{color:inherit}
.av .wrap{width:100%;max-width:1120px;margin:0 auto;padding:0 24px}
.av .sec{position:relative;isolation:isolate;overflow:hidden;padding:96px 0}
.av .bg{position:absolute;inset:0;z-index:-2;width:100%;height:100%;object-fit:cover}
.av .veil{position:absolute;inset:0;z-index:-1}
.av .eyebrow{display:flex;align-items:center;gap:14px;font-size:13px;letter-spacing:3px;font-weight:600;text-transform:uppercase}
.av .eyebrow::before{content:"";width:40px;height:3px;background:var(--clay)}
.av .dark{color:var(--sand);background:var(--forest)}
.av .dark .eyebrow{color:var(--gold)}
.av .h2{font-size:clamp(36px,5vw,56px);margin:16px 0 20px}
.av .lead{font-size:18px;max-width:720px}
/* hero */
.av .hero{min-height:100vh;display:flex;flex-direction:column;justify-content:space-between;padding:40px 0 48px;color:var(--sand)}
.av .hero .veil{background:linear-gradient(180deg,rgba(15,61,58,.88) 0%,rgba(15,61,58,.5) 34%,rgba(15,61,58,.45) 55%,rgba(15,61,58,.7) 75%,rgba(10,46,43,.95) 100%)}
.av .hero-top{display:flex;justify-content:space-between;gap:16px;font-size:13px;letter-spacing:3px;font-weight:500;color:var(--gold);text-transform:uppercase}
.av .hero-mid{text-align:center;display:flex;flex-direction:column;align-items:center;gap:14px;padding:48px 0}
.av .hero h1{font-size:clamp(84px,15vw,170px);font-weight:600;color:var(--sand)}
.av .deva{font-family:'Tiro Devanagari Hindi',serif;font-size:26px}
.av .tagline{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:clamp(24px,3.4vw,36px);color:var(--gold)}
.av .hero-foot{display:flex;justify-content:space-between;gap:24px;flex-wrap:wrap}
.av .label{font-size:12px;letter-spacing:2.5px;font-weight:600;color:var(--gold);text-transform:uppercase}
.av .btn{display:inline-block;margin-top:12px;background:var(--gold);color:var(--forest);padding:14px 26px;border-radius:999px;font-weight:600;text-decoration:none;letter-spacing:.5px}
.av .btn:hover{background:#f7c25f}
/* limbs */
.av .limbs{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px;margin-top:36px}
.av .limb{background:#FBF6EE;border:1px solid #D9CBB6;border-radius:16px;padding:20px;display:flex;gap:16px}
.av .num{flex:none;width:44px;height:44px;border-radius:50%;background:var(--forest);color:var(--gold);display:grid;place-items:center;font-family:'Cormorant Garamond',serif;font-weight:700;font-size:24px}
.av .limb h3{font-size:26px;font-weight:700}
.av .limb i{display:block;font-size:14px;color:#4A5E5B;margin:2px 0 6px}
.av .limb b{font-weight:500}
/* gallery */
.av .gallery{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:220px;gap:14px;margin-top:36px}
.av .gallery img{width:100%;height:100%;object-fit:cover;border-radius:16px;display:block}
.av .g1{grid-column:span 2;grid-row:span 2}.av .g4{grid-column:span 2}
/* experiences */
.av .exp{border-top:1px solid #2E5E5A;display:grid;grid-template-columns:300px minmax(0,1fr);gap:24px;padding:20px 0}
.av .exp:last-child{border-bottom:1px solid #2E5E5A}
.av .exp h3{font-size:30px;color:var(--gold)}
.av .exp small{display:block;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;opacity:.85;margin-top:4px}
.av .exp p{font-size:18px}
.av .panel{margin-top:40px;background:var(--sand);color:var(--forest);border-radius:18px;padding:28px 32px;border-left:12px solid var(--clay);max-width:760px}
.av .panel .label{color:var(--claydark)}
.av .panel h3{font-size:36px;font-weight:700;margin:6px 0 8px}
/* flow */
.av .days{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:36px;align-items:start}
.av .dayhead{background:var(--forest);color:var(--sand);border-radius:16px;padding:18px 20px}
.av .dayhead .label{color:var(--gold)}
.av .dayhead h3{font-size:28px;margin-top:4px}
.av .slot{display:grid;grid-template-columns:78px minmax(0,1fr);gap:10px;padding:9px 4px;border-bottom:1px solid #D9CBB6;font-size:15px}
.av .slot time{font-size:13px;font-weight:600;padding-top:2px;white-space:nowrap}
.av .tag{display:block;font-size:12px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;color:var(--claydark)}
/* faq */
.av .faqs{columns:2;column-gap:48px;margin-top:36px}
.av details{break-inside:avoid;margin:0 0 18px;border-bottom:1px solid rgba(242,230,214,.25);padding-bottom:14px}
.av summary{cursor:pointer;list-style:none;font-family:'Cormorant Garamond',serif;font-weight:700;font-size:26px;color:var(--gold);display:flex;gap:12px;align-items:baseline}
.av summary::-webkit-details-marker{display:none}
.av summary::before{content:"+";font-family:'Jost',sans-serif;font-weight:500;color:var(--clay);width:14px;flex:none}
.av details[open] summary::before{content:"–"}
.av details p{margin-top:10px;font-size:16px;padding-left:26px}
/* booking */
.av .book{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:56px}
.av .price{display:flex;justify-content:space-between;align-items:baseline;padding:16px 0;border-bottom:1px solid #2E5E5A;font-size:20px}
.av .price strong{font-family:'Cormorant Garamond',serif;font-size:40px;color:var(--gold)}
.av .list{list-style:none;padding:0;margin:14px 0 0;display:grid;gap:10px}
.av .list li{display:flex;gap:12px;align-items:baseline}
.av .list li::before{content:"";flex:none;width:7px;height:7px;border-radius:50%;background:var(--clay);transform:translateY(-2px)}
.av .cta{margin-top:56px;background:var(--gold);color:var(--forest);border-radius:20px;padding:32px 36px;display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap}
.av .cta h2{font-size:clamp(34px,4vw,46px);font-weight:700}
.av .cta .label{color:var(--forest)}
.av .phones{display:flex;flex-direction:column;gap:6px;text-align:right}
.av .phones a{font-size:24px;font-weight:600;text-decoration:none}
.av .phones span{font-size:14px}
.av .phones span a{font-size:14px;text-decoration:underline}
.av .credits{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:end;gap:24px;margin-top:220px}
.av .credits h3{font-size:26px;font-weight:700;color:var(--sand)}
.av .credits .right{text-align:right}
@media (max-width:900px){
  .av .sec{padding:72px 0}
  .av .days{grid-template-columns:1fr}
  .av .faqs{columns:1}
  .av .book{grid-template-columns:1fr;gap:40px}
  .av .exp{grid-template-columns:1fr;gap:6px}
  .av .gallery{grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-rows:180px}
  .av .g1{grid-column:span 2;grid-row:span 1}.av .g4{grid-column:span 2}
  .av .phones{text-align:left}
  .av .credits{grid-template-columns:1fr;justify-items:center;text-align:center;margin-top:160px}
  .av .credits .right{text-align:center}
}
`;

export default function AntarvanPage() {
  return (
    <main className="av">
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Jost:wght@400;500;600&family=Tiro+Devanagari+Hindi&display=swap"
      />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* HERO */}
      <section className="sec hero" aria-labelledby="av-title">
        <img className="bg" src={IMG.hero} alt="Aerial view of the lake and forest at Sumiran Forest" style={{ objectPosition: "42% center" }} />
        <div className="veil" aria-hidden="true" />
        <div className="wrap hero-top">
          <span>An Ashtanga Yoga Retreat</span>
          <span>11–13 Dec 2026</span>
        </div>
        <div className="wrap hero-mid">
          <h1 id="av-title">Antarvan</h1>
          <p style={{ fontSize: 20, letterSpacing: 1 }}>
            <span className="deva" lang="hi">अंतर्वन</span> · the forest within
          </p>
          <p className="tagline">Eight limbs. One forest. Return to yourself.</p>
          <a className="btn" href="#book">Reserve your place</a>
        </div>
        <div className="wrap hero-foot">
          <div>
            <div className="label">Venue</div>
            <div style={{ fontSize: 18 }}>Land’s End – The Last Resort</div>
            <div>Sumiran Forest, near Bhopal</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="label">Facilitated by</div>
            <div style={{ fontSize: 18 }}>Alifia</div>
            <div>Founder, Aadhara Yoga</div>
          </div>
        </div>
      </section>

      {/* THE RETREAT + EIGHT LIMBS */}
      <section className="sec" aria-labelledby="av-retreat">
        <img className="bg" src={IMG.reflection} alt="Still water reflecting the reeds and forest edge" aria-hidden="true" />
        <div className="veil" aria-hidden="true" style={{ background: "rgba(242,230,214,.9)" }} />
        <div className="wrap">
          <div className="eyebrow">The retreat</div>
          <h2 id="av-retreat" className="h2">The complete path of yoga, lived in a forest</h2>
          <p className="lead">
            Antarvan follows Ashtanga in its original sense: Patanjali’s eight limbs of yoga. Over three days in Sumiran
            Forest, you move from how you live, to the body, the breath and the senses, and finally to stillness. Each limb
            is introduced, then experienced in nature, guided by Alifia, therapeutic yoga instructor and founder of Aadhara
            Yoga. Gentle, warm and beginner-friendly.
          </p>
          <h3 style={{ fontSize: 34, marginTop: 48 }}>The eight limbs in the forest</h3>
          <div className="limbs">
            {LIMBS.map((l) => (
              <div className="limb" key={l.n}>
                <div className="num" aria-hidden="true">{l.n}</div>
                <div>
                  <h3>{l.name}</h3>
                  <i>{l.concept}</i>
                  <b>{l.exp}</b>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="sec" aria-labelledby="av-gallery" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div className="eyebrow">Life at Sumiran Forest</div>
          <h2 id="av-gallery" className="h2">Sunrise practice, lakeside circles, stillness</h2>
          <div className="gallery">
            <img className="g1" src={IMG.lakeYoga} alt="A group gathered by the lake at sunset" />
            <img src={IMG.morning} alt="A morning gathering on the lawn at Land’s End" />
            <img src={IMG.sunset} alt="Sunset over the lake at Sumiran Forest" />
            <img className="g4" src={IMG.reflection} alt="A walker reflected in still water beside the reeds" />
          </div>
        </div>
      </section>

      {/* SIGNATURE EXPERIENCES */}
      <section className="sec dark" aria-labelledby="av-exp">
        <img className="bg" src={IMG.path} alt="A narrow path through dense forest" aria-hidden="true" />
        <div className="veil" aria-hidden="true" style={{ background: "rgba(15,61,58,.84)" }} />
        <div className="wrap">
          <div className="eyebrow">Signature experiences</div>
          <h2 id="av-exp" className="h2">In the forest, in silence</h2>
          <p className="lead" style={{ marginBottom: 28 }}>Each practice is introduced, then experienced in nature.</p>
          {EXPERIENCES.map((e) => (
            <div className="exp" key={e.name}>
              <div>
                <h3>{e.name}</h3>
                <small>{e.tag}</small>
              </div>
              <p>{e.text}</p>
            </div>
          ))}
          <div className="panel">
            <div className="label">Every night</div>
            <h3>Paad Abhyanga</h3>
            <p>
              Close each day with the Ayurvedic ritual of a warm sesame oil foot massage, 5–10 minutes before sleep. A
              calming part of traditional dinacharya, and a practice to take home.
            </p>
          </div>
        </div>
      </section>

      {/* RETREAT FLOW */}
      <section className="sec" aria-labelledby="av-flow">
        <img className="bg" src={IMG.flowers} alt="A pink forest flower among green leaves" aria-hidden="true" style={{ objectPosition: "center 60%" }} />
        <div className="veil" aria-hidden="true" style={{ background: "rgba(242,230,214,.9)" }} />
        <div className="wrap">
          <div className="eyebrow">Three days in the forest</div>
          <h2 id="av-flow" className="h2">The retreat flow</h2>
          <div className="days">
            {DAYS.map((d) => (
              <div key={d.day}>
                <div className="dayhead">
                  <div className="label">{d.day} · {d.date}</div>
                  <h3>{d.theme}</h3>
                </div>
                <div style={{ marginTop: 6 }}>
                  {d.slots.map((s) => (
                    <div className="slot" key={s.t + s.s}>
                      <time>{s.t}</time>
                      <span>
                        {s.s}
                        {s.tag && <span className="tag">{s.tag}</span>}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec dark" aria-labelledby="av-faq">
        <img className="bg" src={IMG.stars} alt="The night sky and Milky Way above the forest" aria-hidden="true" />
        <div className="veil" aria-hidden="true" style={{ background: "rgba(15,61,58,.4)" }} />
        <div className="wrap">
          <div className="eyebrow">Questions and answers</div>
          <h2 id="av-faq" className="h2">Before you come</h2>
          <div className="faqs">
            {FAQS.map((f, i) => (
              <details key={f.q} open={i < 2}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING + BOOKING */}
      <section id="book" className="sec dark" aria-labelledby="av-book" style={{ paddingBottom: 48 }}>
        <img className="bg" src={IMG.sunrise} alt="Sunrise through the trees at Sumiran Forest" style={{ top: "auto", height: "62%", objectPosition: "center 70%" }} />
        <div
          className="veil"
          aria-hidden="true"
          style={{ background: "linear-gradient(180deg,#0F3D3A 0%,#0F3D3A 38%,rgba(15,61,58,.8) 48%,rgba(15,61,58,.35) 64%,rgba(15,61,58,.15) 78%,rgba(10,46,43,.95) 100%)" }}
        />
        <div className="wrap">
          <div className="eyebrow">Join us</div>
          <div className="book" style={{ marginTop: 16 }}>
            <div>
              <h2 id="av-book" className="h2" style={{ margin: "0 0 6px" }}>Pricing</h2>
              <p style={{ opacity: 0.85 }}>Per person, for the full retreat, with travel from Bhopal</p>
              <div style={{ marginTop: 8, borderTop: "1px solid #2E5E5A" }}>
                {PRICES.map((p) => (
                  <div className="price" key={p.room}>
                    <span>{p.room}</span>
                    <strong>{p.price}</strong>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="label">What is included</div>
              <ul className="list">{INCLUDED.map((x) => <li key={x}>{x}</li>)}</ul>
              <div className="label" style={{ marginTop: 32 }}>What to bring</div>
              <ul className="list">{BRING.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          </div>

          <div className="cta">
            <div>
              <h2>Reserve your place</h2>
              <p>11–13 December 2026 · Seats are limited</p>
            </div>
            <div className="phones">
              <div className="label">Call or WhatsApp</div>
              {PHONES.map((p) => (
                <div key={p.tel}>
                  <a href={`tel:${p.tel}`}>{p.display}</a>{" "}
                  <span>(<a href={`https://wa.me/${p.wa}?text=${encodeURIComponent("Hi, I'd like to book the Antarvan retreat (11–13 Dec).")}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>)</span>
                </div>
              ))}
            </div>
          </div>

          <div className="credits">
            <div>
              <div className="label">Organised by</div>
              <h3>Story Retreat Collective</h3>
            </div>
            <div className="right">
              <div className="label">Executed by</div>
              <h3>Aadhara Yoga</h3>
              <div style={{ fontSize: 14 }}>Hosted at Land’s End – The Last Resort</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
