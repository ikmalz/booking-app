// components/my-reserve-list.tsx

import Image from "next/image";
import { getReservationByUserId } from "@/lib/data";
import { notFound } from "next/navigation";
import { formatCurrency, formatDate } from "@/lib/utils";
import { differenceInCalendarDays } from "date-fns";
import Link from "next/link";

const MyReserveList = async () => {
  const reservation = await getReservationByUserId();
  if (!reservation) return notFound();

  return (
    <div className="space-y-6">
      {reservation.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between bg-orange-50 px-4 py-3">
            <h1 className="text-sm font-semibold text-gray-800 truncate">
              Reservation ID: #{item.id}
            </h1>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Status:</span>
              <span
                className={`px-2 py-0.5 rounded-md text-xs font-bold uppercase ${
                  item.Payment?.status === "paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {item.Payment?.status}
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            <Image
              src={item.Room.image}
              width={500}
              height={300}
              alt="Room image"
              className="object-cover w-full h-60 md:h-auto md:w-1/3"
            />

            <div className="flex-1 px-4 py-4 flex flex-col justify-between">
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span className="font-medium">Price</span>
                  <span>{formatCurrency(item.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Arrival</span>
                  <span>{formatDate(item.startDate.toISOString())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Departure</span>
                  <span>{formatDate(item.endDate.toISOString())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Duration</span>
                  <span>
                    {differenceInCalendarDays(item.endDate, item.startDate)}{" "}
                    Night
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sub Total</span>
                  <span>
                    {item.Payment && formatCurrency(item.Payment.amount)}
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="mt-4 flex justify-end">
                {item.Payment?.status === "unpaid" ? (
                  <Link
                    href={`/checkout/${item.id}`}
                    className="px-5 py-2 text-sm rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
                  >
                    Pay Now
                  </Link>
                ) : (
                  <Link
                    href={`/myreservation/${item.id}`}
                    className="px-5 py-2 text-sm rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
                  >
                    View Detail
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyReserveList;
