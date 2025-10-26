import { format, parseISO, isValid, startOfWeek, addWeeks, addDays } from "date-fns";
import { de } from "date-fns/locale";

/**
 * Sichere Datumsformatierung - verhindert "date value is not finite" Fehler
 */
export function formatDateSafe(date: Date | string | null | undefined): string {
  if (!date) return "";

  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;

    if (!isValid(dateObj)) {
      console.error("Invalid date provided:", date);
      return "";
    }

    return format(dateObj, "dd.MM.yyyy HH:mm", { locale: de });
  } catch (error) {
    console.error("Date formatting error:", error);
    return "";
  }
}

/**
 * Formatiert nur das Datum (ohne Uhrzeit)
 */
export function formatDateOnly(date: Date | string | null | undefined): string {
  if (!date) return "";

  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;

    if (!isValid(dateObj)) {
      console.error("Invalid date provided:", date);
      return "";
    }

    return format(dateObj, "EEEE, dd. MMMM yyyy", { locale: de });
  } catch (error) {
    console.error("Date formatting error:", error);
    return "";
  }
}

/**
 * Formatiert nur die Uhrzeit
 */
export function formatTimeOnly(date: Date | string | null | undefined): string {
  if (!date) return "";

  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;

    if (!isValid(dateObj)) {
      console.error("Invalid date provided:", date);
      return "";
    }

    return format(dateObj, "HH:mm", { locale: de });
  } catch (error) {
    console.error("Date formatting error:", error);
    return "";
  }
}

/**
 * Intl.DateTimeFormat Alternative mit Fehlerbehandlung
 */
export function formatDateIntl(date: Date | string | null | undefined): string {
  if (!date) return "";

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    // Prüfe ob das Datum gültig ist
    if (!dateObj || isNaN(dateObj.getTime())) {
      console.error("Invalid date provided:", date);
      return "";
    }

    return new Intl.DateTimeFormat("de-DE", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(dateObj);
  } catch (error) {
    console.error("DateTimeFormat error:", error);
    return "";
  }
}

/**
 * Berechnet die Daten für eine Woche (Montag bis Sonntag)
 * 
 * Diese Funktion verwendet date-fns um Date-Objekte NICHT zu mutieren,
 * was einen häufigen Fehler bei direkter Verwendung von setDate() verhindert.
 * 
 * @param weekOffset - Offset in Wochen von der aktuellen Woche (0 = aktuelle Woche, 1 = nächste Woche, -1 = letzte Woche)
 * @param referenceDate - Optionales Referenzdatum (Standard: heute)
 * @returns Array mit 7 Date-Objekten für Montag bis Sonntag
 * 
 * @example
 * // Aktuelle Woche
 * const currentWeek = getWeekDates(0);
 * 
 * @example
 * // Nächste Woche
 * const nextWeek = getWeekDates(1);
 * 
 * @example
 * // Letzte Woche
 * const lastWeek = getWeekDates(-1);
 */
export function getWeekDates(
  weekOffset: number = 0,
  referenceDate: Date = new Date()
): Date[] {
  // Finde Montag der aktuellen Woche (date-fns: Monday = 1)
  const monday = startOfWeek(referenceDate, { weekStartsOn: 1 });
  
  // Füge den Wochen-Offset hinzu (falls vorhanden)
  const weekStart = addWeeks(monday, weekOffset);
  
  // Generiere Array mit 7 Tagen (Montag bis Sonntag)
  return Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));
}
