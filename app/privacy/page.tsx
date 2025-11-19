import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - DumpsterRentalPro',
  description: 'Privacy Policy for DumpsterRentalPro dumpster rental services.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl opacity-90">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-4xl">
          <div className="prose prose-lg">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly, including name, email, phone number, address,
              and project details when you request a quote or use our services.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use your information to provide services, process quotes, communicate with you, and improve
              our services. We do not sell your personal information to third parties.
            </p>

            <h2>3. Information Sharing</h2>
            <p>
              We may share your information with service providers who assist in delivering our services, or
              as required by law.
            </p>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, no
              method of transmission over the internet is 100% secure.
            </p>

            <h2>5. Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal information. Contact us at
              info@dumpsterrentalpro.com to exercise these rights.
            </p>

            <h2>6. Cookies</h2>
            <p>
              We use cookies to improve your experience on our website. You can control cookie preferences
              through your browser settings.
            </p>

            <h2>7. Contact</h2>
            <p>
              For questions about this privacy policy, please contact us at info@dumpsterrentalpro.com or
              1-800-DUMPSTER.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
