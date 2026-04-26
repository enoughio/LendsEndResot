import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Fotter from "@/components/Fotter";

export const metadata: Metadata = {
  title: "Sumiran Forest Immersion Camp | Land's End Resort",
  description:
    "Residential summer camp (ages 10-16) in Sumiran Forest with adventure, learning, and nature immersion at Land's End Resort near Bhopal.",
  openGraph: {
    title: "Sumiran Forest Immersion Camp",
    description:
      "Adventure, fun, and learning for ages 10-16 in a living forest ecosystem near Bhopal.",
    images: ["/gallery/kids.jpeg"],
  },
};

const campDates = [
  "4-7 May 2026",
  "7-10 May 2026",
  "11-14 May 2026",
  "14-17 May 2026",
  "25-28 May 2026",
  "28-31 May 2026",
  "1-4 June 2026",
  "4-7 June 2026",
];

const whyThisCampGaps = [
  "Real-life exposure and hands-on learning",
  "Confidence in communication",
  "Opportunities for independent thinking",
  "Connection with nature and sustainable practices",
];

const whyThisCampResponse = [
  "Hands-on forest activities, creation labs, and real-world sustainability tasks.",
  "Guided storytelling, public speaking, and expression circles every day.",
  "Problem-solving challenges, teamwork missions, and reflection sessions.",
  "Daily nature immersion, biodiversity learning, and mindful living practices.",
];

const coreLearningFocus = [
  {
    title: "Storytelling and Public Speaking",
    description:
      "Children build confidence in expression through storytelling, speaking exercises, discussions, and performance.",
  },
  {
    title: "Build a Strong Body and Mind",
    description:
      "Simple daily practices to improve focus, energy, emotional balance, and wellbeing based on Life Without Medicine principles.",
  },
  {
    title: "Embracing Excellence",
    description:
      "Sessions on discipline, mindset, responsibility, and personal growth that shape a strong life approach.",
  },
  {
    title: "Sustainability and Real-World Learning",
    description:
      "Organic farming, water conservation, waste management, forest development, and mindful living through direct experience.",
  },
];

const sustainabilityExperience = [
  "Visit the Sumiran Gaushala to understand how a biogas plant works",
  "Learn how waste is converted into usable energy",
  "Experience sustainability through real systems in action",
];

const adventureHighlights = [
  "Zipline",
  "Archery and shooting activities",
  "Mud baths",
  "Rural games and traditional sports",
  "Scavenger hunt and team challenges",
  "Music, dance, and jamming sessions",
  "Stargazing and astronomical storytelling",
];

const adventureBuilds = [
  "Confidence and courage",
  "Teamwork and collaboration",
  "Physical coordination and resilience",
  "Social bonding",
];

const natureImmersion = [
  "Guided forest walks",
  "Bird watching and observation",
  "Understanding ecosystems and biodiversity",
  "Learning coexistence with nature",
];

const handsOnCreation = [
  "Collect plant samples",
  "Learn their ecological importance",
  "Create a personal herbarium to take home",
];

const stayAndLiving = [
  "Air-conditioned shared dormitories",
  "Safe and supervised environment",
  "Structured yet comfortable residential setup",
  "Community living that builds responsibility, independence, and cooperation",
];

const dailyGlimpse = [
  "Morning wellness and nature activities",
  "Hands-on learning sessions",
  "Adventure and outdoor experiences",
  "Evening storytelling, expression, and reflection",
  "Night-time stargazing and group bonding",
];

const outcomes = [
  "Become more confident and expressive",
  "Improve communication and public speaking skills",
  "Develop stronger character, discipline, and values",
  "Build leadership and teamwork abilities",
  "Enhance thinking and decision-making skills",
  "Become more independent and self-aware",
  "Develop respect for nature and sustainability",
];

const facilitators = [
  {
    name: "Mr Rajesh Gupta, (IPS)",
    role: "Chief Mentor and Programme Head",
    details: "ADG (Retd.), MP Police | Creator of Sumiran Forest",
    image: "/events/rajeshGupta.png",
  },
  {
    name: "Dr Monika Gupta",
    role: "Chief Wellness Mentor",
    details: "MBBS | Professor | Certified Yoga Trainer | Holistic Health Practitioner",
    image: "/events/monikaGupta.png",
  },
  {
    name: "Cmde Manoj Bhuraria (Retd.)",
    role: "Life Coach, Counsellor and Mentor",
    details: "Guides confidence building, reflection, and character development",
    image: "/events/cmdeManojbhuraria.png",
  },
  {
    name: "Mrs Jyoti Pande",
    role: "Storyteller and Psychologist",
    details: "Leads expression, storytelling, and emotional learning",
    image: "/events/jyotiPandey.png",
  },
  {
    name: "Mr Aviral Pawaar",
    role: "Camp Director and Programme Coordinator",
    details: "Leads execution, safety, and participant experience",
    image: "/events/aviralPawar.png",
  },
];

export default function SumiranForestImmersionCampPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-100 via-amber-50 to-sky-100 ">
      <section className="relative overflow-hidden pt-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.25),transparent_60%)]" />
        <div className="absolute -top-24 left-6 h-48 w-48 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-sky-200/40 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 pt-10 md:pt-16 pb-10">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-center">
            <div>
                       <div className="md:inline-flex hidden   items-center gap-2 rounded-full bg-white/70 px-4 py-1 text-xs md:text-sm text-emerald-800 border border-emerald-100">
                Residential Summer Camp | Ages 10-16
              </div>
       
              <h1 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-semibold text-gray-900">
                {/* Sumiran Forest Immersion Camp */}
                Sumiran Forest Residential Summer Camp
              </h1>
              <p className="mt-4 text-sm md:text-lg text-gray-700 max-w-2xl">
                Adventure. Fun. Learning. Character. 
                <br />
                <br />
                A three-day, three-night residential camp in a living forest
                ecosystem near Bhopal where nature becomes the teacher.
              </p>
              

              <div className="mt-6 flex flex-wrap gap-3 text-xs md:text-sm">
                <span className="rounded-full bg-emerald-100/80 text-emerald-800 px-3 py-1">3 days, 3 nights</span>
                <span className="rounded-full bg-amber-100/80 text-amber-900 px-3 py-1">Limited seats per batch</span>
                <div className=" md:hidden inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1 text-xs md:text-sm text-emerald-800 border border-emerald-100">
                Residential Summer Camp | Ages 10-16
              </div>
                <span className="rounded-full bg-sky-100/80 text-sky-900 px-3 py-1">Safe and supervised</span>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href="#registration"
                  className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 text-white text-sm md:text-base hover:bg-emerald-700 transition-colors"
                >
                  Registration Info
                </Link>
                <Link
                  href="#dates"
                  className="inline-flex items-center justify-center rounded-lg border border-emerald-200 px-5 py-3 text-emerald-700 text-sm md:text-base hover:bg-emerald-50 transition-colors"
                >
                  View Camp Dates
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-linear-to-br from-emerald-200/70 via-transparent to-amber-100/70 blur-xl" />
              <div className="relative rounded-3xl overflow-hidden border border-white/70 shadow-xl">
                <Image
                  src="/gallery/kids.jpeg"
                  alt="Forest walk in Sumiran"
                  width={600}
                  height={480}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white/90 px-4 py-3 text-xs md:text-sm shadow-lg border border-emerald-100 font-bold">
                Land&apos;s End - The Last Resort, Sumiran Forest
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-12">
        <div className="absolute left-8 top-10 h-16 w-16 rounded-full border border-emerald-200/70 bg-white/60 backdrop-blur-sm" />
        <div className="absolute right-8 bottom-14 h-12 w-12 rounded-full border border-amber-200/70 bg-amber-100/60" />

        <div className="relative grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-emerald-100 bg-white/80 p-6 md:p-8 shadow-sm backdrop-blur-sm">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-emerald-700">About Sumiran</p>
            <h2 className="mt-3 text-2xl md:text-3xl text-gray-900">A living forest designed for deeper learning</h2>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-gray-700">
              Sumiran is a 300-acre man-made, living, breathing forest, thoughtfully developed as a space for
              learning, reflection, and sustainable living. It is not just a destination, but an ecosystem where
              children can experience life beyond screens and classrooms, and reconnect with nature in a meaningful
              way.
            </p>
          </article>

          <article className="rounded-3xl border border-amber-100 bg-linear-to-br from-amber-50/90 via-white to-emerald-50/70 p-6 md:p-8 shadow-sm">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-amber-700">About The Camp</p>
            <h2 className="mt-3 text-2xl md:text-3xl text-gray-900">Immersive growth in 3 days and 3 nights</h2>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-gray-700">
              The Sumiran Forest Residential Summer Camp is a carefully designed immersive experience that helps
              children grow into more confident, aware, and self-reliant individuals. Through adventure, experiential
              learning, and guided reflection, participants build life skills while enjoying nature.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 text-xs md:text-sm">
              <div className="rounded-xl bg-white/80 px-3 py-2 text-emerald-800 border border-emerald-100">Ages 10-16</div>
              <div className="rounded-xl bg-white/80 px-3 py-2 text-emerald-800 border border-emerald-100">3 Days, 3 Nights</div>
            </div>
          </article>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10 md:pb-12">
        <div className="rounded-3xl border border-emerald-200/60 bg-linear-to-br from-emerald-900 via-emerald-800 to-slate-900 p-6 md:p-8 shadow-xl">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <article className="rounded-2xl border border-white/15 bg-white/10 p-5 md:p-6 backdrop-blur-sm">
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-emerald-200">Why This Camp</p>
              <h2 className="mt-3 text-2xl md:text-3xl text-white">From screen fatigue to real growth</h2>
              <p className="mt-3 text-sm md:text-base text-emerald-50/95">
                In today&apos;s fast-paced, screen-driven world, children often miss vital developmental experiences. This
                camp closes those gaps through practical learning, adventure, and guided reflection in nature.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 text-xs md:text-sm">
                <div className="rounded-xl border border-emerald-200/30 bg-emerald-300/10 px-3 py-2 text-emerald-100">
                  300-acre living forest
                </div>
                <div className="rounded-xl border border-emerald-200/30 bg-emerald-300/10 px-3 py-2 text-emerald-100">
                  3 days, 3 nights immersion
                </div>
                <div className="rounded-xl border border-emerald-200/30 bg-emerald-300/10 px-3 py-2 text-emerald-100">
                  Guided by expert mentors
                </div>
               
              </div>
            </article>

            <div className="grid gap-3 sm:grid-cols-2">
              {whyThisCampGaps.map((gap, index) => (
                <article key={gap} className="rounded-2xl border border-white/15 bg-white/10 p-4 md:p-5">
                  <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-amber-200">
                    Gap {index + 1}
                  </p>
                  <p className="mt-2 text-sm md:text-base text-white">{gap}</p>
                  <div className="my-3 h-px bg-white/20" />
                  <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-emerald-200">
                    Camp Response
                  </p>
                  <p className="mt-2 text-sm text-emerald-50/95">{whyThisCampResponse[index]}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10 md:pb-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-emerald-700">Core Learning Focus</p>
            <h2 className="mt-2 text-2xl md:text-3xl text-gray-900">Character, confidence, wellbeing, and sustainability</h2>
          </div>
          <div className="hidden md:block rounded-full border border-emerald-100 bg-white/70 px-4 py-2 text-xs text-emerald-700">
            Adventure. Fun. Learning. Character.
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {coreLearningFocus.map((focus) => (
            <article key={focus.title} className="rounded-2xl border border-emerald-100 bg-white/75 p-5 shadow-sm">
              <h3 className="text-lg md:text-xl text-gray-900">{focus.title}</h3>
              <p className="mt-2 text-sm md:text-base text-gray-700">{focus.description}</p>
            </article>
          ))}
        </div>

        <article className="mt-5 rounded-2xl border border-amber-100 bg-linear-to-r from-amber-50/90 via-white to-emerald-50/70 p-5 md:p-6">
          <h3 className="text-lg md:text-xl text-gray-900">Special Experience: Turning Waste into Energy</h3>
          <ul className="mt-3 grid gap-2 md:grid-cols-3 text-sm md:text-base text-gray-700">
            {sustainabilityExperience.map((item) => (
              <li key={item} className="rounded-xl bg-white/80 px-4 py-3 border border-amber-100">{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10 md:pb-12">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-emerald-100 bg-linear-to-br from-emerald-50/80 via-white to-emerald-100/40 p-6 shadow-sm">
            <h2 className="text-2xl md:text-3xl text-gray-900">Adventure, Fun and Experiences</h2>
            <ul className="mt-4 grid gap-2 text-sm md:text-base text-gray-700">
              {adventureHighlights.map((item) => (
                <li key={item} className="rounded-xl bg-white/75 px-4 py-3 border border-emerald-100">{item}</li>
              ))}
            </ul>
            <p className="mt-5 text-xs font-semibold tracking-[0.14em] uppercase text-emerald-700">These activities help build</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {adventureBuilds.map((item) => (
                <span key={item} className="rounded-full bg-emerald-100/80 px-3 py-1 text-xs md:text-sm text-emerald-800">
                  {item}
                </span>
              ))}
            </div>
          </article>

          <div className="grid gap-6">
            <article className="rounded-3xl border border-sky-100 bg-linear-to-br from-sky-50/80 via-white to-emerald-50/60 p-6 shadow-sm">
              <h3 className="text-xl md:text-2xl text-gray-900">Nature Immersion</h3>
              <ul className="mt-4 space-y-2 text-sm md:text-base text-gray-700">
                {natureImmersion.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-sky-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-3xl border border-amber-100 bg-linear-to-br from-amber-50/80 via-white to-orange-50/60 p-6 shadow-sm">
              <h3 className="text-xl md:text-2xl text-gray-900">Hands-On Creation</h3>
              <p className="mt-3 text-sm md:text-base text-gray-700">Personal Herbarium</p>
              <ul className="mt-3 space-y-2 text-sm md:text-base text-gray-700">
                {handsOnCreation.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-amber-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10 md:pb-12">
        <div className="rounded-3xl border border-gray-200 bg-white/80 p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl text-gray-900">Stay and Living Experience</h2>
          <p className="mt-3 text-sm md:text-base text-gray-700">At Land&apos;s End - The Last Resort, Sumiran Forest</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {stayAndLiving.map((item) => (
              <div key={item} className="rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 text-sm md:text-base text-gray-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10 md:pb-12">
        <div className="rounded-3xl border border-gray-200 bg-linear-to-br from-emerald-50/70 via-white to-sky-50/60 p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl text-gray-900">A Glimpse of the Experience</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
            {dailyGlimpse.map((item, index) => (
              <article key={item} className="rounded-xl border border-white bg-white/90 px-4 py-4">
                <p className="text-xs font-semibold text-emerald-700">Activity {index + 1}</p>
                <p className="mt-2 text-sm md:text-base text-gray-700">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10 md:pb-12">
        <div className="rounded-3xl border border-emerald-100 bg-white/75 p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl text-gray-900">Outcomes for Participants</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {outcomes.map((item) => (
              <div key={item} className="rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 text-sm md:text-base text-gray-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="dates" className="max-w-7xl mx-auto px-4 md:px-6 pb-10 md:pb-12">
        <div className="grid gap-6">
          <article className="rounded-3xl border border-amber-100 bg-linear-to-br from-amber-50/90 via-white to-emerald-50/60 p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl md:text-3xl text-gray-900">Camp Dates</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm md:text-base text-gray-700">
              {campDates.map((date) => (
                <div key={date} className="rounded-xl border border-amber-100 bg-white/80 px-4 py-3">
                  {date}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10 md:pb-12">
        <div className="rounded-3xl border border-gray-200 bg-white/80 p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl text-gray-900">Leadership and Facilitators</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {facilitators.map((person) => (
              <article key={person.name} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80">
                <div className="relative aspect-4/3 w-full bg-slate-100">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                  />
                </div>
                <div className="p-4">
                <h3 className="text-base md:text-lg text-gray-900">{person.name}</h3>
                <p className="mt-1 text-sm font-medium text-emerald-700">{person.role}</p>
                <p className="mt-2 text-sm text-gray-600">{person.details}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="registration" className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-emerald-100 bg-linear-to-b from-emerald-700 to-emerald-800 p-6 md:p-8 text-white shadow-lg">
                        <div className="mb-6 rounded-xl bg-white/10 px-4 py-3 text-sm text-emerald-50">
              Inaugural offering: Designed at a value of INR 30,000+ and offered at a special fee of INR 9,900.
            </div>
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-emerald-100">Programme Fee</p>
            <p className="mt-3 text-3xl md:text-4xl font-semibold">INR 9,900</p>
            <p className="mt-2 text-sm text-emerald-100">Per participant</p>
            <ul className="mt-5 space-y-2 text-sm text-emerald-50/95">
              <li>Stay (AC dormitories)</li>
              <li>All meals</li>
              <li>Activities and experiences</li>
              <li>Expert-led sessions</li>
              <li>Certificate on successful completion</li>
              <li>Travel to and from Sumiran is not included</li>
            </ul>

          </article>

          <article className="rounded-3xl border border-emerald-100 bg-linear-to-br from-emerald-50/85 via-white to-amber-50/60 p-6 md:p-8 shadow-sm">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-emerald-700">Registrations Open</p>
            <h2 className="mt-2 text-2xl md:text-3xl text-gray-900">Reserve your child&apos;s seat</h2>
            <p className="mt-4 text-sm md:text-base text-gray-700">
              For details and registration, visit the official camp page. Seats are limited and each batch is capped.
            </p>
            <div className="mt-5 space-y-1 text-sm md:text-base text-gray-700">
              <p>Organised by: Land&apos;s End - The Last Resort</p>
              <p>In association with: Young Leaders&apos; Club</p>
              <p>Contact: Land&apos;s End Resort Team</p>
              <p>Phone/WhatsApp: +91 8871317382, 6268244196</p>
              <p>Email: landsend.sumiran@gmail.com</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="https://rzp.io/rzp/fnnrvFkZ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800 transition-colors"
              >
                Register Now
              </Link>
              <Link
                href="tel:+916268244196"
                className="inline-flex items-center justify-center rounded-lg border border-emerald-200 px-5 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors"
              >
                Call for Assistance
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-14">
        <article className="rounded-3xl border border-emerald-100 bg-linear-to-r from-emerald-600 via-emerald-700 to-teal-700 p-6 md:p-8 text-white shadow-lg">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-emerald-100">Final Note</p>
          <p className="mt-3 text-xl md:text-2xl leading-relaxed">
            This is not just a summer camp. It is a carefully designed experience to help children grow into
            confident, aware, and responsible individuals while enjoying the beauty of nature.
          </p>
        </article>
      </section>

      <Fotter />
    </div>
  );
}
