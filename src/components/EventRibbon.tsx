"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function EventRibbon() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  const hiddenPaths = [
    "/sumiran-forest-immersion-camp",
    "/events/sumiran-forest-immersion-camp-2026",
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const closeRibbon = () => {
    setIsVisible(false);
  };

  if (!isVisible || hiddenPaths.includes(pathname)) return null;

  return (
    <div className="fixed top-12 sm:top-17 left-0 right-0 z-20 flex justify-between md:justify-center px-1">
      <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-sm bg-gray-400/30 px-4 py-1 text-[11px] w-full sm:text-xs text-white shadow-lg">
        <span className="font-semibold">Sumiran Forest Immersion Camp</span>
        <span className="hidden sm:inline">|</span>
        <span className="text-emerald-100 hidden md:inline-block">Ages 10-16, 3 days / 3 nights</span>
        <Link
          href="/sumiran-forest-immersion-camp"
          className="rounded-full bg-white/15 px-3 py-1 text-white hover:bg-white/25 transition"
        >
          View details
        </Link>
        <button
          type="button"
          onClick={closeRibbon}
          className="ml-auto md:ml-4     rounded-full border border-white/40 px-2.5 py-1 text-white/90 hover:bg-white/15"
          aria-label="Close event ribbon"
        >
          Close
        </button>
      </div>
    </div>
  );
}
