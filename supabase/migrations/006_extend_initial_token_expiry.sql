-- Extend the initial cancellation token lifetime from 15 to 23 days.
ALTER TABLE event_registrations
  ALTER COLUMN token_expires_at SET DEFAULT (NOW() + INTERVAL '23 days');
