# Restore Instructions

## Release

Home v0.9.0 — Public Pages Architecture

## Restore

1. Restore the external backup created before upload.
2. Replace Home root files and `assets/global.css` / `assets/global.js` with the previous release files.
3. Remove the new public page directories if rolling back fully:
   - `changelog/`
   - `roadmap/`
   - `how-to/`
   - `report-issue/`
   - `request-feature/`
   - `contact/`
   - `about/`
   - `privacy/`
   - `terms/`
   - `status/`
4. Redeploy from GitHub.
