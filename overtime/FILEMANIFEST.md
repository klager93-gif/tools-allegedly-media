# Signal Labs Overtime Calculator

# FILEMANIFEST

## Current Version

v0.8.3.1

## Theme

Standards Manifest Adoption

---

# Required Files

```text
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

# Shared Dependencies

```text
../assets/global.css?v=0.2.3
../assets/global.js?v=0.2.3
```

---

# Identity Checks

## Must Contain

```text
Overtime Calculator
document.getElementById("rate")
```

## Must Not Contain

```text
document.getElementById("categoryOptions")
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

This manifest exists to prevent missing files, wrong-folder uploads, cross-contaminated release packages, and malformed version strings.
