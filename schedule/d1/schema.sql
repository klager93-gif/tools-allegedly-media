-- Signal Schedule v1.3.0 — D1 Database Foundation
-- Purpose: first read-only foundation schema for Cloudflare D1.
-- Rule 24: backend portability required. Keep schema portable and avoid UI/business logic lock-in.

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS agencies (
  agency_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  agency_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  time_zone TEXT NOT NULL DEFAULT 'America/Chicago',
  date_format TEXT NOT NULL DEFAULT 'MM/DD/YYYY',
  time_format TEXT NOT NULL DEFAULT '24-hour',
  work_week_starts_on TEXT NOT NULL DEFAULT 'Sunday',
  pay_period_type TEXT NOT NULL DEFAULT 'Biweekly',
  pay_period_starts_on TEXT NOT NULL DEFAULT 'Sunday',
  vocabulary_json TEXT NOT NULL DEFAULT '{}',
  metadata_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS employees (
  employee_id TEXT PRIMARY KEY,
  agency_id TEXT NOT NULL,
  name TEXT NOT NULL,
  employee_code TEXT,
  role TEXT,
  position TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  hire_date TEXT,
  seniority_date TEXT,
  department TEXT,
  division TEXT,
  location TEXT,
  shift_group TEXT,
  assigned_pattern TEXT,
  overtime_eligible INTEGER NOT NULL DEFAULT 1,
  mandate_eligible INTEGER NOT NULL DEFAULT 1,
  trade_eligible INTEGER NOT NULL DEFAULT 1,
  shift_bid_eligible INTEGER NOT NULL DEFAULT 1,
  vacation_bid_eligible INTEGER NOT NULL DEFAULT 1,
  benefit_eligible INTEGER NOT NULL DEFAULT 1,
  exceptions_json TEXT NOT NULL DEFAULT '[]',
  qualifications_json TEXT NOT NULL DEFAULT '[]',
  benefit_balances_json TEXT NOT NULL DEFAULT '{}',
  metadata_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (agency_id) REFERENCES agencies(agency_id)
);

CREATE INDEX IF NOT EXISTS idx_employees_agency_id ON employees(agency_id);
CREATE INDEX IF NOT EXISTS idx_employees_status ON employees(status);

CREATE TABLE IF NOT EXISTS audit_logs (
  audit_id TEXT PRIMARY KEY,
  agency_id TEXT,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  action TEXT NOT NULL,
  actor_type TEXT NOT NULL DEFAULT 'system',
  actor_id TEXT,
  reason TEXT,
  details_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (agency_id) REFERENCES agencies(agency_id)
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_agency_id ON audit_logs(agency_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
