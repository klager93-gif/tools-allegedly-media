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
