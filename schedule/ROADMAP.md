# Signal Schedule Roadmap — Revised after v4.7.0

## Product principles

- One Agency / One Living Schedule / Many Snapshots.
- Admin = Employee + More.
- Navigation should consolidate around tasks, not isolated technical pages.

## Completed: v4.7.0 — Schedule History & Snapshot Engine

- Schedule History replaces user-facing legacy saved-schedule list language.
- `history.html` becomes the snapshot/history workspace.
- Snapshot restore/publish/export/copy actions are established at the UI foundation level.

## Next major milestones

- v4.8.0 — Templates & Data Tools.
- v4.9.0 — Employee Portal Foundation.
- v5.0.0 — Request & Approval Engine.
- v5.1.0 — Assignment & Coverage Engine.
- v5.2.0 — Overtime & Mandation Engine.
- v5.3.0 — Rules & Intelligence.
- v5.5.0 — Navigation & UX Consolidation.
- v6.0.0 — Public Beta.

---

# Signal Schedule Roadmap

## Current — v4.7.0
Saved schedule save/load UI foundation.

Completed in this release:
- Builder save draft button.
- Schedule history list page.
- Snapshot inspector.
- Restore snapshot back into builder.

## Next — v4.7.0
Recommended next step: protected schedule draft management.

Candidate scope:
- Rename snapshot.
- Duplicate snapshot.
- Soft delete snapshot from UI.
- Better admin key/session handling instead of repeated browser prompts.
- Publish-ready status transition preparation.

## Later
- True publish/revision history.
- Compare snapshots.
- Employee portal schedule visibility.
- Pattern generator connected to snapshots.

## Completed in v4.7.0
- Protected publish-state action for snapshots.
- Schedule History UI Publish button.
- Copy buttons for snapshot IDs, agency IDs, API endpoints, publish endpoints, and JSON details.

## Next: v4.7.0
- Published schedule version history.
- Immutable snapshots.
- Rollback/compare groundwork.


## Navigation and Role Architecture Principle

Admin is Employee + More: administrators retain all employee-facing pages and actions, including My Schedule, My Requests, My Availability, My Profile, and Notifications, with additional administrative capabilities layered on top. Navigation should remain task-based and subfolder-safe across employee, admin, and future supervisor views.
