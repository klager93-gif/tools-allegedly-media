-- Signal Schedule v4.6.0
-- Migration 040: Beta publishing, availability, preferences, restrictions, and post/seat foundations.

CREATE TABLE IF NOT EXISTS schedule_published_versions (
  id text PRIMARY KEY,
  agency_id text NOT NULL,
  version_label text NOT NULL,
  schedule_start date NOT NULL,
  schedule_end date NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  visibility_profile text,
  published_by text,
  published_at timestamptz,
  rollback_source_version_id text REFERENCES schedule_published_versions(id),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_publication_snapshots (
  id text PRIMARY KEY,
  agency_id text NOT NULL,
  published_version_id text REFERENCES schedule_published_versions(id),
  snapshot_type text NOT NULL,
  source_module text NOT NULL,
  snapshot_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  record_count integer NOT NULL DEFAULT 0,
  created_by text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_publication_events (
  id text PRIMARY KEY,
  agency_id text NOT NULL,
  published_version_id text REFERENCES schedule_published_versions(id),
  event_type text NOT NULL,
  actor_id text,
  event_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_posts (
  id text PRIMARY KEY,
  agency_id text NOT NULL,
  post_code text NOT NULL,
  post_name text NOT NULL,
  post_type text NOT NULL DEFAULT 'coverage_spot',
  department text,
  division text,
  location text,
  active boolean NOT NULL DEFAULT true,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (agency_id, post_code)
);

CREATE TABLE IF NOT EXISTS schedule_post_requirements (
  id text PRIMARY KEY,
  agency_id text NOT NULL,
  post_id text NOT NULL REFERENCES schedule_posts(id),
  minimum_staffing_role text,
  required_qualifications jsonb NOT NULL DEFAULT '[]'::jsonb,
  gender_rule text,
  priority integer NOT NULL DEFAULT 100,
  effective_start date,
  effective_end date,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_post_assignments (
  id text PRIMARY KEY,
  agency_id text NOT NULL,
  post_id text NOT NULL REFERENCES schedule_posts(id),
  employee_id text NOT NULL,
  assignment_start timestamptz NOT NULL,
  assignment_end timestamptz NOT NULL,
  assignment_source text NOT NULL DEFAULT 'manual',
  status text NOT NULL DEFAULT 'draft',
  created_by text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_employee_preferences (
  id text PRIMARY KEY,
  agency_id text NOT NULL,
  employee_id text NOT NULL,
  preference_type text NOT NULL,
  preference_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  priority integer NOT NULL DEFAULT 100,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_employee_availability (
  id text PRIMARY KEY,
  agency_id text NOT NULL,
  employee_id text NOT NULL,
  availability_start timestamptz NOT NULL,
  availability_end timestamptz NOT NULL,
  availability_type text NOT NULL DEFAULT 'available',
  source text NOT NULL DEFAULT 'employee',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_employee_restrictions (
  id text PRIMARY KEY,
  agency_id text NOT NULL,
  employee_id text NOT NULL,
  restriction_type text NOT NULL,
  restriction_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  effective_start date,
  effective_end date,
  active boolean NOT NULL DEFAULT true,
  created_by text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_schedule_published_versions_agency_range ON schedule_published_versions (agency_id, schedule_start, schedule_end);
CREATE INDEX IF NOT EXISTS idx_schedule_publication_snapshots_version ON schedule_publication_snapshots (published_version_id);
CREATE INDEX IF NOT EXISTS idx_schedule_publication_events_version ON schedule_publication_events (published_version_id);
CREATE INDEX IF NOT EXISTS idx_schedule_posts_agency_active ON schedule_posts (agency_id, active);
CREATE INDEX IF NOT EXISTS idx_schedule_post_assignments_post_range ON schedule_post_assignments (post_id, assignment_start, assignment_end);
CREATE INDEX IF NOT EXISTS idx_schedule_employee_availability_employee_range ON schedule_employee_availability (employee_id, availability_start, availability_end);
CREATE INDEX IF NOT EXISTS idx_schedule_employee_preferences_employee ON schedule_employee_preferences (employee_id, active);
CREATE INDEX IF NOT EXISTS idx_schedule_employee_restrictions_employee ON schedule_employee_restrictions (employee_id, active);

INSERT INTO schema_migrations (version, name)
VALUES ('040', 'schedule_beta_publishing_foundation')
ON CONFLICT (version) DO NOTHING;
