"use client";

import { motion } from "framer-motion";
import {
  Users,
  Baby,
  BookOpen,
  Handshake,
  Goal,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { containerVariants, itemVariants } from "@/lib/animations";
import {
  PUBLIC_PAGE_WRAPPER_CLASS,
  SECTION_HERO_SPACING,
  SECTION_CONTENT_SPACING,
  SECTION_CTA_SPACING,
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
          <motion.div
            variants={itemVariants}
            className="max-w-5xl mx-auto text-center relative z-10"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-charcoal-800 leading-tight">
              Über <span className="text-sage-700">Muslimin e.V.</span>
            </h1>
            <p className="text-xl md:text-2xl text-charcoal-700 max-w-3xl mx-auto leading-relaxed">
              Gemeinschaft, Bildung und verlässliche Unterstützung für
              muslimische Frauen in Berlin seit 2011.
            </p>
          </motion.div>
        </section>

        {/* Wer sind wir? Section */}
        <motion.section
          variants={itemVariants}
          className={SECTION_CONTENT_SPACING}
        >
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-sand-200 bg-cream-50/70 px-6 py-8 shadow-sm md:px-10 md:py-10">
            <div className="relative">
              <div className="mx-auto mb-12 max-w-3xl text-center">
                <h2 className="font-heading text-3xl font-bold leading-tight text-sage-800 md:text-4xl">
                  Wer sind wir?
                </h2>
                <p className="mt-3 max-w-2xl mx-auto text-lg leading-relaxed text-charcoal-700">
                  Ein aktiver muslimischer Mädchen- und Frauenverein im Herzen
                  Berlins.
                </p>
              </div>
              <div className="grid gap-px overflow-hidden rounded-xl bg-sand-200/70 text-center md:grid-cols-2">
                <div className="bg-white p-6 md:p-7">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-sage-100/90 ring-1 ring-sage-200">
                    <Users className="h-8 w-8 text-sage-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal-800 mb-2">
                    Vielfalt
                  </h3>
                  <p className="text-charcoal-600">
                    Mitglieder verschiedenster Herkünfte und Generationen.
                  </p>
                </div>
                <div className="bg-white p-6 md:p-7">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-sage-100/90 ring-1 ring-sage-200">
                    <BookOpen className="h-8 w-8 text-sage-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal-800 mb-2">
                    Bildung
                  </h3>
                  <p className="text-charcoal-600">
                    Eine Plattform um religiöses Wissen zu erlangen.
                  </p>
                </div>
                <div className="bg-white p-6 md:p-7">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-sage-100/90 ring-1 ring-sage-200">
                    <Handshake className="h-8 w-8 text-sage-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal-800 mb-2">
                    Engagement
                  </h3>
                  <p className="text-charcoal-600">
                    Potenziale entfalten und die Gemeinde stärken.
                  </p>
                </div>
                <div className="bg-white p-6 md:p-7">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-sage-100/90 ring-1 ring-sage-200">
                    <Baby className="h-8 w-8 text-sage-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal-800 mb-2">
                    Familienfreundlich
                  </h3>
                  <p className="text-charcoal-600">
                    Kinderbetreuung für eine kinderfreundliche Atmosphäre.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Vereinsphilosophie Section */}
        <motion.section
          variants={itemVariants}
          className={SECTION_CONTENT_SPACING}
        >
          <div className="mx-auto max-w-4xl px-2 md:px-0">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <h2 className="font-heading text-3xl font-bold text-sage-800 md:text-4xl">
                Unsere Philosophie
              </h2>
            </div>
            <div className="relative">
              <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-clay-300 via-sand-200 to-transparent" />
              <div className="max-w-4xl mx-auto pl-6 md:pl-10">
                <blockquote className="my-5 max-w-3xl italic text-xl leading-relaxed text-sage-700 md:text-2xl">
                  &ldquo;Inspiriert von den großen Vorbildern Sayeda Fatima (a)
                  und Sayeda Zainab (a), möchten wir einen Raum schaffen, in dem
                  Frauen ihre spirituelle, intellektuelle und soziale
                  Entwicklung fördern können.&rdquo;
                </blockquote>
                <div className="space-y-5 text-lg text-charcoal-700 leading-8">
                  <p>
                    Was 2011 als Initiative begann, wurde 2018 offiziell als
                    eingetragener Verein gegründet — mit dem Ziel, muslimische
                    Frauen in Berlin und bundesweit zu vernetzen und ihnen eine
                    Stimme zu verleihen. Unsere Arbeit dient der religiösen
                    Bildung, der Stärkung der muslimisch-deutschen Identität und
                    dem Austausch über gesellschaftlich relevante Themen.
                  </p>
                  <p>
                    Wir motivieren Frauen, sich aktiv in die Gemeindearbeit
                    einzubringen, ihre Talente zu fördern und die Gesellschaft
                    mitzugestalten — und hoffen, unsere Projekte und
                    Kooperationen stetig auszuweiten, um noch mehr Schwestern im
                    Leben als Muslimin in Deutschland zu unterstützen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Kernziele Section */}
        <motion.section
          variants={itemVariants}
          className={SECTION_CONTENT_SPACING}
        >
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-sand-200 bg-white px-6 py-8 shadow-sm md:px-10 md:py-10">
            <div className="relative">
              <div className="mx-auto mb-12 max-w-3xl text-center">
                <h2 className="font-heading text-3xl font-bold leading-tight text-charcoal-800 md:text-4xl">
                  Unsere Kernziele
                </h2>
                <p className="mt-3 max-w-2xl mx-auto text-lg leading-relaxed text-charcoal-700">
                  Die Säulen unserer Gemeinschaft.
                </p>
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

        {/* Statistiken Section */}
        <motion.section
          variants={itemVariants}
          className={SECTION_CONTENT_SPACING}
        >
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-sand-200/15 bg-gradient-to-br from-charcoal-600 via-charcoal-600 to-sage-700 px-6 py-8 shadow-sm md:px-8 md:py-10">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="mx-auto mb-8 max-w-3xl text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-clay-300">
                Zahlen &amp; Fakten
              </p>
              <h2 className="font-heading text-3xl font-bold text-sand-50 md:text-4xl">
                Zahlen und Entwicklung
              </h2>
              <p className="mt-2 text-sand-200 text-base">
                Ein Verein mit gewachsener Reichweite und beständiger Arbeit
              </p>
            </div>
            <div className="mx-auto grid max-w-4xl grid-cols-2 overflow-hidden rounded-xl border border-sand-200/15 bg-sand-50/[0.05] lg:grid-cols-4">
              {[
                {
                  value: "14+",
                  unit: "Jahre",
                  label: "aktive Gemeinschaft",
                  sub: "Initiative seit 2011, e.V. seit 2018",
                },
                { value: "60+", unit: "", label: "Mitglieder", sub: null },
                {
                  value: "100+",
                  unit: "",
                  label: "Veranstaltungen",
                  sub: null,
                },
                {
                  value: "500",
                  unit: "",
                  label: "Gäste",
                  sub: "bei unserer größten Veranstaltung",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex min-h-[11.5rem] flex-col items-center justify-center border-b border-sand-200/10 px-4 py-7 text-center transition-all duration-300 hover:bg-sand-50/[0.06] lg:border-b-0 lg:border-r lg:border-sand-200/10 last:border-r-0"
                >
                  <div className="flex min-h-[4.25rem] items-end justify-center gap-1">
                    <span className="text-4xl font-bold tracking-tight text-cream-50 lg:text-5xl">
                      {stat.value}
                    </span>
                    {stat.unit && (
                      <span className="pb-1 text-2xl font-semibold text-clay-300 lg:text-3xl">
                        {stat.unit}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 min-h-[2.5rem] text-sm font-semibold uppercase tracking-[0.06em] text-sand-100 lg:text-[15px]">
                    {stat.label}
                  </p>
                  <p className="mt-2 min-h-[2.25rem] max-w-[13rem] text-xs leading-relaxed text-sand-300">
                    {stat.sub ?? "\u00A0"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Photo Section */}
        <motion.section
          variants={itemVariants}
          className={SECTION_CONTENT_SPACING}
        >
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-sand-200 shadow-sm">
            <div className="relative aspect-[16/7]">
              <Image
                src="/images/veranstaltungen/workshop-august-2025.jpeg"
                alt="Workshop — Muslimin e.V. Gemeinschaft in Berlin"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1024px"
              />
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section variants={itemVariants} className={SECTION_CTA_SPACING}>
          <div className="relative mx-auto max-w-5xl rounded-2xl border border-sand-200 bg-cream-50/70 px-8 py-10">
            <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
              <div className="max-w-2xl">
                <h2 className="font-heading text-3xl font-bold text-charcoal-800 md:text-4xl">
                  Teil unserer Gemeinschaft werden
                </h2>
                <p className="mt-3 text-charcoal-700 leading-relaxed">
                  Wenn du unsere Arbeit begleiten oder Mitglied werden möchtest,
                  findest du hier den nächsten Schritt. Oder entdecke unsere
                  Veranstaltungen.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Button variant="primary" size="lg" asChild>
                  <Link href="/mitglied-werden" data-cta="primary">
                    Mitglied werden
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
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
