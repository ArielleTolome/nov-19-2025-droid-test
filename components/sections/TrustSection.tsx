import Link from 'next/link';

export default function TrustSection() {
  const features = [
    {
      title: 'Satisfaction Guaranteed',
      description: 'On-time delivery, pickup, and billing or we\'ll make it right',
    },
    {
      title: 'Nationwide Coverage',
      description: 'Serving all 50 states with local expertise and competitive pricing',
    },
    {
      title: 'Expert Support',
      description: 'Our knowledgeable team helps you choose the perfect dumpster size',
    },
    {
      title: 'Transparent Pricing',
      description: 'No hidden fees. Upfront quotes with all costs included',
    },
  ];

  return (
    <section className="py-20">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-4">Why Choose DumpsterRentalPro?</h2>
            <p className="text-xl text-gray-600 mb-8">
              We're committed to making your waste disposal experience seamless and stress-free.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {features.map((feature) => (
                <div key={feature.title}>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
            
            <div className="flex gap-4">
              <Link href="/contact" className="btn-primary">
                Get Your Free Quote
              </Link>
              <Link href="/resources" className="btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-4xl mb-2">★★★★★</div>
              <div className="text-xl font-bold mb-1">Excellent</div>
              <div className="text-3xl font-bold text-blue-600 mb-2">4.8 out of 5</div>
              <div className="text-gray-600">Based on 2,500+ reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
