# Build Manifest — Signal Schedule v4.8.1

Package: `signal-schedule-v4.8.1-full-replacement.zip`

Build type: full-root replacement package.

Source: verified Signal Schedule v4.8.0 full replacement package.

## Release focus

SQL migration folder normalization for the v4.8 Employee Experience & Data Tools release.

## Key changes

- Moved migration 045 from accidental `/schedule/sql/` to the established Coolify folder.
- Removed accidental `/schedule/sql/` folder from the package.
- Updated docs/manifests to reference `schedule/api/coolify/sql/045_employee_experience_data_tools_schema.sql`.
- Updated package version/cache references to v4.8.1.

## SQL

Migration 045 file location:

`database/schedule/api/coolify/sql/045_employee_experience_data_tools_schema.sql`

Expected tracked database row after applying v4.8:

`045 | employee_experience_data_tools_schema`

If that row already exists, do not rerun the migration.
