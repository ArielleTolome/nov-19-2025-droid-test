import { QuoteForm } from '@/components/forms';

export const metadata = {
  title: 'Get a Free Quote | Dumpster Rental',
  description: 'Get an instant quote for dumpster rental services. Choose your size, location, and delivery date.',
};

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get Your Free Quote Today
          </h1>
          <p className="text-xl md:text-2xl text-blue-100">
            Fast, affordable dumpster rental services in your area
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-blue-600 text-4xl mb-3">⚡</div>
              <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">
                Same-day or next-day delivery available
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-blue-600 text-4xl mb-3">💰</div>
              <h3 className="font-bold text-lg mb-2">Best Prices</h3>
              <p className="text-gray-600 text-sm">
                Competitive rates with no hidden fees
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-blue-600 text-4xl mb-3">✓</div>
              <h3 className="font-bold text-lg mb-2">Easy Process</h3>
              <p className="text-gray-600 text-sm">
                Simple 3-step quote process
              </p>
            </div>
          </div>

          {/* Quote Form */}
          <QuoteForm />

          {/* Additional Info */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-3 text-blue-900">
              What Happens Next?
            </h3>
            <ol className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-2">1.</span>
                <span>We will review your quote request within 1-2 hours</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-2">2.</span>
                <span>A specialist will contact you to confirm details and pricing</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-2">3.</span>
                <span>Schedule your delivery and we&apos;ll handle the rest!</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
