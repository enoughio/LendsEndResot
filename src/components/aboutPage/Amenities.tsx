import React from "react";
import UnderlinedHeading from "./UnderlinedHeading";
import Image from "next/image";

export interface Amenity {
  name: string;
  icon: string;
}

export const amenities: Amenity[] = [
  {
    name: "Outdoor pool",
    icon: "/icons/pool.png",
  },
  {
    name: "Indoor pool",
    icon: "/icons/pool.png",
  },
  {
    name: "Spa and wellness center",
    icon: "/icons/spa.png",
  },
  {
    name: "Fitness center",
    icon: "/icons/dumbbell.png",
  },
  {
    name: "Bar/Lounge",
    icon: "/icons/cocktail.png",
  },
  {
    name: "Restaurant",
    icon: "/icons/restaurant.png",
  },
  {
    name: "Free Wi-Fi",
    icon: "/icons/wifi.png",
  },
  {
    name: "Tea/coffee machine",
    icon: "/icons/coffee.png",
  },
  {
    name: "Room service",
    icon: "/icons/roomService.png",
  },
];

const Amenities = () => {
  return (
    <div className="hidden md:block">
      <UnderlinedHeading title="Amenities" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 md:my-8 lg:my-0">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="relative w-7 h-7 flex-shrink-0">
              <Image
                src={amenity.icon}
                alt={amenity.name}
                fill
                className="object-contain"
              />
            </div>
            <span className="text-lg font-semibold text-gray-900">
              {amenity.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Amenities;
