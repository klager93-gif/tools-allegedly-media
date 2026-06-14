-- Signal Schedule v2.11.0 — Schema migrations tracking foundation
-- Run once before applying Schedule feature migrations.

CREATE TABLE IF NOT EXISTS schema_migrations (
  version VARCHAR(10) PRIMARY KEY,
  name TEXT NOT NULL,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO schema_migrations (version, name)
VALUES ('004', 'schema_migrations_foundation')
ON CONFLICT (version) DO NOTHING;
