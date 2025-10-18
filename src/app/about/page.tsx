"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Heart,
  Users,
  Baby,
  Instagram,
  MessageCircle,
  Youtube,
} from "lucide-react";
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
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-sage-800 mb-4">
                Folgen Sie uns
              </CardTitle>
              <CardDescription className="text-lg text-sage-600">
                Bleiben Sie mit uns in Verbindung über unsere sozialen Medien
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.a
                  href="https://www.instagram.com/muslimin.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200 transition-all duration-300 group"
                >
                  <Instagram className="w-8 h-8 text-pink-600 mr-3" />
                  <span className="text-lg font-semibold text-pink-700 group-hover:text-pink-800">
                    Instagram
                  </span>
                </motion.a>

                <motion.a
                  href="https://www.tiktok.com/@muslimin.ev"
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">TT</span>
                  </div>
                  <span className="text-lg font-semibold text-gray-700 group-hover:text-gray-800">
                    TikTok
                  </span>
                </motion.a>

                <motion.a
                  href="https://www.youtube.com/@muslimin-ev"
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 transition-all duration-300 group"
                >
                  <Youtube className="w-8 h-8 text-red-600 mr-3" />
                  <span className="text-lg font-semibold text-red-700 group-hover:text-red-800">
                    YouTube
                  </span>
                </motion.a>

                <motion.a
                  href="https://whatsapp.com/channel/0029VaN2y5qIt5rsURhd1o2Y"
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300 group"
                >
                  <MessageCircle className="w-8 h-8 text-green-600 mr-3" />
                  <span className="text-lg font-semibold text-green-700 group-hover:text-green-800">
                    WhatsApp
                  </span>
                </motion.a>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-sage-800 mb-4">
                Möchten Sie Teil unserer Gemeinschaft werden?
              </CardTitle>
              <CardDescription className="text-lg text-sage-600">
                Entdecken Sie die Vorteile einer Mitgliedschaft und bewerben Sie
                sich noch heute
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-sage-700 leading-relaxed max-w-2xl mx-auto">
                Werden Sie Teil einer unterstützenden Gemeinschaft von Frauen,
                die sich gegenseitig helfen und gemeinsam wachsen. Ihre Reise zu
                mehr Verbindung und Unterstützung beginnt hier.
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
