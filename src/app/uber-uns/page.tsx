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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { containerVariants, itemVariants } from "@/lib/animations";
import { PUBLIC_PAGE_WRAPPER_CLASS } from "@/lib/page-config";

export default function AboutPage() {
  return (
    <div className={PUBLIC_PAGE_WRAPPER_CLASS}>
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-charcoal-800">
              Über <span className="text-sage-700">Muslimin e.V.</span>
            </h1>
            <p className="text-lg md:text-xl text-charcoal-700 max-w-3xl mx-auto">
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
              <p className="text-lg text-charcoal-700 mt-3 max-w-2xl mx-auto leading-relaxed">
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
                <p className="text-charcoal-700">
                  Mitglieder verschiedenster Herkünfte und Generationen.
                </p>
              </div>
              <div className="p-6">
                <BookOpen className="h-12 w-12 text-sage-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-sage-800 mb-2">
                  Bildung
                </h3>
                <p className="text-charcoal-700">
                  Eine Plattform um religiöses Wissen zu erlangen.
                </p>
              </div>
              <div className="p-6">
                <Handshake className="h-12 w-12 text-sage-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-sage-800 mb-2">
                  Engagement
                </h3>
                <p className="text-charcoal-700">
                  Potenziale entfalten und die Gemeinde stärken.
                </p>
              </div>
              <div className="p-6">
                <Baby className="h-12 w-12 text-sage-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-sage-800 mb-2">
                  Familienfreundlich
                </h3>
                <p className="text-charcoal-700">
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
              <div className="space-y-6 text-lg text-charcoal-700 leading-relaxed">
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
              <p className="text-lg text-charcoal-700 mt-3 max-w-2xl mx-auto leading-relaxed">
                Die Säulen unserer Gemeinschaft.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card hover="lift" className="text-center p-8">
                <Goal className="h-12 w-12 text-sage-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-sage-800 mb-2">
                  Religiöse Bildung
                </h3>
              </Card>
              <Card hover="lift" className="text-center p-8">
                <Lightbulb className="h-12 w-12 text-sage-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-sage-800 mb-2">
                  Muslimische Identität
                </h3>
              </Card>
              <Card hover="lift" className="text-center p-8">
                <Users className="h-12 w-12 text-sage-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-sage-800 mb-2">
                  Austausch & Dialog
                </h3>
              </Card>
              <Card hover="lift" className="text-center p-8">
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
          className="py-20 lg:py-24 bg-white"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-sage-800">
                Unsere Erfolge
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <Card
                hover="lift"
                className="text-center p-8 border-2 border-sage-200"
              >
                <CardContent className="pt-6">
                  <div className="text-4xl md:text-5xl font-bold text-sage-600 mb-2">
                    7 Jahre
                  </div>
                  <p className="text-sage-700 font-semibold">
                    eingetragener Verein
                  </p>
                  <p className="text-charcoal-600 text-sm mt-1">
                    gegründet 2018
                  </p>
                </CardContent>
              </Card>
              <Card
                hover="lift"
                className="text-center p-8 border-2 border-sage-200"
              >
                <CardContent className="pt-6">
                  <div className="text-4xl md:text-5xl font-bold text-sage-600 mb-2">
                    60+
                  </div>
                  <p className="text-sage-700 font-semibold">Mitglieder</p>
                </CardContent>
              </Card>
              <Card
                hover="lift"
                className="text-center p-8 border-2 border-sage-200"
              >
                <CardContent className="pt-6">
                  <div className="text-4xl md:text-5xl font-bold text-sage-600 mb-2">
                    100+
                  </div>
                  <p className="text-sage-700 font-semibold">Veranstaltungen</p>
                </CardContent>
              </Card>
              <Card
                hover="lift"
                className="text-center p-8 border-2 border-sage-200"
              >
                <CardContent className="pt-6">
                  <div className="text-4xl md:text-5xl font-bold text-sage-600 mb-2">
                    500
                  </div>
                  <p className="text-sage-700 font-semibold">Gäste</p>
                  <p className="text-charcoal-600 text-sm mt-1">
                    bei unserer größten Veranstaltung
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>
        {/* CTA Section */}
        <motion.section
          variants={itemVariants}
          className="py-20 lg:py-24 bg-sage-50"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-800 mb-4">
              Werde Teil unserer Gemeinschaft
            </h2>
            <p className="text-lg text-charcoal-700 max-w-2xl mx-auto mb-8">
              Gemeinsam stärken wir muslimische Frauen und Mädchen in Berlin und
              darüber hinaus.
            </p>
            <Button variant="primary" size="lg" asChild>
              <Link href="/mitglied-werden" data-cta="primary">
                Mitglied werden
              </Link>
            </Button>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
