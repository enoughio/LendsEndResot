import Image from "next/image";
import React from "react";
// import StayDetailsCard from '../StayDetailsCard'
const Hero = () => {
  return (
    <section className="relative w-full h-screen max-h-screen sm:h-screen  ">
      <div className="relative w-full h-full ">
       
        <div className="block sm:hidden absolute -top-23  w-full  h-full ">
          <Image
            src={"/mobileHero.jpeg"}
            alt="hero"
            fill
            className="object-fill"
            priority
          />
          {/* <div className="hidden sm:block w-full h-[15vh] bg-black -mt-1" /> */}
        </div>

        <div className="h-[122%]  hidden sm:block sm:h-auto">
          <Image
            src="/night sky.svg"
            alt="Image of a Night Sky"
            fill
            sizes="100vw"
            className="object-bottom object-cover"
            priority
          />

        </div>

        {/* desktop */}
        <p className="hidden sm:flex absolute left-35 sm:bottom-[71%] items-center justify-center text-center text-white tracking-wide sm:text-[6vw]  z-20 font-bold">
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

          {/* mobile */}
        <p className="sm:hidden text-white tracking-tight  text-5xl z-20 absolute inset-0 bottom-[65%] flex items-center font-semibold pl-6">
          Nature is Our <br /> Finest Luxury
        </p>

        <p className="flex sm:hidden items-center font-semibold text-white sm:text-sm lg:text-xl 2xl:text-2xl z-200 absolute top-[25%]  max-w-[90%] px-6">
          &quot;Land’s End is a nature-rooted retreat where forests, silence, and stories bring people back to themselves.&quot;
        </p>


        <p className="hidden sm:flex items-center font-semibold text-white sm:text-sm lg:text-xl 2xl:text-2xl z-20 absolute left-[10%] top-[36%] max-w-[20%] ">
          &quot;Land’s End is a nature-rooted retreat where forests, silence, and stories bring people back to themselves.&quot;
        </p>
      </div>
        
        <div className="w-[90%]  flex justify-center items-center absolute right-3 top-[60%]  h-[30%] z-10 ">
          <Image 
            src={"/home/mobile-Home-text.svg"}
            alt=""
            width={850}
            height={800}
            className="block sm:hidden object-contain"
          />
        </div>

      <div className="hidden sm:block w-full h-[5vh] bg-black sm:h-[10vh] -mt-1" />
      
      {/* <StayDetailsCard /> */}
          <div className="w-[85%] sm:w-[45%] md:w-[90%] lg:w-[80%] mx-auto  z-100  px-6 py-6 lg:py-7   ">
            
            <div className="hidden sm:block absolute right-0 w-[95vw] font-semibold -bottom-0  h-[11rem]  ">
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
