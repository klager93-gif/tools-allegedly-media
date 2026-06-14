Current Version: v3.9.0 — Drag-and-Drop + Draft Engine


# Signal Schedule v3.6.1

Dense Tables & Workspace refines the desktop application shell for large schedules. The release adds Schedule-native dropdown controls, denser page spacing, table and inspector foundations, and component standards for schedule grids and request queues.

## Current Release: v3.1.0 — Desktop Application UI System

Signal Schedule now uses a desktop-first application shell across all Schedule pages. The shell prioritizes wide operational workspaces, persistent navigation, grouped modules, and role-based panels for supervisor/admin depth without duplicating pages.


## v3.0.0 — Weekly Schedule View

Adds the first weekly schedule grid foundation with seven-day staffing visibility, open spots, source badges, conflict indicators, role-based panels, read-only API endpoint, API contract, and Postgres migration 036.


## v2.29.0 — Qualifications & Certification Engine

Adds Qualifications & Certification Engine for credential definitions, employee credentials, license numbers, certificate numbers, issuing authorities, expiration warnings, role qualification requirements, notes, role-based employee/supervisor/admin panels, read-only API endpoint, API contract, and Postgres migration 035. License numbers can be not required, optional, or required per qualification type.

Database migration required: `schedule/api/coolify/sql/035_qualifications_certifications_schema.sql`.

## Signal Schedule v2.26.0 — Seniority Engine Foundation

Adds agency-configurable seniority lists for overall, classification, department, rank, and shift ordering. Includes vacation pick, shift bid, OT award, and mandation scenario previews, tie breakers, list freezes, employee-visible holds, supervisor/admin override notes, audit trail, read-only API endpoint, and Postgres migration 032.

Database migration required: `schedule/api/coolify/sql/032_seniority_engine_schema.sql`.

## v2.24.1 — Full-Replace Cleanup & Drift Audit

- Normalizes Schedule navigation/footer drift.
- Keeps `shift-trades.html` as the canonical trade UI.
- Leaves `trades.html` only as a redirect compatibility shim.
- Excludes `.git`, `__MACOSX`, and AppleDouble `._*` files from release packaging.
- No database migration required.

## v2.24.0 — Shift Trades UI

- Adds Shift Trades UI for employee trade requests, proposed swap review, approval workflow status, and assignment engine connection points.
- Updates trade preview data, read-only API contract/endpoint, service/repository/adapter cache versions, and navigation.
- Adds Postgres migration `030_shift_trades_ui_schema.sql`.
- Production trade writes remain disabled.

# Signal Schedule v2.23.0 — OT Volunteer Board Foundation

Signal Schedule v2.23.0 adds an admin-first OT Volunteer Board foundation for posted overtime opportunities, employee volunteer interest, eligibility preview, award queue review, and open shift connection points.

## Database Migration Required

Yes. Run:

```text
schedule/api/coolify/sql/029_ot_volunteer_board_schema.sql
```

Expected newest migration row:

```text
029 | ot_volunteer_board_foundation
```

## Current Foundation

Signal Schedule currently includes employees, agencies, requests, coverage board, coverage spots, daily board, assignment engine, leave banks, notifications, roles/permissions, approvals, and OT volunteer board preview foundations.

## Next Planned Release

v2.24.0 — Shift Trade UI / workflow connection.


## v2.25.0 — Mandation Engine Foundation

Adds policy-driven mandate rotation, shortage-window eligibility, employee and supervisor/admin mandate views, agency-set mandate hour caps, max consecutive hour rules, and override audit preview.


## v2.27.0 Assignment Generator Foundation

Adds draft assignment generation previews and establishes role-based panels for employee/supervisor/admin detail instead of creating duplicate `-admin` pages unless the workflow is genuinely separate.

## v2.28.0 — Conflict Detection Foundation

Adds Conflict Detection Foundation for generated schedules and assignment drafts. Includes double-assignment, under-minimum, over-maximum, leave overlap, missing qualification, rest-rule, and manual override conflict previews; role-based employee/supervisor/admin visibility panels; read-only API contract/endpoint; and Postgres migration 034.


## v3.3.3 Theme Engine Foundation

The Schedule UI now supports a Schedule-only theme engine through the shared desktop application shell. Themes currently include Light, Midnight, Slate, CAD Dark, and High Contrast. A compact one-column sidebar with flyout groups replaces the long grouped navigation tree.

## v3.3.3 — Version Drift Hotfix

Schedule now uses connected, box-style flyout navigation instead of separated pill hover menus. Midnight is the default theme when no saved user preference exists.

## v3.6.1 — Dense Tables & Workspace

- Refined Midnight, Light, Slate, CAD Dark, and High Contrast theme color tokens.
- Improved panel depth, table striping, hover states, button styling, and status color consistency.
- Preserved the v3.3.3 full-replacement app shell and connected flyout navigation.
- No database migration required.



## v3.6.1 — Schedule Visibility & Privacy Controls

Adds role-based privacy policies controlling supervisor schedule visibility, exact time display, hours-only display, working/off-only display, and leave type visibility by user group.


## v3.9.0 Navigation Coverage Audit Hotfix

Schedule navigation was audited so canonical pages are linked and redirect-only compatibility pages stay out of primary nav. No database migration required.


## v3.9.0 Scheduling Workspace

The Scheduling Workspace is the central desktop grid and inspector foundation for future draft, drag-and-drop, forecast, and publish workflows.


## v3.9.0 — Schedule File Organization & Release Cleanup

### Purpose
Organizes page-specific support CSS/JS files into `/schedule/pages/` module folders while preserving public `/schedule/*.html` URLs. This is safe for full replacement because all HTML asset references were updated and validated.

### Public URLs preserved
All canonical Schedule pages remain at `/schedule/*.html`. Compatibility pages remain in place.

### Support asset folders added
- `/schedule/pages/calendar/`
- `/schedule/pages/coverage/`
- `/schedule/pages/people/`
- `/schedule/pages/requests/`
- `/schedule/pages/rules/`
- `/schedule/pages/settings/`
- `/schedule/pages/workspace/`

### Legacy root support files removed
- `/schedule/style.css`
- `/schedule/script.js`
- `/schedule/footer.css`
- `/schedule/schedule-nav.css`

### Validation
- HTML asset references checked
- JS syntax checked
- JSON parsed
- Navigation coverage preserved
- ZIP integrity checked
- No database migration required
