import Image from "next/image";
import React from "react";
// import StayDetailsCard from '../StayDetailsCard'
const Hero = () => {
  return (
    <section className="relative w-full sm:h-screen">
      <div className="relative w-full aspect-[21/20] sm:aspect-[21/11]">
       
        {/* <div className="hidden xl:block absolute w-full  h-[25%] z-10">
          <Image
            src={"/top pseudo.svg"}
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "bottom" }}
            priority
          />
        </div> */}

        <div className="h-[122%] sm:h-auto">
          <Image
            src="/night sky.svg"
            alt="Image of a Night Sky"
            fill
            sizes="100vw"
            className="object-bottom object-cover"
            priority
          />
        </div>

        <p className="hidden sm:flex absolute inset-0 bottom-[51%] items-center justify-center text-center text-white tracking-wide sm:text-[6vw]  z-20 font-bold">
          Nature is Our Finest Luxury
        </p>
        {/* <div className="hidden sm:flex absolute inset-0 -bottom-[17%] items-center justify-center flex-col text-center text-white sm:text-4xl md:text-5xl lg:text-7xl xl:text-[5rem] 2xl:text-[6rem] z-20 font-bold">
            <p>Nature is Our Finest Luxury.</p>
            <div className="ml-28">
              <Image
                src={"/upper house.svg"}
                alt=""
                width={850}
                height={800}
                className="z-50 object-contain"
                // sizes="50vw"
              />
            </div>
          </div> */}
        <p className="sm:hidden text-white tracking-wide text-5xl z-20 absolute inset-0 bottom-[25%] flex items-center font-semibold pl-6">
          Nature is <br /> Our Finest <br /> Luxury
        </p>
        <p className="hidden sm:flex items-center font-semibold text-white sm:text-sm lg:text-lg 2xl:text-2xl z-20 absolute left-[10%] top-[50%] max-w-[20%] ">
          &quot;We are a natural forest resort located in the lap of nature, offering luxury stays, calm surroundings, and unforgettable experiences.&quot;
        </p>
      </div>
      <div className="hidden sm:block w-full h-[5vh] bg-black sm:h-[10vh] -mt-1" />
      
      {/* <StayDetailsCard /> */}
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
    </section>
  );
};

export default Hero;
