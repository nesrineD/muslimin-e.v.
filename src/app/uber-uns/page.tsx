"use client";

import { motion } from "framer-motion";
import {
  Users,
  Baby,
  BookOpen,
  Handshake,
  Goal,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
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
    <div className="bg-gradient-to-br from-sage-50 via-cream-50 to-warm-50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="overflow-hidden"
      >
        {/* Hero Section */}
        <motion.section
          variants={itemVariants}
          className="text-center py-20 lg:py-28 bg-gradient-to-br from-sage-100/40 via-cream-100/30 to-sage-50"
        >
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-sage-700 via-sage-600 to-sage-700 bg-clip-text text-transparent">
              Über{" "}
              <span className="bg-gradient-to-r from-sage-500 to-sage-600 bg-clip-text text-transparent">
                Muslimin e.V.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-sage-600 max-w-3xl mx-auto">
              Gemeinschaft, Bildung & Hilfe für muslimische Frauen seit 2011.
            </p>
          </div>
        </motion.section>

        {/* Wer sind wir? Section */}
        <motion.section
          variants={itemVariants}
          className="py-20 lg:py-24 bg-sand-50"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-sage-800 leading-tight">
                Wer sind wir?
              </h2>
              <p className="text-lg text-sage-600 mt-3 max-w-2xl mx-auto leading-relaxed">
                Ein aktiver muslimischer Mädchen- und Frauenverein im Herzen
                Berlins.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="p-6">
                <Users className="h-12 w-12 text-sage-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-sage-800 mb-2">
                  Vielfalt
                </h3>
                <p className="text-sage-600">
                  Mitglieder verschiedenster Herkünfte und Generationen.
                </p>
              </div>
              <div className="p-6">
                <BookOpen className="h-12 w-12 text-sage-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-sage-800 mb-2">
                  Bildung
                </h3>
                <p className="text-sage-600">
                  Eine Plattform um religiöses Wissen zu erlangen.
                </p>
              </div>
              <div className="p-6">
                <Handshake className="h-12 w-12 text-sage-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-sage-800 mb-2">
                  Engagement
                </h3>
                <p className="text-sage-600">
                  Potenziale entfalten und die Gemeinde stärken.
                </p>
              </div>
              <div className="p-6">
                <Baby className="h-12 w-12 text-sage-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-sage-800 mb-2">
                  Familienfreundlich
                </h3>
                <p className="text-sage-600">
                  Kinderbetreuung für eine kinderfreundliche Atmosphäre.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Vereinsphilosophie Section */}
        <motion.section
          variants={itemVariants}
          className="py-20 lg:py-24 bg-white"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-sage-800">
                Unsere Philosophie
              </h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <blockquote className="border-l-4 border-sage-500 pl-6 italic text-xl text-sage-700 my-8">
                &ldquo;Inspiriert von den großen Vorbildern Sayeda Fatima (a)
                und Sayeda Zainab (a), möchten wir einen Raum schaffen, in dem
                Frauen ihre spirituelle, intellektuelle und soziale Entwicklung
                fördern können.&rdquo;
              </blockquote>
              <div className="space-y-6 text-lg text-sage-600 leading-relaxed">
                <p>
                  Unser Verein wurde 2011 gegründet, um muslimische Frauen in
                  Berlin und bundesweit zu vernetzen und ihnen eine Stimme zu
                  verleihen. Wir erkannten den Mangel an Angeboten, die für die
                  religiöse Identitätsfindung und die Entwicklung des
                  Selbstbewusstseins wichtig sind.
                </p>
                <p>
                  Unsere Arbeit dient der religiösen Bildung und der Stärkung
                  der muslimisch-deutschen Identität. Wir fördern den Austausch
                  über gesellschaftlich relevante Themen und bieten Frauen einen
                  geschützten Kreis, um sich Wissen anzueignen.
                </p>
                <p>
                  Wir motivieren Frauen, sich aktiv in die Gemeindearbeit
                  einzubringen, ihre Talente zu fördern und die Gesellschaft
                  mitzugestalten. Durch den Dialog mit anderen möchten wir zur
                  Aufklärung der Allgemeinbevölkerung beitragen.
                </p>
                <p>
                  Wir hoffen, unsere Projekte und Kooperationen in Zukunft
                  auszuweiten, um noch mehr Schwestern bei den Herausforderungen
                  im Leben einer Muslimin in Deutschland zu unterstützen.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Kernziele Section */}
        <motion.section
          variants={itemVariants}
          className="py-20 lg:py-24 bg-sand-50"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-sage-800 leading-tight">
                Unsere Kernziele
              </h2>
              <p className="text-lg text-sage-600 mt-3 max-w-2xl mx-auto leading-relaxed">
                Die Säulen unserer Gemeinschaft.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center p-8 border-2 border-transparent hover:border-sage-200 hover:shadow-lg transition-all">
                <Goal className="h-12 w-12 text-sage-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-sage-800 mb-2">
                  Religiöse Bildung
                </h3>
              </Card>
              <Card className="text-center p-8 border-2 border-transparent hover:border-sage-200 hover:shadow-lg transition-all">
                <Lightbulb className="h-12 w-12 text-sage-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-sage-800 mb-2">
                  Muslimische Identität
                </h3>
              </Card>
              <Card className="text-center p-8 border-2 border-transparent hover:border-sage-200 hover:shadow-lg transition-all">
                <Users className="h-12 w-12 text-sage-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-sage-800 mb-2">
                  Austausch & Dialog
                </h3>
              </Card>
              <Card className="text-center p-8 border-2 border-transparent hover:border-sage-200 hover:shadow-lg transition-all">
                <ShieldCheck className="h-12 w-12 text-sage-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-sage-800 mb-2">
                  Geschützter Raum
                </h3>
              </Card>
            </div>
          </div>
        </motion.section>

        {/* Statistiken Section */}
        <motion.section
          variants={itemVariants}
          className="py-20 lg:py-24 bg-sand-50"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-sage-800">
                Unsere Erfolge
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <Card className="text-center p-8 border-2 border-sage-200 hover:border-sage-300 hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <div className="text-4xl md:text-5xl font-bold text-sage-600 mb-2">
                    7 Jahre
                  </div>
                  <p className="text-sage-700 font-medium">
                    eingetragener Verein
                  </p>
                  <p className="text-charcoal-600 text-sm mt-1">
                    gegründet 2018
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center p-8 border-2 border-sage-200 hover:border-sage-300 hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <div className="text-4xl md:text-5xl font-bold text-sage-600 mb-2">
                    60+
                  </div>
                  <p className="text-sage-700 font-medium">Mitglieder</p>
                </CardContent>
              </Card>
              <Card className="text-center p-8 border-2 border-sage-200 hover:border-sage-300 hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <div className="text-4xl md:text-5xl font-bold text-sage-600 mb-2">
                    100+
                  </div>
                  <p className="text-sage-700 font-medium">Veranstaltungen</p>
                </CardContent>
              </Card>
              <Card className="text-center p-8 border-2 border-sage-200 hover:border-sage-300 hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <div className="text-4xl md:text-5xl font-bold text-sage-600 mb-2">
                    500
                  </div>
                  <p className="text-sage-700 font-medium">Gäste</p>
                  <p className="text-charcoal-600 text-sm mt-1">
                    bei unserer größten Veranstaltung
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
