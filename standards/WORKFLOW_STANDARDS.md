# Workflow Standards

## Session Startup

At the start of a Signal Labs work session:

- Chat title should be YYYY-MM-DD.
- Review current versions.
- Review roadmap.
- Review active bugs/issues.
- Review releases in progress.
- Determine full replacement or partial update.

## Nuclear Option

Nickname: Nuclear Option.

Trigger: two failed hotfixes for the same issue.

Procedure:

1. Stop patching.
2. Compare last backup.
3. Compare latest ZIP.
4. Compare GitHub.
5. Compare live site.
6. Inspect affected files line-by-line if needed.
7. Identify root cause.
8. Build one corrective package.

For shared visual components, inspect both component JavaScript and matching CSS.
