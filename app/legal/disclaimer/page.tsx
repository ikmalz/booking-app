export default function DisclaimerPage() {
  return (
    <div className="max-w-screen-lg mx-auto px-6 py-24">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Disclaimer</h1>
      <p className="text-gray-600 mb-10 max-w-2xl">
        The information provided on the <span className="font-semibold text-gray-800">Star Hotel</span>{" "}
        website is for general purposes only. While we strive to keep information
        accurate and up to date, we make no warranties about its completeness or
        reliability.
      </p>

      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Liability</h2>
        <p className="text-gray-600">
          Star Hotel is not responsible for any losses, damages, or inconveniences
          resulting from the use of this website or our services.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">External Links</h2>
        <p className="text-gray-600">
          Our site may contain links to third-party websites. We are not
          responsible for their content or policies.
        </p>
      </div>
    </div>
  );
}
