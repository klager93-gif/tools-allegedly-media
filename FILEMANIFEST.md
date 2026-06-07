# Signal Labs Root Site

# FILEMANIFEST

## Current Version

v0.2.2.2

## Theme

Standards Preservation

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

# Expected Folder Structure

```text
/
index.html
README.md
ROADMAP.md
CHANGELOG.md
HOWTO.md
STANDARDS.md
FILEMANIFEST.md
BUILDMANIFEST.md

/assets/
  global.css
  global.js

/overtime/
  index.html
  style.css
  script.js
  README.md
  ROADMAP.md
  CHANGELOG.md
  HOWTO.md
  FILEMANIFEST.md
  BUILDMANIFEST.md

/timeoff/
  index.html
  style.css
  script.js
  README.md
  ROADMAP.md
  CHANGELOG.md
  HOWTO.md
  FILEMANIFEST.md
  BUILDMANIFEST.md
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

## Root Must Not Contain

```text
Overtime-specific calculator logic
Time Off-specific calculator logic
```

---

# Shared Dependencies

Root owns:

```text
assets/global.css
assets/global.js
```

Changes to shared assets require review of:

```text
/
overtime/
timeoff/
future tools/
```

---

# Notes

This manifest exists to prevent missing files, wrong-folder uploads, and cross-contaminated release packages.
