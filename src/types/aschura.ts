export type RegistrationStatus = "active" | "cancelled";

export interface Guest {
  id: string;
  registration_id: string;
  vorname: string;
  nachname: string;
  checked_in: boolean;
}

export interface GuestInput {
  vorname: string;
  nachname: string;
}

export interface EventRegistration {
  id: string;
  event_id: string;
  email: string;
  anzahl_teilnehmer: number;
  status: RegistrationStatus;
  checked_in: boolean;
  cancellation_token: string;
  token_expires_at: string;
  token_used: boolean;
  created_at: string;
  reminder_sent_at?: string | null;
  guests?: Guest[];
}

export interface CapacityInfo {
  total_capacity: number;
  registered: number;
  available: number;
  is_full: boolean;
}

export type AdminRegistrationRow = EventRegistration;
