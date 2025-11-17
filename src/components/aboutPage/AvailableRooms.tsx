import React from "react";
import UnderlinedHeading from "./UnderlinedHeading";
import RoomCard from "./RoomCard";

export interface Room {
  name: string;
  description: string;
  pricePerNight: number;
  view: string;
  image: string;
}

const rooms: Room[] = [
  {
    name: "Superior room",
    description: "1 double bed or 2 twin beds",
    pricePerNight: 240,
    view: "Standard",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop",
  },
  {
    name: "Superior room - City view",
    description: "1 double bed or 2 twin beds",
    pricePerNight: 280,
    view: "City View",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop",
  },
  {
    name: "Superior room - City view",
    description: "1 double bed or 2 twin beds",
    pricePerNight: 320,
    view: "City View",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop",
  },
  {
    name: "Superior room - City view",
    description: "1 double bed or 2 twin beds",
    pricePerNight: 350,
    view: "City View",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
  },
];

const AvailableRooms = () => {
  return (
    <div className="">
      <UnderlinedHeading title="Available Rooms" />
      <div className="my-6">
        <div className="mx-auto space-y-4">
          {rooms.map((room, index) => (
            <RoomCard key={index} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailableRooms;
