# Signal Schedule Roadmap

## Current

Schedule v2.17.1 — Asset Drift & Load Cleanup

## Next

Schedule v2.18.0 — Notification Foundation

## Current

- Schedule v2.14.0 — Employee Timeline & Audit Trail is complete.

## Next

- Schedule v2.14.0 — Employee Timeline & Audit Trail.
- Schedule v2.17.0 — Supervisors & Organizational Hierarchy.
- Schedule v2.17.0 — Roles & Permissions Engine.


## Current: Schedule v2.12.0 — Calendar Views + Schedule Footer

Completed week/day calendar view foundation and Schedule-specific footer.

## Next: Schedule v2.14.0 — Employee Timeline & Audit Trail

Employee profile, contact info, notification preferences, and admin-controlled editable fields.

# Current: Schedule v2.11.0 — Calendar Shortcode Admin Controls

Next: Schedule v2.12.0 — Calendar Views

Database note: after v2.11 is uploaded, run Schedule migrations 004 through 017 in order.

# Signal Schedule Roadmap

## Current Release: Schedule v2.10.0 — Training & Certifications

- Seniority list preview
- Equalized overtime/callback/mandate metrics
- Callback and mandation ordering foundation
- Skip reason and admin override audit foundation
- Navigation updated for Seniority & Rotation

## Scheduled Future Item: Calendar Short Codes

Add admin-defined calendar display codes for user-facing week/month views and schedule views. Built-in examples should include VOT (Voluntary Overtime), T (Training), SP (Sick Personal), SF (Sick Family), VAC (Vacation), CT (Comp Time), and agency-defined custom codes. Calendar cells should show the short code in dense week/month views; day detail panels should show full text, reason, hours, approval state, and audit history. Admins should be able to modify built-in codes and add their own.

## Current: v2.4.0 — Overtime Opportunity Board Foundation

Completed focus:

- Admin-first posted OT opportunity preview
- Slot counts and coverage status
- Volunteer/VOT request matching
- Qualification and eligibility preview
- Award recommendation preview
- Posting form preview for future database writes

## Next Recommended: v2.5.0 — Coverage Board Foundation

Planned focus:

- Day/shift coverage board
- Filled positions vs open positions
- Minimum staffing warnings
- Open/unfilled numbered coverage spots
- Link coverage gaps to OT opportunity posting
- Clear admin view for what needs filled now

## Near-Term Future

- v2.6.0 — Seniority & Rotation Foundation
- v2.7.0 — Trades / Swaps Foundation
- v2.8.0 — Training & Certification Foundation
- v2.10.0 — Benefit Ledger Foundation
- v3.0.0 — First usable staffing workflow prototype

## Completed Foundations

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
