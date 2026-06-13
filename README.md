# Signal Labs Tools

**Current package:** Schedule v2.3.1 — Version Sync + API File Integrity Fix

This repository contains the Signal Labs tool set, including Schedule, Paycheck, Overtime, Time Off, and shared site assets.

## Current Schedule release included in this package

**Schedule v2.3.1** is a cleanup release. It does not add a new workflow. It synchronizes displayed Schedule versions, restores missing API/data seed files referenced by the Schedule app and Coolify API skeleton, and removes packaging junk from the release ZIP.

## Schedule pages

- `schedule/index.html` — foundation/admin overview
- `schedule/schedule.html` — calendar preview
- `schedule/employees.html` — employees placeholder/foundation page
- `schedule/assignments.html` — assignments placeholder/foundation page
- `schedule/staffing.html` — minimum staffing foundation page
- `schedule/leave.html` — leave request foundation page
- `schedule/open-shifts.html` — open shifts / VOT foundation page
- `schedule/reports.html` — reports placeholder/foundation page
- `schedule/settings.html` — settings placeholder/foundation page

## Production status

Schedule remains an active-development prototype. The current UI is read-only/preview-oriented for most advanced modules. Employee write routes in the API skeleton remain protected and disabled unless intentionally enabled with environment variables.
