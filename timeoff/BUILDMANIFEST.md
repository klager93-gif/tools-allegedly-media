# Signal Labs Time Off Calculator

# BUILDMANIFEST

## Current Build

v0.6.2.1

## Theme

Standards Manifest Adoption

---

# Required Validation Before ZIP

## Required Files

- [ ] index.html
- [ ] style.css
- [ ] script.js
- [ ] README.md
- [ ] ROADMAP.md
- [ ] CHANGELOG.md
- [ ] HOWTO.md
- [ ] FILEMANIFEST.md
- [ ] BUILDMANIFEST.md

## Identity Checks

- [ ] index.html identifies Time Off Calculator.
- [ ] style.css identity header identifies Time Off Calculator.
- [ ] script.js identity header identifies Time Off Calculator.
- [ ] script.js contains `document.getElementById("categoryOptions")`.
- [ ] script.js does not contain `document.getElementById("rate")`.

## Version Checks

- [ ] index.html version labels match v0.6.2.1.
- [ ] cache-busting references are correct.
- [ ] README current version matches.
- [ ] ROADMAP current version matches.
- [ ] CHANGELOG newest entry matches.
- [ ] No malformed version strings exist.

## Version String Sanity

Reject:

```text
version 0.2.2.2.2
version 0.8.3.1.1
version 0.6.2.1.1
```

---

# ZIP Rule

If any required check fails, abort ZIP creation and report the failure.
