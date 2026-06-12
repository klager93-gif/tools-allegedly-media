# How to Use Signal Schedule

1. Open `/schedule/`.
2. Add employees and choose a basic role.
3. Add shifts with a name, start time, end time, and minimum staff count.
4. Set sandbox rules for max weekly hours and minimum rest gap.
5. Use the Weekly Builder to choose a day, shift, and person.
6. Review the weekly board.
7. Review Coverage Summary and Rule Warnings.
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
