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
import { Mic, Moon, Flame } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import type { EventBadge } from "@/types/events";

// -----------------------------
// Types
// -----------------------------

type EventFormat = "Online" | "Präsenz";
type EventImage = {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
  objectPosition?: string;
};

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
  image: EventImage;
  gallery?: EventImage[];
}

// -----------------------------
// Data
// -----------------------------

const EVENTS: Event[] = [
  {
    id: "monatsvortrag",
    name: "Monatsvortrag",
    teaser:
      "Monatliche Vorträge mit anschließender Diskussionsrunde – meist vor Ort, bei passenden Formaten auch online.",
    description:
      "Jeden letzten Sonntag eines Monats lädt Muslimin e.V. zu einer offenen Runde ein. Frauen verschiedener Altersgruppen und Konfessionen treffen sich seit 2013, um am 'Monatsvortrag' teilzunehmen. Hierbei werden verschiedene Themen angesprochen, wobei der Vortrag als Input für die anschließende Diskussionsrunde dient. Wir möchten einen Raum für Dialoge zwischen Frauen schaffen. Es werden sowohl religiöse als auch nicht-religiöse Inhalte behandelt. Daher laden wir gerne neben islamischen Geistlichen auch Expertinnen aus den jeweiligen Gebieten (z.B. Medizin, Naturwissenschaften, Ernährung usw.) als Rednerinnen ein. Besondere Zeiten erfordern besondere Formate: Deshalb finden einzelne Vorträge auch online über Zoom statt. Durch die positive Resonanz von Teilnehmerinnen auf bundesweiter Ebene können so auch Gelehrte und Expertinnen aus unterschiedlichen Ländern als Rednerinnen eingebunden werden.",
    regularity: "Monatlich, meist vor Ort",
    targetAudience: "Frauen und Mädchen",
    format: "Präsenz",
    icon: Mic,
    badges: [
      { label: "ohne Anmeldung", variant: "open" },
      { label: "vor Ort / online", variant: "online" },
    ],
    accessNote:
      "Diese Veranstaltung ist offen für alle Frauen und Mädchen. Eine Mitgliedschaft ist nicht erforderlich. Wenn der Vortrag online stattfindet, kann er bundesweit besucht werden.",
    image: {
      src: "/images/veranstaltungen/Fatimiyya.jpg",
      alt: "Fatimiyya-Veranstaltung – Monatsvortrag bei Muslimin e.V.",
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
      src: "/images/veranstaltungen/Ramadan%20Connects/IMG_0057%20(2025-03-16T12_08_32.433).JPG",
      alt: "Ramadan Connects – dekorierter Veranstaltungsbereich",
    },
    gallery: [
      {
        src: "/images/veranstaltungen/Ramadan%20Connects/IMG_0057%20(2025-03-16T12_08_32.433).JPG",
        alt: "Ramadan Connects – dekorierter Veranstaltungsbereich",
      },
      {
        src: "/images/veranstaltungen/Ramadan%20Connects/IMG_0784%20(2025-03-16T12_00_11.127)%202.jpg",
        alt: "Ramadan Connects – grün-weiße Festtorte",
        fit: "contain",
      },
      {
        src: "/images/veranstaltungen/Ramadan%20Connects/veranstaltung-maerz-2025-3.jpg",
        alt: "Ramadan Connects – Bühnenmoment mit Daf und Publikum",
      },
      {
        src: "/images/veranstaltungen/Ramadan%20Connects/IMG_0886%20(2025-03-16T12_03_21.725).JPG",
        alt: "Ramadan Connects – gemeinsamer Bühnenmoment",
      },
      {
        src: "/images/veranstaltungen/Ramadan%20Connects/IMG_0162%20(2025-03-16T12_11_52.773).JPG",
        alt: "Ramadan Connects – Kinder malen gemeinsam",
        fit: "contain",
      },
      {
        src: "/images/veranstaltungen/Ramadan%20Connects/IMG_0388%20(2025-03-16T11_47_36.232).JPG",
        alt: "Ramadan Connects – Willkommensschild und Dekoration",
      },
    ],
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
      src: "/images/veranstaltungen/Aschura/Flagge.jpg",
      alt: "Aschura-Frauenveranstaltung – rote Fahne im Veranstaltungssaal",
    },
  },
];

// -----------------------------
// Page
// -----------------------------

export default function VeranstaltungenPage() {
  const regularEvents = EVENTS.slice(0, 1);
  const annualEvents = EVENTS.slice(1, 3);

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
              Anmeldung.
            </p>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-14 max-w-4xl mx-auto"
            >
              <div className="relative aspect-[16/8] rounded-2xl overflow-hidden border border-sand-200 shadow-sm">
                <Image
                  src="/images/veranstaltungen/gemeinschaft-performance.jpg"
                  alt="Veranstaltungen – Muslimin e.V. Programmmoment in Gemeinschaft"
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
                className={`flex flex-col-reverse md:flex-row ${
                  idx % 2 !== 0 ? "md:flex-row-reverse" : ""
                } overflow-hidden rounded-xl border border-sand-200 shadow-sm`}
              >
                <div className="relative aspect-[4/3] flex-shrink-0 md:aspect-auto md:w-1/2">
                  {event.gallery ? (
                    <EventImageGallery
                      images={event.gallery}
                      eventName={event.name}
                    />
                  ) : (
                    <Image
                      src={event.image.src}
                      alt={event.image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                </div>
                <div className="md:w-1/2 [&>div]:h-full [&>div>article]:h-full [&>div>article]:rounded-none [&>div>article]:border-0 [&>div>article]:shadow-none">
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

function EventImageGallery({
  images,
  eventName,
}: {
  images: EventImage[];
  eventName: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];

  return (
    <div className="flex h-full min-h-[420px] flex-col bg-sand-100 p-1">
      <div className="relative min-h-0 flex-1 overflow-hidden bg-sand-50 p-2">
        <Image
          src={selectedImage.src}
          alt={selectedImage.alt}
          fill
          className={
            selectedImage.fit === "contain"
              ? "object-contain p-2"
              : "object-cover"
          }
          style={{ objectPosition: selectedImage.objectPosition }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div
        className="flex gap-1.5 overflow-x-auto bg-sand-100 pt-1.5"
        aria-label={`${eventName} Bilder auswählen`}
      >
        {images.map((image, imageIndex) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setSelectedIndex(imageIndex)}
            className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2 ${
              selectedIndex === imageIndex
                ? "border-sage-700"
                : "border-white/80 opacity-80 hover:border-sage-300 hover:opacity-100"
            }`}
            aria-label={`${imageIndex + 1}. Bild für ${eventName} anzeigen`}
            aria-current={selectedIndex === imageIndex ? "true" : undefined}
          >
            <Image
              src={image.src}
              alt=""
              fill
              className="object-cover"
              sizes="96px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
