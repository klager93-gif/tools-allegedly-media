# Signal Schedule v3.3.3 — Full Replacement UI Stabilization

Schedule-only full replacement cleanup.

Database migration required: No.

## Main Fix

Schedule pages were still loading legacy global/site and old Schedule CSS/JS files in addition to the new desktop app shell. This caused the centered website layout and long card stacks to remain visible even after v3.3.

## Changed

- Removed legacy CSS/JS references from Schedule HTML pages.
- Rebuilt the Schedule overview page.
- Normalized app-shell footer/version behavior.
- Strengthened app-shell layout overrides.
- Cleaned release packaging junk.
