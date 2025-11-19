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
  title: 'Construction Dumpster Rental - Heavy-Duty Waste Removal for Job Sites',
  description: 'Professional construction dumpster rental for contractors and builders. High weight capacity, extended rental periods, and job site delivery. Get your free quote today!',
  keywords: 'construction dumpster rental, contractor dumpster, job site waste removal, building debris dumpster, demolition dumpster rental',
  openGraph: {
    title: 'Construction Dumpster Rental - Heavy-Duty Solutions for Contractors',
    description: 'High weight capacity, extended rental periods, and reliable job site delivery for construction projects of all sizes.',
    type: 'website',
  },
};

// Dumpster sizes for construction projects
const constructionSizes = [
  {
    name: '20 Yard',
    size: '20 YD',
    dimensions: { length: 22, width: 8, height: 4 },
    capacity: '8 pickup trucks',
    weight: '4-6 tons',
    price: '$399',
    priceUnit: 'starting at',
    popular: false,
    bestFor: [
      'Small additions',
      'Roof tear-offs',
      'Deck demolition',
      'Light construction debris'
    ],
    features: [
      'Up to 6 tons included',
      'Extended rental available',
      'Job site delivery'
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
    popular: true,
    bestFor: [
      'New home construction',
      'Large renovations',
      'Commercial framing',
      'Heavy demolition'
    ],
    features: [
      'Up to 8 tons included',
      'Most popular for construction',
      'Multiple swaps available'
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
      'Large commercial projects',
      'Major demolition',
      'Multi-story buildings',
      'Complete tear-downs'
    ],
    features: [
      'Up to 10 tons included',
      'Highest capacity',
      'Long-term rental discounts'
    ],
    href: '/sizes/40-yard-dumpster'
  }
];

// Service benefits
const benefits = [
  {
    title: 'High Weight Capacity',
    description: 'Our construction dumpsters handle heavy materials including concrete, brick, lumber, and metal without issue.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    )
  },
  {
    title: 'Job Site Delivery',
    description: 'We carefully position dumpsters where you need them on your job site for maximum convenience and efficiency.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    title: 'Extended Rental Periods',
    description: 'Construction projects take time. Keep your dumpster as long as you need with our flexible rental periods.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: 'Multiple Container Swaps',
    description: 'Need more capacity? We offer quick container swaps to keep your project moving without delays.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    )
  },
  {
    title: 'Contractor Discounts',
    description: 'Frequent users get preferred pricing. The more you use our services, the more you save on every rental.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Reliable Service',
    description: 'Count on on-time delivery and pickup. We understand that delays cost you money, so we prioritize punctuality.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  }
];

// Project types
const projectTypes = [
  {
    category: 'New Construction',
    description: 'From foundation to finish, we support your entire building project.',
    materials: [
      'Lumber and wood scraps',
      'Drywall and plaster',
      'Packaging materials',
      'Concrete forms',
      'Metal scraps',
      'General construction debris'
    ],
    recommendedSize: '30-40 Yard'
  },
  {
    category: 'Demolition Projects',
    description: 'Heavy-duty containers for complete or partial structure demolition.',
    materials: [
      'Concrete and masonry',
      'Brick and stone',
      'Metal and steel',
      'Wood framing',
      'Roofing materials',
      'Structural debris'
    ],
    recommendedSize: '30-40 Yard'
  },
  {
    category: 'Renovation & Remodeling',
    description: 'Perfect for gut-outs and major renovation projects.',
    materials: [
      'Old cabinets and fixtures',
      'Flooring materials',
      'Drywall and insulation',
      'Windows and doors',
      'Tile and countertops',
      'Plumbing fixtures'
    ],
    recommendedSize: '20-30 Yard'
  },
  {
    category: 'Roofing Projects',
    description: 'Specialized for heavy roofing materials and tear-offs.',
    materials: [
      'Asphalt shingles',
      'Underlayment',
      'Flashing and trim',
      'Gutters and downspouts',
      'Roofing nails',
      'Wood decking'
    ],
    recommendedSize: '20-30 Yard'
  },
  {
    category: 'Site Development',
    description: 'Land clearing and site preparation debris removal.',
    materials: [
      'Tree stumps and roots',
      'Brush and vegetation',
      'Dirt and soil',
      'Rocks and stones',
      'Old fencing',
      'Land clearing debris'
    ],
    recommendedSize: '30-40 Yard'
  },
  {
    category: 'Commercial Build-Outs',
    description: 'Support for retail, office, and commercial interior construction.',
    materials: [
      'Framing materials',
      'Ceiling tiles and grid',
      'Carpeting and flooring',
      'Partition walls',
      'Electrical and HVAC waste',
      'Packaging and pallets'
    ],
    recommendedSize: '20-30 Yard'
  }
];

// Accepted materials
const acceptedMaterials = {
  common: [
    'Wood and lumber',
    'Drywall and plaster',
    'Concrete and asphalt',
    'Brick and block',
    'Metal and steel',
    'Roofing shingles',
    'Siding materials',
    'Flooring materials',
    'Insulation (non-asbestos)',
    'Windows and doors',
    'Cabinets and fixtures',
    'Carpet and padding'
  ],
  prohibited: [
    'Hazardous materials',
    'Asbestos-containing materials',
    'Paint and chemicals',
    'Tires',
    'Batteries',
    'Electronics',
    'Appliances with freon',
    'Propane tanks',
    'Railroad ties',
    'Medical waste'
  ]
};

// FAQ items
const faqItems = [
  {
    question: 'What size dumpster do I need for a construction project?',
    answer: 'For new construction, we recommend 30 or 40-yard dumpsters. Renovation projects typically need 20-30 yards, while roofing projects work well with 20-yard containers. The size depends on project scope, building size, and debris type. Our team can help you choose based on your specific project details.'
  },
  {
    question: 'How much weight is included with construction dumpsters?',
    answer: 'Weight allowances vary by size: 20-yard includes up to 6 tons, 30-yard includes up to 8 tons, and 40-yard includes up to 10 tons. Heavy materials like concrete may require additional tonnage. Overage charges are $50-75 per ton depending on your location.'
  },
  {
    question: 'Can I keep the dumpster for the duration of my project?',
    answer: 'Yes! Construction projects often take weeks or months. We offer extended rental periods with daily or weekly rates. Many contractors keep dumpsters on-site for 30-90 days. Contact us for long-term rental pricing and discounts.'
  },
  {
    question: 'Do you offer container swaps for ongoing projects?',
    answer: 'Absolutely! When your dumpster fills up, we\'ll swap it for an empty one within 24-48 hours. This is perfect for long projects generating continuous debris. Swap fees are much less than renting multiple containers simultaneously.'
  },
  {
    question: 'Can I put concrete and heavy materials in the dumpster?',
    answer: 'Yes! Our construction dumpsters are built to handle heavy materials including concrete, brick, asphalt, and dirt. However, extremely heavy materials may require a dedicated "heavy debris" container. We can also arrange for concrete-only dumpsters at reduced rates.'
  },
  {
    question: 'Do you offer discounts for contractors?',
    answer: 'Yes! Contractors who use our services regularly receive volume discounts ranging from 10-25% depending on usage. We also offer account billing, priority scheduling, and dedicated support. Contact us to set up a contractor account.'
  },
  {
    question: 'What if the job site has limited access?',
    answer: 'We have experience with challenging job sites. Our drivers will work with you to position the dumpster in the best available location. If standard placement isn\'t possible, we can discuss alternative solutions like using a smaller container or scheduling strategic swaps.'
  },
  {
    question: 'Are permits required for construction dumpsters?',
    answer: 'If the dumpster is placed on your job site property, typically no permit is needed. However, if it must go on a public street or right-of-way, your city will likely require a permit. We can help you navigate the permit process and provide necessary documentation.'
  }
];

export default function ConstructionDumpsterRentalPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Construction Dumpster Rental Services"
        subtitle="Built for Contractors & Builders"
        description="Heavy-duty dumpster rental for construction sites, demolition projects, and new builds. High weight capacity, extended rental periods, and reliable job site delivery you can count on."
        primaryCta={{ text: 'Get Contractor Quote', href: '/quote' }}
        secondaryCta={{ text: 'Call (555) 123-4567', href: 'tel:+15551234567' }}
        stats={[
          { value: '1,000+', label: 'Projects Completed' },
          { value: '10 Tons', label: 'Max Capacity' },
          { value: '90 Days', label: 'Max Rental' },
          { value: '25%', label: 'Contractor Discount' }
        ]}
      />

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Contractors Trust Us
            </h2>
            <p className="text-lg text-gray-600">
              We understand the demands of construction work and provide the heavy-duty solutions you need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center h-full hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center text-orange-600">
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
              Construction Dumpster Sizes
            </h2>
            <p className="text-lg text-gray-600">
              Heavy-duty containers for construction debris and building materials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-6xl mx-auto">
            {constructionSizes.map((dumpster) => (
              <DumpsterSizeCard key={dumpster.size} dumpster={dumpster} />
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-4">Need help selecting the right size for your project?</p>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Talk to a Construction Specialist
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Project Types Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ideal for Construction Projects
            </h2>
            <p className="text-lg text-gray-600">
              Whatever you're building or demolishing, we have the right solution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectTypes.map((project, index) => (
              <Card key={index} className="h-full">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-4">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {project.category}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {project.description}
                    </p>
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Common Materials:</p>
                      <ul className="space-y-1">
                        {project.materials.map((material, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-2"></div>
                            {material}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm">
                        <span className="font-semibold text-gray-900">Recommended Size:</span>{' '}
                        <span className="text-orange-600 font-semibold">{project.recommendedSize}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Accepted Materials Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-orange-50 to-orange-100">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Can Go in a Construction Dumpster?
            </h2>
            <p className="text-lg text-gray-600">
              Know what materials are accepted and what requires special disposal
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
                <h3 className="text-2xl font-bold text-gray-900">Accepted Materials</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {acceptedMaterials.common.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-white">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Prohibited Materials</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {acceptedMaterials.prohibited.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Card className="bg-white border-2 border-orange-200 max-w-3xl mx-auto">
              <p className="text-gray-700">
                <span className="font-semibold text-orange-700">Not sure about a specific material?</span> Contact us before disposal. We'll help you determine the best way to dispose of any questionable items legally and safely.
              </p>
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
                Get Your Construction Quote
              </h2>
              <p className="text-lg text-gray-600">
                Tell us about your project and get contractor pricing instantly
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
        title="Construction Dumpster Rental FAQs"
        subtitle="Common questions from contractors and builders"
        items={faqItems}
        defaultOpen={0}
      />

      {/* Final CTA Section */}
      <CallToAction
        title="Ready for Your Next Construction Project?"
        description="Get heavy-duty dumpster rental with contractor discounts, flexible rental periods, and reliable service. Join thousands of contractors who trust us for their job site waste needs."
        primaryCta={{ text: 'Get Contractor Quote', href: '/quote' }}
        secondaryCta={{ text: 'Call (555) 123-4567', href: 'tel:+15551234567' }}
        contactInfo={{
          phone: '(555) 123-4567',
          email: 'contractors@dumpsterrental.com'
        }}
        variant="gradient"
        size="lg"
      />
    </>
  );
}
