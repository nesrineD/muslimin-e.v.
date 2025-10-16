"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  GoogleMap,
  MemberCard,
  MemberListPopup,
  MapControls,
  PLZCircleMarker,
} from "@/components/map";
import {
  MemberLocationWithCoordinates,
  MapFilters,
  PLZCoordinates,
  MemberLocation,
} from "@/types/location";
import { MemberLocationService } from "@/services/member-location.service";
import { getPLZCoordinates } from "@/lib/utils/plz-coordinates";

interface MemberLocationMapProps {
  apiKey: string;
  className?: string;
}

export const MemberLocationMap: React.FC<MemberLocationMapProps> = ({
  apiKey,
  className = "",
}) => {
  // State management
  const [members, setMembers] = useState<MemberLocationWithCoordinates[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] =
    useState<MemberLocationWithCoordinates | null>(null);
  const [selectedPLZ, setSelectedPLZ] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showMembersList, setShowMembersList] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  // Map state
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 52.52, // Berlin default
    lng: 13.405,
  });
  const [mapZoom, setMapZoom] = useState(7);

  // Filters
  const [filters, setFilters] = useState<MapFilters>({
    searchPLZ: "",
    showClusters: true,
    radius: 10,
  });

  // Load member data on component mount
  useEffect(() => {
    const loadMembers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await MemberLocationService.getMemberLocations();

        if (response.success) {
          // Enhance members with coordinates
          const membersWithCoordinates: MemberLocationWithCoordinates[] =
            response.data.members
              .map((member: MemberLocation) => {
                const coordinates = member.postal_code
                  ? getPLZCoordinates(member.postal_code)
                  : null;

                return {
                  ...member,
                  coordinates,
                };
              })
              .filter(
                (
                  member: MemberLocation & {
                    coordinates: PLZCoordinates | null;
                  }
                ): member is MemberLocationWithCoordinates =>
                  member.coordinates !== null
              );

          setMembers(membersWithCoordinates);
        } else {
          setError("Fehler beim Laden der Mitgliederdaten");
        }
      } catch (err) {
        setError("Netzwerkfehler beim Laden der Daten");
        console.error("Error loading members:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMembers();
  }, []);

  // Filter members based on search criteria
  const filteredMembers = useMemo(() => {
    if (!filters.searchPLZ) return members;

    return members.filter(
      (member) =>
        member.postal_code?.startsWith(filters.searchPLZ) ||
        member.coordinates?.city
          .toLowerCase()
          .includes(filters.searchPLZ.toLowerCase())
    );
  }, [members, filters.searchPLZ]);

  // Group members by PLZ for clustering
  const groupedMembers = useMemo(() => {
    if (!filters.showClusters) return filteredMembers.map((member) => [member]);

    const groups = new Map<string, MemberLocationWithCoordinates[]>();

    filteredMembers.forEach((member) => {
      if (member.postal_code) {
        const existing = groups.get(member.postal_code) || [];
        groups.set(member.postal_code, [...existing, member]);
      }
    });

    return Array.from(groups.values());
  }, [filteredMembers, filters.showClusters]);

  // Statistics
  const memberCount = filteredMembers.length;
  const helperCount = filteredMembers.filter(
    (member) => member.role !== "member"
  ).length;

  // Handle map load
  const handleMapLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  // Handle member marker click
  const handleMemberClick = useCallback(
    (member: MemberLocationWithCoordinates) => {
      setSelectedMember(member);
      setSelectedPLZ(null);
      setShowPopup(false);

      // Center map on selected member
      if (member.coordinates) {
        setMapCenter({
          lat: member.coordinates.lat,
          lng: member.coordinates.lng,
        });
        setMapZoom(12);
      }
    },
    []
  );

  // Handle PLZ group click (multiple members in same location)
  const handlePLZClick = useCallback(
    (plz: string, members: MemberLocationWithCoordinates[]) => {
      if (members.length === 1) {
        handleMemberClick(members[0]);
      } else {
        setSelectedPLZ(plz);
        setSelectedMember(null);
        setShowPopup(true);

        // Center map on PLZ location
        const coordinates = members[0].coordinates;
        if (coordinates) {
          setMapCenter({ lat: coordinates.lat, lng: coordinates.lng });
          setMapZoom(12);
        }
      }
    },
    [handleMemberClick]
  );

  // Handle map click (deselect)
  const handleMapClick = useCallback(() => {
    setSelectedMember(null);
    setSelectedPLZ(null);
    setShowPopup(false);
  }, []);

  // Handle search filter
  const handleSearchPLZ = useCallback(
    (searchPLZ: string) => {
      if (searchPLZ && searchPLZ.length >= 2) {
        // Find first matching PLZ and center map
        const matchingMember = members.find((member) =>
          member.postal_code?.startsWith(searchPLZ)
        );

        if (matchingMember?.coordinates) {
          setMapCenter({
            lat: matchingMember.coordinates.lat,
            lng: matchingMember.coordinates.lng,
          });
          setMapZoom(10);
        }
      }
    },
    [members]
  );

  // Update map center when search changes
  useEffect(() => {
    handleSearchPLZ(filters.searchPLZ);
  }, [filters.searchPLZ, handleSearchPLZ]);

  // Close popups
  const handleClosePopup = useCallback(() => {
    setSelectedMember(null);
    setSelectedPLZ(null);
    setShowPopup(false);
  }, []);

  // Get members for selected PLZ
  const selectedPLZMembers = useMemo(() => {
    if (!selectedPLZ) return [];
    return filteredMembers.filter(
      (member) => member.postal_code === selectedPLZ
    );
  }, [selectedPLZ, filteredMembers]);

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-50 rounded-lg min-h-96 ${className}`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9c604d] mx-auto mb-4"></div>
          <p className="text-gray-600">Mitgliederkarte wird geladen...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-50 rounded-lg min-h-96 ${className}`}
      >
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg
              className="w-12 h-12 mx-auto"
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
          <p className="text-gray-700 mb-2">Fehler beim Laden der Karte</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Map container */}
      <div className="relative h-96 lg:h-[500px]">
        <GoogleMap
          apiKey={apiKey}
          center={mapCenter}
          zoom={mapZoom}
          onMapLoad={handleMapLoad}
          onMapClick={handleMapClick}
          className="w-full h-full"
        >
          {/* Render markers for each group */}
          {groupedMembers.map((group, index) => {
            if (group.length === 0) return null;

            const firstMember = group[0];
            const isSelected =
              selectedMember?.id === firstMember.id ||
              selectedPLZ === firstMember.postal_code;

            return (
              <PLZCircleMarker
                key={`group-${firstMember.postal_code}-${index}`}
                members={group}
                map={map || undefined}
                isSelected={isSelected}
                onClick={() => handlePLZClick(firstMember.postal_code!, group)}
                onInfoCardClick={handleMemberClick}
              />
            );
          })}
        </GoogleMap>

        {/* Controls overlay */}
        <div className="absolute top-4 left-4 z-10">
          <MapControls
            filters={filters}
            onFiltersChange={setFilters}
            memberCount={memberCount}
            helperCount={helperCount}
            className="w-80"
          />
        </div>

        {/* Member card overlay */}
        {selectedMember && (
          <div className="absolute top-4 right-4 z-20">
            <MemberCard member={selectedMember} onClose={handleClosePopup} />
          </div>
        )}

        {/* Member list popup overlay */}
        {showPopup && selectedPLZMembers.length > 0 && (
          <div className="absolute top-4 right-4 z-20">
            <MemberListPopup
              members={selectedPLZMembers}
              position={selectedPLZMembers[0].coordinates!}
              onClose={handleClosePopup}
              onMemberSelect={handleMemberClick}
            />
          </div>
        )}

        {/* All Members List overlay */}
        {showMembersList && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 w-96 max-h-[80vh] bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-[#9c604d] text-white">
              <h3 className="font-semibold text-lg">
                Alle sichtbaren Mitglieder ({filteredMembers.length})
              </h3>
              <button
                onClick={() => setShowMembersList(false)}
                className="text-white hover:text-gray-200 text-xl font-bold"
              >
                ✕
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto p-4">
              <div className="space-y-3">
                {filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    onClick={() => {
                      handleMemberClick(member);
                      setShowMembersList(false);
                    }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#f1e9de] cursor-pointer transition-colors border border-gray-100"
                  >
                    {/* Member Avatar */}
                    <div className="w-10 h-10 rounded-full bg-[#9c604d] text-white text-sm font-semibold flex items-center justify-center">
                      {member.display_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </div>

                    <div className="flex-1">
                      <div className="font-medium text-gray-800">
                        {member.display_name}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <span>PLZ {member.postal_code}</span>
                        {member.role === "helper" && (
                          <span className="text-green-600 font-medium">
                            🟢 Helferin
                          </span>
                        )}
                        {member.role === "member+helper" && (
                          <span className="text-green-600 font-medium">
                            🟢 Mitglied & Helferin
                          </span>
                        )}
                        {member.role === "member" && (
                          <span className="text-gray-500">Mitglied</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer info */}
      <div className="mt-4 p-4 bg-[#f1e9de] rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowMembersList(true)}
              className="text-[#9c604d] hover:text-[#7a4a3a] font-medium underline cursor-pointer"
            >
              {memberCount} sichtbare{" "}
              {memberCount === 1 ? "Mitglied" : "Mitglieder"} anzeigen
            </button>
            {helperCount > 0 && (
              <span className="text-green-700 font-medium">
                {helperCount} {helperCount === 1 ? "Helferin" : "Helferinnen"}{" "}
                verfügbar
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500">
            Klicken Sie auf einen Kreis für PLZ-Details
          </div>
        </div>
      </div>
    </div>
  );
};
