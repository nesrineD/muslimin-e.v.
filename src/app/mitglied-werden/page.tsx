"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SocialMediaSection } from "@/components/SocialMediaSection";
import { containerVariants, itemVariants } from "@/lib/animations";
import { PUBLIC_PAGE_WRAPPER_CLASS } from "@/lib/page-config";

export default function MitgliedWerdenPage() {
  return (
    <div className={PUBLIC_PAGE_WRAPPER_CLASS}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-12"
      >
        {/* Hero Section with Warm Invitation */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-charcoal-800">
            Assalamu alaykum liebe Schwester!
          </h1>

          <div className="max-w-4xl mx-auto space-y-6">
            <motion.p
              className="text-2xl md:text-3xl text-sage-700 font-semibold leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              💝 Werde Teil unserer Schwesternschaft.
            </motion.p>

            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border-2 border-sage-300 shadow-xl hover:shadow-2xl transition-all duration-500 hover:border-sage-400"
              whileHover={{ y: -5 }}
            >
              <p className="text-xl text-sage-800 leading-relaxed">
                Wähle die Mitgliedschaft, die zu deiner aktuellen
                Lebenssituation passt. Ob Schülerin, Studentin, Angestellte,
                Mutter oder Selbständige. Hier hast du die Möglichkeit dich an
                unserer islamischen Arbeit zu beteiligen. Genug Zeit und
                Engagement? Dann werde aktives Mitglied! Keine Zeit aber genug
                finanzielle Mittel? Dann werde passives Mitglied!
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-r from-sage-50 to-cream-50 rounded-xl p-6 border-2 border-sage-200 text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <p className="text-lg text-sage-800 mb-3 text-center">
                <strong>💫 Wichtig zu wissen:</strong>
              </p>
              <p className="text-charcoal-600 leading-relaxed text-center">
                Beide Mitgliedschaftstypen sind herzlich willkommen! Du kannst
                jederzeit von passiver zu aktiver Mitgliedschaft wechseln, wenn
                du mehr Engagement zeigen möchtest. Unsere Gemeinschaft lebt von
                Vielfalt — ob du aktiv mitgestaltest oder einfach Teil der
                Schwesternschaft sein möchtest, jede Schwester bereichert uns
                auf ihre Weise.
              </p>
            </motion.div>
          </div>
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
                  Deine Mitgliedschaftsanfrage
                </span>
              </CardTitle>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Button size="lg" variant="primary" asChild>
                  <a
                    href="https://formular.vereinsplaner.com/b8fabab2-d21c-4ee4-bdbc-95aa517acbed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3"
                  >
                    <Heart className="w-6 h-6" />
                    Jetzt Mitglied werden
                  </a>
                </Button>
              </motion.div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Social Media Section */}
        <motion.div variants={itemVariants} className="mt-20 px-4">
          <div className="py-12 px-6 sm:px-8 bg-gradient-to-br from-sage-50 via-cream-50 to-sage-100/80 rounded-2xl shadow-lg border-2 border-sage-200 max-w-6xl mx-auto">
            <SocialMediaSection
              variant="compact"
              showTitle={true}
              title="Bleib mit uns verbunden 📱"
              subtitle="Folge uns für Updates und Einblicke in unsere Gemeinschaft"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
