## Signal Schedule v3.3.2 — UI Drift & Approval Copy Hotfix

- Normalized Schedule visible version and cache-busting metadata to v3.3.2.
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

- Improved Schedule desktop navigation and added visual theme support.

## v3.3.0 — Desktop UX Refinement

- Replaced separated pill-style sidebar flyouts with connected, box-style flyout panels.
- Improved desktop application navigation density and hover/focus behavior.
- Kept changes Schedule-only with no database migration.
