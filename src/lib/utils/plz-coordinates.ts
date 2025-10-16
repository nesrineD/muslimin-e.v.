import { PLZCoordinates } from "@/types/location";

// German postal code to coordinates mapping
// Data sourced from German postal service (simplified for demo)
const PLZ_COORDINATES: Record<string, PLZCoordinates> = {
  // Berlin
  "10115": { lat: 52.5244, lng: 13.4105, city: "Berlin", state: "Berlin" },
  "10117": { lat: 52.5186, lng: 13.3989, city: "Berlin", state: "Berlin" },
  "10178": { lat: 52.5198, lng: 13.4141, city: "Berlin", state: "Berlin" },

  // Hamburg
  "20095": { lat: 53.5511, lng: 9.9937, city: "Hamburg", state: "Hamburg" },
  "22765": {
    lat: 53.5653,
    lng: 9.9057,
    city: "Hamburg-Altona",
    state: "Hamburg",
  },
  "20357": {
    lat: 53.5569,
    lng: 9.9669,
    city: "Hamburg-Eimsbüttel",
    state: "Hamburg",
  },

  // München
  "80331": { lat: 48.1374, lng: 11.5755, city: "München", state: "Bayern" },
  "80335": { lat: 48.1447, lng: 11.5505, city: "München", state: "Bayern" },
  "81669": { lat: 48.1298, lng: 11.6073, city: "München", state: "Bayern" },

  // Düsseldorf
  "40210": {
    lat: 51.2277,
    lng: 6.7735,
    city: "Düsseldorf",
    state: "Nordrhein-Westfalen",
  },
  "40213": {
    lat: 51.2254,
    lng: 6.7763,
    city: "Düsseldorf",
    state: "Nordrhein-Westfalen",
  },

  // Köln
  "50667": {
    lat: 50.9375,
    lng: 6.9603,
    city: "Köln",
    state: "Nordrhein-Westfalen",
  },
  "50674": {
    lat: 50.9335,
    lng: 6.9508,
    city: "Köln",
    state: "Nordrhein-Westfalen",
  },

  // Frankfurt am Main
  "60311": {
    lat: 50.1109,
    lng: 8.6821,
    city: "Frankfurt am Main",
    state: "Hessen",
  },
  "60313": {
    lat: 50.1155,
    lng: 8.6761,
    city: "Frankfurt am Main",
    state: "Hessen",
  },

  // Stuttgart
  "70173": {
    lat: 48.7758,
    lng: 9.1829,
    city: "Stuttgart",
    state: "Baden-Württemberg",
  },
  "70178": {
    lat: 48.7733,
    lng: 9.178,
    city: "Stuttgart",
    state: "Baden-Württemberg",
  },

  // Nürnberg
  "90402": { lat: 49.4521, lng: 11.0767, city: "Nürnberg", state: "Bayern" },
  "90403": { lat: 49.4569, lng: 11.0724, city: "Nürnberg", state: "Bayern" },

  // Hannover
  "30159": {
    lat: 52.3759,
    lng: 9.732,
    city: "Hannover",
    state: "Niedersachsen",
  },
  "30161": {
    lat: 52.3676,
    lng: 9.732,
    city: "Hannover",
    state: "Niedersachsen",
  },

  // Dresden
  "01307": { lat: 51.0504, lng: 13.7373, city: "Dresden", state: "Sachsen" },
  "01309": { lat: 51.0569, lng: 13.7387, city: "Dresden", state: "Sachsen" },

  // Essen
  "45127": {
    lat: 51.4556,
    lng: 7.0116,
    city: "Essen",
    state: "Nordrhein-Westfalen",
  },
  "45128": {
    lat: 51.4518,
    lng: 7.0074,
    city: "Essen",
    state: "Nordrhein-Westfalen",
  },

  // Bremen
  "28195": { lat: 53.0793, lng: 8.8017, city: "Bremen", state: "Bremen" },
  "28203": { lat: 53.0758, lng: 8.8071, city: "Bremen", state: "Bremen" },

  // Bonn
  "53111": {
    lat: 50.7374,
    lng: 7.0982,
    city: "Bonn",
    state: "Nordrhein-Westfalen",
  },
  "53113": {
    lat: 50.7323,
    lng: 7.1022,
    city: "Bonn",
    state: "Nordrhein-Westfalen",
  },

  // Erfurt
  "99084": { lat: 50.9848, lng: 11.0299, city: "Erfurt", state: "Thüringen" },
  "99085": { lat: 50.9806, lng: 11.0347, city: "Erfurt", state: "Thüringen" },

  // Karlsruhe
  "76133": {
    lat: 49.0069,
    lng: 8.4037,
    city: "Karlsruhe",
    state: "Baden-Württemberg",
  },
  "76135": {
    lat: 49.0094,
    lng: 8.3858,
    city: "Karlsruhe",
    state: "Baden-Württemberg",
  },

  // Test/Demo PLZ codes
  "12345": { lat: 52.52, lng: 13.405, city: "Test City", state: "Test State" },
  "99999": {
    lat: 51.1657,
    lng: 10.4515,
    city: "Demo City",
    state: "Demo State",
  },
};

/**
 * Get geographic coordinates for a German postal code (PLZ)
 * @param plz - 5-digit German postal code
 * @returns Coordinates object with lat, lng, city, state or null if not found
 */
export function getPLZCoordinates(plz: string): PLZCoordinates | null {
  // Validate PLZ format
  if (!plz || !isValidGermanPLZ(plz)) {
    return null;
  }

  return PLZ_COORDINATES[plz] || null;
}

/**
 * Validate German postal code format
 * @param plz - Postal code to validate
 * @returns True if valid 5-digit German PLZ format
 */
export function isValidGermanPLZ(plz: string): boolean {
  const plzRegex = /^\d{5}$/;

  if (!plzRegex.test(plz)) {
    return false;
  }

  // Additional validation: German PLZ range (01000-99999)
  const numericPLZ = parseInt(plz, 10);
  return numericPLZ >= 1000 && numericPLZ <= 99999;
}

/**
 * Get all available PLZ codes in the coordinate database
 * @returns Array of available PLZ codes
 */
export function getAvailablePLZCodes(): string[] {
  return Object.keys(PLZ_COORDINATES).sort();
}

/**
 * Search for PLZ codes by city name
 * @param cityName - City name to search for (case-insensitive)
 * @returns Array of PLZ codes for the city
 */
export function searchPLZByCity(cityName: string): string[] {
  const searchTerm = cityName.toLowerCase();

  return Object.entries(PLZ_COORDINATES)
    .filter(([, coords]) => coords.city.toLowerCase().includes(searchTerm))
    .map(([plz]) => plz)
    .sort();
}

/**
 * Get PLZ codes within approximate radius of a center point
 * @param centerPLZ - Center PLZ code
 * @param radiusKm - Radius in kilometers (approximate)
 * @returns Array of PLZ codes within radius
 */
export function getPLZWithinRadius(
  centerPLZ: string,
  radiusKm: number
): string[] {
  const centerCoords = getPLZCoordinates(centerPLZ);
  if (!centerCoords) return [];

  return Object.entries(PLZ_COORDINATES)
    .filter(([plz, coords]) => {
      if (plz === centerPLZ) return true;

      const distance = calculateDistance(
        centerCoords.lat,
        centerCoords.lng,
        coords.lat,
        coords.lng
      );

      return distance <= radiusKm;
    })
    .map(([plz]) => plz)
    .sort();
}

/**
 * Calculate approximate distance between two coordinates using Haversine formula
 * @param lat1 - Latitude of point 1
 * @param lng1 - Longitude of point 1
 * @param lat2 - Latitude of point 2
 * @param lng2 - Longitude of point 2
 * @returns Distance in kilometers
 */
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Convert degrees to radians
 * @param degrees - Degrees to convert
 * @returns Radians
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Batch geocode multiple PLZ codes
 * @param plzList - Array of PLZ codes to geocode
 * @returns Map of PLZ to coordinates (only successful lookups)
 */
export function batchGeocodePLZ(
  plzList: string[]
): Map<string, PLZCoordinates> {
  const results = new Map<string, PLZCoordinates>();

  plzList.forEach((plz) => {
    const coords = getPLZCoordinates(plz);
    if (coords) {
      results.set(plz, coords);
    }
  });

  return results;
}

/**
 * Get center point (bounds) for a list of PLZ codes
 * @param plzList - Array of PLZ codes
 * @returns Center coordinates and bounds for map fitting
 */
export function getPLZBounds(plzList: string[]): {
  center: { lat: number; lng: number };
  bounds: { north: number; south: number; east: number; west: number };
} | null {
  const coordinates = plzList
    .map((plz) => getPLZCoordinates(plz))
    .filter((coords): coords is PLZCoordinates => coords !== null);

  if (coordinates.length === 0) return null;

  const lats = coordinates.map((c) => c.lat);
  const lngs = coordinates.map((c) => c.lng);

  const bounds = {
    north: Math.max(...lats),
    south: Math.min(...lats),
    east: Math.max(...lngs),
    west: Math.min(...lngs),
  };

  const center = {
    lat: (bounds.north + bounds.south) / 2,
    lng: (bounds.east + bounds.west) / 2,
  };

  return { center, bounds };
}

// Export the constants for testing and development
export { PLZ_COORDINATES };
