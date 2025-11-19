
import React from 'react';
import { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { ServiceGrid } from '@/components/sections/ServiceGrid';
import { DumpsterSizeCard } from '@/components/sections/DumpsterSizeCard';
import { FAQ } from '@/components/sections/FAQ';
import { CallToAction } from '@/components/sections/CallToAction';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Home - Affordable Dumpster Rental Services',
  description: 'Rent dumpsters for residential, commercial, and construction projects. Same-day delivery, flexible rental periods, and competitive pricing. Get your free quote today!',
  openGraph: {
    title: 'Dumpster Rental - Affordable & Reliable Waste Solutions',
    description: 'Rent dumpsters for residential, commercial, and construction projects. Same-day delivery available.',
    type: 'website',
  },
};

// Dumpster sizes data
const dumpsterSizes = [
  {
    name: '10 Yard',
    size: '10 YD',
    dimensions: { length: 14, width: 8, height: 3 },
    capacity: '4 pickup trucks',
    weight: '2-3 tons',
    price: '$299',
    priceUnit: 'starting at',
    popular: false,
    bestFor: [
      'Small cleanouts',
      'Garage or attic clearing',
      'Minor landscaping',
      'Small bathroom remodel'
    ],
    features: [
      '3-7 day rental period',
      'Free delivery & pickup',
      'No hidden fees'
    ],
    href: '/sizes#10-yard'
  },
  {
    name: '20 Yard',
    size: '20 YD',
    dimensions: { length: 22, width: 8, height: 4 },
    capacity: '8 pickup trucks',
    weight: '4-6 tons',
    price: '$399',
    priceUnit: 'starting at',
    popular: true,
    bestFor: [
      'Medium home cleanouts',
      'Deck or shed removal',
      'Kitchen/bathroom remodel',
      'Roof replacement'
    ],
    features: [
      '7-14 day rental period',
      'Free delivery & pickup',
      'Extended rental available'
    ],
    href: '/sizes#20-yard'
  },
  {
    name: '30 Yard',
    size: '30 YD',
    dimensions: { length: 22, width: 8, height: 6 },
    capacity: '12 pickup trucks',
    weight: '6-8 tons',
    price: '$499',
    priceUnit: 'starting at',
    popular: false,
    bestFor: [
      'Large cleanouts',
      'New construction',
      'Major home additions',
      'Commercial projects'
    ],
    features: [
      '7-14 day rental period',
      'Free delivery & pickup',
      'Volume discount available'
    ],
    href: '/sizes#30-yard'
  },
  {
    name: '40 Yard',
    size: '40 YD',
    dimensions: { length: 22, width: 8, height: 8 },
    capacity: '16 pickup trucks',
    weight: '8-10 tons',
    price: '$599',
    priceUnit: 'starting at',
    popular: false,
    bestFor: [
      'Large construction sites',
      'Commercial demolition',
      'Full home cleanouts',
      'Major renovations'
    ],
    features: [
      '7-14 day rental period',
      'Free delivery & pickup',
      'Commercial discounts'
    ],
    href: '/sizes#40-yard'
  }
];

// Services data
const services = [
  {
    title: 'Residential Dumpsters',
    description: 'Perfect for home cleanouts, renovations, and yard work. We deliver right to your driveway.',
    iconName: 'residential' as const,
    features: [
      'Same-day delivery available',
      'Flexible rental periods',
      'Driveway-friendly placement'
    ],
    href: '/services/residential'
  },
  {
    title: 'Commercial Dumpsters',
    description: 'Reliable waste solutions for businesses, offices, and retail locations.',
    iconName: 'commercial' as const,
    features: [
      'Scheduled pickups',
      'Volume discounts',
      'Dedicated account manager'
    ],
    href: '/services/commercial'
  },
  {
    title: 'Construction Dumpsters',
    description: 'Heavy-duty containers for construction debris, demolition, and building materials.',
    iconName: 'construction' as const,
    features: [
      'High weight limits',
      'Extended rental periods',
      'Job site delivery'
    ],
    href: '/services/construction'
  }
];

// FAQ data
const faqItems = [
  {
    question: 'How quickly can I get a dumpster delivered?',
    answer: 'We offer same-day or next-day delivery in most areas. Simply place your order before 12 PM, and we\'ll do our best to deliver the same day. For guaranteed delivery times, contact our team directly.'
  },
  {
    question: 'What size dumpster do I need?',
    answer: 'The size depends on your project scope. A 10-yard is great for small cleanouts, 20-yard for medium renovations, 30-yard for large projects, and 40-yard for major construction. Our team can help you choose the right size based on your needs.'
  },
  {
    question: 'What items are prohibited in dumpsters?',
    answer: 'Prohibited items typically include hazardous materials, chemicals, paint, tires, batteries, electronics, and appliances with freon. We can provide a complete list and suggest proper disposal methods for these items.'
  },
  {
    question: 'How long can I keep the dumpster?',
    answer: 'Standard rental periods are 7-14 days, depending on the size. Need it longer? We offer flexible extensions at reasonable daily rates. Just let us know, and we\'ll work with your schedule.'
  },
  {
    question: 'What is your pricing structure?',
    answer: 'Our pricing includes delivery, pickup, disposal fees, and the rental period. Prices start at $299 for a 10-yard dumpster. We provide upfront, transparent pricing with no hidden fees. Request a free quote for exact pricing based on your location and needs.'
  }
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Affordable Dumpster Rentals Delivered Fast"
        subtitle="Professional Waste Solutions"
        description="From home cleanouts to major construction projects, we provide the right dumpster size at the right price. Same-day delivery available in most areas."
        primaryCta={{ text: 'Get Free Quote', href: '/quote' }}
        secondaryCta={{ text: 'View All Sizes', href: '/sizes' }}
        stats={[
          { value: '10,000+', label: 'Dumpsters Delivered' },
          { value: '24/7', label: 'Customer Support' },
          { value: '50+', label: 'Service Locations' },
          { value: '4.9/5', label: 'Customer Rating' }
        ]}
      />

      {/* Quick Quote Form Section */}
      <section className="py-16 md:py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Get Your Free Quote in 60 Seconds
              </h2>
              <p className="text-lg text-gray-600">
                Tell us about your project and get instant pricing
              </p>
            </div>

            <Card className="bg-gray-50">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="zipcode" className="block text-sm font-semibold text-gray-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      id="zipcode"
                      name="zipcode"
                      placeholder="Enter your ZIP code"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="size" className="block text-sm font-semibold text-gray-700 mb-2">
                      Dumpster Size *
                    </label>
                    <select
                      id="size"
                      name="size"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      required
                    >
                      <option value="">Select a size</option>
                      <option value="10">10 Yard - Small Projects</option>
                      <option value="20">20 Yard - Medium Projects</option>
                      <option value="30">30 Yard - Large Projects</option>
                      <option value="40">40 Yard - Major Projects</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="project" className="block text-sm font-semibold text-gray-700 mb-2">
                      Project Type *
                    </label>
                    <select
                      id="project"
                      name="project"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      required
                    >
                      <option value="">Select project type</option>
                      <option value="residential">Residential Cleanout</option>
                      <option value="construction">Construction</option>
                      <option value="renovation">Home Renovation</option>
                      <option value="roofing">Roofing</option>
                      <option value="landscaping">Landscaping</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="delivery" className="block text-sm font-semibold text-gray-700 mb-2">
                      Delivery Date *
                    </label>
                    <input
                      type="date"
                      id="delivery"
                      name="delivery"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" fullWidth>
                  Get Instant Quote
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  By submitting, you agree to receive calls and texts about your quote. Standard message rates may apply.
                </p>
              </form>
            </Card>
          </div>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Getting your dumpster is as easy as 1-2-3-4
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Choose Your Size',
                description: 'Select the dumpster size that fits your project needs. Not sure? Our team can help!',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                )
              },
              {
                step: '2',
                title: 'Schedule Delivery',
                description: 'Pick your delivery date and time. We offer same-day delivery in most areas.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                step: '3',
                title: 'Fill It Up',
                description: 'Take your time filling the dumpster. We offer flexible rental periods to match your schedule.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                )
              },
              {
                step: '4',
                title: 'We Haul It Away',
                description: 'When you\'re done, we pick it up and handle all the disposal. It\'s that simple!',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                )
              }
            ].map((item) => (
              <div key={item.step} className="relative">
                <Card className="text-center h-full hover:shadow-xl transition-shadow duration-300">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                    {item.step}
                  </div>
                  <div className="w-16 h-16 mx-auto mt-8 mb-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Dumpster Sizes Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose the Perfect Size
            </h2>
            <p className="text-lg text-gray-600">
              We have the right dumpster for every project, from small cleanouts to major construction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dumpsterSizes.map((dumpster) => (
              <DumpsterSizeCard key={dumpster.size} dumpster={dumpster} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/sizes">
              <Button variant="outline" size="lg">
                Compare All Sizes
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Services Section */}
      <ServiceGrid services={services} />

      {/* Trust/Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Thousands of Customers
            </h2>
            <p className="text-lg text-gray-600">
              See what our customers have to say about our service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Homeowner',
                rating: 5,
                text: 'Excellent service from start to finish! The dumpster was delivered on time, and pickup was seamless. Pricing was transparent with no hidden fees. Highly recommend!',
                project: 'Kitchen Renovation'
              },
              {
                name: 'Mike Chen',
                role: 'Contractor',
                rating: 5,
                text: 'We use them for all our construction projects. Reliable, professional, and always on schedule. Their 30-yard dumpsters are perfect for our needs.',
                project: 'Commercial Construction'
              },
              {
                name: 'Jennifer Martinez',
                role: 'Property Manager',
                rating: 5,
                text: 'Great experience! Customer service was helpful in choosing the right size. The process was simple, and they were very accommodating with our schedule.',
                project: 'Estate Cleanout'
              }
            ].map((testimonial, index) => (
              <Card key={index} className="h-full">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="mt-auto pt-4 border-t border-gray-200">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-blue-600 font-medium mt-1">{testimonial.project}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: '10,000+', label: 'Happy Customers' },
              { value: '15+', label: 'Years Experience' },
              { value: '24/7', label: 'Support Available' },
              { value: '4.9/5', label: 'Average Rating' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <FAQ items={faqItems} defaultOpen={0} />

      {/* Final CTA Section */}
      <CallToAction
        title="Ready to Get Started?"
        description="Get your free quote today and experience hassle-free dumpster rental service. Same-day delivery available!"
        primaryCta={{ text: 'Get Free Quote', href: '/quote' }}
        secondaryCta={{ text: 'Call Now', href: 'tel:+15551234567' }}
        contactInfo={{
          phone: '(555) 123-4567',
          email: 'info@dumpsterrental.com'
        }}
        variant="gradient"
        size="lg"
      />
    </>
  );
}
