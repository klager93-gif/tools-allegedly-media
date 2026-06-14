# Signal Schedule v2.26.0 File Manifest Addendum

Adds Seniority Engine Foundation files and migration 032.

- schedule/seniority.html
- schedule/seniority.css
- schedule/seniority.js
- schedule/data/seniority-engine-preview.json
- schedule/adapters/JsonSeniorityEngineAdapter.js
- schedule/repositories/SeniorityEngineRepository.js
- schedule/services/SeniorityEngineService.js
- schedule/api/contracts/seniority-engine.read.schema.json
- schedule/api/coolify/sql/032_seniority_engine_schema.sql
- schedule/api/coolify/server.js

# Signal Schedule v2.24.0 File Manifest Addendum

Adds Shift Trades UI files and migration 030.

- schedule/trades.html
- schedule/shift-trades.html
- schedule/shift-trades.css
- schedule/shift-trades.js
- schedule/data/shift-trades-preview.json
- schedule/api/coolify/sql/030_shift_trades_ui_schema.sql

---


## v2.22.0 — Leave Banks Foundation

- Adds Leave Banks Foundation for vacation, sick, personal, comp, holiday, and training balances.
- Adds preview data, read-only service/repository/adapter boundaries, API contract, page, and endpoint.
- Adds Postgres migration 028_leave_banks_foundation_schema.sql.
- Production balance writes remain disabled.

# Signal Schedule v2.21.1 File Manifest

This release is packaged as a full repository snapshot for replace-safe deployment.

## Hotfix Files

- `schedule/assignments.html`
- `schedule/assignments.css`
- `schedule/assignments.js`

## Documentation Updated

- `schedule/CHANGELOG.md`
- `schedule/README.md`
- `schedule/ROADMAP.md`
- `schedule/LATEST_RELEASE.md`
- `schedule/BUILDMANIFEST.md`
- `schedule/FILEMANIFEST.md`
- Root changelog, roadmap, README, build manifest, and file manifest

## Database

No new SQL migration. Existing v2.21.0 migration 027 remains the current database target.

## v2.23.0 Added Files

- `schedule/ot-volunteer-board.html`
- `schedule/ot-volunteer-board.css`
- `schedule/ot-volunteer-board.js`
- `schedule/data/ot-volunteer-board-preview.json`
- `schedule/adapters/JsonOtVolunteerBoardAdapter.js`
- `schedule/repositories/OtVolunteerBoardRepository.js`
- `schedule/services/OtVolunteerBoardService.js`
- `schedule/api/contracts/ot-volunteer-board.read.schema.json`
- `schedule/api/coolify/sql/029_ot_volunteer_board_schema.sql`


## Signal Schedule v2.27.0 — Assignment Generator Foundation

Adds Assignment Generator Foundation and role-based supervisor/admin panels; includes migration 033.

## v2.28.0 — Conflict Detection Foundation

Adds Conflict Detection Foundation for generated schedules and assignment drafts. Includes double-assignment, under-minimum, over-maximum, leave overlap, missing qualification, rest-rule, and manual override conflict previews; role-based employee/supervisor/admin visibility panels; read-only API contract/endpoint; and Postgres migration 034.

