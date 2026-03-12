"use client";

import { EventCard } from "@/components/landing/EventCard";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animations";
import {
  PUBLIC_PAGE_WRAPPER_CLASS,
  SECTION_HERO_SPACING,
  SECTION_CONTENT_SPACING,
  SECTION_CTA_SPACING,
  CLOSING_SECTION_SURFACE_CLASS,
} from "@/lib/page-config";
import { SocialMediaSection } from "@/components/SocialMediaSection";
import { PageHeading } from "@/components/ui/page-heading";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionDivider } from "@/components/ui/section-divider";
import { DecorativeAccents } from "@/components/ui/decorative-accents";
import { AnimatedWrapper } from "@/components/ui/animated-wrapper";
import { SectionBand } from "@/components/ui/section-band";
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
      src: "/images/veranstaltungen/gemeinschaft-gebet.jpg",
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
      src: "/images/veranstaltungen/gemeinschaft-vortrag.jpg",
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
      src: "/images/veranstaltungen/gemeinschaft-saal-1.jpg",
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
      src: "/images/veranstaltungen/gemeinschaft-aschura.jpg",
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
          <DecorativeAccents preset="hero" />
          <motion.div
            variants={itemVariants}
            className="max-w-5xl mx-auto text-center relative z-10"
          >
            <PageHeading
              title="Unsere Veranstaltungen"
              accentWord="Veranstaltungen"
              className="mb-6"
            />
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
                  src="/images/veranstaltungen/gemeinschaft-saal-2.jpg"
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

        <SectionDivider variant="wave" />

        {/* Regular */}
        <SectionBand variant="alternate">
          <Section
            id="regular-events"
            title="Regelmäßige Veranstaltungen"
            subtitle="Monatliche Impulse — vor Ort oder online."
            events={regularEvents}
          />
        </SectionBand>

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
          className={`${SECTION_CTA_SPACING} relative overflow-hidden`}
        >
          <div
            className={`relative mx-auto max-w-5xl px-8 py-10 ${CLOSING_SECTION_SURFACE_CLASS}`}
          >
            <DecorativeAccents preset="closing" />
            <SocialMediaSection
              variant="compact"
              showTitle={true}
              title="Keine Veranstaltung verpassen"
              subtitle="Folge uns auf Social Media für aktuelle Termine, Flyer und Einblicke"
              theme="dark"
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
}: {
  id: string;
  title: string;
  subtitle: string;
  events: Event[];
}) {
  return (
    <section id={id} className={`${SECTION_CONTENT_SPACING} scroll-mt-24`}>
      <motion.div variants={itemVariants} className="max-w-5xl mx-auto">
        <div className="mb-10">
          <SectionHeading title={title} subtitle={subtitle} />
        </div>
        <div className="space-y-12">
          {events.map((event, idx) => (
            <AnimatedWrapper
              key={event.id}
              animation={idx % 2 === 0 ? "slide-in-left" : "slide-in-right"}
            >
              <div
                className={`flex flex-col md:flex-row ${
                  idx % 2 !== 0 ? "md:flex-row-reverse" : ""
                } overflow-hidden rounded-xl border border-sand-200 shadow-sm`}
              >
                <div className="relative aspect-[4/3] md:aspect-auto md:w-1/2 flex-shrink-0">
                  <Image
                    src={event.image.src}
                    alt={event.image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="md:w-1/2 [&>div]:rounded-none [&>div]:border-0 [&>div]:shadow-none">
                  <EventCard {...event} />
                </div>
              </div>
            </AnimatedWrapper>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
