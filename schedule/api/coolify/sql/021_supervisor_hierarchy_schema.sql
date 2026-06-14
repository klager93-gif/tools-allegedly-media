-- Signal Schedule v2.15.0
-- Migration: 021_supervisor_hierarchy
-- Purpose: Supervisor and organizational hierarchy foundation.

CREATE TABLE IF NOT EXISTS supervisor_scope_assignments (
    id TEXT PRIMARY KEY,
    agency_id TEXT NOT NULL DEFAULT 'default',
    supervisor_employee_id TEXT NOT NULL,
    scope_type TEXT NOT NULL CHECK (scope_type IN ('employee','group','position','department','division','location')),
    scope_value TEXT NOT NULL,
    notes TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS supervisor_effective_employee_cache (
    id TEXT PRIMARY KEY,
    agency_id TEXT NOT NULL DEFAULT 'default',
    supervisor_employee_id TEXT NOT NULL,
    managed_employee_id TEXT NOT NULL,
    source_scope_type TEXT NOT NULL,
    source_scope_value TEXT NOT NULL,
    calculated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS supervisor_hierarchy_audit_events (
    id TEXT PRIMARY KEY,
    agency_id TEXT NOT NULL DEFAULT 'default',
    supervisor_employee_id TEXT,
    affected_employee_id TEXT,
    event_type TEXT NOT NULL,
    summary TEXT NOT NULL,
    performed_by_user_id TEXT,
    reason TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO schema_migrations (version, name)
VALUES ('021', 'supervisor_hierarchy')
ON CONFLICT DO NOTHING;
