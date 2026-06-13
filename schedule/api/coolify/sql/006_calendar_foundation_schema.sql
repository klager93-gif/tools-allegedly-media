-- Signal Schedule v2.1.0 Calendar Foundation future schema
-- Planning schema only. Not automatically applied by the JSON preview build.

CREATE TABLE IF NOT EXISTS schedule_calendar_entries (
  id TEXT PRIMARY KEY,
  agency_id TEXT NOT NULL,
  calendar_date DATE NOT NULL,
  shift_id TEXT,
  assignment_id TEXT,
  role TEXT NOT NULL,
  minimum_required INTEGER NOT NULL DEFAULT 0,
  coverage_status TEXT NOT NULL DEFAULT 'unassigned',
  notes JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_calendar_entry_employees (
  calendar_entry_id TEXT NOT NULL REFERENCES schedule_calendar_entries(id),
  employee_id TEXT NOT NULL,
  assignment_status TEXT NOT NULL DEFAULT 'scheduled',
  PRIMARY KEY (calendar_entry_id, employee_id)
);

CREATE TABLE IF NOT EXISTS schedule_calendar_events (
  id TEXT PRIMARY KEY,
  agency_id TEXT NOT NULL,
  calendar_date DATE NOT NULL,
  event_type TEXT NOT NULL,
  employee_id TEXT,
  assignment_id TEXT,
  status TEXT NOT NULL DEFAULT 'planned',
  impact TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO schema_migrations (version, name)
VALUES ('006', 'calendar_foundation')
ON CONFLICT (version) DO NOTHING;
