## v3.3.4 — Theme Engine Completion & Color Refinement

- Refined Midnight, Light, Slate, CAD Dark, and High Contrast theme color tokens.
- Improved panel depth, table striping, hover states, button styling, and status color consistency.
- Preserved the v3.3.3 full-replacement app shell and connected flyout navigation.
- No database migration required.

## v3.3.3 — Full Replacement UI Stabilization

- Removed legacy global/style/schedule-nav/footer references from Schedule HTML pages so app-shell styling owns the UI.
- Rebuilt Schedule overview into desktop application dashboard.
- Normalized app-shell/footer visible versioning.
- Cleaned AppleDouble/macOS packaging files for full-folder replacement.
- No database migration required.

## Signal Schedule v3.3.3 — UI Drift & Approval Copy Hotfix

- Normalized Schedule visible version and cache-busting metadata to v3.3.3.
- Updated Schedule file header metadata to reduce false version-drift signals.
- Clarified Shift Trades approval routing: both affected supervisors must approve when employees report to different supervisors, unless scheduling/admin authority approves both sides.
- Excluded `.git`, `__MACOSX`, `.DS_Store`, and AppleDouble `._*` files from the release package.
- Database migration required: No.

## v3.3.1 — Version Drift Hotfix

- Removed visible old release labels from Schedule pages.
- Normalized Schedule page `data-signal-version` values to v3.3.1.
- Updated Schedule app shell/footer defaults and cache-busting to v3.3.1.
- Kept internal migration, adapter, service, repository, and historical changelog version references intact.
- No database migration required.


## v3.3.0 — Theme Engine Foundation

- Added theme picker and persistent client-side theme preference.
- Added compact flyout navigation for desktop admin workflow.
- No database migration required.

## v3.3.0 — Desktop UX Refinement

- Updated Schedule app-shell styling and navigation behavior for connected flyout panels.
- Set Midnight as the default Schedule theme when no user preference exists.
- No database migration required.
