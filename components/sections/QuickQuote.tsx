'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function QuickQuote() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    zipCode: '',
    dumpsterSize: '',
    projectType: '',
    phone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/contact?zipCode=${formData.zipCode}&size=${formData.dumpsterSize}&type=${formData.projectType}`);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8">Get Your Free Quote in 30 Seconds</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="zip-code" className="block text-sm font-semibold mb-2">Zip Code</label>
                <input
                  type="text"
                  id="zip-code"
                  required
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  placeholder="Enter your zip code"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="dumpster-size" className="block text-sm font-semibold mb-2">Dumpster Size</label>
                <select
                  id="dumpster-size"
                  required
                  value={formData.dumpsterSize}
                  onChange={(e) => setFormData({ ...formData, dumpsterSize: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select size</option>
                  <option value="10">10 Yard - Small Projects</option>
                  <option value="20">20 Yard - Medium Projects</option>
                  <option value="30">30 Yard - Large Projects</option>
                  <option value="40">40 Yard - Very Large Projects</option>
                </select>
              </div>
              <div>
                <label htmlFor="project-type" className="block text-sm font-semibold mb-2">Project Type</label>
                <select
                  id="project-type"
                  required
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select project type</option>
                  <option value="construction">Construction</option>
                  <option value="demolition">Demolition</option>
                  <option value="cleanout">Property Cleanout</option>
                  <option value="roofing">Roofing</option>
                  <option value="landscaping">Landscaping</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <button type="submit" className="w-full btn-primary py-4 text-lg">
              Get Your Quote Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
