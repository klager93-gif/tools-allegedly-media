# Signal Labs Home Changelog

## v0.8.1 — Design System Cleanup

**Date:** 2026-06-10

### Changes

- Removed the public-facing Design System Foundation card from the Home page.
- Updated Home visible build metadata to `v0.8.1`.
- Updated Home theme text to `Design System Cleanup`.
- Preserved the shared design-system foundations added in v0.8.0 for future tool adoption.
- Kept shared asset cache-busting references at `v0.8.0` because no shared asset content changed in this release.
- No calculator logic changes.
- No shared asset content changes.

---


## v0.8.0 — Signal Labs Design System

**Date:** 2026-06-10

### Changes

- Introduced the Signal Labs Design System foundation.
- Updated `assets/global.css` to define shared visual patterns for:
  - global navigation
  - metadata-aware footer styling
  - tool action bars
  - buttons
  - cards
  - pills
  - empty states
  - modals and dialogs
  - toast notifications
- Updated `assets/global.js` to provide shared helpers for:
  - navigation
  - page metadata
  - optional global footer generation
  - text modals
  - modal/dialog utilities
  - toast notifications
  - shared action bar validation
- Updated Home page to opt into metadata-driven global layout behavior.
- Added Home `PUBLIC_CHANGELOG.md` and `ADMIN_CHANGELOG.md` split.
- Pointed the Home footer changelog behavior toward the public changelog.
- Added design-system standards language to UX, Script, Workflow, Versioning, and master standards files.
- No calculator logic changes.
- Tool adoption is intentionally gradual and should happen in future tool-specific releases.

---

## v0.7.1 — Version Synchronization

**Date:** 2026-06-10

- Corrected Home page visible version references.
- Corrected Home footer versioning.
- Added standards requiring affected-page version sweeps before release.
- Added footer change discipline.

---

## v0.7.0 — Standards Architecture

**Date:** 2026-06-10

- Introduced the Signal Labs standards architecture.
- Updated `STANDARDS.md` into the master constitution.
- Added dedicated standards files for UX, script, documentation, versioning, and workflow.
- Added `Review broadly. Verify specifically.`

---

## v0.6.2 — Standards v2.0

- Reorganized Signal Labs Development Standards into a clearer priority order.
- Added GitHub-first workflow guidance.
- Expanded validation and failed-release handling.
