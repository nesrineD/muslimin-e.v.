"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, Heart, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SocialMediaSection } from "@/components/SocialMediaSection";

export default function UberUnsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-sage-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.04, 0.07, 0.04],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-br from-sage-200 to-sage-100 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.04, 0.06, 0.04],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-tl from-cream-200 to-warm-100 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.03, 0.05, 0.03],
            y: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-sage-100 to-cream-100 rounded-full blur-3xl"
        />
      </div>

      <motion.main
        className="relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={itemVariants}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-sage-800 mb-6"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Über{" "}
              <span className="bg-gradient-to-r from-coral-500 to-warm-500 bg-clip-text text-transparent">
                Muslimin e.V.
              </span>
            </motion.h1>
            <motion.p
              className="text-xl text-sage-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Ein aktiver muslimischer Mädchen- und Frauenverein seit 2011
            </motion.p>
          </motion.div>
        </section>

        {/* Wer sind wir? */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-sage-800 mb-4">
                  Wer sind wir?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg text-sage-600 leading-relaxed">
                  Wir sind ein aktiver muslimischer Mädchen- und Frauenverein,
                  der sich zum Ziel gesetzt hat, Vereinsmitgliedern Zugang zu
                  Informationen, Beratung und Gemeinschaft zu ermöglichen.
                </p>
                <p className="text-lg text-sage-600 leading-relaxed">
                  💚 Seit 2011 schaffen wir Räume für Austausch,
                  Wissensaustausch und gegenseitige Unterstützung.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Vereinsphilosophie */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-sage-800 mb-4">
                  Vereinsphilosophie
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg text-sage-600 leading-relaxed">
                  Der Verein wurde im Februar 2011 mit dem Ziel gegründet,
                  Frauen zu einem Ort des Austausches, der Wissensvermittlung
                  und gegenseitiger Unterstützung einzuladen. Inspiriert von den
                  großen Vorbildern Sayeda Fatima (as) und Sayeda Zainab (as),
                  möchten wir einen Raum schaffen, in dem Frauen ihre
                  spirituelle, intellektuelle und soziale Entwicklung fördern
                  können.
                </p>
                <p className="text-lg text-sage-700 leading-relaxed font-medium">
                  ✨ Wir glauben an die Kraft der Gemeinschaft und an die
                  Bedeutung von Bildung, Dialog und gegenseitigem Respekt.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Kernziele */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="max-w-5xl mx-auto">
            <motion.h2
              className="text-3xl font-bold text-sage-800 mb-3 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Unsere Kernziele
            </motion.h2>
            <p className="text-center text-sage-600 mb-12 text-lg">
              Die Säulen unserer Gemeinschaft
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Bildung */}
              <motion.div
                variants={itemVariants}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-sage-50 to-sage-100 hover:from-sage-100 hover:to-sage-200 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage-600 text-white mb-4">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-sage-800 mb-2">
                  Bildung
                </h3>
                <p className="text-sage-600">
                  Wissensaustausch und Fortbildung
                </p>
              </motion.div>

              {/* Gemeinschaft */}
              <motion.div
                variants={itemVariants}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-coral-50 to-coral-100 hover:from-coral-100 hover:to-coral-200 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-coral-500 text-white mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-sage-800 mb-2">
                  Gemeinschaft
                </h3>
                <p className="text-sage-600">Unterstützung und Zusammenhalt</p>
              </motion.div>

              {/* Hilfe */}
              <motion.div
                variants={itemVariants}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-warm-50 to-warm-100 hover:from-warm-100 hover:to-warm-200 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-warm-500 text-white mb-4">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-sage-800 mb-2">
                  Hilfe
                </h3>
                <p className="text-sage-600">Beratung in schwierigen Zeiten</p>
              </motion.div>
            </div>

            {/* Wachstum - Full Width Below */}
            <motion.div
              variants={itemVariants}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-sage-50 to-cream-100 hover:from-cream-100 hover:to-sage-100 transition-all duration-300 mt-8 max-w-md mx-auto"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-sage-600 to-warm-500 text-white mb-4">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-sage-800 mb-2">
                Wachstum
              </h3>
              <p className="text-sage-600">
                Persönliche und spirituelle Entwicklung
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Social Media Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <SocialMediaSection />
        </section>
      </motion.main>
    </div>
  );
}
