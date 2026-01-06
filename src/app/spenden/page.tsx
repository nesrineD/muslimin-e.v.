"use client";

import { motion } from "framer-motion";
import { Copy, Check, Heart, TrendingUp, Shield, Users } from "lucide-react";
import { useState } from "react";
import { containerVariants, itemVariants } from "@/lib/animations";

interface DonationCampaign {
  id: string;
  title: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
  goal?: string;
  impact?: string;
  detailedText?: string;
}

const donationCampaigns: DonationCampaign[] = [
  {
    id: "yemen-relief",
    title: "Hoffnung für den Jemen — Soforthilfe & Unterstützung",
    description:
      "Seit 2018 organisieren wir Spendenaufrufe und Online-Auktionen für humanitäre Hilfe im Jemen",
    details: [
      "Medizinische Notversorgung für Kriegsopfer",
      "Lebensmittelhilfe für Familien in akuter Not",
      "Sichere Wasser- und Sanitärversorgung",
      "Bildungsangebote für Kinder im Krisengebiet",
    ],
    icon: <Heart className="w-12 h-12" />,
    goal: "Deine Spende bringt direkte Not- und Wiederaufbauhilfe",
    impact: "Seit 2018: Tausenden Menschen geholfen",
    detailedText: `Unsere Aktion: Spendenaufrufe & Online-Auktionen für den Jemen

Seit Jahren leidet die Bevölkerung des Jemen unter Krieg, Vertreibung und Hunger. Millionen Menschen sind akut von Unterversorgung betroffen. Als Muslimin e.V. setzen wir auf nachhaltige, transparente Hilfe und konkrete Maßnahmen vor Ort.

Was wir tun:
• Bundesweite Spendenaufrufe seit 2018
• Online-Auktionen mit gespendeten, islamisch wertvollen Objekten (Bücher, Gebetsgegenstände, Kunst)
• Partnerschaften mit vertrauenswürdigen internationalen hilfsorganisationen
• Direkte Verteilung der Mittel an medizinische Einrichtungen und Hilfsprojekte

Wie die Auktionen helfen:
Privatpersonen und Shops stellen Gegenstände für die Versteigerung zur Verfügung. Der Erlös wird gesammelt, geprüft und in enger Zusammenarbeit mit humanitären Partnern direkt an bedürftige Familien und Projekte im Jemen weitergeleitet.

Warum das wirkt:
Transparenz und vertrauenswürdige Partner stellen sicher, dass Spenden schnell und zielgerichtet ankommen. Jede Auktion schafft Aufmerksamkeit und ermöglicht größere Unterstützung durch gebündelte Mittel.

Dein Beitrag zählt: Jede Spende hilft, Leben zu retten und Hoffnung zu schenken.`,
  },
  {
    id: "local-support",
    title: "Lokale Unterstützungsprogramme",
    description: "Hilfe für bedürftige Familien in Deutschland",
    details: [
      "Finanzielle Unterstützung bei Miete",
      "Hilfe bei Kinderbetreuung",
      "Bildungs- und Integrationsprogramme",
      "Mentoring für junge Frauen",
    ],
    icon: <Users className="w-12 h-12" />,
    goal: "Stärke die Gemeinschaft hier bei uns",
    impact: "Gemeinsam sind wir stark",
  },
];

export default function SpendenPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const paypalButtonId = process.env.NEXT_PUBLIC_PAYPAL_BUTTON_ID;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <motion.main
      className="min-h-screen bg-gradient-to-br from-cream-50 via-sand-50 to-sage-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sage-100 to-warm-100 text-charcoal-800 rounded-full text-sm font-medium mb-6 border border-warm-200"
          >
            <Shield className="w-4 h-4" />
            Gemeinnützig anerkannt • transparente Mittelverwendung
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-charcoal-800">
            Deine Spende bewirkt Großes 💚
          </h1>
          <p className="text-xl md:text-2xl text-charcoal-800 mb-6 font-medium">
            Jeder Beitrag hilft uns, unsere Mission zu erfüllen und Menschen in
            Not zu unterstützen
          </p>
          <p className="text-lg text-charcoal-700 max-w-2xl mx-auto mb-8">
            Wir sind ein gemeinnützig anerkannter Verein und berichten
            transparent über die Verwendung von Spenden. Der Schwerpunkt liegt
            auf direkter Hilfe und Projekten.
          </p>

          {/* Quick Impact Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-sand-200">
              <TrendingUp className="w-4 h-4 text-sage-600" />
              <span className="font-semibold text-charcoal-800">
                Fokus: direkte Hilfe
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-sand-200">
              <Heart className="w-4 h-4 text-sage-600" />
              <span className="font-semibold text-charcoal-800">
                Unterstützung für Hilfsprojekte
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-sand-200">
              <Shield className="w-4 h-4 text-charcoal-600" />
              <span className="font-semibold text-charcoal-800">
                DSGVO-konform
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Project Showcase */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-charcoal-800 mb-4">
              Wofür deine Spende verwendet wird
            </h2>
            <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
              Entdecke unsere aktuellen Hilfsprojekte und
              Unterstützungsprogramme
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {donationCampaigns.map((campaign) => (
              <motion.div
                key={campaign.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="p-8 bg-gradient-to-br from-sand-50 to-white rounded-xl border-2 border-sand-200 hover:border-sage-300 hover:shadow-sage-lg transition-all"
              >
                <div className="text-sage-600 mb-4">{campaign.icon}</div>

                <h3 className="text-2xl font-bold text-charcoal-800 mb-3">
                  {campaign.title}
                </h3>

                <p className="text-charcoal-600 mb-6">{campaign.description}</p>

                <div className="space-y-2 mb-6">
                  {campaign.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-sage-500 mt-1">✓</span>
                      <p className="text-charcoal-600">{detail}</p>
                    </div>
                  ))}
                </div>

                {campaign.goal && (
                  <div className="p-4 bg-sage-50 rounded-lg mb-4 border border-sage-200">
                    <p className="text-sm font-semibold text-charcoal-800">
                      💡 {campaign.goal}
                    </p>
                  </div>
                )}

                {campaign.impact && (
                  <p className="text-charcoal-700 font-semibold italic">
                    &ldquo;{campaign.impact}&rdquo;
                  </p>
                )}

                {campaign.detailedText && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-sage-50 to-coral-50 rounded-lg border border-sage-200">
                    <p className="text-charcoal-700 leading-relaxed whitespace-pre-line">
                      {campaign.detailedText}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Donation Methods */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-charcoal-800 mb-12 text-center">
            Spendenmöglichkeiten
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* PayPal */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="p-8 bg-white rounded-xl border-2 border-sand-200 hover:border-sage-300 hover:shadow-sage-lg transition-all"
            >
              <div className="text-5xl mb-4">💳</div>
              <h3 className="text-2xl font-bold text-charcoal-800 mb-3">
                PayPal
              </h3>
              <p className="text-charcoal-600 mb-6">
                Schnell und sicher online spenden
              </p>
              {paypalButtonId ? (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://www.paypal.com/donate?hosted_button_id=${paypalButtonId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-clay-500 hover:bg-clay-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Jetzt spenden
                </motion.a>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-charcoal-600 italic">
                    PayPal-Spenden werden derzeit konfiguriert.
                  </p>
                  <p className="text-sm text-charcoal-600">
                    In der Zwischenzeit nutzen Sie bitte die Banküberweisung.
                  </p>
                </div>
              )}
            </motion.div>

            {/* Bank Transfer */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="p-8 bg-white rounded-xl border-2 border-sand-200 hover:border-sage-300 hover:shadow-sage-lg transition-all"
            >
              <div className="text-5xl mb-4">🏦</div>
              <h3 className="text-2xl font-bold text-charcoal-800 mb-3">
                Banküberweisung
              </h3>
              <p className="text-charcoal-600 mb-6">
                Direkte Überweisung auf unser Konto
              </p>
              <div className="space-y-3 text-sm bg-sand-50 p-4 rounded-lg border border-sand-200">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-charcoal-700">IBAN:</span>
                  <button
                    onClick={() =>
                      copyToClipboard("DE12 3012 0000 0123456789", "iban")
                    }
                    className="flex items-center gap-2 px-3 py-1 bg-white rounded hover:bg-sand-100 transition-colors border border-sand-200"
                  >
                    <span className="font-mono text-charcoal-900">
                      DE12 3012 0000 0123456789
                    </span>
                    {copied === "iban" ? (
                      <Check className="w-4 h-4 text-sage-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-sage-600" />
                    )}
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-charcoal-700">BIC:</span>
                  <button
                    onClick={() => copyToClipboard("DEUTDE33", "bic")}
                    className="flex items-center gap-2 px-3 py-1 bg-white rounded hover:bg-sand-100 transition-colors border border-sand-200"
                  >
                    <span className="font-mono text-charcoal-900">
                      DEUTDE33
                    </span>
                    {copied === "bic" ? (
                      <Check className="w-4 h-4 text-sage-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-sage-600" />
                    )}
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-charcoal-700">
                    Empfänger:
                  </span>
                  <button
                    onClick={() => copyToClipboard("Muslimin e.V.", "name")}
                    className="flex items-center gap-2 px-3 py-1 bg-white rounded hover:bg-sand-100 transition-colors border border-sand-200"
                  >
                    <span className="font-mono text-charcoal-900">
                      Muslimin e.V.
                    </span>
                    {copied === "name" ? (
                      <Check className="w-4 h-4 text-sage-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-sage-600" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Why Donate */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-charcoal-800 mb-6">
            Warum spenden?
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              {
                emoji: "🤝",
                title: "Gemeinschaft",
                text: "Unterstütze Frauen und Mädchen in schwierigen Lebenssituationen",
              },
              {
                emoji: "📚",
                title: "Bildung",
                text: "Ermögliche Bildungsprogramme und Fortbildungen",
              },
              {
                emoji: "💚",
                title: "Wirkung",
                text: "Hilf Menschen in Not weltweit, z.B. im Jemen",
              },
            ].map((reason, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-6 rounded-lg bg-white border-2 border-sand-200"
              >
                <p className="text-4xl mb-3">{reason.emoji}</p>
                <h3 className="text-xl font-bold text-charcoal-800 mb-2">
                  {reason.title}
                </h3>
                <p className="text-charcoal-600">{reason.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Impact Section - qualitative (no exact numbers) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto bg-clay-500 rounded-2xl p-12 text-center text-white shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-6">
            Dein Beitrag hilft vor Ort
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                title: "Soforthilfe",
                text: "Schnelle Unterstützung bei Hunger, medizinischer Erstversorgung und akuten Notlagen.",
              },
              {
                title: "Medizinische Versorgung",
                text: "Finanzierung von Medikamenten, Ausrüstung und medizinischer Logistik.",
              },
              {
                title: "Bildung & Perspektive",
                text: "Unterstützung von Bildungsangeboten, die Kindern und Familien langfristig Perspektiven eröffnen.",
              },
            ].map((item, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <p className="text-2xl font-bold mb-2">{item.title}</p>
                <p className="text-lg opacity-95">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <p className="mt-8 text-lg opacity-95">
            Wir kommunizieren Wirkung und Maßnahmebeispiele transparent —
            präzise Summen können je nach Projekt und Zeitpunkt variieren.
          </p>
        </motion.div>
      </section>

      {/* Transparency Section - simplified */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-charcoal-800 mb-6">
            Transparenz
          </h2>

          <p className="text-lg text-charcoal-600 max-w-2xl mx-auto mb-6">
            Wir legen großen Wert auf transparente Mittelverwendung.
            Projektberichte und Belege stellen wir auf Anfrage zur Verfügung und
            arbeiten mit vertrauenswürdigen Partnern zusammen, um
            sicherzustellen, dass Spenden zielgerichtet ankommen.
          </p>

          <div className="text-center">
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 px-6 py-3 bg-clay-500 hover:bg-clay-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              Für Berichte & Nachfragen: Kontakt aufnehmen
            </a>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <motion.div
          variants={itemVariants}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-charcoal-800 mb-4">
            Fragen zur Spende?
          </h2>
          <p className="text-lg text-charcoal-600 mb-6">
            Kontaktiere uns direkt für weitere Informationen
          </p>
          <a
            href="mailto:info@muslimin-ev.de"
            className="inline-flex items-center gap-2 px-6 py-3 bg-clay-500 hover:bg-clay-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Kontakt aufnehmen
          </a>
        </motion.div>
      </section>
    </motion.main>
  );
}
