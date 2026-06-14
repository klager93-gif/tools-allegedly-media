-- Signal Schedule v2.2.0 Leave Requests Foundation
-- Planning schema only. Do not run against production until auth, roles, and write workflows are active.

CREATE TABLE IF NOT EXISTS leave_request_types (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  paid BOOLEAN NOT NULL DEFAULT TRUE,
  requires_approval BOOLEAN NOT NULL DEFAULT TRUE,
  active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS leave_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id TEXT NOT NULL,
  leave_type_id TEXT NOT NULL REFERENCES leave_request_types(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  partial_day BOOLEAN NOT NULL DEFAULT FALSE,
  hours NUMERIC(6,2),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','denied','cancelled')),
  staffing_impact TEXT,
  notes TEXT,
  submitted_by_user_id UUID,
  reviewed_by_user_id UUID,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_leave_requests_employee_id ON leave_requests(employee_id);
CREATE INDEX IF NOT EXISTS idx_leave_requests_status ON leave_requests(status);
CREATE INDEX IF NOT EXISTS idx_leave_requests_date_range ON leave_requests(start_date, end_date);

INSERT INTO schema_migrations (version, name)
VALUES ('008', 'leave_requests_foundation')
ON CONFLICT (version) DO NOTHING;
