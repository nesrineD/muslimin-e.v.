import { useState, useEffect, useCallback } from "react";
import "../types/google-maps";

interface GoogleMapsState {
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
}

interface GoogleMapsHookReturn extends GoogleMapsState {
  createMap: (
    element: HTMLElement,
    options: google.maps.MapOptions
  ) => google.maps.Map | null;
}

// Global loading state to prevent multiple script loads
let scriptLoaded = false;
let scriptLoading = false;
let scriptError: string | null = null;

/**
 * Simplified hook for Google Maps JavaScript API integration
 */
export function useGoogleMaps(config?: {
  apiKey?: string;
}): GoogleMapsHookReturn {
  const [state, setState] = useState<GoogleMapsState>({
    isLoaded: scriptLoaded,
    isLoading: scriptLoading,
    error: scriptError,
  });

  const apiKey =
    config?.apiKey || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  useEffect(() => {
    if (scriptLoaded) {
      setState({ isLoaded: true, isLoading: false, error: null });
      return;
    }

    if (scriptError) {
      setState({ isLoaded: false, isLoading: false, error: scriptError });
      return;
    }

    if (scriptLoading) {
      setState({ isLoaded: false, isLoading: true, error: null });
      return;
    }

    if (!apiKey) {
      const error =
        "Google Maps API Key fehlt. Bitte NEXT_PUBLIC_GOOGLE_MAPS_API_KEY konfigurieren.";
      scriptError = error;
      setState({ isLoaded: false, isLoading: false, error });
      return;
    }

    // Check if Google Maps is already available
    if (window.google?.maps?.Map) {
      scriptLoaded = true;
      setState({ isLoaded: true, isLoading: false, error: null });
      return;
    }

    // Load the Google Maps script
    scriptLoading = true;
    setState({ isLoaded: false, isLoading: true, error: null });

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly`;
    script.async = true;

    script.onload = () => {
      scriptLoading = false;
      scriptLoaded = true;
      setState({ isLoaded: true, isLoading: false, error: null });
    };

    script.onerror = () => {
      const error =
        "Google Maps konnte nicht geladen werden. Überprüfen Sie Ihre Internetverbindung und den API-Schlüssel.";
      scriptLoading = false;
      scriptError = error;
      setState({ isLoaded: false, isLoading: false, error });
    };

    document.head.appendChild(script);
  }, [apiKey]);

  const createMap = useCallback(
    (
      element: HTMLElement,
      options: google.maps.MapOptions
    ): google.maps.Map | null => {
      if (!scriptLoaded || !window.google?.maps) {
        return null;
      }

      try {
        return new google.maps.Map(element, options);
      } catch (error) {
        console.error("Error creating Google Map:", error);
        return null;
      }
    },
    []
  );

  return {
    isLoaded: state.isLoaded,
    isLoading: state.isLoading,
    error: state.error,
    createMap,
  };
}

/**
 * Hook for managing map markers
 */
export function useMapMarkers(map: google.maps.Map | null) {
  const [markers, setMarkers] = useState<Map<string, google.maps.Marker>>(
    new Map()
  );

  const addMarker = useCallback(
    (id: string, options: google.maps.MarkerOptions) => {
      if (!map) return null;

      // Remove existing marker if it exists
      const existingMarker = markers.get(id);
      if (existingMarker) {
        existingMarker.setMap(null);
      }

      const marker = new google.maps.Marker({
        ...options,
        map,
      });

      setMarkers((prev) => {
        const newMarkers = new Map(prev);
        newMarkers.set(id, marker);
        return newMarkers;
      });

      return marker;
    },
    [map, markers]
  );

  const removeMarker = useCallback(
    (id: string) => {
      const marker = markers.get(id);
      if (marker) {
        marker.setMap(null);
        setMarkers((prev) => {
          const newMarkers = new Map(prev);
          newMarkers.delete(id);
          return newMarkers;
        });
      }
    },
    [markers]
  );

  const clearMarkers = useCallback(() => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers(new Map());
  }, [markers]);

  return {
    markers: Array.from(markers.values()),
    addMarker,
    removeMarker,
    clearMarkers,
  };
}

/**
 * Hook for managing map events
 */
export function useMapEvents(map: google.maps.Map | null) {
  const addListener = useCallback(
    (event: string, handler: (event: any) => void) => {
      if (!map) return null;
      return google.maps.event.addListener(map, event, handler);
    },
    [map]
  );

  const removeListener = useCallback(
    (listener: google.maps.MapsEventListener) => {
      if (listener) {
        google.maps.event.removeListener(listener);
      }
    },
    []
  );

  return {
    addListener,
    removeListener,
  };
}

// Default map options
export const DEFAULT_MAP_OPTIONS: google.maps.MapOptions = {
  center: { lat: 52.52, lng: 13.405 }, // Berlin
  zoom: 7,
  mapTypeId: "roadmap" as google.maps.MapTypeId,
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: true,
  clickableIcons: false,
  gestureHandling: "cooperative",
  styles: [
    {
      featureType: "poi",
      elementType: "labels.text",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.business",
      stylers: [{ visibility: "off" }],
    },
  ],
};
