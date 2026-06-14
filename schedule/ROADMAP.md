# Signal Schedule Roadmap

## Current

Schedule v2.18.0 — Notification Foundation

- Notification channels and event-trigger rules.
- In-app queue foundation.
- Role defaults and future preference controls.
- Quiet-hours and digest behavior.
- Read-only preview API and Postgres schema migration 024.

## Next

Schedule v2.19.0 — Coverage Spots / Daily Staffing Board Foundation

- Numbered staffing spots by date, shift, and role.
- Open/filled/under-minimum display.
- Assignment objects that can later feed drag/drop scheduling, VOT, trades, callbacks, and mandates.

## Completed

Foundations

- v1.8.0 — Employee CRUD Foundation
- v1.9.0 — Assignments Foundation
- v2.0.0 — Minimum Staffing Foundation
- v2.1.0 — Calendar Foundation
- v2.1.2 — Admin Navigation Foundation
- v2.1.3 — Employee Identity Cleanup
- v2.2.0 — Leave Requests Foundation
- v2.2.1 — Request Hours & Admin Override Foundation
- v2.3.0 — Open Shifts / VOT Foundation
- v2.3.1 — Version Sync + API File Integrity Fix
- v2.4.0 — Overtime Opportunity Board Foundation


## Upcoming: Schedule v2.10.0 — Benefit Ledger (current)

- Certification tracking.
- Expiration warnings.
- Required qualification checks.
- Training assignments.
- Calendar shortcode foundation remains planned for later release.


## Added in v2.10.0 — Qualification & Eligibility Engine

Shift requirements can optionally require credentials from Training & Certifications. This prepares Coverage, OT, Trades, Assignments, callbacks, and mandates to make qualification-aware decisions.


## Next Planned Release

### Schedule v2.11.0 — Calendar Shortcode Admin Controls

- Admin add/edit/disable shortcode labels.
- Connect shortcode labels to requests, training, OT, and benefit banks.
- Improve week/month calendar display.
