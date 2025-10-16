"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Check, Info, Loader2, UserCheck, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

type Category = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

type FormData = {
  selectedCategories: string[];
  motivation: string;
  qualifications: string;
  agreeToTerms: boolean;
};

const categories: Category[] = [
  {
    id: "psychological",
    name: "Psychologische Beratung",
    description:
      "Unterstützung bei Stress, Angst, Depression oder anderen psychischen Belastungen",
    icon: "🧠",
  },
  {
    id: "social",
    name: "Sozialberatung",
    description:
      "Hilfe bei Behördengängen, Anträgen, Kindergeld und sozialen Angelegenheiten",
    icon: "🤝",
  },
  {
    id: "pregnancy",
    name: "Schwangerschaftsbegleitung",
    description: "Beratung während der Schwangerschaft und nach der Geburt",
    icon: "🤱",
  },
  {
    id: "other",
    name: "Andere Anliegen",
    description: "Weitere Themen in denen Sie helfen möchten",
    icon: "💬",
  },
];

export default function HelperRegistrationPage() {
  const router = useRouter();
  const { user, loading, registerAsHelper } = useAuth();

  const form = useForm<FormData>({
    defaultValues: {
      selectedCategories: [],
      motivation: "",
      qualifications: "",
      agreeToTerms: false,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = form;
  const watchedCategories = watch("selectedCategories");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(
          "/login?redirect=/helper/register&message=helper-registration"
        );
        return;
      }
      if (user.is_helper) {
        // User is already registered as helper, redirect to helper dashboard
        router.push("/helper/dashboard");
        return;
      }
    }
  }, [user, loading, router]);

  const handleCategoryToggle = (categoryId: string) => {
    const currentCategories = watchedCategories || [];
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter((id) => id !== categoryId)
      : [...currentCategories, categoryId];

    setValue("selectedCategories", newCategories);

    // Clear validation error when categories are selected
    if (newCategories.length > 0) {
      clearErrors("selectedCategories");
    }
  };

  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data: FormData) => {
    console.log("Form submitted with data:", data);

    // Validate categories selection
    if (data.selectedCategories.length === 0) {
      setError("selectedCategories", {
        type: "manual",
        message: "Bitte wählen Sie mindestens eine Kategorie aus",
      });
      return;
    }

    // Validate terms agreement
    if (!data.agreeToTerms) {
      setError("agreeToTerms", {
        type: "manual",
        message: "Sie müssen den Bedingungen zustimmen",
      });
      return;
    }

    try {
      // Call registerAsHelper from auth context
      console.log("Registering user as helper...");
      const success = await registerAsHelper(data.selectedCategories);

      if (success) {
        console.log("Helper registration successful:", data);
        setIsSuccess(true);

        // Redirect to helper dashboard
        setTimeout(() => {
          console.log("Redirecting to helper dashboard...");
          try {
            router.push("/helper/dashboard");
          } catch (routerError) {
            console.error(
              "Router.push failed, using window.location:",
              routerError
            );
            window.location.href = "/helper/dashboard";
          }
        }, 1500);
      } else {
        throw new Error("Helper registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  // Show success message before redirect
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-warm-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-emerald-600" />
            </div>
            <CardTitle className="text-xl text-gray-900 mb-2">
              Registrierung erfolgreich!
            </CardTitle>
            <CardDescription className="mb-4">
              Sie werden in Kürze zu Ihrem Helferinnen-Dashboard
              weitergeleitet...
            </CardDescription>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-warm-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Überprüfung der Anmeldung...
            </h2>
            <p className="text-gray-600">
              Bitte warten Sie, während wir Ihre Berechtigung prüfen.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!user) {
    return null;
  }

  // Show authentication required message if not authenticated (backup)
  if (false) {
    return (
      <div className="min-h-screen bg-warm-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Anmeldung erforderlich
            </h2>
            <p className="text-gray-600 mb-6">
              Die Registrierung als Helferin ist nur für registrierte
              Vereinsmitglieder möglich. Bitte melden Sie sich zuerst mit Ihrem
              Mitgliedskonto an.
            </p>
            <div className="space-y-3">
              <Link
                href="/login?redirect=/helper/register"
                className="block w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                Als Mitglied anmelden
              </Link>
              <Link
                href="/register"
                className="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Noch kein Mitglied? Hier registrieren
              </Link>
              <Link
                href="/"
                className="block text-gray-500 hover:text-gray-700 mt-4"
              >
                ← Zurück zur Startseite
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-emerald-800">
                Muslimin-Beratung
              </h1>
              <span className="ml-4 text-gray-500">
                Als Helferin registrieren
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Angemeldet als: {user?.user_metadata?.vorname}{" "}
                {user?.user_metadata?.nachname} ({user?.email})
              </span>
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-800"
              >
                Zurück zum Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message for Authenticated Member */}
        <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6 mb-6">
          <div className="flex items-center">
            <div className="text-4xl mr-4">👋</div>
            <div>
              <h3 className="text-lg font-bold text-emerald-800">
                Hallo {user?.user_metadata?.vorname}!
              </h3>
              <p className="text-emerald-700 text-sm">
                Schön, dass Sie als Vereinsmitglied ({user?.email}) anderen
                helfen möchten. Nach der Registrierung können Sie sofort Ihre
                Verfügbarkeiten im Dashboard eintragen.
              </p>
            </div>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <UserCheck className="w-8 h-8 text-emerald-600" />
            </div>
            <CardTitle className="text-3xl text-gray-900">
              Als Helferin registrieren
            </CardTitle>
            <CardDescription className="text-lg">
              Werden Sie Teil unseres Teams und helfen Sie anderen
              Vereinsmitgliedern
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Categories Selection */}
              <div className="space-y-4">
                <div>
                  <Label className="text-lg font-semibold text-gray-900">
                    In welchen Bereichen möchten Sie helfen? *
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    Wählen Sie mindestens einen Bereich aus, in dem Sie anderen
                    helfen möchten
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categories.map((category) => (
                    <Card
                      key={category.id}
                      className={cn(
                        "cursor-pointer transition-all duration-200 hover:shadow-md",
                        watchedCategories?.includes(category.id)
                          ? "ring-2 ring-emerald-500 bg-emerald-50 border-emerald-200"
                          : "border-gray-200 hover:border-emerald-300"
                      )}
                      onClick={() => handleCategoryToggle(category.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="text-3xl">{category.icon}</div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 mb-2">
                              {category.name}
                            </h4>
                            <p className="text-gray-600 text-sm mb-3">
                              {category.description}
                            </p>
                            {watchedCategories?.includes(category.id) && (
                              <div className="flex items-center text-emerald-600">
                                <Check className="w-4 h-4 mr-2" />
                                <span className="text-sm font-medium">
                                  Ausgewählt
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {errors.selectedCategories && (
                  <p className="text-red-500 text-sm">
                    {errors.selectedCategories.message}
                  </p>
                )}
              </div>

              {/* Motivation */}
              <div className="space-y-2">
                <Label htmlFor="motivation">
                  Warum möchten Sie als Helferin tätig werden? *
                </Label>
                <Textarea
                  id="motivation"
                  placeholder="Erzählen Sie uns von Ihrer Motivation und wie Sie anderen helfen möchten..."
                  rows={4}
                  {...register("motivation", {
                    required: "Motivation ist erforderlich",
                    minLength: {
                      value: 10,
                      message: "Bitte teilen Sie mindestens 10 Zeichen mit uns",
                    },
                  })}
                  className={cn(errors.motivation && "border-red-500")}
                />
                {errors.motivation && (
                  <p className="text-red-500 text-sm">
                    {errors.motivation.message}
                  </p>
                )}
              </div>

              {/* Qualifications (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="qualifications">
                  Relevante Erfahrungen oder Qualifikationen (optional)
                </Label>
                <Textarea
                  id="qualifications"
                  placeholder="Z.B. Ausbildung, berufliche Erfahrung, persönliche Erfahrungen..."
                  rows={3}
                  {...register("qualifications")}
                />
              </div>

              {/* Availability Note */}
              <Alert variant="default">
                <Info className="h-4 w-4" />
                <AlertTitle>
                  Verfügbarkeiten nach Registrierung eintragen
                </AlertTitle>
                <AlertDescription>
                  Nach Ihrer Registrierung können Sie sofort Ihre
                  Verfügbarkeiten flexibel im Helferinnen-Dashboard mit unserem
                  professionellen Kalendersystem verwalten.
                </AlertDescription>
              </Alert>

              {/* Terms Agreement */}
              <div className="space-y-3 border-t pt-6">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeToTerms"
                    checked={watch("agreeToTerms")}
                    onCheckedChange={(checked) => {
                      setValue("agreeToTerms", checked === true);
                      // Clear error when user checks the box
                      if (checked) {
                        clearErrors("agreeToTerms");
                      }
                    }}
                    className="mt-1"
                  />
                  <Label
                    htmlFor="agreeToTerms"
                    className="text-sm leading-relaxed cursor-pointer"
                    onClick={(e) => {
                      // Prevent toggling when clicking on the link
                      if ((e.target as HTMLElement).tagName === "A") {
                        return;
                      }
                      const currentValue = watch("agreeToTerms");
                      setValue("agreeToTerms", !currentValue);
                      // Clear error when user checks the box
                      if (!currentValue) {
                        clearErrors("agreeToTerms");
                      }
                    }}
                  >
                    Ich stimme den{" "}
                    <Link
                      href="/helper-terms"
                      className="text-emerald-600 hover:text-emerald-700 underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Helferinnen-Richtlinien
                    </Link>{" "}
                    zu und verpflichte mich, vertraulich und professionell zu
                    beraten. *
                  </Label>
                </div>
                {errors.agreeToTerms && (
                  <p className="text-red-500 text-sm">
                    {errors.agreeToTerms.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="min-w-[200px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Registrierung läuft...
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4 mr-2" />
                      Als Helferin registrieren
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Box */}
        <Alert variant="default" className="mt-6">
          <Users className="h-4 w-4" />
          <AlertTitle>Was passiert als nächstes?</AlertTitle>
          <AlertDescription>
            Nach Ihrer Registrierung werden Sie automatisch zum
            Helferinnen-Dashboard weitergeleitet, wo Sie sofort Ihre
            Verfügbarkeiten im Kalender eintragen können.
          </AlertDescription>
        </Alert>
      </main>
    </div>
  );
}
