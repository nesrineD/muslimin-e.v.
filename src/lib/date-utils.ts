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
