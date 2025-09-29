import { Metadata } from "next";
import { Suspense } from "react";
import CheckoutDetail from "@/components/checkout-detail";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Reservation Summary",
};

const CheckoutPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const reservationId = (await params).id;

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 mt-8 sm:mt-12">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl lg:mt-2 font-bold text-orange-600 mb-2 sm:mb-3">
          Reservation Summary
        </h1>
        <p className="text-gray-500 text-base sm:text-lg">
          Please review your reservation details before proceeding.
        </p>
      </div>

      {/* Wide Card Container */}
      <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 lg:p-10 border border-orange-100">
        <Suspense
          fallback={
            <div className="animate-pulse space-y-6">
              <div className="h-6 bg-gray-300 rounded w-1/3"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-40 bg-gray-300 rounded"></div>
                <div className="h-40 bg-gray-300 rounded"></div>
              </div>

              <div className="space-y-4">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          }
        >
          <div className="break-words overflow-x-auto">
            <CheckoutDetail reservationId={reservationId} />
          </div>
        </Suspense>
      </div>
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
    </div>
  );
};

export default CheckoutPage;
