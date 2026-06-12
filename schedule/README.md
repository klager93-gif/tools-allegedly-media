# Signal Schedule

Signal Schedule is a scheduling and staffing tool for Signal Labs.

## Version

v0.1.4 maintenance update on top of the local logic sandbox and planning documentation.

## Current Purpose

This release remains a logic sandbox, not the final scheduling system. It is meant to prove the schedule model before PHP, database tables, logins, admin roles, employee accounts, month publishing, permissions, benefit time, mandation, bidding, and agency rule templates are added.

The current planning direction is to build Signal Schedule as a policy-aware staffing application instead of a single-page spreadsheet replacement.

## What it does now

- Add employees with basic roles
- Add reusable shifts with start/end times
- Set minimum staff per shift
- Assign people to days and shifts
- Show a weekly schedule board
- Calculate estimated scheduled hours
- Show coverage warnings
- Show max-hours warnings
- Show rest-gap warnings
- Generate plain-text schedule output
- Show a rough month planning preview
- Save data locally in the browser

## Future Model

Signal Schedule should eventually separate these concepts:

- Agencies
- Agency policy rules
- Employees
- Users
- Roles and permissions
- Shifts
- Schedule patterns
- Employee pattern assignments
- Schedule events
- Time off
- Benefit time and accrual ledgers
- Availability
- Qualifications and certifications
- Overtime
- Mandation and mandate exceptions
- Bidding
- Manual overrides
- Coverage requirements
- Fairness metrics
- Decision explanations
- Published schedule periods
- Audit logs

## Rule Engine Direction

The rule engine is a standing architecture concept for future development.

Signal Schedule should eventually be able to answer:

```text
Why was this person scheduled, skipped, awarded, denied, mandated, or warned?
```

Rules should support different agency types such as dispatch, police, fire, EMS, nursing, hospitals, manufacturing, retail, and general shift-based companies.

See `RULE-ENGINE.md` for the rule-engine planning guide.

## Important Limitation

This version still uses browser local storage. It is temporary by design. Future versions should move to a PHP/database model after the schedule logic is clearer.

See `ROADMAP.md` for version planning and `DATABASE-PLAN.md` for backend planning notes.
