# Signal Schedule v1.7.0 — Postgres Connection + Employee Read Endpoint

## Summary

Signal Schedule v1.7.0 adds the first read-only Postgres connection path to the Coolify API skeleton.

## Included

- Postgres connection helper for Coolify API
- Optional Postgres-backed employee reads
- Employee read schema SQL
- Optional sample employee seed SQL
- Environment example for Coolify/Postgres configuration
- Updated employee read response contract
- Updated Schedule documentation and release notes

## Not Included

- No CRUD
- No authentication
- No production credentials
- No database writes through the API
- No frontend switch to live API by default
- No scheduling engine changes

## Validation

Rule 26 asset validation passed with zero missing references.
