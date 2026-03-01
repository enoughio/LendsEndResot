"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";

const NavBaR = () => {
  const { data: session } = useSession();

  return (
    <nav className="max-w-[99vw] h-12 sm:h-17 w-full fixed rounded-b-3xl z-30 flex px-3 justify-between ml-auto sm:justify-end items-center text-white bg-black/10  shadow-md">
      {/* Logo */}
        <Link href="/" className="cursor-pointer h-full p-2 rounded-md hover:bg-gray-600/40">
      <div className="font-bold text-md sm:text-2xl text-start w-full pl-5 absolute top-5 left-2">
        LAND&apos;S END
      </div>
        </Link>

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
            sm:bg-transparent
            bg-black/90            
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
            <Link href="/" className="cursor-pointer h-full sm:p-2 rounded-md hover:bg-gray-600/40">
              Home
            </Link>
            <Link href="/booking" className="cursor-pointer h-full sm:p-2 rounded-md hover:bg-gray-600/40">
              Booking
            </Link>
            <Link href="/about" className="cursor-pointer h-full sm:p-2 rounded-md hover:bg-gray-600/40">
              About
            </Link>
            <Link href="/gallery" className="cursor-pointer h-full sm:p-2 rounded-md hover:bg-gray-600/40">
              Gallery
            </Link>
            {/* <Link href="/events" className="cursor-pointer h-full sm:p-2 rounded-md hover:bg-gray-600/40">
              Events
            </Link> */}
            {/* <Link href="/contact" className="cursor-pointer h-full sm:p-2 rounded-md hover:bg-gray-600/40">
              Contact
            </Link> */}
          </ul>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 mt-6 sm:mt-0 w-full sm:w-auto">
            {/* TODO: Re-enable booking functionality */}
            {/* <div className="border-2 border-gray-200 p-3 rounded-full px-6 cursor-pointer hover:bg-white/10 transition w-full sm:w-auto text-center">
              Book an Experience
            </div> */}
            <div className="border-2 border-gray-200 p-3 rounded-full bg-white text-black px-6 cursor-pointer hover:bg-gray-200 transition w-full sm:w-auto text-center">
              <Link href="/contact" className="cursor-pointer h-full sm:p-2 rounded-md hover:bg-gray-600/40">
              Contact Us
            </Link>
            </div>
            {session ? (
              <div className="flex items-center gap-2 text-sm">
                {session.user?.role === "ADMIN" && (
                  <Link href="/admin" className="px-3 py-2 rounded-full bg-green-100 text-green-800 hover:bg-green-200 transition text-center">
                    Admin
                  </Link>
                )}
                <button onClick={() => signOut({ callbackUrl: "/" })} className="px-3 py-2 rounded-full border border-gray-200 hover:bg-gray-100 transition">
                  Sign out
                </button>
              </div>
            ) : (
              <Link href="/auth/login" className="px-3 py-2 rounded-full border-2 border-gray-200 hover:bg-white/10 transition w-full sm:w-auto text-center">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBaR;
