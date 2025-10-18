"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Trash2, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
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
const HOURS = Array.from({ length: 16 }, (_, i) => `${i + 6}:00`); // 6:00 - 21:00 (erweitert für mehr Optionen)

export default function OptimizedAvailabilityCalendar({
  availableSlots = [],
  isEditing = false,
  onTimeSlotCreate,
  onTimeSlotDelete,
}: OptimizedAvailabilityCalendarProps) {
  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(
    new Set(availableSlots.map((slot) => `${slot.dayOfWeek}-${slot.startTime}`))
  );

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

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-sage-50 to-emerald-50 rounded-lg p-4 border border-sage-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-500 rounded-full p-2">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-sage-900">
                Wöchentliche Verfügbarkeit
              </h3>
              <p className="text-sm text-sage-600">
                {getAvailableCount()} Stunden verfügbar
              </p>
            </div>
          </div>
          <Badge
            variant="secondary"
            className="bg-emerald-100 text-emerald-800"
          >
            {isEditing ? "Bearbeitungsmodus" : "Ansicht"}
          </Badge>
        </div>
      </div>

      {/* Calendar Grid */}
      <div
        className="overflow-auto border border-sage-200 rounded-lg shadow-md"
        style={{ maxHeight: "600px" }}
      >
        <div className="inline-block w-full bg-white">
          {/* Header with Days - Sticky */}
          <div className="sticky top-0 z-10 grid grid-cols-8 bg-gradient-to-r from-sage-700 to-sage-800 text-white shadow-lg">
            <div className="p-4 text-center text-xs font-bold border-r border-sage-600 bg-sage-700">
              <div className="font-semibold">ZEIT</div>
            </div>
            {DAYS_OF_WEEK.map((day, index) => (
              <div
                key={day}
                className="p-4 text-center border-r border-sage-600 last:border-r-0 bg-gradient-to-b from-sage-700 to-sage-800 hover:from-sage-600 hover:to-sage-700 transition-colors"
              >
                <div className="font-bold text-lg">{day}</div>
                <div className="text-xs text-sage-100 mt-1 font-semibold">
                  {new Date(2025, 9, 20 + index).toLocaleDateString("de-DE", {
                    day: "numeric",
                    month: "numeric",
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Time Slots Grid - Scrollable */}
          <div className="divide-y divide-sage-200 bg-white">
            {HOURS.map((hour, hourIndex) => (
              <div
                key={hour}
                className="grid grid-cols-8 divide-x divide-sage-200 hover:bg-sage-50/50 transition-colors"
              >
                {/* Time Label - Sticky Left */}
                <div className="sticky left-0 z-5 p-4 bg-gradient-to-r from-sage-50 to-sage-100 text-center text-sm font-bold text-sage-800 border-r-2 border-sage-300 min-w-max">
                  {hour}
                </div>

                {/* Day Slots - Larger */}
                {DAYS_OF_WEEK.map((_, dayIndex) => {
                  const slotKey = `${dayIndex}-${hour}`;
                  const isSelected = selectedSlots.has(slotKey);

                  return (
                    <motion.div
                      key={slotKey}
                      whileHover={isEditing ? { scale: 1.08 } : {}}
                      whileTap={isEditing ? { scale: 0.95 } : {}}
                      className={cn(
                        "p-3 min-h-[80px] flex items-center justify-center cursor-pointer transition-all duration-200 relative group",
                        isEditing && "hover:shadow-md",
                        isSelected && !isEditing
                          ? "bg-gradient-to-br from-emerald-100 to-emerald-50 border-2 border-emerald-500 shadow-md"
                          : isSelected && isEditing
                            ? "bg-gradient-to-br from-emerald-200 to-emerald-100 border-2 border-emerald-600 shadow-lg"
                            : "bg-white hover:bg-sage-50",
                        isEditing &&
                          !isSelected &&
                          "border-2 border-dashed border-sage-300 hover:border-sage-400"
                      )}
                      onClick={() => {
                        if (isEditing) {
                          handleSlotToggle(dayIndex, hour);
                        }
                      }}
                    >
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 bg-emerald-500 rounded-full shadow-md flex items-center justify-center"
                        >
                          <span className="text-white font-bold text-xs">
                            ✓
                          </span>
                        </motion.div>
                      )}
                      {isEditing && !isSelected && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-50 transition-opacity">
                          <span className="text-sage-400 text-2xl">+</span>
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

      {/* Info Box */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 rounded-lg p-4 flex items-start space-x-3 shadow-sm">
        <div className="text-blue-600 text-2xl mt-0.5">ℹ️</div>
        <div className="text-sm text-blue-900">
          <p className="font-bold mb-2">Tipps zur Verfügbarkeitsverwaltung:</p>
          <ul className="space-y-1.5 text-xs">
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Klicken Sie auf ein Zeitfeld, um es als verfügbar zu markieren</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Verfügbare Zeiten erscheinen in Grün mit Checkmark</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Alle Zeiten sind in CEST (Mitteleuropäische Sommerzeit)</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Scrolle nach unten für mehr Zeitslots (6:00 - 21:00 Uhr)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-4 bg-gradient-to-r from-emerald-50 to-sage-50 p-4 rounded-lg border border-sage-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-200 to-emerald-100 border-2 border-emerald-500 rounded flex items-center justify-center">
            <span className="text-emerald-700 font-bold">✓</span>
          </div>
          <span className="text-sm font-medium text-gray-700">Verfügbar</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white border-2 border-dashed border-sage-300 rounded" />
          <span className="text-sm font-medium text-gray-700">
            Nicht verfügbar
          </span>
        </div>
      </div>
    </div>
  );
}
