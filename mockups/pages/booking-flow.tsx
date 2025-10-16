// Appointment Booking Flow - Multi-step booking process
"use client";

import { useState } from "react";
import Link from "next/link";

export default function BookingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    category_id: "",
    anliegen_typ: "",
    beschreibung: "",
    preferred_date: "",
    preferred_time: "",
    member_vorname: "Fatima",
    member_nachname: "Schmidt",
    member_email: "fatima.schmidt@example.com",
  });

  const categories = [
    {
      id: "1",
      name: "Psychologische Beratung",
      description: "Unterstützung bei psychischen Belastungen",
      available_helpers: 5,
    },
    {
      id: "2",
      name: "Sozialberatung",
      description: "Hilfe bei sozialen Fragen und Behördengängen",
      available_helpers: 3,
    },
    {
      id: "3",
      name: "Schwangerschaftsbegleitung",
      description: "Begleitung während Schwangerschaft und Wochenbett",
      available_helpers: 4,
    },
    {
      id: "4",
      name: "Weitere Anliegen",
      description: "Allgemeine Beratung und Lebensfragen",
      available_helpers: 2,
    },
  ];

  const availableSlots = [
    { date: "2024-12-14", time: "10:00", helper_name: "Sainab H." },
    { date: "2024-12-14", time: "14:30", helper_name: "Fatima H." },
    { date: "2024-12-15", time: "09:00", helper_name: "Sainab H." },
    { date: "2024-12-15", time: "11:15", helper_name: "Fatima H." },
    { date: "2024-12-15", time: "16:30", helper_name: "Sainab H." },
  ];

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                step <= currentStep
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step}
            </div>
            {step < 4 && (
              <div
                className={`w-16 h-1 mx-2 ${
                  step < currentStep ? "bg-emerald-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>Anliegen</span>
        <span>Details</span>
        <span>Termin</span>
        <span>Bestätigung</span>
      </div>
    </div>
  );
  // use the same design that is used in In welchen Bereichen möchten Sie helfen? * by helper registration for the different Bereiche: Psychologische Beratung ..
  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Wählen Sie Ihr Anliegen
        </h2>
        <p className="text-gray-600">
          Für welchen Bereich benötigen Sie Beratung und Unterstützung?
        </p>
      </div>

      <div className="grid gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
              bookingData.category_id === category.id
                ? "border-emerald-500 bg-emerald-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() =>
              setBookingData({
                ...bookingData,
                category_id: category.id,
                anliegen_typ: category.name,
              })
            }
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {category.name}
                </h3>
                <p className="text-gray-600 mt-1">{category.description}</p>
              </div>
              <div className="text-right">
                <span className="text-sm text-emerald-600 font-medium">
                  {category.available_helpers} Helferinnen verfügbar
                </span>
                <div className="w-5 h-5 mt-1 ml-auto">
                  {bookingData.category_id === category.id && (
                    <svg
                      className="w-5 h-5 text-emerald-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Beschreiben Sie Ihr Anliegen
        </h2>
        <p className="text-gray-600">
          Teilen Sie uns mit, wobei wir Ihnen helfen können.
        </p>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-emerald-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-emerald-800">
              <strong>Ausgewählt:</strong> {bookingData.anliegen_typ}
            </p>
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="beschreibung"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Beschreibung Ihres Anliegens *
        </label>
        <textarea
          id="beschreibung"
          rows={6}
          required
          className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder="Beschreiben Sie kurz, wobei wir Ihnen helfen können. Diese Information hilft der Helferin, sich auf das Gespräch vorzubereiten."
          value={bookingData.beschreibung}
          onChange={(e) =>
            setBookingData({ ...bookingData, beschreibung: e.target.value })
          }
        />
        <p className="text-xs text-gray-500 mt-1">
          Ihre Beschreibung wird nur der zugewiesenen Helferin angezeigt.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2">
          Wichtige Hinweise
        </h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Das Gespräch findet per Video-Call statt</li>
          <li>• Die Beratung ist vertraulich und kostenfrei</li>
          <li>• Dauer: 45 Minuten</li>
          <li>• Sie erhalten den Meeting-Link per E-Mail</li>
        </ul>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Wählen Sie einen Termin
        </h2>
        <p className="text-gray-600">
          Verfügbare Termine für <strong>{bookingData.anliegen_typ}</strong>
        </p>
      </div>

      <div className="grid gap-3">
        {availableSlots.map((slot, index) => (
          <div
            key={index}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
              bookingData.preferred_date === slot.date &&
              bookingData.preferred_time === slot.time
                ? "border-emerald-500 bg-emerald-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() =>
              setBookingData({
                ...bookingData,
                preferred_date: slot.date,
                preferred_time: slot.time,
              })
            }
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold text-gray-900">
                  {new Date(slot.date + "T" + slot.time).toLocaleDateString(
                    "de-DE",
                    {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    }
                  )}
                </div>
                <div className="text-gray-600">
                  {slot.time} Uhr • Mit {slot.helper_name}
                </div>
              </div>
              <div className="w-5 h-5">
                {bookingData.preferred_date === slot.date &&
                  bookingData.preferred_time === slot.time && (
                    <svg
                      className="w-5 h-5 text-emerald-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {availableSlots.length === 0 && (
        <div className="text-center py-8">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
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
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Keine Termine verfügbar
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Aktuell sind keine Termine für diesen Bereich verfügbar. Versuchen
            Sie es später erneut.
          </p>
        </div>
      )}
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Bestätigung</h2>
        <p className="text-gray-600">
          Überprüfen Sie Ihre Angaben vor der finalen Buchung.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <dl className="divide-y divide-gray-200">
          <div className="py-3 flex justify-between">
            <dt className="text-sm font-medium text-gray-500">Anliegen</dt>
            <dd className="text-sm text-gray-900">
              {bookingData.anliegen_typ}
            </dd>
          </div>
          <div className="py-3 flex justify-between">
            <dt className="text-sm font-medium text-gray-500">Termin</dt>
            <dd className="text-sm text-gray-900">
              {bookingData.preferred_date &&
                new Date(
                  bookingData.preferred_date + "T" + bookingData.preferred_time
                ).toLocaleDateString("de-DE", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
              um {bookingData.preferred_time} Uhr
            </dd>
          </div>
          <div className="py-3 flex justify-between">
            <dt className="text-sm font-medium text-gray-500">Dauer</dt>
            <dd className="text-sm text-gray-900">45 Minuten</dd>
          </div>
          <div className="py-3 flex justify-between">
            <dt className="text-sm font-medium text-gray-500">
              Art der Beratung
            </dt>
            <dd className="text-sm text-gray-900">Video-Call</dd>
          </div>
          <div className="py-3">
            <dt className="text-sm font-medium text-gray-500 mb-1">
              Ihr Anliegen
            </dt>
            <dd className="text-sm text-gray-900">
              {bookingData.beschreibung}
            </dd>
          </div>
        </dl>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-blue-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Nach der Buchung erhalten Sie:
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc pl-5 space-y-1">
                <li>Bestätigungs-E-Mail mit allen Details</li>
                <li>Kalendereintrag (.ics-Datei) zum Herunterladen</li>
                <li>Video-Meeting-Link für das Gespräch</li>
                <li>Erinnerung 24 Stunden vor dem Termin</li>
              </ul>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="w-full bg-emerald-600 text-white py-3 px-4 rounded-md text-base font-medium hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          onClick={() => {
            // Simulate booking
            alert(
              "Termin erfolgreich gebucht! Sie erhalten eine Bestätigungs-E-Mail."
            );
          }}
        >
          Termin verbindlich buchen
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
          >
            ← Zurück zum Dashboard
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Termin buchen
          </h1>
        </div>

        {/* Progress Indicator */}
        {renderStepIndicator()}

        {/* Content */}
        <div className="bg-white shadow rounded-lg p-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Zurück
              </button>
              <button
                type="button"
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && !bookingData.category_id) ||
                  (currentStep === 2 && !bookingData.beschreibung.trim()) ||
                  (currentStep === 3 &&
                    (!bookingData.preferred_date ||
                      !bookingData.preferred_time))
                }
                className="bg-emerald-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Weiter
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
