"use client";

import React, { useEffect, useRef } from "react";
import { MemberLocationWithCoordinates } from "@/types/location";

// Design-token color constants (mirrors tailwind.config.ts clay/cream palette)
const CLAY_500 = "#9c604d";
const CLAY_700 = "#7d4c3b";
const CREAM_200 = "#d4cbb8";

interface MemberMarkerProps {
  member: MemberLocationWithCoordinates;
  map?: google.maps.Map;
  onClick?: (member: MemberLocationWithCoordinates) => void;
  isSelected?: boolean;
}

export const MemberMarker: React.FC<MemberMarkerProps> = ({
  member,
  map,
  onClick,
  isSelected = false,
}) => {
  const markerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    if (!map || !member.coordinates) return;

    // Create custom marker icon
    const markerIcon = {
      url:
        "data:image/svg+xml;base64," +
        btoa(`
        <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 8.837 16 24 16 24s16-15.163 16-24C32 7.163 24.837 0 16 0z" 
                fill="${isSelected ? CLAY_500 : CREAM_200}" 
                stroke="${isSelected ? CLAY_700 : CLAY_500}" 
                stroke-width="2"/>
          <circle cx="16" cy="16" r="6" fill="white"/>
          <text x="16" y="20" text-anchor="middle" font-family="Arial, sans-serif" 
                font-size="10" font-weight="bold" fill="${isSelected ? CLAY_500 : CLAY_700}">
            ${member.first_name.charAt(0)}
          </text>
        </svg>
      `),
      size: new google.maps.Size(32, 40),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(16, 40),
      scaledSize: new google.maps.Size(32, 40),
    };

    // Create marker
    const marker = new google.maps.Marker({
      position: {
        lat: member.coordinates.lat,
        lng: member.coordinates.lng,
      },
      map,
      title: `${member.first_name} ${member.last_name}`,
      icon: markerIcon,
      clickable: true,
      draggable: false,
      visible: true,
      zIndex: isSelected ? 1000 : 100,
    });

    // Add click listener
    const clickListener = marker.addListener("click", () => {
      onClick?.(member);
    });

    markerRef.current = marker;

    // Cleanup function
    return () => {
      google.maps.event.removeListener(clickListener);
      marker.setMap(null);
      markerRef.current = null;
    };
  }, [map, member, onClick, isSelected]);

  // Update marker icon when selection state changes
  useEffect(() => {
    if (markerRef.current && map) {
      const markerIcon = {
        url:
          "data:image/svg+xml;base64," +
          btoa(`
          <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 0C7.163 0 0 7.163 0 16c0 8.837 16 24 16 24s16-15.163 16-24C32 7.163 24.837 0 16 0z" 
                  fill="${isSelected ? CLAY_500 : CREAM_200}" 
                  stroke="${isSelected ? CLAY_700 : CLAY_500}" 
                  stroke-width="2"/>
            <circle cx="16" cy="16" r="6" fill="white"/>
            <text x="16" y="20" text-anchor="middle" font-family="Arial, sans-serif" 
                  font-size="10" font-weight="bold" fill="${isSelected ? CLAY_500 : CLAY_700}">
              ${member.first_name.charAt(0)}
            </text>
          </svg>
        `),
        size: new google.maps.Size(32, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(16, 40),
        scaledSize: new google.maps.Size(32, 40),
      };

      markerRef.current.setIcon(markerIcon);
      markerRef.current.setZIndex(isSelected ? 1000 : 100);
    }
  }, [isSelected, member.first_name, map]);

  // This component doesn't render anything visible - the marker is added to the map
  return null;
};
