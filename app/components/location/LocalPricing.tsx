'use client';

import { useState } from 'react';

interface PricingInfo {
  price: number;
  description: string;
}

interface LocalPricingProps {
  pricing: {
    '10yard': PricingInfo;
    '20yard': PricingInfo;
    '30yard': PricingInfo;
    '40yard': PricingInfo;
  };
  cityName: string;
  stateName: string;
}

export default function LocalPricing({
  pricing,
  cityName,
  stateName,
}: LocalPricingProps) {
  const [selectedSize, setSelectedSize] = useState<string>('20yard');
  const [rentalDays, setRentalDays] = useState<number>(7);

  const sizes = [
    { key: '10yard', name: '10 Yard', dimensions: '12\' × 8\' × 3.5\'' },
    { key: '20yard', name: '20 Yard', dimensions: '22\' × 8\' × 4.5\'' },
    { key: '30yard', name: '30 Yard', dimensions: '22\' × 8\' × 6\'' },
    { key: '40yard', name: '40 Yard', dimensions: '22\' × 8\' × 8\'' },
  ];

  const selectedPricing =
    pricing[selectedSize as keyof typeof pricing] || pricing['20yard'];
  const totalPrice = selectedPricing.price;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Local Pricing for {cityName}
      </h2>
      <p className="text-gray-600 mb-6">
        Transparent pricing for dumpster rentals in {cityName}, {stateName}
      </p>

      {/* Dumpster Size Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Dumpster Size
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {sizes.map((size) => (
            <button
              key={size.key}
              onClick={() => setSelectedSize(size.key)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedSize === size.key
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="text-center">
                <p className="font-semibold text-gray-900">{size.name}</p>
                <p className="text-xs text-gray-600 mt-1">{size.dimensions}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Rental Period */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Rental Period
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min="1"
            max="30"
            value={rentalDays}
            onChange={(e) => setRentalDays(parseInt(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <span className="text-lg font-semibold text-gray-900 min-w-[80px]">
            {rentalDays} {rentalDays === 1 ? 'day' : 'days'}
          </span>
        </div>
      </div>

      {/* Pricing Display */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {sizes.find((s) => s.key === selectedSize)?.name} Dumpster
            </h3>
            <p className="text-sm text-gray-600">{selectedPricing.description}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-blue-600">${totalPrice}</p>
            <p className="text-sm text-gray-600">for {rentalDays} days</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">
            What&apos;s Included:
          </h4>
          <ul className="space-y-2">
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-green-600 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm text-gray-700">
                Delivery and pickup in {cityName}
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-green-600 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm text-gray-700">
                {rentalDays}-day rental period
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-green-600 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm text-gray-700">
                Disposal fees (up to weight limit)
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-green-600 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm text-gray-700">
                Same-day delivery available
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* CTA Button */}
      <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
        Get Instant Quote for {cityName}
      </button>
      <p className="text-center text-sm text-gray-600 mt-3">
        No credit card required. Instant pricing.
      </p>
    </div>
  );
}
