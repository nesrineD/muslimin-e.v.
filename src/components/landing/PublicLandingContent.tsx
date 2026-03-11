"use client";

import { motion, useScroll, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Heart,
  Users,
  Shield,
  Sparkles,
  HeartHandshake,
} from "lucide-react";
import {
  containerVariants,
  itemVariants,
  hoverButton,
  hoverLift,
} from "@/lib/animations";
import { SocialMediaSection } from "@/components/SocialMediaSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { debounce } from "@/lib/utils";
import { PUBLIC_PAGE_WRAPPER_CLASS } from "@/lib/page-config";

export function PublicLandingContent() {
  const { scrollY } = useScroll();
  const [showStickyBar, setShowStickyBar] = useState(false);
  const prevScrollY = useRef(0);

  const handleScroll = useCallback((latest: number) => {
    const scrollingDown = latest > prevScrollY.current;
    const pastThreshold = latest > 300;
    prevScrollY.current = latest;

    setShowStickyBar((prev) => {
      const next = pastThreshold && scrollingDown;
      return prev === next ? prev : next;
    });
  }, []);

  const debouncedHandleScroll = useMemo(
    () => debounce(handleScroll, 100),
    [handleScroll],
  );

  useEffect(() => {
    const unsubscribe = scrollY.on("change", debouncedHandleScroll);
    return () => {
      debouncedHandleScroll.cancel();
      unsubscribe();
    };
  }, [scrollY, debouncedHandleScroll]);

  return (
    <motion.main
      className={PUBLIC_PAGE_WRAPPER_CLASS}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="pb-24 sm:pb-0">
        {/* Sticky CTA Bar — appears when scrolling down past 300 px */}
        <AnimatePresence>
          {showStickyBar && (
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-clay-700 shadow-2xl border-t border-white/15"
            >
              <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <span className="text-white font-medium text-sm md:text-base text-center sm:text-left">
                  Werde Teil unserer Gemeinschaft!
                </span>
                <div className="flex items-center justify-center sm:justify-end gap-2">
                  <Button size="sm" variant="primary" asChild>
                    <Link href="/mitglied-werden" className="gap-2">
                      <Heart className="w-4 h-4" />
                      Mitglied werden
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Hero Section ─────────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-white px-4">
          <motion.div
            variants={itemVariants}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-sage-100 text-charcoal-800 rounded-full text-sm font-medium mb-6 border border-sage-200"
            >
              <Shield className="w-4 h-4 text-sage-700" aria-hidden="true" />
              Ehrenamtlich · DSGVO-konform · Seit 2011
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-charcoal-800 leading-tight">
              Deine Schwesternschaft.
              <br />
              <em className="not-italic text-sage-700">Deine Stärke im Glauben.</em>
            </h1>

            {/* Concrete value proposition — answers "what, where, since when?" */}
            <p className="text-xl md:text-2xl text-charcoal-700 mb-10 max-w-2xl mx-auto leading-relaxed">
              Islamische Vorträge, Beratung &amp; Gemeinschaft für muslimische
              Frauen in Berlin – seit 2011.
            </p>

            {/* Single primary CTA + one secondary text link */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div {...hoverButton}>
                <Button size="lg" variant="primary" asChild>
                  <Link href="/mitglied-werden" className="gap-3">
                    <Heart className="w-5 h-5" aria-hidden="true" />
                    Mitglied werden
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </Button>
              </motion.div>

              <Link
                href="/uber-uns"
                className="text-sage-700 font-medium hover:text-sage-800 transition-colors underline underline-offset-4 decoration-sage-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sage focus-visible:outline-offset-4 rounded"
              >
                Mehr erfahren
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ── Social Proof / Stats Strip ───────────────────────────── */}
        <section className="py-10 md:py-12 px-4">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl bg-gradient-to-br from-charcoal-600 via-charcoal-600 to-sage-700 px-6 py-8 shadow-sage"
          >
            <div
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
              aria-hidden="true"
            />
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
              {[
                { value: "Seit 2011", label: "aktiv in Berlin" },
                { value: "60+", label: "Mitglieder" },
                { value: "100+", label: "Veranstaltungen" },
                { value: "500", label: "Gäste beim größten Event" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center py-6 px-4 text-center"
                >
                  <span className="text-3xl md:text-4xl font-bold text-cream-50 tracking-tight">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-sm text-sand-300 leading-snug">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Wer sind wir? — condensed preview ───────────────────── */}
        <section className="py-16 md:py-20 bg-white px-4">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="section-label mb-3">Über uns</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 text-charcoal-800">
              Wer sind wir?
            </h2>
            <p className="text-lg text-charcoal-700 leading-relaxed mb-4">
              Muslimin e.V. ist ein ehrenamtlicher Mädchen- und Frauenverein im
              Herzen Berlins. Seit 2011 schaffen wir einen sicheren Raum für
              islamische Bildung, gegenseitige Unterstützung und Gemeinschaft –
              von Schwestern für Schwestern.
            </p>
            <p className="text-base text-charcoal-600 mb-8">
              Mitglieder verschiedenster Herkünfte und Generationen finden hier
              Austausch, Orientierung und ein offenes Herz.
            </p>
            <Button variant="secondary" asChild>
              <Link href="/uber-uns" className="gap-2">
                Mehr über uns erfahren
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>
        </section>

        {/* ── Benefits Section ─────────────────────────────────────── */}
        <section className="py-16 md:py-20 bg-sand-50 px-4">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-charcoal-800">
                Was erwartet dich als Mitglied?
              </h2>
              <p className="text-lg text-charcoal-700 max-w-2xl mx-auto">
                Deine Mitgliedschaft öffnet Türen zu einer starken Gemeinschaft
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Users className="w-8 h-8" aria-hidden="true" />,
                  title: "Starke Gemeinschaft",
                  description:
                    "Vernetzung mit Schwestern, die dich verstehen und unterstützen",
                  iconBg: "bg-sage-600",
                },
                {
                  icon: <BookOpen className="w-8 h-8" aria-hidden="true" />,
                  title: "Bildungsangebote",
                  description:
                    "Workshops, Vorträge und Seminare zu spirituellen und gesellschaftlichen Themen",
                  iconBg: "bg-sage-600",
                },
                {
                  icon: <Sparkles className="w-8 h-8" aria-hidden="true" />,
                  title: "Events & Aktivitäten",
                  description:
                    "Regelmäßige Veranstaltungen – von Vorträgen bis zu Wohltätigkeitsaktionen",
                  iconBg: "bg-clay-600",
                },
              ].map((benefit, idx) => (
                <motion.div key={idx} variants={itemVariants} {...hoverLift}>
                  <Card
                    variant="white"
                    hover="highlight"
                    className="h-full shadow-card-standard"
                  >
                    <CardContent className="space-y-4">
                      <div
                        className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${benefit.iconBg} text-white shadow-lg`}
                      >
                        {benefit.icon}
                      </div>
                      <h3 className="text-xl font-bold text-charcoal-800">
                        {benefit.title}
                      </h3>
                      <p className="text-charcoal-700 leading-relaxed">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center mt-10"
            >
              <motion.div {...hoverButton}>
                <Button size="lg" variant="primary" asChild>
                  <Link href="/mitglied-werden" className="gap-3">
                    Jetzt Mitglied werden
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Social Media Section ─────────────────────────────────── */}
        <section className="py-16 bg-white px-4">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="py-12 px-6 sm:px-8 bg-sand-50 rounded-2xl border border-sage-200">
              <SocialMediaSection
                variant="compact"
                showTitle={true}
                title="Folge uns auf Social Media"
                subtitle="Bleib auf dem Laufenden mit aktuellen Flyern, Terminen und Live-Updates"
              />
            </div>
          </motion.div>
        </section>

        {/* ── Final CTA Section ────────────────────────────────────── */}
        <section className="py-20 bg-sand-50 px-4">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-12 shadow-md border border-sand-200"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-charcoal-800">
                Bereit für den nächsten Schritt?
              </h2>
              <p className="text-xl mb-8 text-charcoal-700 max-w-2xl mx-auto leading-relaxed">
                Werde Teil einer Gemeinschaft, die dich versteht, unterstützt
                und stärkt. Gemeinsam sind wir stärker.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <motion.div {...hoverButton}>
                  <Button size="lg" variant="primary" asChild>
                    <Link href="/mitglied-werden" className="gap-3">
                      <Heart className="w-6 h-6" aria-hidden="true" />
                      Mitglied werden
                      <ArrowRight className="w-5 h-5" aria-hidden="true" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div {...hoverButton}>
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/spenden" className="gap-3">
                      <HeartHandshake className="w-6 h-6" aria-hidden="true" />
                      Jetzt unterstützen
                    </Link>
                  </Button>
                </motion.div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-charcoal-600">
                <Link
                  href="/uber-uns"
                  className="underline underline-offset-4 hover:text-charcoal-800 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sage focus-visible:outline-offset-4 rounded"
                >
                  Mehr über uns
                </Link>
                <span aria-hidden="true">·</span>
                <Link
                  href="/impressum"
                  className="underline underline-offset-4 hover:text-charcoal-800 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sage focus-visible:outline-offset-4 rounded"
                >
                  Impressum
                </Link>
                <span aria-hidden="true">·</span>
                <Link
                  href="/datenschutz"
                  className="underline underline-offset-4 hover:text-charcoal-800 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sage focus-visible:outline-offset-4 rounded"
                >
                  Datenschutz
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </motion.main>
  );
}
