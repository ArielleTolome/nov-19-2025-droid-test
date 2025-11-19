import { City } from '@/lib/location';

interface ServiceAreaMapProps {
  city: City;
}

export default function ServiceAreaMap({ city }: ServiceAreaMapProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Map placeholder - can be replaced with Google Maps, Mapbox, etc. */}
      <div className="relative h-80 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
        <div className="text-center">
          <svg
            className="w-16 h-16 text-blue-600 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {city.name}, {city.stateAbbr}
          </h3>
          <p className="text-gray-600">Service Area Map</p>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Service Area Details
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Location</p>
            <p className="text-base font-medium text-gray-900">
              {city.name}, {city.stateAbbr}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Population</p>
            <p className="text-base font-medium text-gray-900">
              {city.population.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">ZIP Codes Served</p>
            <p className="text-base font-medium text-gray-900">
              {city.zipCodes.length} ZIP codes
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Coordinates</p>
            <p className="text-sm font-medium text-gray-900">
              {city.latitude.toFixed(4)}, {city.longitude.toFixed(4)}
            </p>
          </div>
        </div>

        {city.zipCodes && city.zipCodes.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              Primary ZIP Codes We Serve:
            </p>
            <div className="flex flex-wrap gap-2">
              {city.zipCodes.slice(0, 10).map((zip) => (
                <span
                  key={zip}
                  className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                >
                  {zip}
                </span>
              ))}
              {city.zipCodes.length > 10 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                  +{city.zipCodes.length - 10} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
