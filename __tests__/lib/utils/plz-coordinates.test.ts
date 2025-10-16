// Basic validation tests for PLZ coordinates utility
// Note: Full Jest setup needed for complete testing

import {
  getPLZCoordinates,
  isValidGermanPLZ,
  getAvailablePLZCodes,
  searchPLZByCity,
  getPLZWithinRadius,
  batchGeocodePLZ,
  getPLZBounds,
  PLZ_COORDINATES,
} from "@/lib/utils/plz-coordinates";

// Basic function validation (can be run without Jest)
console.log("PLZ Coordinates Utility Tests:");

// Test 1: Valid PLZ lookup
const berlinCoords = getPLZCoordinates("10115");
console.log("✓ Berlin PLZ 10115:", berlinCoords?.city === "Berlin");

// Test 2: Invalid PLZ handling
const invalidCoords = getPLZCoordinates("invalid");
console.log("✓ Invalid PLZ returns null:", invalidCoords === null);

// Test 3: PLZ validation
console.log("✓ Valid PLZ format:", isValidGermanPLZ("10115") === true);
console.log("✓ Invalid PLZ format:", isValidGermanPLZ("abc") === false);

// Test 4: Available PLZ codes
const availablePLZ = getAvailablePLZCodes();
console.log("✓ Available PLZ count:", availablePLZ.length > 0);

// Test 5: City search
const berlinPLZ = searchPLZByCity("Berlin");
console.log("✓ Berlin search results:", berlinPLZ.length > 0);

// Test 6: Batch geocoding
const batchResults = batchGeocodePLZ(["10115", "20095", "invalid"]);
console.log("✓ Batch geocoding:", batchResults.size === 2);

// Test 7: PLZ bounds calculation
const bounds = getPLZBounds(["10115", "20095"]);
console.log("✓ Bounds calculation:", bounds !== null);

// Test coverage validation
const mockPLZUsed = [
  "10115",
  "20095",
  "80331",
  "40210",
  "50667",
  "60311",
  "70173",
  "90402",
  "30159",
  "01307",
];
const coverage = mockPLZUsed.every((plz) => getPLZCoordinates(plz) !== null);
console.log("✓ Mock data PLZ coverage:", coverage);

console.log("All basic tests completed.");

export {}; // Make this a module
