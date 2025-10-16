"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Video,
  ArrowLeft,
  Filter,
  MoreVertical,
  User,
  Users,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";

// Mock data with personas from flow.md
const mockAllAppointments = [
  {
    id: 1,
    type: "Psychologische Beratung",
    helperName: "Sainab Helper", // Persona 1: helper@email.com
    memberName: "",
    date: new Date("2025-09-30T10:00:00"),
    description: "Unterstützung bei Stress und Überforderung",
    meetingLink: "https://meet.jit.si/beratung-zahra-001",
    role: "member" as const,
    status: "upcoming" as const,
  },
  {
    id: 2,
    type: "Sozialberatung",
    helperName: "",
    memberName: "Zahra Mitglied", // Persona 2: mitglied@email.com
    date: new Date("2025-10-02T14:00:00"),
    description: "Beratung zu Behördenangelegenheiten",
    meetingLink: "https://meet.jit.si/beratung-sainab-001",
    role: "helper" as const,
    status: "upcoming" as const,
  },
  {
    id: 3,
    type: "Schwangerschaftsbegleitung",
    helperName: "",
    memberName: "Fatima HelperMitglied", // Persona 3: helpermitglied@email.com
    date: new Date("2025-10-05T16:30:00"),
    description: "Begleitung in der Frühschwangerschaft",
    meetingLink: "https://meet.jit.si/beratung-sainab-002",
    role: "helper" as const,
    status: "upcoming" as const,
  },
  {
    id: 4,
    type: "Sozialberatung",
    helperName: "Fatima HelperMitglied", // Persona 3: helpermitglied@email.com
    memberName: "",
    date: new Date("2025-10-07T11:00:00"),
    description: "Beratung zu Familienfragen",
    meetingLink: "https://meet.jit.si/beratung-zahra-002",
    role: "member" as const,
    status: "upcoming" as const,
  },
  {
    id: 5,
    type: "Psychologische Beratung",
    helperName: "Sainab Helper", // Persona 1: helper@email.com
    memberName: "",
    date: new Date("2025-09-15T14:30:00"),
    description: "Hilfe bei Angstzuständen",
    meetingLink: "",
    role: "member" as const,
    status: "completed" as const,
  },
];

export default function MyAppointmentsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<"all" | "member" | "helper">(
    "member" // Start with member tab by default
  );
  const [appointments] = useState(mockAllAppointments);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/my-appointments");
    }
  }, [user, loading, router]);

  // Force member-related tabs for non-helpers
  useEffect(() => {
    if (user && !user.is_helper && activeTab === "helper") {
      setActiveTab("member");
    }
  }, [user, activeTab]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Lade Termine...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!user) {
    return null;
  }

  const isWithin15Minutes = (appointmentDate: Date) => {
    const now = new Date();
    const timeDiff = appointmentDate.getTime() - now.getTime();
    return timeDiff > 0 && timeDiff <= 15 * 60 * 1000;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("de-DE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Filter appointments based on active tab
  const filteredAppointments = appointments.filter((appointment) => {
    if (activeTab === "all") {
      // For non-helpers, "all" should only show member appointments
      if (!user?.is_helper) {
        return appointment.role === "member";
      }
      return true;
    }
    return appointment.role === activeTab;
  });

  // Group appointments by status
  const upcomingAppointments = filteredAppointments.filter(
    (a) => a.status === "upcoming"
  );
  const pastAppointments = filteredAppointments.filter(
    (a) => a.status === "completed"
  );

  // AppointmentCard Component
  const AppointmentCard = ({ appointment }: { appointment: any }) => (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md",
        appointment.role === "member" && "border-blue-200 bg-blue-50/50",
        appointment.role === "helper" && "border-emerald-200 bg-emerald-50/50"
      )}
    >
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <Badge
                variant={
                  appointment.role === "member" ? "secondary" : "default"
                }
                className={cn(
                  appointment.role === "member" && "bg-blue-100 text-blue-800",
                  appointment.role === "helper" &&
                    "bg-emerald-100 text-emerald-800"
                )}
              >
                {appointment.role === "member" ? (
                  <>
                    <User className="w-3 h-3 mr-1" /> Ratsuchende
                  </>
                ) : (
                  <>
                    <Users className="w-3 h-3 mr-1" /> Helferin
                  </>
                )}
              </Badge>
              <Badge variant="outline">{appointment.type}</Badge>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {formatTime(appointment.date)}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Details anzeigen</DropdownMenuItem>
                  {appointment.status === "upcoming" && (
                    <>
                      {appointment.role === "member" ? (
                        <>
                          <DropdownMenuItem>Umbuchen</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Stornieren
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <>
                          <DropdownMenuItem>
                            Notizen hinzufügen
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Termin verschieben
                          </DropdownMenuItem>
                        </>
                      )}
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Date and Time */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              {formatDate(appointment.date)}
            </h3>
            <p className="text-sm font-medium text-gray-700">
              {appointment.role === "member"
                ? `Helferin: ${appointment.helperName}`
                : `Mitglied: ${appointment.memberName}`}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {appointment.description}
          </p>

          {/* Actions */}
          {appointment.status === "upcoming" && (
            <div className="flex space-x-2 pt-2 border-t border-gray-200">
              {isWithin15Minutes(appointment.date) && (
                <Button
                  className="flex-1"
                  onClick={() => window.open(appointment.meetingLink, "_blank")}
                >
                  <Video className="w-4 h-4 mr-2" />
                  Meeting beitreten
                </Button>
              )}
              {!isWithin15Minutes(appointment.date) && (
                <div className="flex-1">
                  <p className="text-sm text-center text-gray-500 py-2">
                    Meeting startet in{" "}
                    {Math.ceil(
                      (appointment.date.getTime() - new Date().getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    Tagen
                  </p>
                </div>
              )}
            </div>
          )}

          {appointment.status === "completed" && (
            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
              <Badge
                variant="outline"
                className="text-green-700 border-green-300"
              >
                ✓ Abgeschlossen
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout className="bg-warm-50">
      <div className="min-h-screen">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-emerald-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Alle meine Termine
                  </h1>
                  <p className="text-gray-600">
                    Übersicht über alle Ihre Termine als Mitglied und Helferin
                  </p>
                </div>
              </div>

              <Link href="/book">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  Neuen Termin buchen
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm rounded-lg p-2">
              <Button
                variant={activeTab === "all" ? "default" : "outline"}
                onClick={() => setActiveTab("all")}
                className="flex items-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Alle Termine ({appointments.length})</span>
              </Button>
              <Button
                variant={activeTab === "member" ? "default" : "outline"}
                onClick={() => setActiveTab("member")}
                className="flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>
                  Als Ratsuchende (
                  {appointments.filter((a) => a.role === "member").length})
                </span>
              </Button>
              {user?.is_helper && (
                <Button
                  variant={activeTab === "helper" ? "default" : "outline"}
                  onClick={() => setActiveTab("helper")}
                  className="flex items-center space-x-2"
                >
                  <Users className="w-4 h-4" />
                  <span>
                    Als Helferin (
                    {appointments.filter((a) => a.role === "helper").length})
                  </span>
                </Button>
              )}
            </div>
          </motion.div>

          {/* Appointments Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Upcoming Appointments */}
            {upcomingAppointments.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-emerald-600" />
                  Anstehende Termine ({upcomingAppointments.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingAppointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Past Appointments */}
            {pastAppointments.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-gray-600" />
                  Vergangene Termine ({pastAppointments.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastAppointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Empty State */}
            {filteredAppointments.length === 0 && (
              <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Keine Termine gefunden
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {activeTab === "all"
                      ? "Sie haben derzeit keine Termine."
                      : activeTab === "member"
                        ? "Sie haben derzeit keine Termine als Ratsuchende."
                        : "Sie haben derzeit keine Termine als Helferin."}
                  </p>
                  <Link href="/book">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      <Calendar className="w-4 h-4 mr-2" />
                      Ersten Termin buchen
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </main>
      </div>
    </Layout>
  );
}
