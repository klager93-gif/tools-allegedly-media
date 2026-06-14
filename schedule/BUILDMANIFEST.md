
## v2.29.0 — Qualifications & Certification Engine

- Added `qualifications.html`, `qualifications.css`, and `qualifications.js`.
- Added qualification preview data, adapter, repository, service, API contract, API route, and migration 035.
- Added optional/required license-number policy support and notes/issuing authority fields.
- Database migration required: `schedule/api/coolify/sql/035_qualifications_certifications_schema.sql`.

# Signal Schedule v2.26.0 Build Manifest

## Release

Signal Schedule v2.26.0 — Seniority Engine Foundation

## Database Migration Required

Yes. Run `schedule/api/coolify/sql/032_seniority_engine_schema.sql`.

Expected newest migration row: `032 | seniority_engine`.

## Primary Files Changed

- `schedule/seniority.html`
- `schedule/seniority.css`
- `schedule/seniority.js`
- `schedule/data/seniority-engine-preview.json`
- `schedule/adapters/JsonSeniorityEngineAdapter.js`
- `schedule/repositories/SeniorityEngineRepository.js`
- `schedule/services/SeniorityEngineService.js`
- `schedule/api/contracts/seniority-engine.read.schema.json`
- `schedule/api/coolify/sql/032_seniority_engine_schema.sql`
- `schedule/api/coolify/server.js`

## Validation

- JavaScript syntax checked.
- JSON parsed.
- HTML asset references checked.
- ZIP integrity checked.

# Signal Schedule Build Manifest

## v2.25.0 — Mandation Engine Foundation

Built from v2.24.1 full-replace cleanup baseline. Adds mandation page, CSS/JS, preview data, service/repository/adapter, API contract, Coolify endpoint, SQL migration 031, nav/footer metadata updates, and documentation updates.

Database Migration Required: Yes — schedule/api/coolify/sql/031_mandation_engine_foundation_schema.sql


## v2.27.0 — Assignment Generator Foundation

Added assignment-generator page/assets, preview data, service/repository/adapter, API contract, SQL migration 033, and Coolify read endpoint.

## v2.28.0 — Conflict Detection Foundation

Adds Conflict Detection Foundation for generated schedules and assignment drafts. Includes double-assignment, under-minimum, over-maximum, leave overlap, missing qualification, rest-rule, and manual override conflict previews; role-based employee/supervisor/admin visibility panels; read-only API contract/endpoint; and Postgres migration 034.

### v2.28.0 Build Validation
- JS syntax checked.
- JSON parsed.
- HTML asset references checked.
- ZIP integrity checked.
- Migration uses `schema_migrations (version, name)`.
