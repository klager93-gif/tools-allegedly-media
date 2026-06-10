# Signal Labs Home Changelog

## v0.7.1 — Version Synchronization

**Date:** 2026-06-10

### Changes

- Updated `index.html` Home version references from `v0.6.2` to `v0.7.1`.
- Updated visible Home build label to `v0.7.1`.
- Updated visible Home theme label to `Version Synchronization`.
- Updated Home footer version to `Signal Labs · Home · v0.7.1`.
- Added Version Synchronization rules to `VERSIONING_STANDARDS.md`.
- Added Affected Page Version Sweep and Footer Change Discipline rules to `WORKFLOW_STANDARDS.md`.
- Clarified that footers should be updated when page/tool version changes, but not changed for cosmetic churn.
- Clarified that cache-busting values must be reviewed, but unchanged global assets should not be bumped solely for unrelated releases.
- No calculator logic changes.
- No shared asset content changes.

---


## v0.7.0 — Standards Architecture

**Date:** 2026-06-10

### Changes

- Introduced the Signal Labs standards architecture.
- Updated `STANDARDS.md` from a single standards file into the master constitution.
- Added dedicated standards files:
  - `UX_STANDARDS.md`
  - `SCRIPT_STANDARDS.md`
  - `DOCUMENTATION_STANDARDS.md`
  - `VERSIONING_STANDARDS.md`
  - `WORKFLOW_STANDARDS.md`
- Added daily startup requirement to review all standards files.
- Added domain-specific verification:
  - Review Script Standards before script work.
  - Review UX Standards before CSS, layout, or UI work.
  - Review Documentation Standards before documentation work.
  - Review Versioning Standards before release, cache-busting, or packaging work.
- Added principle: `Review broadly. Verify specifically.`
- Added requirement to review `WORKFLOW_STANDARDS.md` before building any files.
- Added release response format requirement: every release response must include backup reminder, backup folder name, download link, GitHub title, GitHub summary, source, validation, files changed, and build metadata.
- Formalized current GitHub/source-of-truth decisions:
  - GitHub standards are authoritative.
  - Recent user-provided ZIP standards may be temporary authority only when newer than GitHub and not yet represented in GitHub.
  - If confused, clarify; otherwise GitHub wins.
- Reinforced Home terminology in place of Root.
- No calculator logic changes.
- No shared asset changes.

---

## v0.6.2 — Standards v2.0

- Reorganized Signal Labs Development Standards into a clearer priority order.
- Added Source Preference rules and GitHub-first workflow guidance.
- Added mandatory Daily Startup Procedure comparison requirements.
- Added Trust Successful Releases and Successful Releases Become History rules.
- Expanded hotfix documentation requirements and hotfix file replacement exceptions.
- Clarified shared systems, source disclosure, validation, and failed-release handling.
- No calculator logic changes.
- No shared asset changes.

---

# Earlier Versions

See `MASTER-CHANGELOG.md` and `RELEASE-HISTORY.md` for the full project chronology.
