// EdunicPage.tsx
// EDUNIC — Learning in the Wild | Land's End — The Last Resort
// Flagship school program landing page.
//
// USAGE
// 1. Drop this file into your React / Next.js project (any component folder).
// 2. Place your photos in /public/images/edunic/ using the filenames in the
//    IMAGES map below (or edit the paths to point at your hosted images / CDN).
// 3. Render <EdunicPage /> on the route of your choice.
//
// The page is fully self-contained: brand fonts load from Google Fonts and all
// styling lives in the <style> block at the bottom. No Tailwind or UI library needed.

import React from "react";

/* ------------------------------------------------------------------ */
/*  IMAGE PATHS — replace with your own hosted photos                  */
/* ------------------------------------------------------------------ */
const IMAGES = {
  heroCanopy: "/images/edunic/forest-canopy.jpg",   // leafy forest archway (hero)
  ropeBridge: "/images/edunic/rope-bridge.jpg",     // kids crossing rope bridge
  lake: "/images/edunic/lake.jpg",                  // 60-acre lake / stream
  archery: "/images/edunic/archery.jpg",            // student at archery
  zipline: "/images/edunic/zipline.jpg",            // student in helmet + harness
  highRopes: "/images/edunic/high-ropes.jpg",       // high ropes structure
  stargazing: "/images/edunic/stargazing.jpg",      // night sky / telescope
  trail: "/images/edunic/forest-trail.jpg",         // wet forest trail
  property: "/images/edunic/property-dusk.jpg",     // the stay at dusk
  group: "/images/edunic/group.jpg",                // students together in forest
};

/* ------------------------------------------------------------------ */
/*  CONTENT                                                            */
/* ------------------------------------------------------------------ */
const LAND_FACTS = [
  { num: "90", unit: "acres", text: "Water bodies — a 60-acre lake and forest streams." },
  { num: "100", unit: "acres", text: "Organic farms that grow the food cooked on site." },
  { num: "110+", unit: "acres", text: "Lush forest, including a 25-acre sacred grove." },
];

const PILLARS = [
  {
    title: "Head",
    text: "Curiosity, critical thinking, and a deeper feel for science, soil and the stars.",
  },
  {
    title: "Hands",
    text: "Adventure, farming and skill — strength and resilience built through challenge.",
  },
  {
    title: "Heart",
    text: "Empathy, calm, confidence, and a lasting bond with the living earth.",
  },
];

const SCHEDULE = [
  { t: "6:00 am", h: "Wake Up", p: "Early, so the best hours of the forest are not lost to sleep." },
  { t: "6:30 am", h: "Yoga & Light Exercise", p: "Gentle stretches and breathing as the forest wakes with you." },
  { t: "7:00 am", h: "Morning Forest Walk", p: "A naturalist leads the way, when birdsong is loudest and the light is soft." },
  { t: "8:30 am", h: "Breakfast", p: "Organic and farm-grown, prepared on site. Served and cleared together." },
  { t: "9:30 am", h: "Adventure Sports", p: "Zipline, high ropes, archery and rope bridges — certified gear, trained facilitators." },
  { t: "11:00 am", h: "Hands-On Workshop", p: "Farming, composting, natural colour or mud craft — slow, tactile, satisfying." },
  { t: "1:00 pm", h: "Forest Lunch", p: "Grown here, cooked here, eaten here — the distance from seed to meal, understood." },
  { t: "3:00 pm", h: "Nature Journaling", p: "Students sketch and describe one thing they observed. Writing sharpens seeing." },
  { t: "4:30 pm", h: "Evening Snacks & Herbal Drink", p: "A warm pause before the evening — snacks and a forest herbal drink." },
  { t: "5:00 pm", h: "Guided Forest Walk & Lake Visit", p: "An unhurried walk down to the lake as the light turns gold." },
  { t: "7:30 pm", h: "Dinner Under the Stars", p: "A shared meal in the open air, beneath an uninterrupted sky." },
  { t: "8:30 pm", h: "Campfire Storytelling & Stargazing", p: "Each student shares a story by the fire; a guide names the constellations above." },
  { t: "10:00 pm", h: "Lights Out", p: "Quiet settles over the forest. Tired, content, and already a little changed." },
];

const ACTIVITIES = [
  {
    title: "In the Wild",
    items: [
      "Guided nature trail — birds, butterflies, trees",
      "Wildlife sign identification: tracks, calls",
      "Dawn bird walk with a naturalist",
      "Night walk — nocturnal sounds and sightings",
      "Water body and wetland study",
      "Star gazing and sky mapping",
    ],
  },
  {
    title: "Adventure",
    items: [
      "Zipline across the forest canopy",
      "High ropes and obstacle course",
      "Archery and target shooting",
      "Rope-bridge and net crossings",
      "Tent pitching and camping",
      "Treasure hunt and team challenges",
    ],
  },
  {
    title: "Hands & Earth",
    items: [
      "Organic farming — sow, tend, harvest",
      "Kitchen waste composting",
      "Natural colour making from plants",
      "Mud craft and pottery",
      "Stone work and natural building",
      "Gaushala visit and care",
    ],
  },
  {
    title: "Voice & Story",
    items: [
      "Campfire storytelling circle",
      "Nature journal and field sketching",
      "Public speaking — one discovery, shared",
      "Nature theme painting",
      "Expert talks by field naturalists",
      "Group investigation and presentation",
    ],
  },
];

const PROGRAMS = [
  {
    name: "Bagless Half-Day",
    tag: "NEP Bagless Day",
    duration: "4 hours",
    group: "25 students",
    includes: "Nature trail, one activity, a snack meal, and a storytelling reflection circle.",
    price: "Rs 1,000",
    priceNote: "per student · 1 meal",
  },
  {
    name: "Full Day",
    duration: "8 hours",
    group: "25 students",
    includes: "Trail, adventure sports, organic lunch, workshop, storytelling session, and debrief.",
    price: "Rs 1,500",
    priceNote: "per student · lunch + snacks",
  },
  {
    name: "Night Wonder",
    duration: "2D · 1N",
    group: "25 students",
    includes: "Adds star gazing, a campfire session, a night walk, and a dawn bird walk.",
    price: "Rs 3,300",
    priceNote: "per student · all meals",
  },
  {
    name: "The Dip",
    duration: "3D · 2N",
    group: "25 students",
    includes: "A group field investigation presented on Day 3. Storytelling is a structured module.",
    price: "Rs 6,000",
    priceNote: "per student · all meals",
  },
  {
    name: "Deep Immersion",
    duration: "5–7 days",
    group: "25 students",
    includes: "Students choose a specialisation and produce a real, documented output.",
    price: "Rs 15,000–20,000",
    priceNote: "per student · all meals",
  },
];

const NEP = [
  { sec: "Sec 4.6", h: "Experiential Learning", p: "Hands-on, inquiry-driven learning at all stages, delivered in its entirety." },
  { sec: "Sec 4.6", h: "Storytelling Pedagogy", p: "The only structured storytelling delivery near Bhopal." },
  { sec: "Sec 16.5", h: "10 Bagless Days", p: "Day programs fulfil the Classes 6–8 requirement, with certification." },
  { sec: "Sec 4.26", h: "Vocational Education", p: "Farming, composting and craft qualify as vocational exposure from Class 6." },
  { sec: "Sec 4.35", h: "Holistic Progress Card", p: "Student-wise HPC observation records, handed over at departure." },
];

const DOCS = [
  "Bagless Day Compliance Certificate",
  "Student-wise HPC observation records (PARAKH format)",
  "NCERT curriculum mapping",
  "Teacher Participation Record",
];

const GALLERY = [
  { src: IMAGES.archery, alt: "Student at archery", feature: true },
  { src: IMAGES.zipline, alt: "Student on the zipline" },
  { src: IMAGES.lake, alt: "The forest lake" },
  { src: IMAGES.highRopes, alt: "High ropes course" },
  { src: IMAGES.ropeBridge, alt: "Crossing the rope bridge" },
  { src: IMAGES.stargazing, alt: "Stargazing at night" },
  { src: IMAGES.trail, alt: "Forest trail" },
  { src: IMAGES.property, alt: "The stay at dusk" },
];

const CONTACT = {
  phones: ["+91 88713 17382", "+91 81096 69604"],
  email: "landsend.sumiran@gmail.com",
  web: "landsend.storyretreat.in",
  location: "Barkhera Bazyaft, Sumiran Forest, near Bilkisganj, Bhopal, MP",
};

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */
export default function EdunicPage() {
  return (
    <div className="edunic">
      {/* NAV */}
      <header className="nav">
        <div className="nav-brand">Land&apos;s End — The Last Resort</div>
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#day">A Day</a>
          <a href="#programs">Programs</a>
          <a href="#nep">For Schools</a>
          <a href="#contact" className="nav-cta">Enquire</a>
        </nav>
      </header>

      {/* HERO */}
      <section
        className="hero"
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(31,61,46,.35), rgba(31,61,46,.78)), url(${IMAGES.heroCanopy})` }}
      >
        <div className="hero-inner">
          <p className="hero-eyebrow">Inside Sumiran Forest · near Bhopal</p>
          <h1 className="hero-title">EDUNIC</h1>
          <p className="hero-eq">Education + Picnic</p>
          <p className="hero-sub">Learning in the Wild</p>
          <p className="hero-lead">
            A nature, adventure &amp; storytelling program for school students —
            Classes 4 to 10 — set inside a 300-acre community-conserved forest,
            about an hour from Bhopal.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-gold">Bring EDUNIC to your school</a>
            <a href="#day" className="btn btn-ghost">See a day in the wild</a>
          </div>
        </div>
      </section>

      {/* SUMIRAN FOREST */}
      <section id="about" className="section forest">
        <div className="wrap">
          <p className="eyebrow">The Place</p>
          <h2 className="h2">Sumiran Forest</h2>
          <div className="rule" />
          <p className="lead">
            EDUNIC takes place at Land&apos;s End — The Last Resort, set inside Sumiran
            Forest: a 300-acre community-conserved forest. Not a conventional resort,
            and not a manicured park — a living, working forest of lakes, streams,
            farmland and old trees, where children learn by being inside nature
            rather than looking at it.
          </p>
          <div className="land-rows">
            {LAND_FACTS.map((f, i) => (
              <div className="land-row" key={i}>
                <div className="land-num">
                  {f.num}<span>{f.unit}</span>
                </div>
                <div className="land-text">{f.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT IS EDUNIC */}
      <section className="section cream">
        <div className="wrap two-col">
          <div>
            <p className="eyebrow">The Concept</p>
            <h2 className="h2 dark">What is EDUNIC</h2>
            <div className="rule" />
            <div className="equation">Education + Picnic = EDUNIC</div>
            <p className="body">
              What if a school&apos;s best science lesson happened beside a lake,
              not inside a classroom. What if children learned about ecosystems by
              walking through one — naming the trees, tracking the animals,
              studying the soil.
            </p>
            <p className="body">
              EDUNIC is that idea, made real. Each visit is structured around
              learning outcomes, guided by naturalists and experienced facilitators,
              and documented for NEP 2020 compliance. But first, it is fun.
              Genuinely, memorably fun.
            </p>
          </div>
          <div
            className="side-photo"
            style={{ backgroundImage: `url(${IMAGES.trail})` }}
            role="img"
            aria-label="Forest trail at Sumiran"
          />
        </div>
      </section>

      {/* HOLISTIC DEVELOPMENT */}
      <section className="section forest">
        <div className="wrap center">
          <p className="eyebrow">Student Growth</p>
          <h2 className="h2">More than a trip</h2>
          <div className="rule center-rule" />
          <p className="lead center-lead">
            Away from screens and walls, in a living forest, children learn to
            observe, to wonder, to care, and to belong.{" "}
            <em>They return braver, calmer, and quietly changed.</em>
          </p>
          <div className="pillars">
            {PILLARS.map((p) => (
              <div className="pillar" key={p.title}>
                <h3 className="pillar-title">{p.title}</h3>
                <span className="pillar-div" />
                <p className="pillar-text">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A DAY IN THE WILD */}
      <section id="day" className="section cream">
        <div className="wrap">
          <p className="eyebrow">The Experience</p>
          <h2 className="h2 dark">A Day in the Wild</h2>
          <div className="rule" />
          <p className="body">
            A representative day from an overnight program. Every tier has its own
            pace, but the character of the day — specific, unhurried, alive to the
            small things — stays the same, from first light to lights out.
          </p>
          <ol className="timeline">
            {SCHEDULE.map((s, i) => (
              <li className="t-row" key={i}>
                <span className="t-time">{s.t}</span>
                <span className={`t-dot ${i % 2 === 0 ? "dark" : ""}`} />
                <div className="t-content">
                  <h4>{s.h}</h4>
                  <p>{s.p}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ACTIVITIES */}
      <section className="section cream-dark">
        <div className="wrap">
          <p className="eyebrow">What Students Do</p>
          <h2 className="h2 dark">Activities</h2>
          <div className="rule" />
          <div className="act-grid">
            {ACTIVITIES.map((a) => (
              <div className="act-card" key={a.title}>
                <h3>{a.title}</h3>
                <ul>
                  {a.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE STAY */}
      <section className="section split">
        <div
          className="split-photo"
          style={{ backgroundImage: `url(${IMAGES.property})` }}
          role="img"
          aria-label="The stay at Land's End at dusk"
        />
        <div className="split-body">
          <p className="eyebrow">The Forest, The Stay</p>
          <h2 className="h2 dark">A safe base in the wild</h2>
          <div className="rule" />
          <p className="body">
            Students stay in clean, comfortable rooms and dormitories at the edge
            of the forest. Everything a school needs for a safe overnight visit is
            on site — supervised accommodation, organic meals, open learning
            spaces, and a campfire ground under the stars.
          </p>
          <div className="stay-cols">
            <div>
              <h4 className="stay-h">Where students stay</h4>
              <ul className="stay-list">
                <li>Clean rooms and dormitories with attached washrooms</li>
                <li>Separate, supervised arrangements for boys and girls</li>
                <li>Forest and farm views from the rooms</li>
                <li>Open-air classrooms and a storytelling ground</li>
              </ul>
            </div>
            <div>
              <h4 className="stay-h">What we provide</h4>
              <ul className="stay-list">
                <li>Organic meals, grown and cooked on the farm</li>
                <li>Certified equipment and trained facilitators</li>
                <li>First-aid trained staff on site at all times</li>
                <li>A staff-to-student ratio of one to fifteen</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS / PRICING */}
      <section id="programs" className="section cream">
        <div className="wrap">
          <p className="eyebrow">Program Structure</p>
          <h2 className="h2 dark">Five ways to experience EDUNIC</h2>
          <div className="rule" />
          <p className="body">
            Each tier is a complete program — different in depth, not in quality.
            All include facilitation, naturalist fees, activities, materials, meals
            as specified, and a full NEP 2020 documentation package for the school.
          </p>
          <div className="prog-table">
            {PROGRAMS.map((p) => (
              <div className="prog-row" key={p.name}>
                <div className="prog-name">
                  {p.name}
                  {p.tag && <span className="prog-tag">{p.tag}</span>}
                </div>
                <div className="prog-dur">{p.duration}</div>
                <div className="prog-group">min {p.group}</div>
                <div className="prog-inc">{p.includes}</div>
                <div className="prog-price">
                  {p.price}
                  <small>{p.priceNote}</small>
                </div>
              </div>
            ))}
          </div>
          <p className="note">
            Accommodation is included in all overnight programs. Pickup and drop
            are charged separately. GST applies. Teachers accompany free of charge
            at one per fifteen students. Annual school partnerships available —
            priority booking, consolidated NEP reporting, and a 5–10% annual discount.
          </p>
        </div>
      </section>

      {/* STORYTELLING + NEP */}
      <section id="nep" className="section forest">
        <div className="wrap two-col align-start">
          <div>
            <p className="eyebrow">Signature Module</p>
            <h2 className="h2">Storytelling &amp; Voice</h2>
            <div className="rule" />
            <p className="lead">
              NEP 2020 Section 4.6 names storytelling-based pedagogy as standard
              practice. Students observe as Nature Correspondents, record in a
              Nature Journal, narrate at the campfire circle, and present their
              group investigation — building scientific observation, language and
              public-speaking skills together.
            </p>
          </div>
          <div>
            <p className="eyebrow">For Schools</p>
            <h2 className="h2">NEP 2020 Alignment</h2>
            <div className="rule" />
            <div className="nep-list">
              {NEP.map((n, i) => (
                <div className="nep-item" key={i}>
                  <span className="nep-sec">{n.sec}</span>
                  <div>
                    <h4>{n.h}</h4>
                    <p>{n.p}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="doc-box">
              <h4>Documentation issued at departure</h4>
              <ol>
                {DOCS.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section cream">
        <div className="wrap">
          <p className="eyebrow">Glimpses</p>
          <h2 className="h2 dark">The forest, in pictures</h2>
          <div className="rule" />
          <div className="gallery">
            {GALLERY.map((g, i) => (
              <figure
                className={`gal-item ${g.feature ? "feature" : ""}`}
                key={i}
                style={{ backgroundImage: `url(${g.src})` }}
                role="img"
                aria-label={g.alt}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / CTA */}
      <section id="contact" className="section contact">
        <div className="wrap center">
          <h2 className="h2 contact-h">Bring EDUNIC to your school</h2>
          <p className="contact-sub">Learning in the Wild — about an hour from Bhopal.</p>

          <div className="contact-grid">
            <div className="contact-steps">
              <h4>How it begins</h4>
              <ol>
                <li>Write or call us to discuss your school&apos;s needs and dates.</li>
                <li>We send a customised program proposal within two working days.</li>
                <li>A 25% advance confirms the booking; balance seven days before.</li>
                <li>Bring your students. We take care of everything else.</li>
              </ol>
            </div>
            <div className="contact-reach">
              <h4>Reach us</h4>
              <dl>
                <dt>Phone</dt>
                <dd>
                  {CONTACT.phones.map((p) => (
                    <a href={`tel:${p.replace(/\s/g, "")}`} key={p}>{p}</a>
                  ))}
                </dd>
                <dt>Email</dt>
                <dd><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></dd>
                <dt>Website</dt>
                <dd><a href={`https://${CONTACT.web}`}>{CONTACT.web}</a></dd>
                <dt>Location</dt>
                <dd>{CONTACT.location}</dd>
              </dl>
            </div>
          </div>
        </div>
        <footer className="footer">
          <span>Land&apos;s End — The Last Resort · EDUNIC · 2026</span>
          <span className="footer-tag">Where Nature, Silence, and Stories Meet.</span>
        </footer>
      </section>

      {/* STYLES */}
      <style>{css}</style>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  STYLES                                                             */
/* ------------------------------------------------------------------ */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Poppins:wght@400;500;600&display=swap');

.edunic{
  --forest:#1F3D2E; --amber:#C8742E; --cream:#F7F1E1; --cream2:#EFE6D0;
  --gold:#C79A3A; --sage:#6E8468; --mist:#D4C9B0; --bark:#3A2317;
  --f-display:'Crimson Pro',Georgia,serif; --f-body:'Lora',Georgia,serif; --f-label:'Poppins',sans-serif;
  font-family:var(--f-body); color:var(--bark); background:var(--cream);
  -webkit-font-smoothing:antialiased; line-height:1.6;
}
.edunic *{box-sizing:border-box;}
.edunic a{color:inherit;text-decoration:none;}
.wrap{max-width:1100px;margin:0 auto;padding:0 24px;}
.section{padding:88px 0;}
.cream{background:var(--cream);}
.cream-dark{background:var(--cream2);}
.forest{background:var(--forest);color:var(--mist);}
.center{text-align:center;}

.eyebrow{font-family:var(--f-label);font-size:12px;letter-spacing:.26em;text-transform:uppercase;color:var(--amber);margin:0 0 12px;}
.forest .eyebrow{color:var(--gold);}
.h2{font-family:var(--f-display);font-weight:700;font-size:clamp(30px,5vw,46px);line-height:1.05;margin:0;color:var(--cream);}
.h2.dark{color:var(--forest);}
.rule{width:56px;height:3px;background:var(--gold);margin:18px 0 26px;}
.center-rule{margin-left:auto;margin-right:auto;}
.lead{font-size:clamp(16px,2vw,19px);line-height:1.7;max-width:760px;}
.forest .lead{color:var(--mist);}
.center-lead{margin:0 auto;}
.lead em{color:var(--cream);font-style:italic;}
.body{font-size:16px;line-height:1.8;margin:0 0 18px;max-width:720px;}
.forest .body{color:var(--mist);}

/* NAV */
.nav{position:sticky;top:0;z-index:20;display:flex;align-items:center;justify-content:space-between;
  padding:14px 24px;background:rgba(31,61,46,.96);backdrop-filter:blur(6px);color:var(--cream);}
.nav-brand{font-family:var(--f-label);font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--mist);}
.nav-links{display:flex;gap:26px;align-items:center;font-family:var(--f-label);font-size:13px;letter-spacing:.05em;}
.nav-links a{color:var(--mist);transition:color .2s;}
.nav-links a:hover{color:var(--gold);}
.nav-cta{border:1px solid var(--gold);color:var(--gold)!important;padding:7px 16px;border-radius:2px;}
.nav-cta:hover{background:var(--gold);color:var(--forest)!important;}

/* HERO */
.hero{min-height:88vh;display:flex;align-items:center;background-size:cover;background-position:center;color:var(--cream);}
.hero-inner{max-width:1100px;margin:0 auto;padding:0 24px;}
.hero-eyebrow{font-family:var(--f-label);font-size:13px;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin:0 0 10px;}
.hero-title{font-family:var(--f-display);font-weight:700;font-size:clamp(64px,14vw,150px);line-height:.9;margin:0;letter-spacing:2px;}
.hero-eq{font-family:var(--f-label);font-size:clamp(12px,1.6vw,16px);letter-spacing:.32em;text-transform:uppercase;color:var(--gold);margin:12px 0 0;}
.hero-sub{font-family:var(--f-display);font-style:italic;font-size:clamp(26px,4vw,44px);color:var(--amber);margin:18px 0 0;}
.hero-lead{max-width:620px;font-size:clamp(15px,2vw,18px);color:var(--mist);margin:22px 0 32px;line-height:1.7;}
.hero-actions{display:flex;gap:16px;flex-wrap:wrap;}
.btn{font-family:var(--f-label);font-size:14px;letter-spacing:.04em;padding:14px 26px;border-radius:2px;transition:all .2s;display:inline-block;}
.btn-gold{background:var(--gold);color:var(--forest);font-weight:500;}
.btn-gold:hover{background:#d9ab4b;}
.btn-ghost{border:1px solid rgba(245,237,220,.5);color:var(--cream);}
.btn-ghost:hover{border-color:var(--gold);color:var(--gold);}

/* LAND FACTS */
.land-rows{margin-top:30px;max-width:720px;}
.land-row{display:flex;gap:22px;align-items:baseline;padding:20px 0;border-top:1px solid rgba(212,201,176,.2);}
.land-row:last-child{border-bottom:1px solid rgba(212,201,176,.2);}
.land-num{font-family:var(--f-display);font-weight:700;font-size:34px;color:var(--gold);line-height:1;min-width:150px;}
.land-num span{font-family:var(--f-body);font-style:italic;font-size:15px;color:var(--sage);font-weight:400;margin-left:6px;}
.land-text{color:var(--cream);font-size:16px;}

/* TWO COL */
.two-col{display:grid;grid-template-columns:1.1fr .9fr;gap:48px;align-items:center;}
.two-col.align-start{align-items:start;}
.side-photo{width:100%;min-height:360px;border-radius:3px;background-size:cover;background-position:center;box-shadow:0 10px 30px rgba(31,61,46,.18);}
.equation{display:inline-block;background:var(--forest);color:var(--gold);font-family:var(--f-display);font-size:19px;padding:14px 22px;margin:4px 0 22px;border-radius:2px;}

/* PILLARS */
.pillars{display:grid;grid-template-columns:repeat(3,1fr);gap:40px;margin-top:48px;text-align:center;}
.pillar-title{font-family:var(--f-display);font-size:30px;font-weight:600;color:var(--gold);margin:0;}
.pillar-div{display:block;width:40px;height:1px;background:rgba(199,154,58,.6);margin:10px auto 14px;}
.pillar-text{color:var(--mist);font-size:15px;line-height:1.7;margin:0;}

/* TIMELINE */
.timeline{list-style:none;margin:34px 0 0;padding:0;position:relative;max-width:820px;}
.timeline:before{content:"";position:absolute;left:112px;top:6px;bottom:6px;width:1px;background:var(--mist);}
.t-row{display:grid;grid-template-columns:96px 14px 1fr;gap:0 24px;align-items:start;margin-bottom:22px;}
.t-time{font-family:var(--f-label);font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--amber);text-align:right;padding-top:3px;}
.t-dot{width:12px;height:12px;border-radius:50%;background:var(--gold);margin-top:4px;position:relative;z-index:1;}
.t-dot.dark{background:var(--forest);}
.t-content h4{font-family:var(--f-body);font-weight:600;font-size:17px;color:var(--forest);margin:0 0 3px;}
.t-content p{margin:0;font-size:15px;color:var(--bark);line-height:1.55;}

/* ACTIVITIES */
.act-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px;margin-top:34px;}
.act-card{background:#fff;border-top:3px solid var(--forest);padding:26px 28px;border-radius:2px;box-shadow:0 3px 14px rgba(31,61,46,.07);}
.act-card:nth-child(2){border-top-color:var(--amber);}
.act-card:nth-child(3){border-top-color:var(--gold);}
.act-card:nth-child(4){border-top-color:#B5562E;}
.act-card h3{font-family:var(--f-display);font-size:22px;font-weight:600;color:var(--forest);margin:0 0 14px;}
.act-card ul{list-style:none;margin:0;padding:0;}
.act-card li{font-size:15px;padding:7px 0;border-bottom:1px solid var(--cream2);display:flex;gap:9px;}
.act-card li:last-child{border-bottom:none;}
.act-card li:before{content:"—";color:var(--gold);}

/* STAY */
.split{display:grid;grid-template-columns:1fr 1fr;padding:0;min-height:560px;}
.split-photo{background-size:cover;background-position:center;min-height:360px;}
.split-body{padding:72px 56px;display:flex;flex-direction:column;justify-content:center;background:var(--cream);}
.stay-cols{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:14px;}
.stay-h{font-family:var(--f-body);font-weight:600;font-size:16px;color:var(--forest);margin:0 0 12px;}
.stay-list{list-style:none;margin:0;padding:0;}
.stay-list li{font-size:14.5px;padding:5px 0;display:flex;gap:8px;}
.stay-list li:before{content:"—";color:var(--gold);}

/* PROGRAMS */
.prog-table{margin-top:30px;border-top:2px solid var(--forest);}
.prog-row{display:grid;grid-template-columns:1.3fr .7fr .8fr 2fr 1fr;gap:20px;align-items:center;
  padding:20px 0;border-bottom:1px solid var(--mist);}
.prog-name{font-family:var(--f-body);font-weight:600;font-size:17px;color:var(--forest);}
.prog-tag{display:block;font-family:var(--f-label);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--amber);margin-top:4px;}
.prog-dur{font-family:var(--f-label);font-size:13px;color:var(--amber);}
.prog-group{font-family:var(--f-label);font-size:12px;color:var(--sage);}
.prog-inc{font-size:14px;color:var(--bark);line-height:1.5;}
.prog-price{font-family:var(--f-display);font-weight:600;font-size:20px;color:var(--forest);text-align:right;}
.prog-price small{display:block;font-family:var(--f-label);font-size:10px;letter-spacing:.05em;text-transform:uppercase;color:var(--sage);font-weight:400;margin-top:4px;}
.note{margin-top:26px;padding:20px 24px;background:var(--cream2);border-left:3px solid var(--gold);font-size:14.5px;line-height:1.7;border-radius:2px;}

/* NEP */
.nep-list{margin-top:6px;}
.nep-item{display:flex;gap:20px;margin-bottom:18px;}
.nep-sec{font-family:var(--f-label);font-size:11px;letter-spacing:.08em;color:var(--gold);min-width:56px;padding-top:4px;}
.nep-item h4{font-family:var(--f-body);font-weight:600;font-size:16px;color:var(--cream);margin:0 0 3px;}
.nep-item p{margin:0;font-size:14.5px;color:var(--mist);line-height:1.55;}
.doc-box{margin-top:30px;background:rgba(0,0,0,.18);border:1px solid rgba(212,201,176,.18);padding:24px 26px;border-radius:2px;}
.doc-box h4{font-family:var(--f-body);font-weight:600;color:var(--gold);margin:0 0 14px;font-size:16px;}
.doc-box ol{margin:0;padding-left:20px;}
.doc-box li{color:var(--mist);font-size:14.5px;margin-bottom:8px;}

/* GALLERY */
.gallery{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:150px;gap:14px;margin-top:34px;}
.gal-item{background-size:cover;background-position:center;border-radius:2px;box-shadow:0 3px 12px rgba(31,61,46,.12);margin:0;}
.gal-item.feature{grid-column:span 2;grid-row:span 2;}

/* CONTACT */
.contact{background:var(--forest);color:var(--cream);padding-bottom:0;}
.contact-h{color:var(--cream);}
.contact-sub{font-family:var(--f-body);font-style:italic;font-size:18px;color:var(--amber);margin:12px 0 44px;}
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;text-align:left;max-width:820px;margin:0 auto;}
.contact-steps h4,.contact-reach h4{font-family:var(--f-label);font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin:0 0 18px;}
.contact-steps ol{margin:0;padding-left:20px;}
.contact-steps li{color:var(--mist);margin-bottom:12px;line-height:1.6;}
.contact-reach dl{margin:0;}
.contact-reach dt{font-family:var(--f-label);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--sage);margin-top:16px;}
.contact-reach dd{margin:4px 0 0;font-size:16px;color:var(--cream);display:flex;flex-direction:column;gap:2px;}
.contact-reach dd a:hover{color:var(--gold);}
.footer{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;
  margin-top:64px;padding:26px 24px;border-top:1px solid rgba(212,201,176,.2);max-width:1100px;margin-left:auto;margin-right:auto;}
.footer span{font-family:var(--f-label);font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--sage);}
.footer-tag{font-family:var(--f-display)!important;font-style:italic;font-size:14px!important;letter-spacing:0!important;text-transform:none!important;color:var(--gold)!important;}

/* RESPONSIVE */
@media(max-width:860px){
  .nav-links a:not(.nav-cta){display:none;}
  .two-col{grid-template-columns:1fr;}
  .pillars{grid-template-columns:1fr;gap:28px;}
  .act-grid{grid-template-columns:1fr;}
  .split{grid-template-columns:1fr;}
  .split-body{padding:48px 24px;}
  .stay-cols{grid-template-columns:1fr;}
  .prog-row{grid-template-columns:1fr;gap:6px;padding:18px 0;}
  .prog-price{text-align:left;}
  .prog-inc{order:4;}
  .gallery{grid-template-columns:repeat(2,1fr);grid-auto-rows:130px;}
  .contact-grid{grid-template-columns:1fr;gap:34px;}
  .timeline:before{left:96px;}
  .t-row{grid-template-columns:80px 14px 1fr;gap:0 16px;}
}
`;
