// Static Counseling Centers Page - External resources listing
'use client'

export default function CounselingCenters() {
  const counselingCenters = [
    {
      category: "Psychologische Beratung",
      centers: [
        {
          name: "Psychologische Beratungsstelle Mitte",
          address: "Musterstraße 123, 12345 Berlin",
          phone: "030 123456789",
          email: "info@beratung-mitte.de",
          website: "www.beratung-mitte.de",
          hours: "Mo-Fr 9:00-17:00 Uhr",
          specializations: "Angststörungen, Depression, Familienkonflikte"
        },
        {
          name: "Krisenhilfe Berlin e.V.",
          address: "Beispielweg 45, 12345 Berlin",
          phone: "030 987654321",
          email: "hilfe@krisenhilfe-berlin.de",
          website: "www.krisenhilfe-berlin.de",
          hours: "24/7 Hotline verfügbar",
          specializations: "Krisenintervention, Suizidprävention"
        }
      ]
    },
    {
      category: "Sozialberatung",
      centers: [
        {
          name: "Sozialberatung Integration",
          address: "Integrationstraße 67, 12345 Berlin",
          phone: "030 555123456",
          email: "beratung@integration-berlin.de",
          website: "www.integration-berlin.de",
          hours: "Mo-Do 8:00-16:00, Fr 8:00-14:00",
          specializations: "Behördengänge, Arbeitssuche, Wohnen"
        },
        {
          name: "Familienberatung Plus",
          address: "Familienplatz 12, 12345 Berlin",
          phone: "030 777888999",
          email: "info@familienberatung-plus.de",
          website: "www.familienberatung-plus.de",
          hours: "Mo-Fr 9:00-18:00 Uhr",
          specializations: "Familienhilfe, Erziehungsberatung, Konfliktlösung"
        }
      ]
    },
    {
      category: "Schwangerschaftsbegleitung",
      centers: [
        {
          name: "Schwangerschaftsberatung Hoffnung",
          address: "Hoffnungsweg 89, 12345 Berlin",
          phone: "030 111222333",
          email: "info@hoffnung-beratung.de",
          website: "www.hoffnung-beratung.de",
          hours: "Mo-Mi, Fr 9:00-17:00, Do 12:00-20:00",
          specializations: "Schwangerschaftskonflikt, Pränataldiagnostik, Nachsorge"
        },
        {
          name: "Hebammenpraxis Geborgenheit",
          address: "Geborgenheitstraße 34, 12345 Berlin",
          phone: "030 444555666",
          email: "kontakt@hebammen-geborgenheit.de",
          website: "www.hebammen-geborgenheit.de",
          hours: "Mo-Fr 8:00-20:00, Sa 10:00-16:00",
          specializations: "Geburtsvorbereitung, Wochenbettbetreuung, Stillberatung"
        }
      ]
    },
    {
      category: "Rechtliche Beratung",
      centers: [
        {
          name: "Rechtsberatung für Familien",
          address: "Justizstraße 56, 12345 Berlin",
          phone: "030 123987456",
          email: "recht@familienrecht-berlin.de",
          website: "www.familienrecht-berlin.de",
          hours: "Mo-Fr 9:00-17:00 nach Terminvereinbarung",
          specializations: "Familienrecht, Aufenthaltsrecht, Sozialrecht"
        }
      ]
    }
  ]

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
              <Link href="/dashboard" className="text-gray-700 hover:text-emerald-600">
                Dashboard
              </Link>
              <Link href="/login" className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
                Anmelden
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Externe Beratungsstellen
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hier finden Sie eine kuratierte Liste vertrauensvoller Beratungsstellen
            für weiterführende Hilfe und Unterstützung.
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Hinweis:</strong> Diese Liste wird regelmäßig aktualisiert.
                Kontaktieren Sie die Beratungsstellen direkt für aktuelle Informationen
                zu Öffnungszeiten und Verfügbarkeiten.
              </p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-12">
          {counselingCenters.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-emerald-200">
                {category.category}
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                {category.centers.map((center, centerIndex) => (
                  <div key={centerIndex} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {center.name}
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-gray-700">{center.address}</span>
                      </div>

                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a href={`tel:${center.phone}`} className="text-emerald-600 hover:text-emerald-800">
                          {center.phone}
                        </a>
                      </div>

                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href={`mailto:${center.email}`} className="text-emerald-600 hover:text-emerald-800">
                          {center.email}
                        </a>
                      </div>

                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                        </svg>
                        <a href={`https://${center.website}`} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-800">
                          {center.website}
                        </a>
                      </div>

                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700">{center.hours}</span>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Schwerpunkte:</h4>
                        <p className="text-sm text-gray-600">{center.specializations}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-emerald-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Benötigen Sie sofortige Hilfe?
          </h3>
          <p className="text-gray-700 mb-6">
            Für akute Krisen und Notfälle stehen Ihnen diese Hotlines 24/7 zur Verfügung:
          </p>
          <div className="space-y-2 text-lg">
            <p>
              <strong>Telefonseelsorge:</strong>{' '}
              <a href="tel:08001110111" className="text-emerald-600 hover:text-emerald-800">
                0800 111 0 111
              </a>{' '}
              oder{' '}
              <a href="tel:08001110222" className="text-emerald-600 hover:text-emerald-800">
                0800 111 0 222
              </a>
            </p>
            <p>
              <strong>Nummer gegen Kummer:</strong>{' '}
              <a href="tel:08001110550" className="text-emerald-600 hover:text-emerald-800">
                0800 111 0 550
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
