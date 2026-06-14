-- Signal Schedule v2.25.0 Mandation Engine Foundation
-- Purpose: model mandation policy profiles, rotation entries, shortage evaluations, override audit, and employee/supervisor visibility without enabling production mandate writes.

CREATE TABLE IF NOT EXISTS schedule_mandation_policy_profiles (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  name text NOT NULL,
  allow_holdover boolean NOT NULL DEFAULT true,
  allow_early_in boolean NOT NULL DEFAULT true,
  allow_mandate_on_day_off boolean NOT NULL DEFAULT false,
  allow_short_day_window_eligibility boolean NOT NULL DEFAULT true,
  allow_cross_day_mandates boolean NOT NULL DEFAULT true,
  allow_cross_shift_group_mandates boolean NOT NULL DEFAULT false,
  require_role_qualification boolean NOT NULL DEFAULT true,
  minimum_rest_hours numeric(5,2) NOT NULL DEFAULT 8,
  max_consecutive_work_hours numeric(5,2) NOT NULL DEFAULT 16,
  max_day_off_mandate_hours numeric(5,2) NOT NULL DEFAULT 8,
  max_connected_mandate_hours numeric(5,2) NOT NULL DEFAULT 4,
  rotation_method text NOT NULL DEFAULT 'eligible-next-in-rotation',
  hard_rules jsonb NOT NULL DEFAULT '[]'::jsonb,
  soft_rules jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_mandation_rotation_entries (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  policy_profile_id text REFERENCES schedule_mandation_policy_profiles(id) ON DELETE SET NULL,
  employee_id text NOT NULL,
  display_name text NOT NULL,
  role_key text NOT NULL,
  shift_group text,
  rotation_position integer NOT NULL,
  status text NOT NULL DEFAULT 'eligible',
  mandates_year_to_date integer NOT NULL DEFAULT 0,
  forced_hours_year_to_date numeric(7,2) NOT NULL DEFAULT 0,
  last_mandated_date date,
  normal_shift_window text,
  actual_shift_window text,
  next_shift_window text,
  employee_visible_reason text,
  supervisor_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_mandation_shortages (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  policy_profile_id text REFERENCES schedule_mandation_policy_profiles(id) ON DELETE SET NULL,
  shortage_date date NOT NULL,
  shortage_start time NOT NULL,
  shortage_end time NOT NULL,
  role_key text NOT NULL,
  reason text,
  minimum_required integer NOT NULL DEFAULT 0,
  scheduled_count integer NOT NULL DEFAULT 0,
  selected_employee_id text,
  engine_recommendation text,
  status text NOT NULL DEFAULT 'preview',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_mandation_evaluations (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  shortage_id text REFERENCES schedule_mandation_shortages(id) ON DELETE CASCADE,
  employee_id text NOT NULL,
  display_name text NOT NULL,
  engine_result text NOT NULL,
  visibility text NOT NULL DEFAULT 'supervisor-admin',
  reason text NOT NULL,
  rule_checks jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_mandation_overrides (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  shortage_id text REFERENCES schedule_mandation_shortages(id) ON DELETE SET NULL,
  employee_id text,
  engine_recommendation text,
  override_applied boolean NOT NULL DEFAULT false,
  override_reason text,
  override_note text,
  overridden_by text,
  overridden_at timestamptz,
  audit_note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_schedule_mandation_rotation_agency_position ON schedule_mandation_rotation_entries (agency_id, rotation_position);
CREATE INDEX IF NOT EXISTS idx_schedule_mandation_shortages_agency_date ON schedule_mandation_shortages (agency_id, shortage_date);
CREATE INDEX IF NOT EXISTS idx_schedule_mandation_evaluations_shortage ON schedule_mandation_evaluations (shortage_id);
CREATE INDEX IF NOT EXISTS idx_schedule_mandation_overrides_shortage ON schedule_mandation_overrides (shortage_id);

INSERT INTO schema_migrations (version, name)
VALUES ('031', 'mandation_engine_foundation')
ON CONFLICT (version) DO NOTHING;
