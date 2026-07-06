-- Explizite Grants für die Supabase-API-Rollen.
-- Ältere Supabase-Projekte (wie unser Prod-Projekt) haben diese Grants als
-- Default; neuere CLI-Versionen vergeben sie beim lokalen Replay der
-- Migrationen nicht mehr automatisch. Ohne sie schlägt jeder Zugriff über
-- PostgREST (auch mit dem service_role-Key) mit "permission denied" fehl.
-- Der eigentliche Schutz bleibt RLS — diese Grants sind nur die Grundlage.

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated, service_role;

-- Auch für künftig angelegte Tabellen/Funktionen
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT EXECUTE ON FUNCTIONS TO anon, authenticated, service_role;
