# Build Manifest — Signal Schedule v2.30.0 Alpha Integration & Stability Audit

Date: 2026-06-14

## Package Type

Full-root replacement package. Preserve your local `.git/` folder if replacing a Git working directory.

## Database Migration Required

No.

## Validation

- HTML asset references checked.
- JSON parsed.
- JavaScript syntax checked.
- Release junk removed.
- ZIP integrity checked after packaging.

## Notes

This release copies all retained files, deletes unnecessary release artifacts, and normalizes Schedule footer/version metadata drift after v2.29.0.
