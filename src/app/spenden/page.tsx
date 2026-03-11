"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  Heart,
  Shield,
  Users,
  Landmark,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { containerVariants, itemVariants, hoverLift } from "@/lib/animations";
import { PUBLIC_PAGE_WRAPPER_CLASS } from "@/lib/page-config";

interface DonationCampaign {
  id: string;
  title: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
  goal?: string;
  impact?: string;
  detailedText?: string;
}

const donationCampaigns: DonationCampaign[] = [
  {
    id: "yemen-relief",
    title: "Hoffnung für den Jemen — Soforthilfe & Unterstützung",
    description:
      "Seit 2018 organisieren wir Spendenaufrufe und Online-Auktionen für humanitäre Hilfe im Jemen",
    details: [
      "Medizinische Notversorgung für Kriegsopfer",
      "Lebensmittelpakete für Familien in akuter Not",
      "Zugang zu sauberem Trinkwasser",
      "Schulbildung für Kinder im Krisengebiet",
    ],
    icon: <Heart className="w-12 h-12" />,
    goal: "Deine Spende rettet Leben und bringt direkte Hilfe vor Ort",
    impact: "Seit 2018: Über 50 erfolgreiche Spendenaktionen durchgeführt",
    detailedText: `Die humanitäre Krise im Jemen

Der Jemen durchlebt eine der schwersten humanitären Krisen weltweit. Millionen Menschen – darunter unzählige Kinder – leiden unter Hunger, fehlender medizinischer Versorgung und Vertreibung. Die Vereinten Nationen sprechen von der größten humanitären Katastrophe unserer Zeit.

Unsere Mission seit 2018

Als Muslimin e.V. haben wir uns verpflichtet, nachhaltige und transparente Hilfe zu leisten. Durch bundesweite Spendenaufrufe und kreative Online-Auktionen mobilisieren wir die Community und schaffen Aufmerksamkeit für die Notlage im Jemen.

So funktionieren unsere Auktionen:
• Community-Mitglieder und Shops spenden wertvolle Gegenstände (islamische Bücher, Kunstwerke, Gebetsgegenstände, handgefertigte Produkte)
• Diese werden online versteigert – jedes Gebot ist eine Spende
• 100% der Erlöse gehen direkt an verifizierte Hilfsprojekte im Jemen
• Wir arbeiten ausschließlich mit etablierten, transparenten Hilfsorganisationen zusammen

Konkrete Hilfe vor Ort:
✓ Medizinische Notversorgung in Gesundheitszentren
✓ Verteilung von Lebensmittelpaketen an hungernde Familien
✓ Aufbau und Instandhaltung von Brunnen für sauberes Trinkwasser
✓ Finanzierung von Schulmaterialien und Lehrer-Gehältern

Warum unsere Methode wirkt:
Durch die Auktionen entsteht nicht nur finanzielle Unterstützung, sondern auch Bewusstsein in der Community. Jede Versteigerung wird zu einem Event, das Menschen zusammenbringt und die Solidarität stärkt. Die gebündelten Mittel ermöglichen größere, nachhaltigere Projekte.

Transparenz ist unser Versprechen:
Wir dokumentieren jeden Schritt – von der Spende bis zur Verwendung. Projektberichte und Nachweise stellen wir auf Anfrage zur Verfügung.

Deine Spende macht den Unterschied:
Jeder Euro zählt. Ob 5€ für Trinkwasser, 20€ für ein Lebensmittelpaket oder 50€ für medizinische Versorgung – dein Beitrag rettet Leben und schenkt Familien im Jemen Hoffnung.`,
  },
  {
    id: "local-support",
    title: "Veranstaltungsräume & Programme",
    description: "Finanzierung unserer Räumlichkeiten und Community-Programme",
    details: [
      "Miete und Unterhalt der Veranstaltungsräume",
      "Organisation von Bildungs- und Integrationsprogrammen",
      "Durchführung von Workshops und Seminaren",
      "Community-Events und Netzwerk-Treffen",
    ],
    icon: <Users className="w-12 h-12" />,
    goal: "Ermögliche uns, einen sicheren Raum für die Community zu schaffen",
    impact: "Spenden helfen, unsere Programme am Laufen zu halten",
    detailedText: `Veranstaltungsräume & Programme

Um unsere Mission zu erfüllen und einen sicheren, einladenden Raum für muslimische Frauen und Mädchen zu schaffen, sind wir auf Spenden angewiesen.

Wofür wir Spenden benötigen:
• Miete und Nebenkosten für Veranstaltungsräume
• Ausstattung und technisches Equipment
• Organisation von Bildungsprogrammen und Workshops
• Honorare für Referent*innen und Expert*innen
• Materialien für Seminare und Veranstaltungen

Warum das wichtig ist:
Unsere Räumlichkeiten sind mehr als nur vier Wände – sie sind ein Ort der Begegnung, des Lernens und der gegenseitigen Unterstützung. Hier finden Frauen einen geschützten Raum für Austausch, Bildung und Empowerment.

Deine Spende ermöglicht:
Dass wir weiterhin qualitativ hochwertige Programme anbieten können, dass unsere Räume offen bleiben und dass wir neue Projekte entwickeln können, die muslimische Frauen stärken und unterstützen.`,
  },
];

export default function SpendenPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedCampaign, setExpandedCampaign] = useState<string | null>(null);
  const [showStickyButton, setShowStickyButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyButton(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 3000);
  };

  return (
    <motion.main
      className={PUBLIC_PAGE_WRAPPER_CLASS}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Sticky Donate Button */}
      <AnimatePresence>
        {showStickyButton && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              size="lg"
              variant="donation"
              asChild
              className="rounded-full shadow-2xl"
            >
              <a href="#spenden" className="gap-2">
                💚 Jetzt spenden
              </a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section - Simplified */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Urgency Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-coral-100 text-coral-800 rounded-full text-sm font-semibold mb-6 border border-coral-300"
          >
            <AlertCircle className="w-4 h-4" />
            Jemen: Akute Hungersnot – jede Spende zählt
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-charcoal-800">
            Deine Spende bewirkt Großes
          </h1>

          <p className="text-xl md:text-2xl text-charcoal-700 mb-8 max-w-2xl mx-auto">
            Unterstütze humanitäre Hilfe im Jemen und Community-Programme in
            Deutschland
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" variant="donation" asChild>
              <a href="#spenden" className="gap-2">
                💚 Jetzt spenden
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <a href="#spendenzwecke" className="gap-2">
                Wofür wir spenden
              </a>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-sage-50/60 to-white rounded-lg shadow-sm border border-sand-200">
              <Shield className="w-4 h-4 text-sage-600" />
              <span className="font-semibold text-charcoal-800">
                Ehrenamtlich &amp; unabhängig
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-sage-50/60 to-white rounded-lg shadow-sm border border-sand-200">
              <Heart className="w-4 h-4 text-sage-600" />
              <span className="font-semibold text-charcoal-800">
                100% Transparenz
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-sage-50/60 to-white rounded-lg shadow-sm border border-sand-200">
              <Users className="w-4 h-4 text-charcoal-600" />
              <span className="font-semibold text-charcoal-800">
                Seit 2011 aktiv
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Donation Methods */}
      <section id="spenden" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <motion.div variants={itemVariants} className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Spendenwege</p>
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-800 mb-4">
              So kannst du spenden
            </h2>
            <p className="text-lg text-charcoal-600">
              Wähle die für dich passende Spendenmethode
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* PayPal */}
            <motion.div
              variants={itemVariants}
              {...hoverLift}
              className="relative p-8 bg-gradient-to-br from-white to-sage-50 rounded-xl border-2 border-sage-300 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="absolute -top-3 right-4 px-3 py-1 bg-sage-500 text-white text-xs font-bold rounded-full shadow-md">
                Schnell & Einfach
              </div>

              <div className="mb-4">
                <svg
                  viewBox="0 0 124 33"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="PayPal"
                  className="w-28 h-14"
                >
                  <title>PayPal</title>
                  <path
                    fill="#003087"
                    d="M46.211 6.749h-6.839a.95.95 0 0 0-.939.802l-2.766 17.537a.57.57 0 0 0 .564.658h3.265a.95.95 0 0 0 .939-.803l.746-4.73a.95.95 0 0 1 .938-.803h2.165c4.505 0 7.105-2.18 7.784-6.5.306-1.89.013-3.375-.872-4.415-.972-1.142-2.696-1.746-4.985-1.746zM47 13.154c-.374 2.454-2.249 2.454-4.062 2.454h-1.032l.724-4.583a.57.57 0 0 1 .563-.481h.473c1.235 0 2.4 0 3.002.704.359.42.469 1.044.332 1.906zM66.654 13.075h-3.275a.57.57 0 0 0-.563.481l-.145.916-.229-.332c-.709-1.029-2.29-1.373-3.868-1.373-3.619 0-6.71 2.741-7.312 6.586-.313 1.918.132 3.752 1.22 5.031.998 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .562.66h2.95a.95.95 0 0 0 .939-.803l1.77-11.209a.568.568 0 0 0-.561-.658zm-4.565 6.374c-.316 1.871-1.801 3.127-3.695 3.127-.951 0-1.711-.305-2.199-.883-.484-.574-.668-1.391-.514-2.301.295-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.499.589.697 1.411.554 2.317zM84.096 13.075h-3.291a.954.954 0 0 0-.787.417l-4.539 6.686-1.924-6.425a.953.953 0 0 0-.912-.678h-3.234a.57.57 0 0 0-.541.754l3.625 10.638-3.408 4.811a.57.57 0 0 0 .465.9h3.287a.949.949 0 0 0 .781-.408l10.946-15.8a.57.57 0 0 0-.468-.895z"
                  />
                  <path
                    fill="#009cde"
                    d="M94.992 6.749h-6.84a.95.95 0 0 0-.938.802l-2.766 17.537a.569.569 0 0 0 .562.658h3.51a.665.665 0 0 0 .656-.562l.785-4.971a.95.95 0 0 1 .938-.803h2.164c4.506 0 7.105-2.18 7.785-6.5.307-1.89.012-3.375-.873-4.415-.971-1.142-2.694-1.746-4.983-1.746zm.789 6.405c-.373 2.454-2.248 2.454-4.062 2.454h-1.031l.725-4.583a.568.568 0 0 1 .562-.481h.473c1.234 0 2.4 0 3.002.704.359.42.468 1.044.331 1.906zM115.434 13.075h-3.273a.567.567 0 0 0-.562.481l-.145.916-.23-.332c-.709-1.029-2.289-1.373-3.867-1.373-3.619 0-6.709 2.741-7.311 6.586-.312 1.918.131 3.752 1.219 5.031 1 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .564.66h2.949a.95.95 0 0 0 .938-.803l1.771-11.209a.571.571 0 0 0-.565-.658zm-4.565 6.374c-.314 1.871-1.801 3.127-3.695 3.127-.949 0-1.711-.305-2.199-.883-.484-.574-.666-1.391-.514-2.301.297-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.501.589.699 1.411.554 2.317zM119.295 7.23l-2.807 17.858a.569.569 0 0 0 .562.658h2.822c.469 0 .867-.34.939-.803l2.768-17.536a.57.57 0 0 0-.562-.659h-3.16a.571.571 0 0 0-.562.482z"
                  />
                  <path
                    fill="#003087"
                    d="M7.266 29.154l.523-3.322-1.165-.027H1.061L4.927 1.292a.316.316 0 0 1 .314-.268h9.38c3.114 0 5.263.648 6.385 1.927.526.6.861 1.227 1.023 1.917.17.724.173 1.589.007 2.644l-.012.077v.676l.526.298a3.69 3.69 0 0 1 1.065.812c.45.513.741 1.165.864 1.938.127.795.085 1.741-.123 2.812-.24 1.232-.628 2.305-1.152 3.183a6.547 6.547 0 0 1-1.825 2c-.696.494-1.523.869-2.458 1.109-.906.236-1.939.355-3.072.355h-.73c-.522 0-1.029.188-1.427.525a2.21 2.21 0 0 0-.744 1.328l-.055.299-.924 5.855-.042.215c-.011.068-.03.102-.058.125a.155.155 0 0 1-.096.035H7.266z"
                  />
                  <path
                    fill="#009cde"
                    d="M23.048 7.667c-.028.179-.06.362-.096.55-1.237 6.351-5.469 8.545-10.874 8.545H9.326c-.661 0-1.218.48-1.321 1.132L6.596 26.83l-.399 2.533a.704.704 0 0 0 .695.814h4.881c.578 0 1.069-.42 1.16-.99l.048-.248.919-5.832.059-.32c.09-.572.582-.992 1.16-.992h.73c4.729 0 8.431-1.92 9.513-7.476.452-2.321.218-4.259-.978-5.622a4.667 4.667 0 0 0-1.336-1.03z"
                  />
                  <path
                    fill="#012169"
                    d="M21.754 7.151a9.757 9.757 0 0 0-1.203-.267 15.284 15.284 0 0 0-2.426-.177h-7.352a1.172 1.172 0 0 0-1.159.992L8.05 17.605l-.045.289a1.336 1.336 0 0 1 1.321-1.132h2.752c5.405 0 9.637-2.195 10.874-8.545.037-.188.068-.371.096-.55a6.594 6.594 0 0 0-1.017-.429 9.045 9.045 0 0 0-.277-.087z"
                  />
                  <path
                    fill="#003087"
                    d="M9.614 7.699a1.169 1.169 0 0 1 1.159-.991h7.352c.871 0 1.684.057 2.426.177a9.757 9.757 0 0 1 1.481.353c.365.121.704.264 1.017.429.368-2.347-.003-3.945-1.272-5.392C20.378.682 17.853 0 14.622 0h-9.38c-.66 0-1.223.48-1.325 1.133L.01 25.898a.806.806 0 0 0 .795.932h5.791l1.454-9.225 1.564-9.906z"
                  />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-charcoal-800 mb-3">
                PayPal
              </h3>

              <p className="text-charcoal-600 mb-6">
                Schnell und sicher per PayPal spenden
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-sage-50 rounded-lg border border-sage-200">
                  <p className="text-sm font-semibold text-charcoal-800 mb-2">
                    📧 Sende an:
                  </p>
                  <button
                    onClick={() =>
                      copyToClipboard("info@muslimin-ev.de", "paypal-email")
                    }
                    aria-label="PayPal-E-Mail in Zwischenablage kopieren"
                    className="flex items-center justify-between w-full gap-2 px-3 py-2 bg-white rounded hover:bg-sand-50 transition-colors border border-sand-200 focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:outline-none"
                  >
                    <span className="font-mono text-sm text-charcoal-900 break-all">
                      info@muslimin-ev.de
                    </span>
                    {copied === "paypal-email" ? (
                      <Check className="w-4 h-4 text-sage-600 flex-shrink-0" />
                    ) : (
                      <Copy className="w-4 h-4 text-sage-600 flex-shrink-0" />
                    )}
                  </button>
                </div>

                <div className="p-4 bg-warm-50 rounded-lg border border-warm-200">
                  <p className="text-sm font-semibold text-charcoal-800 mb-1">
                    ⚠️ Wichtig:
                  </p>
                  <p className="text-sm text-charcoal-700 mb-2">
                    Bitte als{" "}
                    <span className="font-bold">
                      &quot;Freunde und Familie&quot;
                    </span>{" "}
                    senden
                  </p>
                  <p className="text-xs text-charcoal-600">
                    Nachricht: <span className="font-semibold">Spende</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Bank Transfer */}
            <motion.div
              variants={itemVariants}
              {...hoverLift}
              className="p-8 bg-gradient-to-br from-white to-sage-50/50 rounded-xl border-2 border-sand-200 hover:border-sage-300 hover:shadow-lg transition-all"
            >
              <div className="mb-4 w-12 h-12 bg-gradient-to-br from-sage-100 to-sage-200 rounded-lg flex items-center justify-center">
                <Landmark className="w-7 h-7 text-sage-700" />
              </div>

              <h3 className="text-2xl font-bold text-charcoal-800 mb-3">
                Banküberweisung
              </h3>

              <p className="text-charcoal-600 mb-6">
                Direkte Überweisung auf unser Konto
              </p>

              <div className="space-y-3 text-sm">
                <div className="p-3 bg-sand-50 rounded-lg border border-sand-200">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="font-semibold text-charcoal-700">
                      IBAN:
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard("DE12301200000123456789", "iban")
                    }
                    aria-label="IBAN in Zwischenablage kopieren"
                    className="flex items-center justify-between w-full gap-2 px-3 py-2 bg-white rounded hover:bg-sand-100 transition-colors border border-sand-200 focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:outline-none"
                  >
                    <span className="font-mono text-xs sm:text-sm text-charcoal-900 break-all">
                      DE12 3012 0000 0123 4567 89
                    </span>
                    {copied === "iban" ? (
                      <Check className="w-4 h-4 text-sage-600 flex-shrink-0" />
                    ) : (
                      <Copy className="w-4 h-4 text-sage-600 flex-shrink-0" />
                    )}
                  </button>
                </div>

                <div className="p-3 bg-sand-50 rounded-lg border border-sand-200">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="font-semibold text-charcoal-700">
                      BIC:
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard("DEUTDE33", "bic")}
                    aria-label="BIC in Zwischenablage kopieren"
                    className="flex items-center justify-between w-full gap-2 px-3 py-2 bg-white rounded hover:bg-sand-100 transition-colors border border-sand-200 focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:outline-none"
                  >
                    <span className="font-mono text-sm text-charcoal-900">
                      DEUTDE33
                    </span>
                    {copied === "bic" ? (
                      <Check className="w-4 h-4 text-sage-600 flex-shrink-0" />
                    ) : (
                      <Copy className="w-4 h-4 text-sage-600 flex-shrink-0" />
                    )}
                  </button>
                </div>

                <div className="p-3 bg-sand-50 rounded-lg border border-sand-200">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="font-semibold text-charcoal-700">
                      Empfänger:
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard("Muslimin e.V.", "name")}
                    aria-label="Empfängername in Zwischenablage kopieren"
                    className="flex items-center justify-between w-full gap-2 px-3 py-2 bg-white rounded hover:bg-sand-100 transition-colors border border-sand-200 focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:outline-none"
                  >
                    <span className="font-mono text-sm text-charcoal-900">
                      Muslimin e.V.
                    </span>
                    {copied === "name" ? (
                      <Check className="w-4 h-4 text-sage-600 flex-shrink-0" />
                    ) : (
                      <Copy className="w-4 h-4 text-sage-600 flex-shrink-0" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Project Showcase */}
      <section id="spendenzwecke" className="py-16 px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-800 mb-4">
              So setzen wir deine Spende ein
            </h2>
            <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
              Transparente Mittelverwendung für humanitäre Hilfe und
              Community-Arbeit
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {donationCampaigns.map((campaign) => (
              <motion.div
                key={campaign.id}
                variants={itemVariants}
                {...hoverLift}
                className="p-8 bg-gradient-to-br from-white to-cream-50/60 rounded-xl border-2 border-sand-200 hover:border-sage-300 hover:shadow-lg transition-all"
              >
                <div className="text-sage-600 mb-4">{campaign.icon}</div>

                <h3 className="text-2xl font-bold text-charcoal-800 mb-3">
                  {campaign.title}
                </h3>

                <p className="text-charcoal-600 mb-6">{campaign.description}</p>

                <div className="space-y-2 mb-6">
                  {campaign.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-sage-500 mt-1">✓</span>
                      <p className="text-charcoal-600">{detail}</p>
                    </div>
                  ))}
                </div>

                {campaign.goal && (
                  <div className="p-4 bg-sage-50 rounded-lg mb-4 border border-sage-200">
                    <p className="text-sm font-semibold text-charcoal-800">
                      💡 {campaign.goal}
                    </p>
                  </div>
                )}

                {campaign.impact && (
                  <p className="text-charcoal-700 font-semibold italic mb-4">
                    &ldquo;{campaign.impact}&rdquo;
                  </p>
                )}

                {campaign.detailedText && (
                  <>
                    <button
                      onClick={() =>
                        setExpandedCampaign(
                          expandedCampaign === campaign.id ? null : campaign.id,
                        )
                      }
                      className="flex items-center gap-2 text-sage-600 font-semibold hover:text-sage-700 transition-colors focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:outline-none rounded px-2 py-1"
                    >
                      {expandedCampaign === campaign.id ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          Weniger anzeigen
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          Mehr erfahren
                        </>
                      )}
                    </button>

                    <AnimatePresence>
                      {expandedCampaign === campaign.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 p-4 bg-gradient-to-r from-sage-50 to-coral-50 rounded-lg border border-sage-200">
                            <p className="text-charcoal-700 text-sm leading-relaxed whitespace-pre-line">
                              {campaign.detailedText}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Transparency + Contact Combined */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-800 mb-6">
              Transparenz & Vertrauen
            </h2>

            <p className="text-lg text-charcoal-600 max-w-2xl mx-auto mb-8">
              Wir legen großen Wert auf transparente Mittelverwendung.
              Projektberichte und Belege stellen wir auf Anfrage zur Verfügung
              und arbeiten mit vertrauenswürdigen Partnern zusammen, um
              sicherzustellen, dass Spenden zielgerichtet ankommen.
            </p>

            <div className="p-6 bg-gradient-to-r from-sage-50 to-warm-50 rounded-lg border border-sage-200 text-center mb-8">
              <p className="text-charcoal-700 font-medium mb-2">
                Fragen zur Spende oder zu unseren Projekten?
              </p>
              <p className="text-charcoal-600">
                Wir beantworten gerne alle deine Fragen und informieren dich
                über aktuelle Hilfsprojekte.
              </p>
            </div>

            <div className="flex justify-center items-center">
              <Button size="lg" variant="secondary" asChild>
                <a href="/kontakt" className="gap-2">
                  Kontakt aufnehmen
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sage-100 to-warm-100">
        <motion.div
          variants={itemVariants}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal-800 mb-4">
            Jede Spende macht einen Unterschied
          </h2>
          <p className="text-lg text-charcoal-600 mb-8">
            Werde Teil unserer Mission und unterstütze Menschen in Not
          </p>
          <Button size="lg" variant="donation" asChild>
            <a href="#spenden" className="gap-2">
              Jetzt spenden
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </motion.div>
      </section>
    </motion.main>
  );
}
