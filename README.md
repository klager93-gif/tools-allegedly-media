# Signal Labs Root Site

Useful tools without the noise.

---

# Purpose

Signal Labs is the shared home for lightweight calculators and planning tools.

This root site connects individual tools, keeps shared styling consistent, and provides a simple navigation system across the project.

---

# Current Version

## v0.2

### Theme

Navigation

### Status

Active Development

---

# Included Tools

## Overtime Calculator

Path:

```text
/overtime/
```

Current referenced build:

```text
v0.8.1 — Goal Mode
```

Purpose:

Estimate regular pay, overtime pay, advanced pay, gross pay, deductions, taxes, take-home pay, and income goals.

---

## Time Off Calculator

Path:

```text
/timeoff/
```

Current referenced build:

```text
v0.5.1 — Input Polish
```

Purpose:

Estimate vacation, sick time, personal time, comp time, holiday time, planned usage, cap status, and policy warnings.

---

# Shared Assets

## assets/global.css

Provides shared Signal Labs styling:

- Page background.
- Typography foundation.
- Shared card styling.
- Shared button styling.
- Shared footer styling.
- Shared modal styling.
- Shared responsive behavior.
- Global navigation styling.
- Active page navigation state.

## assets/global.js

Provides shared Signal Labs behavior:

- Global navigation injection.
- Active page detection.
- Shared text modal loader.
- Changelog and roadmap modal support.
- UTC timestamp helper.
- Escape and overlay modal closing.

---

# Folder Structure

```text
/
index.html
README.md
CHANGELOG.md
ROADMAP.md

assets/
global.css
global.js

overtime/
index.html
style.css
script.js
README.md
CHANGELOG.md
ROADMAP.md

timeoff/
index.html
style.css
script.js
README.md
CHANGELOG.md
ROADMAP.md
```

---

# Navigation Behavior

The shared navigation is injected by `assets/global.js`.

It currently includes:

- Home
- Overtime
- Time Off

The active page is detected from `window.location.pathname` and receives the `is-active` class plus `aria-current="page"`.

This keeps individual tool pages cleaner and prevents navigation markup from needing to be duplicated inside every calculator.

---

# Important Compatibility Notes

Tool pages currently load shared files with paths like:

```html
<link rel="stylesheet" href="../assets/global.css?v=0.5.3">
<script src="../assets/global.js?v=0.5.3"></script>
```

The query string is only cache-busting. The physical files should still be:

```text
/assets/global.css
/assets/global.js
```

When deploying this root navigation release, upload these shared files into the `assets/` folder.

---

# Development Standards

Signal Labs releases follow these rules:

- Full-file replacement releases.
- Sequential versioning.
- Clear release theme names.
- Changelog updates with every release.
- Roadmap updates when direction changes.
- GitHub-ready update title and description with every release.
- Check cross-folder impacts before changing shared files.
- Protect project integrity over convenience.

---

# Current Status

### Build

v0.2

### Theme

Navigation

### Status

Active Development
