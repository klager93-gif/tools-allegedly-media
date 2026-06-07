# Signal Labs Root Site

# HOWTO

---

## Purpose

This file explains how to use and maintain the Signal Labs root site.

---

# How to Use the Root Site

Open the root `index.html` page to access the main Signal Labs tool directory.

The root page currently links to:

- Overtime Calculator.
- Time Off Calculator.

Use the navigation bar to move between the home page and available tools.

---

# How Navigation Works

Shared navigation is handled by:

```text
assets/global.js
```

The script automatically injects navigation into each page that loads it.

It detects the current page path and highlights:

- Home
- Overtime
- Time Off

---

# How Styling Works

Shared styling is handled by:

```text
assets/global.css
```

This file controls:

- Base theme.
- Typography.
- Cards.
- Buttons.
- Modals.
- Footer styles.
- Shared navigation.

Tool-specific styles should stay inside each tool folder:

```text
/overtime/style.css
/timeoff/style.css
```

---

# How Documentation Works

The root site should maintain:

- README.md
- ROADMAP.md
- CHANGELOG.md
- HOWTO.md

Each tool should eventually maintain the same set of files.

---

# How to Add a New Tool

1. Create a new folder for the tool.
2. Add the tool files.
3. Link `../assets/global.css`.
4. Link `../assets/global.js`.
5. Add the tool link to `assets/global.js`.
6. Add the tool card to root `index.html`.
7. Update README.md.
8. Update ROADMAP.md.
9. Update CHANGELOG.md.
10. Add or update HOWTO.md.

---

# Maintenance Rules

- Keep version labels current.
- Update cache-busting query strings when shared assets change.
- Do not break existing calculator pages when changing shared assets.
- If global assets change, review every tool that loads them.
- Keep folder structure predictable.
- Prefer complete file replacements over snippets.
