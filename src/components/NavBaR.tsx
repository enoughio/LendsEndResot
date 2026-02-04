// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// const NavBaR = () => {
//   return (
//     <nav className="h-13 sm:h-17 w-full fixed  rounded-b-3xl z-30 flex px-3 justify-between sm:justify-around  items-center text-white webg-black/70  backdrop-blur-md shadow-md">
//       <div className="font-bold text-md sm:text-2xl text-start w-full pl-5 absolute top-5 left-2  ">LAND'S END</div>

//       <div className="flex justify-between items-center">
//         <input type="checkbox" id="sidebar-active" className="hidden  peer" />
//         <label htmlFor="sidebar-active" className="menu-btn open-sidebar-btn block sm:hidden ">
   
//           <Image
//             src="icons/menuicon.svg"
//             width={32}
//             height={32}
//             alt="menuicon"
//           />
//         </label>

//         <div className="links-container h-full sm:h-19 w-[75%] sm:max-w-[65%] sm:w-full  fixed top-0 right-100 sm:right-0 z-[1000] flex peer-checked:right-0  flex-col sm:flex-row sm:gap-14 items-start sm:items-center justify-start sm:justify-between rounded-l-2xl p-3 sm:pr-7 sm:p-0 ">
//           <label htmlFor="sidebar-active" className="closed-sidebar-btn block sm:hidden">
//             <Image
//               src="icons/closedicon.svg"
//               width={32}
//               height={32}
//               alt="closeicon"
//             />
//           </label>


//           {/* Desktop Pages */}
//           <ul className="flex flex-col sm:flex-row sm:pl-[12rem] text-white ">
//             <Link href="/about" className="cursor-pointer h-full sm:p-2 rounded-md decoration-0 hover:bg-gray-600/40">
//               About
//             </Link>
//             <Link href="/gallery" className="cursor-pointer h-full sm:p-2 rounded-md decoration-0 hover:bg-gray-600/40">
//               Gallery
//             </Link>
//             <Link href="/events" className="cursor-pointer h-full sm:p-2 rounded-md decoration-0 hover:bg-gray-600/40">
//               Events
//             </Link>
//             <Link href="/contact" className="cursor-pointer h-full sm:p-2 rounded-md decoration-0 hover:bg-gray-600/40">
//               Contact
//             </Link>
//           </ul>

//           {/* Desktop Buttons */}
//           <div className="flex items-center gap-5 ">
//             <div className="border-2 border-gray-200 p-3 rounded-full px-6 cursor-pointer hover:bg-white/10 transition">
//               Book an Experience
//             </div>
//             <div className="border-2 border-gray-200 p-3 rounded-full bg-white text-black px-6 cursor-pointer hover:bg-gray-200 transition">
//               Contact Us
//             </div>
//           </div>

              
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavBaR;




"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBaR = () => {
  return (
    <nav className="h-13 sm:h-17 w-full fixed rounded-b-3xl z-30 flex px-3 justify-between ml-auto sm:justify-end items-center text-white bg-black/20 backdrop-blur-md shadow-md">
      {/* Logo */}
      <div className="font-bold text-md sm:text-2xl text-start w-full pl-5 absolute top-5 left-2">
        LAND&apos;S END
      </div>

      <div className="flex justify-end items-center w-full sm:w-auto">
        {/* checkbox controller */}
        <input type="checkbox" id="sidebar-active" className="peer hidden" />

        {/* Menu icon (RIGHT SIDE) */}
        <label
          htmlFor="sidebar-active"
          className="ml-auto cursor-pointer block sm:hidden z-[1100]"
        >
          <Image src="/icons/menuicon.svg" width={32} height={32} alt="menuicon" />
        </label>

        {/* Sidebar / Links */}
        <div
          className="
            links-container
            fixed top-0 right-0 z-[1000]
            h-screen sm:h-17
            w-[75%] sm:w-full sm:max-w-none
            
            shadow-2xl rounded-l-2xl
            p-3 sm:p-0 sm:pr-7

            flex flex-col sm:flex-row sm:gap-14
            items-start sm:items-center
            justify-start sm:justify-between

            transform transition-transform duration-300 ease-in-out
            translate-x-full peer-checked:translate-x-0
            sm:translate-x-0 sm:static sm:rounded-none 
          "
        >
          {/* Close icon */}
          <label htmlFor="sidebar-active" className="block sm:hidden cursor-pointer mb-6">
            <Image src="/icons/closedicon.svg" width={32} height={32} alt="closeicon" />
          </label>

          {/* Pages */}
          <ul className="flex flex-col sm:flex-row sm:pl-[12rem] text-white gap-4 sm:gap-0">
            <Link href="/about" className="cursor-pointer h-full sm:p-2 rounded-md hover:bg-gray-600/40">
              About
            </Link>
            <Link href="/gallery" className="cursor-pointer h-full sm:p-2 rounded-md hover:bg-gray-600/40">
              Gallery
            </Link>
            <Link href="/events" className="cursor-pointer h-full sm:p-2 rounded-md hover:bg-gray-600/40">
              Events
            </Link>
            <Link href="/contact" className="cursor-pointer h-full sm:p-2 rounded-md hover:bg-gray-600/40">
              Contact
            </Link>
          </ul>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 mt-6 sm:mt-0 w-full sm:w-auto">
            {/* TODO: Re-enable booking functionality */}
            {/* <div className="border-2 border-gray-200 p-3 rounded-full px-6 cursor-pointer hover:bg-white/10 transition w-full sm:w-auto text-center">
              Book an Experience
            </div> */}
            <div className="border-2 border-gray-200 p-3 rounded-full bg-white text-black px-6 cursor-pointer hover:bg-gray-200 transition w-full sm:w-auto text-center">
              Contact Us
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBaR;
