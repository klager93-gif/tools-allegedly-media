## v2.24.1 — Full-Replace Cleanup & Drift Audit

- Normalizes Schedule navigation/footer drift.
- Keeps `shift-trades.html` as the canonical trade UI.
- Leaves `trades.html` only as a redirect compatibility shim.
- Excludes `.git`, `__MACOSX`, and AppleDouble `._*` files from release packaging.
- No database migration required.

# Signal Schedule v2.24.0 Build Manifest

## Release

Signal Schedule v2.24.0 — Shift Trades UI

## Database Migration Required

Yes. Run `schedule/api/coolify/sql/030_shift_trades_ui_schema.sql`.

Expected newest migration row: `030 | shift_trades_ui`.

## Primary Files Changed

- `schedule/trades.html`
- `schedule/shift-trades.html`
- `schedule/shift-trades.css`
- `schedule/shift-trades.js`
- `schedule/data/shift-trades-preview.json`
- `schedule/adapters/JsonShiftTradeAdapter.js`
- `schedule/repositories/ShiftTradeRepository.js`
- `schedule/services/ShiftTradeService.js`
- `schedule/api/contracts/shift-trades.read.schema.json`
- `schedule/api/coolify/sql/030_shift_trades_ui_schema.sql`
- `schedule/api/coolify/server.js`

## Validation

- JavaScript syntax checked.
- JSON parsed.
- HTML asset references checked.
- ZIP integrity checked.

---

# Signal Schedule v2.23.0 Build Manifest

## Release

Signal Schedule v2.23.0 — OT Volunteer Board Foundation

## Database Migration Required

Yes. Run `schedule/api/coolify/sql/029_ot_volunteer_board_schema.sql`.

Expected newest migration row: `029 | ot_volunteer_board_foundation`.

## Primary Files Changed

- `schedule/ot-volunteer-board.html`
- `schedule/ot-volunteer-board.css`
- `schedule/ot-volunteer-board.js`
- `schedule/data/ot-volunteer-board-preview.json`
- `schedule/adapters/JsonOtVolunteerBoardAdapter.js`
- `schedule/repositories/OtVolunteerBoardRepository.js`
- `schedule/services/OtVolunteerBoardService.js`
- `schedule/api/contracts/ot-volunteer-board.read.schema.json`
- `schedule/api/coolify/sql/029_ot_volunteer_board_schema.sql`
- `schedule/api/coolify/server.js`
- Schedule navigation and documentation files

## Validation

- JavaScript syntax checked.
- JSON parsed.
- HTML asset references checked.
- ZIP integrity checked.
