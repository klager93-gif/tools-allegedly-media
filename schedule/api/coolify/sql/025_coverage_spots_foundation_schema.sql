-- Signal Schedule v2.19.0 Coverage Spots Foundation
-- Purpose: model numbered staffing spots that can be assigned, opened, filled, traded, or escalated later.

CREATE TABLE IF NOT EXISTS schedule_coverage_spots (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  coverage_date date NOT NULL,
  shift_id text NOT NULL,
  shift_label text NOT NULL,
  start_time time,
  end_time time,
  role_key text NOT NULL,
  spot_code text NOT NULL,
  spot_label text,
  required_count integer NOT NULL DEFAULT 1,
  maximum_count integer,
  status text NOT NULL DEFAULT 'open',
  employee_id text,
  assignment_source text NOT NULL DEFAULT 'vacancy',
  related_record_id text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (agency_id, coverage_date, shift_id, role_key, spot_code)
);

CREATE INDEX IF NOT EXISTS idx_schedule_coverage_spots_agency_date ON schedule_coverage_spots (agency_id, coverage_date);
CREATE INDEX IF NOT EXISTS idx_schedule_coverage_spots_status ON schedule_coverage_spots (agency_id, status);
CREATE INDEX IF NOT EXISTS idx_schedule_coverage_spots_employee ON schedule_coverage_spots (employee_id);

INSERT INTO schema_migrations (version, name)
VALUES ('025', 'coverage_spots_foundation')
ON CONFLICT (version) DO NOTHING;
