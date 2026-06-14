# Signal Schedule v3.3.3 Build Manifest

Release: Signal Schedule v3.3.3 — Full Replacement UI Stabilization
Date: 2026-06-15
Database migration required: No

## Summary

Deep cleanup of the uploaded full-replacement folder after the v3.3 UI work. The issue was caused by Schedule pages still loading older global/site and legacy Schedule CSS/JS files alongside the new desktop app shell. This allowed old centered website styles and old page content patterns to fight the v3 app layout.

## Key Changes

- Removed legacy `../assets/global.css`, `../assets/global.js`, `style.css`, `schedule-nav.css`, `footer.css`, and `components/footer.js` references from Schedule HTML pages.
- Kept `app-shell.css` and `app-shell.js` as the Schedule UI source of truth.
- Rebuilt `schedule/index.html` into a desktop application overview instead of the old long logic sandbox page.
- Added stronger app-shell layout stabilization for wide desktop workspace, cards, dashboard grids, footer, and legacy CSS variable mapping.
- Normalized version/cache strings to v3.3.3.
- Removed macOS/AppleDouble packaging junk from the full replacement package.
- No Paycheck, Overtime, Timeoff, or root shared asset changes.

## Files Affected

- `schedule/*.html`
- `schedule/app-shell.css`
- `schedule/app-shell.js`
- `schedule/LATEST_RELEASE.md`
- `schedule/README.md`
- `schedule/ROADMAP.md`
- `schedule/CHANGELOG.md`
- `schedule/PUBLIC_CHANGELOG.md`
- `schedule/ADMIN_CHANGELOG.md`
- `schedule/MASTER-CHANGELOG.md`
- `schedule/MASTER-ROADMAP.md`
- `schedule/BUILDMANIFEST.md`
- `schedule/FILEMANIFEST.md`

## Not Touched

- `paycheck/`
- `overtime/`
- `timeoff/`
- root `assets/`

## Validation

- HTML asset references checked.
- JavaScript syntax checked.
- JSON files parsed.
- ZIP integrity checked.
- Packaging junk excluded.
