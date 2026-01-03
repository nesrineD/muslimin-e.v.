"use client";

import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { containerVariants, itemVariants } from "@/lib/animations";
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
      className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-sage-50"
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
          <h1 className="text-5xl md:text-6xl font-bold text-sage-800 mb-6">
            Unterstütze unsere Arbeit
          </h1>
          <p className="text-xl text-warm-600 mb-8">
            Jede Spende hilft Menschen in Not und unterstützt unsere
            Gemeinschaft
          </p>
          <p className="text-lg text-warm-500 max-w-2xl mx-auto">
            Wir sind ein gemeinnütziger Verein und möchten transparent über die
            Verwendung deiner Spende berichten.
          </p>
        </motion.div>
      </section>

      {/* Donation Methods */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-sage-800 mb-12 text-center">
            Spendenmöglichkeiten
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* PayPal */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="p-8 bg-white rounded-xl border-2 border-warm-200 hover:border-warm-400 hover:shadow-lg transition-all"
            >
              <div className="text-5xl mb-4">💳</div>
              <h3 className="text-2xl font-bold text-sage-800 mb-3">PayPal</h3>
              <p className="text-warm-600 mb-6">
                Schnell und sicher online spenden
              </p>
              {paypalButtonId ? (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://www.paypal.com/donate?hosted_button_id=${paypalButtonId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-sage-600 to-warm-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
                >
                  Jetzt spenden
                </motion.a>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-warm-600 italic">
                    PayPal-Spenden werden derzeit konfiguriert.
                  </p>
                  <p className="text-sm text-warm-600">
                    In der Zwischenzeit nutzen Sie bitte die Banküberweisung.
                  </p>
                </div>
              )}
            </motion.div>

            {/* Bank Transfer */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="p-8 bg-white rounded-xl border-2 border-warm-200 hover:border-warm-400 hover:shadow-lg transition-all"
            >
              <div className="text-5xl mb-4">🏦</div>
              <h3 className="text-2xl font-bold text-sage-800 mb-3">
                Banküberweisung
              </h3>
              <p className="text-warm-600 mb-6">
                Direkte Überweisung auf unser Konto
              </p>
              <div className="space-y-3 text-sm bg-warm-50 p-4 rounded-lg border border-warm-200">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-warm-700">IBAN:</span>
                  <button
                    onClick={() =>
                      copyToClipboard("DE12 3012 0000 0123456789", "iban")
                    }
                    className="flex items-center gap-2 px-3 py-1 bg-white rounded hover:bg-warm-100 transition-colors"
                  >
                    <span className="font-mono text-sage-900">
                      DE12 3012 0000 0123456789
                    </span>
                    {copied === "iban" ? (
                      <Check className="w-4 h-4 text-warm-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-warm-600" />
                    )}
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-warm-700">BIC:</span>
                  <button
                    onClick={() => copyToClipboard("DEUTDE33", "bic")}
                    className="flex items-center gap-2 px-3 py-1 bg-white rounded hover:bg-warm-100 transition-colors"
                  >
                    <span className="font-mono text-sage-900">DEUTDE33</span>
                    {copied === "bic" ? (
                      <Check className="w-4 h-4 text-warm-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-warm-600" />
                    )}
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-warm-700">
                    Empfänger:
                  </span>
                  <button
                    onClick={() => copyToClipboard("Muslimin e.V.", "name")}
                    className="flex items-center gap-2 px-3 py-1 bg-white rounded hover:bg-warm-100 transition-colors"
                  >
                    <span className="font-mono text-sage-900">
                      Muslimin e.V.
                    </span>
                    {copied === "name" ? (
                      <Check className="w-4 h-4 text-warm-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-warm-600" />
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
          <h2 className="text-4xl font-bold text-sage-800 mb-6">
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
                className="p-6 rounded-lg bg-sage-50 border border-sage-200"
              >
                <p className="text-4xl mb-3">{reason.emoji}</p>
                <h3 className="text-xl font-bold text-sage-800 mb-2">
                  {reason.title}
                </h3>
                <p className="text-warm-600">{reason.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Impact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto bg-gradient-to-r from-sage-600 to-warm-600 rounded-2xl p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-6">Deine Spende bewirkt</h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { amount: "€5", impact: "Eine warme Mahlzeit" },
              { amount: "€25", impact: "Medikamente für 1 Person" },
              { amount: "€100", impact: "Bildungsmaterial für 10 Kinder" },
            ].map((item, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <p className="text-3xl font-bold mb-2">{item.amount}</p>
                <p className="text-lg opacity-90">{item.impact}</p>
              </motion.div>
            ))}
          </div>

          <p className="mt-8 text-lg opacity-90">
            (Beispielhafte Angaben - können je nach Projekt variieren)
          </p>
        </motion.div>
      </section>

      {/* Transparency Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-sage-800 mb-6">Transparenz</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Ausgabenverteilung",
                items: [
                  "80% direkte Hilfe",
                  "15% Verwaltung",
                  "5% Fundraising",
                ],
              },
              {
                title: "Jährliche Berichte",
                items: [
                  "Detaillierte Geschäftsberichte",
                  "Finanzielle Transparenz",
                  "Impact Reports mit Zahlen",
                ],
              },
            ].map((section, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-6 rounded-lg bg-sage-50 border border-sage-200 text-left"
              >
                <h3 className="text-xl font-bold text-sage-800 mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-warm-600 mt-1">✓</span>
                      <span className="text-warm-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <motion.div
          variants={itemVariants}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-sage-800 mb-4">
            Fragen zur Spende?
          </h2>
          <p className="text-lg text-warm-600 mb-6">
            Kontaktiere uns direkt für weitere Informationen
          </p>
          <a
            href="mailto:info@muslimin-ev.de"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sage-600 to-warm-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
          >
            Kontakt aufnehmen
          </a>
        </motion.div>
      </section>
    </motion.main>
  );
}
