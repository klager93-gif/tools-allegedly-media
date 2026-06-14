-- Signal Schedule v5.1.0
-- Request & Approval Engine foundation.
-- Adds unified request case, decision, event, comment, and schedule-impact tables.

create table if not exists schedule_request_cases (
  id text primary key,
  agency_id text not null,
  employee_id text,
  request_type text not null,
  status text not null default 'draft',
  title text not null,
  reason text,
  request_start_at timestamptz,
  request_end_at timestamptz,
  requested_hours numeric(8,2),
  payload jsonb not null default '{}'::jsonb,
  policy_summary jsonb not null default '{}'::jsonb,
  coverage_summary jsonb not null default '{}'::jsonb,
  current_step text,
  submitted_by text,
  submitted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_schedule_request_cases_agency_status
  on schedule_request_cases (agency_id, status);

create index if not exists idx_schedule_request_cases_employee
  on schedule_request_cases (employee_id);

create index if not exists idx_schedule_request_cases_type
  on schedule_request_cases (request_type);

create index if not exists idx_schedule_request_cases_range
  on schedule_request_cases (request_start_at, request_end_at);

create table if not exists schedule_request_decisions (
  id text primary key,
  request_case_id text not null,
  agency_id text not null,
  decision text not null,
  decision_step text,
  decided_by text,
  decided_at timestamptz not null default now(),
  reason text,
  payload jsonb not null default '{}'::jsonb
);

create index if not exists idx_schedule_request_decisions_case
  on schedule_request_decisions (request_case_id);

create index if not exists idx_schedule_request_decisions_agency
  on schedule_request_decisions (agency_id);

create table if not exists schedule_request_events (
  id text primary key,
  request_case_id text not null,
  agency_id text not null,
  event_type text not null,
  actor_id text,
  event_at timestamptz not null default now(),
  summary text,
  payload jsonb not null default '{}'::jsonb
);

create index if not exists idx_schedule_request_events_case
  on schedule_request_events (request_case_id);

create index if not exists idx_schedule_request_events_agency_time
  on schedule_request_events (agency_id, event_at);

create table if not exists schedule_request_comments (
  id text primary key,
  request_case_id text not null,
  agency_id text not null,
  author_id text,
  visibility text not null default 'internal',
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_schedule_request_comments_case
  on schedule_request_comments (request_case_id);

create table if not exists schedule_request_schedule_impacts (
  id text primary key,
  request_case_id text not null,
  agency_id text not null,
  impact_type text not null,
  schedule_date date,
  employee_id text,
  role text,
  hours numeric(8,2),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_schedule_request_schedule_impacts_case
  on schedule_request_schedule_impacts (request_case_id);

create index if not exists idx_schedule_request_schedule_impacts_date
  on schedule_request_schedule_impacts (agency_id, schedule_date);

comment on table schedule_request_cases is 'Unified request case foundation for v5.1.0 request and approval workflows.';
comment on table schedule_request_decisions is 'Approval, denial, cancellation, and routing decisions for request cases.';
comment on table schedule_request_events is 'Audit trail events for request case lifecycle changes.';
comment on table schedule_request_comments is 'Internal and employee-visible comments attached to request cases.';
comment on table schedule_request_schedule_impacts is 'Projected or applied schedule impacts created by approved requests.';
