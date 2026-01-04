"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Users, Baby } from "lucide-react";
import { SocialMediaSection } from "@/components/SocialMediaSection";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-sage-50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-12"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-sage-800 mb-6">
            Über{" "}
            <span className="bg-gradient-to-r from-coral-500 to-warm-500 bg-clip-text text-transparent">
              Muslimin e.V.
            </span>
          </h1>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto leading-relaxed">
            Ein Frauen muslimischer Verein in Deutschland, basiert in Berlin
          </p>
        </motion.div>

        {/* About Section */}
        <motion.div variants={itemVariants} className="mb-16 space-y-12">
          {/* Wer sind wir? */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-sage-800 mb-4">
                Wer sind wir?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-lg text-sage-600 leading-relaxed">
              <p>
                Wir sind ein aktiver muslimischer Mädchen- und Frauenverein im
                Herzen Berlins. Mitglieder verschiedenster Herkünfte und
                Generationen sorgen im Verein für Diversität.
              </p>
              <p>
                Mit facettenreichen Veranstaltungen, Vorträgen und
                Mitgliederaktivitäten bieten wir Musliminnen in Berlin und
                Deutschland eine Plattform um religiöses Wissen zu erlangen.
              </p>
              <p>
                Darüber hinaus können sich Frauen und Mädchen ehrenamtlich für
                religiöse und gesellschaftliche Belange von Musliminnen
                engagieren, indem sie ihre Kompetenzen und Erfahrungen
                einbringen und so ihr eigenes Potenzial entfalten und
                gleichzeitig die Gemeinde stärken.
              </p>
              <p>
                Mütter sind in unserem Verein sehr Willkommen. Mit einer
                stätigen Kinderbetreuung sorgen wir innerhalb unserer Programme
                für eine kinderfreundliche Atmosphäre.
              </p>
            </CardContent>
          </Card>

          {/* Vereinsphilosophie */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-sage-800 mb-4">
                Vereinsphilosophie
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-lg text-sage-600 leading-relaxed">
              <p>
                Unser Verein wurde 2011 zunächst mit der Absicht gegründet,
                muslimische Frauen in Berlin und bundesweit miteinander zu
                vernetzen und ihnen eine Stimme zu verleihen. Vor der Gründung
                herrschte ein Mangel an Angeboten, speziell für Frauen der
                Berliner Gemeinden, die für die religiöse Identitätsfindung und
                die Entwicklung des Selbstbewusstseins dieser
                Gesellschaftsgruppe wichtig sind.
              </p>
              <p>
                Unsere großen Vorbilder, Sayeda Fatima (a) und ihre Tochter,
                Sayeda Zainab (a), inspirieren uns zu unserer ehrenamtlichen
                Arbeit im Verein, mit der wir die muslimischen Frauen in der
                Gemeinde und für die Gesellschaft stärken wollen.
              </p>
              <p>
                Dabei dient unsere Vereinsarbeit der religiösen Bildung und der
                Stärkung der muslimisch-deutschen Identität. Darüber hinaus
                möchten wir den Austausch über gesellschaftlich relevante Themen
                fördern. Wir bieten daher sowohl jungen als auch älteren Frauen
                die Möglichkeit, sich in einem geschützten Kreis und von
                Experten angeleitet, Wissen über geschlechtsspezifische
                Themengebiete sowie Rechtsgrundlagen anzueignen und
                berücksichtigen dabei ihre Bedürfnisse und Interessen. Dadurch
                entsteht eine angenehme und vertrauensvolle Atmosphäre, in der
                man sich gegenseitig unterstützt. Wir möchten außerdem mit
                unserer Arbeit Frauen dazu motivieren, selbst aktiv zu werden,
                indem sie sich in die Gemeindearbeit einbringen und so die
                Gesellschaft mitgestalten. Durch die Mitgestaltung unserer
                Veranstaltungen sollen die Talente unserer Mitgliederinnen
                gefördert und gefordert werden.
              </p>
              <p>
                Des Weiteren suchen wir mit der Organisation und der Teilnahme
                an Veranstaltungen, die für jeden offen stehen, den Dialog mit
                anderen. Dadurch erhoffen wir uns, zur Aufklärung der
                Allgemeinbevölkerung beitragen zu können.
              </p>
              <p>
                Eine große Gruppe unter unseren Gästen stellen die Mütter dar.
                Durch das Angebot der Kinderbetreuung während unserer
                Veranstaltungen sowie der Organisation von Kinderprogrammen
                möchten wir sie entlasten und ihnen die Möglichkeit geben,
                entspannter an unseren Veranstaltungen teilzunehmen.
              </p>
              <p>
                Wir erhoffen uns für die Zukunft die Ausweitung unserer Projekte
                und Kooperationen, um so noch mehr Schwestern bei den
                Herausforderungen im Leben einer Muslimin in Deutschland zu
                unterstützen.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Social Media Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <SocialMediaSection
            variant="card"
            showHeader={false}
            showLabels={false}
            context="about"
          />
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-xl bg-gradient-to-br from-sage-50/80 to-cream-50/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-sage-800 mb-4">
                Möchten Sie Teil unserer Gemeinschaft werden?
              </CardTitle>
              <CardDescription className="text-lg text-sage-700 font-semibold mb-3">
                🤝 Im Dienste von Ahlul-Bayt
              </CardDescription>
              <CardDescription className="text-base text-sage-600">
                Entdecken Sie die Vorteile einer Mitgliedschaft und registrieren
                Sie sich noch heute
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-sage-700 leading-relaxed max-w-2xl mx-auto">
                Werden Sie Teil einer unterstützenden Gemeinschaft von Frauen,
                die sich gegenseitig helfen und gemeinsam wachsen –{" "}
                <span className="font-semibold text-sage-800">
                  im Dienste von Ahlul-Bayt
                </span>
                . Ihre Reise zu mehr Verbindung, Unterstützung und geistlichem
                Wachstum beginnt hier.
              </p>
              <Button
                className="bg-gradient-to-r from-sage-600 to-warm-600 hover:from-sage-700 hover:to-warm-700 text-white font-semibold px-8 py-3 text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                asChild
              >
                <Link href="/mitglied-werden">Jetzt Mitglied werden</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
