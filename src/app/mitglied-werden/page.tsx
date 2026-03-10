"use client";

import { motion } from "framer-motion";
import { Heart, Info } from "lucide-react";

import { SocialMediaSection } from "@/components/SocialMediaSection";
import { Button } from "@/components/ui/button";
import {
  containerVariants,
  itemVariants,
  hoverButton,
} from "@/lib/animations";
import { PUBLIC_PAGE_WRAPPER_CLASS } from "@/lib/page-config";

export default function MitgliedWerdenPage() {
  return (
    <div className={PUBLIC_PAGE_WRAPPER_CLASS}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ── Hero ────────────────────────────────────────────── */}
        <motion.section
          variants={itemVariants}
          className="py-20 lg:py-28 bg-gradient-to-br from-sage-100 via-sand-50/80 to-cream-100 text-center"
        >
          <div className="container mx-auto px-6 max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal-800 leading-tight text-balance">
              Assalamu alaykum liebe{" "}
              <span className="text-sage-600">Schwester!</span>
            </h1>
            <p className="mt-5 text-xl md:text-2xl text-charcoal-600 font-medium">
              Werde Teil unserer Schwesternschaft.
            </p>
          </div>
        </motion.section>

        {/* ── Content ─────────────────────────────────────────── */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-2xl space-y-6">

            {/* Membership explanation */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="rounded-2xl bg-white border border-sand-200 shadow-card-standard p-8 md:p-10"
            >
              <p className="text-center text-charcoal-700 leading-relaxed text-base md:text-lg max-w-none">
                Wähle die Mitgliedschaft, die zu deiner aktuellen
                Lebenssituation passt. Ob Schülerin, Studentin, Angestellte,
                Mutter oder Selbständige. Hier hast du die Möglichkeit dich an
                unserer islamischen Arbeit zu beteiligen. Genug Zeit und
                Engagement? Dann werde aktives Mitglied! Keine Zeit aber genug
                finanzielle Mittel? Dann werde passives Mitglied!
              </p>
            </motion.div>

            {/* Wichtig zu wissen */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="rounded-2xl bg-sage-50 border border-sage-200 p-8 md:p-10"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Info className="h-4 w-4 text-sage-600 shrink-0" />
                <h2 className="font-serif text-lg font-semibold text-sage-800">
                  Wichtig zu wissen:
                </h2>
              </div>
              <p className="text-center text-charcoal-700 leading-relaxed text-base max-w-none">
                Beide Mitgliedschaftstypen sind herzlich willkommen! Du kannst
                jederzeit von passiver zu aktiver Mitgliedschaft wechseln, wenn
                du mehr Engagement zeigen möchtest. Unsere Gemeinschaft lebt
                von Vielfalt — ob du aktiv mitgestaltest oder einfach Teil der
                Schwesternschaft sein möchtest, jede Schwester bereichert uns
                auf ihre Weise.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────── */}
        <section className="py-4 pb-20">
          <div className="container mx-auto px-6 max-w-2xl">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="rounded-2xl bg-gradient-to-br from-sage-600 to-sage-700 p-10 md:p-14 text-center shadow-sage-lg"
            >
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-8">
                Deine Mitgliedschaftsanfrage
              </h2>

              <motion.div {...hoverButton} className="inline-block">
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-2 border-white/80 bg-white/10 text-white hover:bg-white hover:text-sage-700 backdrop-blur-sm transition-all duration-300 gap-2"
                >
                  <a
                    href="https://formular.vereinsplaner.com/b8fabab2-d21c-4ee4-bdbc-95aa517acbed"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Heart className="h-4 w-4" />
                    Jetzt Mitglied werden
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── Social Media ─────────────────────────────────────── */}
        <section className="pb-20">
          <div className="container mx-auto px-6 max-w-2xl">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              <SocialMediaSection variant="minimal" showTitle={true} />
            </motion.div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
