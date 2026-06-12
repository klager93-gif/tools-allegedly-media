## v1.3.3 Migration Plan Update

The migration path is corrected from Cloudflare D1-first to Coolify-first. Future backend work should evaluate Coolify-hosted Postgres/MySQL before any live write operations are added. D1 remains a possible adapter, not the default.

# Signal Schedule Migration Plan — v1.0.0

The migration path is JSON adapter → repository/adapter boundary → Worker API → D1 adapter.

Rule 24 preserves the option to migrate later to MySQL, PostgreSQL, PHP, or another backend.
