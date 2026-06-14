-- Signal Schedule v2.24.0 Shift Trades UI
-- Purpose: extend shift trade foundation with UI review, acceptance, supervisor decision, and assignment-engine hooks.

ALTER TABLE schedule_shift_trade_requests
  ADD COLUMN IF NOT EXISTS employee_acceptance_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS supervisor_decision_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS assignment_engine_hook_status text NOT NULL DEFAULT 'preview_only',
  ADD COLUMN IF NOT EXISTS decision_reason text,
  ADD COLUMN IF NOT EXISTS decided_by_employee_id text,
  ADD COLUMN IF NOT EXISTS decided_at timestamptz;

CREATE TABLE IF NOT EXISTS schedule_shift_trade_workflow_events (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  trade_request_id text NOT NULL,
  event_type text NOT NULL,
  actor_employee_id text,
  actor_role text,
  note text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_shift_trade_assignment_hooks (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  trade_request_id text NOT NULL,
  source_assignment_id text,
  target_assignment_id text,
  hook_status text NOT NULL DEFAULT 'preview_only',
  coverage_impact text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_schedule_shift_trade_requests_status ON schedule_shift_trade_requests (agency_id, status);
CREATE INDEX IF NOT EXISTS idx_schedule_shift_trade_workflow_trade ON schedule_shift_trade_workflow_events (trade_request_id, created_at);
CREATE INDEX IF NOT EXISTS idx_schedule_shift_trade_hooks_trade ON schedule_shift_trade_assignment_hooks (trade_request_id, hook_status);

INSERT INTO schema_migrations (version, name)
VALUES ('030', 'shift_trades_ui')
ON CONFLICT (version) DO NOTHING;
