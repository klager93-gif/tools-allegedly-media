# Signal Schedule

Signal Schedule v2.19.0 adds the Coverage Spots Foundation. It previews numbered staffing spots by date, shift, role, and spot code so the system can show open coverage and prepare for assignment-ready scheduling.

The foundation includes a Coverage Spots page, seed data, adapter/repository/service boundaries, API contract, read-only Coolify endpoint, and Postgres migration 025.

Current migration target: 025 coverage_spots_foundation. Run `schedule/api/coolify/sql/025_coverage_spots_foundation_schema.sql` after deploying this release if the Postgres database is active.

Production writes, drag/drop assignments, and automatic OT/leave consumption remain disabled until protected authentication, role enforcement, and write policies are ready.
