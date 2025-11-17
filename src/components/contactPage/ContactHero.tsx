import Image from "next/image";
import React from "react";
import contactPageGardenImg from "../../../public/contactPageGardenImg.png";

const ContactHero = () => {
  return (
    <div className="relative h-[30vh] lg:h-[45vh] -z-10">
      <div className="absolute top-0 left-0 h-[30%] w-full bg-gradient-to-b from-black z-10"></div>
      <div className="absolute top-0 left-0 h-full w-[80%] bg-gradient-to-r from-[#00234D] opacity-60 z-10"></div>
      <div className="w-full h-full">
        <Image
          src={contactPageGardenImg}
          alt="Hotel garden image"
          className="object-cover object-[70%_center] sm:object-center"
          fill
          priority
        ></Image>
      </div>
      <div className="absolute bottom-[8%] left-[5%] text-white z-[20]">
        <div className="relative mb-3 xl:mb-6">
          <h2 className="text-5xl md:text-6xl xl:text-7xl">Contact</h2>
          <div className="w-12 md:w-16 xl:w-20 h-2 xl:h-3 mt-1 ml-1 bg-[#4CAF50]"></div>
        </div>
      </div>
    </div>
  );
};

export default ContactHero;
