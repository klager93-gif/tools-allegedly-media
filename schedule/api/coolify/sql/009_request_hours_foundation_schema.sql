-- Signal Schedule v2.2.1 Request Hours Foundation
-- Planning migration only. Do not apply to production until write workflows and auth are active.

CREATE TABLE IF NOT EXISTS request_type_settings (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  employee_minimum_increment_minutes INTEGER NOT NULL DEFAULT 30,
  admin_override_allowed BOOLEAN NOT NULL DEFAULT TRUE,
  full_day_uses_scheduled_shift_hours BOOLEAN NOT NULL DEFAULT TRUE,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE leave_requests
  ADD COLUMN IF NOT EXISTS full_day BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS start_time TIME,
  ADD COLUMN IF NOT EXISTS end_time TIME,
  ADD COLUMN IF NOT EXISTS calculated_hours NUMERIC(6,2),
  ADD COLUMN IF NOT EXISTS scheduled_shift_hours NUMERIC(6,2),
  ADD COLUMN IF NOT EXISTS minimum_increment_minutes INTEGER,
  ADD COLUMN IF NOT EXISTS increment_override_used BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS increment_override_by TEXT,
  ADD COLUMN IF NOT EXISTS increment_override_reason TEXT;

-- Future open_shift / VOT tables should reuse these same fields.

INSERT INTO schema_migrations (version, name)
VALUES ('009', 'request_hours_foundation')
ON CONFLICT (version) DO NOTHING;
