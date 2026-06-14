import type { Guest } from "@/types/aschura";

interface GuestRow extends Guest {
  registration_email: string;
}

export function flattenGuests(
  data: Array<{
    id: string;
    vorname: string;
    nachname: string;
    checked_in: boolean;
    event_registrations: { email: string } | { email: string }[];
  }>,
): GuestRow[] {
  return data.map((g) => {
    const reg = Array.isArray(g.event_registrations)
      ? g.event_registrations[0]
      : g.event_registrations;
    return {
      id: g.id,
      registration_id: "",
      vorname: g.vorname,
      nachname: g.nachname,
      checked_in: g.checked_in,
      registration_email: reg?.email ?? "",
    };
  });
}
