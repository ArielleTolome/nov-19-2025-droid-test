import React from 'react';
import { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { FAQ } from '@/components/sections/FAQ';
import { CallToAction } from '@/components/sections/CallToAction';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { QuoteForm } from '@/components/forms/QuoteForm';

export const metadata: Metadata = {
  title: '20 Yard Dumpster Rental - Most Popular Size for Home Projects',
  description: '20 yard dumpster rental starting at $399. Our most popular size for home renovations, roof replacements, and medium cleanouts. Same-day delivery available. Get your free quote!',
  keywords: '20 yard dumpster, 20 yard roll off, medium dumpster rental, roof dumpster, home renovation dumpster',
  openGraph: {
    title: '20 Yard Dumpster Rental - Most Popular Choice',
    description: 'Perfect for medium projects, home renovations, and roof replacements. Starting at $399 with same-day delivery.',
    type: 'website',
  },
};

const faqItems = [
  {
    question: 'How big is a 20 yard dumpster?',
    answer: 'A 20 yard dumpster is 22 feet long, 8 feet wide, and 4 feet high. It holds approximately 20 cubic yards of material, equivalent to about 8 pickup truck loads. This is our most popular size for residential projects.'
  },
  {
    question: 'What projects is a 20 yard dumpster good for?',
    answer: 'Perfect for kitchen or bathroom remodels, medium home cleanouts, deck removal, roof replacements up to 3,000 sq ft, flooring removal, and window/siding replacement. It handles most residential renovation projects with ease.'
  },
  {
    question: 'How much does a 20 yard dumpster cost?',
    answer: 'Our 20 yard dumpster rental starts at $399, including delivery, 7-14 day rental period, pickup, and disposal of up to 4-6 tons. This is our best value for medium to large residential projects.'
  },
  {
    question: 'Will a 20 yard dumpster fit in my driveway?',
    answer: 'A 20 yard dumpster fits in most standard residential driveways. It needs 22 feet of length and 10 feet of width. We recommend measuring your space, and our team can help assess whether it will fit before delivery.'
  },
  {
    question: 'How much weight can a 20 yard dumpster hold?',
    answer: 'A 20 yard dumpster includes disposal of 4-6 tons (8,000-12,000 lbs) of material. This is sufficient for most residential projects. Overage fees apply at $50-75 per ton for materials exceeding the weight limit.'
  }
];

export default function TwentyYardDumpsterPage() {
  return (
    <>
      <Hero
        title="20 Yard Dumpster Rental"
        subtitle="Our Most Popular Size"
        description="The perfect balance of capacity and convenience. Ideal for home renovations, roof replacements, and medium-sized cleanouts. Fits in most driveways and handles the majority of residential projects."
        primaryCta={{ text: 'Rent 20 Yard - $399', href: '/quote' }}
        secondaryCta={{ text: 'Compare Sizes', href: '/sizes' }}
        stats={[
          { value: '22\'×8\'×4\'', label: 'Dimensions' },
          { value: '8', label: 'Truck Loads' },
          { value: '$399', label: 'Starting Price' },
          { value: '4-6 Tons', label: 'Weight Limit' }
        ]}
      />

      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why 20 Yard is Most Popular
            </h2>
            <p className="text-lg text-gray-600">
              The sweet spot for residential projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Perfect for Homes</h3>
              <p className="text-gray-600">Ideal size for kitchen remodels, bathroom renovations, and medium cleanouts</p>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Driveway Friendly</h3>
              <p className="text-gray-600">Fits in most standard driveways with careful placement and protection boards</p>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Best Value</h3>
              <p className="text-gray-600">Right-sized capacity means you only pay for what you need</p>
            </Card>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perfect Projects for 20 Yard
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: 'Kitchen Remodels',
                items: ['Cabinet removal', 'Countertop disposal', 'Flooring tear-out', 'Appliance disposal', 'Drywall and debris']
              },
              {
                title: 'Bathroom Renovations',
                items: ['Tub/shower removal', 'Vanity and fixtures', 'Tile and flooring', 'Old plumbing', 'Wall materials']
              },
              {
                title: 'Roof Replacement',
                items: ['Shingle removal (up to 3,000 sq ft)', 'Underlayment', 'Flashing', 'Gutters', 'Roof debris']
              },
              {
                title: 'Medium Cleanouts',
                items: ['2-3 room cleanouts', 'Garage clearing', 'Basement clean up', 'Furniture disposal', 'General clutter']
              },
              {
                title: 'Deck Removal',
                items: ['Deck boards', 'Railings', 'Support posts', 'Stairs', 'Small to medium deck']
              },
              {
                title: 'Flooring Projects',
                items: ['Carpet removal (3,000 sq ft)', 'Hardwood floors', 'Tile removal', 'Laminate flooring', 'Underlayment']
              }
            ].map((project, index) => (
              <Card key={index}>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{project.title}</h3>
                <ul className="space-y-1">
                  {project.items.map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Rent a 20 Yard Dumpster
              </h2>
              <p className="text-lg text-gray-600">
                Get your instant quote for our most popular size
              </p>
            </div>
            <Card className="bg-gray-50">
              <QuoteForm />
            </Card>
          </div>
        </Container>
      </section>

      <FAQ
        title="20 Yard Dumpster FAQs"
        subtitle="Common questions about our most popular size"
        items={faqItems}
        defaultOpen={0}
      />

      <CallToAction
        title="Ready to Rent a 20 Yard Dumpster?"
        description="Our most popular size for home projects. Perfect capacity, great value, and fits most driveways. Get started today!"
        primaryCta={{ text: 'Rent Now - $399', href: '/quote' }}
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
