# Signal Labs Home HOWTO

## Use Home

Open `index.html` or visit the deployed Home site.

Choose a tool:

- Paycheck Calculator
- Overtime Calculator
- Time Off Planner

## Maintain Home

Before editing Home or shared assets, review:

```text
STANDARDS.md
UX_STANDARDS.md
SCRIPT_STANDARDS.md
DOCUMENTATION_STANDARDS.md
VERSIONING_STANDARDS.md
WORKFLOW_STANDARDS.md
```

Before CSS/UI work, review `UX_STANDARDS.md` again.

Before script work, review `SCRIPT_STANDARDS.md` again.

Before packaging, review `VERSIONING_STANDARDS.md` and `WORKFLOW_STANDARDS.md` again.

## Shared Design System

Shared styles live in:

```text
assets/global.css
```

Shared behavior lives in:

```text
assets/global.js
```

The design system currently provides foundations for:

- navigation
- optional metadata-driven footer
- shared action bars
- shared modal/dialog style
- text modals
- toasts
- empty states
- buttons and pills

Tools should migrate gradually in their own releases.

## Verify Home

Check:

- Home page loads.
- Navigation works on desktop and mobile.
- Public changelog modal opens.
- Roadmap modal opens.
- Global styles do not visibly break tool pages.
- Version labels show v0.8.0.
- `assets/global.css?v=0.8.0` is referenced.
- `assets/global.js?v=0.8.0` is referenced.
