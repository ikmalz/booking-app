import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { HiCheckCircle } from "react-icons/hi2";

export const metadata: Metadata = {
  title: "Payment Successful",
};

const PaymentSuccess = async ({
  searchParams,
}: {
  searchParams: Promise<{ transaction_status: string }>;
}) => {
  const paymentStatus = (await searchParams).transaction_status;
  if (paymentStatus === "pending") redirect("/payment/pending");
  if (paymentStatus === "failure") redirect("/payment/failure");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white max-w-md w-full rounded-xl shadow-sm border border-gray-100 p-10 text-center">
        <HiCheckCircle className="text-green-500 w-16 h-16 mx-auto mb-6" />
        <h1 className="text-2xl font-semibold text-gray-800 mb-3">
          Payment Successful
        </h1>
        <p className="text-gray-500 mb-1">
          Your payment has been processed securely.
        </p>
        <p className="text-gray-400 mb-8">Thank you and enjoy your stay ✨</p>

        <Link
          href="/myreservation"
          className="inline-flex items-center justify-center w-full rounded-lg bg-indigo-600 text-white font-medium py-3 transition-colors duration-200 hover:bg-indigo-500"
        >
          Go to My Reservation
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
