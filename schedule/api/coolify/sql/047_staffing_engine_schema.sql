-- Signal Schedule v5.1.0
-- Staffing Engine foundation.
-- Adds persistent tables for coverage vacancies, staffing candidates, assignment explanations, fairness metrics, and integrity audit runs.

create table if not exists schedule_staffing_vacancies (
  id text primary key,
  agency_id text not null,
  schedule_date date not null,
  shift_start_at timestamptz,
  shift_end_at timestamptz,
  role text not null,
  qualification_required text,
  status text not null default 'open',
  source text not null default 'coverage',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_schedule_staffing_vacancies_agency_status
  on schedule_staffing_vacancies (agency_id, status);

create index if not exists idx_schedule_staffing_vacancies_date
  on schedule_staffing_vacancies (agency_id, schedule_date);

create table if not exists schedule_staffing_candidates (
  id text primary key,
  agency_id text not null,
  vacancy_id text,
  employee_id text,
  candidate_type text not null default 'assignment',
  qualified boolean not null default false,
  available boolean not null default false,
  fairness_summary jsonb not null default '{}'::jsonb,
  explanation text,
  rank_score numeric(10,2),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_schedule_staffing_candidates_vacancy
  on schedule_staffing_candidates (vacancy_id);

create index if not exists idx_schedule_staffing_candidates_employee
  on schedule_staffing_candidates (employee_id);

create table if not exists schedule_staffing_explanations (
  id text primary key,
  agency_id text not null,
  subject_type text not null,
  subject_id text not null,
  question text not null,
  answer text not null,
  factors jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_schedule_staffing_explanations_subject
  on schedule_staffing_explanations (subject_type, subject_id);

create table if not exists schedule_staffing_fairness_metrics (
  id text primary key,
  agency_id text not null,
  employee_id text not null,
  metric_type text not null,
  metric_period_start date,
  metric_period_end date,
  value numeric(10,2) not null default 0,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists idx_schedule_staffing_fairness_employee
  on schedule_staffing_fairness_metrics (agency_id, employee_id, metric_type);

create table if not exists schedule_integrity_audit_runs (
  id text primary key,
  agency_id text not null,
  status text not null default 'completed',
  started_by text,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  summary jsonb not null default '{}'::jsonb,
  findings jsonb not null default '[]'::jsonb
);

create index if not exists idx_schedule_integrity_audit_runs_agency_time
  on schedule_integrity_audit_runs (agency_id, started_at);

comment on table schedule_staffing_vacancies is 'Open staffing slots, vacancies, short-staffing warnings, and coverage gaps for v5.1.0 Staffing Engine.';
comment on table schedule_staffing_candidates is 'Candidate recommendations for assignment, overtime, callback, and mandation workflows.';
comment on table schedule_staffing_explanations is 'Explainability records answering why a staffing recommendation or decision was made.';
comment on table schedule_staffing_fairness_metrics is 'Fairness counters for overtime, callbacks, mandates, and voluntary participation.';
comment on table schedule_integrity_audit_runs is 'Run Audit history for schedule integrity and coverage validation checks.';
