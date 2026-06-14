-- Signal Schedule v4.6.0
-- Employee portal preview, View As foundation, and builder autocomplete persistence placeholders.

CREATE TABLE IF NOT EXISTS schedule_view_profiles (
  id text PRIMARY KEY,
  agency_id text NOT NULL,
  view_type text NOT NULL CHECK (view_type IN ('employee','group','role','location','qualification','shift','pattern','compound')),
  label text NOT NULL,
  filter_json jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_system boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_view_audit (
  id bigserial PRIMARY KEY,
  agency_id text NOT NULL,
  actor_employee_id text,
  viewed_profile_id text REFERENCES schedule_view_profiles(id),
  viewed_employee_id text,
  action text NOT NULL DEFAULT 'view_as_opened',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_employee_portal_preferences (
  employee_id text PRIMARY KEY,
  agency_id text NOT NULL,
  default_view text NOT NULL DEFAULT 'dashboard',
  notification_settings jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO schema_migrations (version, name, applied_at)
VALUES ('042', 'employee_portal_view_as_foundation', now())
ON CONFLICT (version) DO NOTHING;
