-- Signal Schedule v4.6.0 Schedule Planning & Forecast Horizon
-- Purpose: model forecast runs, forecast issues, recommended actions, and heatmap rollups without enabling publish writes.

CREATE TABLE IF NOT EXISTS schedule_forecast_runs (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  name text NOT NULL,
  range_start date NOT NULL,
  range_end date NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  source_profile text NOT NULL DEFAULT 'pattern_projection',
  owner_role text,
  created_by text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_forecast_issues (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  forecast_run_id text REFERENCES schedule_forecast_runs(id) ON DELETE CASCADE,
  issue_date date NOT NULL,
  window_start time,
  window_end time,
  issue_type text NOT NULL,
  severity text NOT NULL DEFAULT 'watch',
  related_module text,
  related_record_id text,
  detail text,
  recommendation text,
  status text NOT NULL DEFAULT 'open',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_forecast_actions (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  forecast_run_id text REFERENCES schedule_forecast_runs(id) ON DELETE CASCADE,
  action_type text NOT NULL,
  action_status text NOT NULL DEFAULT 'recommended',
  target_module text,
  target_date date,
  target_window_start time,
  target_window_end time,
  detail text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_forecast_heatmap_rollups (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  forecast_run_id text REFERENCES schedule_forecast_runs(id) ON DELETE CASCADE,
  rollup_start date NOT NULL,
  rollup_end date NOT NULL,
  risk_level text NOT NULL DEFAULT 'low',
  open_spots integer NOT NULL DEFAULT 0,
  conflict_count integer NOT NULL DEFAULT 0,
  recommended_ot_posts integer NOT NULL DEFAULT 0,
  likely_mandates integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_schedule_forecast_runs_agency_range ON schedule_forecast_runs (agency_id, range_start, range_end);
CREATE INDEX IF NOT EXISTS idx_schedule_forecast_issues_run_severity ON schedule_forecast_issues (forecast_run_id, severity);
CREATE INDEX IF NOT EXISTS idx_schedule_forecast_actions_run_status ON schedule_forecast_actions (forecast_run_id, action_status);
CREATE INDEX IF NOT EXISTS idx_schedule_forecast_heatmap_run ON schedule_forecast_heatmap_rollups (forecast_run_id, rollup_start);

INSERT INTO schema_migrations (version, name)
VALUES ('039', 'schedule_planning_forecast_horizon')
ON CONFLICT (version) DO NOTHING;
