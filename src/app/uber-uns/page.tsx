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
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { containerVariants, itemVariants } from "@/lib/animations";
import { PUBLIC_PAGE_WRAPPER_CLASS } from "@/lib/page-config";

export default function AboutPage() {
  return (
    <div
      className={`${PUBLIC_PAGE_WRAPPER_CLASS} relative isolate overflow-hidden`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-clay-100/55 blur-3xl" />
        <div className="absolute right-[-8rem] top-8 h-[28rem] w-[28rem] rounded-full bg-sage-100/80 blur-3xl" />
        <div className="absolute right-[-6rem] top-1/3 h-80 w-80 rounded-full bg-sand-200/55 blur-3xl" />
        <div className="absolute left-1/3 top-[32rem] h-72 w-72 rounded-full bg-sage-100/45 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 h-72 w-72 rounded-full bg-clay-100/35 blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="overflow-hidden"
      >
        {/* Hero Section */}
        <motion.section
          variants={itemVariants}
          className="pb-14 pt-20 text-center lg:pb-20 lg:pt-28"
        >
          <div className="container mx-auto px-4">
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-cream-50/70 via-sand-50/80 to-sage-50/60 px-6 py-12 md:px-12 md:py-14">
              <div className="absolute -left-10 top-0 h-32 w-32 rounded-full bg-clay-100/35 blur-3xl" />
              <div className="absolute -right-8 bottom-0 h-36 w-36 rounded-full bg-sage-100/45 blur-3xl" />
              <div className="relative lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-end lg:gap-12">
                <div className="text-center lg:text-left">
                  <h1 className="font-heading mb-4 text-4xl font-bold leading-[0.98] text-charcoal-800 md:text-6xl">
                    Über <span className="text-sage-700">Muslimin e.V.</span>
                  </h1>
                </div>
                <div className="mt-8 border-t border-sand-200/80 pt-6 text-center lg:mt-0 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0 lg:text-left">
                  <p className="mx-auto max-w-xl text-lg leading-relaxed text-charcoal-700 md:text-xl lg:mx-0">
                    Gemeinschaft, Bildung & Hilfe für muslimische Frauen seit
                    2011.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Wer sind wir? Section */}
        <motion.section variants={itemVariants} className="py-8 lg:py-10">
          <div className="container mx-auto px-4">
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-sand-200/80 bg-gradient-to-br from-cream-50/95 via-sand-50/90 to-sage-50/75 px-6 py-8 shadow-sage-sm backdrop-blur-sm md:px-10 md:py-10">
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-sage-100/35 blur-3xl" />
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
                <div className="grid gap-px overflow-hidden rounded-[1.75rem] bg-sand-200/70 text-center md:grid-cols-2">
                  <div className="bg-white/70 p-6 md:p-7">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sage-100/90 ring-1 ring-sage-200">
                      <Users className="h-8 w-8 text-sage-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-sage-800 mb-2">
                      Vielfalt
                    </h3>
                    <p className="text-charcoal-600">
                      Mitglieder verschiedenster Herkünfte und Generationen.
                    </p>
                  </div>
                  <div className="bg-white/70 p-6 md:p-7">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sand-50 ring-1 ring-clay-100">
                      <BookOpen className="h-8 w-8 text-clay-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-sage-800 mb-2">
                      Bildung
                    </h3>
                    <p className="text-charcoal-600">
                      Eine Plattform um religiöses Wissen zu erlangen.
                    </p>
                  </div>
                  <div className="bg-white/70 p-6 md:p-7">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sage-100/90 ring-1 ring-sage-200">
                      <Handshake className="h-8 w-8 text-sage-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-sage-800 mb-2">
                      Engagement
                    </h3>
                    <p className="text-charcoal-600">
                      Potenziale entfalten und die Gemeinde stärken.
                    </p>
                  </div>
                  <div className="bg-white/70 p-6 md:p-7">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sand-50 ring-1 ring-clay-100">
                      <Baby className="h-8 w-8 text-clay-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-sage-800 mb-2">
                      Familienfreundlich
                    </h3>
                    <p className="text-charcoal-600">
                      Kinderbetreuung für eine kinderfreundliche Atmosphäre.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Vereinsphilosophie Section */}
        <motion.section variants={itemVariants} className="py-8 lg:py-10">
          <div className="container mx-auto px-4">
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
                    &ldquo;Inspiriert von den großen Vorbildern Sayeda Fatima
                    (a) und Sayeda Zainab (a), möchten wir einen Raum schaffen,
                    in dem Frauen ihre spirituelle, intellektuelle und soziale
                    Entwicklung fördern können.&rdquo;
                  </blockquote>
                  <div className="space-y-5 text-lg text-charcoal-700 leading-8">
                    <p>
                      Unser Verein wurde 2011 gegründet, um muslimische Frauen
                      in Berlin und bundesweit zu vernetzen und ihnen eine
                      Stimme zu verleihen. Wir erkannten den Mangel an
                      Angeboten, die für die religiöse Identitätsfindung und die
                      Entwicklung des Selbstbewusstseins wichtig sind.
                    </p>
                    <p>
                      Unsere Arbeit dient der religiösen Bildung und der
                      Stärkung der muslimisch-deutschen Identität. Wir fördern
                      den Austausch über gesellschaftlich relevante Themen und
                      bieten Frauen einen geschützten Kreis, um sich Wissen
                      anzueignen.
                    </p>
                    <p>
                      Wir motivieren Frauen, sich aktiv in die Gemeindearbeit
                      einzubringen, ihre Talente zu fördern und die Gesellschaft
                      mitzugestalten. Durch den Dialog mit anderen möchten wir
                      zur Aufklärung der Allgemeinbevölkerung beitragen.
                    </p>
                    <p>
                      Wir hoffen, unsere Projekte und Kooperationen in Zukunft
                      auszuweiten, um noch mehr Schwestern bei den
                      Herausforderungen im Leben einer Muslimin in Deutschland
                      zu unterstützen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Kernziele Section */}
        <motion.section variants={itemVariants} className="py-8 lg:py-10">
          <div className="container mx-auto px-4">
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-sand-200/80 bg-gradient-to-br from-sage-50 via-cream-50 to-sand-100/85 px-6 py-8 shadow-sage-sm md:px-10 md:py-10">
              <div className="absolute right-8 top-8 h-28 w-28 rounded-full bg-sage-100/35 blur-3xl" />
              <div className="relative">
                <div className="mx-auto mb-12 max-w-3xl text-center">
                  <h2 className="font-heading text-3xl font-bold leading-tight text-sage-800 md:text-4xl">
                    Unsere Kernziele
                  </h2>
                  <p className="mt-3 max-w-2xl mx-auto text-lg leading-relaxed text-charcoal-700">
                    Die Säulen unserer Gemeinschaft.
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <Card
                    hover="lift"
                    className="text-left p-8 border-t-4 border-sage-400 bg-white/95 shadow-sage-sm"
                  >
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-sage-100/90 ring-1 ring-sage-200">
                      <Goal className="h-8 w-8 text-sage-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-sage-800 mb-2">
                      Religiöse Bildung
                    </h3>
                    <p className="text-sm leading-relaxed text-charcoal-600">
                      Wissen vertiefen und spirituelle Entwicklung fördern.
                    </p>
                  </Card>
                  <Card
                    hover="lift"
                    className="text-left p-8 border-t-4 border-clay-400 bg-white/95 shadow-sage-sm"
                  >
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-sand-50 ring-1 ring-clay-100">
                      <Lightbulb className="h-8 w-8 text-clay-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-sage-800 mb-2">
                      Muslimische Identität
                    </h3>
                    <p className="text-sm leading-relaxed text-charcoal-600">
                      Selbstbewusstsein stärken und Orientierung geben.
                    </p>
                  </Card>
                  <Card
                    hover="lift"
                    className="text-left p-8 border-t-4 border-sage-400 bg-white/95 shadow-sage-sm"
                  >
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-sage-100/90 ring-1 ring-sage-200">
                      <Users className="h-8 w-8 text-sage-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-sage-800 mb-2">
                      Austausch & Dialog
                    </h3>
                    <p className="text-sm leading-relaxed text-charcoal-600">
                      Gemeinschaft leben und gesellschaftliche Themen öffnen.
                    </p>
                  </Card>
                  <Card
                    hover="lift"
                    className="text-left p-8 border-t-4 border-clay-400 bg-white/95 shadow-sage-sm"
                  >
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-sand-50 ring-1 ring-clay-100">
                      <ShieldCheck className="h-8 w-8 text-clay-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-sage-800 mb-2">
                      Geschützter Raum
                    </h3>
                    <p className="text-sm leading-relaxed text-charcoal-600">
                      Einen vertrauensvollen Rahmen für Frauen schaffen.
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Statistiken Section */}
        <motion.section variants={itemVariants} className="py-8 lg:py-10">
          <div className="container mx-auto px-4">
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-sand-200/15 bg-gradient-to-br from-charcoal-600 via-charcoal-600 to-sage-700 px-6 py-8 shadow-sage-sm md:px-8 md:py-10">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className="mx-auto mb-8 max-w-3xl text-center">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-clay-300">
                  Zahlen &amp; Fakten
                </p>
                <h2 className="font-heading text-3xl font-bold text-sand-50 md:text-4xl">
                  Unsere Erfolge
                </h2>
              </div>
              <div className="mx-auto grid max-w-4xl grid-cols-2 overflow-hidden rounded-[1.75rem] border border-sand-200/15 bg-sand-50/[0.05] lg:grid-cols-4">
                {[
                  {
                    value: "7",
                    unit: "Jahre",
                    label: "eingetragener Verein",
                    sub: "gegründet 2018",
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
          </div>
        </motion.section>
        {/* CTA Section */}
        <motion.section
          variants={itemVariants}
          className="relative overflow-hidden border-y border-sand-200/70 bg-gradient-to-r from-sand-50/65 via-cream-50/70 to-sage-50/45 py-10 lg:py-12"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-12 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-clay-100/25 blur-3xl" />
            <div className="absolute right-16 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-sage-100/30 blur-3xl" />
          </div>
          <div className="container mx-auto px-4">
            <div className="relative mx-auto max-w-5xl">
              <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
                <div className="max-w-2xl">
                  <h2 className="font-heading text-3xl font-bold text-charcoal-800 md:text-4xl">
                    Werde Teil unserer Gemeinschaft
                  </h2>
                </div>
                <div className="shrink-0">
                  <Button variant="primary" size="lg" asChild>
                    <Link href="/mitglied-werden" data-cta="primary">
                      Mitglied werden
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
