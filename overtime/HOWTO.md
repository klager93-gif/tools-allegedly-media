# Signal Labs Overtime Calculator

# HOWTO

---

## Purpose

The Overtime Calculator estimates regular pay, overtime pay, advanced pay, taxes, deductions, take-home pay, and income goals.

---

# How to Use

1. Enter your hourly rate.
2. Enter total hours worked.
3. Choose your pay period.
4. Confirm or override the overtime threshold.
5. Add optional advanced pay items.
6. Add optional taxes, deductions, or other adjustments.
7. Use Goal Mode if you want to estimate hours needed for a target amount.
8. Review the Results panel.

---

# Maintenance Notes

- Keep shared navigation controlled by `/assets/global.js`.
- Keep shared ad framework controlled by `/assets/global.css` and `/assets/global.js`.
- Keep calculator-specific layout in `/overtime/style.css`.
- Keep calculator logic in `/overtime/script.js`.
- Update README, ROADMAP, CHANGELOG, and HOWTO with every meaningful release.


---

# v0.8.3.1 Live Folder Resync Note

If `/overtime/` ever displays Time Off content, replace the full `/overtime/` folder with this release package.

Do not patch only one file when the live folder contents appear mixed.


---

# Developer Manifests

Before packaging this tool, review:

```text
FILEMANIFEST.md
BUILDMANIFEST.md
```

These files help prevent missing files, wrong-folder uploads, cross-contamination, and malformed version strings.


---

# v0.8.5 Share & Export Prep

Use **Copy Results** to copy a text summary. Use **Print** to open the browser print dialog.
