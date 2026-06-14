-- Signal Schedule v2.20.0 Daily Schedule Board Foundation
-- Purpose: model daily board snapshots and assignment-ready board rows without enabling live scheduling writes.

CREATE TABLE IF NOT EXISTS schedule_daily_boards (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  board_date date NOT NULL,
  label text,
  status text NOT NULL DEFAULT 'preview',
  filters jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_daily_board_rows (
  id text PRIMARY KEY,
  board_id text NOT NULL,
  agency_id text NOT NULL DEFAULT 'default',
  shift_id text NOT NULL,
  shift_label text NOT NULL,
  shift_time text NOT NULL,
  role_key text NOT NULL,
  spot_code text NOT NULL,
  spot_label text,
  required_count integer NOT NULL DEFAULT 0,
  maximum_count integer NOT NULL DEFAULT 0,
  employee_id text,
  employee_display_name text,
  status text NOT NULL DEFAULT 'open',
  assignment_source text NOT NULL DEFAULT 'unassigned',
  related_module text,
  related_record_id text,
  notes text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_schedule_daily_boards_agency_date ON schedule_daily_boards (agency_id, board_date);
CREATE INDEX IF NOT EXISTS idx_schedule_daily_board_rows_board ON schedule_daily_board_rows (board_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_schedule_daily_board_rows_agency_shift_role ON schedule_daily_board_rows (agency_id, shift_id, role_key);
CREATE INDEX IF NOT EXISTS idx_schedule_daily_board_rows_employee ON schedule_daily_board_rows (employee_id);
CREATE INDEX IF NOT EXISTS idx_schedule_daily_board_rows_status ON schedule_daily_board_rows (agency_id, status);

INSERT INTO schema_migrations (version, name)
VALUES ('026', 'daily_schedule_board_foundation')
ON CONFLICT (version) DO NOTHING;
