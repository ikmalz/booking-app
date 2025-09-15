export default function LegalPage() {
  return (
    <div className="max-w-screen-md mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Legal Information</h1>
      <p className="text-gray-600 mb-8">
        Here you can find all the important legal information regarding your use of Star Hotel’s services. 
        Please take a moment to review the documents below for clarity on our policies and terms.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Terms & Conditions
          </h2>
          <p className="text-gray-600 mb-3">
            Learn about the rules for booking, check-in, check-out, and other important guidelines when staying with us.
          </p>
          <a
            href="/legal/term"
            className="text-orange-500 font-medium hover:underline"
          >
            Read Terms & Conditions →
          </a>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Privacy Policy
          </h2>
          <p className="text-gray-600 mb-3">
            Understand how we collect, use, and protect your personal data while using our website and services.
          </p>
          <a
            href="/legal/privacy"
            className="text-orange-500 font-medium hover:underline"
          >
            Read Privacy Policy →
          </a>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Payment Policy
          </h2>
          <p className="text-gray-600 mb-3">
            Details about accepted payment methods, booking guarantees, and non-refundable rules.
          </p>
          <a
            href="/legal/payment"
            className="text-orange-500 font-medium hover:underline"
          >
            Read Payment Policy →
          </a>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Disclaimer
          </h2>
          <p className="text-gray-600 mb-3">
            Information provided on this website is for general purposes only. Actual hotel conditions, availability, 
            and services may vary without prior notice.
          </p>
          <a
            href="/legal/disclaimer"
            className="text-orange-500 font-medium hover:underline"
          >
            Read Disclaimer →
          </a>
        </section>
      </div>
    </div>
  );
}
