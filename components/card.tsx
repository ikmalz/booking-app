import { Room } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { IoPeopleOutline } from "react-icons/io5";
import { formatCurrency } from "@/lib/utils";

const Card = ({ room }: { room: Room }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
      {/* Image */}
      <div className="relative h-60 w-full">
        <Image
          src={room.image}
          alt="Room Image"
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4">
        <div>
          <h4 className="text-xl font-semibold text-gray-800 tracking-tight">
            <Link
              href={`/room/${room.id}`}
              className="hover:text-orange-500 transition-colors"
            >
              {room.name}
            </Link>
          </h4>
          <p className="text-gray-500 mt-1">
            <span className="font-medium text-gray-900">
              {formatCurrency(room.price)}
            </span>
            <span className="text-sm text-gray-400 ml-1">/night</span>
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <IoPeopleOutline className="text-lg" />
            <span className="text-sm">
              {room.capacity} {room.capacity === 1 ? "person" : "people"}
            </span>
          </div>
          <Link
            href={`/room/${room.id}`}
            className="px-5 py-2 rounded-xl font-medium text-sm text-white bg-orange-500 hover:bg-orange-600 transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
