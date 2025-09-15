export default function PaymentPolicyPage() {
  return (
    <div className="max-w-screen-lg mx-auto px-6 py-24">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
        Payment Policy
      </h1>
      <p className="text-gray-600 mb-10 max-w-2xl">
        To confirm your booking at <span className="font-semibold text-gray-800">Star Hotel</span>,
        payments must be completed securely online.
      </p>

      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Accepted Methods</h2>
        <p className="text-gray-600">
          We accept major credit/debit cards, PayPal, and secure bank transfers.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">Refunds</h2>
        <p className="text-gray-600">
          Please note that all bookings are <strong>non-refundable</strong>. Once
          payment is confirmed, cancellations or changes will not be refunded.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">Security</h2>
        <p className="text-gray-600">
          All transactions are encrypted and processed through secure payment gateways.
        </p>
      </div>
    </div>
  );
}
