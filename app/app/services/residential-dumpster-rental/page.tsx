import React from 'react';
import { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { DumpsterSizeCard } from '@/components/sections/DumpsterSizeCard';
import { FAQ } from '@/components/sections/FAQ';
import { CallToAction } from '@/components/sections/CallToAction';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { QuoteForm } from '@/components/forms/QuoteForm';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Residential Dumpster Rental - Home Cleanout & Renovation Services',
  description: 'Professional residential dumpster rental for home cleanouts, renovations, and yard work. Same-day delivery, flexible rental periods, and driveway protection. Get your free quote today!',
  keywords: 'residential dumpster rental, home dumpster rental, driveway dumpster, home cleanout dumpster, renovation waste removal',
  openGraph: {
    title: 'Residential Dumpster Rental - Affordable Home Waste Solutions',
    description: 'Perfect for home cleanouts, renovations, and yard work. Same-day delivery and flexible rental periods.',
    type: 'website',
  },
};

// Dumpster sizes for residential projects
const residentialSizes = [
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
      'Driveway protection included'
    ],
    href: '/sizes/10-yard-dumpster'
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
      'Kitchen/bathroom remodel',
      'Deck removal',
      'Roof replacement'
    ],
    features: [
      '7-14 day rental period',
      'Most popular for homes',
      'Extended rental available'
    ],
    href: '/sizes/20-yard-dumpster'
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
      'Large whole-home cleanouts',
      'Major renovations',
      'Multi-room remodels',
      'Estate cleanouts'
    ],
    features: [
      '7-14 day rental period',
      'Volume discount available',
      'Heavy debris approved'
    ],
    href: '/sizes/30-yard-dumpster'
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
      'Full home cleanouts',
      'Major renovations',
      'Large estate cleanouts',
      'Moving and downsizing'
    ],
    features: [
      '7-14 day rental period',
      'Highest capacity',
      'Multiple project support'
    ],
    href: '/sizes/40-yard-dumpster'
  }
];

// Service benefits
const benefits = [
  {
    title: 'Driveway Protection',
    description: 'We use protective boards to prevent damage to your driveway, ensuring your property stays in perfect condition.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: 'Same-Day Delivery',
    description: 'Need it fast? We offer same-day delivery in most areas when you order before noon.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: 'Flexible Scheduling',
    description: 'Choose your delivery and pickup dates. Need more time? We offer easy extensions at reasonable rates.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: 'Transparent Pricing',
    description: 'No hidden fees or surprise charges. All costs are clearly outlined in your quote.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Perfect Placement',
    description: 'We carefully position the dumpster where you need it, ensuring easy access throughout your project.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    title: 'Hassle-Free Pickup',
    description: 'When you\'re done, just call us. We\'ll handle all the heavy lifting and disposal.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    )
  }
];

// Ideal use cases
const useCases = [
  {
    category: 'Home Renovations',
    projects: [
      'Kitchen remodeling',
      'Bathroom renovations',
      'Basement finishing',
      'Room additions',
      'Flooring replacement',
      'Cabinet removal'
    ]
  },
  {
    category: 'Cleanouts & Decluttering',
    projects: [
      'Garage cleanouts',
      'Attic clearing',
      'Basement cleanouts',
      'Estate cleanouts',
      'Moving and downsizing',
      'Spring cleaning'
    ]
  },
  {
    category: 'Outdoor Projects',
    projects: [
      'Landscaping debris',
      'Deck removal',
      'Fence replacement',
      'Shed demolition',
      'Tree removal cleanup',
      'Yard waste removal'
    ]
  },
  {
    category: 'Roofing Projects',
    projects: [
      'Shingle removal',
      'Roof replacement',
      'Gutter replacement',
      'Siding removal',
      'Roof tear-off',
      'Storm damage cleanup'
    ]
  }
];

// Pricing information
const pricingDetails = {
  included: [
    'Delivery to your location',
    'Dumpster rental period (7-14 days)',
    'Pickup and hauling',
    'Disposal fees (up to weight limit)',
    'Driveway protection boards',
    '24/7 customer support'
  ],
  additional: [
    'Extended rental: $10-15/day',
    'Overage charges: $50-75/ton',
    'Weekend delivery: $50-75',
    'Same-day delivery: $50 (when available)',
    'Special placement requests',
    'Long-distance fees (over 50 miles)'
  ]
};

// FAQ items
const faqItems = [
  {
    question: 'What size dumpster do I need for my home project?',
    answer: 'For most home renovations, a 20-yard dumpster is perfect. Small cleanouts and minor projects work well with a 10-yard, while whole-home cleanouts or major renovations may require a 30 or 40-yard dumpster. Our team can help you choose based on your specific project details.'
  },
  {
    question: 'Will the dumpster damage my driveway?',
    answer: 'No! We include protective boards under the dumpster at no extra charge. These boards distribute the weight evenly and protect your driveway from scratches, cracks, or other damage. We take great care to preserve your property.'
  },
  {
    question: 'How long can I keep the residential dumpster?',
    answer: 'Standard rental periods are 7-14 days, which is plenty of time for most home projects. If you need more time, we offer flexible extensions at $10-15 per day. Just call us before your rental period ends to arrange an extension.'
  },
  {
    question: 'Can I put furniture and appliances in the dumpster?',
    answer: 'Yes! Most furniture is accepted. However, appliances with freon (refrigerators, air conditioners) require special disposal and additional fees. Mattresses may also have additional fees in some areas due to recycling requirements. Contact us for specific items.'
  },
  {
    question: 'What items are not allowed in residential dumpsters?',
    answer: 'We cannot accept hazardous materials including paint, chemicals, asbestos, batteries, tires, or electronics. We also don\'t accept liquids, propane tanks, or medical waste. We\'ll provide you with a complete list and suggest proper disposal methods for prohibited items.'
  },
  {
    question: 'Do I need a permit for a residential dumpster?',
    answer: 'Usually not! If the dumpster is placed on your private property (driveway, yard), no permit is needed. However, if it must go on the street or public property, a permit from your city may be required. We can help you navigate the permit process if needed.'
  },
  {
    question: 'How much does a residential dumpster rental cost?',
    answer: 'Prices start at $299 for a 10-yard dumpster and go up to $599 for a 40-yard dumpster. This includes delivery, pickup, disposal (up to weight limit), and the rental period. Final pricing depends on your location, dumpster size, and rental duration. Get a free quote for exact pricing.'
  },
  {
    question: 'When should I schedule my dumpster delivery?',
    answer: 'We recommend scheduling delivery 1-2 days before you plan to start your project. This ensures the dumpster is in place when you\'re ready to work. We also offer same-day delivery in most areas if you need it immediately.'
  }
];

export default function ResidentialDumpsterRentalPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Residential Dumpster Rental Services"
        subtitle="Perfect for Homeowners"
        description="Professional dumpster rental for home cleanouts, renovations, and yard projects. Same-day delivery available with driveway protection included at no extra charge."
        primaryCta={{ text: 'Get Free Quote', href: '/quote' }}
        secondaryCta={{ text: 'Call Now', href: 'tel:+15551234567' }}
        stats={[
          { value: '10,000+', label: 'Homes Served' },
          { value: '4', label: 'Dumpster Sizes' },
          { value: '$299+', label: 'Starting Price' },
          { value: '4.9/5', label: 'Customer Rating' }
        ]}
      />

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Homeowners Choose Us
            </h2>
            <p className="text-lg text-gray-600">
              We understand that your home is your biggest investment. That&apos;s why we go the extra mile to protect your property.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center h-full hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Available Sizes Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Available Dumpster Sizes for Your Home
            </h2>
            <p className="text-lg text-gray-600">
              Choose the perfect size for your residential project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {residentialSizes.map((dumpster) => (
              <DumpsterSizeCard key={dumpster.size} dumpster={dumpster} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/sizes">
              <Button variant="outline" size="lg">
                Compare All Sizes in Detail
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ideal Use Cases for Residential Dumpsters
            </h2>
            <p className="text-lg text-gray-600">
              Whatever your home project, we have the right dumpster solution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="h-full">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-4">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {useCase.category}
                    </h3>
                    <ul className="space-y-2">
                      {useCase.projects.map((project, idx) => (
                        <li key={idx} className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{project}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-blue-100">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Transparent Pricing for Homeowners
            </h2>
            <p className="text-lg text-gray-600">
              Know exactly what you&apos;re paying for with our all-inclusive pricing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="bg-white">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">What&apos;s Included</h3>
              </div>
              <ul className="space-y-3">
                {pricingDetails.included.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="bg-white">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Additional Costs</h3>
              </div>
              <ul className="space-y-3">
                {pricingDetails.additional.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Card className="bg-white border-2 border-blue-200 max-w-3xl mx-auto">
              <div className="flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold text-blue-700">Price Match Guarantee:</span> We&apos;ll beat any competitor&apos;s quote for the same service in your area.
                </p>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Quote Form Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Get Your Free Quote Now
              </h2>
              <p className="text-lg text-gray-600">
                Fill out the form below and receive an instant quote for your residential dumpster rental
              </p>
            </div>
            <Card className="bg-gray-50">
              <QuoteForm />
            </Card>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <FAQ
        title="Residential Dumpster Rental FAQs"
        subtitle="Common questions from homeowners"
        items={faqItems}
        defaultOpen={0}
      />

      {/* Final CTA Section */}
      <CallToAction
        title="Ready to Start Your Home Project?"
        description="Get same-day delivery on residential dumpsters with driveway protection included. Our friendly team is here to help you choose the perfect size."
        primaryCta={{ text: 'Get Free Quote', href: '/quote' }}
        secondaryCta={{ text: 'Call (555) 123-4567', href: 'tel:+15551234567' }}
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
