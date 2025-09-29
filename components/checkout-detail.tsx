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
    <div className="max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-8 px-4 sm:px-6 lg:px-0">
      {/* Left Section */}
      <div className="space-y-6 order-2 lg:order-1">
        {/* Room Info */}
        <div className="bg-white border border-orange-100 rounded-2xl shadow-lg overflow-hidden">
          <div className="relative aspect-video">
            <Image
              src={reservation.Room.image}
              alt={reservation.Room.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {reservation.Room.name}
            </h2>
            <p className="text-gray-600 flex items-center gap-2">
              <span className="text-xl font-semibold text-orange-600">
                {formatCurrency(reservation.price)}
              </span>
              <span className="text-sm text-gray-400">/ night</span>
            </p>
          </div>
        </div>

        {/* Payment Button */}
        <div className="bg-white rounded-2xl shadow-md border border-orange-100 p-6">
          <PaymentButton reservation={reservation} />
        </div>
      </div>

      {/* Right Section - Reservation Details */}
      <div className="bg-white border border-orange-100 rounded-2xl shadow-lg p-6 order-1 lg:order-2">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Reservation Details
        </h3>
        <div className="grid gap-4 text-sm">
          <DetailRow label="Reservation ID" value={`#${reservation.id}`} />
          <DetailRow label="Name" value={reservation.User.name} />
          <DetailRow label="Email" value={reservation.User.email} isTruncate />
          <DetailRow label="Phone" value={reservation.User.phone} />
          <DetailRow
            label="Arrival"
            value={formatDate(reservation.startDate.toISOString())}
          />
          <DetailRow
            label="Departure"
            value={formatDate(reservation.endDate.toISOString())}
          />
          <DetailRow
            label="Duration"
            value={`${duration} ${duration <= 1 ? "Night" : "Nights"}`}
          />

          {/* Highlight Total */}
          <div className="flex justify-between items-center bg-orange-50 px-4 py-3 rounded-lg">
            <span className="text-gray-600 font-medium">Total Amount</span>
            <span className="text-lg font-bold text-orange-700">
              {formatCurrency(reservation.Payment.amount)}
            </span>
          </div>

          {/* Status Badge */}
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Status</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                reservation.Payment.status === "PAID"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
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

const DetailRow = ({
  label,
  value,
  isTruncate,
}: {
  label: string;
  value: string | number | null | undefined;
  isTruncate?: boolean;
}) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-500">{label}</span>
    <span
      className={`font-medium text-gray-800 text-right ${
        isTruncate ? "truncate max-w-[220px]" : ""
      } ml-4`}
      title={isTruncate && value ? String(value) : undefined}
    >
      {value ?? "—"}
    </span>
  </div>
);

export default CheckoutDetail;
