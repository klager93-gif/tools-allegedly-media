# Signal Labs Development Standards v2.0

Signal Labs standards are organized into focused standards documents.

## Standards Documents

- `STANDARDS.md` — constitution and master index.
- `DEVELOPMENT_STANDARDS.md` — core development principles.
- `REPOSITORY_STANDARDS.md` — repository structure and folder rules.
- `RELEASE_STANDARDS.md` — releases, hotfixes, full replacements, and versioning.
- `DOCUMENTATION_STANDARDS.md` — changelogs, roadmaps, and docs.
- `COMPONENT_STANDARDS.md` — shared components and dependency rules.
- `UX_STANDARDS.md` — UI and UX principles.
- `WORKFLOW_STANDARDS.md` — daily startup and work procedures.

## Core Philosophy

> Useful tools without the noise.

> Files do not lie.

## Authority

GitHub is the source of truth unless a newer user-provided ZIP or same-chat generated ZIP is explicitly identified as the current working source.

If confused, clarify. Otherwise, GitHub wins.

## Daily Startup

At the start of a Signal Labs work session, verify:

- Chat title format: `YYYY-MM-DD`
- Current versions
- Roadmap
- Active bugs/issues
- Releases in progress
- Whether work is a full replacement package or partial update

## Nuclear Option

If two hotfixes fail for the same issue, stop patching and invoke the **Nuclear Option**.

Compare:

- Last known good backup
- Latest ChatGPT ZIP
- GitHub repo
- Live website behavior
- Affected files

Find the actual root cause before building again.
