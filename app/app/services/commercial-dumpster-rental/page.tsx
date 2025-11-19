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
  title: 'Commercial Dumpster Rental - Business Waste Management Solutions',
  description: 'Professional commercial dumpster rental for businesses, retail locations, and property management. Scheduled pickups, volume discounts, and dedicated account management available.',
  keywords: 'commercial dumpster rental, business waste management, retail dumpster service, office waste removal, property management dumpsters',
  openGraph: {
    title: 'Commercial Dumpster Rental - Reliable Business Waste Solutions',
    description: 'Scheduled pickups, volume discounts, and dedicated support for businesses of all sizes.',
    type: 'website',
  },
};

// Dumpster sizes for commercial projects
const commercialSizes = [
  {
    name: '20 Yard',
    size: '20 YD',
    dimensions: { length: 22, width: 8, height: 4 },
    capacity: '8 pickup trucks',
    weight: '4-6 tons',
    price: '$379',
    priceUnit: 'starting at',
    popular: true,
    bestFor: [
      'Retail stores',
      'Small offices',
      'Restaurant renovations',
      'Light commercial work'
    ],
    features: [
      'Flexible scheduling',
      'Volume discounts',
      'Priority service'
    ],
    href: '/sizes/20-yard-dumpster'
  },
  {
    name: '30 Yard',
    size: '30 YD',
    dimensions: { length: 22, width: 8, height: 6 },
    capacity: '12 pickup trucks',
    weight: '6-8 tons',
    price: '$479',
    priceUnit: 'starting at',
    popular: true,
    bestFor: [
      'Medium businesses',
      'Multi-unit properties',
      'Commercial cleanouts',
      'Retail renovations'
    ],
    features: [
      'Extended rental periods',
      'Account management',
      'Multiple pickups available'
    ],
    href: '/sizes/30-yard-dumpster'
  },
  {
    name: '40 Yard',
    size: '40 YD',
    dimensions: { length: 22, width: 8, height: 8 },
    capacity: '16 pickup trucks',
    weight: '8-10 tons',
    price: '$579',
    priceUnit: 'starting at',
    popular: false,
    bestFor: [
      'Large commercial sites',
      'Property management',
      'Major renovations',
      'Multi-location businesses'
    ],
    features: [
      'Highest capacity',
      'Corporate discounts',
      'Dedicated support team'
    ],
    href: '/sizes/40-yard-dumpster'
  }
];

// Service benefits
const benefits = [
  {
    title: 'Dedicated Account Manager',
    description: 'Get a single point of contact who understands your business needs and ensures seamless service.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  {
    title: 'Scheduled Pickups',
    description: 'Set up regular pickup schedules that work with your business operations and peak times.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: 'Volume Discounts',
    description: 'Save more with high-volume contracts. The more you use our services, the more you save.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Flexible Contracts',
    description: 'From one-time rentals to long-term contracts, we tailor our services to your business needs.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    title: 'Priority Service',
    description: 'Commercial clients get priority scheduling and faster response times for urgent needs.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: 'Compliance Support',
    description: 'We help ensure your waste disposal meets all local and federal regulations.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  }
];

// Industries served
const industries = [
  {
    name: 'Retail & Shopping Centers',
    description: 'Keep your retail space clean and customer-ready with regular waste removal.',
    projects: [
      'Store renovations',
      'Seasonal cleanouts',
      'Display removal',
      'Inventory disposal',
      'Back-room organization',
      'Parking lot cleanup'
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    )
  },
  {
    name: 'Restaurants & Hospitality',
    description: 'Manage waste from kitchen remodels, equipment upgrades, and seasonal updates.',
    projects: [
      'Kitchen renovations',
      'Dining room updates',
      'Equipment disposal',
      'Deep cleaning projects',
      'Outdoor area cleanup',
      'Event waste management'
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    name: 'Office Buildings',
    description: 'Efficient waste solutions for office renovations, moves, and regular maintenance.',
    projects: [
      'Office renovations',
      'Furniture disposal',
      'Cubicle removal',
      'Carpet replacement',
      'Move-out cleanups',
      'Building updates'
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    name: 'Property Management',
    description: 'Multi-unit properties get dedicated support for tenant turnovers and maintenance.',
    projects: [
      'Tenant cleanouts',
      'Unit renovations',
      'Common area updates',
      'Seasonal maintenance',
      'Emergency cleanup',
      'Building improvements'
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    name: 'Warehouses & Distribution',
    description: 'Handle large-scale waste from warehouse operations and facility updates.',
    projects: [
      'Warehouse cleanouts',
      'Pallet disposal',
      'Equipment removal',
      'Facility upgrades',
      'Loading dock cleanup',
      'Inventory purges'
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  },
  {
    name: 'Manufacturing',
    description: 'Heavy-duty waste removal for manufacturing facilities and production areas.',
    projects: [
      'Production waste',
      'Equipment disposal',
      'Facility renovations',
      'Material disposal',
      'Plant updates',
      'Safety upgrades'
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  }
];

// Pricing tiers
const pricingTiers = [
  {
    name: 'One-Time Service',
    description: 'Perfect for single projects or occasional needs',
    features: [
      'Standard pricing',
      'Flexible scheduling',
      'All sizes available',
      'No commitment',
      '7-14 day rental',
      '24/7 support'
    ],
    ideal: 'Best for: Occasional projects, renovations, one-time cleanouts'
  },
  {
    name: 'Monthly Contract',
    description: 'Regular service with preferred pricing',
    features: [
      '10% discount on rentals',
      'Priority scheduling',
      'Account manager',
      'Flexible terms',
      'Multiple locations',
      'Invoice billing'
    ],
    ideal: 'Best for: Regular waste needs, property management, retail'
  },
  {
    name: 'Annual Agreement',
    description: 'Best value for high-volume needs',
    features: [
      'Up to 25% discount',
      'Dedicated account team',
      'Custom pickup schedules',
      'Emergency service',
      'Multi-location support',
      'Custom reporting'
    ],
    ideal: 'Best for: Large businesses, chains, property management companies'
  }
];

// FAQ items
const faqItems = [
  {
    question: 'What size dumpster do most businesses need?',
    answer: 'Most commercial clients find that 20-30 yard dumpsters work best. Retail stores and small offices typically use 20-yard dumpsters, while larger facilities, restaurants, and property management companies prefer 30 or 40-yard containers. We can help you determine the right size based on your specific business needs.'
  },
  {
    question: 'Do you offer volume discounts for businesses?',
    answer: 'Yes! We offer tiered pricing based on your usage volume. Monthly contracts receive 10% discounts, while annual agreements can save up to 25%. Multi-location businesses get additional discounts. Contact us for a custom quote based on your projected needs.'
  },
  {
    question: 'Can we set up a regular pickup schedule?',
    answer: 'Absolutely! We specialize in scheduled commercial pickups. Whether you need weekly, bi-weekly, or monthly service, we\'ll create a schedule that works with your business operations. Your dedicated account manager will ensure consistent, reliable service.'
  },
  {
    question: 'What if we need an emergency pickup?',
    answer: 'Commercial contract clients get priority emergency service. Just call your account manager or our 24/7 hotline, and we\'ll dispatch a truck as quickly as possible. Emergency pickups for contract clients are typically provided within 24 hours at no additional charge.'
  },
  {
    question: 'Do you provide service to multiple locations?',
    answer: 'Yes! We have experience managing waste services for multi-location businesses and chains. You\'ll get a single point of contact, consolidated billing, and consistent service across all your locations. Special volume discounts apply for multi-location agreements.'
  },
  {
    question: 'Can you help with waste compliance and reporting?',
    answer: 'Yes! We provide detailed service reports, weight tickets, and disposal documentation to help you maintain compliance with local, state, and federal regulations. We can also assist with LEED certification documentation and waste diversion reporting.'
  },
  {
    question: 'What payment terms do you offer for businesses?',
    answer: 'We offer flexible payment terms for commercial clients including net-30 invoice billing, automatic monthly billing, and corporate purchase orders. Contract clients can set up recurring billing with consolidated monthly invoicing for multiple locations.'
  },
  {
    question: 'How quickly can you deliver a commercial dumpster?',
    answer: 'Commercial clients get priority scheduling. For contract clients, we typically deliver within 24-48 hours. Same-day delivery is often available for urgent needs. We work around your business hours and can deliver during off-peak times to minimize disruption.'
  }
];

export default function CommercialDumpsterRentalPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Commercial Dumpster Rental Services"
        subtitle="Reliable Waste Solutions for Businesses"
        description="Professional dumpster rental for retail, restaurants, offices, and property management. Get dedicated account management, volume discounts, and scheduled pickups tailored to your business needs."
        primaryCta={{ text: 'Get Business Quote', href: '/quote' }}
        secondaryCta={{ text: 'Call (555) 123-4567', href: 'tel:+15551234567' }}
        stats={[
          { value: '500+', label: 'Business Clients' },
          { value: '25%', label: 'Max Discount' },
          { value: '24/7', label: 'Support' },
          { value: '48hr', label: 'Delivery Time' }
        ]}
      />

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Businesses Choose Us
            </h2>
            <p className="text-lg text-gray-600">
              We understand the unique waste management needs of commercial operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center h-full hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center text-green-600">
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
              Commercial Dumpster Sizes
            </h2>
            <p className="text-lg text-gray-600">
              Choose the right size for your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-6xl mx-auto">
            {commercialSizes.map((dumpster) => (
              <DumpsterSizeCard key={dumpster.size} dumpster={dumpster} />
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-4">Need help choosing the right size for your business?</p>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Talk to a Commercial Specialist
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Industries Served Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-lg text-gray-600">
              Specialized waste management solutions for every type of business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <Card key={index} className="h-full">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center text-white mr-4">
                    {industry.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {industry.name}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  {industry.description}
                </p>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 mb-2">COMMON PROJECTS:</p>
                  <ul className="space-y-1">
                    {industry.projects.map((project, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                        {project}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing Tiers Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-green-50 to-green-100">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Flexible Pricing for Every Business
            </h2>
            <p className="text-lg text-gray-600">
              Choose the plan that fits your business needs and budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`bg-white h-full ${index === 1 ? 'ring-2 ring-green-500 shadow-xl' : ''}`}>
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-gray-600">
                    {tier.description}
                  </p>
                </div>
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-4">{tier.ideal}</p>
                  <Link href="/quote">
                    <Button
                      variant={index === 1 ? 'primary' : 'outline'}
                      size="lg"
                      fullWidth
                    >
                      Get Quote
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Quote Form Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Get a Custom Business Quote
              </h2>
              <p className="text-lg text-gray-600">
                Tell us about your business needs and we&apos;ll create a custom waste management solution
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
        title="Commercial Dumpster Rental FAQs"
        subtitle="Common questions from business clients"
        items={faqItems}
        defaultOpen={0}
      />

      {/* Final CTA Section */}
      <CallToAction
        title="Ready to Simplify Your Business Waste Management?"
        description="Join hundreds of businesses that trust us for reliable, cost-effective waste solutions. Get dedicated account management and priority service."
        primaryCta={{ text: 'Get Business Quote', href: '/quote' }}
        secondaryCta={{ text: 'Call (555) 123-4567', href: 'tel:+15551234567' }}
        contactInfo={{
          phone: '(555) 123-4567',
          email: 'commercial@dumpsterrental.com'
        }}
        variant="gradient"
        size="lg"
      />
    </>
  );
}
