-- Track when an admin reminder email was last sent for a registration,
-- so the dashboard can show it and warn before sending twice.
-- Nullable so existing rows are unaffected.
ALTER TABLE event_registrations
  ADD COLUMN IF NOT EXISTS reminder_sent_at TIMESTAMPTZ;
