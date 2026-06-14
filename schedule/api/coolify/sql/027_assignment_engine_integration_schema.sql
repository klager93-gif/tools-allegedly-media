-- Signal Schedule v2.21.0 Assignment Engine Integration
-- Purpose: model assignment records and assignment history linking daily board spots to employees and source workflows.

CREATE TABLE IF NOT EXISTS schedule_assignment_records (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  assignment_date date NOT NULL,
  shift_id text NOT NULL,
  role_key text NOT NULL,
  coverage_spot_id text,
  spot_code text NOT NULL,
  spot_label text,
  employee_id text,
  source_type text NOT NULL DEFAULT 'pattern',
  status text NOT NULL DEFAULT 'assigned',
  coverage_impact text NOT NULL DEFAULT 'filled',
  related_module text,
  related_record_id text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_assignment_history (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  assignment_id text NOT NULL,
  event_key text NOT NULL,
  event_label text NOT NULL,
  actor_id text,
  actor_label text,
  previous_value jsonb NOT NULL DEFAULT '{}'::jsonb,
  new_value jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_schedule_assignment_records_date_shift ON schedule_assignment_records (agency_id, assignment_date, shift_id);
CREATE INDEX IF NOT EXISTS idx_schedule_assignment_records_employee ON schedule_assignment_records (employee_id, assignment_date);
CREATE INDEX IF NOT EXISTS idx_schedule_assignment_records_status ON schedule_assignment_records (agency_id, status, coverage_impact);
CREATE INDEX IF NOT EXISTS idx_schedule_assignment_records_source ON schedule_assignment_records (source_type, related_module, related_record_id);
CREATE INDEX IF NOT EXISTS idx_schedule_assignment_history_assignment ON schedule_assignment_history (assignment_id, created_at);

INSERT INTO schema_migrations (version, name)
VALUES ('027', 'assignment_engine_integration')
ON CONFLICT (version) DO NOTHING;
