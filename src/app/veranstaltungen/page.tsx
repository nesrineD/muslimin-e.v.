"use client";

import { EventCard } from "@/components/landing/EventCard";
import { SocialMediaSection } from "@/components/SocialMediaSection";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animations";
import {
  Sparkles,
  Mic,
  Video,
  Moon,
  Flame,
  BookOpen,
  Library,
} from "lucide-react";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import type { BadgeVariant, EventBadge } from "@/types/events";

// -----------------------------
// Types
// -----------------------------

type EventFormat = "Online" | "Präsenz";

interface Event {
  id: string;
  name: string;
  teaser: string;
  description: string;
  regularity: string;
  targetAudience: string;
  format: EventFormat;
  icon: LucideIcon;
  badges: EventBadge[];
  accessNote: string;
  secondaryCtaLabel?: string;
}

// -----------------------------
// Data
// -----------------------------

const EVENTS: Event[] = [
  {
    id: "monatsvortrag",
    name: "Monatsvortrag",
    teaser:
      "Monatliche Vortragsreihe mit anschließender Diskussionsrunde – offen, vielfältig und dialogorientiert.",
    description:
      "Jeden letzten Sonntag eines Monats lädt Muslimin e.V. zu einer offenen Runde ein. Frauen verschiedener Altersgruppen und Konfessionen treffen sich seit 2013, um am 'Monatsvortrag' teilzunehmen. Hierbei werden verschiedene Themen angesprochen, wobei der Vortrag als Input für die anschließende Diskussionsrunde dient. Wir möchten einen Raum für Dialoge zwischen Frauen schaffen. Es werden sowohl religiöse als auch nicht-religiöse Inhalte behandelt. Daher laden wir gerne neben islamischen Geistlichen auch Expertinnen aus den jeweiligen Gebieten (z.B. Medizin, Naturwissenschaften, Ernährung usw.) als Rednerinnen ein.",
    regularity: "Jeden letzten Sonntag im Monat",
    targetAudience: "Frauen und Mädchen",
    format: "Präsenz",
    icon: Mic,
    badges: [
      { label: "Offen für alle Frauen & Mädchen", variant: "open" },
      { label: "Präsenz", variant: "presence" },
    ],
    accessNote:
      "Diese Veranstaltung ist offen für alle Frauen und Mädchen. Eine Mitgliedschaft ist nicht erforderlich.",
  },
  {
    id: "online-vortrag",
    name: "Online-Vortragsformat",
    teaser:
      "Monatlicher Online-Vortrag mit spirituellen Impulsen und internationalen Expertinnen.",
    description:
      "Besondere Zeiten erfordern besondere Formate. Angesichts der Corona-Pandemie sind wir mit unseren monatlichen Vorträgen zu Online-Veranstaltungen auf Zoom umgestiegen. Aufgrund der hohen, positiven Resonanz von Teilnehmerinnen auf bundesweiter Ebene bieten wir an jedem zweiten Dienstagabend eines Monats beginnend mit dem Bittgebet der Fürbitte (Dua Tawassul) einen lehrreichen Online-Vortrag an. Ein großer Vorteil: Gelehrte und Expertinnen aus unterschiedlichen Ländern stehen uns als Redner zur Verfügung.",
    regularity: "Jeden 2. Dienstag im Monat",
    targetAudience: "Frauen und Mädchen",
    format: "Online",
    icon: Video,
    badges: [
      { label: "Offen für alle Frauen & Mädchen", variant: "open" },
      { label: "Online", variant: "online" },
    ],
    accessNote:
      "Der Online-Vortrag ist offen für alle Frauen und Mädchen und kann bundesweit besucht werden.",
  },
  {
    id: "ramadan-connects",
    name: "Ramadan Connects",
    teaser:
      "Gemeinsames Fastenbrechen im Ramadan mit kreativem Programm, Begegnung und Vernetzung.",
    description:
      "Der heilige Monat Ramadan ist der neunte Monat des islamischen Kalenders. Damit wir das Gemeinschaftsgefühl stärken, findet jährlich ein gemeinsames Fastenbrechen unter Schwestern statt. Häufig in Kooperation mit anderen Frauenvereinen Berlins planen wir diese Veranstaltung. Gesellschaftsrelevante Themen werden durch Vorträge, Sketches, Gedichte, Poetry Slams etc. kreativ umgesetzt. Musikalische Einlagen (Nasheeds) schaffen eine spirituelle Atmosphäre. Nach dem gemeinsamen Fastenbrechen können Gäste verschiedene Verkaufs- und Informationsstände besuchen und sich mit Schwestern aus unterschiedlichen Gemeinden Berlins vernetzen.",
    regularity: "Jährlich im Ramadan",
    targetAudience: "Frauen und Mädchen",
    format: "Präsenz",
    icon: Moon,
    badges: [
      { label: "Anmeldung erforderlich", variant: "register" },
      { label: "Präsenz", variant: "presence" },
    ],
    accessNote:
      "Alle Frauen und Mädchen sind herzlich willkommen – unabhängig von einer Vereinsmitgliedschaft.",
  },
  {
    id: "aschura",
    name: "Aschura-Frauenveranstaltung",
    teaser:
      "Jährliche Gedenkveranstaltung mit Vorträgen, Trauerritualen und kulturellen Beiträgen.",
    description:
      "Die jährliche Aschura-Veranstaltung für Frauen und Mädchen ist ein fester Bestandteil unserer Arbeit. Anlass der Trauerzeremonie ist der Todestag vom Enkel des Propheten (F.), Imam Husain (F.), der mit seiner Familie und seinen engsten Gefährten am 10. Muharram sein Leben auf heldenhafte Weise für den Erhalt des Glaubens und der Gerechtigkeit hingab. Lehrreiche Vorträge, Trauergesänge (Latmiya), Audienzen (Ziyarat), Theaterstücke, Gedichte uvm. bilden den Inhalt des Programms und schaffen eine spirituelle Atmosphäre im Gedenken an den Herrn der Märtyrer (F.).",
    regularity: "Jährlich im Muharram",
    targetAudience: "Frauen und Mädchen",
    format: "Präsenz",
    icon: Flame,
    badges: [
      { label: "Anmeldung erforderlich", variant: "register" },
      { label: "Präsenz", variant: "presence" },
    ],
    accessNote:
      "Die Veranstaltung ist offen für alle Frauen und Mädchen, die gemeinsam innehalten und gedenken möchten.",
  },
  {
    id: "koran",
    name: "Koranunterricht für Frauen und Mädchen",
    teaser:
      "Strukturierter Koranunterricht in vier Niveaustufen – vom arabischen Alphabet bis Tajweed.",
    description:
      "Seit 2014 finden ein- bis zweimal jährlich Kurse des Koranunterrichts statt und erfreuen sich großer Beliebtheit. In vier verschiedenen Kursen mit unterschiedlichen Fähigkeitsstufen erlernen die Schülerinnen – je nach persönlichem Wissensniveau – das Lesen der arabischen Schrift bzw. die Tajweed-Regeln: Anfänger-Kurs (Arabisches Alphabet), A-Kurs (Fließendes Lesen), B-Kurs (Tajweed-Regeln), C-Kurs (Längen- und Pausenregeln). Der Kurs umfasst 12 Unterrichtseinheiten à 90 Minuten. Zum Abschluss legen die Schülerinnen eine kleine Prüfung ab und erhalten Urkunden und Geschenke. Ziel ist es, die Schülerinnen zu ermutigen, sich mit dem Koran in seiner Originalschrift auseinanderzusetzen.",
    regularity: "1–2x jährlich",
    targetAudience: "Frauen und Mädchen",
    format: "Präsenz",
    icon: BookOpen,
    badges: [
      { label: "Anmeldung erforderlich", variant: "register" },
      { label: "Begrenzte Plätze", variant: "limited" },
    ],
    accessNote:
      "Die Teilnehmerinnenzahl ist begrenzt. Eine vorherige Anmeldung ist erforderlich.",
  },
  {
    id: "lesezirkel",
    name: "Lesezirkel",
    teaser:
      "Gemeinsames Lesen islamischer Literatur in kleinen Gruppen und familiärer Atmosphäre.",
    description:
      "Islamische Bücher werden in kleinen Gruppen von maximal 10 Mitgliedern gelesen und in regelmäßigen Sitzungen vor Ort in familiärer Atmosphäre diskutiert. Die Lesezirkel bieten Raum für tiefgehende Auseinandersetzung mit islamischer Literatur, gemeinsames Lernen und Austausch über spirituelle Themen. In entspannter Atmosphäre werden verschiedene Werke von islamischen Gelehrten, zeitgenössischen Autorinnen und spiritueller Literatur gemeinsam erarbeitet.",
    regularity: "Regelmäßig",
    targetAudience: "Mitglieder",
    format: "Präsenz",
    icon: Library,
    badges: [
      { label: "Nur für Mitglieder", variant: "members" },
      { label: "Kleine Gruppen", variant: "limited" },
    ],
    accessNote:
      "Dieses Angebot richtet sich ausschließlich an Vereinsmitglieder.",
    secondaryCtaLabel: "Mitglied werden",
  },
];

// -----------------------------
// Page
// -----------------------------

export default function VeranstaltungenPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const regularEvents = EVENTS.slice(0, 2);
  const annualEvents = EVENTS.slice(2, 4);
  const educationEvents = EVENTS.slice(4);

  return (
    <motion.main
      className="min-h-screen bg-gradient-to-br from-sage-50 via-cream-50 to-warm-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4">
        {/* Hero */}
        <section className="py-20 md:py-24 text-center max-w-4xl mx-auto">
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sage-100 to-cream-100 border-2 border-sage-200 text-charcoal-800 rounded-full text-sm font-medium mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-sage-700" /> Gemeinschaft stärken
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-sage-700 via-sage-600 to-sage-700 bg-clip-text text-transparent">
              Unsere Veranstaltungen
            </h1>
            <p className="text-lg md:text-xl text-charcoal-700 mb-8">
              Unsere Angebote richten sich an Frauen und Mädchen. Viele
              Veranstaltungen sind offen für alle – einige erfordern eine
              Anmeldung oder Mitgliedschaft.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="px-4 py-2 bg-white rounded-full shadow-sm border-2 border-coral-200">
                <span className="font-bold text-coral-600">6</span> Formate
              </div>
              <div className="px-4 py-2 bg-white rounded-full shadow-sm border-2 border-coral-200">
                <span className="font-bold text-coral-600">2</span>{" "}
                Online-Optionen
              </div>
              <div className="px-4 py-2 bg-white rounded-full shadow-sm border-2 border-coral-200">
                <span className="font-bold text-coral-600">2</span> Offen für
                alle
              </div>
            </div>
          </motion.div>
        </section>

        {/* Sticky Category Navigation */}
        <motion.nav
          variants={itemVariants}
          className="sticky top-16 md:top-20 bg-white/95 backdrop-blur-sm shadow-sm z-40 py-4 mb-8 rounded-lg"
        >
          <div className="flex gap-2 overflow-x-auto px-4 scrollbar-hide">
            <a
              href="#regular-events"
              onClick={() => setActiveSection("regular")}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeSection === "regular"
                  ? "bg-sage-500 text-white"
                  : "bg-sage-50 text-sage-700 hover:bg-sage-100"
              }`}
            >
              Regelmäßig
            </a>
            <a
              href="#annual-events"
              onClick={() => setActiveSection("annual")}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeSection === "annual"
                  ? "bg-sage-500 text-white"
                  : "bg-sage-50 text-sage-700 hover:bg-sage-100"
              }`}
            >
              Jährlich
            </a>
            <a
              href="#education-events"
              onClick={() => setActiveSection("education")}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeSection === "education"
                  ? "bg-sage-500 text-white"
                  : "bg-sage-50 text-sage-700 hover:bg-sage-100"
              }`}
            >
              Bildung
            </a>
          </div>
        </motion.nav>

        {/* Regular */}
        <Section
          id="regular-events"
          title="Regelmäßige Vortragsreihen"
          subtitle="Monatliche Impulse – vor Ort oder online."
          events={regularEvents}
        />

        {/* Annual */}
        <Section
          id="annual-events"
          title="Jährliche Highlights"
          subtitle="Besondere Anlässe, die Gemeinschaft stärken."
          events={annualEvents}
        />

        {/* Education */}
        <Section
          id="education-events"
          title="Bildung & Entwicklung"
          subtitle="Vertiefe dein Wissen in familiärer Atmosphäre."
          events={educationEvents}
          centered
        />

        {/* Social Media Section */}
        <motion.section
          variants={itemVariants}
          className="py-16 px-4"
        >
          <div className="max-w-6xl mx-auto">
            <div className="py-12 px-6 sm:px-8 bg-gradient-to-br from-sage-50 via-cream-50 to-sage-100/80 rounded-2xl shadow-lg border-2 border-sage-200">
              <SocialMediaSection 
                variant="compact" 
                showTitle={true}
                title="Eindrücke von unseren Veranstaltungen 📸"
                subtitle="Fotos, Videos und aktuelle Termine findest du auf unseren Social-Media-Kanälen"
              />
            </div>
          </div>
        </motion.section>
      </div>
    </motion.main>
  );
}

// -----------------------------
// Reusable Section
// -----------------------------

function Section({
  id,
  title,
  subtitle,
  events,
  centered = false,
}: {
  id: string;
  title: string;
  subtitle: string;
  events: Event[];
  centered?: boolean;
}) {
  return (
    <section id={id} className="py-10 md:py-12 scroll-mt-24">
      <motion.div variants={itemVariants} className="max-w-7xl mx-auto">
        <div className={centered ? "text-center mb-10" : "mb-10"}>
          <h2 className="text-3xl font-bold text-charcoal-900 mb-3">{title}</h2>
          <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        <div
          className={`grid gap-8 ${
            events.length === 1
              ? "md:grid-cols-1 max-w-2xl mx-auto"
              : "md:grid-cols-2"
          }`}
        >
          {events.map((event) => (
            <motion.div key={event.id} variants={itemVariants}>
              <EventCard {...event} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
