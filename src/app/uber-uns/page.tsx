"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  Baby,
  BookOpen,
  Handshake,
  Goal,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
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
    <div className="bg-gradient-to-br from-warm-50 via-coral-50 to-sage-50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="overflow-hidden"
      >
        {/* Hero Section */}
        <motion.section
          variants={itemVariants}
          className="text-center py-20 lg:py-28 bg-gradient-to-br from-coral-100/30 via-warm-100/20 to-sage-100/30"
        >
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-sage-800 via-coral-700 to-sage-800 bg-clip-text text-transparent">
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
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-sage-800">
                Wer sind wir?
              </h2>
              <p className="text-lg text-sage-600 mt-2">
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
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-sage-800">
                Unsere Kernziele
              </h2>
              <p className="text-lg text-sage-600 mt-2">
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

        {/* Social Media Section */}
        <motion.section
          variants={itemVariants}
          className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sage-50 via-cream-50 to-sage-50"
        >
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-sage-800 mb-4">
                Folge uns auf Social Media! 📱
              </h2>
              <p className="text-lg text-sage-600 max-w-2xl mx-auto">
                Bleib auf dem Laufenden mit aktuellen Flyern, Terminen und
                Live-Updates
              </p>
            </div>
            <SocialMediaSection variant="compact" showTitle={false} />
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          variants={itemVariants}
          className="py-20 lg:py-24 bg-sand-50"
        >
          <div className="container mx-auto px-4">
            <Card className="border-0 shadow-xl bg-clay-500 text-white">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold mb-2">
                  Werden Sie Teil unserer Gemeinschaft
                </CardTitle>
                <CardDescription className="text-lg text-white opacity-95">
                  Engagieren Sie sich, lernen Sie und wachsen Sie mit uns.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  className="bg-white text-clay-600 hover:bg-sand-50 font-semibold px-8 py-3 text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  asChild
                >
                  <Link href="/mitglied-werden">Jetzt Mitglied werden</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
