"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
  BarChart3,
  Edit3,
} from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import { Layout } from "../../../components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Separator } from "../../../components/ui/separator";
import OptimizedAvailabilityCalendar from "../../../components/OptimizedAvailabilityCalendar";
import { cn } from "../../../lib/utils";

// Mock data with Sainab Helper persona from flow.md
const mockHelper = {
  vorname: "Sainab",
  nachname: "Helper",
  email: "helper@email.com",
  categories: [
    "Psychologische Beratung",
    "Sozialberatung",
    "Schwangerschaftsbegleitung",
  ],
};

const mockUpcomingAppointments = [
  {
    id: "1",
    memberName: "Zahra Mitglied", // Persona 2: mitglied@email.com
    anliegen: "Psychologische Beratung",
    description: "Unterstützung bei Stress und Überforderung",
    scheduledAt: new Date("2025-10-25T10:00:00"),
    duration: 45,
    meetingLink: "https://meet.jit.si/beratung-sainab-001",
  },
  {
    id: "2",
    memberName: "Fatima HelperMitglied", // Persona 3: helpermitglied@email.com
    anliegen: "Schwangerschaftsbegleitung",
    description: "Begleitung in der Frühschwangerschaft",
    scheduledAt: new Date("2025-10-28T16:30:00"),
    duration: 45,
    meetingLink: "https://meet.jit.si/beratung-sainab-002",
  },
];

// Mock data for member appointments (when helper acts as member)
const mockMemberAppointments = [
  {
    id: 1,
    category: "Psychologische Beratung",
    helperName: "Fatima HelperMitglied", // Another helper helping Sainab
    scheduledAt: new Date("2025-01-02T14:00:00"),
    description: "Sainab als Mitglied - Unterstützung bei Arbeitsbelastung",
    meetingLink: "https://meet.jit.si/beratung-sainab-member-001",
    status: "confirmed" as const,
    role: "member" as const,
  },
  {
    id: 2,
    category: "Sozialberatung",
    helperName: "Amina Sozialberaterin",
    scheduledAt: new Date("2025-01-05T10:00:00"),
    description: "Behördengang Unterstützung",
    meetingLink: "https://meet.jit.si/beratung-sainab-member-002",
    status: "confirmed" as const,
    role: "member" as const,
  },
];

// Sainab has availability on weekends (whole day)
const mockWeeklyAvailability = [
  { day: "Montag", slots: [] },
  { day: "Dienstag", slots: [] },
  { day: "Mittwoch", slots: [] },
  { day: "Donnerstag", slots: [] },
  { day: "Freitag", slots: [] },
  {
    day: "Samstag",
    slots: [
      { start: "08:00", end: "12:00" },
      { start: "13:00", end: "20:00" },
    ],
  },
  {
    day: "Sonntag",
    slots: [
      { start: "08:00", end: "12:00" },
      { start: "13:00", end: "20:00" },
    ],
  },
];

export default function HelperDashboard() {
  const router = useRouter();
  const { user: authUser, loading } = useAuth();
  const [user, setUser] = useState(mockHelper);
  const [appointments] = useState(mockUpcomingAppointments);
  const [memberAppointments] = useState(mockMemberAppointments);
  const [availability, setAvailability] = useState(mockWeeklyAvailability);
  const [isEditingAvailability, setIsEditingAvailability] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [activeRole, setActiveRole] = useState<"member" | "helper">("helper");
  const [profileFormData, setProfileFormData] = useState({
    vorname: mockHelper.vorname,
    nachname: mockHelper.nachname,
    email: mockHelper.email,
    categories: [...mockHelper.categories],
  });
  const [availableSlots, setAvailableSlots] = useState<{
    [key: string]: any[];
  }>({});

  // Redirect if not authenticated or not a helper
  useEffect(() => {
    if (!loading) {
      if (!authUser) {
        router.push("/login?redirect=/helper/dashboard");
        return;
      }
      if (!authUser.is_helper) {
        router.push("/dashboard"); // Redirect to regular dashboard
        return;
      }
    }
  }, [authUser, loading, router]);

  // Show loading state while checking auth
  if (loading || !authUser || !authUser.is_helper) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Lade Dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Simulated ID generator
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Initialize available slots from weekly availability
  useEffect(() => {
    const slots: { [key: string]: any[] } = {};

    // Generate slots for the next 30 days
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateStr = date.toISOString().split("T")[0];
      const dayName = date.toLocaleDateString("de-DE", { weekday: "long" });

      // Find availability for this day
      const dayAvailability = availability.find((a) => a.day === dayName);
      if (dayAvailability) {
        slots[dateStr] = dayAvailability.slots.map((slot) => ({
          id: generateId(),
          start: slot.start,
          end: slot.end,
          available: true,
          booked: Math.random() > 0.8, // 20% chance of being booked (for demo)
        }));
      }
    }

    setAvailableSlots(slots);
  }, [availability]);

  const handleCreateTimeSlot = (slot: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }) => {
    const dateStr = new Date(2025, 9, 20 + slot.dayOfWeek)
      .toISOString()
      .split("T")[0];
    const newSlotObj = {
      id: generateId(),
      start: slot.startTime,
      end: slot.endTime,
      available: slot.isAvailable,
      booked: false,
    };

    setAvailableSlots((prev) => ({
      ...prev,
      [dateStr]: [...(prev[dateStr] || []), newSlotObj],
    }));
  };

  const handleDeleteTimeSlot = (dayOfWeek: number, startTime: string) => {
    const dateStr = new Date(2025, 9, 20 + dayOfWeek)
      .toISOString()
      .split("T")[0];
    setAvailableSlots((prev) => ({
      ...prev,
      [dateStr]: (prev[dateStr] || []).filter(
        (slot) => slot.start !== startTime
      ),
    }));
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat("de-DE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getTotalHoursPerWeek = () => {
    let totalMinutes = 0;
    availability.forEach((day) => {
      day.slots.forEach((slot) => {
        const [startHour, startMin] = slot.start.split(":").map(Number);
        const [endHour, endMin] = slot.end.split(":").map(Number);
        const startMinutes = startHour * 60 + startMin;
        const endMinutes = endHour * 60 + endMin;
        totalMinutes += endMinutes - startMinutes;
      });
    });
    return Math.round((totalMinutes / 60) * 10) / 10;
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
    setProfileFormData({
      vorname: user.vorname,
      nachname: user.nachname,
      email: user.email,
      categories: [...user.categories],
    });
  };

  const handleCancelEditProfile = () => {
    setIsEditingProfile(false);
    setProfileFormData({
      vorname: user.vorname,
      nachname: user.nachname,
      email: user.email,
      categories: [...user.categories],
    });
  };

  const handleSaveProfile = () => {
    setUser({
      ...user,
      ...profileFormData,
    });
    setIsEditingProfile(false);
  };

  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setProfileFormData((prev) => ({
      ...prev,
      categories: checked
        ? [...prev.categories, category]
        : prev.categories.filter((c) => c !== category),
    }));
  };

  const availableCategories = [
    "Psychologische Beratung",
    "Sozialberatung",
    "Schwangerschaftsbegleitung",
    "Andere Anliegen",
  ];

  // Reusable Components
  const QuickAction = ({
    title,
    subtitle,
    badge,
    href,
    icon: Icon,
    className,
    disabled = false,
    onClick,
  }: {
    title: string;
    subtitle: string;
    badge?: string;
    href?: string;
    icon: any;
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
  }) => (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {href ? (
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
      ) : (
        <Card
          className={cn(
            "border-2 border-transparent transition-all duration-300 cursor-pointer",
            className,
            disabled && "opacity-50"
          )}
          onClick={onClick}
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
      )}
    </motion.div>
  );

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
    description,
  }: {
    title: string;
    value: string | number;
    icon: any;
    color: string;
    description?: string;
  }) => (
    <Card className="bg-white/70 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
          </div>
          <Icon className={`w-8 h-8 ${color}`} />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout className="bg-warm-50">
      <div className="min-h-screen">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-warm-100"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12 border-2 border-warm-200">
                  <AvatarImage
                    src={
                      authUser?.user_metadata?.avatar_url ||
                      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=150&h=150&fit=crop&crop=face"
                    }
                  />
                  <AvatarFallback className="bg-warm-100 text-warm-700 text-lg font-semibold">
                    {user?.vorname?.charAt(0) || "S"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Salam {user?.vorname || "Helferin"}!
                  </h1>
                  <p className="text-gray-600">
                    {new Intl.DateTimeFormat("de-DE", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }).format(new Date())}{" "}
                    · Helferinnen-Dashboard
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
                  className="bg-warm-100 text-warm-700"
                >
                  🤝 Helferin aktiv
                </Badge>
                <Badge
                  variant="outline"
                  className="border-coral-200 text-coral-700"
                >
                  {appointments.length} Termine
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
          </motion.div>

          {/* Conditional Content based on role */}
          <motion.div
            key={activeRole}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeRole === "helper" ? (
              // HELPER DASHBOARD
              <>
                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <QuickAction
                      title="Verfügbarkeiten"
                      subtitle="Zeiten verwalten"
                      badge={`${getTotalHoursPerWeek()}h/Woche`}
                      href="/helper/availability"
                      icon={Calendar}
                      className="hover:border-warm-300 bg-warm-50"
                    />
                    <QuickAction
                      title="Meine Termine"
                      subtitle={`${appointments.length} anstehend`}
                      href="/my-appointments"
                      icon={Clock}
                      className="hover:border-coral-300 bg-coral-50"
                    />
                    <QuickAction
                      title="Profil bearbeiten"
                      subtitle="Kategorien & Daten"
                      onClick={handleEditProfile}
                      icon={Edit3}
                      className="hover:border-sage-300 bg-sage-50"
                    />
                    <QuickAction
                      title="Als Mitglied"
                      subtitle="Rolle wechseln"
                      onClick={() => setActiveRole("member")}
                      icon={Users}
                      className="hover:border-warm-400 bg-coral-100"
                    />
                  </div>
                </motion.div>
              </>
            ) : (
              // MEMBER DASHBOARD
              <>
                {/* Member Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <QuickAction
                      title="Termin buchen"
                      subtitle="Verfügbare Termine buchen"
                      badge={`${memberAppointments.length}/3 gebucht`}
                      href="/book"
                      icon={Calendar}
                      className="hover:border-warm-300 bg-warm-50"
                    />
                    <QuickAction
                      title="Meine Termine"
                      subtitle={`${memberAppointments.length} Termine`}
                      href="/my-appointments"
                      icon={Clock}
                      className="hover:border-coral-300 bg-coral-50"
                    />
                    <QuickAction
                      title="Zurück zu Helferin"
                      subtitle="Rolle wechseln"
                      onClick={() => setActiveRole("helper")}
                      icon={Heart}
                      className="hover:border-sage-300 bg-sage-50"
                    />
                  </div>
                </motion.div>
              </>
            )}
          </motion.div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            {activeRole === "helper" ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard
                  title="Verfügbare Stunden"
                  value={`${getTotalHoursPerWeek()}h`}
                  icon={Clock}
                  color="text-warm-600"
                  description="pro Woche"
                />
                <StatCard
                  title="Anstehende Termine"
                  value={appointments.length}
                  icon={AlertCircle}
                  color="text-coral-600"
                  description="nächste 30 Tage"
                />
                <StatCard
                  title="Diese Woche"
                  value={
                    appointments.filter((apt) => {
                      const today = new Date();
                      const weekFromNow = new Date(
                        today.getTime() + 7 * 24 * 60 * 60 * 1000
                      );
                      return (
                        apt.scheduledAt >= today &&
                        apt.scheduledAt <= weekFromNow
                      );
                    }).length
                  }
                  icon={Calendar}
                  color="text-purple-600"
                  description="Termine"
                />
                <StatCard
                  title="Bereiche"
                  value={user.categories.length}
                  icon={CheckCircle}
                  color="text-green-600"
                  description="aktive Kategorien"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                  title="Meine Buchungen"
                  value={mockMemberAppointments.length}
                  icon={Calendar}
                  color="text-blue-600"
                  description="aktive Termine"
                />
                <StatCard
                  title="Nächster Termin"
                  value={
                    mockMemberAppointments.length > 0 ? "Morgen" : "Keiner"
                  }
                  icon={Clock}
                  color="text-emerald-600"
                  description={
                    mockMemberAppointments.length > 0
                      ? "15:00 Uhr"
                      : "noch nicht gebucht"
                  }
                />
                <StatCard
                  title="Verfügbare Slots"
                  value="12"
                  icon={CheckCircle}
                  color="text-purple-600"
                  description="diese Woche"
                />
              </div>
            )}
          </motion.div>

          {/* Main Content Grid */}
          {activeRole === "helper" ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-1 space-y-6"
              >
                <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                      <Heart className="w-5 h-5 mr-2 text-emerald-600" />
                      Mein Profil
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!isEditingProfile ? (
                      <>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="text-gray-600">Name:</span>
                            <span className="ml-2 font-medium">
                              {user.vorname} {user.nachname}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">E-Mail:</span>
                            <span className="ml-2 font-medium">
                              {user.email}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Bereiche:</span>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {user.categories.map((category, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {category}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={handleEditProfile}
                          variant="outline"
                          size="sm"
                          className="mt-4 w-full"
                        >
                          <Edit3 className="w-4 h-4 mr-2" />
                          Profil bearbeiten
                        </Button>
                      </>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Vorname
                            </label>
                            <input
                              type="text"
                              name="vorname"
                              value={profileFormData.vorname}
                              onChange={handleProfileInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Nachname
                            </label>
                            <input
                              type="text"
                              name="nachname"
                              value={profileFormData.nachname}
                              onChange={handleProfileInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            E-Mail
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={profileFormData.email}
                            onChange={handleProfileInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-2">
                            Beratungsbereiche
                          </label>
                          <div className="space-y-2">
                            {availableCategories.map((category) => (
                              <label
                                key={category}
                                className="flex items-center"
                              >
                                <input
                                  type="checkbox"
                                  checked={profileFormData.categories.includes(
                                    category
                                  )}
                                  onChange={(e) =>
                                    handleCategoryChange(
                                      category,
                                      e.target.checked
                                    )
                                  }
                                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-700">
                                  {category}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="flex space-x-2 pt-2">
                          <Button
                            onClick={handleSaveProfile}
                            size="sm"
                            className="flex-1"
                          >
                            Speichern
                          </Button>
                          <Button
                            onClick={handleCancelEditProfile}
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            Abbrechen
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Appointments & Availability */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-2 space-y-6"
              >
                {/* Upcoming Appointments */}
                <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-900 flex items-center justify-between">
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-emerald-600" />
                        Anstehende Beratungstermine
                      </div>
                      {appointments.length > 0 && (
                        <Badge variant="secondary">
                          {appointments.length} Termine
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {appointments.length === 0 ? (
                      <div className="text-center py-8">
                        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 mb-2">
                          Keine anstehenden Termine
                        </p>
                        <p className="text-gray-400 text-sm">
                          Termine werden automatisch zugewiesen basierend auf
                          Ihren Verfügbarkeiten
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {appointments.map((appointment) => (
                          <div
                            key={appointment.id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex-1">
                                <h3 className="font-bold text-gray-900">
                                  {appointment.anliegen}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                  Mitglied: {appointment.memberName}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {formatDateTime(appointment.scheduledAt)} ·{" "}
                                  {appointment.duration} Min
                                </p>
                              </div>
                              <Button
                                onClick={() =>
                                  window.open(appointment.meetingLink, "_blank")
                                }
                                size="sm"
                              >
                                <Video className="w-4 h-4 mr-2" />
                                Meeting beitreten
                              </Button>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                              <p className="text-sm text-gray-700">
                                <strong>Beschreibung:</strong>{" "}
                                {appointment.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Availability Quick Management */}
                <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-900 flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-emerald-600" />
                        Verfügbarkeiten
                      </div>
                      <Button
                        onClick={() =>
                          setIsEditingAvailability(!isEditingAvailability)
                        }
                        variant={isEditingAvailability ? "default" : "outline"}
                        size="sm"
                      >
                        {isEditingAvailability ? "Speichern" : "Bearbeiten"}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Convert availableSlots object to array for OptimizedAvailabilityCalendar */}
                    {(() => {
                      const slotsArray: Array<{
                        dayOfWeek: number;
                        startTime: string;
                        endTime: string;
                        isAvailable: boolean;
                      }> = [];

                      Object.entries(availableSlots).forEach(
                        ([dateStr, slots]) => {
                          const date = new Date(dateStr);
                          const dayOfWeek = (date.getDay() + 6) % 7; // Convert to Monday = 0

                          (slots as any[]).forEach((slot) => {
                            slotsArray.push({
                              dayOfWeek,
                              startTime: slot.start,
                              endTime: slot.end,
                              isAvailable: slot.available,
                            });
                          });
                        }
                      );

                      return (
                        <OptimizedAvailabilityCalendar
                          availableSlots={slotsArray}
                          isEditing={isEditingAvailability}
                          onTimeSlotCreate={handleCreateTimeSlot}
                          onTimeSlotDelete={handleDeleteTimeSlot}
                        />
                      );
                    })()}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          ) : (
            /* Member View */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Quick Booking Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-emerald-600" />
                      Schnelle Terminbuchung
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Calendar className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                      <p className="text-gray-700 mb-4">
                        Buchen Sie einen Termin für Ihre Beratung
                      </p>
                      <Button className="bg-emerald-600 hover:bg-emerald-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Neuen Termin buchen
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* My Appointments Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-900 flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-emerald-600" />
                        Meine Termine
                      </div>
                      {mockMemberAppointments.length > 0 && (
                        <Badge variant="secondary">
                          {mockMemberAppointments.length} Termine
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {mockMemberAppointments.length === 0 ? (
                      <div className="text-center py-8">
                        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 mb-2">
                          Keine gebuchten Termine
                        </p>
                        <p className="text-gray-400 text-sm">
                          Buchen Sie Ihren ersten Termin über den Button oben
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {mockMemberAppointments.map((appointment) => (
                          <div
                            key={appointment.id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                                <span className="font-medium text-gray-900">
                                  {appointment.category}
                                </span>
                              </div>
                              <Badge
                                variant={
                                  appointment.status === "confirmed"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {appointment.status === "confirmed"
                                  ? "Bestätigt"
                                  : "Ausstehend"}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {appointment.scheduledAt.toLocaleDateString(
                                "de-DE",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}{" "}
                              um{" "}
                              {appointment.scheduledAt.toLocaleTimeString(
                                "de-DE",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                            <p className="text-sm text-gray-500 mb-3">
                              Mit: {appointment.helperName}
                            </p>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs"
                              >
                                Details anzeigen
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs text-red-600 hover:text-red-700"
                              >
                                Stornieren
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}
