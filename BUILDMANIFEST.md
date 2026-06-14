# Signal Schedule v2.21.0 Build Manifest

## Release

Signal Schedule v2.21.0 — Assignment Engine Integration

## Database Migration Required

Yes. Run `schedule/api/coolify/sql/027_assignment_engine_integration_schema.sql`.

## Primary Files Changed

- `schedule/assignments.html`
- `schedule/assignments.css`
- `schedule/assignments.js`
- `schedule/data/assignment-engine-preview.json`
- `schedule/adapters/JsonAssignmentEngineAdapter.js`
- `schedule/repositories/AssignmentEngineRepository.js`
- `schedule/services/AssignmentEngineService.js`
- `schedule/api/contracts/assignment-engine.read.schema.json`
- `schedule/api/coolify/sql/027_assignment_engine_integration_schema.sql`
- `schedule/api/coolify/server.js`
- `schedule/CHANGELOG.md`
- `schedule/LATEST_RELEASE.md`
- `schedule/ROADMAP.md`

## Validation

- JSON parsed.
- JavaScript syntax checked.
- HTML asset references checked.
- Postgres migration uses `schema_migrations (version, name)`.
