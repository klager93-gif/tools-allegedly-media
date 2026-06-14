# Signal Schedule v3.1.0 Build Manifest

Release: Signal Schedule v3.1.0 — Desktop Application UI System
Date: 2026-06-14
Database migration required: No

## Summary

This release converts Schedule from the earlier centered website-style layout to a desktop-first application shell across all Schedule pages.

## Key Changes

- Added `schedule/app-shell.css`.
- Added `schedule/app-shell.js`.
- Added `schedule/weekly-schedule.html` compatibility redirect to `weekly-board.html`.
- Updated Schedule HTML pages to load the shared app shell.
- Grouped Schedule navigation into Command, People, Staffing, Requests, and Rules & Admin sections.
- Normalized app version metadata to v3.1.0 for Schedule pages.
- Preserved role-based panels on canonical pages instead of creating duplicate `-admin` pages.

## Validation

- JS syntax checked.
- JSON parsed.
- HTML asset references checked.
- ZIP integrity checked.
