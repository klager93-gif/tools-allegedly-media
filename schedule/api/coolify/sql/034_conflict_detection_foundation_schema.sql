-- Signal Schedule v2.28.0 Conflict Detection Foundation
-- Purpose: model generated conflict runs, conflict records, rule checks, and resolution review without enabling publish writes.

CREATE TABLE IF NOT EXISTS schedule_conflict_detection_runs (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  generator_run_id text,
  date_start date,
  date_end date,
  status text NOT NULL DEFAULT 'preview',
  created_by text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_conflict_detection_records (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  run_id text REFERENCES schedule_conflict_detection_runs(id) ON DELETE SET NULL,
  conflict_type text NOT NULL,
  severity text NOT NULL DEFAULT 'warning',
  status text NOT NULL DEFAULT 'open',
  employee_id text,
  assignment_id text,
  coverage_spot_id text,
  related_module text,
  related_record_id text,
  conflict_start timestamptz,
  conflict_end timestamptz,
  message text NOT NULL,
  recommended_action text,
  visibility_scope text NOT NULL DEFAULT 'supervisor',
  override_allowed boolean NOT NULL DEFAULT false,
  override_reason text,
  resolved_by text,
  resolved_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_conflict_detection_rules (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  rule_key text NOT NULL,
  rule_label text NOT NULL,
  severity text NOT NULL DEFAULT 'warning',
  rule_level text NOT NULL DEFAULT 'soft',
  enabled boolean NOT NULL DEFAULT true,
  config jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_schedule_conflict_records_run ON schedule_conflict_detection_records (run_id);
CREATE INDEX IF NOT EXISTS idx_schedule_conflict_records_agency_status ON schedule_conflict_detection_records (agency_id, status);
CREATE INDEX IF NOT EXISTS idx_schedule_conflict_records_type_severity ON schedule_conflict_detection_records (conflict_type, severity);
CREATE INDEX IF NOT EXISTS idx_schedule_conflict_rules_agency_key ON schedule_conflict_detection_rules (agency_id, rule_key);

INSERT INTO schema_migrations (version, name)
VALUES ('034', 'conflict_detection_foundation')
ON CONFLICT (version) DO NOTHING;
