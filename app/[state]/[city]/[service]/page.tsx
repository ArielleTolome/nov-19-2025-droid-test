import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

const prisma = new PrismaClient();

export async function generateStaticParams() {
  const cities = await prisma.city.findMany({
    include: { state: true },
    take: 500,
  });

  const services = ['residential-dumpster-rental', 'commercial-dumpster-rental', 'construction-dumpster-rental', 'roll-off-dumpster-rental'];

  const params: { state: string; city: string; service: string }[] = [];
  for (const city of cities) {
    for (const service of services) {
      params.push({
        state: city.state.slug,
        city: city.slug,
        service,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: { params: { state: string; city: string; service: string } }): Promise<Metadata> {
  const city = await prisma.city.findFirst({
    where: {
      slug: params.city,
      state: { slug: params.state },
    },
    include: { state: true },
  });

  if (!city) {
    return {};
  }

  const serviceName = params.service.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return {
    title: `${serviceName} in ${city.name}, ${city.state.name} | DumpsterRentalPro`,
    description: `${serviceName} services in ${city.name}, ${city.state.name}. Same-day delivery available. Free quotes.`,
  };
}

export default async function CityServicePage({ params }: { params: { state: string; city: string; service: string } }) {
  const city = await prisma.city.findFirst({
    where: {
      slug: params.city,
      state: { slug: params.state },
    },
    include: { state: true },
  });

  if (!city) {
    notFound();
  }

  const serviceName = params.service.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">
            {serviceName} in {city.name}, {city.state.name}
          </h1>
          <p className="text-xl opacity-90">
            Professional {serviceName.toLowerCase()} services in {city.name}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-4xl">
          <div className="prose prose-lg mb-12">
            <h2 className="text-3xl font-bold mb-6">
              {serviceName} Services in {city.name}
            </h2>
            <p className="text-gray-700 mb-6">
              Looking for {serviceName.toLowerCase()} services in {city.name}, {city.state.name}? 
              DumpsterRentalPro offers comprehensive {serviceName.toLowerCase()} solutions for 
              projects throughout the {city.name} area. With flexible scheduling and competitive 
              pricing, we make it easy to get the right dumpster for your {serviceName.toLowerCase()} needs.
            </p>
            <p className="text-gray-700 mb-6">
              Our experienced team understands the unique requirements of {serviceName.toLowerCase()} 
              projects in {city.name} and can help ensure your project stays compliant with local 
              regulations. We offer same-day delivery in most areas and flexible rental periods 
              to fit your schedule.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Available Sizes</h3>
              <ul className="space-y-2">
                <li><Link href={`/${city.state.slug}/${city.slug}/10-yard-dumpster`} className="text-blue-600 hover:underline">10 Yard Dumpster</Link></li>
                <li><Link href={`/${city.state.slug}/${city.slug}/20-yard-dumpster`} className="text-blue-600 hover:underline">20 Yard Dumpster</Link></li>
                <li><Link href={`/${city.state.slug}/${city.slug}/30-yard-dumpster`} className="text-blue-600 hover:underline">30 Yard Dumpster</Link></li>
                <li><Link href={`/${city.state.slug}/${city.slug}/40-yard-dumpster`} className="text-blue-600 hover:underline">40 Yard Dumpster</Link></li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Why Choose Us</h3>
              <ul className="space-y-2">
                <li>✓ Same-day delivery available</li>
                <li>✓ Competitive pricing</li>
                <li>✓ Flexible rental periods</li>
                <li>✓ Expert support</li>
                <li>✓ Environmentally responsible disposal</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Get Your Free Quote</h2>
            <p className="text-gray-700 mb-6">
              Ready to get started with {serviceName.toLowerCase()} in {city.name}? Get your free quote today.
            </p>
            <Link href="/contact" className="btn-primary inline-block">
              Request Your Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
