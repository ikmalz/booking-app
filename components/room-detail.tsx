import { getRoomDetailById, getDisableRoomById } from "@/lib/data";
import Image from "next/image";
import { notFound } from "next/navigation";
import { IoCheckmark, IoPeopleOutline } from "react-icons/io5";
import { formatCurrency } from "@/lib/utils";
import ReserveForm from "./reserve-form";

const RoomDetail = async ({ roomId }: { roomId: string }) => {
  const [room, disableDate] = await Promise.all([
    getRoomDetailById(roomId),
    getDisableRoomById(roomId),
  ]);
  if (!room || !disableDate) return notFound();

  return (
    <div className="max-w-[1400px] py-12 px-6 grid lg:grid-cols-12 gap-10 mx-auto">
      {/* Left Content */}
      <div className="md:col-span-8">
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 space-y-8">
          {/* Foto */}
          <Image
            src={room.image}
            alt={room.name}
            width={770}
            height={430}
            priority
            className="w-full rounded-xl shadow-lg object-cover"
          />

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {room.name}
          </h1>

          {/* Deskripsi */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Overview
            </h2>
            <p className="text-gray-600 leading-relaxed text-justify">
              {room.description}
            </p>
          </section>

          {/* Highlights */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Highlights
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-orange-50 hover:bg-orange-100 transition rounded-lg p-4 text-center">
                <span className="block text-2xl">🛏️</span>
                <span className="text-sm text-gray-700">Cozy Bed</span>
              </div>
              <div className="bg-orange-50 hover:bg-orange-100 transition rounded-lg p-4 text-center">
                <span className="block text-2xl">🌐</span>
                <span className="text-sm text-gray-700">Free WiFi</span>
              </div>
              <div className="bg-orange-50 hover:bg-orange-100 transition rounded-lg p-4 text-center">
                <span className="block text-2xl">🌆</span>
                <span className="text-sm text-gray-700">City View</span>
              </div>
            </div>
          </section>

          {/* Amenities */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Amenities
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {room.RoomAmenities.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition"
                >
                  <IoCheckmark className="text-green-500 size-5" />
                  <span className="text-gray-700 text-sm">
                    {item.Amenities.name}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="md:col-span-4">
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <IoPeopleOutline className="size-4" />
              <span>
                {room.capacity} {room.capacity === 1 ? "person" : "people"}
              </span>
            </div>
            <div className="text-right">
              <span className="block text-2xl font-bold text-gray-900">
                {formatCurrency(room.price)}
              </span>
              <span className="text-gray-500 text-xs">/Night</span>
            </div>
          </div>

          {/* Reserve Form */}
          <ReserveForm room={room} disableDate={disableDate} />

          <div className="mt-8 space-y-5">
            <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                Booking Information
              </h4>
              <ul className="space-y-1 text-xs text-gray-600">
                <li>✅ Minimum booking is 1 day</li>
                <li>✅ No return or refund after booking</li>
                <li>✅ Full payment required at reservation</li>
              </ul>
            </div>

            {/* Location */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                Location
              </h4>
              <p className="text-xs text-gray-600 mb-1">
                Located in the heart of the city, just 10 min from downtown and
                20 min from the airport.
              </p>
              <a
                href="#map"
                className="text-orange-500 text-xs font-medium hover:underline"
              >
                View on map →
              </a>
            </div>

            {/* Policies */}
            <div className="bg-slate-50 rounded-lg p-4 border border-gray-100">
              <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                Policies
              </h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>Check-in: 2 PM · Check-out: 12 PM</li>
                <li>No smoking inside the room</li>
                <li>No pets allowed</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-xs text-gray-700">
                Need help with your booking?{" "}
                <a
                  href="/contact"
                  className="text-orange-500 font-medium hover:underline"
                >
                  Contact us
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
