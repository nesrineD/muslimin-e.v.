"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DatenschutzPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-sage-50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-12"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-sage-800 mb-6">
            <span className="bg-gradient-to-r from-coral-500 to-warm-500 bg-clip-text text-transparent">
              Datenschutz
            </span>
          </h1>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto leading-relaxed">
            Informationen zur Verarbeitung Ihrer personenbezogenen Daten
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Impressum Section */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-sage-800">
                  <Shield className="w-6 h-6 mr-3 text-sage-600" />
                  Datenschutzerklärung
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-sage max-w-none">
                  <p className="text-sage-700 leading-relaxed mb-6">
                    Wenn Sie das auf unserer Website bereitgestellte Formular
                    zur Anmeldung für (z. B. eine Veranstaltung /
                    Mitgliedschaft) nutzen, erheben wir personenbezogene Daten
                    wie Name, E-Mail-Adresse, Telefonnummer und ggf. weitere
                    Angaben.
                  </p>

                  <div className="space-y-6">
                    <div className="p-4 rounded-lg bg-sage-50/50">
                      <h3 className="font-semibold text-sage-800 mb-2">
                        Zweck der Datenerhebung:
                      </h3>
                      <p className="text-sage-700 leading-relaxed">
                        Die Erhebung erfolgt ausschließlich zur Bearbeitung
                        Ihrer Anfrage bzw. zur Organisation und Durchführung der
                        Veranstaltung/des Anliegens, für das Sie sich angemeldet
                        haben.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-coral-50/50">
                      <h3 className="font-semibold text-sage-800 mb-2">
                        Rechtsgrundlage:
                      </h3>
                      <p className="text-sage-700 leading-relaxed">
                        Die Verarbeitung Ihrer Daten erfolgt gemäß Art. 6 Abs. 1
                        lit. b DSGVO (Vertrag oder vorvertragliche Maßnahmen)
                        bzw. bei Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-warm-50/50">
                      <h3 className="font-semibold text-sage-800 mb-2">
                        Speicherdauer:
                      </h3>
                      <p className="text-sage-700 leading-relaxed">
                        Ihre Daten werden nur so lange gespeichert, wie sie für
                        die Durchführung und Nachbereitung der Veranstaltung
                        bzw. zur Bearbeitung Ihrer Anfrage erforderlich sind,
                        und anschließend gelöscht – soweit keine gesetzlichen
                        Aufbewahrungspflichten entgegenstehen.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-sage-50/50">
                      <h3 className="font-semibold text-sage-800 mb-2">
                        Weitergabe an Dritte:
                      </h3>
                      <p className="text-sage-700 leading-relaxed">
                        Ihre Daten werden nicht an Dritte weitergegeben.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-coral-50/50">
                      <h3 className="font-semibold text-sage-800 mb-2">
                        Ihre Rechte:
                      </h3>
                      <p className="text-sage-700 leading-relaxed">
                        Sie haben das Recht auf Auskunft, Berichtigung,
                        Löschung, Einschränkung der Verarbeitung,
                        Datenübertragbarkeit und Widerspruch. Bitte wenden Sie
                        sich hierzu an{" "}
                        <a
                          href="mailto:info@muslimin-ev.de"
                          className="text-sage-800 hover:text-sage-900 font-medium transition-colors duration-200"
                        >
                          info@muslimin-ev.de
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
