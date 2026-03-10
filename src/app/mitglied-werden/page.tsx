"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import Link from "next/link";

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
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-sage-600 via-sage-500 to-sage-400 py-20 md:py-28">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-sage-400/30 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-sage-300/20 blur-3xl" />
          </div>

          <div className="container relative mx-auto px-6 text-center max-w-4xl">
            <motion.h1
              variants={itemVariants}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance"
            >
              Assalamu alaykum liebe Schwester!
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-xl md:text-2xl text-sage-50 font-medium"
            >
              Werde Teil unserer Schwesternschaft.
            </motion.p>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="bg-gradient-to-b from-sand-50 to-cream-50 py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-3xl space-y-8">
            {/* Membership Explanation Card */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="relative rounded-2xl bg-white p-8 md:p-10 shadow-lg border border-sand-100">
                {/* Decorative top accent */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="h-1 w-24 rounded-full bg-gradient-to-r from-sage-400 via-sage-500 to-sage-400" />
                </div>

                <p className="text-center text-charcoal-600 leading-relaxed text-lg">
                  Wähle die Mitgliedschaft, die zu deiner aktuellen Lebenssituation passt. 
                  Ob Schülerin, Studentin, Angestellte, Mutter oder Selbständige. Hier hast 
                  du die Möglichkeit dich an unserer islamischen Arbeit zu beteiligen. Genug 
                  Zeit und Engagement? Dann werde aktives Mitglied! Keine Zeit aber genug 
                  finanzielle Mittel? Dann werde passives Mitglied!
                </p>
              </div>
            </motion.div>

            {/* Important Info Card */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="relative rounded-2xl bg-gradient-to-br from-sage-100 via-sage-50 to-sage-100 p-8 md:p-10 shadow-md border border-sage-200/50">
                {/* Decorative corner accents */}
                <div className="absolute top-4 left-4 h-8 w-8 border-t-2 border-l-2 border-sage-300/50 rounded-tl-lg" />
                <div className="absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-sage-300/50 rounded-br-lg" />

                <h3 className="mb-4 text-center font-serif text-xl font-semibold text-sage-800">
                  Wichtig zu wissen:
                </h3>

                <p className="text-center text-charcoal-600 leading-relaxed">
                  Beide Mitgliedschaftstypen sind herzlich willkommen! Du kannst jederzeit 
                  von passiver zu aktiver Mitgliedschaft wechseln, wenn du mehr Engagement 
                  zeigen möchtest. Unsere Gemeinschaft lebt von Vielfalt — ob du aktiv 
                  mitgestaltest oder einfach Teil der Schwesternschaft sein möchtest, jede 
                  Schwester bereichert uns auf ihre Weise.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sage-100 via-sand-50 to-cream-100 p-10 md:p-14 shadow-xl border border-sage-200/30">
                {/* Decorative background pattern */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-sage-200/30 blur-3xl" />
                  <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-clay-100/20 blur-2xl" />
                </div>

                <div className="relative flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md border border-sage-100">
                    <Sparkles className="h-8 w-8 text-sage-600" />
                  </div>

                  <h2 className="font-serif text-2xl font-bold text-charcoal-800 md:text-3xl">
                    Deine Mitgliedschaftsanfrage
                  </h2>

                  <motion.div className="mt-8" {...hoverButton}>
                    <Button
                      variant="primary"
                      size="lg"
                      asChild
                      className="group gap-2 px-8 py-4 text-base shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <a
                        href="https://formular.vereinsplaner.com/b8fabab2-d21c-4ee4-bdbc-95aa517acbed"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Heart className="h-5 w-5 transition-transform group-hover:scale-110" />
                        Jetzt Mitglied werden
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="bg-gradient-to-t from-sand-100/50 to-transparent py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-3xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={itemVariants}
            >
              <div className="rounded-2xl bg-white p-8 md:p-10 shadow-lg border border-sand-100">
                <SocialMediaSection />
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
