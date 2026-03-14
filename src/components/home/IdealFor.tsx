import React from "react";

const audiences = [
  {
    title: "Schools & Students",
    description:
      "An immersive learning space where students move beyond classrooms and experience nature, ecological wisdom, and sustainable living.",
  },
  {
    title: "Corporate Retreats & Trainings",
    description:
      "The quiet forest environment provides an ideal setting for reflection, leadership development, and meaningful learning experiences.",
  },
  {
    title: "Work from Forest",
    description:
      "A peaceful space for writers, artists, creators, and remote workers seeking silence, focus, and inspiration.",
  },
  {
    title: "Families & Groups",
    description:
      "For those wishing to escape the noise of the city, experience the forest, reconnect with nature, and rediscover simplicity.",
  },
];

const IdealFor = () => {
  return (
    <section className="relative px-[5vw] py-16 sm:py-24">

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-[1.05fr_1.3fr] md:items-start">
        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#4a6a40]">Ideal for</p>
            <h2 className="mt-3 text-4xl sm:text-5xl md:text-6xl leading-tight text-[#1f2f19]">
              Different journeys,
              <span className="block font-light">one forest experience</span>
            </h2>
            <div className="mt-5 h-0.5 w-32 bg-[#067C0B]" />
          </div>

          <div className="relative rounded-[28px] border border-[#dfead8] bg-white/70 p-6 shadow-[0_18px_45px_-30px_rgba(6,124,11,0.55)] backdrop-blur-sm">
            <span className="absolute -top-3 left-6 rounded-full bg-[#0b7a30] px-3 py-1 text-xs uppercase tracking-[0.2em] text-white">
              The heart of it
            </span>
            <p className="text-lg leading-7 text-[#2b3d24]">
              At Land&apos;s End, nature is not just the backdrop.
              <span className="block pt-2 text-xl font-light">
                It is the teacher, the healer, and the experience itself.
              </span>
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute left-6 top-2 h-[85%] w-px bg-linear-to-b from-[#b7cfaa] via-[#d7e7ce] to-transparent md:left-10" />
          <div className="flex flex-col gap-5">
            {audiences.map((audience) => (
              <article
                key={audience.title}
                className="relative rounded-[30px] border border-[#e0ead7] bg-white/80 p-6 pl-10 shadow-[0_16px_40px_-30px_rgba(6,124,11,0.5)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 md:odd:-translate-x-3 md:even:translate-x-6"
              >
                <span className="absolute left-5 top-7 h-3 w-3 rounded-full bg-[#0b7a30] shadow-[0_0_0_6px_rgba(11,122,48,0.12)]" />
                <h3 className="text-2xl font-medium text-[#1f2f19] underline decoration-[#0b7a30] decoration-2 underline-offset-4">
                  {audience.title}
                </h3>
                <p className="mt-3 text-[1rem] leading-7 text-[#3e5236]">{audience.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IdealFor;