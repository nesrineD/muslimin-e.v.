"use client";

import React from "react";
import { MemberLocationWithCoordinates } from "@/types/location";

interface MemberCardProps {
  member: MemberLocationWithCoordinates;
  onClose?: () => void;
  className?: string;
}

export const MemberCard: React.FC<MemberCardProps> = ({
  member,
  onClose,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm ${className}`}
    >
      {/* Header with close button */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#9c604d] text-white rounded-full flex items-center justify-center font-semibold">
            {member.first_name.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">
              {member.display_name}
            </h3>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>
                {member.role === "member"
                  ? "Mitglied"
                  : member.role === "helper"
                    ? "Helferin"
                    : "Mitglied & Helferin"}
              </span>
              {member.coordinates && (
                <>
                  <span>•</span>
                  <span>{member.coordinates.city}</span>
                </>
              )}
            </div>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label="Schließen"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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

      {/* Location info */}
      {member.coordinates && (
        <div className="mb-3 p-3 bg-[#f1e9de] rounded-lg">
          <div className="flex items-center space-x-2 text-sm">
            <svg
              className="w-4 h-4 text-[#9c604d]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <div>
              <span className="font-medium text-[#9c604d]">
                {member.coordinates.city}
              </span>
              <span className="text-gray-600 ml-1">({member.postal_code})</span>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {member.coordinates.state}
          </div>
        </div>
      )}

      {/* Member role badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              member.role === "helper"
                ? "bg-green-100 text-green-800"
                : member.role === "member+helper"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
            }`}
          >
            {member.role === "member" && "Mitglied"}
            {member.role === "helper" && "Helferin"}
            {member.role === "member+helper" && "Mitglied & Helferin"}
          </span>
        </div>

        {/* Contact info (if applicable for helpers) */}
        {member.role !== "member" && (
          <div className="text-xs text-gray-500">Verfügbar für Beratung</div>
        )}
      </div>

      {/* Action buttons for helpers */}
      {member.role !== "member" && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <button className="w-full bg-[#9c604d] text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-[#7a4a3a] transition-colors">
            Termin anfragen
          </button>
        </div>
      )}
    </div>
  );
};
