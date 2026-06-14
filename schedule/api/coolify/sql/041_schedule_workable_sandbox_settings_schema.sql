-- Signal Schedule v4.6.0
-- Workable schedule sandbox and admin settings persistence foundation.
CREATE TABLE IF NOT EXISTS schedule_admin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id text NOT NULL,
  settings_key text NOT NULL,
  settings_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (agency_id, settings_key)
);
CREATE TABLE IF NOT EXISTS schedule_sandbox_scenarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id text NOT NULL,
  scenario_name text NOT NULL,
  week_of date NOT NULL,
  scenario_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  validation_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_by text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS schedule_sandbox_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scenario_id uuid REFERENCES schedule_sandbox_scenarios(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  event_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
INSERT INTO schema_migrations (version, description)
VALUES ('041', 'schedule workable sandbox settings schema')
ON CONFLICT (version) DO NOTHING;
