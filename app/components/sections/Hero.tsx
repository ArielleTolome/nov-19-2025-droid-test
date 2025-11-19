import React from 'react';
import Link from 'next/link';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroProps {
  title: string;
  subtitle?: string;
  description: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  stats?: HeroStat[];
  backgroundImage?: string;
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  primaryCta = {
    text: 'Get a Quote',
    href: '/quote',
  },
  secondaryCta = {
    text: 'View Pricing',
    href: '/pricing',
  },
  stats = [
    { value: '10,000+', label: 'Dumpsters Delivered' },
    { value: '24/7', label: 'Customer Support' },
    { value: '50+', label: 'Service Locations' },
  ],
  backgroundImage,
  className = '',
}) => {
  return (
    <section
      className={`relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden ${className}`}
    >
      {/* Background Image Overlay */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Decorative Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-400 rounded-full opacity-20 blur-3xl" />
      </div>

      <Container className="relative py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Subtitle */}
          {subtitle && (
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-blue-500/30 backdrop-blur-sm rounded-full text-sm font-semibold border border-blue-400/30">
                {subtitle}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href={primaryCta.href}>
              <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                {primaryCta.text}
              </Button>
            </Link>
            {secondaryCta && (
              <Link href={secondaryCta.href}>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  {secondaryCta.text}
                </Button>
              </Link>
            )}
          </div>

          {/* Stats */}
          {stats && stats.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto pt-8 border-t border-blue-500/30">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-blue-200">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-12 md:h-16 fill-white"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
