# Signal Schedule v4.6.1 Build Manifest

Package: `signal-schedule-v4.6.1-full-replacement.zip`
Build date: 2026-06-14
Package type: Full replacement
Source: Signal Schedule v4.6.0 full replacement

## Summary

Signal Schedule v4.6.1 is an employee portal navigation hotfix. It fixes nested `/schedule/employee/` navigation paths, surfaces Saved Schedules in the rebuilt app shell navigation, fixes employee portal active state detection, and cleans View As group labels.

## SQL

No SQL migration required. This release continues using migration 044 from v4.4.0/v4.6.0.

## Validation

- JavaScript syntax checks passed for `schedule/app-shell.js` and employee portal scripts.
- Employee portal nested navigation paths were reviewed for `/schedule/employee/` pages.
- Saved Schedules is included in the Scheduling/Calendar nav group.
- Package junk excluded: `.git`, `__MACOSX`, `._*`, `.DS_Store`.
