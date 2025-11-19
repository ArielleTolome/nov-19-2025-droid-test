import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAllStates,
  getStateBySlug,
  getCitiesByState,
  getStatePricing,
  formatStateName,
  State,
} from '@/lib/location';
import { CityGrid } from '@/components/location';
import { Header, Footer } from '@/components/layout';

interface StatePageProps {
  params: Promise<{
    state: string;
  }>;
}

// Generate static params for all 50 states
export async function generateStaticParams() {
  const states = getAllStates();
  return states.map((state) => ({
    state: state.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: StatePageProps): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const state = getStateBySlug(stateSlug);

  if (!state) {
    return {
      title: 'State Not Found',
    };
  }

  const cities = getCitiesByState(stateSlug);

  return {
    title: `Dumpster Rental in ${state.name} | Affordable Roll-Off Dumpsters`,
    description: `Rent a dumpster in ${state.name}. We serve ${cities.length}+ cities including ${cities
      .slice(0, 5)
      .map((c) => c.name)
      .join(', ')}. Get instant pricing and same-day delivery.`,
    keywords: `dumpster rental ${state.name}, roll-off dumpster ${state.abbreviation}, waste removal ${state.name}`,
    openGraph: {
      title: `Dumpster Rental in ${state.name}`,
      description: `Professional dumpster rental services across ${state.name}. Serving ${cities.length}+ cities.`,
      type: 'website',
    },
  };
}

export default async function StatePage({ params }: StatePageProps) {
  const { state: stateSlug } = await params;
  const state = getStateBySlug(stateSlug);

  if (!state) {
    notFound();
  }

  const cities = getCitiesByState(stateSlug);
  const pricing = getStatePricing(stateSlug);

  // Sort cities by population
  const sortedCities = cities.sort((a, b) => b.population - a.population);
  const topCities = sortedCities.slice(0, 12);
  const totalPopulation = cities.reduce((sum, city) => sum + city.population, 0);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Dumpster Rental in {state.name}
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                Affordable Roll-Off Dumpsters Across {state.abbreviation}
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-lg">
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Same-Day Delivery
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {cities.length}+ Cities Served
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Transparent Pricing
                </div>
              </div>
              <div className="mt-8">
                <Link
                  href="#quote"
                  className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  Get Instant Quote
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Service Area Stats */}
        <section className="py-12 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-blue-600">
                  {cities.length}+
                </p>
                <p className="text-gray-600 mt-2">Cities Served</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-600">
                  {(totalPopulation / 1000000).toFixed(1)}M+
                </p>
                <p className="text-gray-600 mt-2">People We Serve</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-600">24/7</p>
                <p className="text-gray-600 mt-2">Customer Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Cities Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Top Cities in {state.name}
              </h2>
              <p className="text-lg text-gray-600">
                Select your city to see local pricing and service details
              </p>
            </div>
            <CityGrid cities={topCities} stateSlug={stateSlug} />

            {cities.length > 12 && (
              <div className="mt-12 text-center">
                <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                  View All {cities.length} Cities in {state.name} →
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-white" id="pricing">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Pricing in {state.name}
              </h2>
              <p className="text-lg text-gray-600">
                Transparent, upfront pricing for all dumpster sizes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(pricing).map(([size, info]) => (
                <div
                  key={size}
                  className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200 hover:border-blue-600 transition-all duration-200"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {size.replace('yard', ' Yard')}
                  </h3>
                  <p className="text-3xl font-bold text-blue-600 mb-2">
                    ${info.price}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">{info.description}</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      7-day rental
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Free delivery
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Free pickup
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What cities do you serve in {state.name}?
                </h3>
                <p className="text-gray-700">
                  We serve {cities.length}+ cities across {state.name}, including{' '}
                  {topCities
                    .slice(0, 5)
                    .map((c) => c.name)
                    .join(', ')}
                  , and many more. Select your city above to see if we serve your
                  area.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How quickly can I get a dumpster delivered in {state.name}?
                </h3>
                <p className="text-gray-700">
                  We offer same-day delivery in most cities across {state.name}.
                  Contact us before noon for same-day service, or schedule for a
                  convenient time that works for you.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What can I put in a dumpster rental in {state.name}?
                </h3>
                <p className="text-gray-700">
                  You can dispose of most household debris, construction waste,
                  yard waste, and general junk. Prohibited items include
                  hazardous materials, chemicals, paint, tires, and electronics.
                  Check with your local {state.name} facility for specific
                  regulations.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Do I need a permit for a dumpster in {state.name}?
                </h3>
                <p className="text-gray-700">
                  Permit requirements vary by city in {state.name}. Generally, if
                  the dumpster is placed on private property, no permit is needed.
                  If it's on a public street, you may need a permit. We can help
                  guide you through the permit process.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white" id="quote">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Rent a Dumpster in {state.name}?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get an instant quote and schedule your delivery today
            </p>
            <div className="max-w-md mx-auto bg-white rounded-lg p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                    Select Your City
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    <option value="">Choose a city...</option>
                    {sortedCities.map((city) => (
                      <option key={city.slug} value={city.slug}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                    Dumpster Size
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    <option value="10yard">10 Yard - ${pricing['10yard'].price}</option>
                    <option value="20yard">20 Yard - ${pricing['20yard'].price}</option>
                    <option value="30yard">30 Yard - ${pricing['30yard'].price}</option>
                    <option value="40yard">40 Yard - ${pricing['40yard'].price}</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                >
                  Get Instant Quote
                </button>
              </form>
              <p className="text-sm text-gray-600 mt-4">
                No credit card required. Instant pricing.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
