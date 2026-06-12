# Build Manifest — Signal Schedule v0.19.1 Pre-Database Safety Audit

- Source ZIP: `signal-labs.zip`
- New ZIP: `signal-labs-v0.19.1-pre-database-safety-audit.zip`
- Release type: safety audit / pre-database readiness / source cleanup
- Build date: 2026-06-12

## Build notes

- Audited the user-supplied live/local source tree.
- Updated Schedule version references to v0.19.1.
- Added pre-database safety audit documentation.
- Added `/schedule/` deprecation audit documentation.
- Added PHP/MySQL starter planning documentation.
- Excluded macOS metadata files and `.git/` internals from the release package.
- Added no new dashboard preview panels.
- Added no new render registry entries.

## Validation

- JavaScript syntax checked with `node --check schedule/script.js`.
- Render registry validation passed.
- Every registered renderer resolves to a defined function.
- Every safeRender string callback resolves to a registered function.
- Every safeRender string callback resolves to a defined function.
- Confirmed no AppleDouble `._*` files or `__MACOSX/` metadata in the package tree.
- ZIP integrity checked after packaging.
