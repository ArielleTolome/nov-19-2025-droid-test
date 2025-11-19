import Link from 'next/link';

export default function ServicePreview() {
  const services = [
    {
      title: 'Residential',
      description: 'Home cleanouts, renovations, landscaping, and yard waste removal',
      link: '/services/residential-dumpster-rental',
    },
    {
      title: 'Construction',
      description: 'New construction, remodeling, debris management, and site cleanup',
      link: '/services/construction-dumpster-rental',
    },
    {
      title: 'Commercial',
      description: 'Business renovations, office cleanouts, retail updates, and industrial waste',
      link: '/services/commercial-dumpster-rental',
    },
    {
      title: 'Special Waste',
      description: 'Concrete, roofing shingles, yard waste, and other specialized debris',
      link: '/services/special-waste-disposal',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Solutions for Every Project Type</h2>
          <p className="text-xl text-gray-600">Specialized dumpster rentals for residential, commercial, and industrial needs</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div key={service.title} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link href={service.link} className="text-blue-600 font-semibold hover:underline">
                {service.title} Services →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
