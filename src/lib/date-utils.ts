import { format, parseISO, isValid } from "date-fns";
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
 * Get a date N days from now
 * @param days - Number of days to add to current date
 * @returns Date object
 */
export function addDays(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

/**
 * Create a date with specific time on a future day
 * @param daysFromNow - Days from today
 * @param hour - Hour of day (0-23)
 * @param minute - Minute (0-59)
 * @returns Date object
 */
export function createFutureDate(
  daysFromNow: number,
  hour: number,
  minute: number = 0
): Date {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(hour, minute, 0, 0);
  return date;
}

/**
 * Check if a date is in the past
 * 
 * This function creates the current date once at the start to avoid
 * millisecond-level timing differences that could occur if new Date()
 * was called multiple times within the comparison logic.
 * 
 * Note: All dates are compared in the local timezone. For CEST
 * (Central European Summer Time) specific handling, ensure dates
 * are properly constructed with the correct timezone offset before
 * passing them to this function.
 * 
 * @param date - Date to check
 * @returns true if date is in the past
 */
export function isPast(date: Date): boolean {
  const now = new Date();
  return date < now;
}

/**
 * Check if a date is upcoming (within next 7 days)
 * @param date - Date to check
 * @returns true if date is within next week
 */
export function isUpcoming(date: Date): boolean {
  const now = new Date();
  const weekFromNow = addDays(7);
  return date >= now && date <= weekFromNow;
}
