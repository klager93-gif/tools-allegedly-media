# Signal Schedule Roadmap

## Current — v4.6.1
Saved schedule save/load UI foundation.

Completed in this release:
- Builder save draft button.
- Saved schedules list page.
- Saved draft inspector.
- Open saved draft back into builder.

## Next — v4.6.1
Recommended next step: protected schedule draft management.

Candidate scope:
- Rename saved schedule.
- Duplicate saved schedule.
- Soft delete saved schedule from UI.
- Better admin key/session handling instead of repeated browser prompts.
- Publish-ready status transition preparation.

## Later
- True publish/revision history.
- Compare saved drafts.
- Employee portal schedule visibility.
- Pattern generator connected to saved schedules.

## Completed in v4.6.1
- Protected publish-state action for saved schedules.
- Saved Schedules UI Publish button.
- Copy buttons for saved schedule IDs, agency IDs, API endpoints, publish endpoints, and JSON details.

## Next: v4.7.0
- Published schedule version history.
- Immutable snapshots.
- Rollback/compare groundwork.


## Navigation and Role Architecture Principle

Admin is Employee + More: administrators retain all employee-facing pages and actions, including My Schedule, My Requests, My Availability, My Profile, and Notifications, with additional administrative capabilities layered on top. Navigation should remain task-based and subfolder-safe across employee, admin, and future supervisor views.
