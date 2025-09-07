import { getReservations } from "@/lib/data";
import Image from "next/image";
import { formatDate, formatCurrency } from "@/lib/utils";

const ReservationList = async () => {
  const reservation = await getReservations();
  if (!reservation || reservation.length === 0)
    return (
      <p className="text-center text-gray-500 py-6">No Reservation Found</p>
    );

  return (
    <div className="bg-white p-6 mt-6 shadow-xl rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 w-32 font-semibold text-gray-600 uppercase">
                Image
              </th>
              <th className="px-6 py-3 font-semibold text-gray-600 uppercase">
                Name
              </th>
              <th className="px-6 py-3 font-semibold text-gray-600 uppercase">
                Room
              </th>
              <th className="px-6 py-3 font-semibold text-gray-600 uppercase">
                Arrival
              </th>
              <th className="px-6 py-3 font-semibold text-gray-600 uppercase">
                Departure
              </th>
              <th className="px-6 py-3 font-semibold text-gray-600 uppercase">
                Price
              </th>
              <th className="px-6 py-3 font-semibold text-gray-600 uppercase">
                Created At
              </th>
              <th className="px-6 py-3 font-semibold text-gray-600 uppercase text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reservation.map((reserve) => (
              <tr
                className="hover:bg-gray-50 transition-colors"
                key={reserve.id}
              >
                <td className="px-6 py-4">
                  <div className="h-16 w-28 relative rounded-lg overflow-hidden shadow-sm">
                    <Image
                      src={reserve.Room.image}
                      fill
                      sizes="20vw"
                      alt="room image"
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">{reserve.User.name}</td>
                <td className="px-6 py-4">{reserve.Room.name}</td>
                <td className="px-6 py-4">
                  {formatDate(reserve.startDate.toISOString())}
                </td>
                <td className="px-6 py-4">
                  {formatDate(reserve.endDate.toISOString())}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-700">
                  {formatCurrency(reserve.price)}
                </td>
                <td className="px-6 py-4">
                  {formatDate(reserve.createdAt.toISOString())}
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                      reserve.Payment?.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : reserve.Payment?.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : reserve.Payment?.status === "canceled"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {reserve.Payment?.status || "unknown"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationList;
