-- Signal Schedule v2.9.0 — Qualification & Eligibility Engine
-- Foundation schema for optional shift requirements and employee eligibility decisions.

create table if not exists schedule_shift_requirements (
  id text primary key,
  agency_id text not null,
  applies_to text not null,
  target_id text,
  label text not null,
  required_credential text not null,
  default_impact text not null default 'warn',
  allow_admin_override boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists schedule_eligibility_audit (
  id text primary key,
  agency_id text not null,
  employee_id text not null,
  shift_requirement_id text,
  source_area text not null,
  result text not null,
  reason text not null,
  override_used boolean not null default false,
  override_reason text,
  checked_at timestamptz not null default now()
);

INSERT INTO schema_migrations (version, name)
VALUES ('015', 'shift_eligibility_foundation')
ON CONFLICT (version) DO NOTHING;
