"use client";

import React, { useState } from "react";
import { MapFilters } from "@/types/location";

interface MapControlsProps {
  filters: MapFilters;
  onFiltersChange: (filters: MapFilters) => void;
  memberCount: number;
  helperCount: number;
  className?: string;
}

export const MapControls: React.FC<MapControlsProps> = ({
  filters,
  onFiltersChange,
  memberCount,
  helperCount,
  className = "",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearchChange = (value: string) => {
    onFiltersChange({
      ...filters,
      searchPLZ: value,
    });
  };

  const handleClusterToggle = () => {
    onFiltersChange({
      ...filters,
      showClusters: !filters.showClusters,
    });
  };

  const handleClearSearch = () => {
    onFiltersChange({
      ...filters,
      searchPLZ: "",
    });
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-lg border border-gray-200 ${className}`}
    >
      {/* Main controls */}
      <div className="p-4">
        {/* Search bar */}
        <div className="relative mb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="PLZ eingeben (z.B. 10115)"
              value={filters.searchPLZ}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9c604d] focus:border-transparent text-sm"
              maxLength={5}
            />
            <svg
              className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {filters.searchPLZ && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 hover:text-gray-600"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm mb-3">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              {memberCount} {memberCount === 1 ? "Mitglied" : "Mitglieder"}
            </span>
            <span className="text-green-600 font-medium">
              {helperCount} {helperCount === 1 ? "Helferin" : "Helferinnen"}
            </span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#9c604d] hover:text-[#7a4a3a] transition-colors text-xs flex items-center space-x-1"
          >
            <span>{isExpanded ? "Weniger" : "Mehr"}</span>
            <svg
              className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Quick filters */}
        <div className="flex items-center space-x-2">
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={filters.showClusters}
              onChange={handleClusterToggle}
              className="rounded border-gray-300 text-[#9c604d] focus:ring-[#9c604d]"
            />
            <span className="text-gray-700">Gruppiert anzeigen</span>
          </label>
        </div>
      </div>

      {/* Expanded controls */}
      {isExpanded && (
        <div className="border-t border-gray-100 p-4">
          {/* Filter info */}
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Karteninfo
              </h4>
              <div className="text-xs text-gray-600 space-y-1">
                <p>
                  • Mitglieder sind nur sichtbar, wenn sie ihre
                  Standortverlässnis aktiviert haben
                </p>
                <p>
                  • Helferinnen können für Beratungstermine kontaktiert werden
                </p>
                <p>• PLZ-Suche zeigt alle Mitglieder in der Region</p>
              </div>
            </div>

            {/* Legend */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Legende
              </h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs">
                  <div className="w-4 h-4 bg-[#d4cbb8] border border-[#9c604d] rounded-full"></div>
                  <span className="text-gray-600">Mitglied</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <div className="w-4 h-4 bg-[#9c604d] border border-[#7a4a3a] rounded-full"></div>
                  <span className="text-gray-600">Helferin / Ausgewählt</span>
                </div>
              </div>
            </div>

            {/* Reset button */}
            <button
              onClick={() =>
                onFiltersChange({
                  searchPLZ: "",
                  showClusters: true,
                  radius: 10,
                })
              }
              className="w-full text-sm text-[#9c604d] hover:text-[#7a4a3a] transition-colors py-2 border border-[#9c604d] rounded-lg hover:bg-[#f1e9de]"
            >
              Filter zurücksetzen
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
