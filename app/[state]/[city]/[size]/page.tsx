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

  const sizes = ['10-yard-dumpster', '20-yard-dumpster', '30-yard-dumpster', '40-yard-dumpster'];

  const params: { state: string; city: string; size: string }[] = [];
  for (const city of cities) {
    for (const size of sizes) {
      params.push({
        state: city.state.slug,
        city: city.slug,
        size,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: { params: { state: string; city: string; size: string } }): Promise<Metadata> {
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

  const sizeName = params.size.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return {
    title: `${sizeName} Rental in ${city.name}, ${city.state.name} | DumpsterRentalPro`,
    description: `Rent a ${sizeName.toLowerCase()} in ${city.name}, ${city.state.name}. Same-day delivery available. Free quotes.`,
  };
}

export default async function CitySizePage({ params }: { params: { state: string; city: string; size: string } }) {
  const city = await prisma.city.findFirst({
    where: {
      slug: params.city,
      state: { slug: params.state },
    },
    include: { state: true },
  });

  const dumpsterSize = await prisma.dumpsterSize.findUnique({
    where: { slug: params.size },
  });

  if (!city || !dumpsterSize) {
    notFound();
  }

  const sizeName = params.size.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">
            {sizeName} Rental in {city.name}, {city.state.name}
          </h1>
          <p className="text-xl opacity-90">
            Affordable {sizeName.toLowerCase()} rentals in {city.name}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-4xl">
          <div className="prose prose-lg mb-12">
            <h2 className="text-3xl font-bold mb-6">
              {sizeName} Rental in {city.name}
            </h2>
            <p className="text-gray-700 mb-6">
              Looking for a {sizeName.toLowerCase()} rental in {city.name}, {city.state.name}? 
              DumpsterRentalPro offers reliable {sizeName.toLowerCase()} rentals for projects 
              throughout the {city.name} area. Our {dumpsterSize.size}-yard dumpsters are perfect 
              for {dumpsterSize.idealFor.join(', ').toLowerCase()} projects.
            </p>
            <p className="text-gray-700 mb-6">
              With dimensions of {dumpsterSize.dimensions} and a capacity of {dumpsterSize.capacity}, 
              our {sizeName.toLowerCase()} is ideal for {dumpsterSize.description.toLowerCase()}. 
              We offer flexible scheduling and competitive pricing to fit your project needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Specifications</h3>
              <ul className="space-y-2">
                <li><strong>Dimensions:</strong> {dumpsterSize.dimensions}</li>
                <li><strong>Capacity:</strong> {dumpsterSize.capacity}</li>
                <li><strong>Base Price:</strong> ${dumpsterSize.basePrice}</li>
                <li><strong>Rental Period:</strong> 7-10 days (extendable)</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Ideal For</h3>
              <ul className="space-y-2">
                {dumpsterSize.idealFor.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-lg mb-12">
            <h3 className="text-xl font-bold mb-4">Service Types Available</h3>
            <div className="flex flex-wrap gap-2">
              <Link href={`/${city.state.slug}/${city.slug}/residential-dumpster-rental`} className="bg-white px-4 py-2 rounded hover:bg-gray-100">
                Residential
              </Link>
              <Link href={`/${city.state.slug}/${city.slug}/commercial-dumpster-rental`} className="bg-white px-4 py-2 rounded hover:bg-gray-100">
                Commercial
              </Link>
              <Link href={`/${city.state.slug}/${city.slug}/construction-dumpster-rental`} className="bg-white px-4 py-2 rounded hover:bg-gray-100">
                Construction
              </Link>
              <Link href={`/${city.state.slug}/${city.slug}/roll-off-dumpster-rental`} className="bg-white px-4 py-2 rounded hover:bg-gray-100">
                Roll-Off
              </Link>
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Get Your Free Quote</h2>
            <p className="text-gray-700 mb-6">
              Ready to rent a {sizeName.toLowerCase()} in {city.name}? Get your free quote today.
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
