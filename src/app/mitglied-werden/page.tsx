"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Heart,
  Info,
  type LucideIcon,
  Users,
} from "lucide-react";

import { PageHeading } from "@/components/ui/page-heading";
import { SectionDivider } from "@/components/ui/section-divider";
import { SplitSection } from "@/components/ui/split-section";
import { DecorativeAccents } from "@/components/ui/decorative-accents";
import { AnimatedWrapper } from "@/components/ui/animated-wrapper";
import { Button } from "@/components/ui/button";
import { containerVariants, itemVariants, hoverButton } from "@/lib/animations";
import {
  CLOSING_SECTION_SURFACE_CLASS,
  PUBLIC_PAGE_WRAPPER_CLASS,
} from "@/lib/page-config";
import { SectionBand } from "@/components/ui/section-band";

type MembershipOption = {
  title: string;
  subtitle: string;
  description: string;
  Icon: LucideIcon;
  accent: {
    bar: string;
    iconBg: string;
    iconText: string;
    border: string;
    badge: string;
  };
};

const MEMBERSHIP_OPTIONS: MembershipOption[] = [
  {
    title: "Aktives Mitglied",
    subtitle: "Gestalte aktiv mit",
    description:
      "Du hast Zeit und Engagement? Dann bringe dich aktiv in unsere Vereinsarbeit ein und gestalte unsere Gemeinschaft mit.",
    Icon: Users,
    accent: {
      bar: "bg-sage-500",
      iconBg: "bg-sage-50",
      iconText: "text-sage-600",
      border: "border-sage-200",
      badge: "bg-sage-100 text-sage-700",
    },
  },
  {
    title: "Passives Mitglied",
    subtitle: "Unterstütze von Herzen",
    description:
      "Wenig Zeit, aber du möchtest unsere Arbeit finanziell unterstützen? Als passives Mitglied bist du ein wichtiger Teil unserer Schwesternschaft.",
    Icon: Heart,
    accent: {
      bar: "bg-clay-400",
      iconBg: "bg-clay-50",
      iconText: "text-clay-600",
      border: "border-clay-200",
      badge: "bg-clay-100 text-clay-700",
    },
  },
];

export default function MitgliedWerdenPage() {
  return (
    <div
      className={`${PUBLIC_PAGE_WRAPPER_CLASS} relative isolate overflow-hidden`}
    >
      {/* Decorative ambient blobs replaced by unified system */}
      <DecorativeAccents preset="hero" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        {/* ── Hero ──────────────────────────────────────────────── */}
        <motion.section
          variants={itemVariants}
          className="px-6 pb-12 pt-20 text-center lg:pb-14 lg:pt-28"
        >
          <div className="container mx-auto max-w-2xl">
            <PageHeading
              title="Assalamu alaykum liebe Schwester!"
              accentWord="Schwester!"
              className="mb-0"
            />

            <p className="mt-5 text-xl font-medium text-charcoal-700 md:text-2xl">
              Werde Teil unserer Schwesternschaft.
            </p>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-charcoal-600 md:text-lg">
              Wähle die Mitgliedschaft, die zu deiner aktuellen Lebenssituation
              passt. Ob Schülerin, Studentin, Angestellte, Mutter oder
              Selbständige — hier hast du die Möglichkeit, dich an unserer
              islamischen Arbeit zu beteiligen.
            </p>
          </div>
        </motion.section>

        {/* ── Was dich erwartet — SplitSection ──────────────────── */}
        <SectionBand variant="alternate">
          <section className="px-6 pb-12">
            <div className="container mx-auto max-w-5xl">
              <SplitSection
                imageSrc="/images/veranstaltungen/gemeinschaft-vortrag.jpg"
                imageAlt="Muslimin e.V. – herzlicher Empfang in der Gemeinschaft"
                reversed
              >
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal-800 mb-4">
                  Was <span className="text-sage-700">dich erwartet</span>
                </h2>
                <p className="text-base text-charcoal-700 leading-relaxed">
                  Als Mitglied von Muslimin e.V. wirst du Teil einer warmen,
                  lebendigen Schwesternschaft. Wir bieten dir Bildung,
                  Vernetzung und einen Platz, an dem du du selbst sein kannst.
                </p>
              </SplitSection>
            </div>
          </section>
        </SectionBand>

        <SectionDivider variant="gradient-fade" />

        {/* ── Mitgliedschaftstypen ─────────────────────── */}
        <section className="px-6 pb-12 lg:pb-14">
          <div className="container mx-auto max-w-4xl">
            <div className="grid gap-8 md:grid-cols-2">
              {MEMBERSHIP_OPTIONS.map((option, idx) => {
                const { Icon } = option;
                return (
                  <AnimatedWrapper
                    key={option.title}
                    animation="fade-in-up"
                    delay={idx * 140}
                  >
                    <div
                      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border ${option.accent.border} bg-white/90 shadow-sage-sm backdrop-blur-sm transition-all duration-300 hover:shadow-sage-md hover:-translate-y-1`}
                    >
                      {/* Accent bar */}
                      <div className={`h-1.5 w-full ${option.accent.bar}`} />

                      <div className="flex flex-1 flex-col p-8 md:p-10">
                        {/* Icon + Badge */}
                        <div className="mb-6 flex items-center gap-4">
                          <div
                            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${option.accent.iconBg} transition-transform duration-300 group-hover:scale-105`}
                          >
                            <Icon
                              className={`h-7 w-7 ${option.accent.iconText}`}
                            />
                          </div>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${option.accent.badge}`}
                          >
                            {option.subtitle}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="font-heading text-2xl font-bold text-charcoal-800">
                          {option.title}
                        </h2>

                        {/* Description */}
                        <p className="mt-3 flex-1 text-base leading-relaxed text-charcoal-600">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </AnimatedWrapper>
                );
              })}
            </div>
          </div>
        </section>

        <SectionDivider variant="gradient-fade" />

        {/* ── Wichtig zu wissen ────────────────────────── */}
        <section className="px-6 pb-12 lg:pb-14">
          <div className="container mx-auto max-w-3xl">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="relative overflow-hidden rounded-3xl-surface border border-sand-200 bg-sand-50/95 p-6 shadow-sage-sm md:p-8"
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-clay-100/50 blur-3xl" />
              <div className="relative flex items-start gap-4">
                <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sage-sm">
                  <Info className="h-4 w-4 text-sage-700" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold text-sage-800">
                    Wichtig zu wissen
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
                    Beide Mitgliedschaftstypen sind herzlich willkommen! Du
                    kannst jederzeit von passiver zu aktiver Mitgliedschaft
                    wechseln, wenn du mehr Engagement zeigen möchtest. Unsere
                    Gemeinschaft lebt von Vielfalt — ob du aktiv mitgestaltest
                    oder einfach Teil der Schwesternschaft sein möchtest, jede
                    Schwester bereichert uns auf ihre Weise.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <SectionDivider variant="accent-line" />

        {/* ── CTA ───────────────────────────────────────── */}
        <section className="px-6 pb-16 lg:pb-20">
          <div className="container mx-auto max-w-3xl">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className={`relative overflow-hidden p-10 text-center md:p-14 ${CLOSING_SECTION_SURFACE_CLASS}`}
            >
              <DecorativeAccents preset="closing" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />

              <div className="relative mx-auto max-w-lg">
                <h2 className="mb-4 font-heading text-2xl font-bold text-white md:text-3xl">
                  Deine Mitgliedschaftsanfrage
                </h2>

                <p className="mb-8 text-base leading-relaxed text-cream-200 md:text-lg">
                  Starte deinen Antrag in wenigen Minuten und werde Teil einer
                  Gemeinschaft, die Bildung, Zugehörigkeit und Engagement
                  zusammenführt.
                </p>

                <motion.div {...hoverButton} className="inline-block">
                  <Button
                    size="lg"
                    asChild
                    className="h-12 rounded-full px-8 shadow-lg bg-clay-500 hover:bg-clay-600 text-white"
                  >
                    <a
                      href="https://formular.vereinsplaner.com/b8fabab2-d21c-4ee4-bdbc-95aa517acbed"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Heart className="h-4 w-4" />
                      Jetzt Mitglied werden
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
