## v0.17.1 — UI Debt Audit

- Removed dashboard-style foundation preview panels for Analytics, Notifications, and Goal Mode.
- Kept underlying foundation concepts in documentation, text output, roadmap, and data-model planning.
- Reduced render registry surface area to prevent repeated missing-renderer failures.
- Added Rule 23 direction: foundation releases should not create new preview panels unless the UI itself is the release purpose.
- Validated every render registry entry against an actual render function before packaging.

## v0.17.0 — Goal Mode Foundation

- Added Goal Mode Foundation concepts for optimization goals, tradeoffs, recommendations, and audit examples.
- Fixed missing notification renderer issue from v0.16.0.
