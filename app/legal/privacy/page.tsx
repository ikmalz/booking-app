export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-screen-lg mx-auto px-6 py-24">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
        Privacy Policy
      </h1>
      <p className="text-gray-600 mb-10 max-w-2xl">
        At <span className="font-semibold text-gray-800">Star Hotel</span>, we
        respect and protect your privacy. This Privacy Policy explains how we
        collect, use, and safeguard your personal information.
      </p>

      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Information We Collect</h2>
        <p className="text-gray-600">
          We may collect your name, email, phone number, payment details, and booking
          information to provide better service.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">How We Use Your Data</h2>
        <p className="text-gray-600">
          Your data is used only for booking confirmation, customer support, and
          payment processing. We never sell your information to third parties.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">Your Rights</h2>
        <p className="text-gray-600">
          You may request access, correction, or deletion of your personal data by{" "}
          <a href="/contact" className="text-orange-500 hover:underline">contacting us</a>.
        </p>
      </div>
    </div>
  );
}
