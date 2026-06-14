-- Signal Schedule v2.6.0 — Seniority & Rotation Engine Foundation
-- Preview schema for future Postgres-backed seniority, callback, equalization, mandate, and skip reason records.

create table if not exists schedule_seniority_lists (
  id text primary key,
  agency_id text not null,
  employee_id text not null,
  list_type text not null,
  seniority_date date,
  rank integer,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists schedule_rotation_events (
  id text primary key,
  agency_id text not null,
  employee_id text not null,
  event_type text not null,
  opportunity_id text,
  offered_at timestamptz,
  response_status text,
  skip_reason text,
  override_reason text,
  equalized_hours numeric(8,2) default 0,
  created_at timestamptz not null default now()
);

INSERT INTO schema_migrations (version, name)
VALUES ('012', 'seniority_rotation_foundation')
ON CONFLICT (version) DO NOTHING;
