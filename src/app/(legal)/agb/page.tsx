"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AGBPage() {
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
              AGB
            </span>
          </h1>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto leading-relaxed">
            Allgemeine Geschäftsbedingungen für unsere Beratungsleistungen
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Impressum Section */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-sage-800">
                  <FileText className="w-6 h-6 mr-3 text-sage-600" />
                  Allgemeine Geschäftsbedingungen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-sage max-w-none">
                  <div className="space-y-6">
                    <div className="p-4 rounded-lg bg-sage-50/50">
                      <h3 className="font-semibold text-sage-800 mb-2">
                        § 1 Geltungsbereich
                      </h3>
                      <p className="text-sage-700 leading-relaxed">
                        Diese Allgemeinen Geschäftsbedingungen gelten für alle
                        Beratungsleistungen des Vereins Muslimin e.V. Die
                        Nutzung unserer Plattform und Buchung von
                        Beratungsterminen erfolgt ausschließlich auf Grundlage
                        dieser AGB.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-coral-50/50">
                      <h3 className="font-semibold text-sage-800 mb-2">
                        § 2 Berechtigung zur Nutzung
                      </h3>
                      <p className="text-sage-700 leading-relaxed">
                        Die Nutzung der Beratungsplattform steht ausschließlich
                        verifizierten Vereinsmitgliedern zur Verfügung. Jedes
                        Mitglied kann maximal 3 Termine gleichzeitig gebucht
                        haben.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-warm-50/50">
                      <h3 className="font-semibold text-sage-800 mb-2">
                        § 3 Terminbuchung und -stornierung
                      </h3>
                      <p className="text-sage-700 leading-relaxed">
                        Termine können bis zu 2 Tage vor dem vereinbarten
                        Zeitpunkt kostenfrei storniert oder umgebucht werden.
                        Bei kurzfristigeren Absagen kann der Verein eine Gebühr
                        erheben. Alle Beratungen finden ausschließlich online
                        über Video-Chat statt.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-sage-50/50">
                      <h3 className="font-semibold text-sage-800 mb-2">
                        § 4 Vertraulichkeit
                      </h3>
                      <p className="text-sage-700 leading-relaxed">
                        Alle Beratungsgespräche werden vertraulich behandelt.
                        Die Helferinnen unterliegen der Schweigepflicht. Eine
                        Weitergabe von Gesprächsinhalten an Dritte erfolgt nur
                        mit ausdrücklicher Einwilligung oder bei gesetzlicher
                        Verpflichtung.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-coral-50/50">
                      <h3 className="font-semibold text-sage-800 mb-2">
                        § 5 Haftung
                      </h3>
                      <p className="text-sage-700 leading-relaxed">
                        Der Verein übernimmt keine Haftung für die Ergebnisse
                        der Beratung. Die Beratung stellt keine medizinische,
                        psychotherapeutische oder rechtliche Behandlung dar und
                        ersetzt diese nicht. Bei akuten Notfällen wenden Sie
                        sich bitte an den Notruf oder entsprechende Fachstellen.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-warm-50/50">
                      <h3 className="font-semibold text-sage-800 mb-2">
                        § 6 Schlussbestimmungen
                      </h3>
                      <p className="text-sage-700 leading-relaxed">
                        Es gilt deutsches Recht. Sollten einzelne Bestimmungen
                        unwirksam sein, bleibt die Gültigkeit der übrigen
                        Bestimmungen unberührt. Änderungen dieser AGB werden den
                        Mitgliedern per E-Mail mitgeteilt.
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
