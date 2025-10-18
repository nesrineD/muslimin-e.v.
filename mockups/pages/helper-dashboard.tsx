// Helper Dashboard - Availability management and appointment overview
"use client";

import { useState } from "react";
import Link from "next/link";

// Mock data - replace with actual data fetching
const initialAvailability = [
  { day: "Samstag", start: "08:00", end: "20:00" },
  { day: "Sonntag", start: "08:00", end: "20:00" },
];

const upcomingAppointments = [
  {
    id: "1",
    memberName: "Zahra Mitglied",
    anliegen: "Psychologische Beratung",
    scheduledAt: "2025-09-30T10:00:00Z",
  },
  {
    id: "2",
    memberName: "Fatima HelperMitglied",
    anliegen: "Schwangerschaftsbegleitung",
    scheduledAt: "2025-10-05T16:30:00Z",
  },
];

export default function HelperDashboard() {
  const [user] = useState({ vorname: "Sainab", role: "helper" });
  const [availability, setAvailability] = useState(initialAvailability);
  const [isEditing, setIsEditing] = useState(false);

  const handleAvailabilityChange = (
    index: number,
    field: keyof (typeof initialAvailability)[0],
    value: string
  ) => {
    const newAvailability = [...availability];
    newAvailability[index][field] = value;
    setAvailability(newAvailability);
  };

  const addAvailabilitySlot = () => {
    setAvailability([
      ...availability,
      { day: "Montag", start: "09:00", end: "17:00" },
    ]);
  };

  const removeAvailabilitySlot = (index: number) => {
    setAvailability(availability.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-emerald-600">
                Muslimin-Beratung
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Salam, {user.vorname} (Helferin)
              </span>
              <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm hover:bg-gray-200">
                Abmelden
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">
            Helferinnen-Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Verwalten Sie Ihre Verfügbarkeiten und sehen Sie Ihre anstehenden
            Termine ein.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Availability Management */}
          <div className="lg:col-span-2">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    Meine Verfügbarkeiten
                  </h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      isEditing
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {isEditing ? "Speichern" : "Bearbeiten"}
                  </button>
                </div>

                <p className="text-sm text-gray-500 mb-4">
                  Tragen Sie hier Ihre regelmäßigen wöchentlichen Sprechzeiten
                  ein. Die Zeiten sind in Ihrer lokalen Zeitzone (CEST).
                </p>

                <div className="space-y-4">
                  {availability.map((slot, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-2 rounded-md bg-gray-50"
                    >
                      <select
                        value={slot.day}
                        disabled={!isEditing}
                        onChange={(e) =>
                          handleAvailabilityChange(index, "day", e.target.value)
                        }
                        className="w-1/3 block border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm disabled:bg-gray-100"
                      >
                        {[
                          "Montag",
                          "Dienstag",
                          "Mittwoch",
                          "Donnerstag",
                          "Freitag",
                          "Samstag",
                          "Sonntag",
                        ].map((day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        ))}
                      </select>
                      <input
                        type="time"
                        value={slot.start}
                        disabled={!isEditing}
                        onChange={(e) =>
                          handleAvailabilityChange(
                            index,
                            "start",
                            e.target.value
                          )
                        }
                        className="w-1/4 block border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm disabled:bg-gray-100"
                      />
                      <span className="text-gray-500">bis</span>
                      <input
                        type="time"
                        value={slot.end}
                        disabled={!isEditing}
                        onChange={(e) =>
                          handleAvailabilityChange(index, "end", e.target.value)
                        }
                        className="w-1/4 block border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm disabled:bg-gray-100"
                      />
                      {isEditing && (
                        <button
                          onClick={() => removeAvailabilitySlot(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {isEditing && (
                  <button
                    onClick={addAvailabilitySlot}
                    className="mt-4 w-full flex justify-center py-2 px-4 border border-dashed border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    + Zeitfenster hinzufügen
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="lg:col-span-1">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Anstehende Termine
                </h3>
                <ul className="divide-y divide-gray-200">
                  {upcomingAppointments.map((appointment) => (
                    <li key={appointment.id} className="py-4">
                      <div className="flex space-x-3">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">
                              {appointment.memberName}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {new Date(
                                appointment.scheduledAt
                              ).toLocaleTimeString("de-DE", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                          <p className="text-sm text-gray-500">
                            {appointment.anliegen}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(
                              appointment.scheduledAt
                            ).toLocaleDateString("de-DE", {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                            })}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                {upcomingAppointments.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    Keine anstehenden Termine.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
