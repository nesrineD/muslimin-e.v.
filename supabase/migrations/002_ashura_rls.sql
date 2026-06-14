-- Row Level Security for Ashura tables.
-- All server-side mutations use service_role_key and bypass RLS.
-- anon key is only allowed to INSERT into event_registrations.

ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_guests ENABLE ROW LEVEL SECURITY;

-- Public: anyone (anon) may create a registration
CREATE POLICY "public_insert_registration"
  ON event_registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Admin: full access to registrations
CREATE POLICY "admin_full_access_registrations"
  ON event_registrations
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Admin: full access to guests
CREATE POLICY "admin_full_access_guests"
  ON event_guests
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- No public SELECT on either table — all reads go through API routes
-- using the service_role_key (which bypasses RLS).
