## Signal Schedule v4.0.0 — Beta Foundation & Publishing

Starts the Schedule 4.x beta series with a publishing workspace, read-only publication preview endpoint, migration 040, immutable published version/snapshot/event table foundations, post/seat foundations, and employee availability/preference/restriction foundations.

Database migration required: `schedule/api/coolify/sql/040_schedule_beta_publishing_foundation_schema.sql`.


## v4.0.0 — Schedule Planning & Forecast Horizon

- Adds Schedule Planning / Forecast Horizon foundation.
- Adds forecast runs through a selected date range.
- Adds forecast issue preview for under-minimum coverage, qualification gaps, training/leave conflicts, OT posting needs, and likely mandate risk.
- Adds recommended action queues and heatmap preview.
- Adds read-only API contract/endpoint, service/repository/adapter boundaries, and Postgres migration 039.
- Navigation coverage audit confirms Planning Forecast is linked in the desktop app shell.


## v4.0.0 — Schedule File Organization & Release Cleanup

- Organized Schedule page-specific CSS and JS into /schedule/pages module folders.
- Preserved public /schedule/*.html URLs to avoid breaking navigation, bookmarks, or live links.
- Updated all page asset references for the new support-file locations.
- Removed unused legacy Schedule layout files from the release package.
- Added full-replacement cleanup validation and navigation coverage expectations.
- No database migration required.



## v3.8.0 — Drag-and-Drop + Draft Engine

Adds drag-and-drop draft planning foundations with staged move queue, conflict preview, publish checklist, preview data, read-only API endpoint, API contract, service/repository/adapter boundaries, navigation coverage audit, and Postgres migration 038.

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

## v3.6.1 — Schedule Visibility & Privacy Controls

Adds role/group-based schedule visibility and privacy controls. Employees can be allowed to see supervisor schedules as exact times, hours only, working/off only, or hidden. Leave type labels can be shown, reduced to off-only, or hidden by user group and leave type. Adds preview data, page, API contract/endpoint, service/repository/adapter boundaries, and migration 037.
