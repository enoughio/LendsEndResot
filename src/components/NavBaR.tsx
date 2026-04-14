"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import EventRibbon from "./EventRibbon";

// function signOut() {
//   return true;
// }

const NavBaR = () => {
  // const session = { user: { role: "ADMIN" } };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY < 40) {
        setIsNavVisible(true);
        lastScrollYRef.current = currentY;
        return;
      }

      const previousY = lastScrollYRef.current;
      const delta = currentY - previousY;

      if (delta > 8) {
        setIsNavVisible(false);
      } else if (delta < -8) {
        setIsNavVisible(true);
      }

      lastScrollYRef.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav
      className={`max-w-[99vw] h-12 sm:h-17 w-full fixed rounded-b-3xl z-30 flex px-3 justify-between ml-auto sm:justify-end items-center text-white bg-black/20 backdrop-blur-sm shadow-md transition-transform duration-300 ${
        isNavVisible || isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Logo */}
      <Link
        href="/"
        onClick={closeMobileMenu}
        className="cursor-pointer h-full p-2 rounded-md hover:bg-gray-600/40"
      >
        <div className="font-bold text-md sm:text-2xl text-start w-full pl-5 absolute top-5 left-2">
          LAND&apos;S END
        </div>
      </Link>

      <div className="flex justify-end items-center w-full sm:w-auto">
        {/* Menu icon (RIGHT SIDE) */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          className="ml-auto cursor-pointer block sm:hidden z-[1100]"
          aria-label="Open menu"
        >
          <Image
            src="/icons/menuicon.svg"
            width={32}
            height={32}
            alt="menuicon"
          />
        </button>

        {isMobileMenuOpen && (
          <button
            type="button"
            aria-label="Close menu overlay"
            onClick={closeMobileMenu}
            className="fixed inset-0 z-[999] bg-black/40 sm:hidden"
          />
        )}

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
            translate-x-full
            sm:translate-x-0 sm:static sm:rounded-none 
          "
          style={{ transform: isMobileMenuOpen ? "translateX(0)" : undefined }}
        >
          {/* Close icon */}
          <button
            type="button"
            onClick={closeMobileMenu}
            className="block sm:hidden cursor-pointer mb-6"
            aria-label="Close menu"
          >
            <Image
              src="/icons/closedicon.svg"
              width={32}
              height={32}
              alt="closeicon"
            />
          </button>

          {/* Pages */}
          <ul className="flex flex-col sm:flex-row sm:pl-[12rem] text-white gap-4 sm:gap-0">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="cursor-pointer h-full sm:p-2 rounded-md hover:bg-gray-600/40"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={closeMobileMenu}
              className="cursor-pointer h-full sm:p-2 rounded-md hover:bg-gray-600/40"
            >
              About
            </Link>
            <Link
              href="/gallery"
              onClick={closeMobileMenu}
              className="cursor-pointer h-full sm:p-2 rounded-md hover:bg-gray-600/40"
            >
              Gallery
            </Link>
            <Link
              href="/events"
              onClick={closeMobileMenu}
              className="cursor-pointer h-full sm:p-2 rounded-md hover:bg-gray-600/40"
            >
              Events
            </Link>
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
            
            <Link
              href="/booking"
              onClick={closeMobileMenu}
              className="border-2 border-green-300 p-3 rounded-full bg00 text-white px-6 cursor-pointer hover:bg-green-500 transition w-full sm:w-auto text-center"
            >
              Book Now
            </Link>
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="border-2 border-gray-200 p-3 rounded-full bg-white text-black px-6 cursor-pointer hover:bg-gray-200 transition w-full sm:w-auto text-center"
            >
              Contact Us
            </Link>
            {/* {session ? (
              <div className="flex items-center gap-2 text-sm">
                {session.user?.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className="px-3 py-2 rounded-full bg-green-100 text-green-800 hover:bg-green-200 transition text-center"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="px-3 py-2 rounded-full border border-gray-200 hover:bg-gray-100 transition"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="px-3 py-2 rounded-full border-2 border-gray-200 hover:bg-white/10 transition w-full sm:w-auto text-center"
              >
                Sign in
              </Link>
            )} */}
          </div>
        </div>
      </div>
      <EventRibbon />
    </nav>
  );
};

export default NavBaR;
