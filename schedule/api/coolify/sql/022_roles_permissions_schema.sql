-- Signal Schedule v2.16.0
-- Migration: 022_roles_permissions
-- Purpose: Roles and permissions engine foundation.

CREATE TABLE IF NOT EXISTS roles (
    id TEXT PRIMARY KEY,
    agency_id TEXT NOT NULL DEFAULT 'default',
    name TEXT NOT NULL,
    description TEXT,
    is_system_role BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS role_permissions (
    id TEXT PRIMARY KEY,
    agency_id TEXT NOT NULL DEFAULT 'default',
    role_id TEXT NOT NULL,
    permission_area TEXT NOT NULL,
    permission_action TEXT NOT NULL CHECK (permission_action IN ('view','create','edit','approve','deny','delete','override','export')),
    permission_scope TEXT NOT NULL DEFAULT 'own' CHECK (permission_scope IN ('own','supervised','group','department','agency')),
    is_allowed BOOLEAN NOT NULL DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_role_assignments (
    id TEXT PRIMARY KEY,
    agency_id TEXT NOT NULL DEFAULT 'default',
    employee_id TEXT NOT NULL,
    role_id TEXT NOT NULL,
    scope_type TEXT DEFAULT 'agency',
    scope_value TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS field_permission_rules (
    id TEXT PRIMARY KEY,
    agency_id TEXT NOT NULL DEFAULT 'default',
    field_key TEXT NOT NULL,
    role_id TEXT,
    can_view BOOLEAN NOT NULL DEFAULT TRUE,
    can_edit BOOLEAN NOT NULL DEFAULT FALSE,
    can_delete BOOLEAN NOT NULL DEFAULT FALSE,
    requires_approval BOOLEAN NOT NULL DEFAULT FALSE,
    is_required BOOLEAN NOT NULL DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS permission_audit_events (
    id TEXT PRIMARY KEY,
    agency_id TEXT NOT NULL DEFAULT 'default',
    affected_role_id TEXT,
    affected_employee_id TEXT,
    event_type TEXT NOT NULL,
    summary TEXT NOT NULL,
    old_value JSONB,
    new_value JSONB,
    performed_by_user_id TEXT,
    reason TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO schema_migrations (version, name)
VALUES ('022', 'roles_permissions')
ON CONFLICT DO NOTHING;
