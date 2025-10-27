"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";

interface TimeSlot {
  id: string;
  start: string;
  end: string;
  available: boolean;
  helperName?: string;
  memberName?: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  extendedProps: {
    helperName?: string;
    memberName?: string;
    available: boolean;
    slotType: "available" | "booked" | "blocked";
  };
}

interface AdvancedCalendarProps {
  mode: "availability" | "booking";
  availableSlots?: { [key: string]: any[] };
  isEditing?: boolean;
  onTimeSlotCreate?: (date: Date, start: string, end: string) => void;
  onTimeSlotDelete?: (slotId: string, date: Date) => void;
  onDateSelect?: (date: Date) => void;
  onSlotSelect?: (slot: any) => void;
  selectedDate?: Date;
}

export default function AdvancedCalendar({
  mode = "booking",
  availableSlots = {},
  isEditing = false,
  onTimeSlotCreate,
  onTimeSlotDelete,
  onDateSelect,
  onSlotSelect,
  selectedDate,
}: AdvancedCalendarProps) {
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedDateForSlot, setSelectedDateForSlot] = useState<Date | null>(
    null
  );
  const [timeForm, setTimeForm] = useState({ start: "09:00", end: "09:45" });

  // Convert availableSlots to FullCalendar events
  const convertToEvents = (): CalendarEvent[] => {
    const events: CalendarEvent[] = [];

    Object.keys(availableSlots).forEach((dateStr) => {
      const slots = availableSlots[dateStr] || [];

      slots.forEach((slot) => {
        const startDateTime = `${dateStr}T${slot.start}:00`;
        const endDateTime = `${dateStr}T${slot.end}:00`;

        let backgroundColor = "#10b981"; // emerald-500
        let borderColor = "#059669"; // emerald-600
        let title = "Verfügbar";
        let slotType: "available" | "booked" | "blocked" = "available";

        if (mode === "booking" && slot.available) {
          backgroundColor = "#3b82f6"; // blue-500
          borderColor = "#2563eb"; // blue-600
          title = slot.helperName || "Verfügbar";
        } else if (!slot.available) {
          backgroundColor = "#f59e0b"; // amber-500
          borderColor = "#d97706"; // amber-600
          title = slot.memberName
            ? `Gebucht: ${slot.memberName}`
            : "Nicht verfügbar";
          slotType = "booked";
        }

        events.push({
          id: slot.id,
          title,
          start: startDateTime,
          end: endDateTime,
          backgroundColor,
          borderColor,
          textColor: "#ffffff",
          extendedProps: {
            helperName: slot.helperName,
            memberName: slot.memberName,
            available: slot.available,
            slotType,
          },
        });
      });
    });

    return events;
  };

  const handleDateClick = (info: any) => {
    if (mode === "availability" && isEditing) {
      setSelectedDateForSlot(info.date);
      setShowTimeModal(true);
    } else if (mode === "booking") {
      onDateSelect?.(info.date);
    }
  };

  const handleEventClick = (info: any) => {
    const event = info.event;
    const slot = {
      id: event.id,
      start:
        event.extendedProps.start || event.start.toTimeString().slice(0, 5),
      end: event.extendedProps.end || event.end.toTimeString().slice(0, 5),
      available: event.extendedProps.available,
      helperName: event.extendedProps.helperName,
      memberName: event.extendedProps.memberName,
    };

    if (mode === "availability" && isEditing) {
      // Delete functionality for availability mode
      if (confirm("Möchten Sie diesen Zeitslot löschen?")) {
        onTimeSlotDelete?.(event.id, event.start);
      }
    } else if (mode === "booking" && event.extendedProps.available) {
      // Select slot for booking
      onSlotSelect?.(slot);
    }
  };

  const handleCreateTimeSlot = () => {
    if (selectedDateForSlot && onTimeSlotCreate) {
      onTimeSlotCreate(selectedDateForSlot, timeForm.start, timeForm.end);
      setShowTimeModal(false);
      setTimeForm({ start: "09:00", end: "09:45" });
    }
  };

  const events = convertToEvents();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right:
              mode === "availability"
                ? "dayGridMonth,timeGridWeek,timeGridDay"
                : "dayGridMonth",
          }}
          initialView={
            mode === "availability" ? "timeGridWeek" : "dayGridMonth"
          }
          editable={false}
          selectable={mode === "availability" && isEditing}
          selectMirror={true}
          dayMaxEvents={mode === "booking" ? 3 : false}
          weekends={true}
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height="auto"
          locale="de"
          // Time slot specific settings for availability mode
          slotMinTime={mode === "availability" ? "08:00:00" : undefined}
          slotMaxTime={mode === "availability" ? "20:00:00" : undefined}
          slotDuration={mode === "availability" ? "00:15:00" : undefined}
          // German localization
          buttonText={{
            today: "Heute",
            month: "Monat",
            week: "Woche",
            day: "Tag",
          }}
          // Styling
          eventClassNames="cursor-pointer"
          dayHeaderFormat={{ weekday: "short" }}
          // No overlap for cleaner look
          eventOverlap={false}
          // Custom styling via CSS classes
          eventDidMount={(info) => {
            if (mode === "booking") {
              info.el.classList.add("hover:scale-105", "transition-transform");
            }
          }}
        />
      </div>

      {/* Time Slot Creation Modal for Availability Mode */}
      {showTimeModal && mode === "availability" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-80">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Verfügbarkeit hinzufügen
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {selectedDateForSlot?.toLocaleDateString("de-DE", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Von
                </label>
                <input
                  type="time"
                  value={timeForm.start}
                  onChange={(e) =>
                    setTimeForm((prev) => ({ ...prev, start: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bis
                </label>
                <input
                  type="time"
                  value={timeForm.end}
                  onChange={(e) =>
                    setTimeForm((prev) => ({ ...prev, end: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleCreateTimeSlot}
                className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
              >
                Hinzufügen
              </button>
              <button
                onClick={() => setShowTimeModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors font-medium"
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
