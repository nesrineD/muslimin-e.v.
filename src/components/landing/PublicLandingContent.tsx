"use client";

import { motion, useScroll, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Heart,
  Users,
  Shield,
  Sparkles,
  CheckCircle,
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
import {
  PUBLIC_PAGE_WRAPPER_CLASS,
  SECTION_HERO_SPACING,
  SECTION_CONTENT_SPACING,
  SECTION_CTA_SPACING,
} from "@/lib/page-config";

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
      <div className="container mx-auto px-4 pb-24 sm:pb-0">
        {/* Sticky CTA Bar — smart scroll-direction visibility:
            Appears when scrolling down past 300px, hides when scrolling back up.
            Bottom padding (pb-24) on mobile prevents content from being obscured. */}
        <AnimatePresence>
          {showStickyBar && (
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-charcoal-800/95 shadow-2xl border-t border-sand-200/15 backdrop-blur-sm"
            >
              <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <span className="text-cream-50 font-semibold text-sm md:text-base text-center sm:text-left">
                  Werde Teil unserer Gemeinschaft
                </span>
                <Button size="sm" variant="primary" asChild>
                  <Link href="/mitglied-werden" className="gap-2">
                    <Heart className="w-4 h-4" />
                    Mitglied werden
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <section className={`relative ${SECTION_HERO_SPACING} overflow-hidden`}>
          <motion.div
            variants={itemVariants}
            className="max-w-5xl mx-auto text-center relative z-10"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-charcoal-800 leading-tight">
              Deine Schwesternschaft.
              <br />
              <span className="text-sage-700">Dein geschützter Raum.</span>
            </h1>

            <p className="text-xl md:text-2xl text-charcoal-700 mb-6 max-w-3xl mx-auto leading-relaxed">
              Muslimin e.V. verbindet muslimische Frauen in Berlin durch
              Gemeinschaft, religiöse Bildung und Angebote, die im Alltag
              tragen.
            </p>

            <p className="text-lg text-charcoal-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Seit 2011 ehrenamtlich, verlässlich und mit klarem Blick auf die
              Bedürfnisse von Frauen und Familien.
            </p>

            <div className="flex flex-col items-center gap-5">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto">
                <motion.div {...hoverButton}>
                  <Button size="lg" variant="primary" asChild>
                    <Link href="/mitglied-werden" className="gap-3">
                      <Heart className="w-6 h-6" />
                      Mitglied werden
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </motion.div>

                <motion.div {...hoverButton}>
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/spenden" className="gap-3">
                      <HeartHandshake className="w-6 h-6" />
                      Jetzt unterstützen
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-14 max-w-4xl mx-auto"
            >
              <div className="relative aspect-[16/7] rounded-2xl overflow-hidden border border-sand-200 shadow-sm">
                <Image
                  src="/images/veranstaltungen/frauenkreis-juni-2025.jpeg"
                  alt="Frauenkreis – Muslimin e.V. Gemeinschaft in Berlin"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* About Teaser */}
        <section className={SECTION_CONTENT_SPACING}>
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="rounded-2xl border border-sand-200/70 bg-white/80 px-6 py-10 md:px-10 md:py-12">
              <div className="grid md:grid-cols-2 gap-10 items-start">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-charcoal-800 leading-tight">
                    Ein Verein, der Frauen stärkt und Gemeinschaft trägt
                  </h2>
                  <p className="text-lg text-charcoal-700 leading-relaxed">
                    Muslimin e.V. schafft einen geschützten Raum, in dem Frauen
                    ihre spirituelle, intellektuelle und soziale Entwicklung
                    fördern können — durch religiöse Bildung, Vernetzung und
                    aktive Mitgestaltung der Gesellschaft.
                  </p>
                </div>
                <div className="space-y-5 pt-2">
                  {[
                    {
                      icon: <BookOpen className="w-5 h-5" />,
                      text: "Religiöse Bildung mit Praxisbezug",
                    },
                    {
                      icon: <Shield className="w-5 h-5" />,
                      text: "Geschützter Raum für Frauen und Mädchen",
                    },
                    {
                      icon: <Users className="w-5 h-5" />,
                      text: "Gemeinschaft über Generationen hinweg",
                    },
                  ].map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sage-700 flex items-center justify-center text-white">
                        {point.icon}
                      </div>
                      <p className="text-charcoal-700 text-lg leading-relaxed pt-1.5">
                        {point.text}
                      </p>
                    </div>
                  ))}
                  <div className="pt-4">
                    <Button variant="secondary" asChild>
                      <Link href="/uber-uns" className="gap-2">
                        Mehr über unsere Arbeit
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Benefits Section */}
        <section className={`${SECTION_CONTENT_SPACING} bg-white`}>
          <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
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
                  icon: <Users className="w-8 h-8" />,
                  title: "Starke Gemeinschaft",
                  description:
                    "Vernetzung mit Schwestern, die dich verstehen und unterstützen",
                },
                {
                  icon: <BookOpen className="w-8 h-8" />,
                  title: "Bildungsangebote",
                  description:
                    "Workshops, Vorträge und Seminare zu spirituellen & gesellschaftlichen Themen",
                },
                {
                  icon: <Sparkles className="w-8 h-8" />,
                  title: "Events & Aktivitäten",
                  description:
                    "Regelmäßige Veranstaltungen – von Vorträgen bis zu Wohltätigkeitsaktionen",
                },
              ].map((benefit, idx) => (
                <motion.div key={idx} variants={itemVariants} {...hoverLift}>
                  <Card className="h-full rounded-xl border border-sand-200 bg-cream-50/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <CardContent className="space-y-4">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-sage-700 text-white">
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
          </motion.div>
        </section>

        {/* Proof Section — real image + trust metrics */}
        <section className={SECTION_CONTENT_SPACING}>
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="rounded-2xl border border-sand-200 bg-white overflow-hidden shadow-sm">
              <div className="grid md:grid-cols-2">
                <div className="relative aspect-[4/3] md:aspect-auto">
                  <Image
                    src="/images/veranstaltungen/herbstkonferenz-september-2025.jpeg"
                    alt="Herbstkonferenz September 2025 – Muslimin e.V."
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-charcoal-800 mb-4 leading-tight">
                    Veranstaltungen, die bewegen
                  </h2>
                  <p className="text-charcoal-700 leading-relaxed mb-8">
                    Von Vorträgen und Workshops bis zu unserer jährlichen
                    Herbstkonferenz — unsere Angebote schaffen Raum für echte
                    Begegnung, gemeinsames Lernen und neue Verbindungen.
                  </p>
                  <div className="space-y-3">
                    {[
                      "100+ Veranstaltungen seit Gründung",
                      "Bis zu 500 Gäste pro Event",
                      "60+ aktive Mitglieder",
                    ].map((metric, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-sage-700 flex-shrink-0" />
                        <span className="text-charcoal-700">{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Social Media Section */}
        <section className={`${SECTION_CONTENT_SPACING} px-4`}>
          <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
            <div className="py-12 px-6 sm:px-8 bg-white rounded-2xl shadow-sm border border-sand-200">
              <SocialMediaSection
                variant="compact"
                showTitle={true}
                title="Folge uns auf Social Media"
                subtitle="Aktuelle Hinweise, Flyer und Einblicke in unsere Veranstaltungen"
              />
            </div>
          </motion.div>
        </section>

        {/* Final CTA Section */}
        <section className={SECTION_CTA_SPACING}>
          <motion.div
            variants={itemVariants}
            className="max-w-4xl mx-auto rounded-2xl bg-charcoal-800 px-8 py-12 md:px-12 md:py-16 text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-cream-50">
                Bereit für den nächsten Schritt?
              </h2>
              <p className="text-lg mb-8 text-sand-200 max-w-2xl mx-auto leading-relaxed">
                Wenn du eine Gemeinschaft suchst, die Bildung, Zugehörigkeit und
                Unterstützung verbindet, freuen wir uns auf dich.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.div {...hoverButton}>
                  <Button size="lg" variant="primary" asChild>
                    <Link href="/mitglied-werden" className="gap-3">
                      <Heart className="w-6 h-6" />
                      Mitglied werden
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div {...hoverButton}>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="border-sand-200 text-cream-50 hover:bg-sand-200/10"
                  >
                    <Link href="/spenden" className="gap-3">
                      <HeartHandshake className="w-6 h-6" />
                      Arbeit unterstützen
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </motion.main>
  );
}
