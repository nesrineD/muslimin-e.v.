-- Promote the oldest fitting waitlist entry to a confirmed registration.
-- Uses the same advisory lock key as register_for_event to prevent races
-- with concurrent sign-ups claiming the freed slot first.
--
-- Returns one row if a promotion happened, zero rows if the waitlist is empty
-- or no entry fits within the remaining capacity.
CREATE OR REPLACE FUNCTION promote_from_waitlist(
  p_event_id TEXT,
  p_capacity  INT
)
RETURNS TABLE(
  out_email              TEXT,
  out_guests             JSONB,
  out_cancellation_token UUID
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  available_spots INT;
  wl_entry        event_waitlist%ROWTYPE;
  new_reg         event_registrations%ROWTYPE;
  guest           JSONB;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext(p_event_id || '-capacity'));

  SELECT p_capacity - COALESCE(SUM(anzahl_teilnehmer), 0)
  INTO available_spots
  FROM event_registrations
  WHERE event_id = p_event_id AND status = 'active';

  -- Oldest entry whose group still fits in the remaining capacity
  SELECT *
  INTO wl_entry
  FROM event_waitlist
  WHERE event_id = p_event_id
    AND anzahl_teilnehmer <= available_spots
  ORDER BY created_at ASC
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN;
  END IF;

  INSERT INTO event_registrations (
    event_id,
    email,
    anzahl_teilnehmer,
    datenschutz_accepted_at
  )
  VALUES (
    wl_entry.event_id,
    wl_entry.email,
    wl_entry.anzahl_teilnehmer,
    wl_entry.datenschutz_accepted_at
  )
  RETURNING * INTO new_reg;

  FOR guest IN SELECT * FROM jsonb_array_elements(wl_entry.guests)
  LOOP
    INSERT INTO event_guests (registration_id, vorname, nachname)
    VALUES (new_reg.id, guest->>'vorname', guest->>'nachname');
  END LOOP;

  DELETE FROM event_waitlist WHERE id = wl_entry.id;

  RETURN QUERY
    SELECT new_reg.email::TEXT, wl_entry.guests, new_reg.cancellation_token;
END;
$$;
