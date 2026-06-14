-- Signal Schedule v2.3.0 Open Shifts / VOT Foundation planning schema
-- Planning only. Do not run against production without review.

CREATE TABLE IF NOT EXISTS open_shifts (
  id TEXT PRIMARY KEY,
  assignment_id TEXT,
  role_name TEXT,
  shift_name TEXT,
  shift_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  hours NUMERIC(6,2) NOT NULL,
  minimum_required INTEGER,
  current_assigned INTEGER,
  needed_count INTEGER,
  priority TEXT,
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS vot_requests (
  id TEXT PRIMARY KEY,
  open_shift_id TEXT REFERENCES open_shifts(id),
  employee_id TEXT,
  request_mode TEXT,
  start_time TIME,
  end_time TIME,
  calculated_hours NUMERIC(6,2),
  reason_option_id TEXT,
  custom_reason TEXT,
  contact_preference TEXT,
  status TEXT DEFAULT 'submitted',
  admin_override BOOLEAN DEFAULT false,
  override_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS request_reason_options (
  id TEXT PRIMARY KEY,
  request_type TEXT NOT NULL,
  label TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  employee_visible BOOLEAN DEFAULT true,
  admin_only BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 100,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO schema_migrations (version, name)
VALUES ('010', 'open_shifts_foundation')
ON CONFLICT (version) DO NOTHING;
