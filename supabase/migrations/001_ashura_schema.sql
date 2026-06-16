-- Ashura 2026 — Event-Registrierungen
-- vorname/nachname werden NICHT in event_registrations gespeichert.
-- Alle Namen leben in event_guests (eine Zeile pro Person).

CREATE TABLE event_registrations (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id            TEXT NOT NULL DEFAULT 'ashura-2026',
  email               VARCHAR(255) NOT NULL,
  anzahl_teilnehmer   INT NOT NULL CHECK (anzahl_teilnehmer >= 1),
  status              TEXT NOT NULL DEFAULT 'active'
                        CHECK (status IN ('active', 'cancelled')),
  checked_in          BOOLEAN NOT NULL DEFAULT false,
  cancellation_token  UUID NOT NULL DEFAULT gen_random_uuid(),
  token_expires_at    TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '15 days'),
  token_used          BOOLEAN NOT NULL DEFAULT false,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE event_guests (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id  UUID NOT NULL
                     REFERENCES event_registrations(id) ON DELETE CASCADE,
  vorname          VARCHAR(100) NOT NULL,
  nachname         VARCHAR(100) NOT NULL,
  checked_in       BOOLEAN NOT NULL DEFAULT false
);

-- Indexes
CREATE INDEX idx_event_registrations_event_id
  ON event_registrations(event_id);

CREATE INDEX idx_event_registrations_email
  ON event_registrations(email, event_id);

CREATE INDEX idx_event_registrations_token
  ON event_registrations(cancellation_token)
  WHERE token_used = false;

CREATE INDEX idx_event_registrations_status
  ON event_registrations(event_id, status);

CREATE INDEX idx_event_guests_registration_id
  ON event_guests(registration_id);
