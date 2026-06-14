-- Signal Schedule v2.10.0 — Benefit Ledger foundation
-- Preview schema for future Postgres implementation.

CREATE TABLE IF NOT EXISTS benefit_banks (
  id TEXT PRIMARY KEY,
  agency_id TEXT NOT NULL,
  name TEXT NOT NULL,
  shortcode TEXT NOT NULL,
  unit TEXT NOT NULL DEFAULT 'hours',
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS employee_benefit_ledger_entries (
  id TEXT PRIMARY KEY,
  agency_id TEXT NOT NULL,
  employee_id TEXT NOT NULL,
  benefit_bank_id TEXT NOT NULL REFERENCES benefit_banks(id),
  entry_type TEXT NOT NULL,
  hours NUMERIC(8,2) NOT NULL,
  reason TEXT,
  source_request_id TEXT,
  entered_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS calendar_shortcodes (
  id TEXT PRIMARY KEY,
  agency_id TEXT NOT NULL,
  code TEXT NOT NULL,
  label TEXT NOT NULL,
  category TEXT NOT NULL,
  benefit_bank_id TEXT REFERENCES benefit_banks(id),
  active BOOLEAN NOT NULL DEFAULT TRUE,
  admin_editable BOOLEAN NOT NULL DEFAULT TRUE,
  UNIQUE (agency_id, code)
);

INSERT INTO schema_migrations (version, name)
VALUES ('016', 'benefit_ledger_foundation')
ON CONFLICT (version) DO NOTHING;
