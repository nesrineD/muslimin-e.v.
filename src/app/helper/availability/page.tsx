"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Copy,
  Trash2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Moon,
  Sun,
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
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";

// Week days starting from Monday
const daysOfWeek = [
  { short: "Mo", long: "Montag" },
  { short: "Di", long: "Dienstag" },
  { short: "Mi", long: "Mittwoch" },
  { short: "Do", long: "Donnerstag" },
  { short: "Fr", long: "Freitag" },
  { short: "Sa", long: "Samstag" },
  { short: "So", long: "Sonntag" },
];

// Time slots from 8:00 to 20:00 in 45min blocks (according to spec)
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 8; hour < 20; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    if (hour < 19) {
      // Don't add 45min slot for the last hour
      slots.push(`${hour.toString().padStart(2, "0")}:45`);
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

// Mock availability data - grid-based
const createEmptyGrid = () => {
  const grid: {
    [day: number]: { [time: string]: "available" | "booked" | "unavailable" };
  } = {};

  // Initialize empty grid
  for (let day = 0; day < 7; day++) {
    grid[day] = {};
    timeSlots.forEach((time) => {
      grid[day][time] = "unavailable";
    });
  }

  return grid;
};

const createMockGrid = () => {
  const grid = createEmptyGrid();

  // Sainab Helper availability: weekends whole day (from flow.md)
  // Saturday - full day availability 8:00-20:00
  timeSlots.forEach((time) => {
    grid[5][time] = "available"; // Saturday (day 5)
  });

  // Sunday - full day availability 8:00-20:00
  timeSlots.forEach((time) => {
    grid[6][time] = "available"; // Sunday (day 6)
  });

  // Add some booked appointments
  grid[5]["10:00"] = "booked"; // Saturday 10:00 - Zahra's appointment
  grid[6]["16:30"] = "booked"; // Sunday 16:30 - Fatima's appointment

  return grid;
};

export default function HelperAvailabilityPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [availabilityGrid, setAvailabilityGrid] = useState(createMockGrid());
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [toggleMode, setToggleMode] = useState<"set" | "remove">("set");
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  const [isSelecting, setIsSelecting] = useState(false);

  // Redirect if not authenticated or not a helper
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login?redirect=/helper/availability");
        return;
      }
      if (!user.is_helper) {
        router.push("/dashboard"); // Redirect to regular dashboard
        return;
      }
    }
  }, [user, loading, router]);

  // Show loading state while checking auth
  if (loading || !user || !user.is_helper) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Lade Verfügbarkeiten...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!user) {
    return null;
  }

  const handleSlotClick = (dayIndex: number, timeSlot: string) => {
    const slotKey = `${dayIndex}-${timeSlot}`;
    const currentStatus = availabilityGrid[dayIndex][timeSlot];

    if (isSelecting) {
      // Multi-selection mode
      if (selectedSlots.includes(slotKey)) {
        setSelectedSlots(selectedSlots.filter((s) => s !== slotKey));
      } else {
        setSelectedSlots([...selectedSlots, slotKey]);
      }
    } else {
      // Direct toggle mode
      let newStatus: "available" | "booked" | "unavailable";

      if (toggleMode === "set") {
        newStatus = currentStatus === "available" ? "unavailable" : "available";
      } else {
        newStatus = "unavailable";
      }

      // Don't allow changing booked slots
      if (currentStatus === "booked") return;

      setAvailabilityGrid((prev) => ({
        ...prev,
        [dayIndex]: {
          ...prev[dayIndex],
          [timeSlot]: newStatus,
        },
      }));
    }
  };

  const applyToSelectedSlots = () => {
    if (selectedSlots.length === 0) return;

    const newGrid = { ...availabilityGrid };

    selectedSlots.forEach((slotKey) => {
      const [dayIndex, timeSlot] = slotKey.split("-");
      const dayIdx = parseInt(dayIndex);
      const currentStatus = newGrid[dayIdx][timeSlot];

      // Don't change booked slots
      if (currentStatus === "booked") return;

      if (toggleMode === "set") {
        newGrid[dayIdx][timeSlot] = "available";
      } else {
        newGrid[dayIdx][timeSlot] = "unavailable";
      }
    });

    setAvailabilityGrid(newGrid);
    setSelectedSlots([]);
    setIsSelecting(false);
  };

  const clearAllSlots = () => {
    if (confirm("Alle Verfügbarkeiten für diese Woche löschen?")) {
      const newGrid = createEmptyGrid();
      // Preserve booked slots
      Object.keys(availabilityGrid).forEach((dayKey) => {
        const dayIdx = parseInt(dayKey);
        Object.keys(availabilityGrid[dayIdx]).forEach((timeSlot) => {
          if (availabilityGrid[dayIdx][timeSlot] === "booked") {
            newGrid[dayIdx][timeSlot] = "booked";
          }
        });
      });
      setAvailabilityGrid(newGrid);
    }
  };

  const copyWeek = (direction: "next" | "all") => {
    // This would integrate with API in real implementation
    alert(
      `Woche kopieren: ${direction === "next" ? "Nächste Woche" : "Alle zukünftigen Wochen"}`
    );
  };

  const setQuickPattern = (pattern: "workdays" | "evenings" | "weekends") => {
    const newGrid = createEmptyGrid();

    switch (pattern) {
      case "workdays": // Werktags 9-17 Uhr
        for (let day = 0; day < 5; day++) {
          // Mo-Fr
          [
            "09:00",
            "09:45",
            "10:30",
            "11:15",
            "14:00",
            "14:45",
            "15:30",
            "16:15",
          ].forEach((time) => {
            newGrid[day][time] = "available";
          });
        }
        break;
      case "evenings": // Abends 18-20 Uhr
        for (let day = 0; day < 7; day++) {
          ["18:00", "18:45", "19:15"].forEach((time) => {
            newGrid[day][time] = "available";
          });
        }
        break;
      case "weekends": // Wochenende 10-16 Uhr
        for (let day = 5; day < 7; day++) {
          // Sa-So
          ["10:30", "11:15", "14:00", "14:45", "15:30"].forEach((time) => {
            newGrid[day][time] = "available";
          });
        }
        break;
    }

    // Preserve existing booked slots
    Object.keys(availabilityGrid).forEach((dayKey) => {
      const dayIdx = parseInt(dayKey);
      Object.keys(availabilityGrid[dayIdx]).forEach((timeSlot) => {
        if (availabilityGrid[dayIdx][timeSlot] === "booked") {
          newGrid[dayIdx][timeSlot] = "booked";
        }
      });
    });

    setAvailabilityGrid(newGrid);
  };

  const getSlotClassName = (dayIndex: number, timeSlot: string) => {
    const status = availabilityGrid[dayIndex][timeSlot];
    const slotKey = `${dayIndex}-${timeSlot}`;
    const isSelected = selectedSlots.includes(slotKey);

    const baseClasses =
      "h-8 border border-gray-200 cursor-pointer transition-all duration-150 text-xs flex items-center justify-center font-medium rounded-sm";

    if (isSelected) {
      return cn(
        baseClasses,
        "bg-blue-200 border-blue-400 ring-2 ring-blue-300"
      );
    }

    switch (status) {
      case "available":
        return cn(
          baseClasses,
          "bg-green-100 text-green-800 hover:bg-green-200 border-green-300"
        );
      case "booked":
        return cn(baseClasses, "bg-gray-400 text-white cursor-not-allowed");
      case "unavailable":
      default:
        return cn(baseClasses, "bg-white hover:bg-gray-50 text-gray-400");
    }
  };

  const getSlotContent = (dayIndex: number, timeSlot: string) => {
    const status = availabilityGrid[dayIndex][timeSlot];

    switch (status) {
      case "available":
        return "✓";
      case "booked":
        return "●";
      case "unavailable":
      default:
        return "";
    }
  };

  const getCurrentWeekDates = () => {
    const today = new Date();
    const currentWeekStart = new Date(
      today.setDate(today.getDate() - today.getDay() + 1)
    ); // Monday
    currentWeekStart.setDate(
      currentWeekStart.getDate() + currentWeekOffset * 7
    );

    return daysOfWeek.map((_, index) => {
      const date = new Date(currentWeekStart);
      date.setDate(date.getDate() + index);
      return date;
    });
  };

  const weekDates = getCurrentWeekDates();

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
                    Meine Verfügbarkeiten
                  </h1>
                  <p className="text-gray-600">
                    Legen Sie fest, wann Sie für Beratungen zur Verfügung stehen
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            {/* Quick Settings */}
            <Card className="bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-emerald-600" />
                  Schnell-Einstellungen
                </CardTitle>
                <CardDescription>
                  Setzen Sie typische Verfügbarkeitsmuster mit einem Klick
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setQuickPattern("workdays")}
                    className="flex items-center"
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Werktags 9-17 Uhr
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setQuickPattern("evenings")}
                    className="flex items-center"
                  >
                    <Moon className="w-4 h-4 mr-2" />
                    Abends 18-20 Uhr
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setQuickPattern("weekends")}
                    className="flex items-center"
                  >
                    <Sun className="w-4 h-4 mr-2" />
                    Wochenende 10-16 Uhr
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Controls */}
            <Card className="bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  {/* Week Navigation */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentWeekOffset((prev) => prev - 1)}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="text-sm font-medium px-3">
                      {weekDates[0].toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "2-digit",
                      })}{" "}
                      -{" "}
                      {weekDates[6].toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "2-digit",
                      })}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentWeekOffset((prev) => prev + 1)}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Toggle Mode */}
                  <div className="flex items-center space-x-2">
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setToggleMode("set")}
                        className={cn(
                          "px-3 py-1 text-sm rounded-md transition-colors",
                          toggleMode === "set"
                            ? "bg-emerald-500 text-white"
                            : "text-gray-600 hover:text-gray-800"
                        )}
                      >
                        Verfügbar setzen
                      </button>
                      <button
                        onClick={() => setToggleMode("remove")}
                        className={cn(
                          "px-3 py-1 text-sm rounded-md transition-colors",
                          toggleMode === "remove"
                            ? "bg-red-500 text-white"
                            : "text-gray-600 hover:text-gray-800"
                        )}
                      >
                        Entfernen
                      </button>
                    </div>
                  </div>

                  {/* Bulk Actions */}
                  <div className="flex items-center space-x-2">
                    {isSelecting ? (
                      <>
                        <Button
                          size="sm"
                          onClick={applyToSelectedSlots}
                          className="bg-emerald-600 hover:bg-emerald-700"
                          disabled={selectedSlots.length === 0}
                        >
                          Anwenden ({selectedSlots.length})
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedSlots([]);
                            setIsSelecting(false);
                          }}
                        >
                          Abbrechen
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setIsSelecting(true)}
                        >
                          Mehrfachauswahl
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyWeek("next")}
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Woche kopieren
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={clearAllSlots}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Alle löschen
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 7-Day Grid View */}
            <Card className="bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-emerald-600" />
                  Wochenansicht
                </CardTitle>
                <CardDescription>
                  Klicken Sie auf Zeitslots um Verfügbarkeiten zu setzen.
                  45-Minuten-Blöcke von 8:00-20:00 Uhr.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <div className="min-w-[800px]">
                    {/* Header with days */}
                    <div className="grid grid-cols-8 gap-1 mb-2">
                      <div className="p-2 text-sm font-medium text-gray-500">
                        Zeit
                      </div>
                      {daysOfWeek.map((day, index) => (
                        <div key={day.short} className="p-2 text-center">
                          <div className="text-sm font-medium text-gray-900">
                            {day.short}
                          </div>
                          <div className="text-xs text-gray-500">
                            {weekDates[index]
                              .getDate()
                              .toString()
                              .padStart(2, "0")}
                            .
                            {(weekDates[index].getMonth() + 1)
                              .toString()
                              .padStart(2, "0")}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Time grid */}
                    <div className="space-y-1">
                      {timeSlots.map((timeSlot) => (
                        <div key={timeSlot} className="grid grid-cols-8 gap-1">
                          <div className="p-2 text-xs text-gray-500 font-medium bg-gray-50 rounded">
                            {timeSlot}
                          </div>
                          {daysOfWeek.map((day, dayIndex) => (
                            <div
                              key={`${dayIndex}-${timeSlot}`}
                              className={getSlotClassName(dayIndex, timeSlot)}
                              onClick={() =>
                                handleSlotClick(dayIndex, timeSlot)
                              }
                            >
                              {getSlotContent(dayIndex, timeSlot)}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center justify-center space-x-6 mt-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-green-100 border border-green-300 rounded-sm flex items-center justify-center text-green-800 text-xs font-bold">
                          ✓
                        </div>
                        <span className="text-sm text-gray-700">Verfügbar</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gray-400 rounded-sm flex items-center justify-center text-white text-xs">
                          ●
                        </div>
                        <span className="text-sm text-gray-700">Gebucht</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-white border border-gray-200 rounded-sm"></div>
                        <span className="text-sm text-gray-700">
                          Nicht verfügbar
                        </span>
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
                      <h4 className="text-sm font-medium text-emerald-800 mb-2">
                        So funktioniert's:
                      </h4>
                      <ul className="text-sm text-emerald-700 space-y-1">
                        <li>
                          • <strong>Einzeln klicken:</strong> Verfügbarkeit
                          direkt umschalten
                        </li>
                        <li>
                          • <strong>Mehrfachauswahl:</strong> Mehrere Slots
                          auswählen und gemeinsam ändern
                        </li>
                        <li>
                          • <strong>Schnell-Einstellungen:</strong> Typische
                          Muster mit einem Klick setzen
                        </li>
                        <li>
                          • <strong>Auto-Save:</strong> Änderungen werden
                          automatisch gespeichert
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </Layout>
  );
}
