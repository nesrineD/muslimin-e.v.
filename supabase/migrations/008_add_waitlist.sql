-- Warteliste für Aschura 2026
-- Separate Tabelle, da Wartelistenplätze keine Stornierungstoken benötigen.
-- Gästedaten als JSONB (analog zum API-Payload), kein separates guests-Join nötig.

CREATE TABLE event_waitlist (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id                TEXT NOT NULL DEFAULT 'ashura-2026',
  email                   VARCHAR(255) NOT NULL,
  anzahl_teilnehmer       INT NOT NULL CHECK (anzahl_teilnehmer >= 1),
  guests                  JSONB NOT NULL DEFAULT '[]',
  datenschutz_accepted_at TIMESTAMPTZ NOT NULL,
  notified_at             TIMESTAMPTZ,
  created_at              TIMESTAMPTZ DEFAULT NOW()
);

-- Eine E-Mail-Adresse darf pro Veranstaltung nur einmal auf der Warteliste stehen
CREATE UNIQUE INDEX idx_event_waitlist_unique_email
  ON event_waitlist(event_id, email);

CREATE INDEX idx_event_waitlist_event_id
  ON event_waitlist(event_id, created_at);

-- RLS
ALTER TABLE event_waitlist ENABLE ROW LEVEL SECURITY;

-- Public: anon darf sich eintragen
CREATE POLICY "public_insert_waitlist"
  ON event_waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Admin: voller Zugriff
CREATE POLICY "admin_full_access_waitlist"
  ON event_waitlist
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');
