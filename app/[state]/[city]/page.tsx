import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

const prisma = new PrismaClient();

export async function generateStaticParams() {
  const cities = await prisma.city.findMany({
    include: { state: true },
    take: 500, // Limit for build time, can be increased
  });

  return cities.map((city) => ({
    state: city.state.slug,
    city: city.slug,
  }));
}

export async function generateMetadata({ params }: { params: { state: string; city: string } }): Promise<Metadata> {
  const city = await prisma.city.findFirst({
    where: {
      slug: params.city,
      state: {
        slug: params.state,
      },
    },
    include: { state: true },
  });

  if (!city) {
    return {};
  }

  return {
    title: `Dumpster Rental in ${city.name}, ${city.state.name} | DumpsterRentalPro`,
    description: `Rent a dumpster in ${city.name}, ${city.state.name}. Same-day delivery available. All sizes: 10, 20, 30, 40 yard dumpsters. Free quotes. Call now!`,
    openGraph: {
      title: `${city.name} Dumpster Rental - Best Prices`,
      description: `Affordable dumpster rentals in ${city.name}, ${city.state.name}`,
    },
  };
}

export default async function CityPage({ params }: { params: { state: string; city: string } }) {
  const city = await prisma.city.findFirst({
    where: {
      slug: params.city,
      state: {
        slug: params.state,
      },
    },
    include: {
      state: true,
    },
  });

  if (!city) {
    notFound();
  }

  // Get nearby cities
  const nearbyCities = await prisma.city.findMany({
    where: {
      stateId: city.stateId,
      id: { not: city.id },
    },
    take: 5,
  });

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">
            Dumpster Rental in {city.name}, {city.state.name}
          </h1>
          <p className="text-xl opacity-90">
            Fast, affordable dumpster rentals in {city.name}. Same-day delivery available.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-4xl">
          <div className="prose prose-lg mb-12">
            <h2 className="text-3xl font-bold mb-6">
              Professional Dumpster Rental Services in {city.name}
            </h2>
            <p className="text-gray-700 mb-6">
              Looking for reliable dumpster rental services in {city.name}, {city.state.name}? 
              DumpsterRentalPro offers comprehensive waste management solutions for residential, 
              commercial, and construction projects throughout the {city.name} area. With flexible 
              scheduling and competitive pricing, we make it easy to get the right dumpster for your project.
            </p>
            <p className="text-gray-700 mb-6">
              Whether you're tackling a home renovation, managing a construction site, or handling 
              a commercial cleanout, we have dumpster sizes to fit your needs. Our experienced team 
              understands local regulations in {city.name} and can help ensure your project stays compliant.
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
              <h3 className="text-xl font-bold mb-4">Service Types</h3>
              <ul className="space-y-2">
                <li><Link href={`/${city.state.slug}/${city.slug}/residential-dumpster-rental`} className="text-blue-600 hover:underline">Residential</Link></li>
                <li><Link href={`/${city.state.slug}/${city.slug}/commercial-dumpster-rental`} className="text-blue-600 hover:underline">Commercial</Link></li>
                <li><Link href={`/${city.state.slug}/${city.slug}/construction-dumpster-rental`} className="text-blue-600 hover:underline">Construction</Link></li>
                <li><Link href={`/${city.state.slug}/${city.slug}/roll-off-dumpster-rental`} className="text-blue-600 hover:underline">Roll-Off</Link></li>
              </ul>
            </div>
          </div>

          {nearbyCities.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-4">Nearby Cities</h3>
              <div className="flex flex-wrap gap-2">
                {nearbyCities.map((nearbyCity) => (
                  <Link
                    key={nearbyCity.id}
                    href={`/${city.state.slug}/${nearbyCity.slug}`}
                    className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200"
                  >
                    {nearbyCity.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="bg-blue-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Get Your Free Quote Today</h2>
            <p className="text-gray-700 mb-6">
              Ready to get started? Get your free quote for dumpster rental in {city.name}, {city.state.name} today.
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
