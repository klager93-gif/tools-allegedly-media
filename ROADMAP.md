- Verify Signal Schedule v0.2.1 Pattern and Coverage Rule Planning after deployment.
# Signal Labs Roadmap

## Immediate

- Verify Signal Labs Home v0.9.9.6 Release Archive Standard after deployment.
- Confirm Home/public page footer versions and shared asset cache references are aligned.
- Review text output and warnings before expanding visual schedule UI.
- Keep schedule logic separated from UI display code wherever practical.

## Upcoming

- Signal Schedule: local sandbox cleanup, assignment editing, duplicate warnings, copy day/week, and notes.
- Signal Schedule: true date-based model and month view planning.
- Signal Schedule: schedule patterns, rotations, overrides, time off conflicts, and publishing concept.
- Signal Schedule: future rule-engine planning around agency policies, coverage, fairness, mandation, benefits, bidding, and explanations.
- Overtime design-system migration.
- Time Off design-system migration.
- Shared report system.

## Signal Schedule

### v0.1.0

- Local-first weekly schedule builder MVP.

### v0.1.1

- Logic sandbox.
- Employee roles.
- Minimum shift staffing.
- Rule warnings.
- Text output.
- Month planning preview.
- Database planning document.

### v0.1.2

- Roadmap and architecture planning.
- Expanded schedule database plan.
- Pattern + start date + overrides model.
- No duplicate documentation files created.

### v0.1.3

- Rule engine planning.
- Agency policy templates concept.
- Mandation and mandate exception planning.
- Benefit time accrual and ledger planning.
- Bidding, fairness, qualifications, and decision explanation planning.
- Expanded database plan for agency-flexible staffing systems.

### v0.1.4

- Version consistency update.
- Rule 23 added to release standards.
- Visible Schedule version references updated to the current release.
- Status card and footer version alignment.

### Planned

- Local sandbox cleanup.
- Assignment editing, copy week/day, notes, shift labels, and time-off warnings.
- True date-based month view.
- Pattern/rotation support.
- Coverage engine.
- Benefit time module.
- Mandation module.
- Later: PHP backend, login, admin roles, employee roles, permissions, publishing, cloud sync, CSV/PDF export.


## Release Management

### v0.9.9.6

- Added Rule 25: Build Response Standard.
- Added Rule 26: Release Archives Are Backups.
- Retired duplicate normal backup-folder workflow.
- Standardized dated `Releases/` folders as the local archive structure.
- Preserved emergency manual backups only for risky experiments, manual edits outside Git, temporary sandboxes, or unreleased testing.
