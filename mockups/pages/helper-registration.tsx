// Helper Registration - Endpoint 2: Self-service helper signup
'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function HelperRegistration() {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [motivation, setMotivation] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const categories = [
    { id: '1', name: 'Psychologische Beratung', description: 'Unterstützung bei psychischen Belastungen und emotionalen Herausforderungen' },
    { id: '2', name: 'Sozialberatung', description: 'Hilfe bei sozialen Fragen, Behördengängen und gesellschaftlichen Themen' },
    { id: '3', name: 'Schwangerschaftsbegleitung', description: 'Begleitung während Schwangerschaft, Geburt und Wochenbett' },
    { id: '4', name: 'Weitere Anliegen', description: 'Allgemeine Beratung und Unterstützung bei verschiedenen Lebensfragen' }
  ]

  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to helper dashboard
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/dashboard" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
            ← Zurück zum Dashboard
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Als Helferin registrieren
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Wählen Sie die Bereiche aus, in denen Sie anderen Mitgliedern helfen möchten.
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white shadow rounded-lg">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Category Selection */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Beratungsbereiche auswählen *
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Wählen Sie mindestens einen Bereich aus, in dem Sie helfen möchten. Sie können später weitere Bereiche hinzufügen.
              </p>

              <div className="grid gap-4">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedCategories.includes(category.id)
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => toggleCategory(category.id)}
                  >
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => toggleCategory(category.id)}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3">
                        <label className="text-base font-medium text-gray-900 cursor-pointer">
                          {category.name}
                        </label>
                        <p className="text-sm text-gray-600 mt-1">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedCategories.length === 0 && (
                <p className="text-sm text-red-600 mt-2">
                  Bitte wählen Sie mindestens einen Beratungsbereich aus.
                </p>
              )}
            </div>

            {/* Motivation (Optional) */}
            <div>
              <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-2">
                Motivation (Optional)
              </label>
              <textarea
                id="motivation"
                rows={4}
                className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Warum möchten Sie anderen helfen? Was motiviert Sie? (Optional)"
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Diese Information hilft anderen Mitgliedern, Sie besser kennenzulernen.
              </p>
            </div>

            {/* Information Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Was passiert nach der Registrierung?
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Sie erhalten sofort Zugang zum Helferinnen-Dashboard</li>
                      <li>Sie können Ihre Verfügbarkeiten eintragen</li>
                      <li>Mitglieder können Termine bei Ihnen buchen</li>
                      <li>Sie erhalten E-Mail-Benachrichtigungen über neue Termine</li>
                      <li>Sie können Ihre Bereiche jederzeit ändern</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Wichtige Hinweise
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Als Helferin verpflichten Sie sich zu vertraulichem Umgang mit Informationen</li>
                <li>• Sie können Ihre Helferinnen-Tätigkeit jederzeit beenden</li>
                <li>• Termine finden ausschließlich per Video-Call statt</li>
                <li>• Bei Problemen wenden Sie sich an die Administration</li>
              </ul>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={selectedCategories.length === 0 || isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Wird registriert...
                  </div>
                ) : (
                  'Als Helferin registrieren'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Success Message Preview */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4 hidden" id="success-message">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                Erfolgreich als Helferin registriert!
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <p>Sie können jetzt Ihre Verfügbarkeiten eintragen und anderen Mitgliedern helfen.</p>
              </div>
              <div className="mt-4">
                <Link
                  href="/helper-dashboard"
                  className="text-sm font-medium text-green-800 hover:text-green-900"
                >
                  Zum Helferinnen-Dashboard →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
