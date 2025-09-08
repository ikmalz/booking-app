import { getReservationById } from "@/lib/data";
import { notFound } from "next/navigation";
import { formatCurrency, formatDate } from "@/lib/utils";
import { differenceInCalendarDays } from "date-fns";

const ReservationDetail = async ({
  reservationId,
}: {
  reservationId: string;
}) => {
  const reservation = await getReservationById(reservationId);
  if (!reservation) return notFound();

  return (
    <div className="w-full bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-8">
      {/* Top Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <ul className="space-y-4">
          <li className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Reservation ID</span>
            <span className="text-base font-semibold text-gray-900">
              #{reservation.id}
            </span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Book Date</span>
            <span className="text-base font-semibold text-gray-900">
              {formatDate(reservation.createdAt.toISOString())}
            </span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Name</span>
            <span className="text-base font-semibold text-gray-900">
              {reservation.User.name}
            </span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Email</span>
            <span className="text-base font-semibold text-gray-900">
              {reservation.User.email}
            </span>
          </li>
        </ul>

        <ul className="space-y-4">
          <li className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Phone Number</span>
            <span className="text-base font-semibold text-gray-900">
              {reservation.User.phone}
            </span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Payment Method</span>
            <span className="text-base font-semibold capitalize text-gray-900">
              {reservation.Payment?.method
                ? reservation.Payment.method.replace("_", " ")
                : "-"}
            </span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Payment Status</span>
            <span
              className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${
                reservation.Payment?.status === "paid"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {reservation.Payment?.status}
            </span>
          </li>
        </ul>
      </div>

      {/* Table */}
      <div className="mt-10 overflow-x-auto">
        <table className="w-full text-sm text-gray-700 border-collapse">
          <thead>
            <tr className="bg-orange-50 text-xs uppercase text-gray-700">
              <th className="px-6 py-3 text-left">Room</th>
              <th className="px-6 py-3 text-left">Arrival</th>
              <th className="px-6 py-3 text-left">Departure</th>
              <th className="px-6 py-3 text-left">Duration</th>
              <th className="px-6 py-3 text-right">Sub Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">
                    {reservation.Room.name}
                  </span>
                  <span className="text-gray-600 text-xs">
                    Price: {formatCurrency(reservation.price)}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                {formatDate(reservation.startDate.toISOString())}
              </td>
              <td className="px-6 py-4">
                {formatDate(reservation.endDate.toISOString())}
              </td>
              <td className="px-6 py-4">
                {differenceInCalendarDays(
                  reservation.endDate,
                  reservation.startDate
                )}{" "}
                Night
              </td>
              <td className="px-6 py-4 text-right font-semibold text-gray-900">
                {reservation.Payment &&
                  formatCurrency(reservation.Payment.amount)}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="bg-gray-50">
              <td className="px-6 py-4 font-bold" colSpan={2}>
                Total
              </td>
              <td
                className="px-6 py-4 font-bold text-right text-orange-600"
                colSpan={3}
              >
                {reservation.Payment &&
                  formatCurrency(reservation.Payment.amount)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ReservationDetail;
