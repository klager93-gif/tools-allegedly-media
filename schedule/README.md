## Schedule v2.16.1 — Release File Cleanup & Latest Release

Current cleanup release. Persistent per-version release files have been replaced by `schedule/LATEST_RELEASE.md`. Database target remains `022 roles_permissions`; no new SQL migration is required.

## Schedule v2.16.0 — Roles & Permissions Engine

Adds role templates, permission matrix, field-level access controls, scope-aware permissions, and approval authority previews. New SQL migration: `022_roles_permissions_schema.sql`.

## Schedule v2.16.0 — Supervisors & Organizational Hierarchy

- Added supervisor hierarchy preview.
- Added hybrid supervisor scope by employee, group, position, department, division, and location.
- Added SQL migration 021 supervisor hierarchy.

# Schedule v2.16.0 — Employee Timeline & Audit Trail

Current Schedule release adds employee profile self-service controls and overview live-feature cleanup.

Database migration required after upload: `019_employee_profile_self_service_schema.sql`.


## Schedule v2.12.0 — Calendar Views + Schedule Footer

- Added week and day calendar views using admin-defined calendar shortcodes.
- Added lightweight Schedule-specific footer across /schedule/ pages.
- Added Calendar View adapter, repository, service, API contract, data, and SQL foundation.
- Fixed overview page version drift.

# Signal Schedule

Current Version: v2.16.1

Signal Schedule is an admin-first staffing and scheduling platform foundation. v2.8.0 adds the Training & Certifications foundation for qualification-aware staffing, expiration warnings, and assignment restrictions.

**Current Version: v2.16.1

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


## Current Release

Schedule v2.8.0 — Training & Certifications

Adds shift trade and swap request foundation with coverage impact checks and admin review preview.


## Current Focus — v2.10.0

The Benefit Ledger links optional shift requirements to Training & Certifications so the system can decide whether an employee is eligible to fill a qualified role such as Fire Dispatcher, Police Radio, NCIC desk, or Calltaking.


## Schedule v2.11.0 — Calendar Shortcode Admin Controls

Adds admin-managed compact calendar codes and database migration tracking guidance. After uploading v2.11.0, run migrations 004 through 017 in order.
