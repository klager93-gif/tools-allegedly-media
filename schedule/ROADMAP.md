# Signal Schedule Roadmap

## Current Version

v0.1.1 — Logic sandbox with text output, rule warnings, local storage, and month planning notes.

## Direction

Signal Schedule should become a small scheduling application, not a single-page spreadsheet replacement.

The core model should be:

- Employees are people who can appear on a schedule.
- Users are login accounts and should stay separate from employees.
- Shifts are reusable blocks of time.
- Patterns generate expected schedules.
- Overrides handle real-world exceptions.
- Time off blocks or replaces scheduled work.
- Published schedules should eventually become stable records.

## v0.1.2 — Planning Documentation Release

Goal: lock the roadmap before adding more interface or backend complexity.

- Confirm the future app structure around employees, shifts, patterns, assignments, time off, and overrides.
- Expand the database plan to include schedule patterns, employee pattern assignments, overrides, published schedule periods, shift swaps, and notifications.
- Define the near-term rule that schedules should be generated from pattern + start date + overrides rather than prefilled day rows forever.
- Clarify the next coding step: improve the local sandbox only enough to test schedule logic.

## v0.1.3 — Local Sandbox Cleanup

Goal: make the current browser-only tool easier to test before backend work.

- Improve plain-text schedule output formatting.
- Add assignment editing.
- Add duplicate-assignment warnings.
- Add notes per assignment.
- Add copy day and copy week actions.
- Add clearer empty states.
- Add better sample data for dispatch-style coverage testing.

## v0.2.0 — Date-Based Schedule Model

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

## v0.4.0 — Time Off and Availability Conflicts

Goal: make the schedule react to real-world absences.

- Add unavailable/time-off entries.
- Warn when a scheduled employee has time off.
- Show time off in schedule output.
- Add coverage warnings after absences are applied.
- Prepare for later Time Off tool integration.

## v0.5.0 — Month View and Publishing Concept

Goal: introduce the future manager workflow.

- Add full month view.
- Add draft/published schedule states conceptually.
- Add print-friendly month output.
- Add export-ready plain text.
- Add schedule period notes.

## v0.6.0+ — PHP/Database Backend

Goal: move from local-only planning to shared, persistent scheduling.

- Add PHP/database tables after the local model is proven.
- Separate employees, users, roles, shifts, patterns, time off, overrides, and published periods.
- Add admin login.
- Add role-based permissions.
- Add audit logging.
- Add publish/unpublish workflow.
- Add data migration from local sandbox if useful.

## Later

- Department/location support.
- Employee self-service availability.
- Shift trade requests.
- Manager approval workflow.
- Notifications.
- CSV export.
- PDF export.
- iCal export.
- Paycheck integration.
- Time Off integration.
