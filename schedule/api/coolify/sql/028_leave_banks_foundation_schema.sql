-- Signal Schedule v2.22.0 Leave Banks Foundation
-- Purpose: model employee leave bank balances, bank types, pending impacts, and adjustment audit entries.

CREATE TABLE IF NOT EXISTS schedule_leave_bank_types (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  name text NOT NULL,
  code text NOT NULL,
  unit text NOT NULL DEFAULT 'hours',
  accrual_policy text NOT NULL DEFAULT 'manual',
  negative_balance_policy text NOT NULL DEFAULT 'flag',
  active boolean NOT NULL DEFAULT true,
  config jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_leave_bank_balances (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  employee_id text NOT NULL,
  bank_type_id text NOT NULL,
  earned_hours numeric(10,2) NOT NULL DEFAULT 0,
  used_hours numeric(10,2) NOT NULL DEFAULT 0,
  pending_hours numeric(10,2) NOT NULL DEFAULT 0,
  adjusted_hours numeric(10,2) NOT NULL DEFAULT 0,
  remaining_hours numeric(10,2) GENERATED ALWAYS AS (earned_hours + adjusted_hours - used_hours - pending_hours) STORED,
  as_of_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_leave_bank_ledger_entries (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  employee_id text NOT NULL,
  bank_type_id text NOT NULL,
  related_request_id text,
  entry_type text NOT NULL,
  hours_delta numeric(10,2) NOT NULL,
  reason text NOT NULL,
  entered_by text,
  effective_date date,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_leave_bank_pending_impacts (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  employee_id text NOT NULL,
  bank_type_id text NOT NULL,
  related_request_id text,
  requested_hours numeric(10,2) NOT NULL DEFAULT 0,
  balance_before numeric(10,2) NOT NULL DEFAULT 0,
  balance_after numeric(10,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_schedule_leave_bank_types_agency ON schedule_leave_bank_types (agency_id, active);
CREATE INDEX IF NOT EXISTS idx_schedule_leave_bank_balances_employee ON schedule_leave_bank_balances (agency_id, employee_id);
CREATE INDEX IF NOT EXISTS idx_schedule_leave_bank_ledger_employee ON schedule_leave_bank_ledger_entries (agency_id, employee_id, created_at);
CREATE INDEX IF NOT EXISTS idx_schedule_leave_bank_impacts_request ON schedule_leave_bank_pending_impacts (agency_id, related_request_id);

INSERT INTO schema_migrations (version, name)
VALUES ('028', 'leave_banks_foundation')
ON CONFLICT (version) DO NOTHING;
