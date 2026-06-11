"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
    accent: "bg-sage-100 text-sage-600 ring-sage-200",
  },
  {
    icon: BookOpen,
    title: "Bildung",
    description: "Eine Plattform um religiöses Wissen zu erlangen.",
    accent: "bg-sand-100 text-sand-700 ring-sand-300",
  },
  {
    icon: Sparkles,
    title: "Engagement",
    description: "Potenziale entfalten und die Gemeinde stärken.",
    accent: "bg-clay-100 text-clay-600 ring-clay-200",
  },
  {
    icon: Baby,
    title: "Familienfreundlich",
    description: "Kinderbetreuung für eine kinderfreundliche Atmosphäre.",
    accent: "bg-cream-100 text-charcoal-600 ring-cream-300",
  },
];

// ─── Data ───────────────────────────────────────────────────────────────────
const REGIONS = [
  {
    label: "Europa",
    countries: ["Deutschland", "Slowakei", "Polen", "Italien", "Kosovo"],
    tagClass: "bg-sage-100 text-sage-700 ring-1 ring-sage-200",
    dot: "bg-sage-400",
    labelClass: "text-sage-600",
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
    tagClass: "bg-sand-100 text-charcoal-700 ring-1 ring-sand-300",
    dot: "bg-sand-600",
    labelClass: "text-charcoal-500",
  },
  {
    label: "Afrika",
    countries: ["Togo", "Tunesien", "Ghana"],
    tagClass: "bg-clay-100 text-clay-700 ring-1 ring-clay-200",
    dot: "bg-clay-400",
    labelClass: "text-clay-600",
  },
  {
    label: "Südamerika",
    countries: ["Brasilien"],
    tagClass: "bg-cream-100 text-charcoal-600 ring-1 ring-cream-300",
    dot: "bg-cream-500",
    labelClass: "text-charcoal-500",
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
      className="mb-10"
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {CORE_VALUES.map(({ icon: Icon, title, description, accent }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: i * 0.1,
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col items-center rounded-xl bg-white/80 px-4 py-5 text-center shadow-sm ring-1 ring-sand-200"
          >
            <div
              className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ring-1 ${accent}`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-semibold text-charcoal-800">{title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-charcoal-500">
              {description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── CountriesSection ────────────────────────────────────────────────────────
function CountriesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="mb-10">
      <div className="mb-5 flex items-center justify-center gap-2">
        <Globe2 className="h-4 w-4 text-sage-500" />
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-600">
          16 Länder · Eine Gemeinschaft
        </p>
      </div>
      <div className="space-y-4">
        {REGIONS.map((region, ri) => (
          <div
            key={region.label}
            className="flex flex-wrap items-start gap-x-3 gap-y-2"
          >
            <div className="flex shrink-0 items-center gap-1.5 pt-0.5">
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full ${region.dot}`}
              />
              <span
                className={`inline-block w-[140px] text-xs font-medium ${region.labelClass}`}
              >
                {region.label}
              </span>
            </div>
            <motion.div
              className="flex flex-wrap gap-2"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: ri * 0.12,
                  },
                },
              }}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {region.countries.map((country) => (
                <motion.span
                  key={country}
                  variants={tagVariant}
                  className={`rounded-full px-3 py-0.5 text-sm font-medium ${region.tagClass}`}
                >
                  {country}
                </motion.span>
              ))}
            </motion.div>
          </div>
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
            className="whitespace-nowrap rounded-full bg-white/80 px-4 py-1.5 text-sm text-charcoal-600 shadow-sm ring-1 ring-sand-200"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── MarqueeSection ──────────────────────────────────────────────────────────
function MarqueeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.7 }}
      className="mb-10 overflow-hidden rounded-2xl border border-sand-200 bg-sand-50/60 pb-5 pt-6"
    >
      <div className="mb-4 flex items-center justify-center gap-4 px-4">
        <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500">
          <Briefcase className="h-3.5 w-3.5" />
          Berufe
        </span>
        <span className="inline-block h-px w-8 bg-sand-300" />
        <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500">
          <GraduationCap className="h-3.5 w-3.5" />
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
    >
      <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-clay-600">
        Und vor allem…
      </p>
      <blockquote className="mx-auto max-w-2xl rounded-xl bg-sand-50 px-6 py-5 text-center ring-1 ring-sand-200">
        <p className="text-sm leading-relaxed text-charcoal-600">
          Neben unseren Mitgliedern, die beruflich Fuß gefasst haben, sind wir
          besonders stolz auf unsere{" "}
          <strong className="text-clay-700">Mamas</strong>. Sie widmen sich der
          wohl wichtigsten Aufgabe überhaupt — der Zukunft unserer Gesellschaft:
          unseren Kindern.
        </p>
        <span className="mt-2 inline-block text-xs italic text-charcoal-400">
          Möge Gott euch belohnen!
        </span>
      </blockquote>
    </motion.div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────
export function WerSindWirSection() {
  return (
    <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-sand-200 bg-cream-50/70 px-6 py-8 shadow-sm md:px-10 md:py-10">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h2 className="font-heading text-3xl font-bold leading-tight text-sage-800 md:text-4xl">
          Wer sind wir?
        </h2>
        <p className="mt-3 mx-auto max-w-2xl text-lg leading-relaxed text-charcoal-700">
          Ein aktiver muslimischer Mädchen- und Frauenverein im Herzen Berlins.
        </p>
      </div>

      {/* ── Unsere Mitglieder ── */}
      <section aria-labelledby="unsere-mitglieder">
        <h3
          id="unsere-mitglieder"
          className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.2em] text-sage-600"
        >
          Unsere Mitglieder
        </h3>
        <CountriesSection />
        <MarqueeSection />
        <IdentitiesSection />
      </section>

      {/* ── Verbindender Übergang ── */}
      <div className="my-10 flex flex-col items-center gap-3">
        <span className="block h-px w-16 bg-sand-300" />
        <p className="max-w-md text-center text-base italic leading-relaxed text-charcoal-500">
          Was all diese vielfältigen Frauen verbindet, sind unsere gemeinsamen
          Werte.
        </p>
        <span className="block h-px w-16 bg-sand-300" />
      </div>

      {/* ── Unsere Werte ── */}
      <section aria-labelledby="unsere-werte">
        <h3
          id="unsere-werte"
          className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.2em] text-clay-600"
        >
          Was uns verbindet
        </h3>
        <CoreValuesSection />
      </section>
    </div>
  );
}
