import React from 'react';
import { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { FAQ } from '@/components/sections/FAQ';
import { CallToAction } from '@/components/sections/CallToAction';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import QuoteForm from '@/components/forms/QuoteForm';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '10 Yard Dumpster Rental - Perfect for Small Projects & Cleanouts',
  description: '10 yard dumpster rental starting at $299. Ideal for small cleanouts, garage clearing, minor renovations, and yard work. Same-day delivery available. Get your free quote!',
  keywords: '10 yard dumpster, small dumpster rental, 10 yard roll off, garage cleanout dumpster, small project dumpster',
  openGraph: {
    title: '10 Yard Dumpster Rental - Compact & Affordable',
    description: 'Perfect for small projects, garage cleanouts, and minor renovations. Starting at $299 with same-day delivery.',
    type: 'website',
  },
};

// Specifications
const specifications = {
  dimensions: {
    length: '14 feet',
    width: '8 feet',
    height: '3 feet',
    visual: '14\' L × 8\' W × 3\' H'
  },
  capacity: {
    volume: '10 cubic yards',
    equivalentTrucks: '4 pickup truck loads',
    weightLimit: '2-3 tons (4,000-6,000 lbs)'
  },
  pricing: {
    starting: '$299',
    included: [
      '7-day rental period',
      'Delivery and pickup',
      'Disposal fees (up to weight limit)',
      'No hidden fees'
    ],
    additional: [
      'Extra days: $10/day',
      'Overage: $50-75/ton',
      'Same-day delivery: $50 (when available)'
    ]
  }
};

// Ideal projects
const idealProjects = [
  {
    category: 'Small Cleanouts',
    projects: [
      'Single room cleanouts',
      'Garage organization',
      'Attic clearing',
      'Closet purge',
      'Storage unit cleanup'
    ],
    estimatedVolume: '1-2 rooms of clutter'
  },
  {
    category: 'Minor Renovations',
    projects: [
      'Small bathroom remodel',
      'Powder room renovation',
      'Closet renovation',
      'Small kitchen updates',
      'Flooring removal (1-2 rooms)'
    ],
    estimatedVolume: '150-300 sq ft of materials'
  },
  {
    category: 'Landscaping',
    projects: [
      'Small yard cleanup',
      'Brush removal',
      'Small tree removal',
      'Garden bed cleanout',
      'Deck/patio cleanup'
    ],
    estimatedVolume: '1/4 acre or less'
  },
  {
    category: 'Light Demolition',
    projects: [
      'Shed removal (small)',
      'Fence removal (partial)',
      'Deck removal (small)',
      'Carpet removal (1,500 sq ft)',
      'Cabinet removal'
    ],
    estimatedVolume: 'Small structures only'
  }
];

// What fits
const whatFits = {
  household: [
    'Furniture (2-3 pieces)',
    'Boxes of belongings',
    'Small appliances',
    'Books and papers',
    'Clothing and linens',
    'Toys and household items'
  ],
  construction: [
    'Drywall (150-300 sq ft)',
    'Flooring (1-2 rooms)',
    'Cabinets (small kitchen)',
    'Countertops (bathroom)',
    'Tiles and fixtures',
    'Window/door (1-2 units)'
  ],
  outdoor: [
    'Yard waste and branches',
    'Small amounts of soil',
    'Sod removal',
    'Bush and shrub trimmings',
    'Small fence sections',
    'Deck boards'
  ]
};

// Comparison with other sizes
const sizeComparison = [
  {
    size: '10 Yard',
    bestFor: 'Small, focused projects',
    pros: [
      'Most affordable option',
      'Fits in tight spaces',
      'Perfect for small projects',
      'Easy to fill'
    ],
    cons: [
      'Limited capacity',
      'Not suitable for large projects',
      'May need multiple rentals'
    ]
  },
  {
    size: '20 Yard',
    bestFor: 'Medium projects',
    upgrade: 'Consider upgrading if your project involves multiple rooms or larger renovations. Only $100 more.',
    link: '/sizes/20-yard-dumpster'
  }
];

// Tips for using
const usageTips = [
  {
    title: 'Loading Strategy',
    tips: [
      'Break down large items to maximize space',
      'Load heavy items on the bottom',
      'Fill gaps with smaller debris',
      'Keep materials level with the top',
      'Don\'t overfill past the rim'
    ]
  },
  {
    title: 'Space Requirements',
    tips: [
      'Needs 14 feet of length',
      'Allow 10 feet of width',
      'Ensure 23 feet of overhead clearance',
      'Perfect for most driveways',
      'Can fit in tight residential spaces'
    ]
  },
  {
    title: 'Weight Management',
    tips: [
      'Monitor weight with heavy materials',
      'Concrete and dirt are very heavy',
      'Roofing shingles add weight quickly',
      'Mix heavy and light materials',
      'Ask about weight when ordering'
    ]
  }
];

// Pricing breakdown
const pricingDetails = {
  whatsIncluded: [
    'Delivery to your location',
    '7-day rental period',
    'Pickup and haul away',
    'Disposal fees (up to 2-3 tons)',
    'Fuel surcharge',
    'Environmental fees'
  ],
  potentialExtras: [
    'Extended rental: $10/day',
    'Weight overage: $50-75/ton',
    'Same-day delivery: $50',
    'Weekend delivery: $50-75',
    'Prohibited items: Varies',
    'Permit fees: If required by city'
  ]
};

// FAQ items
const faqItems = [
  {
    question: 'How big is a 10 yard dumpster?',
    answer: 'A 10 yard dumpster is 14 feet long, 8 feet wide, and 3 feet high. It holds approximately 10 cubic yards of material, which is equivalent to about 4 pickup truck loads. The low height makes it easy to toss debris over the sides.'
  },
  {
    question: 'What can I fit in a 10 yard dumpster?',
    answer: 'A 10 yard dumpster can hold debris from a small bathroom remodel, a single-room cleanout, garage clearing, or minor landscaping project. Think of it as perfect for projects that would fill 3-4 pickup trucks. Common items include furniture, boxes, small appliances, drywall, flooring, and yard waste.'
  },
  {
    question: 'How much does a 10 yard dumpster rental cost?',
    answer: 'Our 10 yard dumpster rental starts at $299, which includes delivery, a 7-day rental period, pickup, and disposal of up to 2-3 tons. Additional days are $10 each. This is our most affordable option and perfect for small projects.'
  },
  {
    question: 'Is a 10 yard dumpster big enough for my project?',
    answer: 'A 10 yard dumpster is ideal for small, focused projects like single-room cleanouts, small bathroom remodels, garage organization, or minor yard work. If you\'re tackling multiple rooms, a full kitchen, or large renovation, consider our 20 yard option for just $100 more. We can help you choose!'
  },
  {
    question: 'How long can I keep a 10 yard dumpster?',
    answer: 'The standard rental period is 7 days, which is plenty of time for most small projects. If you need it longer, extensions are available for just $10 per day. Many customers complete their small projects in 3-5 days.'
  },
  {
    question: 'Will a 10 yard dumpster fit in my driveway?',
    answer: 'Yes! The 10 yard is our most compact size and fits in almost any residential driveway. It only needs 14 feet of length and 10 feet of width. This makes it perfect for homes with limited space or narrow driveways.'
  },
  {
    question: 'What items are not allowed in a 10 yard dumpster?',
    answer: 'Prohibited items include hazardous materials, chemicals, paint, asbestos, tires, batteries, electronics, and appliances with freon (refrigerators, AC units). We\'ll provide a complete list with your rental and can suggest proper disposal methods for prohibited items.'
  },
  {
    question: 'Can I put heavy materials like concrete in a 10 yard dumpster?',
    answer: 'You can put some concrete or heavy materials, but be mindful of the 2-3 ton weight limit. Heavy materials like concrete, dirt, and brick add weight quickly. For significant amounts of heavy debris, consider a dedicated heavy debris container or larger size with higher weight allowance.'
  }
];

export default function TenYardDumpsterPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="10 Yard Dumpster Rental"
        subtitle="Perfect for Small Projects"
        description="Our most compact and affordable dumpster rental. Ideal for small cleanouts, minor renovations, and residential projects. Fits easily in tight spaces with room to spare."
        primaryCta={{ text: 'Rent 10 Yard - $299', href: '/quote' }}
        secondaryCta={{ text: 'Compare Sizes', href: '/sizes' }}
        stats={[
          { value: '14\'×8\'×3\'', label: 'Dimensions' },
          { value: '4', label: 'Truck Loads' },
          { value: '$299', label: 'Starting Price' },
          { value: '2-3 Tons', label: 'Weight Limit' }
        ]}
      />

      {/* Specifications Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              10 Yard Dumpster Specifications
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about our 10 yard container
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card>
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Dimensions</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Length:</span>
                  <span className="font-semibold text-gray-900">{specifications.dimensions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Width:</span>
                  <span className="font-semibold text-gray-900">{specifications.dimensions.width}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Height:</span>
                  <span className="font-semibold text-gray-900">{specifications.dimensions.height}</span>
                </div>
              </div>
            </Card>

            <Card>
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Capacity</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Volume:</span>
                  <span className="font-semibold text-gray-900">{specifications.capacity.volume}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Equivalent:</span>
                  <span className="font-semibold text-gray-900">4 trucks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight Limit:</span>
                  <span className="font-semibold text-gray-900">2-3 tons</span>
                </div>
              </div>
            </Card>

            <Card>
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Starting Price</h3>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">$299</div>
                <p className="text-sm text-gray-600">Includes everything</p>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Ideal Projects Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perfect Projects for a 10 Yard Dumpster
            </h2>
            <p className="text-lg text-gray-600">
              See what types of projects work best with this size
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {idealProjects.map((project, index) => (
              <Card key={index} className="bg-white">
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-3 flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {project.category}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Estimated: {project.estimatedVolume}
                    </p>
                    <ul className="space-y-1">
                      {project.projects.map((item, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                          {item}
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

      {/* What Fits Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Fits in a 10 Yard Dumpster?
            </h2>
            <p className="text-lg text-gray-600">
              Common items and materials you can dispose of
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Household Items</h3>
              <ul className="space-y-2">
                {whatFits.household.map((item, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Construction Materials</h3>
              <ul className="space-y-2">
                {whatFits.construction.map((item, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Outdoor/Yard Waste</h3>
              <ul className="space-y-2">
                {whatFits.outdoor.map((item, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      {/* Pricing Details Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-blue-100">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600">
              Know exactly what you&apos;re paying for - no surprises
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="bg-white">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mr-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">What&apos;s Included</h3>
              </div>
              <ul className="space-y-2">
                {pricingDetails.whatsIncluded.map((item, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="bg-white">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Potential Additional Costs</h3>
              </div>
              <ul className="space-y-2">
                {pricingDetails.potentialExtras.map((item, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-700">
                    <svg className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      {/* Usage Tips Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tips for Using a 10 Yard Dumpster
            </h2>
            <p className="text-lg text-gray-600">
              Get the most out of your rental with these helpful tips
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {usageTips.map((section, index) => (
              <Card key={index}>
                <h3 className="text-lg font-bold text-gray-900 mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                      {tip}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Size Comparison Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Is 10 Yard Right for You?
            </h2>
            <p className="text-lg text-gray-600">
              Compare with other sizes to make the best choice
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {sizeComparison.map((comparison, index) => (
              <Card key={index}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {comparison.size} Dumpster
                    </h3>
                    <p className="text-gray-600 mb-4">{comparison.bestFor}</p>

                    {comparison.pros && (
                      <div className="mb-4">
                        <p className="font-semibold text-gray-900 mb-2">Advantages:</p>
                        <ul className="space-y-1">
                          {comparison.pros.map((pro, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-700">
                              <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {comparison.cons && (
                      <div>
                        <p className="font-semibold text-gray-900 mb-2">Limitations:</p>
                        <ul className="space-y-1">
                          {comparison.cons.map((con, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-700">
                              <svg className="w-4 h-4 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {comparison.upgrade && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-700 mb-2">{comparison.upgrade}</p>
                        <Link href={comparison.link!}>
                          <Button variant="outline" size="sm">
                            View 20 Yard Dumpster
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
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
                Rent a 10 Yard Dumpster Today
              </h2>
              <p className="text-lg text-gray-600">
                Get your instant quote and schedule same-day delivery
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
        title="10 Yard Dumpster FAQs"
        subtitle="Common questions about our 10 yard size"
        items={faqItems}
        defaultOpen={0}
      />

      {/* Final CTA Section */}
      <CallToAction
        title="Ready to Rent Your 10 Yard Dumpster?"
        description="Perfect for small projects at an affordable price. Same-day delivery available. Get started today!"
        primaryCta={{ text: 'Rent Now - $299', href: '/quote' }}
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
