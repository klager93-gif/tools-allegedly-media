- Verify Signal Schedule v0.11.1 Fairness Engine Foundation after deployment.
- Next planned architecture release: Signal Schedule v0.12.0 — Explainability Foundation.
- v0.11 adds fairness metrics, seniority-ledger planning, mandate/OT equalization concepts, and history-based distribution previews.

- Verify Signal Schedule v0.10.0 Schedule Views Foundation after deployment.
- Next planned release: Signal Schedule v0.11.1 — Fairness Engine Foundation.

- Verify Signal Schedule v0.9.0 Coverage Engine Foundation after deployment.
# Signal Labs Roadmap

## Immediate

- Verify Signal Labs Home v0.9.9.6 Release Archive Standard after deployment.
- Confirm Home/public page footer versions and shared asset cache references are aligned.
- Review text output and warnings before expanding visual schedule UI.
- Keep schedule logic separated from UI display code wherever practical.

## Upcoming

- Signal Schedule: review coverage engine foundation using rule-aware minimum, target, maximum, open spots, and explanations before schedule views.
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


### v0.3.0

- Agency Profile Foundation.
- Added configurable agency/company settings.
- Added custom vocabulary planning for departments, locations, positions, shift groups, qualifications, benefit types, and exception types.
- Added shift definitions and coverage minimum/target/maximum planning.


### v0.4.0

- Employee Profile Foundation.
- Added rule-aware employee profile model using agency-defined vocabulary.
- Added sample identity, agency assignment, eligibility, exceptions, qualifications, and benefit snapshots.
- Added employee profile cards and detail preview.
- No employee database, login, admin save workflow, or CRUD was added.

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


### v0.5.0

- Pattern Foundation.

### v0.8.0

- Benefit Ledger Foundation.
- Model vacation, sick, overtime, mandation, training, trades, callbacks, and administrative changes as schedule events.
- Added pattern templates and cycle-day preview.
- Added short days, short weeks, paid minutes, break rules, and agency week-start display behavior.
