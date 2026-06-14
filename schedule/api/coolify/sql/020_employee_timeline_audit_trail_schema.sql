-- Signal Labs
-- Area: Signal Schedule
-- File: schedule/api/coolify/sql/020_employee_timeline_audit_trail_schema.sql
-- Version: v2.14.0
-- Purpose: Employee Timeline & Audit Trail foundation

CREATE TABLE IF NOT EXISTS employee_timeline_events (
    id TEXT PRIMARY KEY,
    agency_id TEXT NOT NULL,
    employee_id TEXT NOT NULL,
    event_category TEXT NOT NULL,
    event_type TEXT NOT NULL,
    event_title TEXT NOT NULL,
    event_description TEXT,
    performed_by_employee_id TEXT NULL,
    performed_by_role TEXT,
    old_value TEXT NULL,
    new_value TEXT NULL,
    reason TEXT NULL,
    source_module TEXT,
    visibility_scope TEXT NOT NULL DEFAULT 'admin_supervisor',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS employee_timeline_visibility_rules (
    id TEXT PRIMARY KEY,
    agency_id TEXT NOT NULL,
    role_key TEXT NOT NULL,
    can_view_own BOOLEAN NOT NULL DEFAULT FALSE,
    can_view_supervised BOOLEAN NOT NULL DEFAULT FALSE,
    can_view_all BOOLEAN NOT NULL DEFAULT FALSE,
    allowed_categories JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_employee_timeline_events_employee_id
ON employee_timeline_events (employee_id);

CREATE INDEX IF NOT EXISTS idx_employee_timeline_events_category
ON employee_timeline_events (event_category);

INSERT INTO schema_migrations (version, name)
VALUES ('020', 'employee_timeline_audit_trail')
ON CONFLICT (version) DO NOTHING;
