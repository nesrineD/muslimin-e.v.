-- Store when the user accepted the Datenschutz (GDPR consent) at registration time.
-- Nullable so existing rows are unaffected.
ALTER TABLE event_registrations
  ADD COLUMN IF NOT EXISTS datenschutz_accepted_at TIMESTAMPTZ;
