-- Signal Schedule v2.27.0 Assignment Generator Foundation
-- Purpose: model draft assignment generation runs and role-based review metadata without enabling live publish writes.

CREATE TABLE IF NOT EXISTS schedule_assignment_generation_runs (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  date_start date,
  date_end date,
  status text NOT NULL DEFAULT 'draft',
  created_by text,
  notes text,
  input_snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_assignment_generation_drafts (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  run_id text REFERENCES schedule_assignment_generation_runs(id) ON DELETE CASCADE,
  assignment_date date NOT NULL,
  shift_key text,
  shift_label text,
  starts_at time,
  ends_at time,
  role_key text NOT NULL,
  coverage_spot_id text,
  coverage_spot_code text,
  employee_id text,
  employee_display_name text,
  source_key text NOT NULL DEFAULT 'generator',
  status text NOT NULL DEFAULT 'draft',
  coverage_impact text NOT NULL DEFAULT 'pending',
  conflicts jsonb NOT NULL DEFAULT '[]'::jsonb,
  role_visibility jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_assignment_generation_audit (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  run_id text,
  draft_id text,
  event_type text NOT NULL,
  actor_id text,
  actor_role text,
  reason text,
  before_state jsonb NOT NULL DEFAULT '{}'::jsonb,
  after_state jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_schedule_assignment_generation_runs_agency_status ON schedule_assignment_generation_runs (agency_id, status);
CREATE INDEX IF NOT EXISTS idx_schedule_assignment_generation_drafts_run ON schedule_assignment_generation_drafts (run_id);
CREATE INDEX IF NOT EXISTS idx_schedule_assignment_generation_drafts_date_role ON schedule_assignment_generation_drafts (agency_id, assignment_date, role_key);
CREATE INDEX IF NOT EXISTS idx_schedule_assignment_generation_audit_run ON schedule_assignment_generation_audit (run_id, created_at);

INSERT INTO schema_migrations (version, name)
VALUES ('033', 'assignment_generator')
ON CONFLICT (version) DO NOTHING;
