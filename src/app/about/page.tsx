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
        <motion.div variants={itemVariants} className="mb-16">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-sage-800 mb-4">
                Von Frauen für Frauen
              </CardTitle>
              <CardDescription className="text-lg text-sage-600">
                Wir sind eine Gemeinschaft von muslimischen Frauen, die sich
                gegenseitig unterstützen
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  variants={itemVariants}
                  className="text-center p-6 rounded-2xl bg-gradient-to-br from-sage-50 to-sage-100"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage-600 text-white mb-4">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-sage-800 mb-2">
                    Unsere Gemeinschaft
                  </h3>
                  <p className="text-sage-600">
                    Mehr als 50 Mitglieder in Berlin und Umgebung
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="text-center p-6 rounded-2xl bg-gradient-to-br from-coral-50 to-coral-100"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-coral-500 text-white mb-4">
                    <Heart className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-sage-800 mb-2">
                    Deutschsprachig
                  </h3>
                  <p className="text-sage-600">
                    Islamische Veranstaltungen auf Deutsch für bessere
                    Integration
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="text-center p-6 rounded-2xl bg-gradient-to-br from-warm-50 to-warm-100"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-warm-500 text-white mb-4">
                    <Baby className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-sage-800 mb-2">
                    Kinderfreundlich
                  </h3>
                  <p className="text-sage-600">
                    Mit Kinderbetreuung und speziellen Kinderprogrammen
                  </p>
                </motion.div>
              </div>
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
