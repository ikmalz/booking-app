import Image from "next/image";
import { getReservationById } from "@/lib/data";
import { formatDate, formatCurrency } from "@/lib/utils";
import { differenceInCalendarDays } from "date-fns";
import PaymentButton from "@/components/payment-button";

const CheckoutDetail = async ({ reservationId }: { reservationId: string }) => {
  const reservation = await getReservationById(reservationId);
  if (!reservation || !reservation.Payment)
    return <h1 className="text-center text-gray-500">No Reservation Found</h1>;

  const duration = differenceInCalendarDays(
    reservation.endDate,
    reservation.startDate
  );

  return (
    <div className="max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-8 px-4">
      <div className="space-y-6 order-2 lg:order-1">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
          <div className="relative aspect-video">
            <Image
              src={reservation.Room.image}
              alt={reservation.Room.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {reservation.Room.name}
            </h2>
            <p className="text-gray-600 flex items-center gap-2">
              <span className="text-lg font-medium text-gray-800">
                {formatCurrency(reservation.price)}
              </span>
              <span className="text-sm text-gray-400">/ night</span>
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
          <PaymentButton reservation={reservation} />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 order-1 lg:order-2">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          Reservation Details
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Reservation ID</span>
            <span className="font-medium text-gray-800">#{reservation.id}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Name</span>
            <span className="font-medium text-gray-800">
              {reservation.User.name}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Email</span>
            <span className="font-medium text-gray-800 truncate">
              {reservation.User.email}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Phone</span>
            <span className="font-medium text-gray-800">
              {reservation.User.phone}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Arrival</span>
            <span className="font-medium text-gray-800">
              {formatDate(reservation.startDate.toISOString())}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Departure</span>
            <span className="font-medium text-gray-800">
              {formatDate(reservation.endDate.toISOString())}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Duration</span>
            <span className="font-medium text-gray-800">
              {duration} {duration <= 1 ? "Night" : "Nights"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total Amount</span>
            <span className="font-semibold text-gray-900">
              {formatCurrency(reservation.Payment.amount)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Status</span>
            <span
              className={`font-semibold ${
                reservation.Payment.status === "PAID"
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {reservation.Payment.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetail;
