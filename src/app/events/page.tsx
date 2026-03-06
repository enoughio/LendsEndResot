import { Metadata } from "next";
import Fotter from "@/components/Fotter";
import EventCard from "@/components/events/EventCard";
import Image from "next/image";
import type { Event } from "@/data/events";
import { events } from "@/data/events";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming events at Land's End Resort — workshops, festivals, retreats and more.",
};

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[220px] md:h-[360px] overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/about/aboutHero.png" alt="Events" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold">Events & Gatherings</h1>
            <p className="mt-2 text-gray-200 max-w-2xl">Join our workshops, retreats and seasonal festivals aligned with nature and conservation.</p>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16 md:pb-50">
        <div className="mb-8">
          <h2 className="text-gray-900 text-2xl md:text-3xl">Upcoming Events</h2>
          <div className="w-12 h-1 bg-green-600 mt-2"></div>
        </div>

        {/* Intro / description about events */}
        <section className="mb-8 ">
          <p className="text-md md:text-base max-w-7xl">
            At Land&apos;s End, our events bring together nature, learning and
            community. From sunrise birding walks and hands-on eco-workshops to
            seasonal festivals and retreats, each event is designed to help
            visitors connect more deeply with the forest, local traditions,
            and sustainable living practices. Expect small-group experiences,
            knowledgeable local guides and practical activities you can take
            home — whether it&apos;s birding, organic farming, low-impact building,
            or quiet retreats that slow down the mind.
          </p>
          <p className="mt-3 text-sm md:text-base  max-w-7xl">
            Events may be single-day or multi-day. Each listing shows dates,
            timing, location and ticketing information. If an event runs over
            multiple days, we note daily timings where applicable.
          </p>

          <div className="w-full h-[1px] bg-green-200 my-10" />
        </section>

        <div className="space-y-4 md:space-y-6">
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
              href={`/events/${e.slug}`}
            />
          ))}
        </div>
      </main>

      <Fotter />
    </div>
  );
}
