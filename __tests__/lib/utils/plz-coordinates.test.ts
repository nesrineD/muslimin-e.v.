// Tests for PLZ coordinates utility

import {
  getPLZCoordinates,
  isValidGermanPLZ,
  getAvailablePLZCodes,
  searchPLZByCity,
  batchGeocodePLZ,
  getPLZBounds,
} from "@/lib/utils/plz-coordinates";

describe("PLZ Coordinates Utility", () => {
  describe("getPLZCoordinates", () => {
    it("should return coordinates for valid Berlin PLZ", () => {
      const berlinCoords = getPLZCoordinates("10115");
      expect(berlinCoords).toBeDefined();
      expect(berlinCoords?.city).toBe("Berlin");
    });

    it("should return null for invalid PLZ", () => {
      const invalidCoords = getPLZCoordinates("invalid");
      expect(invalidCoords).toBeNull();
    });
  });

  describe("isValidGermanPLZ", () => {
    it("should validate correct PLZ format", () => {
      expect(isValidGermanPLZ("10115")).toBe(true);
    });

    it("should reject invalid PLZ format", () => {
      expect(isValidGermanPLZ("abc")).toBe(false);
    });
  });

  describe("getAvailablePLZCodes", () => {
    it("should return array of available PLZ codes", () => {
      const availablePLZ = getAvailablePLZCodes();
      expect(availablePLZ.length).toBeGreaterThan(0);
    });
  });

  describe("searchPLZByCity", () => {
    it("should find PLZ codes for Berlin", () => {
      const berlinPLZ = searchPLZByCity("Berlin");
      expect(berlinPLZ.length).toBeGreaterThan(0);
    });
  });

  describe("batchGeocodePLZ", () => {
    it("should geocode multiple PLZ codes", () => {
      const batchResults = batchGeocodePLZ(["10115", "20095", "invalid"]);
      expect(batchResults.size).toBe(2);
    });
  });

  describe("getPLZBounds", () => {
    it("should calculate bounds for multiple PLZ codes", () => {
      const bounds = getPLZBounds(["10115", "20095"]);
      expect(bounds).not.toBeNull();
    });
  });

  describe("Mock Data Coverage", () => {
    it("should have coordinates for all mock PLZ codes", () => {
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
      expect(coverage).toBe(true);
    });
  });
});

