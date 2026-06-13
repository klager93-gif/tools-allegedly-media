-- Signal Labs
-- Area: Signal Schedule
-- File: schedule/api/coolify/sql/019_employee_profile_self_service_schema.sql
-- Version: v2.14.0
-- Purpose: Employee Profile & Self-Service Settings foundation

CREATE TABLE IF NOT EXISTS employee_profile_field_policies (
    id TEXT PRIMARY KEY,
    agency_id TEXT NOT NULL,
    field_key TEXT NOT NULL,
    field_label TEXT NOT NULL,
    employee_can_view BOOLEAN NOT NULL DEFAULT TRUE,
    employee_can_edit BOOLEAN NOT NULL DEFAULT FALSE,
    employee_can_delete BOOLEAN NOT NULL DEFAULT FALSE,
    requires_admin_approval BOOLEAN NOT NULL DEFAULT FALSE,
    is_required BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS employee_contact_methods (
    id TEXT PRIMARY KEY,
    employee_id TEXT NOT NULL,
    contact_type TEXT NOT NULL,
    contact_value TEXT,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    is_work_managed BOOLEAN NOT NULL DEFAULT FALSE,
    verified_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS employee_notification_preferences (
    id TEXT PRIMARY KEY,
    employee_id TEXT NOT NULL,
    channel TEXT NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT FALSE,
    employee_can_change BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS employee_profile_change_requests (
    id TEXT PRIMARY KEY,
    employee_id TEXT NOT NULL,
    field_key TEXT NOT NULL,
    old_value TEXT,
    requested_value TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    requested_by_employee_id TEXT,
    reviewed_by_employee_id TEXT NULL,
    review_note TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP NULL
);

INSERT INTO schema_migrations (version, name)
VALUES ('019', 'employee_profile_self_service')
ON CONFLICT (version) DO NOTHING;
