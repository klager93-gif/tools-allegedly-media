# Signal Schedule

Current Version: v2.6.0

Signal Schedule is an admin-first staffing and scheduling platform foundation. v2.6.0 adds the Seniority & Rotation Engine preview for fair OT, callback, mandation, skip reason, and audit logic.

**Current Version: v2.6.0

Signal Schedule is a staffing and schedule-planning tool being built for dispatch, police, fire, corrections, nursing, and similar shift-based operations.

## Pages

- `schedule/index.html` — foundation/admin overview
- `schedule/schedule.html` — calendar preview
- `schedule/employees.html` — employees foundation placeholder
- `schedule/assignments.html` — assignments foundation placeholder
- `schedule/staffing.html` — minimum staffing foundation
- `schedule/leave.html` — leave request foundation
- `schedule/open-shifts.html` — overtime opportunity board foundation
- `schedule/reports.html` — reports foundation placeholder
- `schedule/settings.html` — settings foundation placeholder

## Current foundations

- Employee read foundation
- Protected employee CRUD API planning
- Assignments foundation
- Minimum staffing foundation
- Calendar foundation
- Leave requests foundation
- Request hours and admin override planning
- Admin-controlled request reason planning
- Overtime opportunity posting preview
- Volunteer/VOT matching preview
- Award review preview
- Coolify API skeleton with optional Postgres employee adapter

## v2.5.0 feature focus

- Renamed Open Shifts/VOT page into an admin-first Overtime Opportunity Board preview.
- Added posted OT opportunity cards with slots, coverage status, qualification tags, volunteer counts, and recommended award preview.
- Added opportunity filters for all, short coverage, watch coverage, and high-priority postings.
- Added admin posting preview form for assignment, role, date, slot count, priority, award rule, time range, and requirements.
- Added award review panel showing matching volunteers, seniority rank, eligibility status, and award recommendation.
- Expanded preview seed data with eligibility rules, award policy, slots, seniority rank, and review status.

## Not production ready yet

- No active schedule generation engine
- No final leave approval workflow
- No final VOT bidding workflow
- No employee portal
- No production auth system
- No live write routes unless intentionally enabled and protected
