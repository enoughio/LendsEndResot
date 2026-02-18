import Image from "next/image";
import React from "react";
import { IoMdStar } from "react-icons/io";

const AboutSerenity = () => {
  return (
    <section className="px-[5vw] py-4 sm:my-[10vw] mx-auto">
      {/* Mobile Heading (on top) */}
      <div className="mb-1 md:hidden">
        <h2 className="text-3xl leading-none ">
          About{" "}
          <span className="font-light">
            Land&apos;s End<br />  Resort
          </span>
        </h2>
        <div className="w-12 h-2 bg-[#067C0B]"></div>
      </div>

      {/* Grid for Desktop (Image + Text + Heading) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 items-center">
        {/* Left Side (Heading + Text) */}
        <div className="order-2 md:order-1">
          {/* Desktop Heading */}
          <div className="md:mb-3 xl:mb-6 hidden md:block">
            <h2 className="md:text-5xl xl:text-7xl md:mb-2 xl:mb-4">
              About{" "}
              <span className="font-light">
                Land&apos;s End<br />  Resortz
              </span>
            </h2>
            <div className="w-16 h-3 md:h-2 bg-[#067C0B]"></div>
          </div>

          {/* Text Content */}
          <p className="text-gray-700 text-md sm:text-md xl:text-[1em] leading-5 sm:leading-normal 2xl:text-xl mb-2 xl:mb-12 2xl:mb-16">
            Tucked deep inside the quiet embrace of Sumiran Forest, Land’s End – The Last Resort is a place to pause, unplug, and return to what truly matters. This is not conventional luxury, but a slow, nature-rooted retreat where simplicity, silence, and meaningful connection take center stage—and where the forest itself becomes the storyteller. <br />
            <div className="mb-4" />
           Built with ecological sensitivity and guided by the philosophy of living lightly, Land’s End offers an off-grid experience shaped by nature’s rhythm—sunrise walks, earthy meals, star-lit evenings, and moments of stillness. It is a space for reflection, learning, and shared stories, hosting eco-festivals, retreats, and quiet personal journeys—where the road ends and the journey inward begins.
          </p>

          {/* Stats */}
          {/* <div className="grid grid-cols-3 gap-6 text-center text--md md:text-left md:text-4xl xl:text-6xl">
            <div>
              50<span className="">+</span>
              <p className="text-[16px] xl:text-lg text-gray-700">
                Luxury Rooms
              </p>
            </div>
            <div className="">
              <span className="inline-flex items-center">
                5
                <span className="text-[2.5vw] -mb-1">
                  <IoMdStar />
                </span>
              </span>
              <p className="text-[16px] xl:text-lg text-gray-700">Rating</p>
            </div>
            <div className="">
              <p className="xl:text-shadow-lg">
                24
                <span className="inline-block overflow-hidden leading-none h-[0.9em]">
                  /
                </span>
                7
              </p>
              <p className="text-[16px] xl:text-lg text-gray-700">Service</p>
            </div>
          </div> */}
        </div>

        {/* Right Side (Image) */}
        <div className="flex justify-center self-start mt-[1vw] order-1 md:order-2 ">
          <div className="relative w-full max-w-[99%] sm:aspect-square h-72 sm:h-auto  max-h-[60vh]">
            <Image
              src="/about section image.svg"
              alt="Serenity Lake Resort"
              fill
              className="object-cover object-right rounded-3xl shadow-[30px_30px_40px_0px_rgba(0,0,0,0.3)]"
              priority
            />

            {/* Decorative leaves */}
            <Image
              src="/top-leaves.svg"
              alt="Leaf decoration"
              width={48}
              height={48}
              className="absolute top-20 left-10 w-[10vw] h-[10vw] -translate-y-[100%] -translate-x-[100%] -z-10"
            />
            <Image
              src="/bottom-leaves.svg"
              alt="Leaf decoration"
              width={48}
              height={48}
              className="absolute bottom-12 -right-4 w-[10vw] h-[10vw] translate-y-[100%]  -z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSerenity;
