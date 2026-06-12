# Schedule File Deprecation Audit — v0.19.1

This audit reviews `/schedule/` for files that may eventually be deprecated, consolidated, or moved as the project crosses into v1.0 database foundation work. No files are removed in this release.

## Keep for now

- `index.html` — current browser-only Schedule interface
- `script.js` — current browser-only logic sandbox and render registry
- `style.css` — current Schedule styling
- `README.md` — public/developer overview
- `ROADMAP.md` — Schedule-specific roadmap
- `CHANGELOG.md` — Schedule-specific changelog
- `HOWTO.md` — Schedule-specific usage notes
- `ENTITY-MAP.md` — useful bridge into database schema planning
- `RULE-ENGINE.md` — useful bridge into v1.0/v1.x rule persistence
- `DATABASE-PLAN.md` — keep until v1.0 schema files exist
- `V1-READINESS.md` — keep until v1.0 is complete
- `ARCHITECTURE-AUDIT.md` — keep as the final 0.x architecture checkpoint

## Candidate future consolidation

After v1.0 database scaffolding exists, consider consolidating or archiving:

- `DATABASE-PLAN.md` into `/schedule/database/README.md` or `/docs/database.md`
- `V1-READINESS.md` into the v1.0 release checklist
- `ARCHITECTURE-AUDIT.md` into long-term architecture documentation

## Do not delete yet

None of the current `/schedule/` files should be deleted before v1.0 begins. They still document decisions that will be needed while creating the first PHP/MySQL schema and backend structure.
