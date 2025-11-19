import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAllCities,
  getCityByStateAndSlug,
  getStateBySlug,
  getNearbyCities,
  getCityPricing,
} from '@/lib/location';
import {
  ServiceAreaMap,
  LocalPricing,
  NearbyCities,
} from '@/components/location';
import { Header, Footer } from '@/components/layout';

interface CityPageProps {
  params: Promise<{
    state: string;
    city: string;
  }>;
}

// Generate static params for all cities
export async function generateStaticParams() {
  const cities = getAllCities();
  return cities.map((city) => ({
    state: city.stateSlug,
    city: city.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { state: stateSlug, city: citySlug } = await params;
  const city = getCityByStateAndSlug(stateSlug, citySlug);
  const state = getStateBySlug(stateSlug);

  if (!city || !state) {
    return {
      title: 'City Not Found',
    };
  }

  return {
    title: `Dumpster Rental in ${city.name}, ${state.abbreviation} | Same-Day Delivery`,
    description: `Rent a dumpster in ${city.name}, ${state.name}. Professional roll-off dumpster rental with same-day delivery. Serving ${city.zipCodes.length}+ ZIP codes. Get instant pricing today.`,
    keywords: `dumpster rental ${city.name}, ${city.name} ${state.abbreviation} dumpster, roll-off dumpster ${city.name}, waste removal ${city.name}`,
    openGraph: {
      title: `Dumpster Rental in ${city.name}, ${state.abbreviation}`,
      description: `Professional dumpster rental services in ${city.name}. Same-day delivery available.`,
      type: 'website',
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { state: stateSlug, city: citySlug } = await params;
  const city = getCityByStateAndSlug(stateSlug, citySlug);
  const state = getStateBySlug(stateSlug);

  if (!city || !state) {
    notFound();
  }

  const nearbyCities = getNearbyCities(stateSlug, citySlug, 6);
  const pricing = getCityPricing(citySlug, stateSlug);

  // Schema.org LocalBusiness structured data
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://yoursite.com/${stateSlug}/${citySlug}`,
    name: `Dumpster Rental ${city.name}`,
    description: `Professional dumpster rental services in ${city.name}, ${state.abbreviation}`,
    url: `https://yoursite.com/${stateSlug}/${citySlug}`,
    telephone: '1-800-DUMPSTER',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: city.name,
      addressRegion: state.abbreviation,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: city.latitude,
      longitude: city.longitude,
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Dumpster Rental Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '10 Yard Dumpster Rental',
            description: pricing['10yard'].description,
          },
          price: pricing['10yard'].price,
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '20 Yard Dumpster Rental',
            description: pricing['20yard'].description,
          },
          price: pricing['20yard'].price,
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '30 Yard Dumpster Rental',
            description: pricing['30yard'].description,
          },
          price: pricing['30yard'].price,
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '40 Yard Dumpster Rental',
            description: pricing['40yard'].description,
          },
          price: pricing['40yard'].price,
          priceCurrency: 'USD',
        },
      ],
    },
  };

  const dumpsterSizes = [
    {
      size: '10 Yard',
      dimensions: '12\' × 8\' × 3.5\'',
      capacity: '3-4 pickup truck loads',
      bestFor: 'Small cleanups, minor renovations',
      icon: '🗑️',
    },
    {
      size: '20 Yard',
      dimensions: '22\' × 8\' × 4.5\'',
      capacity: '6-8 pickup truck loads',
      bestFor: 'Medium renovations, roof replacements',
      icon: '📦',
    },
    {
      size: '30 Yard',
      dimensions: '22\' × 8\' × 6\'',
      capacity: '9-12 pickup truck loads',
      bestFor: 'Large renovations, new construction',
      icon: '🏗️',
    },
    {
      size: '40 Yard',
      dimensions: '22\' × 8\' × 8\'',
      capacity: '12-16 pickup truck loads',
      bestFor: 'Major construction, commercial projects',
      icon: '🚧',
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center text-blue-200 mb-4">
                  <Link
                    href={`/${stateSlug}`}
                    className="hover:text-white transition-colors"
                  >
                    {state.name}
                  </Link>
                  <span className="mx-2">/</span>
                  <span className="text-white">{city.name}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Dumpster Rental in {city.name}
                </h1>
                <p className="text-xl text-blue-100 mb-6">
                  Professional roll-off dumpster rental with same-day delivery
                  available
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="#quote"
                    className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
                  >
                    Get Instant Quote
                  </Link>
                  <Link
                    href="#pricing"
                    className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 border-2 border-blue-500"
                  >
                    View Pricing
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-700 bg-opacity-50 rounded-lg p-4 backdrop-blur">
                  <p className="text-3xl font-bold">Same Day</p>
                  <p className="text-blue-200">Delivery Available</p>
                </div>
                <div className="bg-blue-700 bg-opacity-50 rounded-lg p-4 backdrop-blur">
                  <p className="text-3xl font-bold">4 Sizes</p>
                  <p className="text-blue-200">10-40 Yard Options</p>
                </div>
                <div className="bg-blue-700 bg-opacity-50 rounded-lg p-4 backdrop-blur">
                  <p className="text-3xl font-bold">24/7</p>
                  <p className="text-blue-200">Customer Support</p>
                </div>
                <div className="bg-blue-700 bg-opacity-50 rounded-lg p-4 backdrop-blur">
                  <p className="text-3xl font-bold">{city.zipCodes.length}+</p>
                  <p className="text-blue-200">ZIP Codes Served</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Area Map */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Service Area in {city.name}
              </h2>
              <p className="text-lg text-gray-600">
                We proudly serve all {city.zipCodes.length} ZIP codes in {city.name}, {state.abbreviation}
              </p>
            </div>
            <ServiceAreaMap city={city} />
          </div>
        </section>

        {/* Available Dumpster Sizes */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Available Dumpster Sizes
              </h2>
              <p className="text-lg text-gray-600">
                Choose the perfect size for your project in {city.name}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dumpsterSizes.map((dumpster, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 border-2 border-gray-200 hover:border-blue-600 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {dumpster.size}
                      </h3>
                      <p className="text-sm text-gray-600">{dumpster.dimensions}</p>
                    </div>
                    <span className="text-4xl">{dumpster.icon}</span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-700">
                      <span className="font-semibold">Capacity:</span>{' '}
                      {dumpster.capacity}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Best for:</span>{' '}
                      {dumpster.bestFor}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-2xl font-bold text-blue-600">
                      ${pricing[dumpster.size.replace(' Yard', 'yard') as keyof typeof pricing].price}
                    </p>
                    <p className="text-sm text-gray-600">7-day rental included</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Calculator */}
        <section className="py-16 bg-white" id="pricing">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <LocalPricing
              pricing={pricing}
              cityName={city.name}
              stateName={state.name}
            />
          </div>
        </section>

        {/* Local FAQs */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {city.name} Dumpster Rental FAQ
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Do you offer same-day dumpster delivery in {city.name}?
                </h3>
                <p className="text-gray-700">
                  Yes! We offer same-day delivery to most areas in {city.name},{' '}
                  {state.abbreviation}. Contact us before noon to schedule
                  same-day service. We serve all {city.zipCodes.length} ZIP codes
                  in {city.name}.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What ZIP codes do you serve in {city.name}?
                </h3>
                <p className="text-gray-700">
                  We serve all ZIP codes in {city.name}, including{' '}
                  {city.zipCodes.slice(0, 5).join(', ')}
                  {city.zipCodes.length > 5 && `, and ${city.zipCodes.length - 5} more`}.
                  Enter your ZIP code when requesting a quote for exact pricing.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How much does a dumpster rental cost in {city.name}?
                </h3>
                <p className="text-gray-700">
                  Dumpster rental prices in {city.name} start at $
                  {pricing['10yard'].price} for a 10-yard dumpster. Prices vary
                  based on size, rental period, and location. Use our pricing
                  calculator above for an instant quote.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Do I need a permit for a dumpster in {city.name}?
                </h3>
                <p className="text-gray-700">
                  In {city.name}, {state.abbreviation}, you typically don&apos;t need a
                  permit if the dumpster is placed on your private property. If
                  you need to place it on a public street, you may need a permit
                  from the {city.name} city office. We can help guide you through
                  the permit process.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What can I put in a dumpster rental in {city.name}?
                </h3>
                <p className="text-gray-700">
                  You can dispose of most household debris, construction materials,
                  yard waste, and general junk. Prohibited items include hazardous
                  waste, chemicals, paint, tires, batteries, and electronics.
                  Contact us if you&apos;re unsure about specific items.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How long can I keep the dumpster in {city.name}?
                </h3>
                <p className="text-gray-700">
                  Our standard rental period in {city.name} is 7 days. If you need
                  the dumpster longer, we offer flexible extensions at competitive
                  daily rates. Just let us know your timeline when booking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Nearby Cities */}
        {nearbyCities.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <NearbyCities cities={nearbyCities} />
            </div>
          </section>
        )}

        {/* Quote Form */}
        <section className="py-16 bg-blue-600 text-white" id="quote">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Get Your Free Quote for {city.name}
              </h2>
              <p className="text-xl text-blue-100">
                Fast, easy, and transparent pricing
              </p>
            </div>
            <div className="bg-white rounded-lg p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                      <option value="">Select ZIP code...</option>
                      {city.zipCodes.map((zip) => (
                        <option key={zip} value={zip}>
                          {zip}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dumpster Size
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                      <option value="10yard">10 Yard - ${pricing['10yard'].price}</option>
                      <option value="20yard">20 Yard - ${pricing['20yard'].price}</option>
                      <option value="30yard">30 Yard - ${pricing['30yard'].price}</option>
                      <option value="40yard">40 Yard - ${pricing['40yard'].price}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Details (Optional)
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Get Instant Quote
                </button>
                <p className="text-center text-sm text-gray-600">
                  No credit card required. Free instant quote for {city.name}
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
