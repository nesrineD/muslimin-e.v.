"use client";

import { motion } from "framer-motion";
import { Users, Goal, Lightbulb, ShieldCheck } from "lucide-react";
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
              imageSrc="/images/veranstaltungen/gemeinschaft-performance.jpg"
              imageAlt="Muslimin e.V. – Gemeinschaft und Bildung"
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

        {/* Kernziele Section */}
        <motion.section
          variants={itemVariants}
          className={SECTION_CONTENT_SPACING}
        >
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-sand-200 bg-white px-6 py-8 shadow-sm md:px-10 md:py-10">
            <div className="relative">
              <div className="mx-auto mb-12 max-w-3xl text-center">
                <SectionHeading
                  title="Unsere Kernziele"
                  subtitle="Die Säulen unserer Gemeinschaft."
                />
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <Card
                  hover="lift"
                  className="text-left p-8 rounded-xl border border-sand-200 bg-cream-50/50 shadow-sm"
                >
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-sage-100/90 ring-1 ring-sage-200">
                    <Goal className="h-8 w-8 text-sage-600" />
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
                  className="text-left p-8 rounded-xl border border-sand-200 bg-cream-50/50 shadow-sm"
                >
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-sage-100/90 ring-1 ring-sage-200">
                    <Lightbulb className="h-8 w-8 text-sage-600" />
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
                  className="text-left p-8 rounded-xl border border-sand-200 bg-cream-50/50 shadow-sm"
                >
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-sage-100/90 ring-1 ring-sage-200">
                    <Users className="h-8 w-8 text-sage-600" />
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
                  className="text-left p-8 rounded-xl border border-sand-200 bg-cream-50/50 shadow-sm"
                >
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-sage-100/90 ring-1 ring-sage-200">
                    <ShieldCheck className="h-8 w-8 text-sage-600" />
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
          </div>
        </motion.section>

        <SectionDivider variant="accent-line" />

        {/* Statistiken Section — warm surface + AnimatedCounters */}
        <motion.section
          variants={itemVariants}
          className={SECTION_CONTENT_SPACING}
        >
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-sand-200 bg-cream-50/70 px-6 py-10 shadow-sm md:px-10">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-sage-600">
                Zahlen &amp; Fakten
              </p>
              <SectionHeading
                title="Zahlen und Entwicklung"
                subtitle="Ein Verein mit gewachsener Reichweite und beständiger Arbeit"
              />
            </div>
            <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                {
                  target: 14,
                  suffix: "+",
                  label: "Jahre",
                  sub: "Initiative seit 2011, e.V. seit 2018",
                },
                { target: 60, suffix: "+", label: "Mitglieder", sub: null },
                {
                  target: 100,
                  suffix: "+",
                  label: "Veranstaltungen",
                  sub: null,
                },
                {
                  target: 500,
                  suffix: "",
                  label: "Gäste",
                  sub: "bei unserer größten Veranstaltung",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center rounded-xl border border-sand-200 bg-white px-4 py-8 text-center shadow-sm"
                >
                  <span className="text-4xl font-bold tracking-tight text-sage-800 lg:text-5xl">
                    <AnimatedCounter
                      target={stat.target}
                      suffix={stat.suffix}
                    />
                  </span>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-charcoal-700">
                    {stat.label}
                  </p>
                  {stat.sub && (
                    <p className="mt-1 max-w-[13rem] text-xs leading-relaxed text-charcoal-500">
                      {stat.sub}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <SectionDivider variant="accent-line" />

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
