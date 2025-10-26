"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Trash2, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

interface TimeSlot {
  dayOfWeek: number; // 0-6 (Mo-Su)
  startTime: string; // "09:00"
  endTime: string; // "17:00"
  isAvailable: boolean;
}

interface OptimizedAvailabilityCalendarProps {
  availableSlots?: TimeSlot[];
  isEditing?: boolean;
  onTimeSlotCreate?: (slot: TimeSlot) => void;
  onTimeSlotDelete?: (dayOfWeek: number, startTime: string) => void;
}

const DAYS_OF_WEEK = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const FULL_DAYS = [
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
  "Sonntag",
];
const HOURS = Array.from({ length: 16 }, (_, i) => `${i + 6}:00`); // 6:00 - 21:00 (erweitert für mehr Optionen)

// Helper function to get current week dates
const getCurrentWeekDates = () => {
  const today = new Date();
  const currentDay = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return date;
  });
};

export default function OptimizedAvailabilityCalendar({
  availableSlots = [],
  isEditing = false,
  onTimeSlotCreate,
  onTimeSlotDelete,
}: OptimizedAvailabilityCalendarProps) {
  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());
  const [weekDates, setWeekDates] = useState<Date[]>([]);

  // Initialize selectedSlots from availableSlots
  useEffect(() => {
    const initialSlots = new Set(
      availableSlots.map((slot) => `${slot.dayOfWeek}-${slot.startTime}`)
    );
    setSelectedSlots(initialSlots);
  }, [availableSlots]);

  // Initialize current week dates
  useEffect(() => {
    setWeekDates(getCurrentWeekDates());
  }, []);

  const handleSlotToggle = (dayOfWeek: number, hour: string) => {
    const slotKey = `${dayOfWeek}-${hour}`;

    if (selectedSlots.has(slotKey)) {
      selectedSlots.delete(slotKey);
      onTimeSlotDelete?.(dayOfWeek, hour);
    } else {
      selectedSlots.add(slotKey);
      const endHour = `${parseInt(hour) + 1}:00`;
      onTimeSlotCreate?.({
        dayOfWeek,
        startTime: hour,
        endTime: endHour,
        isAvailable: true,
      });
    }

    setSelectedSlots(new Set(selectedSlots));
  };

  const getAvailableCount = () => {
    return selectedSlots.size;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Current Week Info */}
      <div className="bg-gradient-to-r from-sage-50 to-emerald-50 rounded-xl p-6 border-2 border-sage-200 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-3 shadow-md">
              <Clock className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-sage-900">
                Wöchentliche Verfügbarkeit
              </h3>
              <p className="text-base text-sage-600 font-medium mt-1">
                {getAvailableCount()} Stunden verfügbar
              </p>
            </div>
          </div>
          <Badge
            variant="secondary"
            className="bg-emerald-100 text-emerald-800 px-4 py-2 text-sm font-semibold"
          >
            {isEditing ? "✏️ Bearbeitungsmodus" : "👁️ Ansicht"}
          </Badge>
        </div>

        {/* Current Week Display */}
        {weekDates.length > 0 && (
          <div className="bg-white rounded-lg p-4 border-2 border-sage-300 shadow-sm">
            <p className="text-sm font-semibold text-sage-700 mb-2">
              📅 Aktuelle Woche
            </p>
            <p className="text-lg font-bold text-sage-900">
              {weekDates[0].toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
              {" - "}
              {weekDates[6].toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        )}
      </div>

      {/* Calendar Grid - Enhanced */}
      <div
        className="overflow-auto border-2 border-sage-300 rounded-xl shadow-xl"
        style={{ maxHeight: "650px" }}
      >
        <div className="inline-block w-full bg-white">
          {/* Header with Days - Sticky & Enhanced */}
          <div className="sticky top-0 z-10 grid grid-cols-8 bg-gradient-to-r from-sage-700 to-sage-800 text-white shadow-xl">
            <div className="p-5 text-center text-sm font-bold border-r border-sage-600 bg-sage-700">
              <div className="font-bold text-base">⏰ ZEIT</div>
            </div>
            {DAYS_OF_WEEK.map((day, index) => {
              const currentDate = weekDates[index];
              const isTodayDate = currentDate && isToday(currentDate);

              return (
                <div
                  key={day}
                  className={cn(
                    "p-5 text-center border-r border-sage-600 last:border-r-0 transition-all",
                    isTodayDate
                      ? "bg-gradient-to-b from-emerald-500 to-emerald-600 ring-4 ring-yellow-400 ring-inset"
                      : "bg-gradient-to-b from-sage-700 to-sage-800 hover:from-sage-600 hover:to-sage-700"
                  )}
                >
                  {isTodayDate && (
                    <div className="text-xs font-bold text-yellow-300 mb-1 animate-pulse">
                      ★ HEUTE ★
                    </div>
                  )}
                  <div className="font-bold text-xl mb-1">{day}</div>
                  <div className="text-sm font-medium">{FULL_DAYS[index]}</div>
                  {currentDate && (
                    <div className="text-xs text-sage-100 mt-2 font-semibold bg-white/20 rounded px-2 py-1 inline-block">
                      {currentDate.toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "2-digit",
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Time Slots Grid - Enhanced & Larger */}
          <div className="divide-y divide-sage-200 bg-white">
            {HOURS.map((hour, hourIndex) => (
              <div
                key={hour}
                className="grid grid-cols-8 divide-x divide-sage-200 hover:bg-sage-50/50 transition-colors"
              >
                {/* Time Label - Enhanced */}
                <div className="sticky left-0 z-5 p-5 bg-gradient-to-r from-sage-100 to-sage-50 text-center font-bold text-sage-900 border-r-2 border-sage-400 min-w-max">
                  <div className="text-lg">{hour}</div>
                </div>

                {/* Day Slots - Larger & More User Friendly */}
                {DAYS_OF_WEEK.map((_, dayIndex) => {
                  const slotKey = `${dayIndex}-${hour}`;
                  const isSelected = selectedSlots.has(slotKey);
                  const currentDate = weekDates[dayIndex];
                  const isTodayDate = currentDate && isToday(currentDate);

                  return (
                    <motion.div
                      key={slotKey}
                      whileHover={isEditing ? { scale: 1.05 } : {}}
                      whileTap={isEditing ? { scale: 0.97 } : {}}
                      className={cn(
                        "p-4 min-h-[100px] flex items-center justify-center cursor-pointer transition-all duration-200 relative group",
                        isEditing && "hover:shadow-lg",
                        isTodayDate && "ring-2 ring-yellow-300 ring-inset",
                        isSelected && !isEditing
                          ? "bg-gradient-to-br from-emerald-100 to-emerald-50 border-2 border-emerald-500 shadow-md"
                          : isSelected && isEditing
                            ? "bg-gradient-to-br from-emerald-200 to-emerald-100 border-2 border-emerald-600 shadow-xl"
                            : "bg-white hover:bg-sage-50",
                        isEditing &&
                          !isSelected &&
                          "border-2 border-dashed border-sage-300 hover:border-sage-500 hover:bg-sage-50"
                      )}
                      onClick={() => {
                        if (isEditing) {
                          handleSlotToggle(dayIndex, hour);
                        }
                      }}
                    >
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full shadow-lg flex items-center justify-center"
                        >
                          <span className="text-white font-bold text-lg">
                            ✓
                          </span>
                        </motion.div>
                      )}
                      {isEditing && !isSelected && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-70 transition-opacity">
                          <div className="bg-sage-500 rounded-full w-10 h-10 flex items-center justify-center shadow-md">
                            <span className="text-white text-3xl font-light">
                              +
                            </span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Info Box */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 rounded-xl p-5 flex items-start space-x-4 shadow-md">
        <div className="text-blue-600 text-3xl mt-0.5">ℹ️</div>
        <div className="text-sm text-blue-900 flex-1">
          <p className="font-bold text-base mb-3">
            Tipps zur Verfügbarkeitsverwaltung:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start space-x-3">
              <span className="text-blue-600 font-bold text-lg">•</span>
              <span>
                Klicken Sie auf ein Zeitfeld, um es als verfügbar zu markieren
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-blue-600 font-bold text-lg">•</span>
              <span>
                Verfügbare Zeiten erscheinen in Grün mit großem Checkmark ✓
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-blue-600 font-bold text-lg">•</span>
              <span>
                Der heutige Tag ist mit{" "}
                <span className="text-yellow-600 font-bold">★ HEUTE ★</span>{" "}
                markiert
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-blue-600 font-bold text-lg">•</span>
              <span>
                Alle Zeiten sind in CEST (Mitteleuropäische Sommerzeit)
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-blue-600 font-bold text-lg">•</span>
              <span>
                Scrolle nach unten für mehr Zeitslots (6:00 - 21:00 Uhr)
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Enhanced Legend */}
      <div className="grid grid-cols-2 gap-6 bg-gradient-to-r from-emerald-50 to-sage-50 p-6 rounded-xl border-2 border-sage-200 shadow-md">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-200 to-emerald-100 border-2 border-emerald-500 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-emerald-700 font-bold text-xl">✓</span>
          </div>
          <span className="text-base font-bold text-gray-800">Verfügbar</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white border-2 border-dashed border-sage-400 rounded-lg shadow-sm" />
          <span className="text-base font-bold text-gray-800">
            Nicht verfügbar
          </span>
        </div>
      </div>
    </div>
  );
}
