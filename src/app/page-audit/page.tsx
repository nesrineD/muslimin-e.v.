"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Score Data ──────────────────────────────────────────────────────────────

const DIMENSIONS = [
  {
    id: "structure",
    label: "Information Architecture",
    icon: "◈",
    score: 88,
    weightPct: 25,
    color: "#5b6960",
    lightColor: "#e3e6e3",
    summary:
      "The page follows a clear top-to-bottom narrative: hero → identity → philosophy → goals → stats → CTA. Each section has a distinct purpose with no ambiguity about reading order.",
    strengths: [
      "Logical flow: Wer sind wir → Philosophie → Kernziele → Zahlen → CTA mirrors the user journey from curiosity to conversion",
      "Semantic HTML with aria-labelledby on internal sections (Unsere Mitglieder, Unsere Werte)",
      "SectionDivider accent-lines create perceptible visual breaks between thematic zones",
      "SectionBand alternate-surface adds rhythm variety without breaking layout coherence",
      "Hero subtitle functions as a proper orienting statement (who, where, since when)",
    ],
    issues: [
      {
        severity: "medium",
        label: "Missing breadcrumb / page-level landmark nav",
        detail:
          "On a long page with 5 distinct sections, in-page anchor links or a sticky mini-TOC would dramatically reduce cognitive load for returning visitors.",
      },
      {
        severity: "low",
        label: "WerSindWir section nests 4 sub-sections without a clear visual entry point",
        detail:
          "CountriesSection, MarqueeSection, IdentitiesSection, CoreValuesSection are all inside one rounded card — the transition between them relies solely on copy, not spatial separation.",
      },
      {
        severity: "low",
        label: "Kernziele card grid is not ordered by importance",
        detail:
          "Religiöse Bildung → Muslimische Identität → Austausch → Geschützter Raum reads as arbitrary. A deliberate ordering (e.g. spiritual → communal → protective) would reinforce hierarchy.",
      },
    ],
  },
  {
    id: "visual",
    label: "Visual Design Quality",
    icon: "◉",
    score: 79,
    weightPct: 25,
    color: "#9c604d",
    lightColor: "#f4ebe5",
    summary:
      "The palette is coherent and on-brand (sage, sand, cream, clay, charcoal). Typography pairing (Newsreader/Inter) is sophisticated. Some sections suffer from density and visual noise.",
    strengths: [
      "Newsreader (serif heading) + Inter (sans body) is an excellent editorial pairing — warm, credible, readable",
      "5-color system (sage, sand, cream, clay, charcoal) is correctly limited and consistently applied",
      "Animated counters in the stats section add delight without feeling gratuitous",
      "Marquee profession tags deliver high information density in a visually engaging way",
      "Subtle shadows (shadow-sm, ring-1) and rounded-2xl surfaces give depth without heaviness",
      "Framer Motion entrance animations are well-tuned (ease [0.16, 1, 0.3, 1], reasonable delays)",
    ],
    issues: [
      {
        severity: "high",
        label: "Hero section carries zero visual weight beyond text",
        detail:
          "The hero has a paragraph and a heading against an empty gradient background. There is no image, no illustration, no decorative element that grounds the brand emotionally. DecorativeAccents preset='hero' is present in code but appears to render abstract blobs — insufficient for a community-driven Über-uns page.",
      },
      {
        severity: "medium",
        label: "WerSindWir and Kernziele both use identical rounded-2xl + border + cream card treatment",
        detail:
          "When two consecutive major sections share the same visual container style, they blur into each other. One should differ in surface, color, or edge treatment to maintain distinctiveness.",
      },
      {
        severity: "medium",
        label: "Kernziele card descriptions are too short (single line of text)",
        detail:
          "Each goal card has a rich icon and bold title but the description ('Wissen vertiefen und spirituelle Entwicklung fördern') is only ~7 words. At p-8 padding this creates large uncomfortable whitespace within each card.",
      },
      {
        severity: "low",
        label: "Country tag font-size inconsistency",
        detail:
          "CountriesSection renders country tags at text-sm but MarqueeSection also uses text-sm for job tags. The cognitive hierarchy between 'member origins' and 'member professions' is lost — these deserve different weights or sizes.",
      },
    ],
  },
  {
    id: "hierarchy",
    label: "Content Hierarchy & Readability",
    icon: "◐",
    score: 84,
    weightPct: 20,
    color: "#495449",
    lightColor: "#e3e6e3",
    summary:
      "Type scale is well-differentiated (4xl-6xl H1, 3xl-4xl H2, xl H3, sm/xs body). Color contrast ratios are generally adequate. A few density issues and paragraph length violations exist.",
    strengths: [
      "H1 at text-4xl md:text-6xl with tracking-tight is appropriately commanding for a page heading",
      "Uppercase tracking-[0.2em] label treatment ('Zahlen & Fakten', 'Was uns verbindet') is a polished micro-typographic pattern",
      "Blockquote with border-l-4 border-clay-300 pl-5 creates a clear pull-quote cadence in the Philosophie section",
      "leading-relaxed on body paragraphs (1.625 line-height) is correct for German text which has long compound words",
      "Animated counter labels use uppercase tracking-wide which maintains visual hierarchy against the large numerals",
    ],
    issues: [
      {
        severity: "high",
        label: "Hero subtitle text-xl md:text-2xl at text-charcoal-700 may fail WCAG AA on sand gradient",
        detail:
          "charcoal-700 (#3d3834) on the sand/cream gradient background produces an estimated contrast ratio of ~4.1:1. WCAG AA requires 4.5:1 for normal text. At 20-24px it passes AA Large but the gradient makes it border-line.",
      },
      {
        severity: "medium",
        label: "WerSindWir intro paragraph ('Ein aktiver muslimischer…') is too brief to establish context",
        detail:
          "The section heading and subtitle are one line each. After that the page immediately dives into 16-country data. A 2-3 sentence orienting paragraph about what makes the membership special would create a better reading rhythm.",
      },
      {
        severity: "low",
        label: "IdentitiesSection 'Und vor allem…' micro-label lacks visual anchor",
        detail:
          "The clay-600 uppercase text appears floating between the MarqueeSection and the blockquote without a divider or icon. The intent is clear in code but visually it reads as an orphaned label.",
      },
    ],
  },
  {
    id: "information",
    label: "Information Presentation",
    icon: "◎",
    score: 82,
    weightPct: 20,
    color: "#3c443c",
    lightColor: "#e3e6e3",
    summary:
      "Data is shown through multiple complementary formats (tags, marquees, counters, blockquote, icon cards) — this variety keeps the page engaging. Some data lacks contextual framing.",
    strengths: [
      "Animated counters (14+ Jahre, 60+ Mitglieder, 100+ Veranstaltungen, 500 Gäste) efficiently communicate scale at a glance",
      "Staggered tag animation in CountriesSection turns a simple list into a memorable reveal moment",
      "Dual-track marquee (Berufe / Studienfächer) efficiently conveys member diversity without dominating the layout",
      "SplitSection (image + blockquote + narrative) is the correct pattern for a 'philosophy' moment — visual + intellectual",
      "Founding timeline (2011 initiative → 2018 registered) embedded naturally in paragraph rather than in a rigid timeline component — reads more human",
    ],
    issues: [
      {
        severity: "high",
        label: "No team or leadership section",
        detail:
          "An Über-uns page for an NGO without named members, board members, or faces loses significant trust signal. Users want to know who is behind the organisation. Even 3-4 avatars with names and roles would dramatically increase credibility.",
      },
      {
        severity: "high",
        label: "Statistics have no source / timeframe annotations",
        detail:
          "'100+ Veranstaltungen' and '60+ Mitglieder' — as of when? The sub-labels are inconsistent: 2 stats have sub-text, 2 don't. Without dates these feel unverifiable and reduce trust.",
      },
      {
        severity: "medium",
        label: "Philosophie SplitSection uses a stock-looking event photo",
        detail:
          "The image '/images/veranstaltungen/gemeinschaft-performance.jpg' is borrowed from the events section. The Über-uns page deserves a dedicated image that reflects the organisation's day-to-day warmth and people — not a staged performance shot.",
      },
    ],
  },
  {
    id: "ux",
    label: "UX & Conversion",
    icon: "◆",
    score: 72,
    weightPct: 10,
    color: "#9a8b74",
    lightColor: "#f5f1ec",
    summary:
      "The CTA architecture is functional but passive. There is only one CTA surface (at the very bottom) and the conversion path is late. The page does not capitalise on multiple micro-conversion opportunities.",
    strengths: [
      "CTA section is visually distinct (dark sage surface, high contrast) and correctly placed after the trust-building stats",
      "Two CTA buttons (Mitglied werden / Veranstaltungen) provide a primary and secondary path correctly",
      "Button sizing (size='lg') and color contrast on dark surface are correct",
      "data-cta='primary' attribute on the main CTA button shows conversion tracking awareness",
    ],
    issues: [
      {
        severity: "high",
        label: "Single CTA at the end of a ~1800px scroll creates a long dead zone",
        detail:
          "The first 70% of the page has zero conversion touchpoints. A soft mid-page CTA after the Kernziele section ('Neugierig? Komm zu einem unserer Events.') would capture users who are convinced early and don't scroll to the bottom.",
      },
      {
        severity: "high",
        label: "No social proof (testimonials, press mentions, partner logos)",
        detail:
          "The page makes strong claims about community and belonging but shows no evidence from the community itself. Even 2 short member quotes would provide the social validation that drives conversion for community organisations.",
      },
      {
        severity: "medium",
        label: "Veranstaltungen secondary button hover state (hover:bg-sage-600) creates a filled button",
        detail:
          "Outline buttons should not fill on hover as it visually elevates the secondary action above the primary. The hover state should be a subtle border-thickening or text-brightness change instead.",
      },
    ],
  },
];

const SEVERITY_META: Record<string, { label: string; color: string; bg: string }> = {
  high: { label: "High", color: "#9c604d", bg: "#faf5f2" },
  medium: { label: "Medium", color: "#5b6960", bg: "#f6f7f6" },
  low: { label: "Low", color: "#9a8b74", bg: "#faf8f5" },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getScoreLabel(score: number) {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Strong";
  if (score >= 70) return "Good";
  if (score >= 60) return "Needs Work";
  return "Poor";
}

function getScoreColor(score: number) {
  if (score >= 85) return "#5b6960";
  if (score >= 75) return "#9a8b74";
  if (score >= 65) return "#9c604d";
  return "#c0392b";
}

// ─── Radial Score Ring ────────────────────────────────────────────────────────

function ScoreRing({
  score,
  size = 120,
  strokeWidth = 8,
  color,
}: {
  score: number;
  size?: number;
  strokeWidth?: number;
  color: string;
}) {
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - score / 100);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`Score: ${score}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#e3e6e3"
        strokeWidth={strokeWidth}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{ transformOrigin: "center", rotate: "-90deg" }}
      />
    </svg>
  );
}

// ─── Score Bar ────────────────────────────────────────────────────────────────

function ScoreBar({ score, color }: { score: number; color: string }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-[#e3e6e3] overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      />
    </div>
  );
}

// ─── Dimension Card ───────────────────────────────────────────────────────────

function DimensionCard({ dim }: { dim: (typeof DIMENSIONS)[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-[#ebe4d9] bg-white overflow-hidden"
      style={{ boxShadow: "0 2px 12px rgba(91,105,96,0.06)" }}
    >
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Score ring */}
          <div className="relative shrink-0">
            <ScoreRing score={dim.score} size={72} strokeWidth={6} color={dim.color} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold leading-none" style={{ color: dim.color }}>
                {dim.score}
              </span>
            </div>
          </div>

          {/* Meta */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-semibold uppercase tracking-[0.15em] text-[#9a8b74]">
                {dim.icon} {dim.id}
              </span>
              <span
                className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: dim.lightColor, color: dim.color }}
              >
                {getScoreLabel(dim.score)}
              </span>
            </div>
            <h2 className="mt-1 text-base font-semibold text-[#322e2a] leading-snug">
              {dim.label}
            </h2>
            <div className="mt-2">
              <ScoreBar score={dim.score} color={dim.color} />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-[#9a8b74]">Weight: {dim.weightPct}%</span>
                <span className="text-xs font-medium" style={{ color: dim.color }}>
                  {dim.score}/100
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-[#495057]">{dim.summary}</p>
      </div>

      {/* Toggle */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-6 py-3 border-t border-[#ebe4d9] text-xs font-semibold uppercase tracking-[0.12em] text-[#5b6960] hover:bg-[#f6f7f6] transition-colors"
        aria-expanded={open}
        aria-controls={`findings-${dim.id}`}
      >
        <span>{open ? "Hide detail" : "Show findings"}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-[#9a8b74]"
        >
          ▾
        </motion.span>
      </button>

      <div id={`findings-${dim.id}`}>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="detail"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-2 space-y-6">
                {/* Strengths */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#5b6960] mb-3">
                    Strengths
                  </p>
                  <ul className="space-y-2">
                    {dim.strengths.map((s, i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-[#495057] leading-relaxed">
                        <span className="mt-1 shrink-0 h-1.5 w-1.5 rounded-full bg-[#5b6960]" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Issues */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#9c604d] mb-3">
                    Issues Found
                  </p>
                  <div className="space-y-3">
                    {dim.issues.map((issue, i) => {
                      const meta = SEVERITY_META[issue.severity];
                      return (
                        <div
                          key={i}
                          className="rounded-xl p-4"
                          style={{ background: meta.bg, border: `1px solid ${meta.color}22` }}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <span
                              className="text-xs font-semibold px-2 py-0.5 rounded-full"
                              style={{ background: `${meta.color}18`, color: meta.color }}
                            >
                              {meta.label}
                            </span>
                            <span className="text-sm font-semibold text-[#322e2a]">
                              {issue.label}
                            </span>
                          </div>
                          <p className="text-xs leading-relaxed text-[#6c757d]">{issue.detail}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

// ─── Priority Recommendations ─────────────────────────────────────────────────

const RECOMMENDATIONS = [
  {
    priority: 1,
    tierColor: "#9c604d",
    tierTextColor: "white",
    impact: "Trust",
    title: "Add a team / leadership section with real faces",
    description:
      "An NGO without named individuals visible on the Über-uns page loses the single greatest trust signal. Add 3-5 cards with photo, name, and role. Even initials-based avatars are better than none.",
    effort: "Medium",
  },
  {
    priority: 2,
    tierColor: "#5b6960",
    tierTextColor: "white",
    impact: "Credibility",
    title: "Add timestamps and sources to all statistics",
    description:
      "Annotate counters with a 'Stand: 2025' or 'seit Vereinsgründung' sub-label. Inconsistent sub-labels (2 of 4 stats have them) signal carelessness. Uniform annotations signal rigour.",
    effort: "Low",
  },
  {
    priority: 3,
    tierColor: "#9a8b74",
    tierTextColor: "white",
    impact: "Conversion",
    title: "Insert a mid-page soft CTA after Kernziele",
    description:
      "After the four goal cards, add a single-line CTA link: 'Neugierig? Komm zu einem unserer Events →' This captures convinced mid-scroll users before they scroll fatigue away from the page.",
    effort: "Low",
  },
  {
    priority: 4,
    tierColor: "#ced4da",
    tierTextColor: "#495057",
    impact: "Visual Identity",
    title: "Replace event-borrowed hero & philosophy images with identity-specific photography",
    description:
      "The hero has no image; the Philosophie section reuses an events photo. Commission or source 1-2 images that show the community in day-to-day moments: discussions, workshops, warmth.",
    effort: "High",
  },
  {
    priority: 5,
    tierColor: "#ced4da",
    tierTextColor: "#495057",
    impact: "Social Proof",
    title: "Add 2-3 member testimonials",
    description:
      "Short quotes from real members ('Was mich am meisten überrascht hat war…') provide social validation that is impossible to fake. Place after the Statistiken section before the CTA.",
    effort: "Medium",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PageAudit() {
  const weightedScore = Math.round(
    DIMENSIONS.reduce((sum, d) => sum + d.score * (d.weightPct / 100), 0)
  );
  const label = getScoreLabel(weightedScore);
  const scoreColor = getScoreColor(weightedScore);

  return (
    <div className="min-h-screen bg-[#faf8f5] font-sans">
      {/* ── Top Bar ── */}
      <header className="sticky top-0 z-40 border-b border-[#ebe4d9] bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[#9a8b74]">
              UX Audit
            </span>
            <span className="text-[#ebe4d9]">|</span>
            <span className="text-sm font-semibold text-[#322e2a]">
              /uber-uns — Muslimin e.V.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#9a8b74]">Overall</span>
            <span
              className="text-sm font-bold px-2.5 py-0.5 rounded-full"
              style={{ background: `${scoreColor}18`, color: scoreColor }}
            >
              {weightedScore}/100
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-5xl">

        {/* ── Hero Score ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="rounded-3xl border border-[#ebe4d9] bg-white overflow-hidden"
            style={{ boxShadow: "0 4px 24px rgba(91,105,96,0.08)" }}>
            <div className="p-8 md:p-10">
              {/* Label */}
              <p className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#9a8b74] mb-4">
                Senior UX / UI Design Audit · April 2026
              </p>

              <div className="flex flex-col md:flex-row md:items-center gap-8">
                {/* Big ring */}
                <div className="relative shrink-0 self-start">
                  <ScoreRing score={weightedScore} size={160} strokeWidth={10} color={scoreColor} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold leading-none" style={{ color: scoreColor }}>
                      {weightedScore}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#9a8b74] mt-1">
                      / 100
                    </span>
                  </div>
                </div>

                {/* Right block */}
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-[#322e2a] leading-tight mb-2">
                    {label} page — with clear improvement headroom
                  </h1>
                  <p className="text-base leading-relaxed text-[#495057] max-w-2xl">
                    The /uber-uns page demonstrates strong structural foundations — coherent information architecture, a consistent design system, and well-implemented micro-interactions. The primary gaps are in trust-building elements (no team section, no testimonials) and conversion architecture (single bottom CTA, no mid-page touchpoints). These are high-ROI, low-effort improvements.
                  </p>

                  {/* Mini score grid */}
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
                    {DIMENSIONS.map((d) => (
                      <div key={d.id} className="rounded-xl border border-[#ebe4d9] px-3 py-3 text-center bg-[#faf8f5]">
                        <div className="text-xl font-bold" style={{ color: d.color }}>
                          {d.score}
                        </div>
                        <div className="text-[10px] font-semibold uppercase tracking-wide text-[#9a8b74] mt-0.5 leading-tight">
                          {d.label.split(" ")[0]}
                        </div>
                        <div className="mt-1.5">
                          <ScoreBar score={d.score} color={d.color} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Issue count strip */}
            <div className="border-t border-[#ebe4d9] bg-[#faf8f5] px-8 md:px-10 py-4">
              <div className="flex flex-wrap gap-6 text-sm">
                {(["high", "medium", "low"] as const).map((sev) => {
                  const count = DIMENSIONS.flatMap((d) => d.issues).filter(
                    (i) => i.severity === sev
                  ).length;
                  const meta = SEVERITY_META[sev];
                  return (
                    <div key={sev} className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: meta.color }}
                      />
                      <span className="font-semibold" style={{ color: meta.color }}>
                        {count}
                      </span>
                      <span className="text-[#9a8b74]">{meta.label} severity</span>
                    </div>
                  );
                })}
                <div className="flex items-center gap-2 ml-auto">
                  <span className="h-2 w-2 rounded-full bg-[#5b6960]" />
                  <span className="font-semibold text-[#5b6960]">
                    {DIMENSIONS.flatMap((d) => d.strengths).length}
                  </span>
                  <span className="text-[#9a8b74]">strengths identified</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── Dimension Cards ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-lg font-bold text-[#322e2a]">Evaluation Dimensions</h2>
            <span className="text-xs font-mono text-[#9a8b74]">— 5 weighted metrics</span>
          </div>
          <div className="space-y-4">
            {DIMENSIONS.map((dim) => (
              <DimensionCard key={dim.id} dim={dim} />
            ))}
          </div>
        </section>

        {/* ── Priority Recommendations ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-lg font-bold text-[#322e2a]">Priority Recommendations</h2>
            <span className="text-xs font-mono text-[#9a8b74]">— ranked by impact / effort</span>
          </div>

          <div className="space-y-3">
            {RECOMMENDATIONS.map((rec, i) => (
              <motion.div
                key={rec.priority}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-[#ebe4d9] bg-white overflow-hidden flex"
                style={{ boxShadow: "0 2px 8px rgba(91,105,96,0.04)" }}
              >
                {/* Priority strip */}
                <div
                  className="w-12 shrink-0 flex items-center justify-center text-sm font-bold"
                  style={{ background: rec.tierColor, color: rec.tierTextColor }}
                >
                  {rec.priority}
                </div>

                <div className="px-5 py-4 flex-1">
                  <div className="flex items-start gap-3 flex-wrap">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#9a8b74]">
                          Impact: {rec.impact}
                        </span>
                        <span
                          className="text-[10px] font-semibold uppercase tracking-[0.12em] px-1.5 py-0.5 rounded"
                          style={{
                            background: rec.effort === "Low" ? "#e3e6e3" : rec.effort === "Medium" ? "#f4ebe5" : "#faf5f2",
                            color: rec.effort === "Low" ? "#5b6960" : rec.effort === "Medium" ? "#9c604d" : "#9c604d",
                          }}
                        >
                          {rec.effort} effort
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-[#322e2a]">{rec.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-[#6c757d]">{rec.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Methodology ── */}
        <section>
          <div
            className="rounded-2xl border border-[#ebe4d9] bg-[#faf8f5] px-6 py-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a8b74] mb-3">
              Methodology
            </p>
            <p className="text-sm leading-relaxed text-[#495057]">
              This audit evaluated the page across 5 dimensions derived from Nielsen Norman Group heuristics, WCAG 2.1 accessibility standards, and charity/NGO-specific conversion research. Each dimension was scored 0-100 and assigned a weight reflecting its importance to the page goal (educating prospective members and converting them to sign up). Scores are based on static code analysis of the full component tree (page.tsx, WerSindWirSection.tsx, and all referenced UI primitives), design token inspection (tailwind.config.ts, globals.css), and content review.
            </p>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
              {DIMENSIONS.map((d) => (
                <div key={d.id} className="flex items-center gap-1.5 text-[#9a8b74]">
                  <span className="font-semibold" style={{ color: d.color }}>{d.weightPct}%</span>
                  <span>{d.label.split(" ")[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
