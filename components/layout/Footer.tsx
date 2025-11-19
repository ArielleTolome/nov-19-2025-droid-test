import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">DumpsterRentalPro</h3>
            <p className="text-gray-400 mb-4">Your trusted partner for fast, reliable dumpster rentals across the nation.</p>
            <div className="text-gray-400 text-sm space-y-2">
              <div>📞 1-800-DUMPSTER</div>
              <div>📧 info@dumpsterrentalpro.com</div>
              <div>📍 Serving all 50 states</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/dumpster-sizes" className="hover:text-white">Dumpster Sizes</Link></li>
              <li><Link href="/services/residential-dumpster-rental" className="hover:text-white">Residential Services</Link></li>
              <li><Link href="/services/construction-dumpster-rental" className="hover:text-white">Construction Services</Link></li>
              <li><Link href="/services/commercial-dumpster-rental" className="hover:text-white">Commercial Services</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/resources" className="hover:text-white">Permit Guide</Link></li>
              <li><Link href="/resources" className="hover:text-white">Size Guide</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/service-areas" className="hover:text-white">Service Areas</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 DumpsterRentalPro. All rights reserved. | Licensed & Insured</p>
        </div>
      </div>
    </footer>
  );
}
