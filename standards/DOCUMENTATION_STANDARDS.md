# Documentation Standards

## Changelog Structure

Use:

```text
MASTER-CHANGELOG.md
PUBLIC_CHANGELOG.md
ADMIN_CHANGELOG.md
```

Do not maintain duplicate generic `CHANGELOG.md` files.

## Master Changelog

`MASTER-CHANGELOG.md` is the full Signal Labs chronology.

It is append-only.

Do not delete, collapse, summarize, or archive prior history.

## Public Changelog

Public changelogs include user-facing changes, including bugs fixed, UX improvements, and behavior changes.

Avoid AI/process-heavy wording.

## Admin Changelog

Admin changelogs include internal process, AI-assisted workflow, standards, packaging, and build notes.

## Tool Docs

Every tool should eventually maintain:

```text
README.md
ROADMAP.md
HOWTO.md
PUBLIC_CHANGELOG.md
ADMIN_CHANGELOG.md
```
