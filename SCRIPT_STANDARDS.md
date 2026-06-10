# Signal Labs Script Standards v2.1

## Purpose

This file defines standards for JavaScript, calculations, shared behavior, validation, and script-related development.

Review this file before performing script work.

Script work includes:

- `script.js`
- `assets/global.js`
- Calculation logic.
- Saved settings.
- Copy Results.
- Print Report behavior.
- Dynamic rows.
- Modals.
- Validation.
- Navigation behavior.

---

# Script Rule 1 — Review Before Script Work

Before changing script behavior, review:

```text
SCRIPT_STANDARDS.md
STANDARDS.md
VERSIONING_STANDARDS.md
DOCUMENTATION_STANDARDS.md
```

If the script change affects layout, also review:

```text
UX_STANDARDS.md
```

---

# Script Rule 2 — Preserve Existing Behavior

Do not break existing working features while adding new ones.

Before release, verify affected tools still support:

- Calculation.
- Reset.
- Example/demo data.
- Save settings.
- Load settings.
- Copy Results.
- Print Report.
- Dynamic row add/remove behavior.
- Mobile action flow.

---

# Script Rule 3 — Calculations Must Be Explainable

Calculator outputs should be traceable.

Calculation logic should:

- Use clear variable names.
- Avoid hidden magic numbers.
- Separate input parsing from calculation where practical.
- Avoid rounding too early.
- Display rounded results consistently.

---

# Script Rule 4 — Validate Inputs Clearly

Validate user input without punishing the user.

Use:

- Safe numeric parsing.
- Reasonable defaults.
- Clear fallback behavior.
- User-readable warnings where needed.

Avoid:

- NaN in the UI.
- Undefined output.
- Silent calculation failure.
- Crashes from empty fields.

---

# Script Rule 5 — Fail Loudly During Development

If a script depends on a missing element or expected structure, report or guard it clearly.

Do not silently continue in a way that produces wrong results.

Production user experience should stay graceful, but development should expose problems.

---

# Script Rule 6 — Shared Global JS Protection

Before changing:

```text
assets/global.js
```

review effects on:

- Home navigation.
- Paycheck.
- Overtime.
- Time Off.
- Modals.
- Action bars.
- Shared helpers.
- Future tools.

Shared JS changes should be treated as ecosystem changes.

---

# Script Rule 7 — Dynamic Rows Must Be Consistent

Dynamic row systems should consistently support:

- Add item.
- Remove item.
- Label/name.
- Type selection when needed.
- Amount or percent when needed.
- Clear empty state.
- Stable Copy Results output.
- Stable Print Report output.

Examples:

- Deductions.
- Other adjustments.
- Premium hours.
- Paid leave.
- Other earnings.
- Mileage.
- Time off entries.

---

# Script Rule 8 — State and Saved Settings

Saved settings should be stable across releases when possible.

When changing stored data structure:

- Preserve old saved values where practical.
- Add migration logic when needed.
- Avoid deleting user settings unexpectedly.
- Document breaking storage changes.

---

# Script Rule 9 — Copy Results and Print Reports

When calculation outputs change, update:

- Visible results.
- Copy Results text.
- Print Report.
- Documentation.
- Changelog.

Do not update only one output path.

---

# Script Rule 10 — No Live Tracking or Ads Unless Explicitly Approved

Signal Labs currently avoids:

- Live ad scripts.
- Tracking scripts.
- Unnecessary third-party requests.

Hidden disabled ad framework may exist, but live ad provider scripts should not be added without explicit approval.

---

# Script Rule 11 — Version and Cache-Busting Awareness

When script files change, update affected references if cache-busting is used.

Example:

```text
script.js?v=X.X.X
assets/global.js?v=X.X.X
```

Version references must match the relevant release strategy.

---

# Script Rule 12 — Whole Files Preferred

Normal script releases should provide full replacement files.

Hotfixes may replace affected files only when narrowly scoped, but still require documentation and release history updates.

---

# Script Rule 13 — Validate Before Packaging

For script releases, test:

- Initial page load.
- Console-visible obvious failures if available.
- Main calculation flow.
- Add/remove dynamic rows.
- Save/load.
- Copy Results.
- Print Report.
- Reset.
- Example data.
- Mobile behavior.

---

# Core Script Principle

Correct results first.

Readable logic second.

Convenient implementation third.

Never hide broken logic behind a pretty interface.
