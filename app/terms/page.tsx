import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - DumpsterRentalPro',
  description: 'Terms of Service for DumpsterRentalPro dumpster rental services.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl opacity-90">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-4xl">
          <div className="prose prose-lg">
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using DumpsterRentalPro services, you agree to be bound by these Terms of Service.
            </p>

            <h2>2. Service Description</h2>
            <p>
              DumpsterRentalPro provides dumpster rental services for waste disposal. Services include delivery,
              rental period, and pickup of dumpsters in various sizes.
            </p>

            <h2>3. Rental Terms</h2>
            <p>
              Standard rental period is 7-10 days. Extended rentals may be available for additional fees.
              Customers are responsible for ensuring proper placement and accessibility of dumpsters.
            </p>

            <h2>4. Prohibited Materials</h2>
            <p>
              Hazardous materials, chemicals, batteries, tires, and electronics are prohibited. A complete list
              will be provided with your rental agreement.
            </p>

            <h2>5. Payment Terms</h2>
            <p>
              Payment is due upon delivery or as otherwise agreed. Additional fees may apply for weight overages
              or extended rental periods.
            </p>

            <h2>6. Liability</h2>
            <p>
              DumpsterRentalPro is not liable for damage to property during delivery or pickup. Customers are
              responsible for ensuring safe access to delivery locations.
            </p>

            <h2>7. Contact</h2>
            <p>
              For questions about these terms, please contact us at info@dumpsterrentalpro.com or 1-800-DUMPSTER.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
