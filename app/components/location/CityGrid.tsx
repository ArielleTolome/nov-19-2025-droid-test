import Link from 'next/link';
import { City } from '@/lib/location';

interface CityGridProps {
  cities: City[];
  stateSlug: string;
}

export default function CityGrid({ cities, stateSlug }: CityGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cities.map((city) => (
        <Link
          key={city.slug}
          href={`/${stateSlug}/${city.slug}`}
          className="group block p-6 bg-white border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-lg transition-all duration-200"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {city.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Population: {city.population.toLocaleString()}
              </p>
              {city.zipCodes && city.zipCodes.length > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  Zip Codes: {city.zipCodes.slice(0, 3).join(', ')}
                  {city.zipCodes.length > 3 && '...'}
                </p>
              )}
            </div>
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Link>
      ))}
    </div>
  );
}
