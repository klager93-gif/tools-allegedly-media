-- Signal Schedule v3.0.0 Weekly Schedule View
-- Purpose: model weekly schedule view runs, day summaries, and visible weekly assignment cells without enabling writes.

CREATE TABLE IF NOT EXISTS schedule_weekly_schedule_views (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  week_start date NOT NULL,
  week_end date NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  source_run_id text,
  summary jsonb NOT NULL DEFAULT '{}'::jsonb,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_weekly_schedule_days (
  id text PRIMARY KEY,
  weekly_view_id text REFERENCES schedule_weekly_schedule_views(id) ON DELETE CASCADE,
  agency_id text NOT NULL DEFAULT 'default',
  schedule_date date NOT NULL,
  day_label text,
  status text NOT NULL DEFAULT 'draft',
  assigned_count integer NOT NULL DEFAULT 0,
  open_spot_count integer NOT NULL DEFAULT 0,
  conflict_count integer NOT NULL DEFAULT 0,
  under_minimum_count integer NOT NULL DEFAULT 0,
  over_maximum_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_weekly_schedule_cells (
  id text PRIMARY KEY,
  weekly_day_id text REFERENCES schedule_weekly_schedule_days(id) ON DELETE CASCADE,
  agency_id text NOT NULL DEFAULT 'default',
  schedule_date date NOT NULL,
  shift_key text NOT NULL,
  shift_label text,
  role_key text,
  coverage_spot_id text,
  coverage_spot_code text,
  employee_id text,
  employee_display_name text,
  assignment_id text,
  source_module text,
  status text NOT NULL DEFAULT 'draft',
  conflict_ids jsonb NOT NULL DEFAULT '[]'::jsonb,
  badges jsonb NOT NULL DEFAULT '[]'::jsonb,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_schedule_weekly_schedule_views_week ON schedule_weekly_schedule_views (agency_id, week_start, week_end);
CREATE INDEX IF NOT EXISTS idx_schedule_weekly_schedule_days_date ON schedule_weekly_schedule_days (agency_id, schedule_date);
CREATE INDEX IF NOT EXISTS idx_schedule_weekly_schedule_cells_date_shift ON schedule_weekly_schedule_cells (agency_id, schedule_date, shift_key);
CREATE INDEX IF NOT EXISTS idx_schedule_weekly_schedule_cells_employee ON schedule_weekly_schedule_cells (employee_id, schedule_date);

INSERT INTO schema_migrations (version, name)
VALUES ('036', 'weekly_schedule_view')
ON CONFLICT (version) DO NOTHING;
