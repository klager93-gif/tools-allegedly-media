## Schedule v2.18.0 — Notification Foundation

- Added Notification Foundation preview page for notification channels, rules, queue items, role preferences, quiet-hours, and digest behavior.
- Added `notifications-preview.json`, adapter, repository, service, contract, and read-only Coolify API endpoint.
- Added migration `024_notification_foundation_schema.sql` for notification channels, rules, preferences, and queue records.
- Added Notifications navigation across Schedule pages and updated Schedule asset cache-busting to v2.18.0.
- Production email/SMS/push sends remain disabled; no provider credentials are committed.

## Schedule v2.17.1 — Asset Drift & Load Cleanup

- Normalized Schedule asset cache-busting query strings to v2.17.1.
- Removed duplicate root header/footer component script loads from Schedule pages.
- Updated stale coverage, leave, open shifts, eligibility, trades, training, seniority, and overview asset references.
- Standardized Schedule footer loading order and version metadata.
- No database migration required; database remains at 023 request_approval_workflow.

## Schedule v2.17.0 — Release File Cleanup & Latest Release

- Removed persistent per-version `RELEASE-v*.md` files from `/schedule/`.
- Added `LATEST_RELEASE.md` as the single current release summary.
- Fixed overview/version drift and updated Schedule metadata to v2.17.0.
- Preserved full-root replacement contents while excluding `.git`, `._*`, `.DS_Store`, and `__MACOSX`.

## Schedule v2.17.0 — Roles & Permissions Engine

Adds role templates, permission matrix, field-level access controls, scope-aware permissions, and approval authority previews. New SQL migration: `022_roles_permissions_schema.sql`.

## Schedule v2.17.0 — Supervisors & Organizational Hierarchy

- Added supervisor hierarchy preview.
- Added hybrid supervisor scope by employee, group, position, department, division, and location.
- Added SQL migration 021 supervisor hierarchy.


## Schedule v2.14.0 — Employee Timeline & Audit Trail

- Added Employee Timeline & Audit Trail foundation.
- Added admin/supervisor employee-specific event history preview.
- Added actor, before/after, reason, category, and visibility preview.
- Added timeline adapter, repository, service, API contract, data, and SQL migration 020.

## Schedule v2.14.0 — Employee Profile & Self-Service Settings

- Added Employee Profile & Self-Service Settings foundation.
- Added admin-controlled editable field, contact, notification, and profile change request preview.
- Added SQL migration 019.
- Cleaned Schedule overview live-feature modules.


## Schedule v2.12.0 — Calendar Views + Schedule Footer

- Added week and day calendar views using admin-defined calendar shortcodes.
- Added lightweight Schedule-specific footer across /schedule/ pages.
- Added Calendar View adapter, repository, service, API contract, data, and SQL foundation.
- Fixed overview page version drift.

## Schedule v2.11.0 — Calendar Shortcode Admin Controls

- Added Calendar Shortcode Admin Controls.
- Added shortcode data, adapter, repository, service, API contract, and SQL foundation.
- Added migration tracking foundation and schema_migrations inserts for Schedule feature migrations.
- Updated Schedule navigation across pages.


## Schedule v2.10.0 — Benefit Ledger

- Added Benefit Ledger foundation.
- Added leave bank previews, request impacts, adjustments, and audit trail preview.
- Added calendar shortcode foundation for compact week/month labels.

## Schedule v2.10.0 — Training & Certifications

- Added Training & Certifications preview page.
- Added certification expiration, active, expired, in-training, and restricted status previews.
- Added role/credential requirement rule preview.
- Added training certification JSON data, adapter, repository, and service layers.
- Added API read contract and Postgres SQL foundation.
- Updated Schedule navigation across pages.


# Signal Schedule Changelog

## Schedule v2.7.0 — Shift Trades & Swap Requests

- Added Shift Trades & Swap Requests foundation.
- Added trade queue preview, coverage impact warnings, qualification checks, admin recommendation preview, and audit trail preview.
- Added ShiftTrade adapter, repository, service, API contract, SQL foundation, and preview data.
- Updated Schedule navigation across pages.

## Schedule v2.6.0 — Seniority & Rotation Engine

- Added Seniority & Rotation Engine preview page.
- Added seniority rotation JSON data, adapter, repository, and service layer.
- Added callback, mandate, eligible, and skipped filters.
- Added ordering rule preview for lowest equalized OT, highest seniority, reverse seniority mandate, and rotating wheel.
- Added skip reason and audit trail preview.
- Updated Schedule navigation across pages for the new Seniority & Rotation page.
- Added API contract and Postgres SQL foundation for seniority lists and rotation events.
- Added calendar shortcode roadmap note for VOT, T, SP, SF, and agency-defined codes.
- Included Signal Labs Standards v3.0 consolidated development standards in the v2.6.0 full-root package.

## v2.5.0 — Coverage Board Foundation

- Added admin-first Coverage Board page.
- Added coverage preview rows grouped by date.
- Added minimum, target, and maximum staffing comparison.
- Added below-minimum, at-minimum, covered, and above-minimum statuses.
- Added filters for below-minimum, at-minimum, open slots, and stable rows.
- Added Coverage Board JSON adapter, repository, and service layer.
- Added coverage read contract and future Postgres schema preview.
- Updated Schedule navigation to include Coverage Board across Schedule pages.
- Updated Schedule version references to v2.5.0.

## v2.4.0 — Overtime Opportunity Board Foundation

- Converted the Open Shifts/VOT preview into an admin-first Overtime Opportunity Board.
- Added posted opportunity cards with slots, coverage status, qualification tags, volunteer count, and recommended award preview.
- Added board filters for all opportunities, short coverage, watch coverage, and high-priority postings.
- Added admin post-opportunity preview form with assignment, role, date, slots, time range, priority, award rule, and requirements.
- Added award review panel that groups volunteers by selected opportunity.
- Added seniority rank, eligibility status, and award recommendation preview for VOT requests.
- Expanded open shift seed data with slots, posted-by, award policy, and eligibility rules.
- Updated visible Schedule version labels to v2.4.0.

## v2.3.1 — Version Sync + API File Integrity Fix

- Synchronized Schedule page metadata and visible version labels to v2.3.1.
- Updated Schedule script storage key to `signalSchedule.v2.3.1` and preserved older key migration.
- Restored missing seed files: `agencies.json`, `employees.json`, `assignment-templates.json`, and `employee-assignments.json`.
- Added missing Coolify API Postgres adapter at `schedule/api/coolify/db/postgres.js`.
- Cleaned README version drift before the next feature build.
- Rebuilt the release package without `.git`, macOS resource fork files, or release junk.

## v2.3.0 — Open Shifts / VOT Foundation

- Added Open Shifts / VOT Foundation preview page.
- Added open shift and VOT request preview data.
- Added admin-controlled request reason seed options.
- Added OpenShift adapter, repository, and service boundaries.
- Added read-only Open Shifts API contract and Coolify route planning.
- Added future SQL planning for open shifts, VOT requests, and request reason options.

## v2.2.1 — Request Hours & Admin Override Foundation

- Added full-day vs partial-day time selection planning.
- Added start/end time hour calculation preview.
- Added request type minimum increment planning.
- Added admin/scheduler override planning.

## v2.2.0 — Leave Requests Foundation

- Replaced the Leave Requests placeholder with a preview-only admin workflow page.
- Added leave request type and preview request seed data.
- Added Leave Request adapter, repository, and service boundaries.
- Added read-only API contract and Coolify route planning.
- Added future Postgres leave request schema planning.

## v2.1.3 — Employee Identity Cleanup

- Added employee identity architecture rule.
- Standardized hidden system ID vs admin-entered agency employee ID.
- Added optional badge number planning separate from employee ID.
- Added future users, roles, and user_roles table planning.
- Documented username-or-email login strategy.

## v2.1.2 — Admin Navigation Foundation

- Added Schedule-specific admin navigation.
- Added placeholder pages for Employees, Assignments, Minimum Staffing, Leave Requests, Open Shifts, Reports, and Settings.
- Preserved existing Schedule overview and Calendar Foundation pages.

## v2.1.1 — Full Root Deployment Cleanup

- Rebuilt the release as a clean full-root replacement package.
- Preserved `schedule/index.html` and `schedule/schedule.html` together to prevent directory index/403 deployment issues.
- Added a Calendar Preview link from the Schedule foundation overview.

## v2.1.0 — Calendar Foundation

- Added separate user-facing calendar page at `schedule/schedule.html`.
- Added month-style June 2026 preview grid.
- Added selectable day detail panel for coverage and event placeholders.
- Added calendar preview JSON data and event placeholder data.
- Added Calendar JSON adapter, repository, and service boundaries.

## v2.0.0 — Minimum Staffing Foundation

- Added minimum staffing templates and preview data.
- Added minimum staffing adapter, repository, service, API contract, and Coolify route planning.
