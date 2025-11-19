'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function QuoteForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    zipCode: '',
    dumpsterSize: '',
    serviceType: '',
    projectType: '',
    rentalDuration: '7-10 days',
    deliveryDate: '',
    address: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/contact/success');
      } else {
        alert('There was an error submitting your quote. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
      alert('There was an error submitting your quote. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6">Request Your Quote</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2">Full Name *</label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">Email *</label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold mb-2">Phone *</label>
            <input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="zipCode" className="block text-sm font-semibold mb-2">Zip Code *</label>
            <input
              type="text"
              id="zipCode"
              required
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="dumpsterSize" className="block text-sm font-semibold mb-2">Dumpster Size *</label>
            <select
              id="dumpsterSize"
              required
              value={formData.dumpsterSize}
              onChange={(e) => setFormData({ ...formData, dumpsterSize: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select size</option>
              <option value="10">10 Yard</option>
              <option value="20">20 Yard</option>
              <option value="30">30 Yard</option>
              <option value="40">40 Yard</option>
            </select>
          </div>
          <div>
            <label htmlFor="serviceType" className="block text-sm font-semibold mb-2">Service Type *</label>
            <select
              id="serviceType"
              required
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select service</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="construction">Construction</option>
              <option value="roll-off">Roll-Off</option>
            </select>
          </div>
          <div>
            <label htmlFor="projectType" className="block text-sm font-semibold mb-2">Project Type *</label>
            <select
              id="projectType"
              required
              value={formData.projectType}
              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select type</option>
              <option value="construction">Construction</option>
              <option value="demolition">Demolition</option>
              <option value="cleanout">Cleanout</option>
              <option value="roofing">Roofing</option>
              <option value="landscaping">Landscaping</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="rentalDuration" className="block text-sm font-semibold mb-2">Rental Duration</label>
            <select
              id="rentalDuration"
              value={formData.rentalDuration}
              onChange={(e) => setFormData({ ...formData, rentalDuration: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="7-10 days">7-10 days</option>
              <option value="2 weeks">2 weeks</option>
              <option value="3 weeks">3 weeks</option>
              <option value="1 month">1 month</option>
            </select>
          </div>
          <div>
            <label htmlFor="deliveryDate" className="block text-sm font-semibold mb-2">Preferred Delivery Date</label>
            <input
              type="date"
              id="deliveryDate"
              value={formData.deliveryDate}
              onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-semibold mb-2">Delivery Address</label>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold mb-2">Additional Details</label>
            <textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary py-4 text-lg disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Get Your Free Quote'}
        </button>
      </form>
    </div>
  );
}
