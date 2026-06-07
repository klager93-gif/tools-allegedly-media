# Signal Labs Root Site

Signal Labs is the shared home for simple, useful calculators and planning tools.

---

# Current Version

**v0.3**

## Theme

Ad Slot Framework

---

# Current Tools

## Overtime Calculator

Estimate regular pay, overtime pay, gross pay, advanced pay, taxes, deductions, take-home pay, and income goals.

## Time Off Calculator

Estimate balances for vacation, sick time, personal time, comp time, holidays, planned events, caps, and policy warnings.

---

# Shared Assets

## assets/global.css

Provides shared Signal Labs styling:

- Root theme.
- Typography.
- Buttons.
- Cards.
- Modals.
- Footer styling.
- Shared navigation styling.
- Responsive foundations.

## assets/global.js

Provides shared Signal Labs behavior:

- Shared navigation injection.
- Active page highlighting.
- Text modal system.
- Changelog modal support.
- Roadmap modal support.
- UTC timestamp helper.

---

# Folder Structure

```text
/
index.html
README.md
CHANGELOG.md
ROADMAP.md
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
  CHANGELOG.md
  ROADMAP.md

/timeoff/
  index.html
  style.css
  script.js
  README.md
  CHANGELOG.md
  ROADMAP.md
```

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

### Build

v0.3

### Theme

UI Density Refactor

### Status

Active Development

---

# Ad Slot Framework

Root v0.2.2 adds back-end support for future ads.

This release does **not** add live ads, ad provider scripts, tracking scripts, or ad requests.

## Supported Slot Classes

- `ad-slot`
- `ad-slot-top`
- `ad-slot-inline`
- `ad-slot-sidebar`
- `ad-slot-footer`
- `ad-slot-card`
- `ad-placeholder`

## Supported Slot Statuses

```html
data-ad-status="disabled"
data-ad-status="placeholder"
```

Disabled slots are hidden by default.

Placeholder slots can be used for testing layout without serving ads.



---

# v0.2.2.1 Disabled Ad Slot Fix

Disabled ad slots should not be visible, should not reserve space, and should not show placeholder text.

Placeholder slots remain available for future layout testing by using:

```html
data-ad-status="placeholder"
```


---

# Development Standards

This project follows:

```text
/STANDARDS.md
```

`STANDARDS.md` is the authoritative copy of Signal Labs Development Standards v1.1.

The standards are stored in the project so development rules are not lost if chat history or AI memory is unavailable.


---

# Version String Sanity

Root v0.2.3 adds a release validation check to prevent malformed version strings such as:

```text
version 0.2.2.2.2
```

This check is now part of the project standards and build manifests.


---

# v0.3 UI Density Refactor

Root v0.3 tightens shared spacing, cards, result rows, and form density while preserving the existing visual style.
