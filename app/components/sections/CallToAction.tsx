import React from 'react';
import Link from 'next/link';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

export interface CTAProps {
  title: string;
  description?: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  variant?: 'gradient' | 'solid' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  contactInfo?: {
    phone?: string;
    email?: string;
  };
  className?: string;
}

export const CallToAction: React.FC<CTAProps> = ({
  title,
  description,
  primaryCta = {
    text: 'Get Started',
    href: '/quote',
  },
  secondaryCta,
  variant = 'gradient',
  size = 'md',
  contactInfo,
  className = '',
}) => {
  const variantStyles = {
    gradient: 'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white',
    solid: 'bg-blue-600 text-white',
    outlined: 'bg-white border-2 border-blue-600',
  };

  const sizeStyles = {
    sm: 'py-12',
    md: 'py-16 md:py-20',
    lg: 'py-20 md:py-28',
  };

  const textColor = variant === 'outlined' ? 'text-gray-900' : 'text-white';
  const descriptionColor = variant === 'outlined' ? 'text-gray-600' : 'text-blue-100';

  return (
    <section className={`relative overflow-hidden ${className}`}>
      <div className={`${variantStyles[variant]} ${sizeStyles[size]}`}>
        {/* Decorative Elements for gradient variant */}
        {variant === 'gradient' && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-400 rounded-full opacity-20 blur-3xl" />
          </div>
        )}

        <Container className="relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Title */}
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${textColor}`}>
              {title}
            </h2>

            {/* Description */}
            {description && (
              <p className={`text-lg md:text-xl mb-8 ${descriptionColor} max-w-2xl mx-auto`}>
                {description}
              </p>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href={primaryCta.href}>
                <Button
                  variant="primary"
                  size="lg"
                  className={
                    variant === 'outlined'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-white text-blue-600 hover:bg-gray-100'
                  }
                >
                  {primaryCta.text}
                </Button>
              </Link>

              {secondaryCta && (
                <Link href={secondaryCta.href}>
                  <Button
                    variant="outline"
                    size="lg"
                    className={
                      variant === 'outlined'
                        ? 'border-blue-600 text-blue-600 hover:bg-blue-50'
                        : 'border-white text-white hover:bg-white/10'
                    }
                  >
                    {secondaryCta.text}
                  </Button>
                </Link>
              )}
            </div>

            {/* Contact Info */}
            {contactInfo && (contactInfo.phone || contactInfo.email) && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 border-t border-opacity-20" style={{ borderColor: variant === 'outlined' ? '#e5e7eb' : '#ffffff' }}>
                {contactInfo.phone && (
                  <a
                    href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
                    className={`flex items-center gap-2 text-lg font-semibold hover:opacity-80 transition-opacity ${textColor}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {contactInfo.phone}
                  </a>
                )}

                {contactInfo.phone && contactInfo.email && (
                  <span className={descriptionColor}>or</span>
                )}

                {contactInfo.email && (
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className={`flex items-center gap-2 text-lg font-semibold hover:opacity-80 transition-opacity ${textColor}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {contactInfo.email}
                  </a>
                )}
              </div>
            )}
          </div>
        </Container>
      </div>
    </section>
  );
};

export default CallToAction;
