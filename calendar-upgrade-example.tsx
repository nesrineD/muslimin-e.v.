// Example: FullCalendar Implementation for Muslimin-Beratung

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor?: string;
  borderColor?: string;
  extendedProps: {
    helperName: string;
    available: boolean;
    memberName?: string;
  };
}

export default function AdvancedCalendar({
  mode,
  events,
  onEventClick,
  onDateSelect,
}: {
  mode: "availability" | "booking";
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onDateSelect: (date: Date) => void;
}) {
  const handleDateClick = (info: any) => {
    if (mode === "availability") {
      // Open modal to add availability slot
      onDateSelect(info.date);
    }
  };

  const handleEventClick = (info: any) => {
    onEventClick(info.event);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right:
            mode === "availability"
              ? "dayGridMonth,timeGridWeek"
              : "dayGridMonth",
        }}
        initialView={mode === "availability" ? "timeGridWeek" : "dayGridMonth"}
        editable={mode === "availability"}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        height="auto"
        locale="de"
        // Custom styling
        eventBackgroundColor={mode === "availability" ? "#10b981" : "#3b82f6"}
        eventBorderColor={mode === "availability" ? "#059669" : "#2563eb"}
        // Time slot specific settings
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        slotDuration="00:45:00"
        // German localization
        buttonText={{
          today: "Heute",
          month: "Monat",
          week: "Woche",
          day: "Tag",
        }}
      />
    </div>
  );
}

// Usage Example for Helper Dashboard:
/*
const helperEvents = [
  {
    id: '1',
    title: 'Verfügbar',
    start: '2025-09-25T09:00:00',
    end: '2025-09-25T09:45:00',
    backgroundColor: '#10b981',
    extendedProps: {
      helperName: 'Amina El-Kassem',
      available: true
    }
  },
  {
    id: '2', 
    title: 'Beratung: Fatima S.',
    start: '2025-09-25T10:00:00',
    end: '2025-09-25T10:45:00',
    backgroundColor: '#f59e0b',
    extendedProps: {
      helperName: 'Amina El-Kassem',
      available: false,
      memberName: 'Fatima S.'
    }
  }
]
*/

// Usage Example for Member Booking:
/*
const bookingEvents = [
  {
    id: '3',
    title: 'Dr. Fatima Hassan',
    start: '2025-09-25T14:00:00', 
    end: '2025-09-25T14:45:00',
    backgroundColor: '#3b82f6',
    extendedProps: {
      helperName: 'Dr. Fatima Hassan',
      available: true
    }
  }
]
*/
