-- Signal Schedule v2.17.0
-- Migration: 023_request_approval_workflow
-- Purpose: Request approval workflow foundation.

CREATE TABLE IF NOT EXISTS approval_workflows (
    id TEXT PRIMARY KEY,
    agency_id TEXT NOT NULL DEFAULT 'default',
    workflow_key TEXT NOT NULL,
    workflow_name TEXT NOT NULL,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS approval_workflow_steps (
    id TEXT PRIMARY KEY,
    agency_id TEXT NOT NULL DEFAULT 'default',
    workflow_id TEXT NOT NULL,
    step_order INTEGER NOT NULL,
    step_name TEXT NOT NULL,
    required_role_id TEXT,
    required_permission TEXT,
    allow_supervisor_scope BOOLEAN NOT NULL DEFAULT TRUE,
    allow_admin_override BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS approval_requests (
    id TEXT PRIMARY KEY,
    agency_id TEXT NOT NULL DEFAULT 'default',
    workflow_id TEXT NOT NULL,
    request_type TEXT NOT NULL,
    subject_employee_id TEXT,
    submitted_by_employee_id TEXT,
    current_step_id TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('draft','submitted','pending','approved','denied','cancelled','escalated','overridden')),
    summary TEXT,
    reason TEXT,
    payload JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS approval_decisions (
    id TEXT PRIMARY KEY,
    agency_id TEXT NOT NULL DEFAULT 'default',
    approval_request_id TEXT NOT NULL,
    step_id TEXT,
    decision TEXT NOT NULL CHECK (decision IN ('approved','denied','returned','escalated','overridden')),
    decided_by_employee_id TEXT,
    decision_reason TEXT,
    old_value JSONB,
    new_value JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO schema_migrations (version, name)
VALUES ('023', 'request_approval_workflow')
ON CONFLICT DO NOTHING;
