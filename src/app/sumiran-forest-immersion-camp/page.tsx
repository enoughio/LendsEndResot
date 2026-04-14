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

const adventureHighlights = [
  "Zipline (Day 1)",
  "Shooting activities (Day 2)",
  "Archery (Day 2)",
  "Mud baths (Day 2)",
  "Rural games and traditional sports (Day 3)",
  "Strategy games, team-building exercises, creative challenges",
  "Music, dance, open jamming, stargazing and storytelling",
];

const learningHighlights = [
  "Public speaking and storytelling (evenings)",
  "Debates, podcasts, and live sessions",
  "Logical thinking and problem-solving",
  "Organic farming, forest development, and water conservation",
  "Gaushala and biogas production",
  "Yoga, meditation, and mindful living",
];

const outcomes = [
  "More confident, aware, and expressive",
  "Stronger character, discipline, and responsibility",
  "Better communication and self-expression",
  "Improved decision-making and independence",
  "Teamwork, leadership, and community living",
  "A deeper connection with nature and sustainability",
];

export default function SumiranForestImmersionCampPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-100 via-amber-50 to-sky-100">
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
                Sumiran Forest Immersion Camp
              </h1>
              <p className="mt-4 text-sm md:text-lg text-gray-700 max-w-2xl">
                Adventure. Fun. Learning. Character. A three-day, three-night residential camp in a living forest
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
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white/90 px-4 py-3 text-xs md:text-sm shadow-lg border border-emerald-100">
                Land&apos;s End - The Last Resort, Sumiran Forest
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="grid lg:grid-cols-3 gap-6 ">
          <div className="rounded-2xl border border-emerald-100 bg-linear-to-br from-emerald-50/80 via-white to-sky-50/70 p-6 shadow-sm">
            <h2 className="text-xl md:text-2xl text-gray-900">About Sumiran</h2>
            <p className="mt-3 text-sm md:text-base text-gray-700">
              Sumiran is a 300-acre man-made, living forest created with intention, care, and deep respect for
              nature. It is a learning ecosystem where children experience nature up close, sustainable living,
              and a slower, mindful way of life.
            </p>
          </div>
          <div className="rounded-2xl border border-amber-100 bg-linear-to-br from-amber-50/80 via-white to-emerald-50/60 p-6 shadow-sm">
            <h2 className="text-xl md:text-2xl text-gray-900">Why This Camp</h2>
            <p className="mt-3 text-sm md:text-base text-gray-700">
              In a fast-paced, screen-driven world, children often miss real-life experiences, confidence in
              expression, connection with nature, and opportunities to build strong character. This camp builds
              awareness, creativity, independence, and responsibility.
            </p>
          </div>
          <div className="rounded-2xl border border-sky-100 bg-linear-to-br from-sky-50/80 via-white to-emerald-50/60 p-6 shadow-sm">
            <h2 className="text-xl md:text-2xl text-gray-900">Stay & Living</h2>
            <p className="mt-3 text-sm md:text-base text-gray-700">
              Participants stay in air-conditioned shared dormitories with a safe, supervised environment. Community
              living helps children learn responsibility, independence, and collaboration.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10 md:pb-14 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-linear-to-br from-emerald-50/70 via-white to-amber-50/60 p-6 shadow-sm">
          <h2 className="text-xl md:text-2xl text-gray-900">Adventure, Fun, and Play</h2>
          <ul className="mt-4 space-y-2 text-sm md:text-base text-gray-700">
            {adventureHighlights.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-linear-to-br from-amber-50/70 via-white to-sky-50/60 p-6 shadow-sm">
          <h2 className="text-xl md:text-2xl text-gray-900">Learning Experience</h2>
          <ul className="mt-4 space-y-2 text-sm md:text-base text-gray-700">
            {learningHighlights.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-amber-500"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10 md:pb-14">
        <div className="rounded-2xl border border-emerald-100 bg-linear-to-br from-emerald-50/70 via-white to-sky-50/70 p-6 shadow-sm">
          <h2 className="text-xl md:text-2xl text-gray-900">Nature Immersion & Hands-On Creation</h2>
          <p className="mt-3 text-sm md:text-base text-gray-700">
            Guided forest walks, bird watching, ecosystem exploration, and stargazing help participants build a
            respectful connection with nature. Each child creates a personal herbarium by collecting plant samples,
            learning about them, and preserving a meaningful forest memory.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10 md:pb-14">
        <div className="rounded-2xl border border-gray-200 bg-linear-to-br from-emerald-50/70 via-white to-amber-50/60 p-6 shadow-sm">
          <h2 className="text-xl md:text-2xl text-gray-900">Daily Routine Snapshot</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm md:text-base text-gray-700">
            <div className="rounded-xl bg-emerald-50/70 px-4 py-3">Morning yoga, meditation, and nature walk</div>
            <div className="rounded-xl bg-amber-50/70 px-4 py-3">Hands-on learning and farm activities</div>
            <div className="rounded-xl bg-sky-50/70 px-4 py-3">Expert sessions and workshops</div>
            <div className="rounded-xl bg-emerald-50/70 px-4 py-3">Adventure sports and games</div>
            <div className="rounded-xl bg-amber-50/70 px-4 py-3">Evening storytelling, music, and reflection</div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10 md:pb-14">
        <div className="rounded-2xl border border-emerald-100 bg-linear-to-br from-emerald-50/70 via-white to-sky-50/60 p-6 shadow-sm">
          <h2 className="text-xl md:text-2xl text-gray-900">Outcomes for Each Participant</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm md:text-base text-gray-700">
            {outcomes.map((item) => (
              <div key={item} className="rounded-xl bg-emerald-50/70 px-4 py-3">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="dates" className="max-w-7xl mx-auto px-4 md:px-6 pb-10 md:pb-14">
        <div className="rounded-2xl border border-gray-200 bg-linear-to-br from-amber-50/70 via-white to-emerald-50/60 p-6 shadow-sm">
          <h2 className="text-xl md:text-2xl text-gray-900">Camp Dates (3 Days, 3 Nights)</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm md:text-base text-gray-700">
            {campDates.map((date) => (
              <div key={date} className="rounded-xl bg-amber-50/70 px-4 py-3">
                {date}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="registration" className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
        <div className="rounded-2xl border border-emerald-100 bg-linear-to-br from-emerald-50/70 via-white to-sky-50/60 p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl md:text-2xl text-gray-900">Programme Fee</h2>
              <p className="mt-2 text-sm md:text-base text-gray-700">
                INR 9,900 per participant. Includes stay, food, sessions, activities, and experiences. Travel to and
                from Sumiran is not included.
              </p>
              <p className="mt-3 text-sm md:text-base text-gray-700">
                Parents or guardians drop participants on Day 1 and pick up on Day 4. Limited seats per batch.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 px-5 py-4 text-sm md:text-base text-emerald-900">
              <div className="font-semibold">Registrations Open</div>
              <div className="mt-1 text-emerald-900/80">Contact: Land&apos;s End Resort Team</div>
              <div className="text-emerald-900/80">Phone/WhatsApp: +91 6268244196</div>
              <div className="text-emerald-900/80">Email: landsend.sumiran@gmail.com</div>
              <div className="mt-2 text-emerald-900/80">Registration link:</div>
              <Link
                href="https://rzp.io/rzp/fnnrvFkZ"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 transition"
              >
                Register now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Fotter />
    </div>
  );
}
