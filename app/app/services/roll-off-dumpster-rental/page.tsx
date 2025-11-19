import React from 'react';
import { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { DumpsterSizeCard } from '@/components/sections/DumpsterSizeCard';
import { FAQ } from '@/components/sections/FAQ';
import { CallToAction } from '@/components/sections/CallToAction';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import QuoteForm from '@/components/forms/QuoteForm';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Roll Off Dumpster Rental - Convenient Delivery & Pickup Service',
  description: 'Professional roll off dumpster rental for any project size. Easy loading from ground level, flexible rental periods, and reliable service. Get your free quote today!',
  keywords: 'roll off dumpster rental, roll-off container, open top dumpster, roll off waste container, dumpster delivery service',
  openGraph: {
    title: 'Roll Off Dumpster Rental - Easy Loading & Convenient Service',
    description: 'Roll off containers for residential, commercial, and construction projects. Easy loading, flexible rental, and reliable delivery.',
    type: 'website',
  },
};

// All available roll-off sizes
const rollOffSizes = [
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
      'Small projects',
      'Garage cleanouts',
      'Minor renovations',
      'Yard waste'
    ],
    features: [
      'Easy walk-in loading',
      'Fits in tight spaces',
      'Perfect for small projects'
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
      'Home renovations',
      'Roof replacements',
      'Medium cleanouts',
      'Deck removal'
    ],
    features: [
      'Most versatile size',
      'Ground-level loading',
      'Fits most driveways'
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
      'Large renovations',
      'New construction',
      'Commercial projects',
      'Major cleanouts'
    ],
    features: [
      'High capacity',
      'Easy rear loading',
      'Commercial-grade'
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
      'Large construction',
      'Major demolition',
      'Commercial buildings',
      'Multi-unit properties'
    ],
    features: [
      'Maximum capacity',
      'Heavy-duty construction',
      'Long-term rental options'
    ],
    href: '/sizes/40-yard-dumpster'
  }
];

// Benefits of roll-off dumpsters
const benefits = [
  {
    title: 'Easy Ground-Level Loading',
    description: 'Roll-off dumpsters feature an open top and rear door, making it easy to walk materials right in or use equipment to load.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
      </svg>
    )
  },
  {
    title: 'Convenient Delivery',
    description: 'We roll the dumpster off our truck and place it exactly where you need it on your property or job site.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    )
  },
  {
    title: 'Flexible Rental Periods',
    description: 'Keep your roll-off dumpster for as long as you need, with easy extensions available at daily rates.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'All Project Types',
    description: 'Perfect for residential, commercial, and construction projects of any size and scope.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    title: 'Safe & Secure',
    description: 'Heavy-duty construction with secure sides keeps your debris contained and your site clean.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: 'Quick Pickup',
    description: 'When you\'re done, just call us. We\'ll pick up the dumpster and handle all disposal for you.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }
];

// How roll-off dumpsters work
const howItWorks = [
  {
    step: '1',
    title: 'Choose Your Size',
    description: 'Select the roll-off dumpster size that fits your project needs. Our team can help you choose if you\'re unsure.',
    image: '📏'
  },
  {
    step: '2',
    title: 'Schedule Delivery',
    description: 'Pick your delivery date and location. We\'ll roll the dumpster off our truck and position it perfectly.',
    image: '🚛'
  },
  {
    step: '3',
    title: 'Load Your Debris',
    description: 'Walk materials in through the rear door or toss them over the sides. The open top makes loading easy.',
    image: '📦'
  },
  {
    step: '4',
    title: 'We Haul It Away',
    description: 'Call when you\'re ready for pickup. We\'ll remove the dumpster and dispose of everything properly.',
    image: '✓'
  }
];

// Comparison with other types
const comparisonFeatures = [
  {
    feature: 'Loading Style',
    rollOff: 'Ground-level, walk-in rear door',
    traditional: 'Over-the-side only'
  },
  {
    feature: 'Delivery Method',
    rollOff: 'Rolled off truck bed',
    traditional: 'Lifted and placed'
  },
  {
    feature: 'Size Range',
    rollOff: '10-40 cubic yards',
    traditional: 'Limited sizes'
  },
  {
    feature: 'Best For',
    rollOff: 'All project types',
    traditional: 'Ongoing waste service'
  },
  {
    feature: 'Rental Period',
    rollOff: 'Flexible (days to months)',
    traditional: 'Usually fixed'
  },
  {
    feature: 'Capacity',
    rollOff: 'High volume debris',
    traditional: 'Regular waste streams'
  }
];

// Common uses
const commonUses = [
  {
    category: 'Residential Projects',
    examples: [
      'Home renovations and remodeling',
      'Spring cleaning and decluttering',
      'Garage, attic, and basement cleanouts',
      'Landscaping and yard cleanup',
      'Moving and downsizing',
      'Estate cleanouts'
    ]
  },
  {
    category: 'Commercial Projects',
    examples: [
      'Office renovations',
      'Retail store updates',
      'Restaurant remodels',
      'Property management',
      'Warehouse cleanouts',
      'Facility maintenance'
    ]
  },
  {
    category: 'Construction Projects',
    examples: [
      'New construction',
      'Demolition work',
      'Roof tear-offs and replacement',
      'Concrete and asphalt removal',
      'Site development',
      'Remodeling projects'
    ]
  },
  {
    category: 'Special Events',
    examples: [
      'Community cleanups',
      'Event waste management',
      'Storm debris removal',
      'Seasonal maintenance',
      'Large-scale projects',
      'Municipal services'
    ]
  }
];

// FAQ items
const faqItems = [
  {
    question: 'What is a roll-off dumpster?',
    answer: 'A roll-off dumpster is an open-top waste container that gets delivered to your location on a specialized truck. It "rolls off" the truck bed using a hydraulic system, hence the name. These dumpsters feature a rear door that swings open for easy walk-in loading, and high sides to contain your debris.'
  },
  {
    question: 'How is a roll-off different from a regular dumpster?',
    answer: 'Roll-off dumpsters are temporary rentals designed for specific projects, while regular dumpsters (like you see behind stores) are typically permanent fixtures for ongoing waste. Roll-offs feature ground-level loading, much larger capacity, and are delivered/picked up per your schedule. They\'re perfect for one-time projects rather than continuous use.'
  },
  {
    question: 'How much space do I need for a roll-off dumpster?',
    answer: 'A 10-yard dumpster needs about 14 feet of length, while 20-40 yard sizes need 22 feet. You also need 10-12 feet of width and at least 23 feet of overhead clearance for delivery. Most residential driveways can accommodate up to a 20-yard dumpster. We can help assess your space before delivery.'
  },
  {
    question: 'Can I put anything in a roll-off dumpster?',
    answer: 'Roll-off dumpsters accept most household junk, construction debris, yard waste, and general waste. However, hazardous materials, chemicals, paint, tires, batteries, and appliances with freon are prohibited. Each rental comes with a complete list of accepted and prohibited items.'
  },
  {
    question: 'How long can I keep a roll-off dumpster?',
    answer: 'Standard rental periods are 7-14 days depending on the size. However, we offer flexible extensions at daily rates of $10-15 per day. For construction projects, we can arrange longer rental periods (30-90 days) at discounted rates. Just let us know how long you need it.'
  },
  {
    question: 'Do I need to be present for delivery or pickup?',
    answer: 'No, you don\'t need to be present as long as we have clear instructions on where to place the dumpster. We do recommend being available for the initial delivery to confirm placement. For pickup, just ensure the area around the dumpster is clear and accessible.'
  },
  {
    question: 'What if the roll-off dumpster gets full before my project is done?',
    answer: 'No problem! Just call us and we\'ll schedule a swap. We\'ll pick up the full dumpster and deliver an empty one, usually within 24-48 hours. Swap fees are much more economical than renting two dumpsters simultaneously.'
  },
  {
    question: 'How much does roll-off dumpster rental cost?',
    answer: 'Prices start at $299 for a 10-yard dumpster and range up to $599 for a 40-yard. This includes delivery, rental period, pickup, disposal (up to weight limit), and all fees. Final cost depends on your location, size needed, rental duration, and material type. Get a free quote for exact pricing.'
  }
];

export default function RollOffDumpsterRentalPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Roll Off Dumpster Rental Services"
        subtitle="Easy Loading, Convenient Delivery"
        description="Professional roll-off dumpster rental for any project. Easy ground-level loading, flexible rental periods, and reliable delivery. Perfect for residential, commercial, and construction projects."
        primaryCta={{ text: 'Get Free Quote', href: '/quote' }}
        secondaryCta={{ text: 'Call (555) 123-4567', href: 'tel:+15551234567' }}
        stats={[
          { value: '15,000+', label: 'Deliveries' },
          { value: '4', label: 'Sizes Available' },
          { value: '$299+', label: 'Starting Price' },
          { value: 'Same-Day', label: 'Delivery Available' }
        ]}
      />

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Roll-Off Dumpsters?
            </h2>
            <p className="text-lg text-gray-600">
              The most convenient and versatile waste removal solution for projects of all sizes
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

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Roll-Off Rental Works
            </h2>
            <p className="text-lg text-gray-600">
              Simple, straightforward process from order to pickup
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item) => (
              <Card key={item.step} className="text-center h-full relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                  {item.step}
                </div>
                <div className="text-6xl mb-4 mt-8">
                  {item.image}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Available Sizes Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Roll-Off Dumpster Sizes
            </h2>
            <p className="text-lg text-gray-600">
              From small home projects to large commercial jobs, we have the perfect size
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {rollOffSizes.map((dumpster) => (
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

      {/* Comparison Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-blue-100">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Roll-Off vs. Traditional Dumpsters
            </h2>
            <p className="text-lg text-gray-600">
              Understand the key differences and why roll-offs are ideal for projects
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Feature</th>
                      <th className="px-6 py-4 text-left font-semibold">Roll-Off Dumpsters</th>
                      <th className="px-6 py-4 text-left font-semibold">Traditional Dumpsters</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-6 py-4 font-semibold text-gray-900">{item.feature}</td>
                        <td className="px-6 py-4 text-gray-700">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {item.rollOff}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{item.traditional}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Common Uses Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Common Uses for Roll-Off Dumpsters
            </h2>
            <p className="text-lg text-gray-600">
              Versatile solutions for every type of project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {commonUses.map((use, index) => (
              <Card key={index} className="h-full">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-3">
                    {index + 1}
                  </span>
                  {use.category}
                </h3>
                <ul className="space-y-2">
                  {use.examples.map((example, idx) => (
                    <li key={idx} className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="text-gray-700">{example}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Quote Form Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Get Your Roll-Off Dumpster Quote
              </h2>
              <p className="text-lg text-gray-600">
                Quick and easy - get your instant quote in 60 seconds
              </p>
            </div>
            <Card className="bg-white">
              <QuoteForm />
            </Card>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <FAQ
        title="Roll-Off Dumpster FAQs"
        subtitle="Everything you need to know about roll-off rental"
        items={faqItems}
        defaultOpen={0}
      />

      {/* Final CTA Section */}
      <CallToAction
        title="Ready to Rent a Roll-Off Dumpster?"
        description="Get easy loading, convenient delivery, and flexible rental periods. Same-day delivery available in most areas. Start your project today!"
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
