-- Signal Schedule v1.7.0 Postgres Employee Read Schema
-- Read endpoint foundation only. No CRUD endpoints are added in this release.

create table if not exists employees (
  id text primary key,
  agency_id text not null,
  employee_code text not null,
  first_name text not null,
  middle_name text,
  last_name text not null,
  preferred_name text,
  display_name text not null,
  minimum_staffing_role text not null,
  position text not null,
  rank text,
  department text,
  division text,
  location text,
  shift_group text,
  assigned_pattern text,
  status text not null default 'active',
  gender text,
  overtime_eligible boolean not null default true,
  mandate_eligible boolean not null default true,
  qualifications jsonb not null default '[]'::jsonb,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint employees_status_check check (status in ('active', 'probationary', 'leave', 'inactive', 'retired', 'separated', 'deleted'))
);

create index if not exists idx_employees_agency_id on employees (agency_id);
create index if not exists idx_employees_status on employees (status);
create index if not exists idx_employees_min_staffing_role on employees (minimum_staffing_role);
create index if not exists idx_employees_shift_group on employees (shift_group);
