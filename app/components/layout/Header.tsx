'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navigation, NavLink } from './Navigation';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

export interface HeaderProps {
  logo?: React.ReactNode;
  logoText?: string;
  links?: NavLink[];
  ctaText?: string;
  ctaHref?: string;
  sticky?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  logo,
  logoText = 'Dumpster Rental',
  links = [
    { label: 'Home', href: '/' },
    {
      label: 'Services',
      href: '/services',
      dropdown: [
        { label: 'Residential Dumpsters', href: '/services/residential' },
        { label: 'Commercial Dumpsters', href: '/services/commercial' },
        { label: 'Construction Dumpsters', href: '/services/construction' },
      ]
    },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Locations', href: '/locations' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  ctaText = 'Get a Quote',
  ctaHref = '/quote',
  sticky = true,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    if (sticky) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [sticky]);

  const headerClasses = `
    ${sticky ? 'sticky top-0 z-50' : 'relative'}
    ${scrolled ? 'bg-white shadow-md' : 'bg-white border-b border-gray-200'}
    transition-all duration-200
  `.trim();

  return (
    <header className={headerClasses}>
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            {logo || (
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-900">{logoText}</span>
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Navigation links={links} />
            <Link href={ctaHref}>
              <Button variant="primary" size="md">
                {ctaText}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 animate-in slide-in-from-top">
            <Navigation
              links={links}
              mobile
              onLinkClick={() => setMobileMenuOpen(false)}
            />
            <div className="mt-4 px-4">
              <Link href={ctaHref} onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="md" fullWidth>
                  {ctaText}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
