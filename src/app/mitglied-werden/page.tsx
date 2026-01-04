"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, Users, Shield, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SocialMediaSection } from "@/components/SocialMediaSection";

export default function MitgliedWerdenPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-sage-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.06, 0.03],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-sage-300 to-sage-100 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.03, 0.05, 0.03],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-warm-200 to-cream-100 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-12 relative z-10"
      >
        {/* Hero Section with Warm Invitation */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-8"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="bg-gradient-to-r from-sage-600 via-sage-400 to-sage-500 bg-clip-text text-transparent animate-gradient">
              Willkommen, liebe Schwester!
            </span>
          </motion.h1>

          <div className="max-w-4xl mx-auto space-y-6">
            <motion.p
              className="text-2xl md:text-3xl text-sage-700 font-semibold leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              💝 Werden Sie Teil unserer warmherzigen Schwesternschaft
            </motion.p>

            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border-2 border-sage-300 shadow-xl hover:shadow-2xl transition-all duration-500 hover:border-sage-400"
              whileHover={{ y: -5 }}
            >
              <p className="text-xl text-sage-800 leading-relaxed mb-6">
                <motion.span
                  className="text-2xl inline-block"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  🌸
                </motion.span>{" "}
                Bei{" "}
                <strong className="text-sage-600 font-bold">
                  Muslimin e.V.
                </strong>{" "}
                finden Sie nicht nur Unterstützung, sondern echte
                Schwesternschaft. Hier sind Sie verstanden, geschätzt und
                niemals allein.
              </p>

              <p className="text-lg text-charcoal-600 leading-relaxed mb-4">
                Unsere Gemeinschaft ist ein Ort der Wärme, des Vertrauens und
                der gegenseitigen Stärkung. Hier können Sie authentisch sein,
                Ihre Sorgen teilen und Ihre Träume verfolgen.
              </p>

              <p className="text-lg text-sage-700 font-semibold">
                <motion.span
                  className="text-xl inline-block"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                >
                  ✨
                </motion.span>{" "}
                Lassen Sie uns gemeinsam wachsen, lachen und uns gegenseitig
                inspirieren!
              </p>
            </motion.div>

            <motion.p
              className="text-lg text-charcoal-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Füllen Sie einfach das Formular unten aus und beginnen Sie Ihre
              Reise mit uns. Wir freuen uns so sehr darauf, Sie kennenzulernen!
              🤗
            </motion.p>
          </div>
        </motion.div>

        {/* Membership Types Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <motion.h2
            className="text-3xl font-bold text-center mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-sage-600 via-sage-400 to-sage-500 bg-clip-text text-transparent">
              Mitgliedschaftstypen
            </span>
          </motion.h2>
          <p className="text-center text-charcoal-500 mb-12 text-lg">
            Wählen Sie die Mitgliedschaft, die zu Ihnen passt
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Active Membership */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="h-full border-2 border-sage-300 shadow-xl bg-gradient-to-br from-white to-sage-50/30 hover:shadow-2xl hover:border-sage-400 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-sage-300/20 to-transparent rounded-bl-full" />
                <CardHeader className="relative">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-sage-500 to-sage-400 text-white mb-4 mx-auto shadow-lg">
                    <Users className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-center mb-2">
                    <span className="bg-gradient-to-r from-sage-700 to-sage-500 bg-clip-text text-transparent">
                      Aktive Mitgliedschaft
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-sage-50 rounded-lg p-4 border-l-4 border-sage-500">
                    <h4 className="font-semibold text-sage-800 mb-2">
                      💡 Das solltest du mitbringen:
                    </h4>
                    <ul className="space-y-2 text-charcoal-600">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-sage-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          Engagement und Bereitschaft zur aktiven Mitgestaltung
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-sage-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          Zeit für regelmäßige Teilnahme an Vereinsarbeit
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-sage-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Eigene Talente und Kompetenzen einbringen</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-cream-50 rounded-lg p-4 border-l-4 border-warm-500">
                    <h4 className="font-semibold text-sage-800 mb-2">
                      ✨ Das erwartet dich:
                    </h4>
                    <ul className="space-y-2 text-charcoal-600">
                      <li className="flex items-start">
                        <Heart className="w-5 h-5 text-warm-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          Mitgestaltung von Veranstaltungen und Projekten
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Heart className="w-5 h-5 text-warm-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          Persönliche Weiterentwicklung durch Verantwortung
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Heart className="w-5 h-5 text-warm-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Stimmrecht bei Vereinsentscheidungen</span>
                      </li>
                      <li className="flex items-start">
                        <Heart className="w-5 h-5 text-warm-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          Enge Vernetzung mit anderen aktiven Mitgliedern
                        </span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Passive Membership */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="h-full border-2 border-cream-300 shadow-xl bg-gradient-to-br from-white to-cream-50/30 hover:shadow-2xl hover:border-warm-400 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cream-300/20 to-transparent rounded-bl-full" />
                <CardHeader className="relative">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-warm-500 to-warm-400 text-white mb-4 mx-auto shadow-lg">
                    <Shield className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-center mb-2">
                    <span className="bg-gradient-to-r from-warm-700 to-warm-500 bg-clip-text text-transparent">
                      Passive Mitgliedschaft
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-cream-50 rounded-lg p-4 border-l-4 border-warm-500">
                    <h4 className="font-semibold text-sage-800 mb-2">
                      💡 Das solltest du mitbringen:
                    </h4>
                    <ul className="space-y-2 text-charcoal-600">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-warm-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Interesse an unserer Vereinsarbeit</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-warm-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Unterstützung unserer Ziele und Werte</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-warm-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Offenheit für gelegentliche Teilnahme</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-sage-50 rounded-lg p-4 border-l-4 border-sage-500">
                    <h4 className="font-semibold text-sage-800 mb-2">
                      ✨ Das erwartet dich:
                    </h4>
                    <ul className="space-y-2 text-charcoal-600">
                      <li className="flex items-start">
                        <Heart className="w-5 h-5 text-sage-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          Teilnahme an allen Veranstaltungen und Vorträgen
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Heart className="w-5 h-5 text-sage-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          Zugang zur Gemeinschaft ohne Verpflichtungen
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Heart className="w-5 h-5 text-sage-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Regelmäßige Informationen über Aktivitäten</span>
                      </li>
                      <li className="flex items-start">
                        <Heart className="w-5 h-5 text-sage-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          Flexible Teilnahme je nach persönlicher Zeit
                        </span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            className="mt-12 text-center bg-gradient-to-r from-sage-50 to-cream-50 rounded-xl p-8 border-2 border-sage-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-lg text-sage-800 mb-4">
              <strong>💫 Wichtig zu wissen:</strong>
            </p>
            <p className="text-charcoal-600 max-w-3xl mx-auto leading-relaxed">
              Beide Mitgliedschaftstypen sind herzlich willkommen! Sie können
              jederzeit von passiver zu aktiver Mitgliedschaft wechseln, wenn
              Sie mehr Engagement zeigen möchten. Unsere Gemeinschaft lebt von
              Vielfalt - ob Sie aktiv mitgestalten oder einfach Teil der
              Schwesternschaft sein möchten, jede Schwester bereichert uns auf
              ihre Weise.
            </p>
          </motion.div>
        </motion.div>

        {/* Membership Form - External Link */}
        <motion.div
          variants={itemVariants}
          id="mitglied-werden-form"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-2 border-sage-300 shadow-2xl bg-white hover:shadow-3xl transition-shadow duration-500 relative overflow-hidden">
            {/* Decorative corner elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-sage-200/30 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cream-200/30 to-transparent rounded-tr-full" />

            <CardHeader className="text-center pb-8 bg-gradient-to-br from-sage-50 via-cream-50 to-sage-50 relative">
              <motion.div
                className="flex justify-center mb-4"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-sage-500 via-sage-400 to-sage-500 text-white shadow-lg hover:shadow-xl transition-shadow">
                  <Sparkles className="w-10 h-10" />
                </div>
              </motion.div>
              <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-sage-700 via-sage-500 to-sage-600 bg-clip-text text-transparent">
                  🌟 Ihre Mitgliedschaftsanfrage
                </span>
              </CardTitle>
              <p className="text-lg text-charcoal-600 max-w-2xl mx-auto mb-6">
                Wir können es kaum erwarten, Sie in unserer Familie willkommen
                zu heißen! Teilen Sie uns etwas über sich mit – jede Geschichte
                ist einzigartig und wertvoll.
              </p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Button
                  asChild
                  className="bg-gradient-to-r from-coral-500 to-warm-500 hover:from-coral-600 hover:to-warm-600 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  <a
                    href="https://formular.vereinsplaner.com/b8fabab2-d21c-4ee4-bdbc-95aa517acbed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <Heart className="w-6 h-6 mr-3" />
                    Ja, ich möchte dabei sein! 🌟
                  </a>
                </Button>
              </motion.div>

              <div className="text-center mt-6 space-y-2">
                <div className="flex items-center justify-center gap-3 text-sm text-sage-600">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Mitgliedschaft</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-sm text-sage-600">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Antwort innerhalb von 2-3 Werktagen</span>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Social Media Section */}
        <motion.div variants={itemVariants} className="mt-20">
          <SocialMediaSection
            title="Bleib mit uns verbunden"
            subtitle="Folge uns für Updates und Einblicke in unsere Gemeinschaft"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
