import Image from "next/image";

const CheckInOut = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative text-[#1C1B1F] flex items-center justify-between pr-3 md:pr-2 pl-4 md:pl-3 py-7 md:py-4 lg:px-[14px] lg:py-6 border border-black w-full md:h-10 h-12 rounded-md">
      <p className="absolute -top-[12px] sm:-top-[10px] left-3 sm:left-2 bg-white px-1 text-[15px] sm:text-sm md:text-[12px] lg:text-sm font-light">
        {children}
      </p>
      <p className="font-light text-lg sm:text-[1rem] md:text-sm lg:text-[1rem]">Fri 12/2</p>
      <div className="w-6 h-6 lg:w-6 lg:h-6 relative">
        <Image
          src={"/calendar icon.svg"}
          alt="calender icon"
          fill
          className="object-contain hover:cursor-pointer"
        />
      </div>
    </div>
  );
};

export default CheckInOut;
