# Signal Labs Root Site

# BUILDMANIFEST

## Current Build

v0.4

## Theme

Release Standards Update

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

- [ ] Home index shows v0.4.
- [ ] Home footer shows v0.4.
- [ ] Home cache-busting uses v0.4.
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


---

# Backup & Restore Checks

- [ ] RESTORE.md exists.
- [ ] backups/README.md exists.
- [ ] backups/BACKUP-LOG.md exists.
- [ ] backups/RESTORE-GUIDE.md exists.
- [ ] STANDARDS.md includes backup procedures.
- [ ] Release response includes backup reminder.


---

# Release Management Checks

- [ ] MASTER-CHANGELOG.md exists.
- [ ] MASTER-ROADMAP.md exists.
- [ ] RELEASE-HISTORY.md exists.
- [ ] STANDARDS.md includes release management rules.
- [ ] RELEASE-HISTORY.md includes current release.


---

# UI Density Checks

- [ ] Cards are more compact but readable.
- [ ] Result rows are more compact but readable.
- [ ] Mobile layout remains usable.
- [ ] Overtime layout reviewed.
- [ ] Time Off layout reviewed.


---

# Release Response Metadata Checks

Before presenting a ZIP, confirm the response includes:

- [ ] Backup reminder.
- [ ] Backup folder name.
- [ ] Download ZIP link.
- [ ] GitHub title.
- [ ] GitHub description.
- [ ] Release information is presented in the required order.
