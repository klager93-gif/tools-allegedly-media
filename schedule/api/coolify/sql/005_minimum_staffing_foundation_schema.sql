-- Signal Schedule v2.0.0 Minimum Staffing Foundation
-- Future Postgres schema planning only. Not automatically applied by the static frontend.

CREATE TABLE IF NOT EXISTS minimum_staffing_templates (
  id TEXT PRIMARY KEY,
  agency_id TEXT NOT NULL,
  assignment_template_id TEXT,
  assignment_name TEXT NOT NULL,
  assignment_type TEXT,
  role TEXT NOT NULL,
  shift_group TEXT,
  shift_name TEXT,
  days_of_week JSONB NOT NULL DEFAULT '[]'::jsonb,
  minimum_required INTEGER NOT NULL DEFAULT 0,
  target_staffing INTEGER NOT NULL DEFAULT 0,
  location TEXT,
  effective_date DATE,
  status TEXT NOT NULL DEFAULT 'active',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_minimum_staffing_agency ON minimum_staffing_templates (agency_id);
CREATE INDEX IF NOT EXISTS idx_minimum_staffing_assignment_role ON minimum_staffing_templates (assignment_name, role);

INSERT INTO schema_migrations (version, name)
VALUES ('005', 'minimum_staffing_foundation')
ON CONFLICT (version) DO NOTHING;
