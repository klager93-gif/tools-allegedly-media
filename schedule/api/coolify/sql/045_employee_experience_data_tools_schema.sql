-- Signal Schedule v5.1.0
-- Employee Experience & Data Tools foundation.
-- Adds persistent tables for templates, import/export jobs, employee profile extras, and notification preferences.

create table if not exists schedule_templates (
  id text primary key,
  agency_id text not null,
  name text not null,
  template_type text not null default 'schedule',
  status text not null default 'active',
  description text,
  payload jsonb not null default '{}'::jsonb,
  created_by text,
  updated_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_schedule_templates_agency_id
  on schedule_templates (agency_id);

create index if not exists idx_schedule_templates_type_status
  on schedule_templates (template_type, status);

create table if not exists schedule_import_jobs (
  id text primary key,
  agency_id text not null,
  import_type text not null,
  status text not null default 'draft',
  filename text,
  summary jsonb not null default '{}'::jsonb,
  validation_errors jsonb not null default '[]'::jsonb,
  created_by text,
  reviewed_by text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  updated_at timestamptz not null default now()
);

create index if not exists idx_schedule_import_jobs_agency_status
  on schedule_import_jobs (agency_id, status);

create index if not exists idx_schedule_import_jobs_type
  on schedule_import_jobs (import_type);

create table if not exists schedule_export_jobs (
  id text primary key,
  agency_id text not null,
  export_type text not null,
  status text not null default 'requested',
  format text not null default 'xlsx',
  filters jsonb not null default '{}'::jsonb,
  created_by text,
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  updated_at timestamptz not null default now()
);

create index if not exists idx_schedule_export_jobs_agency_status
  on schedule_export_jobs (agency_id, status);

create table if not exists schedule_employee_profile_extras (
  employee_id text primary key,
  agency_id text not null,
  contact_info jsonb not null default '{}'::jsonb,
  emergency_contact jsonb not null default '{}'::jsonb,
  preferences jsonb not null default '{}'::jsonb,
  profile_visibility jsonb not null default '{}'::jsonb,
  updated_by text,
  updated_at timestamptz not null default now()
);

create index if not exists idx_schedule_employee_profile_extras_agency_id
  on schedule_employee_profile_extras (agency_id);

create table if not exists schedule_employee_notification_preferences (
  employee_id text primary key,
  agency_id text not null,
  email_enabled boolean not null default true,
  sms_enabled boolean not null default false,
  push_enabled boolean not null default false,
  preference_payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists idx_schedule_employee_notification_preferences_agency_id
  on schedule_employee_notification_preferences (agency_id);

comment on table schedule_templates is 'Reusable agency schedule, staffing, pattern, and import templates for v5.1.0.';
comment on table schedule_import_jobs is 'Import staging, validation, and review jobs for employee/data onboarding.';
comment on table schedule_export_jobs is 'Export job requests for schedule, employee, availability, and reporting data.';
comment on table schedule_employee_profile_extras is 'Employee self-service profile extras beyond core employee identity fields.';
comment on table schedule_employee_notification_preferences is 'Employee notification preferences for future email/SMS/push delivery.';
