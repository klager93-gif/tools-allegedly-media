-- Signal Schedule v2.29.0 Qualifications & Certification Engine
-- Purpose: model qualification definitions, employee credentials, license/certificate fields, expiration policy, and assignment/mandation integration points without enabling writes.

CREATE TABLE IF NOT EXISTS schedule_qualification_types (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  name text NOT NULL,
  category text,
  description text,
  license_number_requirement text NOT NULL DEFAULT 'optional',
  certificate_number_requirement text NOT NULL DEFAULT 'optional',
  expiration_required boolean NOT NULL DEFAULT false,
  default_warning_days integer NOT NULL DEFAULT 60,
  required_for_roles jsonb NOT NULL DEFAULT '[]'::jsonb,
  notes text,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_employee_credentials (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  employee_id text NOT NULL,
  qualification_type_id text REFERENCES schedule_qualification_types(id) ON DELETE SET NULL,
  qualification_name text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  issue_date date,
  expiration_date date,
  license_number text,
  certificate_number text,
  issuing_authority text,
  document_reference text,
  notes text,
  visibility_scope text NOT NULL DEFAULT 'employee',
  verified_by text,
  verified_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_role_qualification_requirements (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  role_key text NOT NULL,
  coverage_spot_type text,
  qualification_type_id text REFERENCES schedule_qualification_types(id) ON DELETE SET NULL,
  requirement_level text NOT NULL DEFAULT 'required',
  minimum_qualified_on_duty integer,
  override_allowed boolean NOT NULL DEFAULT true,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_credential_audit_log (
  id text PRIMARY KEY,
  agency_id text NOT NULL DEFAULT 'default',
  credential_id text REFERENCES schedule_employee_credentials(id) ON DELETE SET NULL,
  action text NOT NULL,
  old_value jsonb,
  new_value jsonb,
  reason text,
  changed_by text,
  changed_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_schedule_qualification_types_agency_status ON schedule_qualification_types (agency_id, status);
CREATE INDEX IF NOT EXISTS idx_schedule_employee_credentials_employee ON schedule_employee_credentials (employee_id, status);
CREATE INDEX IF NOT EXISTS idx_schedule_employee_credentials_expiration ON schedule_employee_credentials (agency_id, expiration_date);
CREATE INDEX IF NOT EXISTS idx_schedule_role_qualification_requirements_role ON schedule_role_qualification_requirements (agency_id, role_key);
CREATE INDEX IF NOT EXISTS idx_schedule_credential_audit_log_credential ON schedule_credential_audit_log (credential_id);

INSERT INTO schema_migrations (version, name)
VALUES ('035', 'qualifications_certifications')
ON CONFLICT (version) DO NOTHING;
