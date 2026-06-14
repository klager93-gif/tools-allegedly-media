-- Signal Schedule v2.18.0 Notification Foundation
-- Purpose: model notification channels, rules, preferences, and queue records without enabling external sends.

CREATE TABLE IF NOT EXISTS schedule_notification_channels (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  name text NOT NULL,
  channel_type text NOT NULL,
  status text NOT NULL DEFAULT 'planned',
  provider_key text,
  config jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_notification_rules (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  trigger_key text NOT NULL,
  source_module text NOT NULL,
  recipient_scope text NOT NULL,
  priority text NOT NULL DEFAULT 'normal',
  quiet_hours_policy text NOT NULL DEFAULT 'digest',
  enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_notification_preferences (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  role_key text NOT NULL,
  employee_id text,
  defaults jsonb NOT NULL DEFAULT '{}'::jsonb,
  can_override boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_notification_queue (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  rule_id text,
  recipient_scope text NOT NULL,
  channel_type text NOT NULL,
  title text NOT NULL,
  body text,
  status text NOT NULL DEFAULT 'queued',
  priority text NOT NULL DEFAULT 'normal',
  related_module text,
  related_record_id text,
  scheduled_for timestamptz,
  sent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_schedule_notification_rules_agency_trigger ON schedule_notification_rules (agency_id, trigger_key);
CREATE INDEX IF NOT EXISTS idx_schedule_notification_queue_agency_status ON schedule_notification_queue (agency_id, status);
CREATE INDEX IF NOT EXISTS idx_schedule_notification_queue_related ON schedule_notification_queue (related_module, related_record_id);

INSERT INTO schema_migrations (version, name)
VALUES ('024', 'notification foundation schema')
ON CONFLICT (version) DO NOTHING;
