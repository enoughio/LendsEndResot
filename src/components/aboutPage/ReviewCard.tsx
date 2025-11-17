import React from "react";
import Image from "next/image";
import { Review } from "./Reviews";

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <div className="py-6 border-b border-gray-200">
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="relative w-12 h-12 flex-shrink-0 rounded-full overflow-hidden">
          <Image
            src={review.userAvatar}
            alt={review.userName}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base font-semibold text-gray-900">
                  {review.rating.toFixed(1)} {review.ratingText}
                </span>
                <span className="text-gray-400">|</span>
                <span className="text-base text-gray-700">
                  {review.userName}
                </span>
              </div>
            </div>
            <button
              className="flex-shrink-0 hover:opacity-70 transition-opacity"
              aria-label="Report review"
            >
              <div className="relative w-5 h-5 opacity-80">
                <Image
                  src="/icons/flag.png"
                  alt="Report"
                  fill
                  className="object-contain"
                />
              </div>
            </button>
          </div>
          <p className="text-base text-gray-700 leading-relaxed">
            {review.comment}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
