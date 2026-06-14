-- Signal Schedule v2.11.0 — Calendar Shortcode Admin Controls foundation
-- Extends shortcode storage for admin display controls and audit-ready edits.

CREATE TABLE IF NOT EXISTS calendar_shortcode_categories (
  id TEXT PRIMARY KEY,
  agency_id TEXT NOT NULL,
  name TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 100,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (agency_id, name)
);

ALTER TABLE calendar_shortcodes
  ADD COLUMN IF NOT EXISTS full_text TEXT,
  ADD COLUMN IF NOT EXISTS calendar_visibility TEXT NOT NULL DEFAULT 'week_month_and_day',
  ADD COLUMN IF NOT EXISTS employee_visible BOOLEAN NOT NULL DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS sort_order INTEGER NOT NULL DEFAULT 100,
  ADD COLUMN IF NOT EXISTS color_label TEXT,
  ADD COLUMN IF NOT EXISTS updated_by TEXT,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

CREATE TABLE IF NOT EXISTS calendar_shortcode_audit_entries (
  id TEXT PRIMARY KEY,
  agency_id TEXT NOT NULL,
  shortcode_id TEXT,
  action TEXT NOT NULL,
  previous_value JSONB NOT NULL DEFAULT '{}'::jsonb,
  new_value JSONB NOT NULL DEFAULT '{}'::jsonb,
  reason TEXT,
  entered_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_calendar_shortcode_categories_agency ON calendar_shortcode_categories (agency_id, active);
CREATE INDEX IF NOT EXISTS idx_calendar_shortcodes_agency_active ON calendar_shortcodes (agency_id, active, sort_order);
CREATE INDEX IF NOT EXISTS idx_calendar_shortcode_audit_agency_created ON calendar_shortcode_audit_entries (agency_id, created_at DESC);

INSERT INTO schema_migrations (version, name)
VALUES ('017', 'calendar_shortcode_admin_controls')
ON CONFLICT (version) DO NOTHING;
