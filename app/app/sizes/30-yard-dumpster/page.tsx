import React from 'react';
import { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { FAQ } from '@/components/sections/FAQ';
import { CallToAction } from '@/components/sections/CallToAction';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import QuoteForm from '@/components/forms/QuoteForm';

export const metadata: Metadata = {
  title: '30 Yard Dumpster Rental - Large Projects & Construction Sites',
  description: '30 yard dumpster rental starting at $499. Perfect for large renovations, new construction, and commercial projects. High capacity with extended rental periods. Get your free quote!',
  keywords: '30 yard dumpster, large dumpster rental, construction dumpster, 30 yard roll off, commercial dumpster',
  openGraph: {
    title: '30 Yard Dumpster Rental - For Large Projects',
    description: 'Perfect for large renovations, new construction, and major cleanouts. High capacity with professional service.',
    type: 'website',
  },
};

const faqItems = [
  {
    question: 'How big is a 30 yard dumpster?',
    answer: 'A 30 yard dumpster is 22 feet long, 8 feet wide, and 6 feet high. It holds approximately 30 cubic yards of material, equivalent to about 12 pickup truck loads. This size is ideal for large residential and commercial projects.'
  },
  {
    question: 'What can I use a 30 yard dumpster for?',
    answer: 'Perfect for whole-home cleanouts, new home construction, major renovations, large roofing projects (4,000+ sq ft), commercial demolition, and multi-room remodels. It\'s also great for construction sites and commercial projects.'
  },
  {
    question: 'How much does a 30 yard dumpster rental cost?',
    answer: 'Our 30 yard dumpster rental starts at $499, including delivery, 7-14 day rental period, pickup, and disposal of up to 6-8 tons. Extended rental periods and volume discounts are available for construction projects.'
  },
  {
    question: 'Will a 30 yard dumpster fit on my property?',
    answer: 'A 30 yard dumpster needs 22 feet of length and about 10-12 feet of width. It may be too large for some residential driveways but works well for construction sites, commercial properties, and homes with large driveways or extra space.'
  },
  {
    question: 'What is the weight limit for a 30 yard dumpster?',
    answer: 'A 30 yard dumpster includes disposal of 6-8 tons (12,000-16,000 lbs) of material. This is suitable for most large projects including construction debris and heavy materials. Additional weight costs $50-75 per ton.'
  }
];

export default function ThirtyYardDumpsterPage() {
  return (
    <>
      <Hero
        title="30 Yard Dumpster Rental"
        subtitle="For Large Projects"
        description="High-capacity dumpster rental for major renovations, new construction, and commercial projects. Professional-grade solution for contractors and large residential projects."
        primaryCta={{ text: 'Rent 30 Yard - $499', href: '/quote' }}
        secondaryCta={{ text: 'Compare Sizes', href: '/sizes' }}
        stats={[
          { value: '22\'×8\'×6\'', label: 'Dimensions' },
          { value: '12', label: 'Truck Loads' },
          { value: '$499', label: 'Starting Price' },
          { value: '6-8 Tons', label: 'Weight Limit' }
        ]}
      />

      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              When You Need a 30 Yard Dumpster
            </h2>
            <p className="text-lg text-gray-600">
              High capacity for demanding projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-3">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900">New Construction</h3>
              </div>
              <ul className="space-y-2">
                {['New home building', 'Commercial construction', 'Framing debris', 'Packaging materials', 'General construction waste'].map((item, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-3">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900">Major Renovations</h3>
              </div>
              <ul className="space-y-2">
                {['Whole-house remodels', 'Multiple room renovations', 'Large additions', 'Gut renovations', 'Commercial remodels'].map((item, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-3">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900">Large Cleanouts</h3>
              </div>
              <ul className="space-y-2">
                {['Whole-home cleanouts', 'Estate cleanouts', 'Commercial cleanouts', 'Hoarding situations', 'Multi-unit properties'].map((item, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-3">
                  4
                </div>
                <h3 className="text-xl font-bold text-gray-900">Commercial Projects</h3>
              </div>
              <ul className="space-y-2">
                {['Retail renovations', 'Office build-outs', 'Restaurant remodels', 'Warehouse cleanouts', 'Property management'].map((item, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-700">
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

      <section className="py-16 md:py-24 bg-gradient-to-br from-orange-50 to-orange-100">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Benefits for Large Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'High Capacity',
                description: 'Holds 12 pickup truck loads - enough for most large projects without needing multiple dumpsters',
                icon: '📦'
              },
              {
                title: 'Heavy Materials',
                description: 'Includes 6-8 tons disposal - perfect for construction debris, concrete, and heavy materials',
                icon: '⚡'
              },
              {
                title: 'Extended Rentals',
                description: 'Keep it longer for ongoing projects - great for construction sites and large renovations',
                icon: '📅'
              },
              {
                title: 'Volume Discounts',
                description: 'Contractors and high-volume users get preferred pricing and priority service',
                icon: '💰'
              },
              {
                title: 'Job Site Delivery',
                description: 'Professional placement on construction sites and commercial properties',
                icon: '🚛'
              },
              {
                title: 'Multiple Swaps',
                description: 'Need more capacity? We offer quick container swaps to keep your project moving',
                icon: '🔄'
              }
            ].map((benefit, index) => (
              <Card key={index} className="text-center bg-white">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
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
                Rent a 30 Yard Dumpster
              </h2>
              <p className="text-lg text-gray-600">
                Get professional-grade capacity for your large project
              </p>
            </div>
            <Card className="bg-gray-50">
              <QuoteForm />
            </Card>
          </div>
        </Container>
      </section>

      <FAQ
        title="30 Yard Dumpster FAQs"
        subtitle="Common questions about our large capacity dumpsters"
        items={faqItems}
        defaultOpen={0}
      />

      <CallToAction
        title="Ready for a 30 Yard Dumpster?"
        description="High capacity for large projects, construction sites, and commercial work. Extended rental periods and contractor discounts available."
        primaryCta={{ text: 'Rent Now - $499', href: '/quote' }}
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
