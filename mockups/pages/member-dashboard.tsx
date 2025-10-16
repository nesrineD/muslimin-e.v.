// Member Dashboard - Main interface after login
"use client";

import { useState } from "react";
import Link from "next/link";

export default function MemberDashboard() {
  const [user] = useState({
    vorname: "Fatima",
    nachname: "Schmidt",
    email: "fatima.schmidt@example.com",
    role: "member",
    is_helper: false,
  });

  const [appointments] = useState([
    {
      id: "1",
      anliegen_typ: "Psychologische Beratung",
      scheduled_at: "2024-12-15T10:00:00Z",
      helper_name: "Sainab Helper",
      status: "confirmed",
      jitsi_room_name: "beratung-abc123",
      can_reschedule: true,
      can_cancel: true,
    },
    {
      id: "2",
      anliegen_typ: "Schwangerschaftsbegleitung",
      scheduled_at: "2024-12-10T14:30:00Z",
      helper_name: "Khadija",
      status: "completed",
      can_reschedule: false,
      can_cancel: false,
    },
  ]);

  const [quotaUsed] = useState(2);
  const [quotaLimit] = useState(3);

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
                Hallo, {user.vorname}
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
        {/* Welcome Section */}
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">
            Willkommen, {user.vorname}!
          </h1>
          <p className="mt-2 text-gray-600">
            Verwalten Sie Ihre Termine und buchen Sie neue Beratungsgespräche.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Schnellaktionen
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link
                    href="/book-appointment"
                    className="bg-emerald-600 text-white p-4 rounded-lg hover:bg-emerald-700 transition-colors text-center"
                  >
                    <div className="flex flex-col items-center">
                      <svg
                        className="w-8 h-8 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="font-semibold">Termin buchen</span>
                    </div>
                  </Link>

                  <Link
                    href="/beratungsstellen"
                    className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors text-center"
                  >
                    <div className="flex flex-col items-center">
                      <svg
                        className="w-8 h-8 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <span className="font-semibold">Beratungsstellen</span>
                    </div>
                  </Link>
                </div>

                {/* Helper Registration CTA */}
                {!user.is_helper && (
                  <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <h3 className="font-semibold text-emerald-800 mb-2">
                      Möchten Sie anderen helfen?
                    </h3>
                    <p className="text-emerald-700 mb-3">
                      Werden Sie Helferin und unterstützen Sie andere Mitglieder
                      bei ihren Anliegen.
                    </p>
                    <Link
                      href="/helper/register"
                      className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-700"
                    >
                      Als Helferin registrieren
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quota Status */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Termin-Kontingent
              </h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Genutzt</span>
                <span className="text-sm font-medium">
                  {quotaUsed} von {quotaLimit}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-emerald-600 h-2 rounded-full"
                  style={{ width: `${(quotaUsed / quotaLimit) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Sie können maximal {quotaLimit} Termine gleichzeitig haben.
              </p>
            </div>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="mt-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">
                Meine Termine
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Ihre aktuellen und vergangenen Beratungstermine.
              </p>
            </div>
            <ul className="divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <li key={appointment.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              appointment.status === "confirmed"
                                ? "bg-green-400"
                                : appointment.status === "completed"
                                  ? "bg-gray-400"
                                  : "bg-yellow-400"
                            }`}
                          ></div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {appointment.anliegen_typ}
                          </div>
                          <div className="text-sm text-gray-500">
                            Mit {appointment.helper_name} •{" "}
                            {new Date(
                              appointment.scheduled_at
                            ).toLocaleDateString("de-DE", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {appointment.status === "confirmed" && (
                          <>
                            <Link
                              href={`https://meet.jit.si/${appointment.jitsi_room_name}`}
                              target="_blank"
                              className="bg-emerald-600 text-white px-3 py-1 rounded text-sm hover:bg-emerald-700"
                            >
                              Meeting beitreten
                            </Link>
                            {appointment.can_reschedule && (
                              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                                Umbuchen
                              </button>
                            )}
                            {appointment.can_cancel && (
                              <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                                Stornieren
                              </button>
                            )}
                          </>
                        )}
                        {appointment.status === "completed" && (
                          <span className="text-sm text-gray-500">
                            Abgeschlossen
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {appointments.length === 0 && (
              <div className="px-4 py-8 text-center">
                <p className="text-gray-500">
                  Sie haben noch keine Termine gebucht.
                </p>
                <Link
                  href="/book-appointment"
                  className="mt-2 inline-block bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
                >
                  Jetzt Termin buchen
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
