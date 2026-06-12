# Signal Schedule HOWTO

## v0.11.2 Fairness Engine Foundation

Use the fairness panels to review sample fairness concepts. They are not editable database records yet.

Look for:

- Overtime minutes by employee.
- Mandation counts.
- Weekend load.
- Active exception/skip reasons.
- Seniority adjustments.

# Signal Schedule HOWTO

## v0.10.0 Schedule Views Foundation

Use the Schedule Views Foundation panels to review how the same engine could feed different screens later. These are not final layouts and are not editable database records.

The current card-heavy layout should be treated as a system inspector while the engine is being designed.


# How to Use Signal Schedule

1. Open `/schedule/`.
2. Add employees and choose a basic role.
3. Add shifts with a name, start time, end time, and minimum staff count.
4. Set sandbox rules for max weekly hours and minimum rest gap.
5. Use the Weekly Builder to choose a day, shift, and person.
6. Review the weekly board.
7. Review Coverage Summary, Coverage Engine Foundation, Open Spot Preview, and Rule Warnings.
8. Use Text Output to inspect the schedule logic in plain English.
9. Use Month Planning Notes to preview how the weekly pattern maps into a month.
10. Print or copy output when needed.

## Current Limitation

Data is saved in the browser using local storage. This is not yet a shared, login-backed scheduling system.

## Planning Notes

The current tool is intentionally text-output-first. Use it to test schedule rules before building the full month view, PHP backend, database tables, login system, employee accounts, and publishing workflow.

When planning future features, keep these concepts separate:

- Employees who appear on schedules
- Users who log in
- Shifts people can work
- Patterns that generate expected workdays
- Overrides that change generated workdays
- Time off that blocks or replaces workdays


## Planning References

- Use `ROADMAP.md` for version direction.
- Use `DATABASE-PLAN.md` for future backend structure.
- Use `RULE-ENGINE.md` when adding or changing schedule logic so rules stay explainable and agency-flexible.


## v0.2.1 Notes

v0.2.1 does not add new user-facing scheduling controls. It documents future settings for agency profiles, coverage requirements, shift patterns, display formats, paid minutes, and unpaid breaks. Use the existing sandbox only as a visual planning reference until the next feature release.


## v0.3.0 Agency Profile Preview

The Agency Profile Foundation panels show sample organization settings and vocabulary. They are not saved through an admin form yet. Use them as a planning preview for what will later become editable company/agency settings.

Review the preview for:

- Agency/company identity.
- Work week and pay period assumptions.
- Time/date display preferences.
- Positions and job titles.
- Shift groups.
- Qualifications.
- Benefit and exception types.
- Shift definitions.
- Coverage minimums, targets, maximums, and optional numbered spots.


## v0.4.0 Employee Profile Preview

The Employee Profile Foundation panels show sample people as rule-aware objects. These are not database-backed employee records yet.

Review the preview for:

- Identity and seniority fields.
- Agency assignment fields.
- Eligibility flags.
- Exceptions that affect rules.
- Qualifications and capabilities.
- Benefit snapshots.
- Rule impact notes explaining why a person may be eligible, skipped, or restricted in future modules.


## v0.5.0 Pattern Foundation Preview

The Pattern Foundation panels show sample pattern templates and cycle days. These are not editable database-backed pattern records yet.

Use the panels to review how normal days, off days, short days, paid minutes, and break rules should be represented before final schedule generation is built.


## v0.7.0 Benefit Ledger Foundation Preview

The Benefit Ledger Foundation panels show sample event types and schedule events. These are not editable database-backed event records yet.

Review the preview for:

- Event type categories.
- Coverage impact.
- Benefit impact.
- Approval and audit-trail needs.
- How events explain changes to expected pattern work.

Use this release as a planning reference only. Event creation, approval, save/load, benefit ledger automation, mandation rotation, and trade workflows are planned for later releases.


## v0.8.0 Rule Engine Preview

The Rule Engine Foundation panels are planning previews. They do not save editable policies yet.

Use the panels to review how future rules should evaluate:

- Overtime eligibility and thresholds.
- Mandation rotation, counts, skips, and exceptions.
- Benefit use and accrual rules.
- Coverage minimums, targets, and maximums.
- Fatigue/rest limits.
- Trades and bidding rules.
- Explanation and audit trail requirements.

Mandation events should add coverage and mandate history; they should not consume vacation minutes.


## v0.9.0 Coverage Engine Preview

The Coverage Engine Foundation panels are planning previews. They compare current mock assignments against agency-defined minimum, target, and maximum coverage requirements.

The preview is not a final scheduler. It does not save coverage edits to a database, but it demonstrates how future rules should identify shortages, below-target staffing, above-maximum staffing, and open numbered spots.
