import Image from "next/image";
import Link from "next/link";
import React from "react";

const Activities = () => {
  const activities = [
    {
      title: "Forest Retreats",
      description: "Forest retreats and nature immersion experiences.",
      image: "/gallery/rafting.jpeg",
      className: "md:col-span-4 md:row-span-2",
      overlay: "bg-black/45",
    },
    {
      title: "Storytelling Retreats",
      description: "Storytelling retreats and creative gatherings.",
      image: "/gallery/stargazing.jpeg",
      className: "md:col-span-2",
      overlay: "bg-indigo-950/40",
    },
    {
      title: "Wellness Retreats",
      description: "Wellness, mindfulness and meditation retreats.",
      image: "/gallery/bird.jpeg",
      className: "md:col-span-2",
      overlay: "bg-emerald-950/40",
    },
    {
      title: "Learning Circles",
      description: "Deep conversations, learning circles and healing spaces.",
      image: "/gallery/WhatsApp Image 2026-02-04 at 8.32.06 PM.jpeg",
      className: "md:col-span-2",
      overlay: "bg-emerald-900/45",
    },
    {
      title: "Forest Walks",
      description: "Forest walks, nature walks and forest immersion.",
      image: "/gallery/mediation.jpeg",
      className: "md:col-span-4",
      overlay: "bg-black/45",
    },
    {
      title: "Natural Mud Baths",
      description: "Natural mud baths and simple earth-based experiences.",
      image: "/gallery/flowers_sumiran.jpeg",
      className: "md:col-span-3",
      overlay: "bg-slate-900/40",
    },
    {
      title: "Artists & Thinkers",
      description: "Spaces for artists, writers and thinkers seeking inspiration.",
      image: "/gallery/stoneCircle.jpeg",
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
            At Land&apos;s End we host and facilitate forest retreats and nature immersion experiences, storytelling
            retreats and creative gatherings, wellness, mindfulness and meditation retreats, deep conversations,
            learning circles and healing spaces, forest walks, nature walks and forest immersion, natural mud baths
            and simple earth-based experiences, and spaces for artists, writers and thinkers seeking inspiration.
            It is a place to stay still, breathe deeply, and grow.
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