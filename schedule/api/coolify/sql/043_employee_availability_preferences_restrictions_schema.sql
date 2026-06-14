-- Signal Schedule v4.6.0
-- Employee availability, preferences, restrictions, and reusable view group filter foundations.

CREATE TABLE IF NOT EXISTS schedule_employee_availability (
  id bigserial PRIMARY KEY,
  agency_id text NOT NULL,
  employee_id text NOT NULL,
  day_of_week text,
  start_time time,
  end_time time,
  status text NOT NULL DEFAULT 'available' CHECK (status IN ('available','unavailable','limited')),
  source text,
  effective_start date,
  effective_end date,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_employee_preferences (
  id bigserial PRIMARY KEY,
  agency_id text NOT NULL,
  employee_id text NOT NULL,
  preference_type text NOT NULL,
  preference_value text NOT NULL,
  weight text NOT NULL DEFAULT 'preferred' CHECK (weight IN ('preferred','avoid','neutral','required')),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_employee_restrictions (
  id bigserial PRIMARY KEY,
  agency_id text NOT NULL,
  employee_id text NOT NULL,
  restriction_type text NOT NULL,
  rule_text text NOT NULL,
  severity text NOT NULL DEFAULT 'warning' CHECK (severity IN ('info','warning','block')),
  override_allowed boolean NOT NULL DEFAULT true,
  effective_start date,
  effective_end date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_view_group_filters (
  id text PRIMARY KEY,
  agency_id text NOT NULL,
  label text NOT NULL,
  group_type text NOT NULL,
  filter_json jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_system boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO schema_migrations (version, name, applied_at)
VALUES ('043', 'employee_availability_preferences_restrictions', now())
ON CONFLICT (version) DO NOTHING;
