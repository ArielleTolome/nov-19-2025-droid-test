import statesData from '@/data/states.json';
import citiesData from '@/data/cities.json';

// Type definitions for location data
export interface State {
  name: string;
  abbreviation: string;
  population: number;
  slug: string;
}

export interface City {
  name: string;
  population: number;
  zipCodes: string[];
  latitude: number;
  longitude: number;
  slug: string;
  stateAbbr: string;
  stateName: string;
  stateSlug: string;
}

// Load all states
export function getAllStates(): State[] {
  return statesData as State[];
}

// Get state by slug
export function getStateBySlug(slug: string): State | undefined {
  return statesData.find((state: State) => state.slug === slug);
}

// Load all cities
export function getAllCities(): City[] {
  return citiesData as City[];
}

// Get cities for a specific state
export function getCitiesByState(stateSlug: string): City[] {
  return citiesData.filter((city: City) => city.stateSlug === stateSlug);
}

// Get city by state and city slug
export function getCityByStateAndSlug(
  stateSlug: string,
  citySlug: string
): City | undefined {
  return citiesData.find(
    (city: City) => city.stateSlug === stateSlug && city.slug === citySlug
  );
}

// Get nearby cities (cities in the same state, excluding the current city)
export function getNearbyCities(
  stateSlug: string,
  citySlug: string,
  limit: number = 6
): City[] {
  const currentCity = getCityByStateAndSlug(stateSlug, citySlug);
  if (!currentCity) return [];

  const citiesInState = getCitiesByState(stateSlug).filter(
    (city) => city.slug !== citySlug
  );

  // Sort by population and take top cities
  return citiesInState
    .sort((a, b) => b.population - a.population)
    .slice(0, limit);
}

// Calculate distance between two coordinates (Haversine formula)
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Get nearby cities by distance
export function getNearbyCitiesByDistance(
  stateSlug: string,
  citySlug: string,
  limit: number = 6
): City[] {
  const currentCity = getCityByStateAndSlug(stateSlug, citySlug);
  if (!currentCity) return [];

  const citiesInState = getCitiesByState(stateSlug).filter(
    (city) => city.slug !== citySlug
  );

  // Calculate distances and sort
  const citiesWithDistance = citiesInState.map((city) => ({
    ...city,
    distance: calculateDistance(
      currentCity.latitude,
      currentCity.longitude,
      city.latitude,
      city.longitude
    ),
  }));

  return citiesWithDistance
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}

// Format city name for display (handle special characters)
export function formatCityName(name: string): string {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Format state name for display
export function formatStateName(name: string): string {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Get state pricing (can be customized based on state)
export function getStatePricing(stateSlug: string) {
  // Base pricing
  const basePricing = {
    '10yard': { price: 299, description: 'Perfect for small cleanups' },
    '20yard': { price: 399, description: 'Ideal for medium projects' },
    '30yard': { price: 499, description: 'Great for large renovations' },
    '40yard': { price: 599, description: 'Best for major construction' },
  };

  // State-specific pricing adjustments (example)
  const statePricingAdjustments: { [key: string]: number } = {
    california: 1.15,
    'new-york': 1.2,
    texas: 0.95,
    florida: 1.0,
  };

  const multiplier = statePricingAdjustments[stateSlug] || 1.0;

  return {
    '10yard': {
      ...basePricing['10yard'],
      price: Math.round(basePricing['10yard'].price * multiplier),
    },
    '20yard': {
      ...basePricing['20yard'],
      price: Math.round(basePricing['20yard'].price * multiplier),
    },
    '30yard': {
      ...basePricing['30yard'],
      price: Math.round(basePricing['30yard'].price * multiplier),
    },
    '40yard': {
      ...basePricing['40yard'],
      price: Math.round(basePricing['40yard'].price * multiplier),
    },
  };
}

// Get city pricing (can be customized based on city)
export function getCityPricing(citySlug: string, stateSlug: string) {
  return getStatePricing(stateSlug);
}
