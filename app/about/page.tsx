import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - DumpsterRentalPro',
  description: 'Learn about DumpsterRentalPro and our commitment to providing fast, reliable dumpster rental services nationwide.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">About DumpsterRentalPro</h1>
          <p className="text-xl opacity-90">Your trusted partner for waste management solutions</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-4xl">
          <div className="prose prose-lg mx-auto">
            <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
            <p className="text-gray-700 mb-6">
              DumpsterRentalPro is a leading provider of dumpster rental services across all 50 states. 
              With over 50,000 successful deliveries and a 98% on-time delivery rate, we've built a 
              reputation for reliability, affordability, and exceptional customer service.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              Our mission is to make waste disposal simple, affordable, and stress-free for homeowners, 
              contractors, and businesses nationwide. We believe everyone deserves access to reliable 
              dumpster rental services with transparent pricing and exceptional support.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Why Choose Us</h2>
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              <li>Nationwide coverage with local expertise</li>
              <li>Transparent pricing with no hidden fees</li>
              <li>Flexible rental periods to fit your schedule</li>
              <li>Expert support to help you choose the right size</li>
              <li>Environmentally responsible waste disposal</li>
              <li>98% on-time delivery guarantee</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 mt-12">Our Commitment</h2>
            <p className="text-gray-700 mb-6">
              We're committed to providing the best dumpster rental experience possible. From the moment 
              you request a quote to the final pickup, we ensure every step is smooth and hassle-free. 
              Our team is always available to answer questions and help you find the perfect solution for 
              your project.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
