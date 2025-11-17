"use client";

import React, { useState } from "react";
import Image from "next/image";
import ReviewCard from "./ReviewCard";
import UnderlinedHeading from "./UnderlinedHeading";

export interface Review {
  id: number;
  rating: number;
  ratingText: string;
  userName: string;
  userAvatar: string;
  comment: string;
}

const reviews: Review[] = [
  {
    id: 1,
    rating: 5.0,
    ratingText: "Amazing",
    userName: "Omar Siphron",
    userAvatar: "https://i.pravatar.cc/150?img=1",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 2,
    rating: 5.0,
    ratingText: "Amazing",
    userName: "Cristofer Ekstrom Bothman",
    userAvatar: "https://i.pravatar.cc/150?img=12",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 3,
    rating: 5.0,
    ratingText: "Amazing",
    userName: "Kaiya Lubin",
    userAvatar: "https://i.pravatar.cc/150?img=5",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 4,
    rating: 5.0,
    ratingText: "Amazing",
    userName: "Erin Septimus",
    userAvatar: "https://i.pravatar.cc/150?img=9",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 5,
    rating: 5.0,
    ratingText: "Amazing",
    userName: "Terry George",
    userAvatar: "https://i.pravatar.cc/150?img=15",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

const HotelReviews: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 40;
  const reviewsPerPage = 5;

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <UnderlinedHeading title="Reviews" />
        <button className="bg-[#067C0B] text-sm h-fit hover:bg-green-800 text-white font-semibold p-3 xl:py-3 rounded-md transition-colors whitespace-nowrap">
          Give your review
        </button>
      </div>
      <div className="py-8 md:py-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex gap-4">
            <h2 className="text-5xl md:text-6xl font-semibold text-gray-900">
              4.2
            </h2>
            <div className="flex flex-col justify-between">
              <span className="text-xl md:text-2xl font-semibold text-gray-900">
                Very good
              </span>
              <span className="text-base text-gray-600">
                371 verified reviews
              </span>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-0">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-6 pt-6 mt-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <div className="relative w-6 h-6">
              <Image
                src="/icons/left.png"
                alt="Previous"
                fill
                className="object-contain"
              />
            </div>
          </button>
          <span className="text-base font-medium text-gray-900">
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <div className="relative w-6 h-6">
              <Image
                src="/icons/right.png"
                alt="Next"
                fill
                className="object-contain"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelReviews;
