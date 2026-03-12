import Image from "next/image";
import Link from "next/link";
import React from "react";

const Activities = () => {
  const activities = [
    {
      title: "Lake Boating",
      description:
        "Glide across still waters with panoramic forest views and golden-hour reflections.",
      image: "/gallery/rafting.jpeg",
      className: "md:col-span-4 md:row-span-2",
      overlay: "bg-black/45",
    },
    {
      title: "Stargazing",
      description: "Clear skies, quiet nights, and stories under constellations.",
      image: "/gallery/stargazing.jpeg",
      className: "md:col-span-2",
      overlay: "bg-indigo-950/40",
    },
    {
      title: "Bird Watching",
      description: "Spot rare species with guides who know every call and trail.",
      image: "/gallery/bird.jpeg",
      className: "md:col-span-2",
      overlay: "bg-emerald-950/40",
    },
    {
      title: "Forest Walks",
      description:
        "Walk shaded paths and discover biodiversity at a gentle, mindful pace.",
      image: "/gallery/WhatsApp Image 2026-02-04 at 8.32.06 PM.jpeg",
      className: "md:col-span-2",
      overlay: "bg-emerald-900/45",
    },
    {
      title: "Yoga & Wellness",
      description:
        "Recenter with sunrise yoga, breathwork, and calm nature-led recovery time.",
      image: "/gallery/mediation.jpeg",
      className: "md:col-span-4",
      overlay: "bg-black/45",
    },
    {
      title: "Zipline & Climbing",
      description: "Add thrill to your stay with guided adventure challenges.",
      image: "/gallery/climbing.jpeg",
      className: "md:col-span-3",
      overlay: "bg-slate-900/40",
    },
    {
      title: "Nature Rhythm",
      description:
        "Wake up to birdsong, earthy meals, and the peaceful rhythm of the forest.",
      image: "/gallery/room1.jpeg",
      className: "md:col-span-3",
      overlay: "bg-black/45",
    },
  ];

  return (
    <section className="w-full relative px-[4vw] py-10 sm:pb-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex flex-col gap-4 sm:mb-8">
          <div className="relative h-12 w-full">
            <Image
              src="/home/home-activities-leves.svg"
              alt="Leaves decorative"
              width={220}
              height={90}
              className="rotate-180 w-[140px] md:w-[220px] select-none object-contain absolute -top-2 -right-10 md:top-2"
              priority
            />
          </div>
          <p className="inline-flex w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
            Signature Experiences
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl leading-tight text-neutral-900">
            Activities Crafted
            <span className="block font-light">For Every Mood</span>
          </h2>
          <p className="max-w-2xl text-sm sm:text-base text-gray-600 leading-relaxed">
            From peaceful exploration to high-energy adventure, every activity at Land&apos;s End is rooted in
            nature and guided by safety, storytelling, and local ecological wisdom.
          </p>
          <div className="h-1.5 w-20 bg-[#067C0B]" />
        </div>

        <div className="grid grid-cols-2 gap-3 md:hidden">
          {activities.map((item, idx) => (
            (() => {
              const isLargeCard = idx === 0 || item.title === "Forest Walks";
              return (
            <article
              key={`mobile-${item.title}`}
              className={`relative rounded-2xl overflow-hidden ${isLargeCard ? "col-span-2 min-h-56" : "min-h-40"}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, 50vw"
                className="object-cover"
                priority={isLargeCard || idx === 0}
              />
              <div className={`absolute inset-0 ${item.overlay}`} />
              <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
                <h3 className={`${isLargeCard ? "text-3xl" : "text-xl"} font-semibold mb-1`}>{item.title}</h3>
                {isLargeCard && <p className="text-sm opacity-95">{item.description}</p>}
              </div>
            </article>
              );
            })()
          ))}
        </div>

        <div className="hidden md:grid md:grid-cols-6 gap-4 md:gap-5">
          {activities.map((item, idx) => (
            <article
              key={item.title}
              className={`relative min-h-44 md:min-h-52 rounded-2xl overflow-hidden ${item.className}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
                priority={idx === 0}
              />
              <div className={`absolute inset-0 ${item.overlay}`} />
              <div className="absolute inset-0 p-5 sm:p-6 md:p-7 flex flex-col justify-end text-white">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2">{item.title}</h3>
                <p className="max-w-xl text-sm sm:text-base opacity-95">{item.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm sm:text-base text-gray-600">
            Personalized activity schedules are available for families, groups, and retreats.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
          >
            Plan Your Experience
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Activities;