"use client";
import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";

// >30 stock Unsplash image URLs (mixed orientations for collage)
const COLLAGE_IMAGES: string[] = [
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1505691723518-36a5ac3b2a59?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1455587734952-815ffc76f889?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1503424886309-31ee361a5589?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1524850011238-e3d235c7d4df?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1551918120-ac95dcf1b5f3?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1503264116251-35a26947989a?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1495954484750-af469f2f9be5?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1510674485131-dc2153d4a36c?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1501999635878-71cb9f0d48cc?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1551776235-dde6d4829808?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1519817650390-64a93db511aa?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1543333997-08f01dd3d6b9?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1470115636492-6d2b56f9146e?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1502786129293-79981df4e689?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=800&q=60",
];

// Collage layout using CSS columns for a simple masonry effect.
// Tailwind classes rely on global config already in project.
const CollagePage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const open = useCallback((i: number) => setActiveIndex(i), []);
  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(() => {
    setActiveIndex((idx) => (idx === null ? null : (idx - 1 + COLLAGE_IMAGES.length) % COLLAGE_IMAGES.length));
  }, []);
  const showNext = useCallback(() => {
    setActiveIndex((idx) => (idx === null ? null : (idx + 1) % COLLAGE_IMAGES.length));
  }, []);

  // Lock scroll when modal open
  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [activeIndex]);

  // Keyboard controls
  useEffect(() => {
    if (activeIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex, close, showPrev, showNext]);

  return (
    <section className="px-[3vw] py-8 md:py-12">
      <header className="mb-8">
        <h1 className="text-5xl md:text-6xl leading-tight">Gallery Collage</h1>
        <div className="mt-3 w-14 h-2 bg-[#067C0B]" />
        <p className="mt-4 max-w-2xl text-sm md:text-base text-neutral-600">
          Explore a curated collage of moments from the resort. Images are
          arranged dynamically for visual rhythm across devices.
        </p>
      </header>
      {/* Masonry / collage container */}
      <div
        className="[column-fill:_balance] columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-3 md:gap-4"
      >
        {COLLAGE_IMAGES.map((src, i) => (
          <button
            key={src + i}
            type="button"
            aria-label={`Open image ${i + 1}`}
            onClick={() => open(i)}
            className="cursor-zoom-in mb-3 md:mb-4 break-inside-avoid rounded-xl overflow-hidden relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#067C0B]"
          >
            <Image
              src={src}
              alt={`Resort collage ${i + 1}`}
              width={600}
              height={800}
              sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              loading={i < 8 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end p-3 text-white text-xs opacity-0 group-hover:opacity-100">
              Scenic View {i + 1}
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeIndex !== null && COLLAGE_IMAGES[activeIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm"
          onClick={close}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="relative max-w-5xl w-full aspect-[3/2] md:aspect-[16/9] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={COLLAGE_IMAGES[activeIndex].replace("w=800", "w=1600")}
              alt={`Large view ${activeIndex + 1}`}
              fill
              sizes="100vw"
              className="object-cover rounded-lg shadow-lg"
              priority
            />
            {/* Controls */}
            <button
              onClick={close}
              className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full w-9 h-9 flex items-center justify-center text-sm"
              aria-label="Close"
            >
              ✕
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 items-center justify-center text-lg"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 items-center justify-center text-lg"
              aria-label="Next image"
            >
              ›
            </button>
            <div className="absolute bottom-3 left-4 right-4 flex justify-between text-white text-xs md:text-sm">
              <span>{activeIndex + 1} / {COLLAGE_IMAGES.length}</span>
              <span>Tap / Esc to close</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CollagePage;