# Signal Labs Admin Changelog

## Home v0.9.9.2 — Footer Style Recovery + Matched Components Rule

**Date:** 2026-06-10

### Fixed

- Restored shared footer markup compatibility with the existing `home-footer` CSS system.
- Corrected Home/public footer version sync to `v0.9.9.2`.
- Included `assets/global.css` because the shared footer component and stylesheet are a matched set.
- Updated Home/public page footer and global CSS cache-busting references.

### Root Cause

A previous footer hotfix replaced `assets/components/footer.js` with markup using new `.sl-footer` classes, but the live stylesheet did not contain matching `.sl-footer` CSS. The footer rendered as unstyled text.

### Standards Updated

- Added Matched Component Rule.
- Shared component JavaScript and CSS must be verified together.
