# Signal Schedule

Signal Schedule is a scheduling tool for Signal Labs.

## Version

v0.1.1

## Current Purpose

This release is a logic sandbox, not the final scheduling system. It is meant to prove the schedule model before PHP, database tables, logins, admin roles, employee accounts, month publishing, and permissions are added.

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

## Important limitation

This version still uses browser local storage. It is temporary by design. Future versions should move to a PHP/database model after the schedule logic is clearer.

See `DATABASE-PLAN.md` for backend planning notes.
