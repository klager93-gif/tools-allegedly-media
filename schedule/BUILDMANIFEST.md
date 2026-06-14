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
