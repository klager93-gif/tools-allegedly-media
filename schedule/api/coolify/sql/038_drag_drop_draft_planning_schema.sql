-- Signal Schedule v4.6.0 Drag-and-Drop + Draft Engine
-- Purpose: model draft runs, staged assignment moves, publish checklist items, and audit-ready move history.

CREATE TABLE IF NOT EXISTS schedule_draft_runs (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  name text NOT NULL,
  range_start date NOT NULL,
  range_end date NOT NULL,
  status text NOT NULL DEFAULT 'editing',
  source text NOT NULL DEFAULT 'manual',
  created_by text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  published_at timestamptz
);

CREATE TABLE IF NOT EXISTS schedule_draft_assignment_moves (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  draft_run_id text NOT NULL REFERENCES schedule_draft_runs(id) ON DELETE CASCADE,
  employee_id text,
  employee_name text,
  from_assignment_id text,
  to_assignment_id text,
  from_label text,
  to_label text,
  move_type text NOT NULL DEFAULT 'manual_drag',
  status text NOT NULL DEFAULT 'staged',
  conflict_level text NOT NULL DEFAULT 'none',
  impact_summary text,
  override_reason text,
  created_by text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_draft_publish_checks (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  draft_run_id text NOT NULL REFERENCES schedule_draft_runs(id) ON DELETE CASCADE,
  check_key text NOT NULL,
  label text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  detail text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_draft_audit_events (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  draft_run_id text NOT NULL REFERENCES schedule_draft_runs(id) ON DELETE CASCADE,
  move_id text,
  event_type text NOT NULL,
  event_summary text NOT NULL,
  actor_id text,
  actor_name text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_schedule_draft_runs_agency_status ON schedule_draft_runs (agency_id, status);
CREATE INDEX IF NOT EXISTS idx_schedule_draft_moves_draft_status ON schedule_draft_assignment_moves (draft_run_id, status);
CREATE INDEX IF NOT EXISTS idx_schedule_draft_checks_draft_status ON schedule_draft_publish_checks (draft_run_id, status);
CREATE INDEX IF NOT EXISTS idx_schedule_draft_audit_draft ON schedule_draft_audit_events (draft_run_id, created_at);

INSERT INTO schema_migrations (version, name)
VALUES ('038', 'drag_drop_draft_planning')
ON CONFLICT (version) DO NOTHING;
