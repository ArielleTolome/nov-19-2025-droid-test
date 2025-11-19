import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dumpster Rental Services - DumpsterRentalPro',
  description: 'Comprehensive dumpster rental services for residential, commercial, construction, and special waste projects.',
};

export default function ServicesPage() {
  const services = [
    {
      title: 'Residential Dumpster Rental',
      slug: 'residential-dumpster-rental',
      description: 'Perfect for home cleanouts, renovations, landscaping, and yard waste removal.',
      features: ['Home cleanouts', 'Renovations', 'Landscaping', 'Yard waste removal', 'Garage cleanouts'],
    },
    {
      title: 'Commercial Dumpster Rental',
      slug: 'commercial-dumpster-rental',
      description: 'Business renovations, office cleanouts, retail updates, and industrial waste management.',
      features: ['Business renovations', 'Office cleanouts', 'Retail updates', 'Industrial waste', 'Warehouse cleanouts'],
    },
    {
      title: 'Construction Dumpster Rental',
      slug: 'construction-dumpster-rental',
      description: 'New construction, remodeling, debris management, and site cleanup.',
      features: ['New construction', 'Remodeling', 'Debris management', 'Site cleanup', 'Demolition'],
    },
    {
      title: 'Roll-Off Dumpster Rental',
      slug: 'roll-off-dumpster-rental',
      description: 'Versatile roll-off dumpsters for any project type.',
      features: ['Multiple sizes', 'Flexible scheduling', 'Any project type', 'Quick delivery', 'Easy pickup'],
    },
    {
      title: 'Special Waste Disposal',
      slug: 'special-waste-disposal',
      description: 'Concrete, roofing shingles, yard waste, and other specialized debris.',
      features: ['Concrete disposal', 'Roofing materials', 'Yard waste', 'Hazardous materials', 'Specialized handling'],
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl opacity-90">Comprehensive dumpster rental solutions for every project</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.slug} className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services/${service.slug}`}
                  className="btn-primary inline-block w-full text-center"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
