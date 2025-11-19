import Link from 'next/link';

export default function DumpsterSizesPreview() {
  const sizes = [
    {
      size: '10 Yard',
      title: 'Small Projects',
      features: ['Perfect for garage cleanouts', 'Small roofing jobs', 'Yard waste removal', 'Basement cleanup'],
      specs: ['12\' x 8\' x 3.5\'', '2 tons weight limit'],
      popular: false,
    },
    {
      size: '20 Yard',
      title: 'Medium Projects',
      features: ['Whole-home cleanouts', 'Medium construction', 'Large roofing projects', 'Kitchen/bath remodeling'],
      specs: ['22\' x 8\' x 4\'', '3 tons weight limit'],
      popular: true,
    },
    {
      size: '30 Yard',
      title: 'Large Projects',
      features: ['New construction', 'Major demolition', 'Commercial cleanouts', 'Large remodels'],
      specs: ['22\' x 8\' x 6\'', '4 tons weight limit'],
      popular: false,
    },
    {
      size: '40 Yard',
      title: 'Very Large Projects',
      features: ['Industrial projects', 'Large demolition', 'Commercial construction', 'Estate cleanouts'],
      specs: ['22\' x 8\' x 8\'', '5-6 tons weight limit'],
      popular: false,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Perfect Size for Every Project</h2>
          <p className="text-xl text-gray-600">From small home cleanouts to major construction sites</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sizes.map((dumpster) => (
            <div
              key={dumpster.size}
              className={`bg-white p-6 rounded-lg shadow-md relative ${dumpster.popular ? 'border-2 border-blue-600' : ''}`}
            >
              {dumpster.popular && (
                <div className="absolute -top-3 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Most Popular
                </div>
              )}
              <div className="text-3xl font-bold mb-2">{dumpster.size}</div>
              <h3 className="text-xl font-semibold mb-4">{dumpster.title}</h3>
              <ul className="space-y-2 mb-4 text-sm text-gray-600">
                {dumpster.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="border-t pt-4 mb-4 text-sm text-gray-600">
                {dumpster.specs.map((spec, idx) => (
                  <div key={idx}>{spec}</div>
                ))}
              </div>
              <Link
                href={`/dumpster-sizes#${dumpster.size.toLowerCase().replace(' ', '-')}`}
                className={`block text-center py-2 rounded-lg font-semibold ${
                  dumpster.popular ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
