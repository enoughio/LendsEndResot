'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
// import CheckInOut from "./CheckInOut";

const StayDetailsCard = ({ imageHidden = false }: { imageHidden?: boolean }) => {
  const router = useRouter()
  return (
    <div className="-translate-y-[20%] md:-translate-y-[35%] w-[85%] sm:w-[45%] md:w-[90%] lg:w-[80%] mx-auto bg-white h-20 px-6 py-6 lg:py-7  shadow-lg rounded-2xl sm:rounded-xl flex flex-col items-center md:items-start justify-between text-[#112211]">
      <div
        className={`hidden sm:${
          imageHidden ? "hidden" : "block"
        } absolute top-0 left-0 right-0 bottom-0 -translate-y-[59%] z-100 font-semibold h-[19vw]`}
      >
        <Image
          src={"/landsend.svg"}
          alt=""
          fill
          priority
          className="object-contain"
        />
      </div>
      {/* <div className="hidden sm:block absolute right-0 w-[95vw]  z-100 font-semibold sm:h-24 sm:-bottom-[51px] md:h-32 md:-bottom-[64px] lg:-bottom-[90px] lg:h-52 2xl:h-60 -2xl:bottom-[0px] ">
          <Image
            src={"/lends end.svg"}
            alt=""
            fill
            className="object-contain"
          />
        </div> */}
      {/* <p className="font-semibold text-2xl sm:text-xl">
        When you want to stay?
      </p> */}
      <div className="w-full h-[80%] md:h-fit flex flex-col md:flex-row items-center justify-between">
        
        {/* <div className="gap-5 md:gap-3 flex flex-col md:flex-row w-[90%] sm:w-[80%] md:w-[60%]">
          <CheckInOut>Check In</CheckInOut>
          <CheckInOut>Check Out</CheckInOut>
          <CheckInOut>Rooms & Guests</CheckInOut>
        </div> */}

        <div className="w-[90%] md:w-fit flex items-center justify-center gap-2 md:gap-5 text-[12px] lg:text-sm">
          {/* <p className="hidden md:inline-flex hover:cursor-pointer">
            <Image src={"/add icon.svg"} alt="" width={16} height={16} />
            Add Promo Code
          </p> */}  
          <Link href={'/booking'}  className="w-full bg-[#067C0B] text-white rounded-sm p-3 inline-flex items-center justify-center gap-1 lg:mr-3 hover:bg-green-800 active:bg-green-800 hover:cursor-pointer hover:scale-105 active:scale-100 transition-transform duration-200">
            <Image src={"/building icon.svg"} alt="" width={16} height={16} />
            Book a Stay at Lend's End
          </Link>
          <Link href={'/booking'}  className="w-full bg-[#067C0B] text-white text-nowrap rounded-sm p-3 inline-flex items-center justify-center gap-1 lg:mr-3 hover:bg-green-800 active:bg-green-800 hover:cursor-pointer hover:scale-105 active:scale-100 transition-transform duration-200">
            <Image src={"/building icon.svg"} alt="" width={16} height={16} />
            Book a day long visit at Lend's End
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StayDetailsCard;
