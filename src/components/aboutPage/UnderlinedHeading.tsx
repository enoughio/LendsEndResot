import React from "react";

const UnderlinedHeading = ({ title }: { title: string }) => {
  return (
    <div className="relative mb-3 xl:mb-6">
      <h2 className="text-5xl xl:text-6xl 2xl:text-7xl">{title}</h2>
      <div className="w-16 xl:w-18 h-2 xl:h-3 mt-1 bg-[#067C0B]"></div>
    </div>
  );
};

export default UnderlinedHeading;
