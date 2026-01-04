"use client";

import { motion } from "framer-motion";
import {
  Smartphone,
  Download,
  Home,
  Share,
  Menu,
  Chrome,
  Monitor,
  CheckCircle,
  Info,
  ArrowRight,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function PWAGuidePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const iosSteps = [
    {
      icon: Globe,
      title: "Safari öffnen",
      description:
        "Öffnen Sie die Website in Safari (nicht in Chrome oder anderen Browsern)",
    },
    {
      icon: Share,
      title: "Teilen-Button tippen",
      description:
        "Tippen Sie auf den Teilen-Button (Quadrat mit Pfeil nach oben) unten in der Mitte",
    },
    {
      icon: Home,
      title: "Zum Home-Bildschirm hinzufügen",
      description:
        "Scrollen Sie in den Optionen nach unten und wählen Sie 'Zum Home-Bildschirm hinzufügen'",
    },
    {
      icon: CheckCircle,
      title: "App-Name bestätigen",
      description:
        "Bestätigen Sie den App-Namen und tippen Sie auf 'Hinzufügen'",
    },
  ];

  const androidSteps = [
    {
      icon: Chrome,
      title: "Chrome öffnen",
      description: "Öffnen Sie die Website in Chrome Browser",
    },
    {
      icon: Menu,
      title: "Menü öffnen",
      description: "Tippen Sie auf die drei Punkte oben rechts",
    },
    {
      icon: Download,
      title: "App installieren",
      description:
        "Wählen Sie 'App installieren' oder 'Zum Startbildschirm hinzufügen'",
    },
    {
      icon: CheckCircle,
      title: "Installation bestätigen",
      description: "Bestätigen Sie die Installation der App",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-sage-50">
      <motion.div
        className="container mx-auto px-4 py-16 md:py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-sage-500 to-warm-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Smartphone className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-coral-600 rounded-full flex items-center justify-center">
                <Download className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Muslimin als{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-charcoal-800 via-sage-700 to-coral-700">
              Mobile App
            </span>{" "}
            nutzen
          </h1>
          <p className="text-lg md:text-xl text-sage-600 max-w-3xl mx-auto leading-relaxed">
            Installieren Sie unsere Website als App auf Ihrem Smartphone für
            schnelleren Zugriff, Offline-Funktionen und ein app-ähnliches
            Erlebnis. Ohne App Store!
          </p>
        </motion.div>

        {/* Benefits Section */}
        <motion.div className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-charcoal-800 mb-12">
            Warum als App installieren?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-sage-200 hover:border-sage-300 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-sage-100 to-sage-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-sage-700" />
                </div>
                <CardTitle className="text-sage-800">
                  Schneller Zugriff
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sage-600">
                  Direkter Zugriff vom Home-Bildschirm, ohne Browser öffnen zu
                  müssen
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-sage-200 hover:border-sage-300 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-cream-100 to-cream-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-8 h-8 text-sage-700" />
                </div>
                <CardTitle className="text-sage-800">App-Erlebnis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sage-600">
                  Vollbild-Modus ohne Browser-Interface für fokussierte Nutzung
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-sage-200 hover:border-sage-300 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-warm-100 to-warm-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-warm-700" />
                </div>
                <CardTitle className="text-sage-800">
                  Offline verfügbar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sage-600">
                  Grundfunktionen auch ohne Internetverbindung nutzbar
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Installation Guide */}
        <motion.div className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-charcoal-800 mb-12">
            Installations-Anleitung
          </h2>

          <Tabs defaultValue="ios" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="ios" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                iPhone/iPad (Safari)
              </TabsTrigger>
              <TabsTrigger value="android" className="flex items-center gap-2">
                <Chrome className="w-4 h-4" />
                Android (Chrome)
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ios">
              <div className="space-y-6">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Wichtiger Hinweis für iOS</AlertTitle>
                  <AlertDescription>
                    Die Installation funktioniert nur mit dem Safari Browser.
                    Chrome oder andere Browser unterstützen diese Funktion
                    nicht.
                  </AlertDescription>
                </Alert>

                <div className="grid gap-6">
                  {iosSteps.map((step, index) => (
                    <Card
                      key={index}
                      className="shadow-xl bg-gradient-to-r from-sage-50 to-warm-50 border border-sage-200"
                    >
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-sage-500 to-warm-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <CardTitle className="flex items-center gap-2 text-sage-800">
                              <step.icon className="w-5 h-5" />
                              {step.title}
                            </CardTitle>
                            <CardDescription className="text-gray-600 mt-1">
                              {step.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="android">
              <div className="space-y-6">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Für Android Nutzer</AlertTitle>
                  <AlertDescription>
                    Chrome Browser bietet die beste Unterstützung für Web-App
                    Installation. Bei anderen Browsern kann der Prozess
                    abweichen.
                  </AlertDescription>
                </Alert>

                <div className="grid gap-6">
                  {androidSteps.map((step, index) => (
                    <Card
                      key={index}
                      className="shadow-xl bg-gradient-to-r from-sage-50 to-warm-50 border border-sage-200"
                    >
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-sage-500 to-warm-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <CardTitle className="flex items-center gap-2 text-sage-800">
                              <step.icon className="w-5 h-5" />
                              {step.title}
                            </CardTitle>
                            <CardDescription className="text-gray-600 mt-1">
                              {step.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Call to Action */}
        <motion.div className="text-center" variants={itemVariants}>
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-sage-50 to-warm-50 border-sage-200">
            <CardHeader>
              <CardTitle className="text-2xl text-sage-800">
                Bereit für ein besseres Erlebnis?
              </CardTitle>
              <CardDescription className="text-lg">
                Installieren Sie die App jetzt und genießen Sie schnelleren
                Zugriff auf alle Muslimin e.V. Services
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-sage-600 to-warm-600 hover:from-sage-700 hover:to-warm-700 text-white"
              >
                <Smartphone className="w-5 h-5 mr-2" />
                Jetzt installieren
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-sage-300 text-sage-700 hover:bg-sage-50"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Zur Website
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
