"use client";

import { EventCard } from "@/components/landing/EventCard";
import { SocialMediaSection } from "@/components/SocialMediaSection";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animations";

type EventFormat = "Online" | "Präsenz";

interface Event {
  id: string;
  name: string;
  description: string;
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
    regularity: "1-2x jährlich, 12 Wochen à 90 Min.",
    targetAudience: "Frauen und Mädchen aller Levels",
    format: "Präsenz",
    icon: "📖",
  },
];

export default function VeranstaltungenPage() {
  return (
    <motion.main
      className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-sage-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-sage-800 mb-6">
            Unsere Veranstaltungen
          </h1>
          <p className="text-xl text-warm-600">
            Entdecke die vielen Möglichkeiten, Teil unserer Gemeinschaft zu
            werden
          </p>
        </motion.div>
      </section>

      {/* Events Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVENTS.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Social Media CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
          <SocialMediaSection
            variant="card"
            title="Folge uns auf Social Media! 📱"
            subtitle="Aktuelle Flyer, genaue Termine und Live-Updates!"
          />
        </motion.div>
      </section>
    </motion.main>
  );
}
