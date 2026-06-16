"use client";

import { motion } from "framer-motion";
import { BookOpen, Heart, ShieldCheck, MessageCircle } from "lucide-react";
import { WerSindWirSection } from "@/components/uber-uns/WerSindWirSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { containerVariants, itemVariants } from "@/lib/animations";
import { PageHeading } from "@/components/ui/page-heading";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionDivider } from "@/components/ui/section-divider";
import { SplitSection } from "@/components/ui/split-section";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { DecorativeAccents } from "@/components/ui/decorative-accents";
import { SectionBand } from "@/components/ui/section-band";
import {
  PUBLIC_PAGE_WRAPPER_CLASS,
  SECTION_HERO_SPACING,
  SECTION_CONTENT_SPACING,
  SECTION_CTA_SPACING,
  CLOSING_SECTION_SURFACE_CLASS,
} from "@/lib/page-config";

export default function AboutPage() {
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
          {/* Subtle geometric pattern for depth */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_#5b6960_1px,_transparent_1px)] bg-[length:32px_32px]" />
          </div>
          <DecorativeAccents preset="hero" />
          <motion.div
            variants={itemVariants}
            className="max-w-5xl mx-auto text-center relative z-10"
          >
            <PageHeading
              title="Über Muslimin e.V."
              accentWord="Muslimin e.V."
              className="mb-6"
            />
            <p className="text-xl md:text-2xl text-charcoal-700 max-w-3xl mx-auto leading-relaxed">
              Gemeinschaft, Bildung und verlässliche Unterstützung für
              muslimische Frauen in Berlin seit 2011.
            </p>
          </motion.div>
        </section>

        {/* Wer sind wir? Section */}
        <SectionBand variant="alternate">
          <motion.section
            variants={itemVariants}
            className={SECTION_CONTENT_SPACING}
          >
            <WerSindWirSection />
          </motion.section>
        </SectionBand>

        <SectionDivider variant="accent-line" />

        {/* Vereinsphilosophie Section — SplitSection */}
        <motion.section
          variants={itemVariants}
          className={SECTION_CONTENT_SPACING}
        >
          <div className="max-w-5xl mx-auto">
            <SectionHeading title="Unsere Philosophie" className="mb-10" />
            <SplitSection
              imageSrc="/images/philosophie.jpg"
              imageAlt="Muslimin e.V. – Frauen auf dem Weg zur Moschee"
              aspectRatio="1:1"
              imagePosition="top"
            >
              <blockquote className="italic text-xl leading-relaxed text-sage-700 md:text-2xl mb-6 border-l-4 border-clay-300 pl-5">
                &ldquo;Inspiriert von den großen Vorbildern Sayeda Fatima (a)
                und Sayeda Zainab (a), möchten wir einen Raum schaffen, in dem
                Frauen ihre spirituelle, intellektuelle und soziale Entwicklung
                fördern können.&rdquo;
              </blockquote>
              <div className="space-y-4 text-lg text-charcoal-700 leading-8">
                <p>
                  Was 2011 als Initiative begann, wurde 2018 offiziell als
                  eingetragener Verein gegründet — mit dem Ziel, muslimische
                  Frauen in Berlin und bundesweit zu vernetzen und ihnen eine
                  Stimme zu verleihen.
                </p>
                <p>
                  Wir motivieren Frauen, sich aktiv in die Gemeindearbeit
                  einzubringen, ihre Talente zu fördern und die Gesellschaft
                  mitzugestalten.
                </p>
              </div>
            </SplitSection>
          </div>
        </motion.section>

        <SectionDivider variant="accent-line" />

        {/* Kernziele Section - wrapped in white band for contrast */}
        <SectionBand variant="white" className="py-12 md:py-16">
          <motion.section variants={itemVariants}>
            <div className="relative mx-auto max-w-5xl px-4">
              <div className="mx-auto mb-12 max-w-3xl text-center">
                <SectionHeading
                  title="Unsere Kernziele"
                  subtitle="Die Säulen unserer Gemeinschaft."
                />
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <Card
                  hover="lift"
                  className="text-left p-8 rounded-xl border border-sage-200 bg-gradient-to-br from-sage-50 to-cream-50 shadow-sm"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-sage-100 ring-1 ring-sage-200">
                    <BookOpen className="h-6 w-6 text-sage-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal-800 mb-2">
                    Religiöse Bildung
                  </h3>
                  <p className="text-sm leading-relaxed text-charcoal-600">
                    Wissen vertiefen und spirituelle Entwicklung fördern.
                  </p>
                </Card>
                <Card
                  hover="lift"
                  className="text-left p-8 rounded-xl border border-clay-200 bg-gradient-to-br from-clay-50 to-cream-50 shadow-sm"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-clay-100 ring-1 ring-clay-200">
                    <Heart className="h-6 w-6 text-clay-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal-800 mb-2">
                    Muslimische Identität
                  </h3>
                  <p className="text-sm leading-relaxed text-charcoal-600">
                    Selbstbewusstsein stärken und Orientierung geben.
                  </p>
                </Card>
                <Card
                  hover="lift"
                  className="text-left p-8 rounded-xl border border-warm-200 bg-gradient-to-br from-warm-50 to-cream-50 shadow-sm"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-warm-100 ring-1 ring-warm-200">
                    <MessageCircle className="h-6 w-6 text-warm-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal-800 mb-2">
                    Austausch & Dialog
                  </h3>
                  <p className="text-sm leading-relaxed text-charcoal-600">
                    Gemeinschaft leben und gesellschaftliche Themen öffnen.
                  </p>
                </Card>
                <Card
                  hover="lift"
                  className="text-left p-8 rounded-xl border border-sand-300 bg-gradient-to-br from-sand-50 to-cream-50 shadow-sm"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-sand-100 ring-1 ring-sand-200">
                    <ShieldCheck className="h-6 w-6 text-charcoal-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal-800 mb-2">
                    Geschützter Raum
                  </h3>
                  <p className="text-sm leading-relaxed text-charcoal-600">
                    Einen vertrauensvollen Rahmen für Frauen schaffen.
                  </p>
                </Card>
              </div>
            </div>
          </motion.section>
        </SectionBand>

        {/* Statistiken Section — Warm sand-100 surface: light, distinct, on-palette */}
        <section className="py-16 md:py-20 bg-sand-100 relative overflow-hidden">
          {/* Soft sage tint — top right corner */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-sage-200/30 blur-[72px] pointer-events-none" aria-hidden="true" />
          {/* Soft clay tint — bottom left corner */}
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-clay-200/20 blur-[64px] pointer-events-none" aria-hidden="true" />

          <motion.section variants={itemVariants}>
            <div className="relative mx-auto max-w-5xl px-4">

              {/* Heading */}
              <div className="mx-auto mb-12 max-w-2xl text-center">
                <span className="inline-block mb-3 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-sage-500">
                  Zahlen &amp; Fakten
                </span>
                <h2 className="font-heading text-3xl font-bold text-charcoal-800 md:text-4xl mb-3">
                  Unsere Entwicklung
                </h2>
                <p className="text-charcoal-600 text-base leading-relaxed">
                  Ein Verein mit gewachsener Reichweite und beständiger Arbeit
                </p>
                <div className="mx-auto mt-5 h-px w-12 bg-gradient-to-r from-transparent via-sage-400/50 to-transparent" />
              </div>

              {/* Stat cards */}
              <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4">
                {[
                  { target: 14, suffix: "+", label: "Jahre",          sub: "Initiative seit 2011, e.V. seit 2018" },
                  { target: 60, suffix: "+", label: "Mitglieder",     sub: "Aktive Frauen"                          },
                  { target: 100, suffix: "+", label: "Veranstaltungen", sub: "Seit Gründung"                        },
                  { target: 500, suffix: "",  label: "Gäste",          sub: "Bei unserer größten Veranstaltung"     },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="group flex flex-col items-center justify-center rounded-2xl border border-sand-300 bg-white px-2 py-8 text-center shadow-sage-md transition-all duration-300 hover:-translate-y-1 hover:border-sage-300 hover:shadow-lift sm:px-4"
                  >
                    <span className="text-4xl font-bold tracking-tight text-sage-700 lg:text-5xl">
                      <AnimatedCounter target={stat.target} />
                      {stat.suffix && (
                        <span className="ml-0.5 text-clay-500">
                          {stat.suffix}
                        </span>
                      )}
                    </span>
                    <div className="mt-3 h-0.5 w-8 rounded-full bg-clay-500/60 transition-all duration-300 group-hover:w-10 group-hover:bg-clay-500" />
                    {/* Label — sage-600 for brand accent */}
                    <p className="mt-2.5 text-xs font-semibold uppercase tracking-[0.06em] text-sage-600 sm:tracking-[0.18em]">
                      {stat.label}
                    </p>
                    {/* Sub — charcoal-500 for secondary readability */}
                    {stat.sub && (
                      <p className="mt-1.5 text-[0.7rem] leading-relaxed text-charcoal-500">
                        {stat.sub}
                      </p>
                    )}
                  </div>
                ))}
              </div>

            </div>
          </motion.section>
        </section>

        {/* CTA Section */}
        <motion.section
          variants={itemVariants}
          className={`${SECTION_CTA_SPACING} relative overflow-hidden`}
        >
          <div
            className={`relative mx-auto max-w-5xl px-8 py-10 ${CLOSING_SECTION_SURFACE_CLASS}`}
          >
            <DecorativeAccents preset="closing" />
            <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
              <div className="max-w-2xl">
                <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
                  Teil unserer Gemeinschaft werden
                </h2>
                <p className="mt-3 text-cream-200 leading-relaxed">
                  Wenn du unsere Arbeit begleiten oder Mitglied werden möchtest,
                  findest du hier den nächsten Schritt. Oder entdecke unsere
                  Veranstaltungen.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Button
                  size="lg"
                  asChild
                  className="bg-clay-500 hover:bg-clay-600 text-white"
                >
                  <Link href="/mitglied-werden" data-cta="primary">
                    Mitglied werden
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-cream-200 text-cream-100 hover:bg-sage-600"
                >
                  <Link href="/veranstaltungen">Veranstaltungen</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.main>
  );
}
