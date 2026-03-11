"use client";

import { EventCard } from "@/components/landing/EventCard";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animations";
import {
  PUBLIC_PAGE_WRAPPER_CLASS,
  SECTION_HERO_SPACING,
  SECTION_CONTENT_SPACING,
  SECTION_CTA_SPACING,
} from "@/lib/page-config";
import { SocialMediaSection } from "@/components/SocialMediaSection";
import { Mic, Video, Moon, Flame } from "lucide-react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import type { EventBadge } from "@/types/events";

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
  image: { src: string; alt: string };
}

// -----------------------------
// Data
// -----------------------------

const EVENTS: Event[] = [
  {
    id: "monatsvortrag",
    name: "Monatsvortrag",
    teaser:
      "Monatliche Vorträge mit anschließender Diskussionsrunde – offen, vielfältig und dialogorientiert.",
    description:
      "Jeden letzten Sonntag eines Monats lädt Muslimin e.V. zu einer offenen Runde ein. Frauen verschiedener Altersgruppen und Konfessionen treffen sich seit 2013, um am 'Monatsvortrag' teilzunehmen. Hierbei werden verschiedene Themen angesprochen, wobei der Vortrag als Input für die anschließende Diskussionsrunde dient. Wir möchten einen Raum für Dialoge zwischen Frauen schaffen. Es werden sowohl religiöse als auch nicht-religiöse Inhalte behandelt. Daher laden wir gerne neben islamischen Geistlichen auch Expertinnen aus den jeweiligen Gebieten (z.B. Medizin, Naturwissenschaften, Ernährung usw.) als Rednerinnen ein.",
    regularity: "Jeden letzten Sonntag im Monat",
    targetAudience: "Frauen und Mädchen",
    format: "Präsenz",
    icon: Mic,
    badges: [
      { label: "ohne Anmeldung", variant: "open" },
      { label: "vor Ort", variant: "presence" },
    ],
    accessNote:
      "Diese Veranstaltung ist offen für alle Frauen und Mädchen. Eine Mitgliedschaft ist nicht erforderlich.",
    image: {
      src: "/images/veranstaltungen/frauenkreis-juni-2025.jpeg",
      alt: "Monatsvortrag – Muslimin e.V.",
    },
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
      { label: "ohne Anmeldung", variant: "open" },
      { label: "Online", variant: "online" },
    ],
    accessNote:
      "Der Online-Vortrag ist offen für alle Frauen und Mädchen und kann bundesweit besucht werden.",
    image: {
      src: "/images/veranstaltungen/workshop-august-2025.jpeg",
      alt: "Online-Vortragsformat – Muslimin e.V.",
    },
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
      { label: "mit Anmeldung", variant: "register" },
      { label: "vor Ort", variant: "presence" },
    ],
    accessNote:
      "Alle Frauen und Mädchen sind herzlich willkommen – unabhängig von einer Vereinsmitgliedschaft.",
    image: {
      src: "/images/veranstaltungen/sommerfest-juni-2025.jpeg",
      alt: "Ramadan Connects – gemeinsames Fastenbrechen",
    },
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
      { label: "mit Anmeldung", variant: "register" },
      { label: "vor Ort", variant: "presence" },
    ],
    accessNote:
      "Die Veranstaltung ist offen für alle Frauen und Mädchen, die gemeinsam innehalten und gedenken möchten.",
    image: {
      src: "/images/veranstaltungen/herbstkonferenz-september-2025.jpeg",
      alt: "Aschura-Frauenveranstaltung – Muslimin e.V.",
    },
  },
];

// -----------------------------
// Page
// -----------------------------

export default function VeranstaltungenPage() {
  const regularEvents = EVENTS.slice(0, 2);
  const annualEvents = EVENTS.slice(2, 4);

  return (
    <motion.main
      className={PUBLIC_PAGE_WRAPPER_CLASS}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4">
        {/* Hero */}
        <section className={`relative ${SECTION_HERO_SPACING} overflow-hidden`}>
          <motion.div
            variants={itemVariants}
            className="max-w-5xl mx-auto text-center relative z-10"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-charcoal-800 leading-tight">
              Unsere <span className="text-sage-700">Veranstaltungen</span>
            </h1>
            <p className="text-xl md:text-2xl text-charcoal-700 mb-6 max-w-3xl mx-auto leading-relaxed">
              Unsere Angebote richten sich an Frauen und Mädchen. Viele
              Veranstaltungen sind offen für alle – einige erfordern eine
              Anmeldung oder Mitgliedschaft.
            </p>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-14 max-w-4xl mx-auto"
            >
              <div className="relative aspect-[16/7] rounded-2xl overflow-hidden border border-sand-200 shadow-sm">
                <Image
                  src="/images/veranstaltungen/herbstkonferenz-september-2025.jpeg"
                  alt="Veranstaltungen – Muslimin e.V. Gemeinschaft in Berlin"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Regular */}
        <Section
          id="regular-events"
          title="Regelmäßige Veranstaltungen"
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

        {/* CTA Section — Social Media */}
        <motion.section
          variants={itemVariants}
          className={`${SECTION_CTA_SPACING} px-4`}
        >
          <div className="max-w-3xl mx-auto bg-white rounded-2xl py-12 px-6 sm:px-8 border border-sand-200 shadow-sm">
            <SocialMediaSection
              variant="compact"
              showTitle={true}
              title="Keine Veranstaltung verpassen"
              subtitle="Folge uns auf Social Media für aktuelle Termine, Flyer und Einblicke"
            />
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
    <section id={id} className={`${SECTION_CONTENT_SPACING} scroll-mt-24`}>
      <motion.div variants={itemVariants} className="max-w-7xl mx-auto">
        <div className={centered ? "text-center mb-10" : "mb-10"}>
          <h2 className="text-3xl font-bold mb-3 text-charcoal-800">{title}</h2>
          <p className="text-lg text-charcoal-700 max-w-2xl mx-auto">
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
              <div className="overflow-hidden rounded-xl border border-sand-200 shadow-sm">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={event.image.src}
                    alt={event.image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="[&>div]:rounded-none [&>div]:border-0 [&>div]:shadow-none">
                  <EventCard {...event} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
