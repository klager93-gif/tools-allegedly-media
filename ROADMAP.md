# Signal Labs Home Roadmap

## Current

### v0.8.0 — Signal Labs Design System

Status: Built

- Shared global visual language foundation.
- Shared action bar pattern.
- Shared modal/dialog pattern.
- Shared toast pattern.
- Metadata-aware global footer foundation.
- Home public/admin changelog split.

---

## Next Home Candidates

### Dynamic Global Layout

- Metadata-driven global header.
- Metadata-driven global footer across all tools.
- Tool navigation and breadcrumbs.
- Footer links pointing to public changelogs.

### Documentation Architecture

- Finalize public/admin changelog rules.
- Redefine `MASTER-CHANGELOG.md` as the append-only ecosystem chronology.
- Evaluate whether `RELEASE-HISTORY.md` should fold into the master changelog.

### Component Standards

- Create deeper standards for buttons, cards, modals, action bars, empty states, and forms.

---

## Tool Migration Candidates

- Paycheck adopts global metadata/footer system.
- Overtime adopts shared action bar pattern.
- Time Off adopts shared action bar pattern.
- Tools migrate popups/modals to shared modal system.


## Completed

- Home v0.8.1 — Design System Cleanup: removed the public design-system card and preserved the foundation for future migration.

## Planned

- Gradually migrate tools to the shared action bar, modal/dialog, toast, card, button, pill, and metadata systems.
- Future global header/footer/nav should read page metadata and display version/theme/status consistently.
