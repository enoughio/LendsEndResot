import Image from "next/image";
import Link from "next/link";

// Gallery images from public/gallery folder
const HERO = "/gallery/WhatsApp Image 2026-02-04 at 8.32.01 PM.jpeg";
const SMALL_1 = "/gallery/room1.jpeg";
const SMALL_3 = "/gallery/room3.jpeg";
const SMALL_2 = "/gallery/storytelling_sumiran2.jpeg";
// const SMALL_3 = "/gallery/con2.jpeg";
const SMALL_4 = "/gallery/room2.jpeg";

const Gallery = () => {
  return (
    <section className="px-[3vw] pb-8">
      {/* Heading */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-5xl md:text-6xl leading-tight">Gallery</h2>
        <div className="w-12 md:w-16 h-2 bg-[#067C0B]" />
      </div>

      {/* Top hero image */}
      <div className="relative w-full rounded-xl overflow-hidden mb-5">
        <div className="relative w-full aspect-[15/9] md:aspect-[21/7]">
          <Image
            src={HERO}
            alt="Sumiran Forest Resort"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Middle thumbnails: 2 images on mobile/tablet, 4 images on large screens */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-5">
        {[SMALL_4, SMALL_3].map((src, idx) => (
          <div
            key={idx}
            className="relative w-full aspect-[6/3] md:aspect-[6/4] rounded-xl overflow-hidden"
          >
            <Image
              src={src}
              alt={`Gallery thumbnail ${idx + 1}`}
              fill
              sizes="(min-width:1024px) 50vw, 50vw"
              className="object-cover"
            />
          </div>
        ))}
        {[SMALL_2, SMALL_1].map((src, idx) => (
          <div
            key={`extra-${idx}`}
            className="hidden lg:block relative w-full aspect-[6/2] md:aspect-[6/4] rounded-xl overflow-hidden"
          >
            <Image
              src={src}
              alt={`Gallery thumbnail extra ${idx + 3}`}
              fill
              sizes="25vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Bottom wide image */}
      {/* <div className="relative w-full h-[250px] rounded-xl overflow-hidden">
        <Image
          src={LARGE_LEFT}
          alt="Room with garden view"
          fill
          sizes="100vw"
          className="object-fill "
          
        />
      </div> */}

      {/* CTA */}
      <div className="mt-4  flex items-center gap-3">
        <Link href={'/gallery'} className="inline-flex items-center gap-3 rounded-full border border-black/25 px-4 py-2 text-sm md:text-base hover:bg-black/5 transition">
          View all images
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-black/25">
            <Image src="/icons/right.png" alt="Right arrow" width={14} height={14} />
          </span>
        </Link>
      </div>
    </section>
  );
};

export default Gallery;