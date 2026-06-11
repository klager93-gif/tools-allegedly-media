# Signal Schedule

Signal Schedule is a scheduling tool for Signal Labs.

## Version

v0.1.2 planning docs on top of the v0.1.1 logic sandbox.

## Current Purpose

This release remains a logic sandbox, not the final scheduling system. It is meant to prove the schedule model before PHP, database tables, logins, admin roles, employee accounts, month publishing, and permissions are added.

The current planning direction is to build Signal Schedule as a small scheduling application instead of a single-page spreadsheet replacement.

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

- Employees
- Users
- Roles and permissions
- Shifts
- Schedule patterns
- Employee pattern assignments
- Time off
- Availability
- Manual overrides
- Published schedule periods
- Audit logs

## Important Limitation

This version still uses browser local storage. It is temporary by design. Future versions should move to a PHP/database model after the schedule logic is clearer.

See `ROADMAP.md` for version planning and `DATABASE-PLAN.md` for backend planning notes.
