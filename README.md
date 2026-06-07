# Signal Labs Root Site

Signal Labs is the shared home for simple, useful calculators and planning tools.

---

# Current Version

**v0.2.2**

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

v0.2.2

### Theme

Ad Slot Framework

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

