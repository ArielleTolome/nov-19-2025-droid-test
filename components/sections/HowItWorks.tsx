export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Choose Your Dumpster',
      description: 'Select the right size for your project based on our expert recommendations',
    },
    {
      number: 2,
      title: 'Schedule Delivery',
      description: 'Pick your delivery date and location. We\'ll handle the rest',
    },
    {
      number: 3,
      title: 'Fill Your Dumpster',
      description: 'Load up your debris at your own pace within the rental period',
    },
    {
      number: 4,
      title: 'Schedule Pickup',
      description: 'We\'ll haul away your waste and handle proper disposal',
    },
  ];

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How DumpsterRentalPro Works</h2>
          <p className="text-xl text-gray-600">Getting your dumpster is simple, fast, and hassle-free</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
