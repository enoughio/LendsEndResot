import React from "react";

const RatingBox = () => {
  return (
    <div className="w-full md:w-36 h-28 md:h-28 text-white bg-[#067C0B] rounded-lg p-6 md:p-3 flex md:flex-col justify-between">
      <p className="text-4xl md:text-3xl">4.2</p>
      <p className="">
        <span className="font-semibold xl:text-[1em]">Very Good</span>
        <br />
        <span className="text-[14px] md:text-sm">371 Reviews</span>
      </p>
    </div>
  );
};

export default RatingBox;
