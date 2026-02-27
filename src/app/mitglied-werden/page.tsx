"use client";

import { motion } from "framer-motion";
import {
  Heart,
  Users,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialMediaSection } from "@/components/SocialMediaSection";
import {
  containerVariants,
  itemVariants,
  hoverButton,
  hoverLift,
} from "@/lib/animations";
import { PUBLIC_PAGE_WRAPPER_CLASS } from "@/lib/page-config";

// ─── Data ────────────────────────────────────────────────────────────────────

const membershipTypes = [
  {
    id: "aktiv",
    icon: Users,
    label: "Aktives Mitglied",
    tagline: "Gestalte aktiv mit",
    description:
      "Du hast Zeit und Lust, dich in unserer Gemeinschaft einzubringen? Als aktives Mitglied gestaltest du islamische Projekte, Veranstaltungen und Initiativen direkt mit.",
    perks: [
      "Mitgestaltung bei Projekten & Veranstaltungen",
      "Stimmrecht bei Vereinsversammlungen",
      "Zugang zu exklusiven Mitglieder-Workshops",
      "Enger Austausch mit der Schwesternschaft",
    ],
    accent: "sage",
  },
  {
    id: "passiv",
    icon: Heart,
    label: "Passives Mitglied",
    tagline: "Unterstütze durch Beitrag",
    description:
      "Dein Beitrag zählt, auch ohne aktive Teilnahme. Als passives Mitglied unterstützt du unsere Arbeit finanziell und bist offizieller Teil unserer Schwesternschaft.",
    perks: [
      "Offizielle Zugehörigkeit zur Gemeinschaft",
      "Newsletter & Vereinsberichte",
      "Einladungen zu öffentlichen Veranstaltungen",
      "Jederzeit zu aktivem Mitglied wechselbar",
    ],
    accent: "clay",
  },
];

const highlights = [
  { icon: Star, text: "Seit 2011 aktiv" },
  { icon: CheckCircle2, text: "Gemeinnützig & ehrenamtlich" },
  { icon: Clock, text: "Flexible Mitgliedschaft" },
];

// ─── Membership Card ─────────────────────────────────────────────────────────

function MembershipCard({
  type,
  index,
}: {
  type: (typeof membershipTypes)[0];
  index: number;
}) {
  const Icon = type.icon;
  const isSage = type.accent === "sage";

  return (
    <motion.div
      variants={itemVariants}
      {...hoverLift}
      className={`
        relative flex flex-col rounded-2xl overflow-hidden
        border transition-all duration-300
        ${isSage
          ? "bg-white border-sage-200 hover:border-sage-400 hover:shadow-xl"
          : "bg-white border-clay-200 hover:border-clay-400 hover:shadow-xl"
        }
      `}
    >
      {/* Top accent bar */}
      <div
        className={`h-1.5 w-full ${isSage ? "bg-gradient-to-r from-sage-400 to-sage-600" : "bg-gradient-to-r from-clay-400 to-clay-600"}`}
      />

      <div className="flex flex-col flex-1 p-8">
        {/* Icon + Label */}
        <div className="flex items-start gap-4 mb-6">
          <div
            className={`
            flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl
            ${isSage ? "bg-sage-100 text-sage-700" : "bg-clay-100 text-clay-600"}
          `}
          >
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <p
              className={`text-xs font-semibold uppercase tracking-widest mb-0.5 ${isSage ? "text-sage-500" : "text-clay-500"}`}
            >
              {type.tagline}
            </p>
            <h3 className="text-xl font-bold text-charcoal-800">
              {type.label}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-charcoal-600 leading-relaxed mb-6 text-[15px]">
          {type.description}
        </p>

        {/* Perks */}
        <ul className="space-y-3 mt-auto">
          {type.perks.map((perk) => (
            <li key={perk} className="flex items-start gap-3">
              <CheckCircle2
                className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isSage ? "text-sage-500" : "text-clay-500"}`}
              />
              <span className="text-sm text-charcoal-700">{perk}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MitgliedWerdenPage() {
  return (
    <div className={PUBLIC_PAGE_WRAPPER_CLASS}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-sand-200">
          {/* Subtle background texture */}
          <div className="absolute inset-0 bg-gradient-to-br from-sage-50/60 via-cream-50 to-sand-100/40 pointer-events-none" />
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-sage-100/30 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-clay-100/20 blur-3xl pointer-events-none" />

          <div className="relative container mx-auto px-6 py-20 md:py-28 max-w-4xl text-center">
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-sage-600 uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                Muslimin e.V.
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="font-serif text-4xl md:text-6xl font-bold text-charcoal-800 leading-tight text-balance mb-6"
            >
              Assalamu alaykum,
              <br />
              <span className="text-sage-600">liebe Schwester.</span>
            </motion.h1>

            {/* Lead */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-charcoal-600 leading-relaxed max-w-2xl mx-auto mb-10 text-pretty"
            >
              Werde Teil unserer Schwesternschaft und bringe dich auf deine
              eigene Weise ein — ob aktiv gestaltend oder durch deine
              finanzielle Unterstützung.
            </motion.p>

            {/* Highlights strip */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4 mb-10"
            >
              {highlights.map((h) => {
                const Icon = h.icon;
                return (
                  <span
                    key={h.text}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-sand-200 text-sm text-charcoal-600 font-medium shadow-sm"
                  >
                    <Icon className="w-4 h-4 text-sage-500" />
                    {h.text}
                  </span>
                );
              })}
            </motion.div>

            {/* Primary CTA */}
            <motion.div variants={itemVariants} {...hoverButton}>
              <Button
                size="lg"
                variant="primary"
                asChild
                className="gap-2 px-8 py-4 text-base"
              >
                <a
                  href="#mitglied-werden-form"
                  className="flex items-center gap-2"
                >
                  Jetzt Mitglied werden
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ── MEMBERSHIP TYPES ─────────────────────────────────────────── */}
        <section className="container mx-auto px-6 py-20 max-w-5xl">
          {/* Section header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal-800 mb-4 text-balance">
              Welche Mitgliedschaft passt zu dir?
            </h2>
            <p className="text-charcoal-500 max-w-xl mx-auto leading-relaxed">
              Ob Schülerin, Studentin, Angestellte, Mutter oder Selbständige —
              wähle die Form, die zu deiner Lebenssituation passt.
            </p>
          </motion.div>

          {/* Cards grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {membershipTypes.map((type, i) => (
              <MembershipCard key={type.id} type={type} index={i} />
            ))}
          </div>

          {/* Transition note */}
          <motion.div
            variants={itemVariants}
            className="flex items-start gap-4 bg-sage-50 border border-sage-200 rounded-2xl p-6 max-w-2xl mx-auto"
          >
            <CheckCircle2 className="w-5 h-5 text-sage-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-charcoal-600 leading-relaxed">
              <span className="font-semibold text-charcoal-800">
                Jederzeit flexibel:
              </span>{" "}
              Du kannst jederzeit von passiver zu aktiver Mitgliedschaft
              wechseln. Unsere Gemeinschaft lebt von Vielfalt — jede Schwester
              bereichert uns auf ihre Weise.
            </p>
          </motion.div>
        </section>

        {/* ── CTA FORM CARD ─────────────────────────────────────────────── */}
        <section
          id="mitglied-werden-form"
          className="bg-gradient-to-br from-sage-700 to-sage-900 py-20"
        >
          <div className="container mx-auto px-6 max-w-2xl text-center">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Icon */}
              <div className="flex justify-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 border border-white/20 text-white">
                  <Heart className="w-8 h-8" />
                </div>
              </div>

              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white text-balance">
                Bereit, Teil der Schwesternschaft zu werden?
              </h2>

              <p className="text-sage-100 text-lg leading-relaxed max-w-lg mx-auto">
                Fülle das Mitgliedschaftsformular aus — es dauert nur wenige
                Minuten.
              </p>

              <motion.div {...hoverButton} className="pt-2">
                <Button
                  size="lg"
                  variant="secondary"
                  asChild
                  className="gap-2 bg-white text-sage-800 hover:bg-sand-50 border-0 px-10 py-4 text-base font-semibold shadow-lg"
                >
                  <a
                    href="https://formular.vereinsplaner.com/b8fabab2-d21c-4ee4-bdbc-95aa517acbed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Mitgliedschaftsformular ausfüllen
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── SOCIAL MEDIA ─────────────────────────────────────────────── */}
        <section className="container mx-auto px-6 py-20 max-w-4xl">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SocialMediaSection
              variant="compact"
              showTitle={true}
              title="Bleib mit uns verbunden"
              subtitle="Folge uns für Updates, Einblicke und Neuigkeiten aus unserer Gemeinschaft"
            />
          </motion.div>
        </section>
      </motion.div>
    </div>
  );
}
