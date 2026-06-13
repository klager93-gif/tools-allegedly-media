-- Signal Schedule v2.8.0
-- Training & Certifications foundation schema

CREATE TABLE IF NOT EXISTS schedule_training_certifications (
    id TEXT PRIMARY KEY,
    agency_id TEXT NOT NULL,
    employee_id TEXT,
    role_name TEXT NOT NULL,
    credential_name TEXT NOT NULL,
    status TEXT NOT NULL,
    expires_on DATE,
    schedule_impact TEXT NOT NULL,
    admin_action TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_schedule_training_certifications_agency
    ON schedule_training_certifications (agency_id);

CREATE INDEX IF NOT EXISTS idx_schedule_training_certifications_employee
    ON schedule_training_certifications (employee_id);

CREATE INDEX IF NOT EXISTS idx_schedule_training_certifications_expires
    ON schedule_training_certifications (expires_on);

INSERT INTO schema_migrations (version, name)
VALUES ('014', 'training_certifications_foundation')
ON CONFLICT (version) DO NOTHING;
