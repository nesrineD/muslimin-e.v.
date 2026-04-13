"use client";

import { motion } from "framer-motion";
import { Users, Goal, Lightbulb, ShieldCheck, ArrowRight } from "lucide-react";
import { WerSindWirSection } from "@/components/uber-uns/WerSindWirSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
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
  SECTION_DARK_FEATURE_CLASS,
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
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
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
                  className="text-left p-8 rounded-xl border border-sand-200 bg-gradient-to-br from-cream-50 to-sand-50 shadow-sm"
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
                  className="text-left p-8 rounded-xl border border-sand-200 bg-gradient-to-br from-cream-50 to-sand-50 shadow-sm"
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
                  className="text-left p-8 rounded-xl border border-sand-200 bg-gradient-to-br from-cream-50 to-sand-50 shadow-sm"
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
                  className="text-left p-8 rounded-xl border border-sand-200 bg-gradient-to-br from-cream-50 to-sand-50 shadow-sm"
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
          </motion.section>
        </SectionBand>

        {/* Mid-Page Soft CTA - earlier conversion touchpoint */}
        <motion.section
          variants={itemVariants}
          className="py-8 md:py-12"
        >
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 rounded-2xl border border-sage-200/60 bg-gradient-to-r from-sage-50/80 via-cream-50 to-sage-50/80 px-6 py-5 shadow-sm backdrop-blur-sm">
              <p className="text-charcoal-700 text-base">
                Klingt das interessant?
              </p>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="group border-sage-300 text-sage-700 hover:bg-sage-100 hover:border-sage-400"
              >
                <Link href="/veranstaltungen" className="flex items-center gap-2">
                  Unsere Veranstaltungen entdecken
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Statistiken Section — DARK FOCAL POINT for visual contrast */}
        <SectionBand variant="dark-feature" className="py-16 md:py-20">
          <motion.section variants={itemVariants}>
            <div className="relative mx-auto max-w-5xl px-4">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15)_0%,transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1)_0%,transparent_40%)]" />
              </div>

              <div className="relative mx-auto mb-12 max-w-3xl text-center">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-clay-400">
                  Zahlen &amp; Fakten
                </p>
                <h2 className="font-heading text-3xl font-bold text-white md:text-4xl mb-3">
                  Unsere Entwicklung
                </h2>
                <p className="text-cream-200/80 text-lg">
                  Ein Verein mit gewachsener Reichweite und beständiger Arbeit
                </p>
              </div>

              <div className="relative mx-auto grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4">
                {[
                  {
                    target: 14,
                    suffix: "+",
                    label: "Jahre",
                    sub: "Initiative seit 2011",
                  },
                  {
                    target: 60,
                    suffix: "+",
                    label: "Mitglieder",
                    sub: "Aktive Frauen",
                  },
                  {
                    target: 100,
                    suffix: "+",
                    label: "Veranstaltungen",
                    sub: "Seit Gründung",
                  },
                  {
                    target: 500,
                    suffix: "",
                    label: "Gäste",
                    sub: "Größte Veranstaltung",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="group flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-8 text-center transition-all duration-300 hover:bg-white/10 hover:border-white/20"
                  >
                    <span className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
                      <AnimatedCounter
                        target={stat.target}
                        suffix={stat.suffix}
                      />
                    </span>
                    <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-clay-300">
                      {stat.label}
                    </p>
                    {stat.sub && (
                      <p className="mt-1.5 text-xs leading-relaxed text-cream-200/60">
                        {stat.sub}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        </SectionBand>

        {/* Vorstand / Team Section - with visual imagery */}
        <motion.section
          variants={itemVariants}
          className={SECTION_CONTENT_SPACING}
        >
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-sage-600">
                Unser Vorstand
              </p>
              <SectionHeading
                title="Die Frauen hinter Muslimin e.V."
                subtitle="Ein engagiertes Team, das den Verein mit Herz und Verstand leitet."
              />
            </div>

            {/* Image Gallery Grid - creates visual interest */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
              {[
                { src: "/images/veranstaltungen/gemeinschaft-01.jpg", alt: "Gemeinschaft bei Muslimin e.V." },
                { src: "/images/veranstaltungen/gemeinschaft-vortrag.jpg", alt: "Vortrag und Austausch" },
                { src: "/images/veranstaltungen/gemeinschaft-saal-1.jpg", alt: "Veranstaltungssaal" },
                { src: "/images/veranstaltungen/gemeinschaft-gebet.jpg", alt: "Spirituelle Momente" },
              ].map((img, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-2xl ${
                    i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/30 to-transparent" />
                </div>
              ))}
            </div>

            {/* Board Description */}
            <div className="mx-auto max-w-3xl rounded-2xl border border-sand-200 bg-white/80 backdrop-blur-sm p-8 text-center shadow-sm">
              <p className="text-lg leading-relaxed text-charcoal-700 mb-4">
                Der Vorstand von Muslimin e.V. besteht aus engagierten Frauen verschiedener Fachrichtungen,
                die ihre Expertise ehrenamtlich einbringen. Gemeinsam gestalten sie die strategische 
                Ausrichtung des Vereins und sorgen für eine lebendige, wachsende Gemeinschaft.
              </p>
              <p className="text-sm text-charcoal-500">
                Bei Fragen zum Vorstand oder zur Vereinsarbeit schreib uns gerne an{" "}
                <a 
                  href="mailto:kontakt@muslimin.de" 
                  className="text-sage-600 hover:text-sage-700 underline underline-offset-2"
                >
                  kontakt@muslimin.de
                </a>
              </p>
            </div>
          </div>
        </motion.section>

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
