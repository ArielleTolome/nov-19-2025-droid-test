import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works - DumpsterRentalPro',
  description: 'Learn how easy it is to rent a dumpster. Simple 4-step process from quote to pickup.',
};

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      title: 'Request Your Quote',
      description: 'Fill out our quick quote form or call us. Tell us your location, project type, and preferred dumpster size. We\'ll provide a transparent quote with no hidden fees.',
    },
    {
      number: 2,
      title: 'Schedule Delivery',
      description: 'Choose your delivery date and location. We\'ll confirm the details and ensure our truck can access the drop-off location. Most areas offer same-day or next-day delivery.',
    },
    {
      number: 3,
      title: 'Fill Your Dumpster',
      description: 'Load your debris at your own pace. Our dumpsters are designed for easy loading, and you have the full rental period (typically 7-10 days) to complete your project.',
    },
    {
      number: 4,
      title: 'Schedule Pickup',
      description: 'When you\'re ready, give us a call or schedule pickup online. We\'ll haul away your waste and ensure it\'s disposed of properly and responsibly.',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">How It Works</h1>
          <p className="text-xl opacity-90">Getting your dumpster is simple, fast, and hassle-free</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-4xl">
          <div className="space-y-12">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {step.number}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">{step.title}</h2>
                  <p className="text-gray-700 text-lg">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of satisfied customers who choose DumpsterRentalPro
          </p>
          <a href="/contact" className="btn-primary text-lg px-8 py-4">
            Get Your Free Quote
          </a>
        </div>
      </section>
    </div>
  );
}
