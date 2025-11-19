import type { Metadata } from 'next';
import QuoteForm from '@/components/forms/QuoteForm';

export const metadata: Metadata = {
  title: 'Contact Us - Get Your Free Quote | DumpsterRentalPro',
  description: 'Get your free dumpster rental quote today. Contact DumpsterRentalPro for fast, affordable dumpster rentals.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Get Your Free Quote</h1>
          <p className="text-xl opacity-90">Fill out the form below and we'll get back to you within 24 hours</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-4xl">
          <QuoteForm />
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-bold mb-2">Call Us</h3>
              <p className="text-gray-600">1-800-DUMPSTER</p>
              <p className="text-sm text-gray-500 mt-1">Mon-Fri 8am-6pm EST</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="text-gray-600">info@dumpsterrentalpro.com</p>
              <p className="text-sm text-gray-500 mt-1">We respond within 24 hours</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-bold mb-2">Service Area</h3>
              <p className="text-gray-600">All 50 States</p>
              <p className="text-sm text-gray-500 mt-1">Nationwide coverage</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
