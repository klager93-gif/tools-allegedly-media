# Build Manifest — Signal Schedule v2.4.0

## Release

Signal Schedule v2.4.0 — Overtime Opportunity Board Foundation

## Release date

2026-06-13

## Package scope

Schedule tool release. Replace `/schedule/` only.

## Primary files changed

- `open-shifts.html`
- `open-shifts.js`
- `open-shifts.css`
- `services/OpenShiftService.js`
- `data/open-shifts-preview.json`
- `data/vot-requests-preview.json`
- `index.html`
- `script.js`
- `README.md`
- `CHANGELOG.md`
- `ROADMAP.md`
- `RELEASE-v2.4.0.md`
- `FILEMANIFEST.md`
- `BUILDMANIFEST.md`

## Validation

- `node --check schedule/open-shifts.js`
- `node --check schedule/services/OpenShiftService.js`
- `node --check schedule/adapters/JsonOpenShiftAdapter.js`
- `node --check schedule/repositories/OpenShiftRepository.js`
- `node --check schedule/script.js`
- ZIP excludes `.git`, `.DS_Store`, `__MACOSX`, and Apple resource fork files.
