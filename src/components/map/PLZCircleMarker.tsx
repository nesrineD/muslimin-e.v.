"use client";

import React, { useEffect, useRef } from "react";
import { MemberLocationWithCoordinates } from "@/types/location";

interface PLZCircleMarkerProps {
  members: MemberLocationWithCoordinates[];
  map?: google.maps.Map;
  onClick?: (plz: string, members: MemberLocationWithCoordinates[]) => void;
  onInfoCardClick?: (member: MemberLocationWithCoordinates) => void;
  isSelected?: boolean;
}

export const PLZCircleMarker: React.FC<PLZCircleMarkerProps> = ({
  members,
  map,
  onClick,
  onInfoCardClick,
  isSelected = false,
}) => {
  const circleRef = useRef<google.maps.Circle | null>(null);

  // Calculate center and PLZ from members
  const firstMember = members[0];
  const center = firstMember?.coordinates
    ? {
        lat: firstMember.coordinates.lat,
        lng: firstMember.coordinates.lng,
      }
    : null;
  const plz = firstMember?.postal_code || "";

  useEffect(() => {
    if (!map || !center) return;

    const memberCount = members.length;
    const helperCount = members.filter(
      (m) => m.role === "helper" || m.role === "member+helper"
    ).length;

    // Calculate circle radius based on member count (600-1200m range - größer!)
    const baseRadius = 600; // Von 400 auf 600 erhöht
    const radiusMultiplier = Math.min(memberCount * 0.4, 3); // Verstärkt von 0.3 auf 0.4
    const radius = baseRadius + radiusMultiplier * 200;

    // Create ONLY the outer circle - NO inner marker/pin!
    const circle = new google.maps.Circle({
      strokeColor: isSelected ? "#7a4a3a" : "#9c604d",
      strokeOpacity: 0.8,
      strokeWeight: isSelected ? 3 : 2,
      fillColor: "#9c604d",
      fillOpacity: isSelected ? 0.25 : 0.15,
      map,
      center,
      radius,
      clickable: true,
      zIndex: isSelected ? 1000 : 100,
    });

    // Add hover effect to make circle more visible
    const mouseoverListener = circle.addListener("mouseover", () => {
      circle.setOptions({
        fillOpacity: 0.3,
        strokeWeight: 3,
        strokeColor: "#7a4a3a",
      });
    });

    const mouseoutListener = circle.addListener("mouseout", () => {
      circle.setOptions({
        fillOpacity: isSelected ? 0.25 : 0.15,
        strokeWeight: isSelected ? 3 : 2,
        strokeColor: isSelected ? "#7a4a3a" : "#9c604d",
      });
    });

    // Add click listener
    const clickListener = circle.addListener("click", () => {
      onClick?.(plz, members);
    });

    // Set tooltip title for the circle - this creates a native Google Maps tooltip
    const tooltipText = `PLZ ${plz} - ${memberCount} ${memberCount === 1 ? "Mitglied" : "Mitglieder"}${helperCount > 0 ? `, ${helperCount} ${helperCount === 1 ? "Helferin" : "Helferinnen"} verfügbar` : ""}`;

    circleRef.current = circle;

    // Cleanup function
    return () => {
      if (circleRef.current) {
        google.maps.event.removeListener(mouseoverListener);
        google.maps.event.removeListener(mouseoutListener);
        google.maps.event.removeListener(clickListener);
        circleRef.current.setMap(null);
        circleRef.current = null;
      }
    };
  }, [map, center, members, plz, onClick, isSelected]);

  // Update appearance when selection state changes
  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.setOptions({
        strokeColor: isSelected ? "#7a4a3a" : "#9c604d",
        strokeWeight: isSelected ? 3 : 2,
        fillOpacity: isSelected ? 0.25 : 0.15,
        zIndex: isSelected ? 1000 : 100,
      });
    }
  }, [isSelected]);

  // This component doesn't render anything visible in React - the circle is added directly to the map
  return null;
};
