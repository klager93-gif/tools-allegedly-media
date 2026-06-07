# Signal Labs Root Site

# BUILDMANIFEST

## Current Build

v0.2.2.2

## Theme

Standards Preservation

## Build Type

Root documentation and standards preservation patch.

---

# Build Purpose

This build preserves Signal Labs Development Standards v1.1 inside the project itself.

It adds:

```text
STANDARDS.md
FILEMANIFEST.md
BUILDMANIFEST.md
```

and updates documentation references.

---

# Required Validation Before ZIP

## Required Files

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

## Identity Checks

- [ ] Root index identifies Signal Labs.
- [ ] Root index identifies Root Site.
- [ ] assets/global.css has a shared asset identity header.
- [ ] assets/global.js has a shared asset identity header.
- [ ] STANDARDS.md contains Signal Labs Development Standards v1.1.

## Version Checks

- [ ] index.html shows v0.2.2.2.
- [ ] README.md shows v0.2.2.2.
- [ ] ROADMAP.md shows v0.2.2.2.
- [ ] CHANGELOG.md has v0.2.2.2 as newest entry.
- [ ] Cache-busting references use v0.2.2.2.

## Shared Dependency Review

- [ ] Root reviewed.
- [ ] Overtime impact considered.
- [ ] Time Off impact considered.

---

# ZIP Rule

If any required check fails, abort ZIP creation and report the failure.
