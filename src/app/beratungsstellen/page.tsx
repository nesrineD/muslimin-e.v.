"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Clock,
  Filter,
  ExternalLink,
  Users,
  Heart,
  Baby,
  Scale,
  BookOpen,
  Shield,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout/Layout";

interface CounselingCenter {
  id: number;
  name: string;
  categories: string[];
  description: string;
  contact: {
    phone: string;
    email: string;
    website: string | null;
    address: string;
  };
  openingHours: string;
  languages: string[];
  specialties: string[];
}

// Real data from PDF sources - Beratungsstellen für Alleinerziehende & Sozialberatungsstellen
const realCounselingCenters: CounselingCenter[] = [
  // Beratungsstellen für Alleinerziehende
  {
    id: 1,
    name: "SKF Berlin e.V. - Mitte",
    categories: ["Beratung für Alleinerziehende"],
    description:
      "Sozialdienst katholischer Frauen - Unterstützung für alleinerziehende Mütter und Familien in schwierigen Lebenslagen.",
    contact: {
      phone: "0151 14866423",
      email: "Fliegel@skf-berlin.de",
      website: null,
      address: "Briesestr. 15, 12053 Berlin",
    },
    openingHours: "Termine nach Vereinbarung",
    languages: ["Deutsch"],
    specialties: ["Familienhilfe", "Alleinerziehende", "Soziale Beratung"],
  },
  {
    id: 2,
    name: "Berliner Frauenbund 1945 e.V. - Pankow",
    categories: ["Beratung für Alleinerziehende"],
    description:
      "Beratung und Unterstützung für alleinerziehende Frauen mit Fokus auf berufliche Integration und Kinderbetreuung.",
    contact: {
      phone: "0176 43473019",
      email: "info@berliner-frauenbund.de",
      website: null,
      address: "Berliner Str. 120, 13187 Berlin",
    },
    openingHours: "Mo-Fr: 9:00-15:00 Uhr",
    languages: ["Deutsch"],
    specialties: [
      "Berufliche Integration",
      "Kinderbetreuung",
      "Frauenberatung",
    ],
  },
  {
    id: 3,
    name: "Verein für aktive Vielfalt - Charlottenburg-Wilmersdorf",
    categories: ["Beratung für Alleinerziehende"],
    description:
      "Vielfältige Unterstützungsangebote für alleinerziehende Eltern mit interkulturellem Schwerpunkt.",
    contact: {
      phone: "0176 46679254",
      email: "beratung@aktive-vielfalt.de",
      website: null,
      address: "Kantstr. 79, 10627 Berlin",
    },
    openingHours: "Termine nach Vereinbarung",
    languages: ["Deutsch", "Englisch"],
    specialties: [
      "Interkulturelle Beratung",
      "Alleinerziehende",
      "Integration",
    ],
  },
  {
    id: 4,
    name: "Frauenzentrum Marie - Tempelhof-Schöneberg",
    categories: ["Beratung für Alleinerziehende"],
    description:
      "Ganzheitliche Beratung für alleinerziehende Frauen mit Kindern in verschiedenen Lebenssituationen.",
    contact: {
      phone: "0157 50182700",
      email: "beratung@frauenzentrum-marie.de",
      website: null,
      address: "Mariendorfer Damm 127, 12109 Berlin",
    },
    openingHours: "Di, Do: 10:00-16:00 Uhr",
    languages: ["Deutsch"],
    specialties: [
      "Ganzheitliche Beratung",
      "Alleinerziehende Mütter",
      "Lebensberatung",
    ],
  },
  {
    id: 5,
    name: "AWO Kreisverband Berlin-Mitte e.V.",
    categories: ["Beratung für Alleinerziehende"],
    description:
      "Arbeiterwohlfahrt Beratung für alleinerziehende Eltern mit umfassenden Hilfsangeboten und sozialer Unterstützung.",
    contact: {
      phone: "01590 6800463",
      email: "beratung@awo-mitte.de",
      website: null,
      address: "Lützowstr. 32, 10785 Berlin",
    },
    openingHours: "Mo-Fr: 8:00-16:00 Uhr",
    languages: ["Deutsch"],
    specialties: [
      "Soziale Unterstützung",
      "Alleinerziehende",
      "AWO-Hilfsangebote",
    ],
  },
  {
    id: 6,
    name: "SKF Berlin e.V. - Neukölln",
    categories: ["Beratung für Alleinerziehende"],
    description:
      "Spezialisierte Unterstützung für alleinerziehende Familien in Neukölln mit Fokus auf praktische Hilfen im Alltag.",
    contact: {
      phone: "0151 14866423",
      email: "Fliegel@skf-berlin.de",
      website: null,
      address: "Briesestr. 15, 12053 Berlin",
    },
    openingHours: "Termine nach Vereinbarung",
    languages: ["Deutsch"],
    specialties: [
      "Familienhilfe",
      "Alleinerziehende",
      "Praktische Unterstützung",
    ],
  },
  {
    id: 7,
    name: "SHIA e.V. - Pankow",
    categories: ["Beratung für Alleinerziehende"],
    description:
      "Selbsthilfe-, Informations- und Anlaufstelle für alleinerziehende Menschen in Pankow.",
    contact: {
      phone: "0176 43473019",
      email: "jessica.albrecht@shia-berlin.de",
      website: null,
      address: "Rudolf-Schwarz-Str. 31, 10407 Berlin",
    },
    openingHours: "Termine nach Vereinbarung",
    languages: ["Deutsch"],
    specialties: ["Selbsthilfe", "Information", "Vernetzung"],
  },
  {
    id: 8,
    name: "Flotte Lotte e.V. - Reinickendorf",
    categories: ["Beratung für Alleinerziehende"],
    description:
      "Beratung und Unterstützung für alleinerziehende Eltern in Reinickendorf mit vielfältigen Hilfsangeboten.",
    contact: {
      phone: "0176 46679254",
      email: "beratungae@flotte-lotte-berlin.de",
      website: null,
      address: "Senftenberger Ring 25, 13435 Berlin",
    },
    openingHours: "Tel: 030 4167011",
    languages: ["Deutsch"],
    specialties: ["Elternberatung", "Kinderbetreuung", "Familienhilfe"],
  },
  {
    id: 9,
    name: "Eulalia Eigensinn e.V. - Spandau",
    categories: ["Beratung für Alleinerziehende"],
    description:
      "Frauenberatungsstelle mit Schwerpunkt auf alleinerziehende Mütter in Spandau.",
    contact: {
      phone: "0157 50182700",
      email: "Sk@eulalia-eigensinn.de",
      website: null,
      address: "Lutherstr. 13, 13585 Berlin",
    },
    openingHours: "Tel: 030 3351191",
    languages: ["Deutsch"],
    specialties: [
      "Frauenberatung",
      "Alleinerziehende Mütter",
      "Soziale Beratung",
    ],
  },
  {
    id: 10,
    name: "Diakonisches Werk Steglitz und Teltow-Zehlendorf e.V.",
    categories: ["Beratung für Alleinerziehende"],
    description:
      "Diakonische Beratungsstelle für alleinerziehende Personen in Steglitz-Zehlendorf mit christlich geprägter Sozialarbeit.",
    contact: {
      phone: "01590 6800463",
      email: "beratung-alleinerziehende@dwstz.de",
      website: null,
      address: "Albrechtstr. 82, 12167 Berlin",
    },
    openingHours: "Termine nach Vereinbarung",
    languages: ["Deutsch"],
    specialties: [
      "Diakonische Arbeit",
      "Alleinerziehende",
      "Christliche Sozialarbeit",
    ],
  },
  // Sozialberatungsstellen aus PDF hinzugefügt
  {
    id: 11,
    name: "Caritas - Sozialberatung Mitte",
    categories: ["Sozialberatung"],
    description:
      "Allgemeine Sozialberatung der Caritas für Menschen in schwierigen Lebenslagen mit umfassender Unterstützung.",
    contact: {
      phone: "030 6663260",
      email: "sozialberatung-mitte@caritas-berlin.de",
      website: "https://www.caritas-berlin.de",
      address: "Residenzstraße 90, 13409 Berlin",
    },
    openingHours: "Mo-Fr: 9:00-16:00 Uhr",
    languages: ["Deutsch"],
    specialties: [
      "Allgemeine Sozialberatung",
      "Existenzsicherung",
      "Lebensberatung",
    ],
  },
  {
    id: 12,
    name: "Diakonie Berlin-Brandenburg - Sozialberatung",
    categories: ["Sozialberatung"],
    description:
      "Diakonische Sozialberatung für Menschen in sozialen Notlagen mit christlich geprägter Hilfe.",
    contact: {
      phone: "030 8200060",
      email: "sozialberatung@diakonie-berlin.de",
      website: "https://www.diakonie-portal.de",
      address: "Paulsenstraße 55-56, 12163 Berlin",
    },
    openingHours: "Mo-Do: 8:00-16:00 Uhr, Fr: 8:00-14:00 Uhr",
    languages: ["Deutsch"],
    specialties: ["Soziale Notlagen", "Schuldnerberatung", "Existenzsicherung"],
  },
  {
    id: 13,
    name: "AWO Berlin - Sozialberatung Kreuzberg",
    categories: ["Sozialberatung"],
    description:
      "Arbeiterwohlfahrt Sozialberatung mit Fokus auf Integration und soziale Teilhabe.",
    contact: {
      phone: "030 61507-0",
      email: "sozialberatung@awo-berlin.de",
      website: "https://www.awo-berlin.de",
      address: "Urbanstraße 140, 10967 Berlin",
    },
    openingHours:
      "Mo-Mi: 9:00-16:00 Uhr, Do: 9:00-18:00 Uhr, Fr: 9:00-14:00 Uhr",
    languages: ["Deutsch", "Türkisch"],
    specialties: ["Integration", "Soziale Teilhabe", "Migrantenberatung"],
  },
  {
    id: 14,
    name: "Paritätischer Wohlfahrtsverband - Sozialberatung",
    categories: ["Sozialberatung"],
    description:
      "Umfassende Sozialberatung des Paritätischen für vielfältige Lebenssituationen.",
    contact: {
      phone: "030 860010",
      email: "beratung@paritaet-berlin.de",
      website: "https://www.paritaet-berlin.de",
      address: "Brandenburgische Straße 80, 10713 Berlin",
    },
    openingHours: "Mo-Fr: 9:00-17:00 Uhr",
    languages: ["Deutsch"],
    specialties: [
      "Allgemeine Sozialberatung",
      "Rechtliche Beratung",
      "Vermittlung von Hilfen",
    ],
  },
  {
    id: 15,
    name: "Bezirksamt Charlottenburg-Wilmersdorf - Sozialberatung",
    categories: ["Sozialberatung"],
    description:
      "Kommunale Sozialberatung des Bezirksamts für Bürgerinnen und Bürger in sozialen Angelegenheiten.",
    contact: {
      phone: "030 9029-0",
      email: "sozialberatung@charlottenburg-wilmersdorf.de",
      website: "https://www.berlin.de/ba-charlottenburg-wilmersdorf",
      address: "Otto-Suhr-Allee 100, 10585 Berlin",
    },
    openingHours:
      "Mo, Di: 8:00-15:00 Uhr, Do: 8:00-18:00 Uhr, Fr: 8:00-12:00 Uhr",
    languages: ["Deutsch"],
    specialties: [
      "Behördliche Sozialberatung",
      "Antragsberatung",
      "Sozialleistungen",
    ],
  },
];

export default function CounselingCentersPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [counselingCenters] = useState(realCounselingCenters);

  const filterCenters = (centers: CounselingCenter[], category: string) => {
    if (category === "all") return centers;

    const categoryMap: { [key: string]: string } = {
      psychological: "Psychologische Beratung",
      social: "Sozialberatung",
      pregnancy: "Schwangerschaft & Familie",
      alleinerziehende: "Beratung für Alleinerziehende",
      legal: "Rechtliches",
    };

    return centers.filter((center: CounselingCenter) =>
      center.categories.includes(categoryMap[category])
    );
  };

  const filteredCenters = filterCenters(counselingCenters, selectedCategory);

  const getCategoryColor = (categoryName: string) => {
    switch (categoryName) {
      case "Psychologische Beratung":
        return "bg-purple-100 text-purple-800";
      case "Sozialberatung":
        return "bg-blue-100 text-blue-800";
      case "Schwangerschaft & Familie":
        return "bg-pink-100 text-pink-800";
      case "Beratung für Alleinerziehende":
        return "bg-green-100 text-green-800";
      case "Rechtliches":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const categories = [
    { id: "all", name: "Alle Beratungsstellen", icon: Users },
    { id: "psychological", name: "Psychologische Beratung", icon: Heart },
    { id: "social", name: "Sozialberatung", icon: Shield },
    { id: "alleinerziehende", name: "Alleinerziehende", icon: Baby },
    { id: "pregnancy", name: "Schwangerschaft & Familie", icon: Baby },
    { id: "legal", name: "Rechtliches", icon: Scale },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Layout>
      <motion.div
        className="min-h-screen bg-cream-50"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Externe Beratungsstellen
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Finden Sie professionelle Unterstützung durch spezialisierte
              Beratungseinrichtungen in Berlin. Alle Angebote sind unabhängig
              von unserer Vereinsberatung verfügbar.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="mb-8">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Filter className="w-5 h-5" />
                  Nach Beratungsart filtern
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <motion.div key={category.id} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant={
                            selectedCategory === category.id
                              ? "default"
                              : "outline"
                          }
                          className={`w-full h-auto p-4 flex flex-col items-center gap-2 text-center ${
                            selectedCategory === category.id
                              ? "bg-coral-500 hover:bg-coral-600 shadow-lg text-white"
                              : "hover:bg-cream-100 hover:border-coral-200"
                          }`}
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          <IconComponent className="w-6 h-6" />
                          <span className="text-xs font-medium leading-tight">
                            {category.name}
                          </span>
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Summary */}
          <motion.div variants={itemVariants} className="mb-8">
            <Card className="bg-charcoal-800 text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      {filteredCenters.length} Beratungsstelle
                      {filteredCenters.length !== 1 ? "n" : ""} gefunden
                    </h2>
                    <p className="text-cream-100">
                      {selectedCategory === "all"
                        ? "Alle verfügbaren Beratungsangebote"
                        : `Gefiltert nach: ${
                            categories.find((c) => c.id === selectedCategory)
                              ?.name
                          }`}
                    </p>
                  </div>
                  <ExternalLink className="w-8 h-8 text-cream-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Counseling Centers List */}
          <motion.div variants={containerVariants} className="space-y-6">
            {filteredCenters.map((center: CounselingCenter) => (
              <motion.div key={center.id} variants={itemVariants}>
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      {/* Main Content */}
                      <div className="flex-1">
                        {/* Header with Categories */}
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                          <h3 className="text-xl font-bold text-gray-900 flex-1">
                            {center.name}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {center.categories.map(
                              (category: string, idx: number) => (
                                <Badge
                                  key={idx}
                                  variant="secondary"
                                  className={getCategoryColor(category)}
                                >
                                  {category}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {center.description}
                        </p>

                        {/* Specialties */}
                        {center.specialties && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">
                              Schwerpunkte:
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {center.specialties.map(
                                (specialty: string, idx: number) => (
                                  <Badge
                                    key={idx}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {specialty}
                                  </Badge>
                                )
                              )}
                            </div>
                          </div>
                        )}

                        {/* Languages */}
                        {center.languages && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">
                              Sprachen:
                            </h4>
                            <p className="text-sm text-gray-600">
                              {center.languages.join(", ")}
                            </p>
                          </div>
                        )}

                        {/* Opening Hours */}
                        <div className="flex items-start gap-2 text-sm text-gray-600 mb-4">
                          <Clock className="w-4 h-4 mt-0.5 text-coral-500 flex-shrink-0" />
                          <span>{center.openingHours}</span>
                        </div>

                        {/* Address */}
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mt-0.5 text-red-500 flex-shrink-0" />
                          <span>{center.contact.address}</span>
                        </div>
                      </div>

                      {/* Contact Information - Sidebar */}
                      <div className="lg:w-80 flex-shrink-0">
                        <div className="space-y-3">
                          {/* Phone */}
                          <motion.a
                            href={`tel:${center.contact.phone}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center p-3 bg-sage-50 rounded-lg hover:bg-sage-100 transition-colors group"
                          >
                            <Phone className="w-4 h-4 mr-3 text-sage-600" />
                            <span className="text-sm font-medium text-sage-700 group-hover:text-sage-800">
                              {center.contact.phone}
                            </span>
                          </motion.a>

                          {/* Email */}
                          <motion.a
                            href={`mailto:${center.contact.email}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center p-3 bg-warm-50 rounded-lg hover:bg-warm-100 transition-colors group"
                          >
                            <Mail className="w-4 h-4 mr-3 text-warm-600" />
                            <span className="text-sm font-medium text-warm-700 group-hover:text-warm-800 break-all">
                              {center.contact.email}
                            </span>
                          </motion.a>

                          {/* Website */}
                          {center.contact.website && (
                            <motion.a
                              href={center.contact.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex items-center p-3 bg-coral-50 rounded-lg hover:bg-coral-100 transition-colors group"
                            >
                              <Globe className="w-4 h-4 mr-3 text-coral-500" />
                              <span className="text-sm font-medium text-coral-600 group-hover:text-coral-700 break-all">
                                Website besuchen
                              </span>
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results Message */}
          {filteredCenters.length === 0 && (
            <motion.div variants={itemVariants} className="text-center py-12">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Keine Beratungsstellen gefunden
                  </h3>
                  <p className="text-gray-600">
                    Für die ausgewählte Kategorie sind aktuell keine
                    Beratungsstellen verfügbar.
                  </p>
                  <Button
                    className="mt-4"
                    onClick={() => setSelectedCategory("all")}
                  >
                    Alle Kategorien anzeigen
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </motion.div>
    </Layout>
  );
}
