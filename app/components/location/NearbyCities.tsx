import Link from 'next/link';
import { City } from '@/lib/location';

interface NearbyCitiesProps {
  cities: City[];
  currentCity: string;
}

export default function NearbyCities({
  cities,
  currentCity,
}: NearbyCitiesProps) {
  if (cities.length === 0) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Nearby Cities We Serve
      </h2>
      <p className="text-gray-600 mb-6">
        We also provide dumpster rental services in these nearby cities:
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/${city.stateSlug}/${city.slug}`}
            className="group flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-600 hover:shadow-md transition-all duration-200"
          >
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {city.name}
              </h3>
              <p className="text-sm text-gray-500">
                {city.population.toLocaleString()} residents
              </p>
            </div>
            <svg
              className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0"
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
          </Link>
        ))}
      </div>
    </div>
  );
}
