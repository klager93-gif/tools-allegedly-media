# Latest Schedule Release

Schedule v2.19.0 — Coverage Spots Foundation

## Summary

Signal Schedule v2.19.0 adds the Coverage Spots Foundation across UI, preview data, service/repository/adapter boundaries, API contract, Coolify read endpoint, and Postgres migration 025.

## Included

- `coverage-spots.html`
- `coverage-spots.css`
- `coverage-spots.js`
- `data/coverage-spots-preview.json`
- `adapters/JsonCoverageSpotsAdapter.js`
- `repositories/CoverageSpotsRepository.js`
- `services/CoverageSpotsService.js`
- `api/contracts/coverage-spots.read.schema.json`
- `api/coolify/sql/025_coverage_spots_foundation_schema.sql`
- `/api/coverage-spots` read-only preview route

## Database Migration Required

Yes. Run `schedule/api/coolify/sql/025_coverage_spots_foundation_schema.sql` after deploying if the Postgres database is active.

## Notes

Coverage spots are read-only preview records in this release. Assignment writes, drag/drop scheduling, and automatic leave/OT consumption remain disabled.
