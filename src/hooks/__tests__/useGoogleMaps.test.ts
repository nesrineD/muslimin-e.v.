import { renderHook } from "@testing-library/react";
import { useGoogleMapsLoader } from "@/hooks/useGoogleMaps";

// Mock Google Maps API
const mockGoogle = {
  maps: {
    Map: jest.fn(),
    Marker: jest.fn(),
    LatLng: jest.fn(),
    event: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
  },
};

// Mock window.google
Object.defineProperty(window, "google", {
  value: mockGoogle,
  writable: true,
});

describe("useGoogleMapsLoader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should load Google Maps API successfully", () => {
    const { result } = renderHook(() => useGoogleMapsLoader("test-api-key"));

    expect(result.current.isLoaded).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.google).toBe(mockGoogle);
  });

  it("should provide createMap function", () => {
    const { result } = renderHook(() => useGoogleMapsLoader("test-api-key"));

    expect(typeof result.current.createMap).toBe("function");
  });
});

describe("Google Maps Integration", () => {
  it("should have proper TypeScript types", () => {
    // This test ensures types are properly defined
    const apiKey = "test-key";
    const element = document.createElement("div");
    const options: google.maps.MapOptions = {
      center: { lat: 52.52, lng: 13.405 },
      zoom: 10,
    };

    // These should compile without errors
    expect(typeof apiKey).toBe("string");
    expect(element).toBeInstanceOf(HTMLElement);
    expect(options.center).toBeDefined();
    expect(options.zoom).toBe(10);
  });
});
