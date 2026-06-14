# Employee Portal Navigation Hotfix — v5.1.0

This hotfix corrects app-shell navigation when Schedule pages are loaded from nested employee portal paths such as `/schedule/employee/index.html`.

## Fixes

- Root Schedule links now resolve with `../` when rendered inside `/schedule/employee/`.
- Active navigation detection now uses the full Schedule-relative path, not only the current filename.
- Schedule History is included in the Scheduling/Calendar nav group.
- View As group labels are formatted for users instead of exposing internal values such as `shiftGroup`.

## Database

No database migration is required.
