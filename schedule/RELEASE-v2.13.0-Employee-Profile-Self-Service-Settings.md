# Schedule v2.14.0 — Employee Profile & Self-Service Settings

Adds the Employee Profile & Self-Service Settings foundation.

## Highlights

- Added employee profile preview page.
- Added admin-controlled field editability preview.
- Added contact methods, notification preferences, and profile change request foundations.
- Added JSON data, adapter, repository, service, API contract, and Postgres SQL migration.
- Added overview live-feature cleanup so active modules are not treated as placeholders.
- Updated Schedule navigation across pages.

## Database

After pushing this release, run:

```text
019_employee_profile_self_service_schema.sql
```

Then verify:

```sql
SELECT *
FROM schema_migrations
ORDER BY version;
```

Expected newest migration:

```text
019 employee_profile_self_service
```
