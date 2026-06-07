# Signal Labs

Useful tools without the noise.

---

# Purpose

Signal Labs is a collection of lightweight web tools designed to solve common problems without unnecessary complexity.

The Signal Labs website itself is versioned separately from the individual calculators it hosts.

---

# Current Tools

## Overtime Calculator

Estimate regular pay, overtime pay, deductions, and take-home pay.

Current version tracked separately inside `/overtime/`.

## Time Off Calculator

Estimate balances for vacation, sick time, personal time, comp time, holidays, and more.

Current version tracked separately inside `/timeoff/`.

---

# Root Website Files

```text
/

index.html
Main Signal Labs homepage and tool directory.

CHANGELOG.md
Historical record of root website releases.

ROADMAP.md
Current and future root website plans.

README.md
General root website documentation.

site.webmanifest
Web app manifest.

assets/global.css
Shared styling used by the homepage and tools.

assets/global.js
Shared modal and utility scripts used by the homepage and tools.
```

---

# Version Separation

The root website, Overtime Calculator, Time Off Calculator, and shared assets are treated as separate version tracks.

Root website updates should not automatically change calculator versions unless calculator files are also changed.

Calculator updates should not automatically change the root website version unless root files are also changed.

Shared asset updates should be handled carefully because they can affect multiple tools.

---

# Development Philosophy

Signal Labs tools are intended to be:

- Useful.
- Fast.
- Mobile-friendly.
- Easy to understand.
- Lightweight.
- Free from unnecessary complexity.

> Useful tools without the noise.

---

# Current Status

### Website Version

v0.1.1

### Theme

Root Cleanup

### Status

Active Development
