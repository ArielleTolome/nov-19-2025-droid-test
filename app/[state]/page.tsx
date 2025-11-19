import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

const prisma = new PrismaClient();

export async function generateStaticParams() {
  const states = await prisma.state.findMany();
  return states.map((state) => ({
    state: state.slug,
  }));
}

export async function generateMetadata({ params }: { params: { state: string } }): Promise<Metadata> {
  const state = await prisma.state.findUnique({
    where: { slug: params.state },
  });

  if (!state) {
    return {};
  }

  return {
    title: `Dumpster Rental in ${state.name} | DumpsterRentalPro`,
    description: `Affordable dumpster rentals in ${state.name}. Same-day delivery available. All sizes: 10, 20, 30, 40 yard dumpsters. Free quotes.`,
  };
}

export default async function StatePage({ params }: { params: { state: string } }) {
  const state = await prisma.state.findUnique({
    where: { slug: params.state },
    include: {
      cities: {
        take: 20,
        orderBy: { population: 'desc' },
      },
    },
  });

  if (!state) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Dumpster Rental in {state.name}</h1>
          <p className="text-xl opacity-90">
            Fast, affordable dumpster rentals throughout {state.name}. Same-day delivery available.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-6">Dumpster Rental Services in {state.name}</h2>
            <p className="text-gray-700 mb-6">
              Looking for reliable dumpster rental services in {state.name}? DumpsterRentalPro offers 
              comprehensive waste management solutions for residential, commercial, and construction projects 
              throughout the state. With flexible scheduling and competitive pricing, we make it easy to 
              get the right dumpster for your project.
            </p>
            <p className="text-gray-700 mb-6">
              Whether you're tackling a home renovation, managing a construction site, or handling a 
              commercial cleanout, we have dumpster sizes to fit your needs. Our experienced team 
              understands local regulations and can help ensure your project stays compliant.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Major Cities We Serve in {state.name}</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {state.cities.map((city) => (
                <Link
                  key={city.id}
                  href={`/${state.slug}/${city.slug}`}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition text-center"
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-700 mb-6">
              Get your free quote today and see why thousands of customers in {state.name} choose 
              DumpsterRentalPro for their waste management needs.
            </p>
            <Link href="/contact" className="btn-primary inline-block">
              Get Your Free Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
