-- register_for_event: atomare Kapazitätsprüfung + INSERT in beide Tabellen.
-- p_guests: JSONB-Array von {vorname, nachname}-Objekten.
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

  -- Serialise concurrent registrations with a transaction-scoped advisory lock.
  -- FOR UPDATE cannot be combined with aggregate functions in PostgreSQL.
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


-- checkin_guest: setzt checked_in für einen einzelnen Gast.
CREATE OR REPLACE FUNCTION checkin_guest(
  p_guest_id   UUID,
  p_checked_in BOOLEAN
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE event_guests SET checked_in = p_checked_in WHERE id = p_guest_id;
END;
$$;


-- cancel_guests: löscht spezifische Gäste aus einer Anmeldung.
-- Setzt status = 'cancelled' wenn danach keine Gäste mehr übrig sind.
CREATE OR REPLACE FUNCTION cancel_guests(
  p_registration_id UUID,
  p_guest_ids       UUID[]
)
RETURNS TABLE(remaining_count INT, is_full_cancel BOOLEAN)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  remaining INT;
BEGIN
  DELETE FROM event_guests
  WHERE registration_id = p_registration_id
    AND id = ANY(p_guest_ids);

  SELECT COUNT(*) INTO remaining
  FROM event_guests
  WHERE registration_id = p_registration_id;

  IF remaining = 0 THEN
    UPDATE event_registrations
    SET status = 'cancelled', token_used = true
    WHERE id = p_registration_id;
    RETURN QUERY SELECT 0::INT, true;
  ELSE
    UPDATE event_registrations
    SET anzahl_teilnehmer = remaining
    WHERE id = p_registration_id;
    RETURN QUERY SELECT remaining::INT, false;
  END IF;
END;
$$;
