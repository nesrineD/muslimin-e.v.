"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Loader2,
  UserPlus,
  Check,
  Heart,
  Shield,
  CheckCircle2,
} from "lucide-react";

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
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  membershipNumber: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
}

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    firstName: "",
    lastName: "",
    membershipNumber: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    agreeToPrivacy: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password strength calculation
  const getPasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
  };

  const getPasswordStrengthText = (strength: number): string => {
    if (strength === 0) return "";
    if (strength <= 25) return "Sehr schwach";
    if (strength <= 50) return "Schwach";
    if (strength <= 75) return "Mittel";
    return "Stark";
  };

  const getPasswordStrengthColor = (
    strength: number
  ): "default" | "secondary" | "destructive" | "outline" => {
    if (strength <= 25) return "destructive";
    if (strength <= 50) return "destructive";
    if (strength <= 75) return "secondary";
    return "default";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Comprehensive validation
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "E-Mail ist erforderlich";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein";
    }

    if (!formData.firstName) newErrors.firstName = "Vorname ist erforderlich";
    if (!formData.lastName) newErrors.lastName = "Nachname ist erforderlich";
    if (!formData.membershipNumber)
      newErrors.membershipNumber = "Mitgliedsnummer ist erforderlich";

    if (!formData.password) {
      newErrors.password = "Passwort ist erforderlich";
    } else if (getPasswordStrength(formData.password) < 75) {
      newErrors.password = "Das Passwort ist nicht stark genug";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Die Passwörter stimmen nicht überein";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "Sie müssen den Nutzungsbedingungen zustimmen";
    }

    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy =
        "Sie müssen der Datenschutzerklärung zustimmen";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call to register member
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Success - redirect to login with success message
      router.push("/login?registered=true");
    } catch (error) {
      console.error("Registration failed:", error);
      setErrors({
        general:
          "Registrierung fehlgeschlagen. Bitte versuchen Sie es später erneut.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear specific errors when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-warm-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        {/* Header Card */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-sage-600 rounded-full flex items-center justify-center shadow-lg">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">
              Registrierung
            </CardTitle>
            <CardDescription className="text-gray-600">
              Für Vereinsmitglieder - Muslimin Beratung
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Registration Form */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* General Error */}
              {errors.general && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.general}</AlertDescription>
                </Alert>
              )}

              {/* Personal Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="text-gray-700 font-medium"
                  >
                    Vorname *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Vorname"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="pl-10 border-gray-200 focus:border-sage-500 focus:ring-sage-500"
                      required
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="lastName"
                    className="text-gray-700 font-medium"
                  >
                    Nachname *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Nachname"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="pl-10 border-gray-200 focus:border-warm-500 focus:ring-warm-500"
                      required
                    />
                  </div>
                  {errors.lastName && (
                    <p className="text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  E-Mail Adresse *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="deine@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 border-gray-200 focus:border-coral-500 focus:ring-coral-500"
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Membership Number */}
              <div className="space-y-2">
                <Label
                  htmlFor="membershipNumber"
                  className="text-gray-700 font-medium"
                >
                  Mitgliedsnummer *
                </Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="membershipNumber"
                    name="membershipNumber"
                    type="text"
                    placeholder="Deine Mitgliedsnummer"
                    value={formData.membershipNumber}
                    onChange={handleChange}
                    className="pl-10 border-gray-200 focus:border-sage-500 focus:ring-sage-500"
                    required
                  />
                </div>
                {errors.membershipNumber && (
                  <p className="text-sm text-red-600">
                    {errors.membershipNumber}
                  </p>
                )}
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-gray-700 font-medium"
                  >
                    Passwort *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Mindestens 8 Zeichen"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 pr-10 border-gray-200 focus:border-warm-500 focus:ring-warm-500"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Passwortstärke:
                        </span>
                        <Badge
                          variant={getPasswordStrengthColor(passwordStrength)}
                        >
                          {getPasswordStrengthText(passwordStrength)}
                        </Badge>
                      </div>
                      <Progress value={passwordStrength} className="h-2" />
                    </div>
                  )}

                  {errors.password && (
                    <p className="text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-gray-700 font-medium"
                  >
                    Passwort bestätigen *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Passwort wiederholen"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pl-10 pr-10 border-gray-200 focus:border-coral-500 focus:ring-coral-500"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-600">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Privacy & Terms */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-sage-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-gray-700">
                    <p className="mb-2 font-semibold">
                      Datenschutz & Verifizierung:
                    </p>
                    <ul className="space-y-1 text-xs">
                      <li>• Deine Mitgliedschaft wird manuell überprüft</li>
                      <li>• Alle Daten werden DSGVO-konform verarbeitet</li>
                      <li>• Zugang nur für verifizierte Vereinsmitglieder</li>
                      <li>
                        • Automatische Löschung nach 6 Monaten Inaktivität
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          agreeToTerms: !!checked,
                        }))
                      }
                      className="border-gray-300 data-[state=checked]:bg-sage-600 data-[state=checked]:border-sage-600 mt-1"
                    />
                    <div className="space-y-1">
                      <Label
                        htmlFor="agreeToTerms"
                        className="text-sm font-normal text-gray-700 leading-relaxed"
                      >
                        Ich stimme den{" "}
                        <Link
                          href="/terms"
                          className="text-sage-600 hover:underline font-medium"
                        >
                          Nutzungsbedingungen
                        </Link>{" "}
                        zu *
                      </Label>
                      {errors.agreeToTerms && (
                        <p className="text-sm text-red-600">
                          {errors.agreeToTerms}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreeToPrivacy"
                      name="agreeToPrivacy"
                      checked={formData.agreeToPrivacy}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          agreeToPrivacy: !!checked,
                        }))
                      }
                      className="border-gray-300 data-[state=checked]:bg-warm-600 data-[state=checked]:border-warm-600 mt-1"
                    />
                    <div className="space-y-1">
                      <Label
                        htmlFor="agreeToPrivacy"
                        className="text-sm font-normal text-gray-700 leading-relaxed"
                      >
                        Ich stimme der{" "}
                        <Link
                          href="/privacy"
                          className="text-warm-600 hover:underline font-medium"
                        >
                          Datenschutzerklärung
                        </Link>{" "}
                        zu *
                      </Label>
                      {errors.agreeToPrivacy && (
                        <p className="text-sm text-red-600">
                          {errors.agreeToPrivacy}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-coral-600 hover:bg-coral-700 text-white font-semibold py-4 shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registrierung wird bearbeitet...
                  </>
                ) : (
                  "Registrierung beantragen"
                )}
              </Button>

              {/* Links */}
              <div className="text-center space-y-2 pt-4 border-t border-gray-100">
                <p className="text-gray-600 text-sm">
                  Bereits registriert?{" "}
                  <Link
                    href="/login"
                    className="text-coral-600 hover:text-coral-700 font-semibold hover:underline"
                  >
                    Hier anmelden
                  </Link>
                </p>

                <p className="text-gray-600 text-sm">
                  Möchten Sie helfen?{" "}
                  <Link
                    href="/helper/register"
                    className="text-teal-600 hover:text-teal-700 font-semibold hover:underline"
                  >
                    Als Helferin registrieren{" "}
                    <Heart className="inline w-4 h-4 text-pink-500" />
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
