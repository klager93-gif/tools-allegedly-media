# Workflow Standards

## Session Startup

When a Signal Labs work session starts, verify:

```text
Chat title: YYYY-MM-DD
```

Then review:

- current versions
- roadmap
- active issues
- releases in progress
- whether the next package is full replacement or partial update

## Daily Work

Before script work, review Script/Development standards.

Before UI/CSS work, review UX standards.

Before documentation work, review Documentation standards.

Before releases or packaging, review Release and Workflow standards.

## Nuclear Option

Nickname: **Nuclear Option**

Trigger:

```text
Two failed hotfixes for the same issue.
```

Procedure:

1. Stop patching.
2. Compare last backup.
3. Compare latest ChatGPT ZIP.
4. Compare GitHub.
5. Compare live site behavior.
6. Inspect affected files line-by-line if needed.
7. Identify root cause.
8. Build one corrective package.
