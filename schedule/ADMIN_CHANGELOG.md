## v4.4.0 — Admin Notes

- Run migration `schedule/api/coolify/sql/044_saved_schedule_crud_foundation_schema.sql` before enabling saved schedule writes.
- Saved schedule writes require `DATA_MODE=postgres`, `DATABASE_URL`, `ADMIN_API_KEY`, and `SCHEDULE_WRITES_ENABLED=true`.
- Employee write validation bug fixed in the API skeleton.
- Release package was rebuilt cleanly without `.git`, `__MACOSX`, AppleDouble files, or `.DS_Store`.

## v4.4.0 — Availability, Preferences, Restrictions + Navigation Exposure

- Added `/schedule/availability.html` for employee availability, preferences, restrictions, and View As group filters.
- Added preview data, read-only API contract, service/repository/adapter boundaries, and migration 043.
- Expanded View As group foundation to include groups, roles, locations, departments, qualifications, shifts, and future pattern filters.
- Updated app shell navigation so Schedule Builder, Publishing, Employee Portal, and Availability are visible from the connected navigation.
- Enhanced builder assignment hints with availability/preference/restriction context where preview data exists.


## v4.4.0 — Employee Portal Preview + Builder Autocomplete

- Added `/schedule/employee/` employee-facing portal preview.
- Added permanent View As foundation for employee and group previews.
- Added employee dashboard, calendar, requests/OT, profile, balances, and notifications preview screens.
- Added builder name autocomplete using the current employee sample data.
- Added assignment hinting for availability, group, role, and qualification context while editing the grid.
- Added migration 042 for future View As profiles, audit logging, and portal preferences.

## Signal Schedule v4.4.0 — Beta Foundation & Publishing

Starts the Schedule 4.x beta series with a publishing workspace, read-only publication preview endpoint, migration 040, immutable published version/snapshot/event table foundations, post/seat foundations, and employee availability/preference/restriction foundations.

Database migration required: `schedule/api/coolify/sql/040_schedule_beta_publishing_foundation_schema.sql`.


## v4.4.0 — Schedule Planning & Forecast Horizon

- Adds Schedule Planning / Forecast Horizon foundation.
- Adds forecast runs through a selected date range.
- Adds forecast issue preview for under-minimum coverage, qualification gaps, training/leave conflicts, OT posting needs, and likely mandate risk.
- Adds recommended action queues and heatmap preview.
- Adds read-only API contract/endpoint, service/repository/adapter boundaries, and Postgres migration 039.
- Navigation coverage audit confirms Planning Forecast is linked in the desktop app shell.


## v4.4.0 — Schedule File Organization & Release Cleanup

- Organized Schedule page-specific CSS and JS into /schedule/pages module folders.
- Preserved public /schedule/*.html URLs to avoid breaking navigation, bookmarks, or live links.
- Updated all page asset references for the new support-file locations.
- Removed unused legacy Schedule layout files from the release package.
- Added full-replacement cleanup validation and navigation coverage expectations.
- No database migration required.

# ADMIN CHANGELOG
## v3.8.0 — Drag-and-Drop + Draft Engine

Adds drag-and-drop draft planning foundations with staged move queue, conflict preview, publish checklist, preview data, read-only API endpoint, API contract, service/repository/adapter boundaries, navigation coverage audit, and Postgres migration 038.

## v3.8.0 — Scheduling Workspace

- Added Scheduling Workspace foundation at `workspace.html`.
- Added wide week planning grid, compact command row, right inspector panel, and operational queue preview.
- Added component foundations for panels, toolbars, tables, and status tags.
- Updated Schedule navigation to link the workspace.
- Updated roadmap with missing major features: draft/publish engine, forecast horizon, seating/post planner, shift bidding, certification notifications, import/export, employee portal, agency rule engine, availability/preferences, staffing calculator, and vacancy tracker.
- No database migration required.


## v3.8.0 — Navigation Coverage Audit Hotfix

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


## v3.3.0 — Theme Engine Foundation

- Added theme picker and persistent client-side theme preference.
- Added compact flyout navigation for desktop admin workflow.
- No database migration required.

## v3.3.0 — Desktop UX Refinement

- Updated Schedule app-shell styling and navigation behavior for connected flyout panels.
- Set Midnight as the default Schedule theme when no user preference exists.
- No database migration required.

## v3.6.1 — Schedule Visibility & Privacy Controls

Adds role/group-based schedule visibility and privacy controls. Employees can be allowed to see supervisor schedules as exact times, hours only, working/off only, or hidden. Leave type labels can be shown, reduced to off-only, or hidden by user group and leave type. Adds preview data, page, API contract/endpoint, service/repository/adapter boundaries, and migration 037.
