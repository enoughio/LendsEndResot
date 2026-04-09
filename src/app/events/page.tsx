import { Metadata } from "next";
import Fotter from "@/components/Fotter";
import EventCard from "@/components/events/EventCard";
import Image from "next/image";
import type { Event } from "@/data/events";
import { events } from "@/data/events";

export const metadata: Metadata = {
  title: "Land's End | Events",
  description: "Upcoming events at Land's End Resort — workshops, festivals, retreats and more.",
};

export default function EventsPage() {
  const upcomingCount = events.length;
  const nextEvent = [...events]
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())[0];

  return (
    <div className="min-h-screen bg-[#f6f6f1]">
      {/* Hero */}
      <section className="relative h-[280px] md:h-[420px] overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/about/aboutHero.png" alt="Events" fill className="object-cover scale-[1.03]" />
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/45 to-black/35"></div>
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-amber-200/20 blur-3xl" />
          <div className="absolute -top-20 right-10 h-64 w-64 rounded-full bg-green-300/20 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center">
          <div className="text-white max-w-3xl">
            {/* <p className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs md:text-sm tracking-[0.2em] uppercase">
              Seasonal Calendar
            </p> */}
            <h1 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight">Retreats, Song Circles & Forest Gatherings</h1>
            <p className="mt-3 text-sm md:text-lg text-gray-200 max-w-2xl">
              Step into curated experiences rooted in nature, storytelling and conservation at Land&apos;s End.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs md:text-sm">
              <span className="rounded-full bg-white/15 border border-white/30 px-3 py-1.5">{upcomingCount} upcoming retreat{upcomingCount === 1 ? "" : "s"}</span>
              {nextEvent ? (
                <span className="rounded-full bg-white/15 border border-white/30 px-3 py-1.5">
                  Next: {new Date(nextEvent.startDate).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <main className="relative max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16 md:pb-50">
        <div className="absolute inset-x-0 top-8 -z-10 h-48 bg-linear-to-r from-green-100/60 via-amber-50/70 to-transparent blur-2xl" />

        <section className="rounded-3xl border border-green-200/80 bg-white/90 p-5 md:p-8 shadow-[0_20px_45px_-30px_rgba(0,0,0,0.35)] backdrop-blur-sm">
          <div className="mb-6">
            <h2 className="text-gray-900 text-2xl md:text-3xl font-semibold">Upcoming Events</h2>
            <div className="w-16 h-1 bg-linear-to-r from-green-600 to-amber-500 mt-2 rounded-full"></div>
          </div>

          {/* Intro / description about events */}
          <section className="mb-8">
            <p className="text-sm md:text-base max-w-7xl text-gray-700 leading-relaxed">
              At Land&apos;s End, our retreats bring together nature, learning and community. From sunrise birding walks and hands-on eco-workshops to seasonal festivals, each gathering is designed to help visitors connect deeply with the forest, local traditions and sustainable living.
            </p>
            <p className="mt-3 text-sm md:text-base max-w-7xl text-gray-600 leading-relaxed">
              Retreats may be single-day or multi-day. Every listing includes dates, timing, location and ticketing details so you can plan your stay with ease.
            </p>

            <div className="w-full h-px bg-linear-to-r from-green-200 via-amber-200 to-transparent my-8" />
          </section>

          <div className="space-y-5 md:space-y-7">
            {events.map((e: Event) => (
              <EventCard
                key={e.id}
                image={e.images?.[0] ?? "/about/aboutHero.png"}
                title={e.title}
                shortDescription={e.shortDescription}
                startDate={e.startDate}
                endDate={e.endDate}
                time={e.time}
                location={e.location}
                price={e.price}
                earlyPrice={e.earlyPrice}
                regularPrice={e.regularPrice}
                registrationLink={e.registrationLink}
                seats={e.seats}
                earlyBirdDeadline={e.earlyBirdDeadline}
                href={`/events/${e.slug}`}
              />
            ))}
          </div>
        </section>
      </main>

      <Fotter />
    </div>
  );
}
