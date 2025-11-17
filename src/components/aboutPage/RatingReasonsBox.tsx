import Image from "next/image";
import React from "react";
import stars from "../../../public/Stars.svg";

const RatingReasonsBox = ({ reason }: { reason: string }) => {
  return (
    <div className="w-[48%] md:w-36 h-24 md:h-28 border border-[#067C0B] rounded-lg p-5 md:p-3  flex md:flex-col justify-between items-center md:items-start">
      <Image src={stars} alt="" aria-hidden className="size-6 lg:size-auto"/>
      <p className="flex items-center text-sm font-semibold xl:text-[1em] xl:font-normal">{reason}</p>
    </div>
  );
};

export default RatingReasonsBox;
