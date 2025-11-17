import Image from "next/image";
import React from "react";
import aboutPageRoomImg from "../../../public/aboutPageRoomImg.png";
import StayDetailsCard from "@/components/StayDetailsCard";

const AboutHero = () => {
  return (
    <div>
      <div className="relative h-[30vh] lg:h-[45vh] -z-10">
        <div className="absolute top-0 left-0 h-[50%] w-full bg-gradient-to-b from-black z-10"></div>
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-[#00234D] opacity-60 z-10"></div>
        <div className="w-full h-full">
          <Image
            src={aboutPageRoomImg}
            alt="room image"
            className="object-cover object-[70%_center] sm:object-center"
            fill
            priority
          ></Image>
        </div>
      </div>
      <StayDetailsCard imageHidden={true} />
    </div>
  );
};

export default AboutHero;
