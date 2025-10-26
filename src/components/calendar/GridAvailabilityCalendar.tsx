"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
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

// Time slots from 8:00 to 20:00 in 45min blocks
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 8; hour < 20; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    if (hour < 19) {
      slots.push(`${hour.toString().padStart(2, "0")}:45`);
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

export type SlotStatus = "available" | "booked" | "unavailable";
export type AvailabilityGrid = {
  [day: number]: { [time: string]: SlotStatus };
};

interface GridAvailabilityCalendarProps {
  availabilityGrid: AvailabilityGrid;
  onSlotClick?: (dayIndex: number, timeSlot: string) => void;
  selectedSlots?: string[];
  weekDates: Date[];
  isSelecting?: boolean;
  onWeekChange?: (offset: number) => void;
  currentWeekOffset?: number;
  isEditing?: boolean;
}

export default function GridAvailabilityCalendar({
  availabilityGrid,
  onSlotClick,
  selectedSlots = [],
  weekDates,
  isSelecting = false,
  onWeekChange,
  currentWeekOffset = 0,
  isEditing = false,
}: GridAvailabilityCalendarProps) {
  // Check if current week is today
  const isCurrentWeek = currentWeekOffset === 0;

  // Check if any date in the week is today
  const getTodayIndex = (): number | null => {
    const today = new Date();
    const todayStr = today.toDateString();
    return (
      weekDates.findIndex((date) => date.toDateString() === todayStr) ?? null
    );
  };

  const todayIndex = getTodayIndex();
  const hasToday = todayIndex !== null && todayIndex >= 0;

  const getSlotClassName = (dayIndex: number, timeSlot: string) => {
    const status = availabilityGrid[dayIndex]?.[timeSlot] || "unavailable";
    const slotKey = `${dayIndex}-${timeSlot}`;
    const isSelected = selectedSlots.includes(slotKey);

    const baseClasses =
      "border-2 cursor-pointer transition-all duration-150 text-xs flex items-center justify-center font-bold rounded-md";

    if (isSelected) {
      return cn(
        baseClasses,
        "bg-blue-300 border-blue-500 ring-2 ring-blue-400 shadow-lg"
      );
    }

    switch (status) {
      case "available":
        return cn(
          baseClasses,
          "bg-gradient-to-br from-green-100 to-green-50 text-green-800 hover:from-green-200 hover:to-green-100 border-green-400 shadow-sm hover:shadow-md"
        );
      case "booked":
        return cn(
          baseClasses,
          "bg-gray-500 text-white border-gray-600 cursor-not-allowed opacity-75"
        );
      case "unavailable":
      default:
        return cn(
          baseClasses,
          "bg-white hover:bg-sage-50 text-gray-400 hover:text-sage-600 border-sage-200 hover:border-sage-300"
        );
    }
  };

  const getSlotContent = (dayIndex: number, timeSlot: string) => {
    const status = availabilityGrid[dayIndex]?.[timeSlot] || "unavailable";

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

  return (
    <div className="space-y-4">
      {/* Week Navigation Header */}
      <div className="bg-gradient-to-r from-sage-100 to-emerald-50 rounded-xl p-5 border-2 border-sage-200 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-sage-900 mb-1">
              {isCurrentWeek
                ? "📅 Diese Woche"
                : `📅 Woche ${Math.abs(currentWeekOffset) > 0 ? (currentWeekOffset > 0 ? "+" : "") + currentWeekOffset : ""}`}
            </h3>
            <p className="text-sm text-sage-700 font-medium">
              {weekDates[0].toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}{" "}
              -{" "}
              {weekDates[6].toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onWeekChange?.(-1)}
              className="h-9 w-9 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {!isCurrentWeek && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onWeekChange?.(0 - currentWeekOffset)}
                className="text-xs px-2"
              >
                Heute
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onWeekChange?.(1)}
              className="h-9 w-9 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Status badges */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-sage-300">
          {isCurrentWeek && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full">
              <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
              Aktuelle Woche
            </span>
          )}
          {hasToday && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
              <span className="w-2 h-2 bg-yellow-600 rounded-full animate-pulse"></span>
              Heute
            </span>
          )}
          {isEditing && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
              <span>✏️</span>
              Bearbeitungsmodus
            </span>
          )}
        </div>
      </div>

      {/* Calendar Grid */}
      <div
        className="overflow-auto border-2 border-sage-300 rounded-xl shadow-lg bg-white"
        style={{ maxHeight: "700px" }}
      >
        <div className="min-w-max">
          {/* Header with days - Sticky */}
          <div className="sticky top-0 z-10 grid grid-cols-8 gap-1 mb-0 bg-gradient-to-r from-sage-700 to-sage-800 p-2 shadow-lg">
            <div className="p-4 text-center text-xs font-bold text-white bg-sage-700 rounded-tl">
              <div>⏰ ZEIT</div>
            </div>
            {daysOfWeek.map((day, index) => {
              const isToday = index === todayIndex;
              const date = weekDates[index];

              return (
                <div
                  key={day.short}
                  className={cn(
                    "p-4 text-center rounded-t transition-all",
                    isToday
                      ? "bg-gradient-to-b from-yellow-400 to-yellow-500 shadow-lg ring-2 ring-yellow-600"
                      : "bg-gradient-to-b from-sage-700 to-sage-800 hover:from-sage-600 hover:to-sage-700"
                  )}
                >
                  {isToday && (
                    <div className="text-xs font-bold text-white mb-1 drop-shadow-lg">
                      ⭐ HEUTE
                    </div>
                  )}
                  <div className="font-bold text-lg text-white">
                    {day.short}
                  </div>
                  <div
                    className="text-xs font-semibold mt-1"
                    style={{ color: isToday ? "#1f2937" : "#e5e7eb" }}
                  >
                    {date.getDate().toString().padStart(2, "0")}.
                    {(date.getMonth() + 1).toString().padStart(2, "0")}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Time grid - Scrollable */}
          <div className="space-y-0 bg-white">
            {timeSlots.map((timeSlot) => (
              <div
                key={timeSlot}
                className="grid grid-cols-8 gap-1 p-1 hover:bg-sage-50/50 transition-colors border-b border-sage-100 last:border-b-0"
              >
                <div className="p-3 text-xs font-bold text-sage-800 bg-gradient-to-r from-sage-50 to-sage-100 border border-sage-200 rounded min-w-[70px] text-center">
                  {timeSlot}
                </div>
                {daysOfWeek.map((day, dayIndex) => (
                  <div
                    key={`${dayIndex}-${timeSlot}`}
                    className={cn(
                      getSlotClassName(dayIndex, timeSlot),
                      "min-h-[60px] h-auto py-3 text-xs font-semibold hover:shadow-md transition-all duration-150 rounded border-2"
                    )}
                    onClick={() => onSlotClick?.(dayIndex, timeSlot)}
                  >
                    {getSlotContent(dayIndex, timeSlot)}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center space-x-4 mt-6 p-4 bg-gradient-to-r from-emerald-50 to-sage-50 rounded-lg border border-sage-200">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-gradient-to-br from-green-200 to-green-100 border-2 border-green-500 rounded-sm flex items-center justify-center text-green-800 text-xs font-bold">
                ✓
              </div>
              <span className="text-sm font-medium text-gray-700">
                Verfügbar
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-gray-500 rounded-sm flex items-center justify-center text-white text-xs font-bold">
                ●
              </div>
              <span className="text-sm font-medium text-gray-700">Gebucht</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-white border-2 border-dashed border-sage-300 rounded-sm"></div>
              <span className="text-sm font-medium text-gray-700">
                Nicht verfügbar
              </span>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border-l-4 border-emerald-500">
            <h4 className="text-sm font-bold text-emerald-800 mb-3 flex items-center">
              <span className="text-lg mr-2">💡</span>
              So funktioniert's:
            </h4>
            <ul className="text-sm text-emerald-700 space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>
                  <strong>Einzeln klicken:</strong> Verfügbarkeit direkt
                  umschalten
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>
                  <strong>Mehrfachauswahl:</strong> Mehrere Slots auswählen und
                  gemeinsam ändern
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>
                  <strong>Wochennavigation:</strong> Mit den Pfeilen zwischen
                  Wochen wechseln
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>
                  <strong>Scrollen:</strong> Nach unten für weitere Zeitslots
                  (bis 20:00 Uhr)
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions to export
export const createEmptyGrid = (): AvailabilityGrid => {
  const grid: AvailabilityGrid = {};
  const slots = generateTimeSlots();

  for (let day = 0; day < 7; day++) {
    grid[day] = {};
    slots.forEach((time) => {
      grid[day][time] = "unavailable";
    });
  }

  return grid;
};

export const createMockGrid = (): AvailabilityGrid => {
  const grid = createEmptyGrid();
  const slots = generateTimeSlots();

  // Saturday - full day availability 8:00-20:00
  slots.forEach((time) => {
    grid[5][time] = "available";
  });

  // Sunday - full day availability 8:00-20:00
  slots.forEach((time) => {
    grid[6][time] = "available";
  });

  // Add some booked appointments
  grid[5]["10:00"] = "booked";
  grid[6]["16:30"] = "booked";

  return grid;
};
