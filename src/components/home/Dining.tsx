import React from "react";
import Image from "next/image";

// Stock image URLs (Unsplash) – allowed via next.config.ts remotePatterns
const LAKESIDE_BG =
  "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=1400&q=60"; // Night restaurant outdoor
const LAKESIDE_INLINE =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60"; // Dining table

const Dining = () => {
  return (
    <section className="px-[3vw] py-8 md:py-10 mx-auto">
      {/* Heading */}
      <div className="relative mb-8">
        <h2 className="text-5xl md:text-7xl leading-tight">
          Dining <span className="font-light">&amp; Cuisine</span>
        </h2>
        <div className="w-12 md:w-16 h-2 bg-[#067C0B]" />
        {/* Decorative leaf for mobile */}
        <div className="md:hidden absolute -right-4 md:right-0  top-8 md:top-0 translate-y-[-40%] w-[38vw] max-w-[220px]">
          <Image
            src="/home/dining-leaf.svg"
            alt="Decorative leaves"
            width={400}
            height={300}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden relative w-full rounded-xl overflow-hidden p-2 max-h-[680px]">
        <Image
          src={LAKESIDE_BG}
          alt="Lakeside restaurant"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Dark overlay with subtle gradient so lower text stays legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/55 to-black/70" />
        <div className="relative flex flex-col justify-start px-3 md:px-6 pt-12 pb-14 text-white">
          <h3 className="text-4xl font-semibold mb-6 leading-tight">Lakeside Restaurant</h3>
          <p className="text-sm leading-relaxed mb-4">
            Experience fine dining with panoramic lake views at our signature
            restaurant. Our chefs create culinary masterpieces using fresh,
            organic ingredients sourced locally from Madhya Pradesh.
          </p>
          <div className="space-y-2 text-base">
            <div>
              <p className="font-semibold mb-1">Local Delicacies</p>
              <p className="text-sm">
                Authentic Madhya Pradesh cuisine including Poha, Dal Bafla, and
                Bhutte ka Kees
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">Organic Ingredients</p>
              <p className="text-sm">
                Farm-to-table dining with organic produce from local farmers
              </p>
            </div>
            <div className="hidden  sm:inline-block md:hidden">
              <p className="font-semibold">Fine Dining</p>
              <p>
                International cuisine and curated wine selection for discerning
                palates
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="relative rounded-xl overflow-hidden shadow-[0_10px_35px_-5px_rgba(0,0,0,0.35)]">
          {/* Background image */}
            <Image
              src={LAKESIDE_BG}
              alt="Lakeside restaurant backdrop"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          <div className="absolute inset-0 bg-[#0A2816]/70" />
          <div className="relative grid grid-cols-12 gap-4 md:gap-8 px-10 py-14 xl:py-20">
            {/* Text Column */}
            <div className="col-span-12 lg:col-span-7 text-white flex flex-col justify-center max-w-[720px]">
              <h3 className="text-5xl font-semibold mb-8">Lakeside Restaurant</h3>
              <p className="text-sm xl:text-base leading-relaxed mb-10">
                Experience fine dining with panoramic lake views at our
                signature restaurant. Our chefs create culinary masterpieces
                using fresh, organic ingredients sourced locally from Madhya
                Pradesh.
              </p>
              <div className="space-y-8 text-sm xl:text-base">
                <div>
                  <p className="font-semibold">Local Delicacies</p>
                  <p>
                    Authentic Madhya Pradesh cuisine including Poha, Dal Bafla,
                    and Bhutte ka Kees
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Organic Ingredients</p>
                  <p>
                    Farm-to-table dining with organic produce from local
                    farmers
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Fine Dining</p>
                  <p>
                    International cuisine and curated wine selection for
                    discerning palates
                  </p>
                </div>
              </div>
            </div>
            {/* Inline Image */}
            <div className="col-span-12 lg:col-span-5 flex items-center">
              <div className="relative w-full max-h-[500px] aspect-[4/5] rounded-xl overflow-hidden bg-black/20">
                <Image
                  src={LAKESIDE_INLINE}
                  alt="Restaurant dining table"
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dining;