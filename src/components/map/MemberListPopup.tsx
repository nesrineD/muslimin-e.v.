"use client";

import React, { useState } from "react";
import { MemberLocationWithCoordinates } from "@/types/location";
import { MemberCard } from "./MemberCard";

interface MemberListPopupProps {
  members: MemberLocationWithCoordinates[];
  position: { lat: number; lng: number };
  onClose?: () => void;
  onMemberSelect?: (member: MemberLocationWithCoordinates) => void;
  className?: string;
}

export const MemberListPopup: React.FC<MemberListPopupProps> = ({
  members,
  position,
  onClose,
  onMemberSelect,
  className = "",
}) => {
  const [selectedMember, setSelectedMember] =
    useState<MemberLocationWithCoordinates | null>(null);

  const location = members[0]?.coordinates;
  const city = location?.city || "Unbekannter Ort";
  const state = location?.state || "";
  const memberCount = members.length;
  const helperCount = members.filter((m) => m.role !== "member").length;

  const handleMemberClick = (member: MemberLocationWithCoordinates) => {
    setSelectedMember(member);
    onMemberSelect?.(member);
  };

  const handleBackToList = () => {
    setSelectedMember(null);
  };

  if (selectedMember) {
    return (
      <div
        className={`bg-white rounded-lg shadow-xl border border-gray-200 max-w-sm ${className}`}
      >
        {/* Back button */}
        <div className="p-3 border-b border-gray-100">
          <button
            onClick={handleBackToList}
            className="flex items-center space-x-2 text-[#9c604d] hover:text-[#7a4a3a] transition-colors text-sm"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Zurück zur Liste</span>
          </button>
        </div>

        {/* Member card */}
        <div className="p-1">
          <MemberCard member={selectedMember} onClose={onClose} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-xl border border-gray-200 max-w-md ${className}`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 text-lg flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-[#9c604d]"
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
              <span>{city}</span>
            </h3>
            <p className="text-sm text-gray-600 mt-1">{state}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <span>
                {memberCount} {memberCount === 1 ? "Mitglied" : "Mitglieder"}
              </span>
              {helperCount > 0 && (
                <>
                  <span>•</span>
                  <span className="text-green-600 font-medium">
                    {helperCount}{" "}
                    {helperCount === 1 ? "Helferin" : "Helferinnen"}
                  </span>
                </>
              )}
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label="Schließen"
            >
              <svg
                className="w-5 h-5"
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
      </div>

      {/* Member list */}
      <div className="max-h-80 overflow-y-auto">
        {members.map((member, index) => (
          <div
            key={member.id}
            className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
              index < members.length - 1 ? "border-b border-gray-100" : ""
            }`}
            onClick={() => handleMemberClick(member)}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#9c604d] text-white rounded-full flex items-center justify-center text-sm font-semibold">
                {member.first_name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900 text-sm">
                    {member.display_name}
                  </span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      member.role === "helper"
                        ? "bg-green-100 text-green-800"
                        : member.role === "member+helper"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {member.role === "member" && "Mitglied"}
                    {member.role === "helper" && "Helferin"}
                    {member.role === "member+helper" && "M & H"}
                  </span>
                </div>
                {member.role !== "member" && (
                  <p className="text-xs text-green-600 mt-1">
                    Verfügbar für Beratung
                  </p>
                )}
              </div>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Footer with summary */}
      {helperCount > 0 && (
        <div className="p-3 bg-green-50 border-t border-gray-100">
          <p className="text-xs text-green-700 text-center">
            {helperCount}{" "}
            {helperCount === 1 ? "Helferin steht" : "Helferinnen stehen"} für
            Beratung zur Verfügung
          </p>
        </div>
      )}
    </div>
  );
};
