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
    <div className="max-w-screen-xl py-16 px-4 grid lg:grid-cols-12 gap-8 mx-auto">
      <div className="md:col-span-8">
        {/* Foto */}
        <Image
          src={room.image}
          alt={room.name}
          width={770}
          height={430}
          priority
          className="w-full rounded-xl shadow-md mb-8"
        />

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {room.name}
        </h1>

        {/* Deskripsi */}
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Overview
            </h2>
            <p className="text-gray-600 leading-relaxed text-justify">
              {room.description}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Highlights
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-orange-50 p-3 rounded-lg text-center">
                <span className="block text-2xl">🛏️</span>
                <span className="text-sm text-gray-700">Cozy Bed</span>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg text-center">
                <span className="block text-2xl">🌐</span>
                <span className="text-sm text-gray-700">Free WiFi</span>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg text-center">
                <span className="block text-2xl">🌆</span>
                <span className="text-sm text-gray-700">City View</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Amenities
            </h2>
            <div className="grid md:grid-cols-3 gap-x-4 gap-y-2">
              {room.RoomAmenities.map((item) => (
                <div
                  className="flex items-center gap-2 bg-white p-2 rounded-md shadow-sm hover:shadow-md transition"
                  key={item.id}
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

      <div className="md:col-span-4">
        <div className="border-2 border-gray-300 border-dashed px-3 py-5 bg-slate-50 rounded-md">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <IoPeopleOutline className="size-4" />
              <span>
                {room.capacity} {room.capacity === 1 ? "person" : "people"}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-semibold text-gray-600">
                {formatCurrency(room.price)}
              </span>
              <span className="text-gray-400 text-sm">/Night</span>
            </div>
          </div>

          <ReserveForm room={room} disableDate={disableDate} />

          <div className="mt-8 space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                Booking Information
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✅ Minimum booking is 1 day (no hourly booking)</li>
                <li>✅ No return or refund after booking</li>
                <li>✅ Full payment required at reservation</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Location</h4>
              <p className="text-sm text-gray-600">
                Located in the heart of the city, just 10 min from downtown and
                20 min from the airport.
              </p>
              <a
                href="#map"
                className="text-orange-500 text-sm font-medium hover:underline"
              >
                View on map →
              </a>
            </div>

            {/* Policies */}
            <div className="bg-slate-100 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Policies</h4>
              <p className="text-sm text-gray-600">
                Check-in: 2 PM · Check-out: 12 PM
              </p>
              <p className="text-sm text-gray-600">
                No smoking inside the room
              </p>
              <p className="text-sm text-gray-600">No pets allowed</p>
            </div>

            {/* Contact */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
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
