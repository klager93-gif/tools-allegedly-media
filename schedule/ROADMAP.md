# Signal Schedule Roadmap

## Current Version

v0.2.0 — Core Engine Blueprint for people, rules, patterns, events, benefits, coverage, and generated schedule output.

## Development Rule: Rule 23 — Version Consistency

Whenever a tool version changes:

- Update all visible version references.
- Update status cards.
- Update footer versions.
- Update hero text where applicable.
- Update cache-busting query strings for changed tool files.
- Search the entire tool for stale version references.
- No page should display an older version than the current release.
- If a global component or shared status area affects multiple pages, update all affected pages together.

## Direction

Signal Schedule should become a policy-aware staffing application, not a spreadsheet replacement and not a dispatch-only tool.

The system should eventually work for dispatch centers, police departments, fire departments, EMS agencies, hospitals, nursing units, manufacturing teams, retail teams, and general shift-based companies.

The core model should be:

- Employees are people who can appear on a schedule.
- Users are login accounts and should stay separate from employees.
- Agencies have configurable rules.
- Shifts are reusable blocks of time.
- Patterns generate expected schedules.
- Events represent real-world changes such as overtime, absence, training, trades, and mandates.
- Overrides handle exceptions.
- Coverage rules determine whether staffing is acceptable.
- Rule explanations show why decisions were made.
- Published schedules should eventually become stable records.

## v0.1.2 — Planning Documentation Release

Goal: lock the roadmap before adding more interface or backend complexity.

- Confirm the future app structure around employees, shifts, patterns, assignments, time off, and overrides.
- Expand the database plan to include schedule patterns, employee pattern assignments, overrides, published schedule periods, shift swaps, and notifications.
- Define the near-term rule that schedules should be generated from pattern + start date + overrides rather than prefilled day rows forever.
- Clarify the next coding step: improve the local sandbox only enough to test schedule logic.

## v0.1.3 — Rule Engine and Agency Policy Planning

Goal: add the planning layer that explains why scheduling decisions happen.

- Add `RULE-ENGINE.md` as a standing architecture guide.
- Reframe Signal Schedule as an agency-flexible staffing engine.
- Add rule engine planning for coverage, overtime, mandation, benefits, bidding, fairness, qualifications, availability, and explanations.
- Add future support for agency policy templates instead of hard-coded dispatch-only rules.
- Add mandate rotation and mandate exception planning.
- Add benefit time accrual and benefit ledger planning.
- Add fairness and audit-trail requirements.

## v0.1.4 — Version Consistency Update

Goal: keep visible release information aligned after every Schedule release.

- Add Rule 23: Version Consistency.
- Update visible Schedule version references to v0.1.4.
- Update Schedule page metadata, status text, footer version, cache-busting, and text output version.
- Preserve local sandbox data while moving the active storage key forward.
- Reinforce the rule that no page should advertise an outdated version after a release.

## v0.1.5 — Local Sandbox Cleanup

Goal: make the current browser-only tool easier to test before backend work.

- Improve plain-text schedule output formatting.
- Add assignment editing.
- Add duplicate-assignment warnings.
- Add notes per assignment.
- Add copy day and copy week actions.
- Add clearer empty states.
- Add better sample data for dispatch-style coverage testing.
- Keep rule warnings separated from display code where practical.

## v0.2.0 — Core Engine Blueprint

Goal: turn Signal Schedule from a schedule page into the beginning of a staffing engine.

- Add visible Core Engine Blueprint panel.
- Expand local mock data around people, rules, patterns, events, benefits, and coverage.
- Add starter employee model fields for status, mandate eligibility, exceptions, and benefit balances.
- Add starter rule profiles, schedule patterns, employee-pattern assignments, schedule events, benefit ledger entries, and coverage requirements.
- Update text output so it explains the model and future backend boundary.
- Keep local storage until the model is proven.
- Do not add login, database storage, admin roles, publishing workflow, or final automated generation yet.

## v0.2.1 — Date-Based Schedule Model

Goal: move from weekday-only planning to actual dates.

- Build assignments around real calendar dates.
- Add true week selection.
- Add basic month planning view.
- Add working/off indicators per employee per date.
- Add conflict warnings for duplicate assignment, unavailable employee, and time-off overlap.
- Keep local storage until the model is proven.

## v0.3.0 — Patterns and Rotations

Goal: support real scheduling systems without hand-entering every day.

- Add reusable schedule patterns.
- Support common rotations such as 24/48, 48/96, 4-on/4-off, and 2-2-3 style patterns.
- Assign a pattern to an employee with a start date.
- Generate expected workdays from pattern logic.
- Let manual overrides replace generated assignments.
- Add pattern preview before applying.

## v0.4.0 — Event System, Time Off, and Availability Conflicts

Goal: make the schedule react to real-world events.

- Treat work, overtime, training, absence, trades, and mandates as schedule events.
- Add unavailable/time-off entries.
- Warn when a scheduled employee has time off.
- Show time off in schedule output.
- Add coverage warnings after absences are applied.
- Prepare for later Time Off and Benefit Time integration.

## v0.5.0 — Coverage Engine

Goal: make staffing requirements visible and explainable.

- Add coverage requirements by hour.
- Add coverage requirements by position or qualification.
- Show shortage and surplus warnings.
- Explain why a coverage block is red, yellow, or green.
- Prepare for day-view coverage heatmaps.

## v0.6.0 — Benefit Time and Accrual Planning

Goal: track balances with auditable history.

- Add benefit types such as vacation, sick, personal, comp, holiday, admin leave, and bereavement.
- Add accrual rules such as monthly, per paycheck, annual bank, and seniority-tier accrual.
- Add manual adjustments.
- Add projected balances.
- Use a ledger approach instead of silently overwriting balances.

## v0.7.0 — Overtime and Mandation Planning

Goal: separate voluntary overtime from forced overtime.

- Add voluntary OT tracking.
- Add mandate rotation list.
- Track mandate counts and last mandated dates.
- Add temporary and permanent mandate exceptions.
- Add skip reasons and admin override notes.
- Prepare for fairness metrics.

## v0.8.0 — Day View and Supervisor Coverage View

Goal: create the primary operational view.

- Add modern day timeline view.
- Add sticky employee column.
- Add pill-style events.
- Add filters by position, group, location, or qualification.
- Add coverage heatmap and warnings.

## v0.9.0 — Personal Portal Concept

Goal: separate employee self-service from supervisor scheduling.

- My Schedule.
- My Time Off.
- My Benefit Balances.
- My Overtime.
- My Trades.
- My Bids.
- My Profile.

## v1.0.0 — Month View and Publishing Concept

Goal: introduce the future manager workflow.

- Add full month view without copying spreadsheet-style month grids.
- Add draft/published schedule states conceptually.
- Add print-friendly month output.
- Add export-ready plain text.
- Add schedule period notes.

## v1.1.0+ — PHP/Database Backend

Goal: move from local-only planning to shared, persistent scheduling.

- Add PHP/database tables after the local model is proven.
- Separate employees, users, roles, agencies, shifts, patterns, events, time off, overrides, benefits, mandates, bids, and published periods.
- Add admin login.
- Add role-based permissions.
- Add audit logging.
- Add publish/unpublish workflow.
- Add data migration from local sandbox if useful.

## Later

- Agency policy templates.
- Department/location support.
- Employee self-service availability.
- Shift trade requests.
- Manager approval workflow.
- Bidding module for shift bids, vacation bids, and overtime opportunities.
- Fairness engine for weekends, holidays, overtime, mandates, callbacks, and denials.
- Qualification/certification tracking.
- Fatigue warnings.
- Notifications.
- CSV export.
- PDF export.
- iCal export.
- Paycheck integration.
- Time Off integration.

## Standing Architecture Rule

Do not build Signal Schedule as a prettier version of Schedule Express.

Build it as:

```text
People + Patterns + Events + Rules + Coverage + Explanations
```

with day, week, month, personal, and supervisor views as windows into the same staffing engine.
