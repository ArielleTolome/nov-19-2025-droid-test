import React from 'react';
import { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { ServiceGrid } from '@/components/sections/ServiceGrid';
import { CallToAction } from '@/components/sections/CallToAction';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services - Dumpster Rental for All Your Needs',
  description: 'Comprehensive dumpster rental services for residential, commercial, and construction projects. Same-day delivery, flexible rental periods, and competitive pricing.',
  openGraph: {
    title: 'Services - Dumpster Rental for All Your Needs',
    description: 'Comprehensive dumpster rental services for residential, commercial, and construction projects.',
    type: 'website',
  },
};

const services = [
  {
    title: 'Residential Dumpsters',
    description: 'Perfect for home cleanouts, renovations, and yard work. We deliver right to your driveway with careful placement to protect your property.',
    iconName: 'residential' as const,
    features: [
      'Same-day delivery available',
      'Flexible rental periods',
      'Driveway-friendly placement',
      'Multiple size options'
    ],
    href: '/services/residential'
  },
  {
    title: 'Commercial Dumpsters',
    description: 'Reliable waste solutions for businesses, offices, retail locations, and property management companies. Keep your commercial property clean and compliant.',
    iconName: 'commercial' as const,
    features: [
      'Scheduled pickups',
      'Volume discounts',
      'Dedicated account manager',
      'Long-term contracts available'
    ],
    href: '/services/commercial'
  },
  {
    title: 'Construction Dumpsters',
    description: 'Heavy-duty containers designed for construction debris, demolition, and building materials. Built to handle the toughest jobs.',
    iconName: 'construction' as const,
    features: [
      'High weight limits',
      'Extended rental periods',
      'Job site delivery',
      'Multiple daily pickups available'
    ],
    href: '/services/construction'
  },
  {
    title: 'Demolition Services',
    description: 'Specialized dumpsters for demolition projects, including concrete, brick, and heavy debris. We handle it all.',
    iconName: 'demo' as const,
    features: [
      'Heavy debris approved',
      'Concrete & brick removal',
      'Safe disposal',
      'Site cleanup support'
    ],
    href: '/services/demolition'
  },
  {
    title: 'Yard Waste Removal',
    description: 'Eco-friendly disposal for landscaping projects, tree removal, and seasonal yard cleanups. Green waste recycling available.',
    iconName: 'yard' as const,
    features: [
      'Green waste recycling',
      'Seasonal services',
      'Storm cleanup',
      'Brush & tree debris'
    ],
    href: '/services/yard-waste'
  },
  {
    title: 'Recycling Services',
    description: 'Environmentally responsible waste management with dedicated recycling options for qualifying materials.',
    iconName: 'recycling' as const,
    features: [
      'Material sorting guidance',
      'Eco-friendly disposal',
      'Recycling reports available',
      'LEED project support'
    ],
    href: '/services/recycling'
  }
];

const detailedServices = [
  {
    id: 'residential',
    title: 'Residential Dumpster Rental',
    description: 'Home projects require reliable, convenient waste removal solutions. Our residential dumpster rental service is designed with homeowners in mind.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    features: [
      'Driveway protection with placement mats',
      'Flexible scheduling for deliveries and pickups',
      'Sizes from 10 to 40 yards',
      'Clear, upfront pricing with no hidden fees',
      'Same-day or next-day delivery available',
      'Extended rental periods upon request'
    ],
    idealFor: [
      'Home renovations and remodeling',
      'Spring cleaning and decluttering',
      'Garage or attic cleanouts',
      'Estate cleanouts',
      'Moving and downsizing',
      'Landscaping projects'
    ],
    bgColor: 'from-blue-50 to-blue-100'
  },
  {
    id: 'commercial',
    title: 'Commercial Dumpster Rental',
    description: 'Businesses need dependable waste management. We provide commercial dumpster services tailored to your specific industry needs.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    features: [
      'Regularly scheduled service',
      'Volume-based discounts for ongoing needs',
      'Multiple container sizes available',
      'Dedicated account management',
      'Customized pickup schedules',
      'Compliance with local regulations'
    ],
    idealFor: [
      'Retail stores and shopping centers',
      'Restaurants and hospitality',
      'Office buildings and corporate campuses',
      'Property management companies',
      'Manufacturing facilities',
      'Warehouses and distribution centers'
    ],
    bgColor: 'from-green-50 to-green-100'
  },
  {
    id: 'construction',
    title: 'Construction Dumpster Rental',
    description: 'Construction sites demand heavy-duty solutions. Our construction dumpsters are built to handle the most demanding projects.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    features: [
      'High weight capacity (up to 10 tons)',
      'Durable steel construction',
      'Extended rental periods for long projects',
      'Multiple container swaps available',
      'Job site delivery and placement',
      'Accepts heavy materials and debris'
    ],
    idealFor: [
      'New construction projects',
      'Major renovations',
      'Demolition work',
      'Roofing projects',
      'Concrete and asphalt removal',
      'Site development'
    ],
    bgColor: 'from-orange-50 to-orange-100'
  }
];

const industryExpertise = [
  {
    industry: 'Homeowners',
    description: 'Trusted by thousands for home improvement projects',
    projects: ['Renovations', 'Cleanouts', 'Landscaping', 'Moving']
  },
  {
    industry: 'Contractors',
    description: 'Reliable partner for professional contractors',
    projects: ['New Construction', 'Remodeling', 'Roofing', 'Demolition']
  },
  {
    industry: 'Property Managers',
    description: 'Flexible solutions for multi-unit properties',
    projects: ['Tenant Turnover', 'Common Area Cleanup', 'Seasonal Maintenance', 'Emergency Cleanup']
  },
  {
    industry: 'Businesses',
    description: 'Ongoing waste management for commercial operations',
    projects: ['Retail Waste', 'Restaurant Cleanup', 'Office Renovations', 'Warehouse Cleanouts']
  }
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Comprehensive Dumpster Rental Services"
        subtitle="Solutions for Every Project"
        description="From residential cleanouts to major construction projects, we provide the right dumpster rental solution for your specific needs."
        primaryCta={{ text: 'Get Free Quote', href: '/quote' }}
        secondaryCta={{ text: 'View Sizes', href: '/sizes' }}
        stats={[
          { value: '6', label: 'Service Types' },
          { value: '4', label: 'Dumpster Sizes' },
          { value: '24/7', label: 'Support' }
        ]}
      />

      {/* Services Grid */}
      <ServiceGrid
        title="Our Service Offerings"
        subtitle="Specialized dumpster rental solutions for every type of project"
        services={services}
        columns={3}
      />

      {/* Detailed Services Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Service Details
            </h2>
            <p className="text-lg text-gray-600">
              Learn more about our most popular dumpster rental services
            </p>
          </div>

          <div className="space-y-12">
            {detailedServices.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`bg-gradient-to-br ${service.bgColor} rounded-2xl p-8 md:p-12`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  {/* Left Column - Info */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-md mr-4">
                        {service.icon}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-lg text-gray-700 mb-6">
                      {service.description}
                    </p>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column - Ideal For */}
                  <div>
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h4 className="font-semibold text-gray-900 mb-4 text-lg">Ideal For:</h4>
                      <ul className="space-y-3">
                        {service.idealFor.map((item, idx) => (
                          <li key={idx} className="flex items-center">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <Link href="/quote">
                          <Button variant="primary" size="lg" fullWidth>
                            Get Quote for {service.title.split(' ')[0]}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Industry Expertise Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industry Expertise
            </h2>
            <p className="text-lg text-gray-600">
              We serve a diverse range of industries with specialized solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industryExpertise.map((item, index) => (
              <Card key={index} className="text-center h-full">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.industry}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {item.description}
                </p>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 mb-2">COMMON PROJECTS:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {item.projects.map((project, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                      >
                        {project}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Services?
            </h2>
            <p className="text-lg text-gray-600">
              We're committed to providing exceptional service every step of the way
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Fast Delivery',
                description: 'Same-day or next-day delivery available in most areas. We work around your schedule.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              {
                title: 'Transparent Pricing',
                description: 'No hidden fees. All costs are clearly explained upfront in your quote.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: 'Expert Support',
                description: '24/7 customer support to answer questions and help you choose the right solution.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )
              },
              {
                title: 'Flexible Rentals',
                description: 'Rental periods from 3 to 30 days, with easy extensions if you need more time.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: 'Eco-Friendly',
                description: 'We prioritize recycling and responsible waste disposal whenever possible.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                )
              },
              {
                title: 'Licensed & Insured',
                description: 'Fully licensed, bonded, and insured for your peace of mind.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              }
            ].map((item, index) => (
              <Card key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <CallToAction
        title="Ready to Get Started?"
        description="Choose the service that fits your needs and get a free quote today. Our team is standing by to help!"
        primaryCta={{ text: 'Get Free Quote', href: '/quote' }}
        secondaryCta={{ text: 'View All Sizes', href: '/sizes' }}
        contactInfo={{
          phone: '(555) 123-4567',
          email: 'info@dumpsterrental.com'
        }}
        variant="gradient"
      />
    </>
  );
}
