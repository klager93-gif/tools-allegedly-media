# CHANGELOG

## v3.7.0 — Scheduling Workspace

- Added Scheduling Workspace foundation at `workspace.html`.
- Added wide week planning grid, compact command row, right inspector panel, and operational queue preview.
- Added component foundations for panels, toolbars, tables, and status tags.
- Updated Schedule navigation to link the workspace.
- Updated roadmap with missing major features: draft/publish engine, forecast horizon, seating/post planner, shift bidding, certification notifications, import/export, employee portal, agency rule engine, availability/preferences, staffing calculator, and vacancy tracker.
- No database migration required.


## v3.7.0 — Navigation Coverage Audit Hotfix

- Audited Schedule HTML pages against the app-shell navigation.
- Added missing raw fallback nav links on pages where Qualifications or Mandation were omitted.
- Confirmed Visibility & Privacy is linked.
- Kept redirect-only compatibility pages out of primary navigation.
- No database migration required.


## v3.6.1 — Dense Tables & Workspace

- Adds dense workspace styling for large employee populations and operational schedule views.
- Replaces the native browser theme select with a Schedule-styled connected dropdown menu.
- Adds common table standards: sticky headers, row striping, hover/selected states, compact row spacing, and horizontal table scrolling.
- Adds command-bar, inspector-panel, status-pill, and dense-grid foundations for upcoming Schedule workspaces.
- Tightens app shell spacing, hero sizing, and panel density while preserving v3.3.x connected navigation.
- No database migration required.

## v3.6.1 — Dense Tables & Workspace

- Refined Midnight, Light, Slate, CAD Dark, and High Contrast theme color tokens.
- Improved panel depth, table striping, hover states, button styling, and status color consistency.
- Preserved the v3.3.3 full-replacement app shell and connected flyout navigation.
- No database migration required.

## v3.3.3 — Full Replacement UI Stabilization

- Removed legacy global/style/schedule-nav/footer references from Schedule HTML pages so app-shell styling owns the UI.
- Rebuilt Schedule overview into desktop application dashboard.
- Normalized app-shell/footer visible versioning.
- Cleaned AppleDouble/macOS packaging files for full-folder replacement.
- No database migration required.

## Signal Schedule v3.3.3 — UI Drift & Approval Copy Hotfix

- Normalized Schedule visible version and cache-busting metadata to v3.3.3.
- Updated Schedule file header metadata to reduce false version-drift signals.
- Clarified Shift Trades approval routing: both affected supervisors must approve when employees report to different supervisors, unless scheduling/admin authority approves both sides.
- Excluded `.git`, `__MACOSX`, `.DS_Store`, and AppleDouble `._*` files from the release package.
- Database migration required: No.

## v3.3.1 — Version Drift Hotfix

- Removed visible old release labels from Schedule pages.
- Normalized Schedule page `data-signal-version` values to v3.3.1.
- Updated Schedule app shell/footer defaults and cache-busting to v3.3.1.
- Kept internal migration, adapter, service, repository, and historical changelog version references intact.
- No database migration required.

## v3.1.0 — Desktop Application UI System

- Converts all Schedule HTML pages to the shared desktop application shell.
- Adds persistent left navigation, grouped module sections, wide workspace layout, top command toolbar, and normalized app footer behavior.
- Keeps role-based panels on single canonical pages instead of duplicate `-admin` pages.
- Adds `weekly-schedule.html` compatibility redirect to canonical `weekly-board.html`.
- No database migration required.


## v3.0.0 — Weekly Schedule View

Adds the first weekly schedule grid foundation with seven-day staffing visibility, open spots, source badges, conflict indicators, role-based panels, read-only API endpoint, API contract, and Postgres migration 036.


## v3.0.0 — Alpha Integration & Stability Audit

- Audited the full-replace package after v2.29.0.
- Normalized Schedule footer/version metadata drift across Schedule pages.
- Kept role-based panels as the standard instead of duplicate `-admin` pages.
- Preserved `trades.html` as a compatibility redirect to `shift-trades.html`.
- Removed release packaging junk from the ZIP.
- No database migration required.


## v2.29.0 — Qualifications & Certification Engine

Adds Qualifications & Certification Engine for credential definitions, employee credentials, license numbers, certificate numbers, issuing authorities, expiration warnings, role qualification requirements, notes, role-based employee/supervisor/admin panels, read-only API endpoint, API contract, and Postgres migration 035. License numbers can be not required, optional, or required per qualification type.

Database migration required: `schedule/api/coolify/sql/035_qualifications_certifications_schema.sql`.

## v2.26.0 — Seniority Engine Foundation

- Adds Seniority Engine Foundation with agency-configurable overall, classification, department, rank, and shift seniority lists.
- Adds scenario preview for vacation picks, shift bids, OT awards, and mandation ordering.
- Adds tie-breaker policy, frozen list behavior, employee-visible holds, supervisor/admin-only override notes, and audit preview.
- Adds read-only Seniority Engine API contract, service/repository/adapter, preview data, endpoint, and Postgres migration 032.

## v2.24.1 — Full-Replace Cleanup & Drift Audit

- Normalized Schedule subnavigation across pages.
- Replaced duplicate `trades.html` UI with a compatibility redirect to `shift-trades.html`.
- Normalized Schedule footer metadata/cache-busting for the current package.
- Cleaned full-replace packaging by excluding `.git`, `__MACOSX`, and AppleDouble `._*` files.
- No database migration required.

## v2.25.0 — Mandation Engine Foundation

- Added Mandation Engine Foundation with agency-configurable policy profile preview.
- Added employee-facing mandate rotation list and supervisor/admin detail view.
- Added shortage-window eligibility examples for holdover, early-in, short-day, and day-off mandates.
- Added max day-off mandate hours, max connected mandate hours, max consecutive work hours, and minimum rest policy fields.
- Added supervisor/admin override preview with required reason and audit notes.
- Added read-only Mandation Engine API contract, service/repository/adapter, preview data, page assets, and Postgres migration 031.

## v2.24.0 — Shift Trades UI

- Adds Shift Trades UI for employee trade requests, proposed swap review, approval workflow status, and assignment engine connection points.
- Updates trade preview data, read-only API contract/endpoint, service/repository/adapter cache versions, and navigation.
- Adds Postgres migration `030_shift_trades_ui_schema.sql`.
- Production trade writes remain disabled.

## v2.23.0 — OT Volunteer Board Foundation

- Adds OT Volunteer Board Foundation for posted overtime opportunities, volunteer/withdraw preview, eligibility status, award queue, and open shift connection points.
- Adds preview data, read-only service/repository/adapter boundaries, API contract, page, and endpoint.
- Adds Postgres migration 029_ot_volunteer_board_schema.sql.
- Production volunteer writes and award actions remain disabled.


## v2.22.0 — Leave Banks Foundation

- Adds Leave Banks Foundation for vacation, sick, personal, comp, holiday, and training balances.
- Adds preview data, read-only service/repository/adapter boundaries, API contract, page, and endpoint.
- Adds Postgres migration 028_leave_banks_foundation_schema.sql.
- Production balance writes remain disabled.

## Signal Schedule v2.21.1 — Assignment Engine UI Contrast Hotfix

- Fixed Assignment Engine card contrast so assignment records, source types, history events, and foundation rules are readable on the dark Schedule layout.
- Updated Assignment Engine cache-busting and visible version label to v2.21.1.
- No database migration required.

## Signal Schedule v2.21.0 — Assignment Engine Integration

- Added Assignment Engine Integration preview tying date, agency, shift, role, numbered coverage spot, employee, source, status, and coverage impact into one read model.
- Added assignment source labels for pattern, overtime, trade, override, leave, and training.
- Added assignment history preview so later boards can explain why a spot changed or opened.
- Added `assignment-engine-preview.json`, adapter, repository, service, contract, and read-only Coolify API endpoint.
- Added migration `027_assignment_engine_integration_schema.sql` for assignment records and assignment history.

## Schedule v2.20.0 — Daily Schedule Board Foundation

- Added Daily Schedule Board preview page grouped by date, agency, shift, role, and numbered coverage spot.
- Added open/filled/under-minimum/over-maximum calculations so supervisors can see staffing status for a day.
- Added `daily-board-preview.json`, adapter, repository, service, contract, and read-only Coolify API endpoint.
- Added migration `026_daily_schedule_board_foundation_schema.sql` for daily board snapshots and board rows.
- Added Daily Board navigation across Schedule pages and updated Schedule asset cache-busting to v2.20.0.

## Schedule v2.19.0 — Coverage Spots Foundation

- Added Coverage Spots Foundation preview page for numbered staffing spots by date, shift, role, and spot code.
- Added open/filled/under-minimum visibility so coverage can become assignment-ready instead of only summary-based.
- Added `coverage-spots-preview.json`, adapter, repository, service, contract, and read-only Coolify API endpoint.
- Added migration `025_coverage_spots_foundation_schema.sql` for assignment-ready coverage spot records.
- Added Coverage Spots navigation across Schedule pages and updated Schedule asset cache-busting to v2.19.0.

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


## v2.27.0 — Assignment Generator Foundation

- Adds Assignment Generator preview page, data, service/repository/adapter, API contract, API route, and migration 033.
- Formalizes role-based supervisor/admin panels on the same feature page instead of duplicate `-admin` pages when workflows are not separate.

## v2.28.0 — Conflict Detection Foundation

Adds Conflict Detection Foundation for generated schedules and assignment drafts. Includes double-assignment, under-minimum, over-maximum, leave overlap, missing qualification, rest-rule, and manual override conflict previews; role-based employee/supervisor/admin visibility panels; read-only API contract/endpoint; and Postgres migration 034.


## v3.3.0 — Theme Engine Foundation

- Added Schedule-only theme token system for Light, Midnight, Slate, CAD Dark, and High Contrast modes.
- Added client-side theme picker with localStorage persistence.
- Reworked Schedule sidebar into a one-column navigation with desktop hover/focus flyouts.
- Kept role-based panel philosophy; no duplicate `-admin` pages were introduced.
- No database migration required.

## v3.3.0 — Desktop UX Refinement

- Replaced floating pill hover menus with connected box-style flyout panels.
- Tightened Schedule desktop navigation behavior.
- No database migration required.

## v3.6.1 — Schedule Visibility & Privacy Controls

Adds role/group-based schedule visibility and privacy controls. Employees can be allowed to see supervisor schedules as exact times, hours only, working/off only, or hidden. Leave type labels can be shown, reduced to off-only, or hidden by user group and leave type. Adds preview data, page, API contract/endpoint, service/repository/adapter boundaries, and migration 037.
