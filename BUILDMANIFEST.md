# Signal Labs Root Site

# BUILDMANIFEST

## Current Build

v0.2.4

## Theme

Modal UX Polish

## Build Type

Root standards and tool manifest adoption release.

---

# Build Purpose

This build adopts the standards and manifest system across Root, Overtime, and Time Off.

---

# Required Validation Before ZIP

## Required Root Files

- [ ] index.html
- [ ] README.md
- [ ] ROADMAP.md
- [ ] CHANGELOG.md
- [ ] HOWTO.md
- [ ] STANDARDS.md
- [ ] FILEMANIFEST.md
- [ ] BUILDMANIFEST.md
- [ ] assets/global.css
- [ ] assets/global.js

## Required Tool Files

- [ ] overtime/FILEMANIFEST.md
- [ ] overtime/BUILDMANIFEST.md
- [ ] timeoff/FILEMANIFEST.md
- [ ] timeoff/BUILDMANIFEST.md

## Version Checks

- [ ] Root index shows v0.2.4.
- [ ] Root footer shows v0.2.4.
- [ ] Root cache-busting uses v0.2.4.
- [ ] No malformed version strings exist.

## Version String Sanity

Reject:

```text
version 0.2.2.2.2
version 0.8.3.1.1
version 0.6.2.1.1
```

## Identity Checks

- [ ] Overtime files identify Overtime Calculator.
- [ ] Time Off files identify Time Off Calculator.
- [ ] Overtime files are not Time Off files.
- [ ] Time Off files are not Overtime files.

---

# ZIP Rule

If any required check fails, abort ZIP creation and report the failure.


---

# Modal UX Checks

- [ ] X button closes the modal.
- [ ] Escape key closes the modal.
- [ ] Clicking outside the modal box closes the modal.
- [ ] Clicking inside the modal box does not close the modal.
