"use client";

import Image from "next/image";
// import { useRouter } from "next/navigation";
import React from "react";
// import CheckInOut from "./CheckInOut";

const StayDetailsCard = () => {
  // const router = useRouter();
  return (
    <div className="w-[85%] sm:w-[45%] md:w-[90%] lg:w-[80%] mx-auto  z-100  px-6 py-6 lg:py-7   ">
      
      <div className="hidden sm:block absolute right-0 w-[95vw] font-semibold bottom-[30px]  h-[11rem]  ">
        <Image
          src={"home/hero-text.svg"}
          alt=""
          fill
          className="object-contain "
        />
      </div>

    </div>
  );
};

export default StayDetailsCard;

{
  /* // <p className="font-semibold text-2xl sm:text-xl">
      //   When you want to stay?
      // </p>
      // <div className="w-full h-[80%] md:h-fit flex flex-col md:flex-row items-center justify-between"> */
}

{
  /* <div className="w-[90%] md:w-fit flex items-center justify-center gap-2 md:gap-5 text-[12px] lg:text-sm">

          <Link href={'/booking'}  className="w-full bg-[#067C0B] text-white rounded-sm p-3 inline-flex items-center justify-center gap-1 lg:mr-3 hover:bg-green-800 active:bg-green-800 hover:cursor-pointer hover:scale-105 active:scale-100 transition-transform duration-200">
            <Image src={"/building icon.svg"} alt="" width={16} height={16} />
            Book a Stay at Lend's End
          </Link>
          <Link href={'/booking'}  className="w-full bg-[#067C0B] text-white text-nowrap rounded-sm p-3 inline-flex items-center justify-center gap-1 lg:mr-3 hover:bg-green-800 active:bg-green-800 hover:cursor-pointer hover:scale-105 active:scale-100 transition-transform duration-200">
            <Image src={"/building icon.svg"} alt="" width={16} height={16} />
            Book a day long visit at Lend's End
          </Link>
        </div> */
}
{
  /* </div> */
}
// </div>
