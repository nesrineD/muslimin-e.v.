"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function VeranstaltungenPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  // Events grouped by month
  const eventsByMonth = {
    "September 2025": [
      {
        id: 4,
        title: "Herbstkonferenz September 2025",
        date: "27. September 2025",
        flyer: "/images/veranstaltungen/herbstkonferenz-september-2025.jpeg",
      },
    ],
    "August 2025": [
      {
        id: 3,
        title: "Workshop August 2025",
        date: "15. August 2025",
        flyer: "/images/veranstaltungen/workshop-august-2025.jpeg",
      },
    ],
    "Juni 2025": [
      {
        id: 2,
        title: "Sommerfest Juni 2025",
        date: "21. Juni 2025",
        flyer: "/images/veranstaltungen/sommerfest-juni-2025.jpeg",
      },
      {
        id: 1,
        title: "Frauenkreis Juni 2025",
        date: "11. Juni 2025",
        flyer: "/images/veranstaltungen/frauenkreis-juni-2025.jpeg",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-sage-50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-12"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-sage-800 mb-6">
            <span className="bg-gradient-to-r from-warm-500 to-coral-500 bg-clip-text text-transparent">
              Unsere Veranstaltungen
            </span>
          </h1>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto leading-relaxed">
            Entdecken Sie unsere kommenden Events und Workshops.
          </p>
        </motion.div>

        {/* Events by Month */}
        <div className="max-w-6xl mx-auto space-y-12">
          {Object.entries(eventsByMonth).map(([month, events]) => (
            <motion.div key={month} variants={itemVariants}>
              <h2 className="text-3xl font-bold text-sage-800 mb-8 text-center">
                {month}
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <motion.div
                    key={event.id}
                    variants={itemVariants}
                    className="group"
                  >
                    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02]">
                      <CardHeader className="pb-4">
                        {/* Flyer Image - Made bigger */}
                        <div className="relative w-full h-96 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={event.flyer}
                            alt={`Flyer für ${event.title}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <CardTitle className="text-lg font-bold text-sage-800 group-hover:text-warm-700 transition-colors mb-2">
                            {event.title}
                          </CardTitle>
                          <p className="text-sage-600 font-medium">
                            {event.date}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Section */}
        <motion.div variants={itemVariants} className="mt-16">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold text-sage-800">
                Haben Sie Fragen zu unseren Veranstaltungen?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sage-700 leading-relaxed max-w-2xl mx-auto">
                Kontaktieren Sie uns gerne für weitere Informationen oder wenn
                Sie eigene Veranstaltungsideen haben. Wir freuen uns auf Ihre
                Teilnahme!
              </p>
              <Button
                variant="outline"
                className="border-sage-300 text-sage-700 hover:bg-sage-50 hover:border-sage-400 transition-all duration-300"
                asChild
              >
                <a href="mailto:info@muslimin-ev.de">Kontakt aufnehmen</a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
