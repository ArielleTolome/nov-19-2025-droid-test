import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-20">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Fast, Reliable Dumpster Rentals for Any Project
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Nationwide coverage, on-time delivery guaranteed. From small cleanouts to major construction projects, we have the perfect dumpster size for your needs.
            </p>
            
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">50,000+</div>
                <div className="text-sm text-gray-600">Dumpsters Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">98%</div>
                <div className="text-sm text-gray-600">On-Time Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">4.8/5</div>
                <div className="text-sm text-gray-600">Customer Rating</div>
              </div>
            </div>
            
            <div className="flex gap-4 flex-wrap">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                Get Instant Quote
              </Link>
              <a href="tel:1-800-DUMPSTER" className="btn-secondary text-lg px-8 py-4">
                Call 1-800-DUMPSTER
              </a>
            </div>
          </div>
          
          <div>
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <span className="text-gray-400">Hero Image Placeholder</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
