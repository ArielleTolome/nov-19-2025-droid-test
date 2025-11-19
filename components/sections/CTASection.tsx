import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="container text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Tackle Your Project?</h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of satisfied customers who choose DumpsterRentalPro for fast, reliable waste solutions.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/contact" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition">
            Get Your Free Quote
          </Link>
          <a href="tel:1-800-DUMPSTER" className="bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-900 transition border border-blue-700">
            Call 1-800-DUMPSTER
          </a>
        </div>
      </div>
    </section>
  );
}
