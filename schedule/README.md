## v0.99.0 — Database Planning

Signal Schedule v0.99.0 is the bridge between the architecture phase and the first PHP/MySQL foundation release.

This release does **not** create live database tables, PHP endpoints, CRUD workflows, authentication, approvals, or production data storage. It defines the database plan before implementation.

## Purpose

- Translate 0.x concepts into future table families.
- Define stable IDs before persistence begins.
- Plan API boundaries before PHP files exist.
- Define a permissions model before user actions exist.
- Define audit logging before any live write operations exist.
- Keep Rule 0 and Rule 23 active while preparing for v1.0.

## Rule 0

Store facts, not assumptions. Database tables should persist explicit facts such as agency settings, work week starts, pay periods, eligibility, restrictions, rule sources, and audit reasons.

## Rule 23

No new dashboard-style foundation preview panels were added for this planning release. Database planning belongs in documentation until the PHP/MySQL foundation is ready.

## New planning files

- `DATABASE-PLANNING.md`
- `TABLE-PLAN.md`
- `API-PLAN.md`
- `SECURITY-PLAN.md`
- `MIGRATION-PLAN.md`
- `AUDIT-LOGGING-PLAN.md`

## Next

`v1.0.0 — Database Foundation` should begin with schema scaffolding, a private config example, a database connection helper, and read-only tests before any production writes.
