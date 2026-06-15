"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionDivider } from "@/components/ui/section-divider";
import {
  Globe2,
  GraduationCap,
  Briefcase,
  Heart,
  BookOpen,
  Sparkles,
  Baby,
} from "lucide-react";

// ─── Core Values ────────────────────────────────────────────────────────────
const CORE_VALUES = [
  {
    icon: Heart,
    title: "Vielfalt",
    description: "Mitglieder verschiedenster Herkünfte und Generationen.",
    iconBg: "bg-sage-100 text-sage-600",
    border: "border-sage-100",
  },
  {
    icon: BookOpen,
    title: "Bildung",
    description: "Eine Plattform um religiöses Wissen zu erlangen.",
    iconBg: "bg-sand-100 text-sand-700",
    border: "border-sand-200",
  },
  {
    icon: Sparkles,
    title: "Engagement",
    description: "Potenziale entfalten und die Gemeinde stärken.",
    iconBg: "bg-clay-100 text-clay-600",
    border: "border-clay-100",
  },
  {
    icon: Baby,
    title: "Familienfreundlich",
    description: "Kinderbetreuung für eine kinderfreundliche Atmosphäre.",
    iconBg: "bg-cream-50 text-charcoal-600",
    border: "border-cream-200",
  },
];

// ─── Region data ─────────────────────────────────────────────────────────────
const REGIONS = [
  {
    label: "Europa",
    countries: ["Deutschland", "Slowakei", "Polen", "Italien", "Kosovo"],
    tagClass: "bg-sage-50 text-sage-700 ring-1 ring-sage-200",
    cardBg: "bg-sage-50",
    dot: "bg-sage-500",
    labelClass: "text-sage-700",
    borderAccent: "border-l-sage-500",
  },
  {
    label: "Asien & Naher Osten",
    countries: [
      "Aserbaidschan",
      "Irak",
      "Libanon",
      "Iran",
      "Türkei",
      "Palästina",
      "Syrien",
    ],
    tagClass: "bg-clay-50 text-clay-700 ring-1 ring-clay-200",
    cardBg: "bg-clay-50",
    dot: "bg-clay-500",
    labelClass: "text-clay-700",
    borderAccent: "border-l-clay-500",
  },
  {
    label: "Afrika",
    countries: ["Togo", "Tunesien", "Ghana"],
    tagClass: "bg-warm-50 text-warm-600 ring-1 ring-warm-300",
    cardBg: "bg-warm-50",
    dot: "bg-warm-500",
    labelClass: "text-warm-500",
    borderAccent: "border-l-warm-500",
  },
  {
    label: "Südamerika",
    countries: ["Brasilien"],
    tagClass: "bg-sand-100 text-charcoal-600 ring-1 ring-sand-300",
    cardBg: "bg-cream-50",
    dot: "bg-sand-600",
    labelClass: "text-charcoal-600",
    borderAccent: "border-l-sand-600",
  },
];

const PROFESSIONS_MARQUEE = [
  "Ärztin",
  "Dozentin",
  "Hebamme",
  "Psychotherapeutin",
  "IT-Einkaufsmanagerin",
  "Naturwissenschaftlerin",
  "Geschäftsführerin",
  "Fotografin",
  "Verwaltungsfachwirtin",
  "Erzieherin",
  "Stadtsekretärin",
  "Freiberuflerin",
  "Mediendesignerin",
  "Kauffrau für Büromanagement",
  "Gesundheits- & Krankenpflegerin",
  "Lehrkraft",
  "Selbstständige",
];

const STUDIES_MARQUEE = [
  "Islamische Theologie",
  "Psychologie",
  "Rechtswissenschaft",
  "Humanmedizin",
  "Informatik",
  "Biotechnologie",
  "Arabistik",
  "Soziologie",
  "Philosophie",
  "Politikwissenschaften",
  "Kindheitspädagogik",
  "International Business",
  "Molekulare Medizin",
  "Volkswirtschaftslehre",
  "Islamwissenschaft",
  "Medien- & Wirtschaftspsychologie",
  "Chemie",
  "Physik",
  "Sozialpädagogik",
  "Sprachwissenschaft",
  "Bildungswissenschaften",
  "Islamwissenschaft",
];

// ─── Animation variants ──────────────────────────────────────────────────────
const tagVariant = {
  hidden: { opacity: 0, scale: 0.82, y: 5 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.38,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};


// ─── Region Card ─────────────────────────────────────────────────────────────
function RegionCard({
  region,
  index,
  inView,
}: {
  region: (typeof REGIONS)[number];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-2xl border-l-[3px] p-5 shadow-soft ${region.cardBg} ${region.borderAccent}`}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className={`inline-block h-2 w-2 rounded-full ${region.dot}`} />
        <h4 className={`text-xs font-bold uppercase tracking-[0.18em] ${region.labelClass}`}>
          {region.label}
        </h4>
      </div>
      <motion.div
        className="flex flex-wrap gap-1.5"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.05, delayChildren: index * 0.08 },
          },
        }}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {region.countries.map((country) => (
          <motion.span
            key={country}
            variants={tagVariant}
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${region.tagClass}`}
          >
            {country}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}

// ─── OriginsSection ──────────────────────────────────────────────────────────
function OriginsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref}>
      <div className="mb-6 flex items-center justify-center gap-2.5">
        <Globe2 className="h-4 w-4 text-sage-500" />
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sage-600">
          16 Länder · Eine Gemeinschaft
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {REGIONS.map((region, i) => (
          <RegionCard key={region.label} region={region} index={i} inView={inView} />
        ))}
      </div>
    </div>
  );
}

// ─── MarqueeRow ──────────────────────────────────────────────────────────────
function MarqueeRow({
  items,
  direction,
}: {
  items: string[];
  direction: "left" | "right";
}) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div
        className={
          direction === "left"
            ? "animate-marquee-left"
            : "animate-marquee-right"
        }
        style={{ display: "flex", gap: "0.625rem", width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full bg-sand-50 px-4 py-1.5 text-sm text-charcoal-700 ring-1 ring-sand-200"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── ExpertiseSection ────────────────────────────────────────────────────────
function ExpertiseSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.7 }}
      className="overflow-hidden rounded-2xl bg-white pb-5 pt-6 shadow-soft"
    >
      <div className="mb-4 flex items-center justify-center gap-5 px-4">
        <span className="flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-charcoal-400">
          <Briefcase className="h-3.5 w-3.5 text-sage-500" />
          Berufe
        </span>
        <span className="inline-block h-3 w-px bg-sand-300" />
        <span className="flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-charcoal-400">
          <GraduationCap className="h-3.5 w-3.5 text-clay-500" />
          Studienfächer
        </span>
      </div>
      <MarqueeRow items={PROFESSIONS_MARQUEE} direction="left" />
      <div className="my-2" />
      <MarqueeRow items={STUDIES_MARQUEE} direction="right" />
    </motion.div>
  );
}

// ─── IdentitiesSection ───────────────────────────────────────────────────────
function IdentitiesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-clay-50 to-cream-50 px-8 py-10 text-center shadow-[0_10px_26px_rgba(124,76,59,0.12),0_1px_3px_rgba(60,68,60,0.05)]"
    >
      {/* Decorative quotation mark */}
      <div
        className="absolute -top-2 left-6 font-heading text-8xl leading-none text-clay-200/60 select-none"
        aria-hidden="true"
      >
        &ldquo;
      </div>
      <p className="mb-1 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-clay-500">
        Und vor allem…
      </p>
      <p className="relative z-10 mx-auto mt-3 max-w-xl text-base leading-relaxed text-charcoal-700 md:text-lg">
        Neben unseren Mitgliedern, die beruflich Fuß gefasst haben, sind wir
        besonders stolz auf unsere{" "}
        <strong className="font-semibold text-clay-700">Mamas</strong>. Sie
        widmen sich der wohl wichtigsten Aufgabe überhaupt — der Zukunft
        unserer Gesellschaft: unseren Kindern.
      </p>
      <span className="mt-4 inline-block text-xs italic text-charcoal-400">
        Möge Gott euch belohnen!
      </span>
    </motion.div>
  );
}

// ─── CoreValuesSection ───────────────────────────────────────────────────────
function CoreValuesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {CORE_VALUES.map(({ icon: Icon, title, description, iconBg }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center rounded-2xl bg-white px-4 py-6 text-center shadow-soft"
          >
            <div
              className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-semibold text-charcoal-800">{title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-charcoal-500">
              {description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────
export function WerSindWirSection() {
  return (
    <div className="mx-auto max-w-[74rem] space-y-12 rounded-3xl bg-white/40 px-6 py-12 shadow-sm md:px-12 md:py-14">
      {/* ── Chapter header ── */}
      <div className="text-center">
        <h2 className="font-heading text-3xl font-bold leading-tight text-sage-800 md:text-4xl">
          Wer sind wir?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-lg leading-relaxed text-charcoal-600">
          Ein aktiver muslimischer Mädchen- und Frauenverein im Herzen Berlins.
        </p>
        <div className="mx-auto mt-5 h-0.5 w-10 rounded-full bg-sage-400" />
      </div>

      {/* ── Herkunft / Origins ── */}
      <section aria-labelledby="unsere-herkunft">
        <h3
          id="unsere-herkunft"
          className="mb-6 text-center text-[0.7rem] font-bold uppercase tracking-[0.22em] text-sage-500"
        >
          Unsere Mitglieder — Herkunft
        </h3>
        <OriginsSection />
      </section>

      <SectionDivider variant="accent-line" label="ihre Vielfalt" />

      {/* ── Expertise marquee ── */}
      <section aria-labelledby="expertise-label">
        <h3
          id="expertise-label"
          className="mb-6 text-center text-[0.7rem] font-bold uppercase tracking-[0.22em] text-charcoal-400"
        >
          Berufe &amp; Studienfächer
        </h3>
        <ExpertiseSection />
      </section>

      <SectionDivider variant="accent-line" />

      {/* ── Identities / Mamas ── */}
      <section aria-labelledby="identitaeten-label">
        <h3 id="identitaeten-label" className="sr-only">Unsere Mamas</h3>
        <IdentitiesSection />
      </section>

      <SectionDivider variant="accent-line" label="was uns vereint" />

      {/* ── Core Values ── */}
      <section aria-labelledby="unsere-werte">
        <h3
          id="unsere-werte"
          className="mb-6 text-center text-[0.7rem] font-bold uppercase tracking-[0.22em] text-clay-500"
        >
          Unsere gemeinsamen Werte
        </h3>
        <CoreValuesSection />
      </section>
    </div>
  );
}
