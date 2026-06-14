# Signal Schedule v2.30.0 — Alpha Integration & Stability Audit

Date: 2026-06-14

## Purpose

v2.30.0 is a full-replace cleanup release. It does not add a new scheduling subsystem or database migration. It verifies the v2.29.0 Qualifications & Certification Engine package and normalizes drift before the 3.x scheduler phase.

## Cleanup Actions

- Removed release-packaging junk such as `__MACOSX`, `.DS_Store`, `._*`, and `.git` if present.
- Kept `shift-trades.html` as the canonical trade workflow.
- Kept `trades.html` only as a compatibility redirect shim.
- Standardized Schedule page footer metadata to v2.30.0.
- Standardized Schedule shared footer/cache-busting references to v2.30.0.
- Preserved role-based panels instead of creating duplicate `-admin` pages.
- Preserved unrelated tools and root pages for full-root replacement.

## Files Intentionally Retained

- `trades.html` remains temporarily as a redirect so old bookmarks do not break.
- Historical foundation markdown files remain for traceability.
- Root tools such as overtime, paycheck, timeoff, and pay-planner remain unchanged.

## Database Migration Required

No.

## Next Phase

v3.0 should begin the real scheduler phase, starting with a weekly schedule view and deeper integration between assignment generation, conflicts, coverage, qualifications, leave, overtime, trades, mandation, and seniority.
