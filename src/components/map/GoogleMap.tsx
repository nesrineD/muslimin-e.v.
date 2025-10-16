"use client";

import React, { useRef, useEffect, useCallback } from "react";
import {
  useGoogleMaps,
  useMapMarkers,
  useMapEvents,
} from "@/hooks/useGoogleMaps";

interface GoogleMapProps {
  apiKey: string;
  center: { lat: number; lng: number };
  zoom?: number;
  className?: string;
  children?: React.ReactNode;
  onMapLoad?: (map: google.maps.Map) => void;
  onMapClick?: (event: google.maps.MapMouseEvent) => void;
  onMarkerClick?: (markerId: string, marker: google.maps.Marker) => void;
}

export const GoogleMap: React.FC<GoogleMapProps> = ({
  apiKey,
  center,
  zoom = 10,
  className = "",
  children,
  onMapLoad,
  onMapClick,
  onMarkerClick,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { isLoaded, isLoading, error, createMap } = useGoogleMaps({
    apiKey,
  });
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  // Initialize map
  useEffect(() => {
    if (isLoaded && mapRef.current && !mapInstanceRef.current) {
      const mapOptions: google.maps.MapOptions = {
        center,
        zoom,
        mapTypeId: "roadmap",
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

      const map = createMap(mapRef.current, mapOptions);
      if (map) {
        mapInstanceRef.current = map;
        onMapLoad?.(map);
      }
    }
  }, [isLoaded, center, zoom, createMap, onMapLoad]);

  // Handle map click events
  const { addListener, removeListener } = useMapEvents(mapInstanceRef.current);

  useEffect(() => {
    if (mapInstanceRef.current && onMapClick) {
      const listener = addListener("click", onMapClick);
      return () => {
        if (listener) removeListener(listener);
      };
    }
  }, [addListener, removeListener, onMapClick]);

  // Update map center and zoom when props change
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setCenter(center);
      mapInstanceRef.current.setZoom(zoom);
    }
  }, [center, zoom]);

  // Error state
  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}
      >
        <div className="text-center p-8">
          <div className="text-red-600 mb-2">
            <svg
              className="w-8 h-8 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-gray-700 text-sm">
            Karte konnte nicht geladen werden
          </p>
          <p className="text-gray-500 text-xs mt-1">{error}</p>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading || !isLoaded) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}
      >
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#9c604d] mx-auto mb-2"></div>
          <p className="text-gray-700 text-sm">Karte wird geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div
        ref={mapRef}
        className="w-full h-full rounded-lg"
        style={{ minHeight: "400px" }}
      />
      {children && mapInstanceRef.current && (
        <div className="absolute inset-0 pointer-events-none">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                map: mapInstanceRef.current,
              } as any);
            }
            return child;
          })}
        </div>
      )}
    </div>
  );
};
