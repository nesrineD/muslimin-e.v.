-- Fix: FOR UPDATE is not allowed with aggregate functions in PostgreSQL.
-- Use pg_advisory_xact_lock instead to serialise concurrent registrations.
CREATE OR REPLACE FUNCTION register_for_event(
  p_event_id  TEXT,
  p_email     TEXT,
  p_guests    JSONB,
  p_capacity  INT
)
RETURNS TABLE(registration_id UUID, cancellation_token UUID)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_total INT;
  guest_count   INT;
  new_reg       event_registrations;
  guest         JSONB;
BEGIN
  guest_count := jsonb_array_length(p_guests);

  PERFORM pg_advisory_xact_lock(hashtext(p_event_id || '-capacity'));

  SELECT COALESCE(SUM(anzahl_teilnehmer), 0)
  INTO current_total
  FROM event_registrations
  WHERE event_id = p_event_id AND status = 'active';

  IF current_total + guest_count > p_capacity THEN
    RAISE EXCEPTION 'CAPACITY_EXCEEDED';
  END IF;

  INSERT INTO event_registrations (event_id, email, anzahl_teilnehmer)
  VALUES (p_event_id, p_email, guest_count)
  RETURNING * INTO new_reg;

  FOR guest IN SELECT * FROM jsonb_array_elements(p_guests)
  LOOP
    INSERT INTO event_guests (registration_id, vorname, nachname)
    VALUES (new_reg.id, guest->>'vorname', guest->>'nachname');
  END LOOP;

  RETURN QUERY SELECT new_reg.id, new_reg.cancellation_token;
END;
$$;