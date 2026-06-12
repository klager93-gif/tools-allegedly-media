## v0.19.0 Architecture Complete HOWTO

Use this build as the final 0.x architecture reference before database work.

### How to read the architecture

1. Start with `ARCHITECTURE-AUDIT.md`.
2. Review `ENTITY-MAP.md` for future database objects.
3. Review `V1-READINESS.md` before creating PHP/MySQL tables.
4. Keep Rule 0 active: store facts, not assumptions.
5. Keep Rule 23 active: do not add dashboard preview panels unless the UI itself is the purpose of the release.

### What not to do in v0.19

Do not add new feature UI, fake production flows, drag-and-drop, live database calls, or new preview panels. v0.19 is a checkpoint before persistence.
