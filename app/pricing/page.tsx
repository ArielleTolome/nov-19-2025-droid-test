import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pricing - DumpsterRentalPro',
  description: 'Transparent dumpster rental pricing. No hidden fees. Get your free quote today.',
};

export default function PricingPage() {
  const sizes = [
    {
      size: '10 Yard',
      price: '$350',
      period: '7-10 days',
      description: 'Perfect for small projects',
      features: ['Garage cleanouts', 'Small roofing jobs', 'Yard waste', 'Basement cleanup'],
    },
    {
      size: '20 Yard',
      price: '$450',
      period: '7-10 days',
      description: 'Most popular size',
      features: ['Whole-home cleanouts', 'Medium construction', 'Large roofing', 'Kitchen/bath remodel'],
      popular: true,
    },
    {
      size: '30 Yard',
      price: '$550',
      period: '7-10 days',
      description: 'Great for large projects',
      features: ['New construction', 'Major demolition', 'Commercial cleanouts', 'Large remodels'],
    },
    {
      size: '40 Yard',
      price: '$650',
      period: '7-10 days',
      description: 'Perfect for very large projects',
      features: ['Industrial projects', 'Large demolition', 'Commercial construction', 'Estate cleanouts'],
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Transparent Pricing</h1>
          <p className="text-xl opacity-90">No hidden fees. Get your free quote today.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-lg text-gray-700 text-center mb-8">
              Our pricing is straightforward and transparent. All prices include delivery, pickup, 
              disposal fees (up to weight limit), and the standard rental period. Additional fees 
              may apply for exceeding weight limits or extending rental periods.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sizes.map((dumpster) => (
              <div
                key={dumpster.size}
                className={`bg-white p-6 rounded-lg shadow-lg relative ${
                  dumpster.popular ? 'border-2 border-blue-600' : ''
                }`}
              >
                {dumpster.popular && (
                  <div className="absolute -top-3 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold mb-2">{dumpster.size}</div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">{dumpster.price}</div>
                  <div className="text-sm text-gray-600">{dumpster.period}</div>
                  <div className="text-sm text-gray-500 mt-1">{dumpster.description}</div>
                </div>
                <ul className="space-y-2 mb-6">
                  {dumpster.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <span className="text-blue-600 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block text-center py-3 rounded-lg font-semibold ${
                    dumpster.popular ? 'btn-primary' : 'btn-secondary'
                  }`}
                >
                  Get Quote
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-blue-50 p-8 rounded-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Pricing Factors</h2>
            <ul className="space-y-3 text-gray-700">
              <li><strong>Location:</strong> Pricing varies by location due to disposal fees and transportation costs</li>
              <li><strong>Dumpster Size:</strong> Larger dumpsters cost more but offer better value for large projects</li>
              <li><strong>Rental Duration:</strong> Standard period is 7-10 days. Extended rentals available for additional fees</li>
              <li><strong>Weight:</strong> Base price includes standard weight limits. Overage charges apply for heavy materials</li>
              <li><strong>Material Type:</strong> Some materials may require special handling or disposal methods</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
