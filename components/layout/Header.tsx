'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            DumpsterRentalPro
          </Link>
          
          <button
            className="md:hidden flex flex-col gap-1.5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="w-6 h-0.5 bg-gray-900"></span>
            <span className="w-6 h-0.5 bg-gray-900"></span>
            <span className="w-6 h-0.5 bg-gray-900"></span>
          </button>
          
          <ul className={`md:flex gap-8 items-center ${mobileMenuOpen ? 'flex flex-col absolute top-full left-0 right-0 bg-white shadow-lg p-4' : 'hidden'}`}>
            <li><Link href="/dumpster-sizes" className="text-gray-700 hover:text-blue-600 font-medium">Dumpster Sizes</Link></li>
            <li><Link href="/services" className="text-gray-700 hover:text-blue-600 font-medium">Services</Link></li>
            <li><Link href="/service-areas" className="text-gray-700 hover:text-blue-600 font-medium">Service Areas</Link></li>
            <li><Link href="/resources" className="text-gray-700 hover:text-blue-600 font-medium">Resources</Link></li>
            <li><Link href="/contact" className="btn-primary">Get Quote</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
