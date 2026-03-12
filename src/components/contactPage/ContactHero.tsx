import Image from "next/image";
import React from "react";


const ContactHero = () => {
  return (
    <div className="relative h-[32vh] lg:h-[25vh] overflow-hidden">
      <div className="absolute top-0 left-0 h-[35%] w-full bg-gradient-to-b from-black/90 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a2e28]/85 via-[#0a2e28]/40 to-transparent z-10"></div>
      <div className="w-full h-full">
        <Image
          src='/gallery/con2.jpeg'
          alt="Hotel garden image"
          className="object-cover object-[70%_center] sm:object-center"
          fill
          priority
        ></Image>
      </div>
      <div className="absolute bottom-[10%] left-[5%] text-white z-[20] max-w-2xl">
       
        <div className="relative mb-2 xl:mb-4">
          <h2 className="text-4xl md:text-6xl xl:text-7xl">Contact</h2>
          <div className="w-12 md:w-16 xl:w-20 h-1.5 xl:h-2 mt-1 ml-1 bg-[#4CAF50]"></div>
        </div>
        <p className="text-sm md:text-base text-white/90">Questions, bookings, or custom requests, we usually respond within 24 hours.</p>
      </div>
    </div>
  );
};

export default ContactHero;
