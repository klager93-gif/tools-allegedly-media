-- Signal Schedule v4.6.0
-- Saved schedule CRUD foundation.
-- Creates a protected Postgres-backed store for builder/planning schedule payloads.

create table if not exists schedule_saved_schedules (
  id text primary key,
  agency_id text not null,
  name text not null,
  status text not null default 'draft',
  schedule_start_date date not null,
  schedule_end_date date not null,
  source text not null default 'builder',
  payload jsonb not null default '{}'::jsonb,
  validation_summary jsonb not null default '{}'::jsonb,
  created_by text,
  updated_by text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_schedule_saved_schedules_agency_id
  on schedule_saved_schedules (agency_id);

create index if not exists idx_schedule_saved_schedules_status
  on schedule_saved_schedules (status);

create index if not exists idx_schedule_saved_schedules_range
  on schedule_saved_schedules (schedule_start_date, schedule_end_date);

comment on table schedule_saved_schedules is 'Protected saved schedule/draft schedule payloads for v4.6.0 database-backed save-load foundation.';
