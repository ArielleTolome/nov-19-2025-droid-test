import React from 'react';
import Link from 'next/link';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export interface DumpsterSize {
  name: string;
  size: string;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  capacity?: string;
  weight?: string;
  price?: string;
  priceUnit?: string;
  popular?: boolean;
  bestFor?: string[];
  features?: string[];
  href?: string;
}

export interface DumpsterSizeCardProps {
  dumpster: DumpsterSize;
  className?: string;
  onSelect?: (dumpster: DumpsterSize) => void;
}

export const DumpsterSizeCard: React.FC<DumpsterSizeCardProps> = ({
  dumpster,
  className = '',
  onSelect,
}) => {
  const {
    name,
    size,
    dimensions,
    capacity,
    weight,
    price,
    priceUnit = 'starting at',
    popular = false,
    bestFor = [],
    features = [],
    href = '/quote',
  } = dumpster;

  return (
    <Card
      className={`relative h-full flex flex-col ${popular ? 'border-2 border-blue-500 shadow-xl' : ''} ${className}`}
      padding="lg"
    >
      {/* Popular Badge */}
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge variant="popular" size="md">
            Most Popular
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {name}
        </h3>
        <div className="text-4xl font-bold text-blue-600 mb-1">
          {size}
        </div>
        {dimensions && (
          <p className="text-sm text-gray-500">
            {dimensions.length}&apos; L × {dimensions.width}&apos; W × {dimensions.height}&apos; H
          </p>
        )}
      </div>

      {/* Visual Representation */}
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-6 mb-6">
        <div className="relative">
          {/* Simple 3D-ish dumpster illustration */}
          <div className="w-full aspect-[4/3] flex items-end justify-center">
            <svg viewBox="0 0 200 150" className="w-full h-full">
              <defs>
                <linearGradient id={`grad-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#1D4ED8', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              {/* Dumpster body */}
              <rect x="30" y="50" width="140" height="80" fill={`url(#grad-${size})`} rx="4" />
              {/* Front panel */}
              <rect x="30" y="50" width="140" height="10" fill="#1E40AF" opacity="0.5" />
              {/* Side shadow */}
              <rect x="30" y="60" width="10" height="70" fill="#000" opacity="0.2" />
              {/* Size label */}
              <text x="100" y="95" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold">
                {size}
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="space-y-3 mb-6">
        {capacity && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 flex items-center">
              <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Capacity
            </span>
            <span className="font-semibold text-gray-900">{capacity}</span>
          </div>
        )}
        {weight && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 flex items-center">
              <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
              Weight Limit
            </span>
            <span className="font-semibold text-gray-900">{weight}</span>
          </div>
        )}
      </div>

      {/* Best For */}
      {bestFor.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Best For:</h4>
          <ul className="space-y-1">
            {bestFor.map((item, index) => (
              <li key={index} className="flex items-start text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Features */}
      {features.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Included:</h4>
          <ul className="space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start text-sm text-gray-600">
                <svg className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Price */}
      {price && (
        <div className="text-center mb-6 mt-auto pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-600 mb-1">{priceUnit}</div>
          <div className="text-3xl font-bold text-gray-900">
            {price}
          </div>
        </div>
      )}

      {/* CTA */}
      <Link href={href} onClick={() => onSelect?.(dumpster)}>
        <Button
          variant={popular ? 'primary' : 'outline'}
          size="lg"
          fullWidth
        >
          Select This Size
        </Button>
      </Link>
    </Card>
  );
};

export default DumpsterSizeCard;
