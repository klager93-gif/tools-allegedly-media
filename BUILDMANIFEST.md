# Signal Labs Build Manifest

**Current package:** Full Root Cleanup + Schedule v2.4.0 — Overtime Opportunity Board Foundation  
**Build date:** 2026-06-13

## Scope

Full repository replacement package prepared from the user's local copy with Schedule v2.4.0 applied and Schedule-owned infrastructure contained inside `schedule/`.

## Structural cleanup

Removed misplaced root-level Schedule infrastructure duplicates:

- `adapters/`
- `api/`
- `data/`
- `repositories/`
- `services/`

Removed misplaced root-level Schedule page duplicates:

- `assignments.html`
- `employees.html`
- `leave.html`
- `leave-requests.css`
- `leave-requests.js`
- `open-shifts.css`
- `open-shifts.html`
- `open-shifts.js`
- `reports.html`
- `schedule-calendar.css`
- `schedule-calendar.js`
- `schedule-nav.css`
- `schedule.html`
- `script.js`
- `settings.html`
- `staffing.html`
- `style.css`

Canonical copies now live under `schedule/`.

## Exclusions

- `.git/`
- macOS resource forks (`._*`)
- `.DS_Store`
- `__MACOSX/`
- prior release/archive ZIPs

## Validation

- Verified root homepage remains Signal Labs Home (`index.html`, v0.9.9.6)
- Verified Schedule visible version files are v2.4.0
- Verified Schedule-specific adapters/API/data/repositories/services exist under `schedule/`
- Verified no root-level `adapters/`, `api/`, `data/`, `repositories/`, or `services/` directories remain
- Verified no misplaced Schedule page files remain at repository root
- Ran JavaScript syntax checks on root/global/tool scripts
- Ran ZIP integrity check
