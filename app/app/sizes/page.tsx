'use client';

import React, { useState } from 'react';
import { Hero } from '@/components/sections/Hero';
import { DumpsterSizeCard } from '@/components/sections/DumpsterSizeCard';
import { CallToAction } from '@/components/sections/CallToAction';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const dumpsterSizes = [
  {
    name: '10 Yard Dumpster',
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
      'Minor landscaping projects',
      'Small bathroom remodel',
      'Carpet removal (1500 sq ft)'
    ],
    features: [
      '3-7 day rental period',
      'Free delivery & pickup',
      'No hidden fees',
      'Same-day delivery available'
    ],
    href: '/quote',
    equivalents: '3-5 pickup truck loads',
    volume: '10 cubic yards'
  },
  {
    name: '20 Yard Dumpster',
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
      'Kitchen or bathroom remodel',
      'Roof replacement (up to 3000 sq ft)',
      'Flooring removal (3000 sq ft)',
      'Window or siding replacement'
    ],
    features: [
      '7-14 day rental period',
      'Free delivery & pickup',
      'Extended rental available',
      'Most popular size'
    ],
    href: '/quote',
    equivalents: '6-8 pickup truck loads',
    volume: '20 cubic yards'
  },
  {
    name: '30 Yard Dumpster',
    size: '30 YD',
    dimensions: { length: 22, width: 8, height: 6 },
    capacity: '12 pickup trucks',
    weight: '6-8 tons',
    price: '$499',
    priceUnit: 'starting at',
    popular: false,
    bestFor: [
      'Large whole-home cleanouts',
      'New construction projects',
      'Major home additions',
      'Commercial demolition',
      'Large roof replacement (4000+ sq ft)',
      'Multi-room renovations'
    ],
    features: [
      '7-14 day rental period',
      'Free delivery & pickup',
      'Volume discount available',
      'Heavy debris approved'
    ],
    href: '/quote',
    equivalents: '9-12 pickup truck loads',
    volume: '30 cubic yards'
  },
  {
    name: '40 Yard Dumpster',
    size: '40 YD',
    dimensions: { length: 22, width: 8, height: 8 },
    capacity: '16 pickup trucks',
    weight: '8-10 tons',
    price: '$599',
    priceUnit: 'starting at',
    popular: false,
    bestFor: [
      'Large construction sites',
      'Commercial demolition projects',
      'Full home cleanouts',
      'Major commercial renovations',
      'Building demolition',
      'Large-scale cleanups'
    ],
    features: [
      '7-14 day rental period',
      'Free delivery & pickup',
      'Commercial discounts',
      'Highest capacity'
    ],
    href: '/quote',
    equivalents: '12-16 pickup truck loads',
    volume: '40 cubic yards'
  }
];

const sizeComparison = [
  { size: '10 YD', height: 30, color: 'bg-blue-400' },
  { size: '20 YD', height: 50, color: 'bg-blue-500' },
  { size: '30 YD', height: 70, color: 'bg-blue-600' },
  { size: '40 YD', height: 90, color: 'bg-blue-700' }
];

const projectTypes = [
  {
    type: 'Home Cleanout',
    small: '10 YD - Single room',
    medium: '20 YD - Multiple rooms',
    large: '30 YD - Whole house',
    xlarge: '40 YD - Estate/Large home'
  },
  {
    type: 'Renovation',
    small: '10 YD - Bathroom',
    medium: '20 YD - Kitchen',
    large: '30 YD - Multiple rooms',
    xlarge: '40 YD - Whole house'
  },
  {
    type: 'Roofing',
    small: '10 YD - Small shed',
    medium: '20 YD - Up to 3000 sq ft',
    large: '30 YD - 3000-5000 sq ft',
    xlarge: '40 YD - 5000+ sq ft'
  },
  {
    type: 'Construction',
    small: '10 YD - Small addition',
    medium: '20 YD - Room addition',
    large: '30 YD - New home',
    xlarge: '40 YD - Commercial building'
  },
  {
    type: 'Landscaping',
    small: '10 YD - Small yard',
    medium: '20 YD - Medium yard',
    large: '30 YD - Large property',
    xlarge: '40 YD - Commercial site'
  }
];

export default function SizesPage() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [projectType, setProjectType] = useState<string>('');
  const [projectScope, setProjectScope] = useState<string>('');

  const getRecommendedSize = () => {
    if (!projectType || !projectScope) return null;

    const scopeMap: { [key: string]: string } = {
      small: '10 YD',
      medium: '20 YD',
      large: '30 YD',
      xlarge: '40 YD'
    };

    return scopeMap[projectScope];
  };

  const recommendedSize = getRecommendedSize();

  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Find Your Perfect Dumpster Size"
        subtitle="Size Guide & Comparison"
        description="Choose the right dumpster size for your project. From small cleanouts to major construction, we have the perfect fit."
        primaryCta={{ text: 'Get Free Quote', href: '/quote' }}
        secondaryCta={{ text: 'Contact Us', href: '/contact' }}
        stats={[
          { value: '4', label: 'Sizes Available' },
          { value: '10-40', label: 'Yard Range' },
          { value: '$299+', label: 'Starting Price' }
        ]}
      />

      {/* Visual Size Comparison */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Visual Size Comparison
            </h2>
            <p className="text-lg text-gray-600">
              See how our dumpster sizes compare at a glance
            </p>
          </div>

          {/* Visual Chart */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="flex items-end justify-around h-96 bg-gradient-to-t from-gray-100 to-white rounded-2xl p-8 border-2 border-gray-200">
              {sizeComparison.map((item) => (
                <div key={item.size} className="flex flex-col items-center">
                  <div
                    className={`${item.color} w-24 md:w-32 rounded-t-lg shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer flex items-center justify-center text-white font-bold text-lg relative`}
                    style={{ height: `${item.height}%` }}
                  >
                    <span className="transform -rotate-0">{item.size}</span>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity">
                      Click for details
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="font-semibold text-gray-900">{item.size}</p>
                    <p className="text-sm text-gray-600">
                      {dumpsterSizes.find(d => d.size === item.size)?.dimensions.length}' × {' '}
                      {dumpsterSizes.find(d => d.size === item.size)?.dimensions.width}' × {' '}
                      {dumpsterSizes.find(d => d.size === item.size)?.dimensions.height}'
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {dumpsterSizes.map((dumpster) => (
              <Card key={dumpster.size} className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {dumpster.size}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {dumpster.capacity}
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {dumpster.price}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Size Selector/Calculator */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-blue-100">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Which Size Is Right for Me?
              </h2>
              <p className="text-lg text-gray-600">
                Answer a few questions to find your perfect dumpster size
              </p>
            </div>

            <Card className="bg-white">
              <div className="space-y-6">
                {/* Project Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    What type of project are you working on?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {['Home Cleanout', 'Renovation', 'Roofing', 'Construction', 'Landscaping', 'Other'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setProjectType(type)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          projectType === type
                            ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                            : 'border-gray-300 hover:border-blue-300 text-gray-700'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Scope */}
                {projectType && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      How large is your project?
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { value: 'small', label: 'Small' },
                        { value: 'medium', label: 'Medium' },
                        { value: 'large', label: 'Large' },
                        { value: 'xlarge', label: 'Extra Large' }
                      ].map((scope) => (
                        <button
                          key={scope.value}
                          onClick={() => setProjectScope(scope.value)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            projectScope === scope.value
                              ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                              : 'border-gray-300 hover:border-blue-300 text-gray-700'
                          }`}
                        >
                          {scope.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendation */}
                {recommendedSize && (
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          We Recommend: {recommendedSize}
                        </h3>
                        <p className="text-gray-700 mb-4">
                          Based on your {projectType.toLowerCase()} project size, a {recommendedSize} dumpster is perfect for your needs.
                        </p>
                        <Link href="/quote">
                          <Button variant="primary" size="lg">
                            Get Quote for {recommendedSize}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Detailed Size Cards */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Detailed Size Information
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about each dumpster size
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {dumpsterSizes.map((dumpster) => (
              <div key={dumpster.size} id={dumpster.size.toLowerCase().replace(' ', '-')}>
                <DumpsterSizeCard dumpster={dumpster} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Project Size Guide Table */}
      <section className="py-16 md:py-24 bg-gray-50">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Project Size Guide
            </h2>
            <p className="text-lg text-gray-600">
              Match your project type with the appropriate dumpster size
            </p>
          </div>

          <div className="max-w-6xl mx-auto overflow-x-auto">
            <table className="w-full bg-white rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Project Type</th>
                  <th className="px-6 py-4 text-left font-semibold">10 Yard</th>
                  <th className="px-6 py-4 text-left font-semibold">20 Yard</th>
                  <th className="px-6 py-4 text-left font-semibold">30 Yard</th>
                  <th className="px-6 py-4 text-left font-semibold">40 Yard</th>
                </tr>
              </thead>
              <tbody>
                {projectTypes.map((project, index) => (
                  <tr key={project.type} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-semibold text-gray-900">{project.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{project.small}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{project.medium}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{project.large}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{project.xlarge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* Pricing Information */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600">
              Know exactly what you're paying for with our all-inclusive pricing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card>
              <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
              <ul className="space-y-3">
                {[
                  'Delivery to your location',
                  'Pickup and haul away',
                  'Disposal fees (up to weight limit)',
                  'Rental period (7-14 days)',
                  'Tonnage allowance',
                  '24/7 customer support'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Additional Costs</h3>
              <ul className="space-y-3">
                {[
                  'Overage charges (per ton over limit)',
                  'Extended rental ($10-15/day)',
                  'Special placement requests',
                  'Prohibited items disposal',
                  'Long-distance delivery fees',
                  'Weekend/holiday delivery'
                ].map((item, index) => (
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
            <Card className="bg-blue-50 border-2 border-blue-200 max-w-3xl mx-auto">
              <p className="text-lg text-gray-700">
                <span className="font-semibold text-blue-700">Price Match Guarantee:</span> We'll match any competitor's written quote for the same service in your area.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Common Size Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "What if I'm between two sizes?",
                a: "We always recommend going one size up. It's better to have extra space than to need another dumpster mid-project. Plus, the price difference is usually minimal."
              },
              {
                q: "Can I switch sizes after delivery?",
                a: "Yes! If you realize you need a different size, contact us within 24 hours of delivery. We'll swap it out for you, though swap fees may apply."
              },
              {
                q: "How do I know if the dumpster will fit in my space?",
                a: "Check our dimensions guide above. Most driveways can accommodate up to a 20-yard dumpster. For larger sizes, we recommend measuring your available space or calling for a site consultation."
              },
              {
                q: "What happens if I exceed the weight limit?",
                a: "We charge per ton for overage. The rate varies by location but is typically $50-75 per ton. We'll notify you of the overage and charge before pickup."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <CallToAction
        title="Ready to Order Your Dumpster?"
        description="Get an instant quote and schedule your delivery today. Our team is here to help you choose the perfect size!"
        primaryCta={{ text: 'Get Free Quote', href: '/quote' }}
        secondaryCta={{ text: 'Call for Help', href: 'tel:+15551234567' }}
        contactInfo={{
          phone: '(555) 123-4567',
          email: 'info@dumpsterrental.com'
        }}
        variant="gradient"
      />
    </>
  );
}
