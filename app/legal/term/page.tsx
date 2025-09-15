export default function TermsPage() {
  return (
    <div className="max-w-screen-lg mx-auto px-6 py-24">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
        Terms & Conditions
      </h1>
      <p className="text-gray-600 mb-10 max-w-2xl">
        Welcome to <span className="font-semibold text-gray-800">Star Hotel</span>.  
        By booking a room with us, you agree to comply with the following terms
        and conditions that ensure a safe and pleasant stay for everyone.
      </p>

      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          General Policies
        </h2>
        <ul className="list-disc pl-6 space-y-3 text-gray-700">
          <li>Minimum booking is <strong>1 day</strong> (no hourly bookings).</li>
          <li>All bookings are <strong>non-refundable and non-returnable</strong>.</li>
          <li>Check-in time is <strong>2:00 PM</strong>, check-out time is <strong>12:00 PM</strong>.</li>
          <li>No smoking and no pets are allowed inside the rooms.</li>
        </ul>
      </div>

      <div className="mt-10 bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Agreement
        </h2>
        <p className="text-gray-600">
          By continuing to use our services, you acknowledge that you have read,
          understood, and agreed to be bound by these Terms & Conditions.  
          For any questions, please{" "}
          <a href="/contact" className="text-orange-500 font-medium hover:underline">
            contact us
          </a>.
        </p>
      </div>
    </div>
  );
}
