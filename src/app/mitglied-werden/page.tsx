"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Heart,
  Info,
  type LucideIcon,
  Users,
} from "lucide-react";

import { SocialMediaSection } from "@/components/SocialMediaSection";
import { Button } from "@/components/ui/button";
import {
  containerVariants,
  hoverLift,
  itemVariants,
  hoverButton,
} from "@/lib/animations";
import {
  CLOSING_SECTION_SURFACE_CLASS,
  PUBLIC_PAGE_WRAPPER_CLASS,
  FOOTER_BRIDGE_SURFACE_CLASS,
} from "@/lib/page-config";

type MembershipOption = {
  title: string;
  description: string;
  Icon: LucideIcon;
  accentClasses: {
    topBar: string;
    iconWrap: string;
    icon: string;
    glow: string;
  };
};

const MEMBERSHIP_OPTIONS: MembershipOption[] = [
  {
    title: "Aktives Mitglied",
    description: "Genug Zeit und Engagement? Dann werde aktives Mitglied!",
    Icon: Users,
    accentClasses: {
      topBar: "bg-sage-400",
      iconWrap: "bg-sage-100",
      icon: "text-sage-600",
      glow: "bg-sage-100/80",
    },
  },
  {
    title: "Passives Mitglied",
    description:
      "Keine Zeit aber genug finanzielle Mittel? Dann werde passives Mitglied!",
    Icon: Heart,
    accentClasses: {
      topBar: "bg-warm-400",
      iconWrap: "bg-warm-100",
      icon: "text-warm-600",
      glow: "bg-warm-100/80",
    },
  },
];

export default function MitgliedWerdenPage() {
  return (
    <div
      className={`${PUBLIC_PAGE_WRAPPER_CLASS} relative isolate overflow-hidden`}
    >
      {/* Decorative ambient blobs */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[44rem] overflow-hidden">
        <div className="absolute left-1/4 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-sage-100/60 blur-3xl" />
        <div className="absolute right-1/4 top-32 h-96 w-96 translate-x-1/2 rounded-full bg-sand-200/50 blur-3xl" />
        <div className="absolute left-1/2 top-64 h-72 w-72 -translate-x-1/2 rounded-full bg-clay-100/50 blur-3xl" />
      </div>

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
            <h1 className="font-heading text-4xl font-bold leading-tight text-charcoal-800 md:text-5xl lg:text-6xl">
              Assalamu alaykum liebe{" "}
              <span className="text-sage-600">Schwester!</span>
            </h1>

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

        {/* ── Mitgliedschaftstypen ──────────────────────────────── */}
        <section className="px-6 pb-12 lg:pb-14">
          <div className="container mx-auto max-w-4xl">
            <div className="rounded-[2rem] border border-white/70 bg-white/55 p-6 shadow-sage-sm backdrop-blur-sm md:p-8 lg:p-10">
              <div className="grid gap-6 md:grid-cols-2">
                {MEMBERSHIP_OPTIONS.map((option) => {
                  const { Icon } = option;
                  return (
                    <motion.div
                      key={option.title}
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-40px" }}
                      {...hoverLift}
                    >
                      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-sand-200/80 bg-white shadow-sage-md">
                        {/* Colored top accent bar */}
                        <div
                          className={`h-1 w-full ${option.accentClasses.topBar}`}
                        />

                        <div className="relative flex flex-1 flex-col p-8">
                          <div
                            className={`absolute right-4 top-4 h-32 w-32 rounded-full blur-3xl ${option.accentClasses.glow}`}
                          />

                          <div
                            className={`relative mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${option.accentClasses.iconWrap}`}
                          >
                            <Icon
                              className={`h-5 w-5 ${option.accentClasses.icon}`}
                            />
                          </div>

                          <h2 className="relative font-heading text-xl font-semibold text-charcoal-800">
                            {option.title}
                          </h2>

                          <p className="relative mt-3 text-sm leading-relaxed text-charcoal-600">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── Wichtig zu wissen ─────────────────────────────────── */}
        <section className="px-6 pb-12 lg:pb-14">
          <div className="container mx-auto max-w-3xl">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="relative overflow-hidden rounded-[2rem] border border-sand-200 bg-sand-50/95 p-6 shadow-sage-sm md:p-8"
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

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="px-6 pb-16 lg:pb-20">
          <div className="container mx-auto max-w-3xl">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className={`relative overflow-hidden p-10 text-center md:p-14 ${CLOSING_SECTION_SURFACE_CLASS}`}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sand-200/50 blur-3xl" />
              <div className="absolute -bottom-10 left-10 h-40 w-40 rounded-full bg-sage-200/45 blur-3xl" />

              <div className="relative mx-auto max-w-lg">
                <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-sage-200/80 bg-sage-700 text-white shadow-sm">
                  <Heart className="h-5 w-5" />
                </div>

                <h2 className="mb-4 font-heading text-2xl font-bold text-charcoal-800 md:text-3xl">
                  Deine Mitgliedschaftsanfrage
                </h2>

                <p className="mb-8 text-base leading-relaxed text-charcoal-700 md:text-lg">
                  Starte deinen Antrag in wenigen Minuten und werde Teil einer
                  Gemeinschaft, die Bildung, Zugehörigkeit und Engagement
                  zusammenführt.
                </p>

                <motion.div {...hoverButton} className="inline-block">
                  <Button
                    variant="primary"
                    size="lg"
                    asChild
                    className="h-12 rounded-full px-8 shadow-lg"
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

        {/* ── Social Media ──────────────────────────────────────── */}
        <section className="px-6 pb-20">
          <div className="container mx-auto max-w-3xl">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              <div className={`${FOOTER_BRIDGE_SURFACE_CLASS} p-6 md:p-8`}>
                <SocialMediaSection variant="compact" showTitle={true} />
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
