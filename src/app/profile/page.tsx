"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  ArrowLeft,
  Heart,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [profileData, setProfileData] = useState({
    vorname: user?.user_metadata?.vorname || "",
    nachname: user?.user_metadata?.nachname || "",
    email: user?.email || "",
    telefon: user?.user_metadata?.telefon || "",
    adresse: user?.user_metadata?.adresse || "",
    plz: user?.user_metadata?.plz || "",
    stadt: user?.user_metadata?.stadt || "",
    interessen: user?.user_metadata?.interessen || "",
    avatar_url: user?.user_metadata?.avatar_url || "",
    // Sichtbarkeits-Einstellungen
    sichtbarkeit: user?.user_metadata?.sichtbarkeit || "nein", // ja, plz, nein
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Hier würde normalerweise der API-Call zur Aktualisierung des Profils stehen
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      toast({
        title: "Profil gespeichert",
        description: "Ihre Profildaten wurden erfolgreich aktualisiert.",
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description:
          "Beim Speichern ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-warm-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="hover:bg-sage-100"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mein Profil</h1>
              <p className="text-gray-600">
                Verwalten Sie Ihre persönlichen Informationen und Einstellungen
              </p>
            </div>
          </div>

          {user.is_helper && (
            <Badge variant="secondary" className="mb-4">
              <Heart className="w-4 h-4 mr-1" />
              Helferin
            </Badge>
          )}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 max-w-4xl mx-auto"
        >
          {/* Profilbild */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-sage-600" />
                  Profilbild
                </CardTitle>
                <CardDescription>
                  Laden Sie ein Profilbild hoch, um Ihr Profil zu
                  personalisieren
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={profileData.avatar_url} />
                    <AvatarFallback className="bg-sage-100 text-sage-700 text-lg">
                      {profileData.vorname.charAt(0)}
                      {profileData.nachname.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Bild hochladen
                    </Button>
                    <p className="text-xs text-gray-500">
                      JPG, PNG oder GIF. Max 5MB.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Persönliche Daten */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-sage-600" />
                  Persönliche Daten
                </CardTitle>
                <CardDescription>
                  Ihre grundlegenden Informationen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vorname">Vorname</Label>
                    <Input
                      id="vorname"
                      value={profileData.vorname}
                      onChange={(e) =>
                        handleInputChange("vorname", e.target.value)
                      }
                      placeholder="Ihr Vorname"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nachname">Nachname</Label>
                    <Input
                      id="nachname"
                      value={profileData.nachname}
                      onChange={(e) =>
                        handleInputChange("nachname", e.target.value)
                      }
                      placeholder="Ihr Nachname"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail-Adresse</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="ihre.email@beispiel.de"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefon">Telefonnummer</Label>
                  <Input
                    id="telefon"
                    type="tel"
                    value={profileData.telefon}
                    onChange={(e) =>
                      handleInputChange("telefon", e.target.value)
                    }
                    placeholder="+49 xxx xxxxxxxx"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Adressdaten */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-sage-600" />
                  Adressdaten
                </CardTitle>
                <CardDescription>
                  Ihre Anschrift für die Mitgliederkarte
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="adresse">Straße und Hausnummer</Label>
                  <Input
                    id="adresse"
                    value={profileData.adresse}
                    onChange={(e) =>
                      handleInputChange("adresse", e.target.value)
                    }
                    placeholder="Musterstraße 123"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="plz">Postleitzahl</Label>
                    <Input
                      id="plz"
                      value={profileData.plz}
                      onChange={(e) => handleInputChange("plz", e.target.value)}
                      placeholder="12345"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stadt">Stadt</Label>
                    <Input
                      id="stadt"
                      value={profileData.stadt}
                      onChange={(e) =>
                        handleInputChange("stadt", e.target.value)
                      }
                      placeholder="Berlin"
                    />
                  </div>
                </div>

                {/* Sichtbarkeits-Einstellungen */}
                <Separator />
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">
                      Sichtbarkeit in der Mitgliederkarte
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Wählen Sie, wie Ihre Adresse für andere Mitglieder
                      angezeigt werden soll
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="sichtbar-ja"
                        name="sichtbarkeit"
                        value="ja"
                        checked={profileData.sichtbarkeit === "ja"}
                        onChange={(e) =>
                          handleInputChange("sichtbarkeit", e.target.value)
                        }
                        className="text-sage-600"
                      />
                      <Label
                        htmlFor="sichtbar-ja"
                        className="flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4 text-green-600" />
                        Ja - Vollständige Adresse anzeigen
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="sichtbar-plz"
                        name="sichtbarkeit"
                        value="plz"
                        checked={profileData.sichtbarkeit === "plz"}
                        onChange={(e) =>
                          handleInputChange("sichtbarkeit", e.target.value)
                        }
                        className="text-sage-600"
                      />
                      <Label
                        htmlFor="sichtbar-plz"
                        className="flex items-center gap-2"
                      >
                        <MapPin className="w-4 h-4 text-yellow-600" />
                        Nur PLZ-Bereich anzeigen
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="sichtbar-nein"
                        name="sichtbarkeit"
                        value="nein"
                        checked={profileData.sichtbarkeit === "nein"}
                        onChange={(e) =>
                          handleInputChange("sichtbarkeit", e.target.value)
                        }
                        className="text-sage-600"
                      />
                      <Label
                        htmlFor="sichtbar-nein"
                        className="flex items-center gap-2"
                      >
                        <EyeOff className="w-4 h-4 text-red-600" />
                        Nein - Adresse nicht anzeigen
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Interessen */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-sage-600" />
                  Interessen & Hobbies
                </CardTitle>
                <CardDescription>
                  Teilen Sie Ihre Interessen mit anderen Mitgliedern
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="interessen">Interessen und Hobbies</Label>
                  <Textarea
                    id="interessen"
                    value={profileData.interessen}
                    onChange={(e) =>
                      handleInputChange("interessen", e.target.value)
                    }
                    placeholder="Beschreiben Sie Ihre Interessen, Hobbies und was Sie gerne machen..."
                    rows={4}
                  />
                  <p className="text-xs text-gray-500">
                    Diese Informationen helfen anderen Mitgliedern, gemeinsame
                    Interessen zu finden.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Speichern Button */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-end gap-4">
                  <Button variant="outline" onClick={() => router.back()}>
                    Abbrechen
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-sage-600 to-warm-600 hover:from-sage-700 hover:to-warm-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? "Speichern..." : "Änderungen speichern"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
