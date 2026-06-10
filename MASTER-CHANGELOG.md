# Signal Labs Master Changelog

## Purpose

This file tracks high-level changes across the entire Signal Labs ecosystem.

Tool-specific `CHANGELOG.md` files contain detailed release notes.

---

## 2026-06-10

### Home v0.7.0 — Standards Architecture

- Introduced the Signal Labs standards architecture.
- Converted `STANDARDS.md` into the project constitution/master index.
- Added dedicated supporting standards files:
  - `UX_STANDARDS.md`
  - `SCRIPT_STANDARDS.md`
  - `DOCUMENTATION_STANDARDS.md`
  - `VERSIONING_STANDARDS.md`
  - `WORKFLOW_STANDARDS.md`
- Added daily startup requirement to review all standards files.
- Added domain-specific verification before script, CSS/UI, documentation, and versioning/release work.
- Formalized the principle: `Review broadly. Verify specifically.`
- Added requirement to review `WORKFLOW_STANDARDS.md` before building any files.
- Added release response format requirement so every release looks like a release in chat.
- Reinforced GitHub as the authoritative source of truth.
- Added recent user-provided ZIP exception for standards not yet represented in GitHub.
- No calculator logic changes.
- No shared asset changes.

---

## 2026-06-08

### Home v0.6.2 — Standards v2.0

- Reorganized Signal Labs Development Standards into a clearer priority order.
- Added Source Preference rules and GitHub-first workflow guidance.
- Added mandatory Daily Startup Procedure comparison requirements.
- Added Trust Successful Releases and Successful Releases Become History rules.
- Expanded hotfix documentation requirements and hotfix file replacement exceptions.
- Clarified shared systems, source disclosure, validation, and failed-release handling.

---

## Notes

Every Signal Labs release must be reflected here without exception.

- Home v0.7.0 includes `SHA256SUMS.txt` as an intentional checksum manifest for release integrity validation.
