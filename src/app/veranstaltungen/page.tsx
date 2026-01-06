"use client";

import { EventCard } from "@/components/landing/EventCard";
import { SocialMediaSection } from "@/components/SocialMediaSection";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animations";
import { Sparkles } from "lucide-react";

type EventFormat = "Online" | "Präsenz";

interface Event {
  id: string;
  name: string;
  description: string;
  teaser: string;
  regularity: string;
  targetAudience: string;
  format: EventFormat;
  icon: string;
}

const EVENTS: Event[] = [
  {
    id: "monatsvortrag",
    name: "Monatsvortrag",
    description:
      "Jeden letzten Sonntag eines Monats lädt Muslimin e.V. zu einer offenen Runde ein. Frauen verschiedener Altersgruppen und Konfessionen treffen sich seit 2013, um am 'Monatsvortrag' teilzunehmen. Hierbei werden verschiedene Themen angesprochen, wobei der Vortrag als Input für die anschließende Diskussionsrunde dient. Wir möchten einen Raum für Dialoge zwischen Frauen schaffen. Es werden sowohl religiöse als auch nicht-religiöse Inhalte behandelt. Daher laden wir gerne neben islamischen Geistlichen auch Experten aus den jeweiligen Gebieten (z.B. Medizin, Naturwissenschaften, Ernährung usw.) als Rednerinnen ein.",
    teaser:
      "Monatliche Vortragsreihe mit anschließender Diskussionsrunde. Vielfältige Themen von Expertinnen aus verschiedenen Fachgebieten.",
    regularity: "Jeden letzten Sonntag im Monat",
    targetAudience: "Frauen aller Altersgruppen und Konfessionen",
    format: "Präsenz",
    icon: "🎤",
  },
  {
    id: "online-vortrag",
    name: "Online-Vortragsformat",
    description:
      "Besondere Zeiten erfordern besondere Formate. Angesichts der Corona-Pandemie sind wir mit unseren monatlichen Vorträgen zu Online-Veranstaltungen auf Zoom umgestiegen. Aufgrund der hohen, positiven Resonanz von Teilnehmerinnen auf bundesweiter Ebene bieten wir an jedem zweiten Dienstagabend eines Monats beginnend mit dem Bittgebet der Fürbitte (Dua Tawassul) einen lehrreichen Online-Vortrag an. Ein großer Vorteil: Gelehrte und Experten aus unterschiedlichen Ländern stehen uns als Redner zur Verfügung.",
    teaser:
      "Wöchentliche Online-Vorträge mit internationalen Gästen. Spirituelle Impulse und Wissensvermittlung aus aller Welt.",
    regularity: "Jeden 2. Dienstagabend im Monat",
    targetAudience: "Bundesweit - Alle Interessierten",
    format: "Online",
    icon: "💻",
  },
  {
    id: "ramadan-connects",
    name: "Ramadan Connects",
    description:
      "Der heilige Monat Ramadan ist der neunte Monat des islamischen Kalenders. Damit wir das Gemeinschaftsgefühl stärken, findet jährlich ein gemeinsames Fastenbrechen unter Schwestern statt. Häufig in Kooperation mit anderen Frauenvereinen Berlins planen wir diese Veranstaltung. Gesellschaftsrelevante Themen werden durch Vorträge, Sketches, Gedichte, Poetry Slams etc. kreativ umgesetzt. Musikalische Einlagen (Nasheeds) schaffen eine spirituelle Atmosphäre. Nach dem gemeinsamen Fastenbrechen können Gäste verschiedene Verkaufs- und Informationsstände besuchen und sich mit Schwestern aus unterschiedlichen Gemeinden Berlins vernetzen.",
    teaser:
      "Jährliches Fastenbrechen im Ramadan mit kreativem Programm. Vernetzung, Kultur und Gemeinschaft in Berlin.",
    regularity: "Jährlich während Ramadan",
    targetAudience: "Alle Schwestern - oft in Kooperation",
    format: "Präsenz",
    icon: "🌙",
  },
  {
    id: "aschura",
    name: "Aschura-Frauenveranstaltung",
    description:
      "Die jährliche Aschura-Veranstaltung für Frauen und Mädchen ist ein fester Bestandteil unserer Arbeit. Anlass der Trauerzeremonie ist der Todestag vom Enkel des Propheten (F.), Imam Husain (F.), der mit seiner Familie und seinen engsten Gefährten am 10. Muharram sein Leben auf heldenhafte Weise für den Erhalt des Glaubens und der Gerechtigkeit hingab. Lehreiche Vorträge, Trauergesänge (Latmiya), Audienzen (Ziyarat), Theaterstücke, Gedichte uvm. bilden den Inhalt des Programms und schaffen eine spirituelle Atmosphäre im Gedenken an den Herrn der Märtyrer (F.).",
    teaser:
      "Jährliche Gedenkveranstaltung zur Aschura mit Trauerritualen, Vorträgen und kulturellen Darbietungen für Frauen und Mädchen.",
    regularity: "Jährlich nach dem 10. Muharram",
    targetAudience: "Frauen und Mädchen",
    format: "Präsenz",
    icon: "🕯️",
  },
  {
    id: "koran",
    name: "Koranunterricht für Frauen und Mädchen",
    description:
      "Seit 2014 finden ein- bis zweimal jährlich Kurse des Koranunterrichts statt und erfreuen sich großer Beliebtheit. In vier verschiedenen Kursen mit unterschiedlichen Fähigkeitsstufen erlernen die Schülerinnen - je nach persönlichem Wissensniveau - das Lesen der arabischen Schrift bzw. die Tajweed-Regeln: Anfänger-Kurs (Arabisches Alphabet), A-Kurs (Fließendes Lesen), B-Kurs (Tajweed-Regeln), C-Kurs (Längen- und Pausenregeln). Der Kurs umfasst 12 Unterrichtseinheiten à 90 Minuten. Zum Abschluss legen die Schülerinnen eine kleine Prüfung ab und erhalten Urkunden und Geschenke. Ziel ist es, die Schülerinnen zu ermutigen, sich mit dem Koran in seiner Originalschrift auseinanderzusetzen.",
    teaser:
      "Koranunterricht in vier Niveaustufen von Anfänger bis Fortgeschrittene. Systematisches Lernen der arabischen Schrift und Rezitationsregeln.",
    regularity: "1-2x jährlich, 12 Wochen à 90 Min.",
    targetAudience: "Frauen und Mädchen aller Levels",
    format: "Präsenz",
    icon: "📖",
  },
  {
    id: "lesezirkel",
    name: "Lesezirkel",
    description:
      "Islamische Bücher werden in kleinen Gruppen von maximal 10 Mitgliedern gelesen und in regelmäßigen Sitzungen vor Ort in familiärer Atmosphäre diskutiert. Die Lesezirkel bieten Raum für tiefgehende Auseinandersetzung mit islamischer Literatur, gemeinsames Lernen und Austausch über spirituelle Themen. In entspannter Atmosphäre werden verschiedene Werke von islamischen Gelehrten, zeitgenössischen Autorinnen und spiritueller Literatur gemeinsam erarbeitet.",
    teaser:
      "Islamische Bücher in kleinen Gruppen lesen und diskutieren. Regelmäßige Sitzungen in familiärer Atmosphäre für gemeinsames Lernen.",
    regularity: "Regelmäßige Sitzungen nach Absprache",
    targetAudience: "Bildungsinteressierte Mitglieder",
    format: "Präsenz",
    icon: "📚",
  },
];

export default function VeranstaltungenPage() {
  // Group events by category for better UX structure
  const regularEvents = EVENTS.slice(0, 2); // Monatsvortrag & Online-Vortrag
  const annualEvents = EVENTS.slice(2, 4); // Ramadan & Aschura
  const educationEvents = EVENTS.slice(4); // Koranunterricht & Lesezirkel

  return (
    <motion.main
      className="min-h-screen bg-gradient-to-br from-sand-50 via-white to-sage-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="py-20 md:py-24">
          <motion.div
            variants={itemVariants}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-sage-100 text-sage-800 rounded-full text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Gemeinschaft stärken
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-charcoal-900">
              Unsere Veranstaltungen
            </h1>
            <p className="text-lg md:text-xl text-charcoal-700 max-w-2xl mx-auto">
              Entdecke die vielfältigen Möglichkeiten, Teil unserer Gemeinschaft
              zu werden
            </p>
          </motion.div>
        </section>

        {/* Section: Regular Series */}
        <section className="py-10 md:py-12">
          <motion.div variants={itemVariants} className="max-w-7xl mx-auto">
            <div className="mb-8 md:mb-10">
              <h2 className="text-3xl font-bold text-charcoal-900 mb-3">
                Regelmäßige Vortragsreihen
              </h2>
              <p className="text-lg text-charcoal-600 max-w-2xl">
                Monatliche Impulse für Geist und Seele – ob vor Ort in Berlin
                oder digital von überall.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {regularEvents.map((event) => (
                <motion.div
                  key={event.id}
                  variants={itemVariants}
                  className="h-full"
                >
                  <EventCard {...event} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Section: Annual Highlights */}
        <section className="py-10 md:py-12">
          <motion.div variants={itemVariants} className="max-w-7xl mx-auto">
            <div className="mb-8 md:mb-10">
              <h2 className="text-3xl font-bold text-charcoal-900 mb-3">
                Jährliche Highlights
              </h2>
              <p className="text-lg text-charcoal-600 max-w-2xl">
                Besondere Anlässe im Jahreskreis, die unsere Gemeinschaft
                stärken und verbinden.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {annualEvents.map((event) => (
                <motion.div
                  key={event.id}
                  variants={itemVariants}
                  className="h-full"
                >
                  <EventCard {...event} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Section: Education */}
        <section className="py-10 md:py-12 mb-12">
          <motion.div variants={itemVariants} className="max-w-7xl mx-auto">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="text-3xl font-bold text-charcoal-900 mb-3">
                Bildung & Entwicklung
              </h2>
              <p className="text-lg text-charcoal-600">
                Vertiefe dein Wissen durch Koranunterricht und Lesezirkel in
                familiärer Atmosphäre.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {educationEvents.map((event) => (
                <motion.div
                  key={event.id}
                  variants={itemVariants}
                  className="h-full"
                >
                  <EventCard {...event} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Social Media Section */}
        <motion.section
          variants={itemVariants}
          className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sage-50 via-cream-50 to-sage-50"
        >
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-sage-800 mb-4">
                Folge uns auf Social Media! 📱
              </h2>
              <p className="text-lg text-sage-600 max-w-2xl mx-auto">
                Bleib auf dem Laufenden mit aktuellen Flyern, Terminen und
                Live-Updates
              </p>
            </div>
            <SocialMediaSection variant="compact" showTitle={false} />
          </div>
        </motion.section>
      </div>
    </motion.main>
  );
}
