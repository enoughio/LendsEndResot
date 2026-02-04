import Image from "next/image";
import { Room } from "./AvailableRooms";

const RoomCard: React.FC<{ room: Room }> = ({ room }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4 md:p-4 flex flex-col md:flex-row md:items-center gap-4">
        {/* Image */}
        <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
          <Image
            src={room.image}
            alt={room.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>

        {/* Room Details */}
        <div className="flex-1 md:flex-1">
          <h3 className="text-base font-semibold md:font-normal text-gray-900 leading-tight">
            {room.name} - {room.description}
          </h3>
        </div>

        {/* Price and Button Container */}
        <div className="flex items-center justify-between md:justify-end md:gap-6 mt-1 md:mt-0">
          {/* Price */}
          <div className="text-left md:text-right">
            <p className="text-2xl font-semibold text-gray-900">
              ${room.pricePerNight}
              <span className="text-base font-normal">/night</span>
            </p>
          </div>

          {/* Book Button */}
          {/* TODO: Re-enable booking functionality */}
          {/* <button className="bg-[#067C0B] hover:bg-green-800 text-white text-sm font-semibold px-8 py-3 rounded-md transition-colors whitespace-nowrap">
            Book now
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
