"use client";

import { motion } from "framer-motion";
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
import { containerVariants, itemVariants, hoverButton } from "@/lib/animations";
import { PageHeading } from "@/components/ui/page-heading";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionDivider } from "@/components/ui/section-divider";
import { SplitSection } from "@/components/ui/split-section";
import { DecorativeAccents } from "@/components/ui/decorative-accents";
import { AnimatedWrapper } from "@/components/ui/animated-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionBand } from "@/components/ui/section-band";
import {
  PUBLIC_PAGE_WRAPPER_CLASS,
  SECTION_HERO_SPACING,
  SECTION_CONTENT_SPACING,
  SECTION_CTA_SPACING,
  CLOSING_SECTION_SURFACE_CLASS,
} from "@/lib/page-config";

export function PublicLandingContent() {
  return (
    <motion.main
      className={PUBLIC_PAGE_WRAPPER_CLASS}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className={`relative ${SECTION_HERO_SPACING} overflow-hidden`}>
          <DecorativeAccents preset="hero" />
          <motion.div
            variants={itemVariants}
            className="max-w-5xl mx-auto text-center relative z-10"
          >
            <PageHeading
              title="Deine Schwesternschaft · Im Glauben verbunden"
              accentWord="Im Glauben verbunden"
              className="mb-6"
            />

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
              <div className="relative aspect-[16/7] rounded-2xl overflow-hidden border border-sand-300/60 shadow-[0_4px_20px_-6px_rgba(156,96,77,0.12)]">
                <Image
                  src="/images/veranstaltungen/gemeinschaft-saal-1.jpg"
                  alt="Gemeinschaftsveranstaltung – Muslimin e.V. in Berlin"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        <SectionDivider variant="wave" />

        {/* About Teaser */}
        <section className={SECTION_CONTENT_SPACING}>
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <SplitSection
              imageSrc="/images/veranstaltungen/gemeinschaft-gebet.jpg"
              imageAlt="Muslimin e.V. Gemeinschaft – Berlin"
            >
              <SectionHeading
                title="Ein Verein, der Frauen stärkt und Gemeinschaft trägt"
                accentWord="Frauen stärkt"
                centered={false}
                className="mb-4"
              />
              <p className="text-lg text-charcoal-700 leading-relaxed">
                Muslimin e.V. schafft einen geschützten Raum, in dem Frauen ihre
                spirituelle, intellektuelle und soziale Entwicklung fördern
                können — durch religiöse Bildung, Vernetzung und aktive
                Mitgestaltung der Gesellschaft.
              </p>
              <div className="space-y-5 mt-6">
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
            </SplitSection>
          </motion.div>
        </section>

        {/* Benefits Section */}
        <SectionBand variant="alternate">
          <section className={`${SECTION_CONTENT_SPACING}`}>
            <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <SectionHeading
                  title="Was erwartet dich als Mitglied?"
                  subtitle="Deine Mitgliedschaft öffnet Türen zu einer starken Gemeinschaft"
                />
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
                  <AnimatedWrapper
                    key={idx}
                    animation="fade-in-up"
                    delay={idx * 100}
                  >
                    <Card className="relative h-full overflow-hidden rounded-lg border-2 border-sand-300/90 bg-gradient-to-br from-cream-50 via-sand-50 to-sand-100/70 shadow-[0_8px_24px_-18px_rgba(50,46,42,0.5)] transition-all duration-300 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-sage-600/45 hover:-translate-y-1 hover:border-sage-300 hover:shadow-[0_16px_34px_-22px_rgba(50,46,42,0.55)]">
                      <CardContent className="space-y-5 p-7">
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-sage-700 text-white shadow-sm ring-1 ring-sage-800/20">
                          {benefit.icon}
                        </div>
                        <h3 className="text-xl font-bold text-charcoal-800">
                          {benefit.title}
                        </h3>
                        <p className="leading-relaxed text-charcoal-700">
                          {benefit.description}
                        </p>
                      </CardContent>
                    </Card>
                  </AnimatedWrapper>
                ))}
              </div>
            </motion.div>
          </section>
        </SectionBand>

        {/* Proof Section — real image + trust metrics */}
        <section className={SECTION_CONTENT_SPACING}>
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="rounded-2xl border border-sand-300/60 bg-white overflow-hidden shadow-[0_4px_20px_-6px_rgba(156,96,77,0.12)]">
              <div className="grid md:grid-cols-2">
                <div className="relative aspect-[4/3] md:aspect-auto">
                  <Image
                    src="/images/veranstaltungen/veranstaltung-januar-2026-2.jpg"
                    alt="Veranstaltung und Begegnung – Muslimin e.V."
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

        {/* Final CTA Section */}
        <SectionDivider variant="accent-line" className="mb-0" />
        <section className={SECTION_CTA_SPACING}>
          <motion.div
            variants={itemVariants}
            className={`max-w-4xl mx-auto px-8 py-12 md:px-12 md:py-16 text-center relative overflow-hidden ${CLOSING_SECTION_SURFACE_CLASS}`}
          >
            <DecorativeAccents preset="closing" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                Werde Teil unserer Gemeinschaft
              </h2>
              <p className="text-lg mb-8 text-cream-200 max-w-2xl mx-auto leading-relaxed">
                Schwesternschaft, die trägt. Glaube, der verbindet. Ein Raum für
                dich und deine Entwicklung.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.div {...hoverButton}>
                  <Button
                    size="lg"
                    asChild
                    className="bg-clay-500 hover:bg-clay-600 text-white"
                  >
                    <Link href="/mitglied-werden" className="gap-3">
                      <Heart className="w-6 h-6" />
                      Jetzt Mitglied werden
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div {...hoverButton}>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="border-cream-200 text-cream-100 hover:bg-sage-600"
                  >
                    <Link href="/spenden" className="gap-3">
                      <HeartHandshake className="w-6 h-6" />
                      Uns unterstützen
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
