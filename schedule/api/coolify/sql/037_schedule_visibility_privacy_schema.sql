-- Signal Schedule v3.6.0 Schedule Visibility & Privacy Controls
-- Purpose: model role/group schedule visibility and leave type privacy policies.

CREATE TABLE IF NOT EXISTS schedule_visibility_policies (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  name text NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_visibility_groups (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  group_key text NOT NULL,
  label text NOT NULL,
  permission_level integer NOT NULL DEFAULT 0,
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_visibility_rules (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  policy_id text,
  viewer_group_key text NOT NULL,
  target_group_key text NOT NULL,
  visibility_mode text NOT NULL DEFAULT 'working_off_only',
  show_exact_times boolean NOT NULL DEFAULT false,
  show_hours boolean NOT NULL DEFAULT true,
  show_working_status boolean NOT NULL DEFAULT true,
  show_notes boolean NOT NULL DEFAULT false,
  allow_override boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_leave_visibility_rules (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  policy_id text,
  leave_type text NOT NULL,
  employee_visibility text NOT NULL DEFAULT 'off_only',
  supervisor_visibility text NOT NULL DEFAULT 'show_type',
  manager_visibility text NOT NULL DEFAULT 'show_type',
  admin_visibility text NOT NULL DEFAULT 'show_type',
  sensitive boolean NOT NULL DEFAULT false,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_visibility_audit_events (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  policy_id text,
  actor_id text,
  action text NOT NULL,
  target_type text NOT NULL,
  target_id text,
  old_value jsonb NOT NULL DEFAULT '{}'::jsonb,
  new_value jsonb NOT NULL DEFAULT '{}'::jsonb,
  reason text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_schedule_visibility_rules_agency_viewer ON schedule_visibility_rules (agency_id, viewer_group_key, target_group_key);
CREATE INDEX IF NOT EXISTS idx_schedule_leave_visibility_rules_agency_type ON schedule_leave_visibility_rules (agency_id, leave_type);
CREATE INDEX IF NOT EXISTS idx_schedule_visibility_audit_agency_policy ON schedule_visibility_audit_events (agency_id, policy_id, created_at DESC);

INSERT INTO schema_migrations (version, name)
VALUES ('037', 'schedule_visibility_privacy')
ON CONFLICT (version) DO NOTHING;
