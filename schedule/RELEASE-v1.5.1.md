# Signal Schedule v1.5.1 — Employee Data Model Design

Signal Schedule v1.5.1 defines the employee and scheduling entity model direction before Coolify API skeleton work begins.

## Package Type

Documentation / architecture release.

## Added

- `schedule/EMPLOYEE-DATA-MODEL.md`
- `schedule/SCHEDULE-DATA-MODEL.md`
- `schedule/RELEASE-v1.5.1.md`

## Updated

- Schedule README
- Schedule ROADMAP
- Schedule CHANGELOG
- Schedule HOWTO
- Root manifests/checksums

## Model Direction

Employee records are organized around:

- Core Identity
- Employment
- Organization
- Schedule Assignment
- Minimum Staffing Role
- Certifications / Skills
- Overtime Eligibility
- Leave Configuration
- Contact
- Gender / Assignment Constraints
- Notes / Metadata

## Architecture Status

The active Schedule app remains static and read-only. v1.5.1 does not connect Coolify, Postgres, MySQL, D1, Workers, or any live API.

## No Changes

- No CRUD
- No authentication
- No database writes
- No Postgres connection
- No Coolify deployment changes
- No scheduling engine logic
- No Paycheck changes

## Next Planned Release

Signal Schedule v1.6.0 — Coolify API Skeleton.
