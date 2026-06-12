-- Signal Schedule v1.9.0 Assignments Foundation
-- Future Postgres schema for assignment templates and employee assignment records.

create table if not exists assignment_templates (
  id text primary key,
  agency_id text not null,
  name text not null,
  assignment_type text not null,
  department text,
  division text,
  location text,
  minimum_staffing_role text,
  default_shift_group text,
  required_qualifications jsonb not null default '[]'::jsonb,
  coverage_role text,
  status text not null default 'active',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists employee_assignments (
  id text primary key,
  agency_id text not null,
  employee_id text not null,
  assignment_template_id text references assignment_templates(id),
  assignment_name text not null,
  assignment_type text not null,
  shift_group text,
  assigned_pattern text,
  effective_date date not null,
  end_date date,
  status text not null default 'active',
  is_primary boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_assignment_templates_agency_status on assignment_templates (agency_id, status);
create index if not exists idx_employee_assignments_agency_employee_status on employee_assignments (agency_id, employee_id, status);
create index if not exists idx_employee_assignments_effective_dates on employee_assignments (effective_date, end_date);
