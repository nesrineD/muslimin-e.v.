-- Recreate event_guests table if it was accidentally deleted.
-- Uses IF NOT EXISTS so it is safe to run even if the table already exists.

CREATE TABLE IF NOT EXISTS event_guests (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id  UUID NOT NULL
                     REFERENCES event_registrations(id) ON DELETE CASCADE,
  vorname          VARCHAR(100) NOT NULL,
  nachname         VARCHAR(100) NOT NULL,
  checked_in       BOOLEAN NOT NULL DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_event_guests_registration_id
  ON event_guests(registration_id);
