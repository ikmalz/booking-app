import Image from "next/image";
import Link from "next/link";
import { IoPeopleOutline } from "react-icons/io5";
import { formatCurrency } from "@/lib/utils";
import { RoomProps } from "@/types/room";

const Card = ({ room }: { room: RoomProps }) => {
  return (
    <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
      {/* Image */}
      <div className="relative h-56 w-full">
        <Image
          src={room.image}
          alt={room.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 tracking-tight line-clamp-1">
            <Link
              href={`/room/${room.id}`}
              className="hover:text-orange-500 transition-colors"
            >
              {room.name}
            </Link>
          </h4>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {room.description ||
              "A modern and cozy space designed for comfort."}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <IoPeopleOutline className="text-lg" />
            <span className="text-sm">
              {room.capacity} {room.capacity === 1 ? "guest" : "guests"}
            </span>
          </div>
          <p className="font-semibold text-orange-600">
            {formatCurrency(room.price)}
            <span className="text-xs text-gray-400 ml-1">/night</span>
          </p>
        </div>

        <Link
          href={`/room/${room.id}`}
          className="w-full text-center px-5 py-2 rounded-xl font-medium text-sm text-white bg-orange-500 hover:bg-orange-600 transition-colors"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default Card;
