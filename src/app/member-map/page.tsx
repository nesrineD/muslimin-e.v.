import { Metadata } from "next";
import { MemberLocationMap } from "@/components/map";

export const metadata: Metadata = {
  title: "Mitgliederkarte | Muslimin-Beratung",
  description:
    "Finden Sie Mitglieder und Helferinnen in Ihrer Nähe auf der interaktiven Karte.",
  keywords: ["Mitglieder", "Karte", "Standort", "Beratung", "Helferinnen"],
};

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export default function MemberMapPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="md:flex md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                  Mitgliederkarte
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Entdecken Sie Mitglieder und Helferinnen in Ihrer Nähe
                </p>
              </div>
              <div className="mt-4 flex md:mt-0 md:ml-4">
                <span className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9c604d]">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Nur sichtbare Mitglieder
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-[#9c604d]"
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
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Sichtbare Mitglieder
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      Standortfreigabe aktiviert
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Verfügbare Helferinnen
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      Für Beratung kontaktierbar
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-blue-600"
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
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      PLZ-Suche
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      Nach Postleitzahl filtern
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            {GOOGLE_MAPS_API_KEY ? (
              <MemberLocationMap
                apiKey={GOOGLE_MAPS_API_KEY}
                className="w-full"
              />
            ) : (
              <div className="flex items-center justify-center bg-gray-100 rounded-lg h-96">
                <div className="text-center">
                  <div className="text-yellow-600 mb-4">
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
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-medium mb-2">
                    Google Maps API Schlüssel fehlt
                  </p>
                  <p className="text-gray-500 text-sm">
                    Bitte konfigurieren Sie NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in
                    den Umgebungsvariablen.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-[#f1e9de] border border-[#d4cbb8] rounded-lg p-6">
          <h3 className="text-lg font-medium text-[#9c604d] mb-4">
            So nutzen Sie die Mitgliederkarte
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                🔍 Suchen & Filtern
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>
                  • Geben Sie eine PLZ ein, um Mitglieder in der Region zu
                  finden
                </li>
                <li>
                  • Nutzen Sie die Gruppierung für eine übersichtlichere Anzeige
                </li>
                <li>• Helferinnen sind besonders hervorgehoben</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                🗺️ Karte navigieren
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Klicken Sie auf Marker für Detailinformationen</li>
                <li>• Zoomen und verschieben Sie die Karte nach Bedarf</li>
                <li>
                  • Bei mehreren Mitgliedern am gleichen Ort öffnet sich eine
                  Liste
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Datenschutz & Privatsphäre
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Nur Mitglieder, die ihre Standortfreigabe aktiviert haben,
                  werden auf der Karte angezeigt. Namen werden anonymisiert
                  dargestellt (z.B. "Zahra N."). Die genaue Adresse wird nicht
                  preisgegeben - nur die PLZ-Region.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
