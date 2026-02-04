import React from "react";
import { Metadata } from 'next';
import Image from "next/image";
import Fotter from "@/components/Fotter";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore stunning photos of Land's End Resort at Sumiran Forest - pristine nature, wildlife, activities, accommodations, and the beautiful landscape of our 600-acre eco resort near Bhopal.",
  openGraph: {
    title: "Gallery | Land's End Resort - Sumiran Forest",
    description: "Browse through stunning images of our pristine forest, wildlife, activities, and eco-friendly accommodations.",
    images: ['/gallery/riverrafting.jpeg'],
  },
};

// Gallery images from public/gallery folder
const COLLAGE_IMAGES: string[] = [
  "/gallery/riverrafting.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.01 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.03 PM (1).jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.03 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.04 PM (1).jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.05 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.06 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.11 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.12 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.13 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.14 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.15 PM (1).jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.15 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.17 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.20 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.21 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.23 PM (1).jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.23 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.26 PM (1).jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.27 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.28 PM (1).jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.28 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.29 PM (1).jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.29 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.30 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.32 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.33 PM (1).jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.33 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.37 PM (1).jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.37 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.38 PM (1).jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.38 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.39 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.40 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.41 PM (1).jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.41 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.42 PM (1).jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.42 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.44 PM (1).jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.44 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.45 PM (1).jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.46 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.48 PM (1).jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.48 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.49 PM (1).jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.49 PM (2).jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.49 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.50 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.51 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.52 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.53 PM (1).jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.53 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.54 PM (1).jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.54 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.55 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.56 PM (1).jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.56 PM (2).jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.56 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.57 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.58 PM (1).jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.58 PM (2).jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.58 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.32.59 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.33.01 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.33.02 PM (1).jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.33.02 PM (2).jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.33.02 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.33.06 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.33.08 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.33.11 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.33.12 PM (1).jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.33.12 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.33.14 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.33.15 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.33.16 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.33.18 PM (1).jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.33.18 PM.jpeg",
  "/gallery/WhatsApp Image 2026-02-04 at 8.33.19 PM.jpeg",
];

// Collage layout using CSS columns for a simple masonry effect.
// Tailwind classes rely on global config already in project.
const CollagePage = () => {
  return (
    <section className="px-[3vw] py-8 md:py-12">
      <header className="mb-8">
        <h1 className="text-5xl md:text-6xl leading-tight">Gallery Collage</h1>
        <div className="mt-3 w-14 h-2 bg-[#067C0B]" />
        <p className="mt-4 max-w-2xl text-sm md:text-base text-neutral-600">
          Explore a curated collage of moments from the Nature and Resort. 
        </p>
      </header>
      {/* Masonry / collage container */}
      <div
        className="[column-fill:balance] columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-3 md:gap-4"
      >
        {COLLAGE_IMAGES.map((src, i) => (
          <figure
            key={src + i}
            className="mb-3 md:mb-4 break-inside-avoid rounded-xl overflow-hidden relative group"
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
            <figcaption className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors flex items-end p-3 text-white text-xs opacity-0 group-hover:opacity-100">
              Scenic View {i + 1}
            </figcaption>
          </figure>
        ))}
      </div>

      <Fotter />
    </section>
  );
};

export default CollagePage;