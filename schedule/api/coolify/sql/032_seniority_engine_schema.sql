-- Signal Schedule v2.26.0 Seniority Engine
-- Purpose: model agency-configurable seniority lists, ranks, scenarios, overrides, and audit records.

CREATE TABLE IF NOT EXISTS schedule_seniority_lists (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  name text NOT NULL,
  rank_type text NOT NULL,
  effective_date date NOT NULL,
  status text NOT NULL DEFAULT 'active',
  frozen boolean NOT NULL DEFAULT false,
  policy jsonb NOT NULL DEFAULT '{}'::jsonb,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_seniority_entries (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  list_id text NOT NULL,
  employee_id text NOT NULL,
  rank_number integer NOT NULL,
  rank_type text NOT NULL,
  seniority_date date,
  tie_breaker_values jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'active',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_seniority_scenarios (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  name text NOT NULL,
  scenario_key text NOT NULL,
  rank_type text NOT NULL,
  direction text NOT NULL DEFAULT 'highest_seniority_first',
  tie_breakers jsonb NOT NULL DEFAULT '[]'::jsonb,
  employee_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_seniority_overrides (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  employee_id text NOT NULL,
  scenario_key text NOT NULL,
  override_type text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  reason text NOT NULL,
  employee_visible boolean NOT NULL DEFAULT false,
  approved_by text,
  approved_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_seniority_audit (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  employee_id text,
  list_id text,
  scenario_key text,
  action text NOT NULL,
  actor_id text,
  reason text,
  before_state jsonb NOT NULL DEFAULT '{}'::jsonb,
  after_state jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_schedule_seniority_lists_agency_type ON schedule_seniority_lists (agency_id, rank_type);
CREATE INDEX IF NOT EXISTS idx_schedule_seniority_entries_list_rank ON schedule_seniority_entries (list_id, rank_number);
CREATE INDEX IF NOT EXISTS idx_schedule_seniority_entries_employee ON schedule_seniority_entries (employee_id);
CREATE INDEX IF NOT EXISTS idx_schedule_seniority_scenarios_key ON schedule_seniority_scenarios (agency_id, scenario_key);
CREATE INDEX IF NOT EXISTS idx_schedule_seniority_overrides_employee_scope ON schedule_seniority_overrides (employee_id, scenario_key, status);
CREATE INDEX IF NOT EXISTS idx_schedule_seniority_audit_agency_created ON schedule_seniority_audit (agency_id, created_at DESC);

INSERT INTO schema_migrations (version, name)
VALUES ('032', 'seniority_engine')
ON CONFLICT (version) DO NOTHING;
