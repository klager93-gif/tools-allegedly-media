-- Signal Schedule v2.23.0 OT Volunteer Board Foundation
-- Purpose: model overtime opportunities, volunteer interest, eligibility preview, and award queue records without enabling production award writes.

CREATE TABLE IF NOT EXISTS schedule_ot_opportunities (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  open_shift_id text,
  assignment_id text,
  coverage_spot_id text,
  work_date date NOT NULL,
  shift_name text NOT NULL,
  role_key text NOT NULL,
  spot_label text,
  reason text,
  slots integer NOT NULL DEFAULT 1,
  hours numeric(8,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'posted',
  priority text NOT NULL DEFAULT 'normal',
  award_rule text NOT NULL DEFAULT 'admin_review',
  coverage_impact text,
  posted_by text,
  posted_at timestamptz NOT NULL DEFAULT now(),
  closes_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_ot_volunteers (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  opportunity_id text NOT NULL REFERENCES schedule_ot_opportunities(id) ON DELETE CASCADE,
  employee_id text NOT NULL,
  employee_name text,
  status text NOT NULL DEFAULT 'volunteered',
  seniority_rank integer,
  ot_hours_ytd numeric(8,2) NOT NULL DEFAULT 0,
  fatigue_status text NOT NULL DEFAULT 'pending',
  eligibility_status text NOT NULL DEFAULT 'pending',
  award_recommendation text,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  withdrawn_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_ot_award_queue (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  opportunity_id text NOT NULL REFERENCES schedule_ot_opportunities(id) ON DELETE CASCADE,
  recommended_volunteer_id text,
  next_action text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  reviewed_by text,
  reviewed_at timestamptz,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_schedule_ot_opportunities_agency_status ON schedule_ot_opportunities (agency_id, status);
CREATE INDEX IF NOT EXISTS idx_schedule_ot_opportunities_date_role ON schedule_ot_opportunities (work_date, role_key);
CREATE INDEX IF NOT EXISTS idx_schedule_ot_volunteers_opportunity ON schedule_ot_volunteers (opportunity_id, status);
CREATE INDEX IF NOT EXISTS idx_schedule_ot_award_queue_status ON schedule_ot_award_queue (agency_id, status);

INSERT INTO schema_migrations (version, name)
VALUES ('029', 'ot_volunteer_board_foundation')
ON CONFLICT (version) DO NOTHING;
