# Signal Labs Root Site

# FILEMANIFEST

## Current Version

v0.2.5

## Theme

Versioning Guidance

---

# Required Root Files

```text
index.html
README.md
ROADMAP.md
CHANGELOG.md
HOWTO.md
STANDARDS.md
FILEMANIFEST.md
BUILDMANIFEST.md
```

---

# Required Asset Files

```text
assets/global.css
assets/global.js
```

---

# Identity Checks

## Root Must Contain

```text
Signal Labs
Root Site
assets/global.css
assets/global.js
```

## Shared Assets Must Contain

```text
Shared Asset
Version: v0.2.5
```

---

# Version String Sanity

Reject malformed versions such as:

```text
version 0.2.2.2.2
version 0.8.3.1.1
version 0.6.2.1.1
```

---

# Notes

This manifest exists to prevent missing files, wrong-folder uploads, and cross-contaminated release packages.
