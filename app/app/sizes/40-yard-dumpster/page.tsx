import React from 'react';
import { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { FAQ } from '@/components/sections/FAQ';
import { CallToAction } from '@/components/sections/CallToAction';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { QuoteForm } from '@/components/forms/QuoteForm';

export const metadata: Metadata = {
  title: '40 Yard Dumpster Rental - Maximum Capacity for Large Projects',
  description: '40 yard dumpster rental starting at $599. Our largest size for major construction, commercial demolition, and large-scale projects. Maximum capacity with professional service.',
  keywords: '40 yard dumpster, largest dumpster, commercial dumpster, demolition dumpster, 40 yard roll off',
  openGraph: {
    title: '40 Yard Dumpster Rental - Highest Capacity Available',
    description: 'Maximum capacity for major construction, demolition, and large commercial projects. Professional service for demanding projects.',
    type: 'website',
  },
};

const faqItems = [
  {
    question: 'How big is a 40 yard dumpster?',
    answer: 'A 40 yard dumpster is 22 feet long, 8 feet wide, and 8 feet high. It holds approximately 40 cubic yards of material, equivalent to about 16 pickup truck loads. This is our largest dumpster, offering maximum capacity for the biggest projects.'
  },
  {
    question: 'What projects need a 40 yard dumpster?',
    answer: 'Perfect for large commercial construction, major demolition projects, complete building tear-downs, multi-story renovations, large commercial cleanouts, and any project requiring maximum capacity. Often used by contractors on large job sites.'
  },
  {
    question: 'How much does a 40 yard dumpster cost?',
    answer: 'Our 40 yard dumpster rental starts at $599, including delivery, 7-14 day rental period, pickup, and disposal of up to 8-10 tons. Long-term rentals and commercial contracts receive discounted pricing.'
  },
  {
    question: 'Where can a 40 yard dumpster be placed?',
    answer: 'A 40 yard dumpster is best for commercial properties, large construction sites, or residential properties with ample space. It needs 22 feet of length, 12 feet of width, and 23+ feet of overhead clearance. Not suitable for standard residential driveways.'
  },
  {
    question: 'What is the weight limit for a 40 yard dumpster?',
    answer: 'A 40 yard dumpster includes disposal of 8-10 tons (16,000-20,000 lbs) of material. This is our highest weight capacity, suitable for heavy construction debris, concrete, and demolition materials. Additional tonnage costs $50-75 per ton.'
  }
];

export default function FortyYardDumpsterPage() {
  return (
    <>
      <Hero
        title="40 Yard Dumpster Rental"
        subtitle="Maximum Capacity"
        description="Our largest dumpster for the biggest projects. Perfect for major construction, commercial demolition, and large-scale cleanouts. Professional-grade capacity with reliable service."
        primaryCta={{ text: 'Rent 40 Yard - $599', href: '/quote' }}
        secondaryCta={{ text: 'Compare Sizes', href: '/sizes' }}
        stats={[
          { value: '22\'×8\'×8\'', label: 'Dimensions' },
          { value: '16', label: 'Truck Loads' },
          { value: '$599', label: 'Starting Price' },
          { value: '8-10 Tons', label: 'Weight Limit' }
        ]}
      />

      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              When You Need Maximum Capacity
            </h2>
            <p className="text-lg text-gray-600">
              Our 40 yard dumpster handles the biggest projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Large Construction',
                icon: '🏗️',
                examples: ['Multi-story buildings', 'Commercial construction', 'New home builds', 'Major additions', 'Industrial projects']
              },
              {
                title: 'Major Demolition',
                icon: '💥',
                examples: ['Building demolition', 'Complete tear-downs', 'Structural removal', 'Commercial demo', 'Large-scale demo']
              },
              {
                title: 'Commercial Projects',
                icon: '🏢',
                examples: ['Office buildings', 'Retail centers', 'Warehouses', 'Manufacturing', 'Large facilities']
              },
              {
                title: 'Full Cleanouts',
                icon: '🗑️',
                examples: ['Entire building cleanouts', 'Multi-unit properties', 'Large estates', 'Commercial facilities', 'Warehouse cleanouts']
              },
              {
                title: 'Large Renovations',
                icon: '🔨',
                examples: ['Whole-building remodels', 'Multi-floor renovations', 'Complete gut jobs', 'Large commercial remodels', 'Major upgrades']
              },
              {
                title: 'Site Development',
                icon: '🚜',
                examples: ['Land clearing', 'Large site prep', 'Commercial development', 'Infrastructure projects', 'Large-scale cleanup']
              }
            ].map((category, index) => (
              <Card key={index} className="text-center">
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{category.title}</h3>
                <ul className="space-y-2 text-left">
                  {category.examples.map((example, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                      {example}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our 40 Yard Dumpster
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="bg-white">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Maximum Features</h3>
              <ul className="space-y-3">
                {[
                  { title: 'Highest Capacity', desc: '16 pickup truck loads worth of debris' },
                  { title: 'Heavy Materials', desc: 'Up to 10 tons of disposal included' },
                  { title: 'Long-Term Rentals', desc: 'Keep it 30-90 days for ongoing projects' },
                  { title: 'Multiple Swaps', desc: 'Quick container exchanges available' },
                  { title: 'Professional Service', desc: 'Dedicated support for large projects' }
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <span className="font-semibold text-gray-900">{feature.title}:</span>{' '}
                      <span className="text-gray-600">{feature.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="bg-white">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Commercial Benefits</h3>
              <ul className="space-y-3">
                {[
                  { title: 'Volume Discounts', desc: 'Save up to 25% on high-volume contracts' },
                  { title: 'Dedicated Manager', desc: 'Single point of contact for your account' },
                  { title: 'Priority Service', desc: 'Faster delivery and pickup scheduling' },
                  { title: 'Flexible Billing', desc: 'Net-30 terms and consolidated invoicing' },
                  { title: 'Multi-Location', desc: 'Service multiple sites with one account' }
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <span className="font-semibold text-gray-900">{benefit.title}:</span>{' '}
                      <span className="text-gray-600">{benefit.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Size Comparison
            </h2>
            <p className="text-lg text-gray-600">
              See how the 40 yard stacks up against other sizes
            </p>
          </div>

          <div className="max-w-6xl mx-auto overflow-x-auto">
            <Card>
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Feature</th>
                    <th className="px-6 py-4 text-center font-semibold">20 Yard</th>
                    <th className="px-6 py-4 text-center font-semibold">30 Yard</th>
                    <th className="px-6 py-4 text-center font-semibold bg-blue-800">40 Yard</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Capacity', s20: '8 trucks', s30: '12 trucks', s40: '16 trucks' },
                    { feature: 'Weight Limit', s20: '4-6 tons', s30: '6-8 tons', s40: '8-10 tons' },
                    { feature: 'Height', s20: '4 feet', s30: '6 feet', s40: '8 feet' },
                    { feature: 'Starting Price', s20: '$399', s30: '$499', s40: '$599' },
                    { feature: 'Best For', s20: 'Home projects', s30: 'Large renovations', s40: 'Major construction' }
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 font-semibold text-gray-900">{row.feature}</td>
                      <td className="px-6 py-4 text-center text-gray-600">{row.s20}</td>
                      <td className="px-6 py-4 text-center text-gray-600">{row.s30}</td>
                      <td className="px-6 py-4 text-center font-semibold text-blue-700 bg-blue-50">{row.s40}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Rent a 40 Yard Dumpster
              </h2>
              <p className="text-lg text-gray-600">
                Get maximum capacity for your large-scale project
              </p>
            </div>
            <Card className="bg-white">
              <QuoteForm />
            </Card>
          </div>
        </Container>
      </section>

      <FAQ
        title="40 Yard Dumpster FAQs"
        subtitle="Common questions about our largest dumpster"
        items={faqItems}
        defaultOpen={0}
      />

      <CallToAction
        title="Ready for Maximum Capacity?"
        description="Our 40 yard dumpster handles the biggest projects with ease. Commercial discounts, long-term rentals, and dedicated support available."
        primaryCta={{ text: 'Rent Now - $599', href: '/quote' }}
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
