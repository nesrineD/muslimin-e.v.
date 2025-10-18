"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  HandHeart,
  Plus,
  Video,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Users,
  Heart,
  Settings,
  Home,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";

// Mock data with personas from flow.md
const mockMemberAppointments = [
  {
    id: 1,
    type: "Psychologische Beratung",
    helperName: "Sainab Helper", // Persona 1: helper@email.com
    date: new Date("2025-09-30T10:00:00"),
    description: "Unterstützung bei Stress und Überforderung",
    meetingLink: "https://meet.jit.si/beratung-zahra-001",
    role: "member" as const,
  },
  {
    id: 4,
    type: "Sozialberatung",
    helperName: "Fatima HelperMitglied", // Persona 3: helpermitglied@email.com
    date: new Date("2025-10-28T11:00:00"),
    description: "Beratung zu Behördenangelegenheiten",
    meetingLink: "https://meet.jit.si/beratung-zahra-002",
    role: "member" as const,
  },
];

const mockHelperAppointments = [
  {
    id: 2,
    type: "Psychologische Beratung",
    memberName: "Zahra Mitglied", // Persona 2: mitglied@email.com
    date: new Date("2025-10-25T10:00:00"),
    description: "Unterstützung bei Stress und Überforderung",
    meetingLink: "https://meet.jit.si/beratung-sainab-001",
    role: "helper" as const,
  },
  {
    id: 3,
    type: "Sozialberatung",
    memberName: "Fatima HelperMitglied", // Persona 3: helpermitglied@email.com
    date: new Date("2025-10-28T16:00:00"),
    description: "Beratung zu Familienfragen",
    meetingLink: "https://meet.jit.si/beratung-sainab-002",
    role: "helper" as const,
  },
];

const mockPastAppointments = [
  {
    id: 5,
    type: "Schwangerschaftsbegleitung",
    helperName: "Sainab Helper", // Persona 1: helper@email.com
    date: new Date("2025-09-15T14:30:00"),
    status: "abgeschlossen",
    role: "member" as const,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [activeRole, setActiveRole] = useState<"member" | "helper">("member");
  const [memberAppointments] = useState(mockMemberAppointments);
  const [helperAppointments] = useState(mockHelperAppointments);
  const [pastAppointments] = useState(mockPastAppointments);

  // User data from auth - use real helper status
  const userData = {
    ...user,
    isHelper: user?.is_helper || false, // Use actual helper registration status
    bookedAppointments: 2, // Current member appointments
    maxAppointments: 3,
    helperStats: {
      availableHours: 12,
      openRequests: 3,
      totalHelped: 23,
    },
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/dashboard");
    }
  }, [user, loading, router]);

  // Redirect helpers to dedicated helper dashboard
  useEffect(() => {
    if (user?.is_helper) {
      router.push("/helper/dashboard");
    }
  }, [user?.is_helper, router]);

  // Force member role for non-helpers
  useEffect(() => {
    if (user && !user.is_helper && activeRole === "helper") {
      setActiveRole("member");
    }
  }, [user, activeRole]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Lade Dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!user) {
    return null;
  }

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

  const isWithin15Minutes = (appointmentDate: Date) => {
    const now = new Date();
    const timeDiff = appointmentDate.getTime() - now.getTime();
    return timeDiff > 0 && timeDiff <= 15 * 60 * 1000; // 15 minutes in milliseconds
  };

  const getTimeUntilAppointment = (appointmentDate: Date) => {
    const now = new Date();
    const timeDiff = appointmentDate.getTime() - now.getTime();

    if (timeDiff <= 0) return "Der Termin hat bereits begonnen";

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `in ${days} Tag${days > 1 ? "en" : ""}`;
    if (hours > 0) return `in ${hours} Stunde${hours > 1 ? "n" : ""}`;
    return `in ${minutes} Minute${minutes > 1 ? "n" : ""}`;
  };

  const currentAppointments =
    activeRole === "member" ? memberAppointments : helperAppointments;
  const remainingBookings =
    3 -
    (memberAppointments.length +
      pastAppointments.filter((a) => a.role === "member").length);
  const nextAppointment = [...memberAppointments, ...helperAppointments].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  )[0];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
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

  // Reusable Components
  const QuickAction = ({
    title,
    subtitle,
    badge,
    href,
    icon: Icon,
    className,
    disabled = false,
  }: {
    title: string;
    subtitle: string;
    badge?: string;
    href: string;
    icon: any;
    className?: string;
    disabled?: boolean;
  }) => (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      <Link
        href={disabled ? "#" : href}
        className={disabled ? "pointer-events-none" : ""}
      >
        <Card
          className={cn(
            "border-2 border-transparent transition-all duration-300 cursor-pointer",
            className,
            disabled && "opacity-50"
          )}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-opacity-20 rounded-lg">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-600">{subtitle}</p>
                  {badge && (
                    <Badge variant="outline" className="mt-1">
                      {badge}
                    </Badge>
                  )}
                </div>
              </div>
              <ArrowRight className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
  }: {
    title: string;
    value: string | number;
    icon: any;
    color: string;
  }) => (
    <Card className="bg-white/70 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
          <Icon className={`w-8 h-8 ${color}`} />
        </div>
      </CardContent>
    </Card>
  );

  const AppointmentSection = ({
    title,
    appointments,
    type,
  }: {
    title: string;
    appointments: any[];
    type: "member" | "helper";
  }) => (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-emerald-600" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {appointments.length > 0 ? (
          <div className="space-y-3">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className={cn(
                  "border rounded-lg p-4 space-y-3",
                  type === "member" && "border-blue-200 bg-blue-50",
                  type === "helper" && "border-emerald-200 bg-emerald-50"
                )}
              >
                <div className="flex justify-between items-start">
                  <Badge variant={type === "member" ? "secondary" : "default"}>
                    {appointment.type}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {formatDate(appointment.date)}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">
                    {type === "member"
                      ? `Helferin: ${appointment.helperName}`
                      : `Mitglied: ${appointment.memberName}`}
                  </p>
                  <p className="text-sm text-gray-600">
                    {appointment.description}
                  </p>
                </div>
                {isWithin15Minutes(appointment.date) && (
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() =>
                      window.open(appointment.meetingLink, "_blank")
                    }
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Meeting beitreten
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-600">
              Keine {type === "member" ? "gebuchten" : "Helfer-"} Termine
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  // Member Dashboard Component
  const MemberDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickAction
          title="Termin buchen"
          subtitle={`Verfügbare Termine buchen`}
          badge={`${memberAppointments.length}/3 gebucht`}
          href="/book"
          icon={Calendar}
          className="hover:border-sage-300 bg-sage-50"
          disabled={remainingBookings <= 0}
        />
        <QuickAction
          title="Meine Termine"
          subtitle={
            nextAppointment
              ? `Nächster: ${formatTime(nextAppointment.date)}`
              : "Keine Termine"
          }
          href="/my-appointments"
          icon={Clock}
          className="hover:border-warm-300 bg-warm-50"
        />
        <QuickAction
          title="Mitgliederkarte"
          subtitle="Mitglieder in Ihrer Nähe finden"
          href="/member-map"
          icon={Users}
          className="hover:border-blue-300 bg-blue-50"
        />
      </div>
      {!userData.isHelper && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickAction
            title="Als Helferin"
            subtitle="Anderen helfen"
            href="/helper/register"
            icon={Heart}
            className="hover:border-coral-300 bg-coral-50"
          />
        </div>
      )}
      <AppointmentSection
        title="Meine Termine als Ratsuchende"
        appointments={memberAppointments}
        type="member"
      />
    </div>
  );

  // Helper Dashboard Component
  const HelperDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Verfügbare Stunden"
          value={`${userData.helperStats.availableHours}h`}
          icon={Clock}
          color="text-emerald-600"
        />
        <StatCard
          title="Offene Anfragen"
          value={userData.helperStats.openRequests}
          icon={AlertCircle}
          color="text-orange-600"
        />
        <StatCard
          title="Nächster Termin"
          value="Heute 16:00"
          icon={Calendar}
          color="text-blue-600"
        />
        <StatCard
          title="Geholfen"
          value={`${userData.helperStats.totalHelped} Termine`}
          icon={CheckCircle}
          color="text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <QuickAction
          title="Verfügbarkeiten"
          subtitle="Zeiten verwalten"
          href="/helper/availability"
          icon={Calendar}
          className="hover:border-sage-300 bg-sage-50"
        />
        <QuickAction
          title="Meine Helfer-Termine"
          subtitle="Anfragen verwalten"
          href="/helper/appointments"
          icon={Users}
          className="hover:border-warm-300 bg-warm-50"
        />
      </div>

      <AppointmentSection
        title="Meine Termine als Helferin"
        appointments={helperAppointments}
        type="helper"
      />
    </div>
  );

  return (
    <Layout className="bg-warm-50">
      <div className="min-h-screen">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-emerald-100"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12 border-2 border-emerald-200">
                  <AvatarImage
                    src={
                      user?.user_metadata?.avatar_url ||
                      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=150&h=150&fit=crop&crop=face"
                    }
                  />
                  <AvatarFallback className="bg-emerald-100 text-emerald-700 text-lg font-semibold">
                    {user?.user_metadata?.vorname?.charAt(0) || "M"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Willkommen zurück,{" "}
                    {user?.user_metadata?.vorname || "Mitglied"}!
                  </h1>
                  <p className="text-gray-600">
                    {new Intl.DateTimeFormat("de-DE", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }).format(new Date())}
                  </p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="hidden sm:flex items-center space-x-3"
              >
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-700"
                >
                  {remainingBookings} Termine verfügbar
                </Badge>
              </motion.div>
            </div>
          </div>
        </motion.header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Role Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            {userData.isHelper && (
              <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm rounded-lg p-2">
                <Button
                  variant={activeRole === "member" ? "default" : "outline"}
                  onClick={() => setActiveRole("member")}
                  className="flex items-center space-x-2"
                >
                  <span>👤</span>
                  <span>Als Mitglied</span>
                </Button>
                <Button
                  variant={activeRole === "helper" ? "default" : "outline"}
                  onClick={() => setActiveRole("helper")}
                  className="flex items-center space-x-2"
                >
                  <span>🤝</span>
                  <span>Als Helferin</span>
                </Button>
              </div>
            )}
          </motion.div>

          {/* Conditional Dashboard Content */}
          <motion.div
            key={activeRole}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Show only member dashboard if user is not a helper */}
            {!userData.isHelper ? (
              <MemberDashboard />
            ) : /* Show role-based dashboard for helpers */
            activeRole === "member" ? (
              <MemberDashboard />
            ) : (
              <HelperDashboard />
            )}
          </motion.div>
        </main>
      </div>
    </Layout>
  );
}
