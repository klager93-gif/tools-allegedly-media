# Signal Labs Repository Integrity Audit — 2026-06-12

## Result

- Rule 26 asset validation: **PASSED**
- References checked/resolved: **134**
- Missing references: **0**
- Cross-tool direct references found: **0**
- Root icon duplicates found: **0**

## Tool Documentation Matrix

| Tool | README | ROADMAP | CHANGELOG | HOWTO |
|---|---:|---:|---:|---:|
| overtime | Yes | Yes | Yes | Yes |
| pay-planner | Yes | Yes | Yes | Yes |
| paycheck | Yes | Yes | Yes | Yes |
| schedule | Yes | Yes | Yes | Yes |
| timeoff | Yes | Yes | Yes | Yes |

## Structure Notes

- `.git/`, `__MACOSX/`, and `._*` artifacts were excluded from the rebuilt upload package.
- Shared icons remain under `assets/icons/`.
- No root-level favicon/icon duplicates are included.
- Tool folders remain in the monorepo but are documented as repo-ready modules.

## Cross-Tool Direct References

- None found in HTML/JS import scan.

## Shared Asset References

- `about/index.html` -> `../assets/components/footer.js?v=0.9.9.6`
- `about/index.html` -> `../assets/components/header.js?v=0.9.9.6`
- `about/index.html` -> `../assets/global.css?v=0.9.9.6`
- `about/index.html` -> `../assets/global.js?v=0.9.9.6`
- `about/index.html` -> `../assets/icons/apple-touch-icon.png`
- `about/index.html` -> `../assets/icons/favicon.ico`
- `about/index.html` -> `../assets/icons/favicon.svg`
- `about/index.html` -> `../assets/icons/site.webmanifest`
- `changelog/index.html` -> `../assets/components/footer.js?v=0.9.9.6`
- `changelog/index.html` -> `../assets/components/header.js?v=0.9.9.6`
- `changelog/index.html` -> `../assets/global.css?v=0.9.9.6`
- `changelog/index.html` -> `../assets/global.js?v=0.9.9.6`
- `changelog/index.html` -> `../assets/icons/apple-touch-icon.png`
- `changelog/index.html` -> `../assets/icons/favicon.ico`
- `changelog/index.html` -> `../assets/icons/favicon.svg`
- `changelog/index.html` -> `../assets/icons/site.webmanifest`
- `contact/index.html` -> `../assets/components/footer.js?v=0.9.9.6`
- `contact/index.html` -> `../assets/components/header.js?v=0.9.9.6`
- `contact/index.html` -> `../assets/global.css?v=0.9.9.6`
- `contact/index.html` -> `../assets/global.js?v=0.9.9.6`
- `contact/index.html` -> `../assets/icons/apple-touch-icon.png`
- `contact/index.html` -> `../assets/icons/favicon.ico`
- `contact/index.html` -> `../assets/icons/favicon.svg`
- `contact/index.html` -> `../assets/icons/site.webmanifest`
- `how-to/index.html` -> `../assets/components/footer.js?v=0.9.9.6`
- `how-to/index.html` -> `../assets/components/header.js?v=0.9.9.6`
- `how-to/index.html` -> `../assets/global.css?v=0.9.9.6`
- `how-to/index.html` -> `../assets/global.js?v=0.9.9.6`
- `how-to/index.html` -> `../assets/icons/apple-touch-icon.png`
- `how-to/index.html` -> `../assets/icons/favicon.ico`
- `how-to/index.html` -> `../assets/icons/favicon.svg`
- `how-to/index.html` -> `../assets/icons/site.webmanifest`
- `index.html` -> `assets/components/footer.js?v=0.9.9.6`
- `index.html` -> `assets/components/header.js?v=0.9.9.6`
- `index.html` -> `assets/global.css?v=0.9.9.6`
- `index.html` -> `assets/global.js?v=0.9.9.6`
- `index.html` -> `assets/icons/apple-touch-icon.png`
- `index.html` -> `assets/icons/favicon.ico`
- `index.html` -> `assets/icons/favicon.svg`
- `index.html` -> `assets/icons/site.webmanifest`
- `overtime/index.html` -> `../assets/global.css?v=0.6.1`
- `overtime/index.html` -> `../assets/global.js?v=0.6.1`
- `overtime/index.html` -> `../assets/icons/apple-touch-icon.png`
- `overtime/index.html` -> `../assets/icons/favicon.ico`
- `overtime/index.html` -> `../assets/icons/favicon.svg`
- `overtime/index.html` -> `../assets/icons/site.webmanifest`
- `pay-planner/index.html` -> `../assets/components/footer.js?v=0.9.9.6`
- `pay-planner/index.html` -> `../assets/components/header.js?v=0.9.9.6`
- `pay-planner/index.html` -> `../assets/global.css?v=0.9.9.6`
- `pay-planner/index.html` -> `../assets/global.js?v=0.9.9.6`
- `pay-planner/index.html` -> `../assets/icons/apple-touch-icon.png`
- `pay-planner/index.html` -> `../assets/icons/favicon.ico`
- `pay-planner/index.html` -> `../assets/icons/favicon.svg`
- `pay-planner/index.html` -> `../assets/icons/site.webmanifest`
- `paycheck/index.html` -> `../assets/components/footer.js?v=0.9.1`
- `paycheck/index.html` -> `../assets/components/header.js?v=0.9.1`
- `paycheck/index.html` -> `../assets/global.css?v=0.9.1`
- `paycheck/index.html` -> `../assets/global.js?v=0.9.1`
- `paycheck/index.html` -> `../assets/icons/apple-touch-icon.png`
- `paycheck/index.html` -> `../assets/icons/favicon.ico`
- `paycheck/index.html` -> `../assets/icons/favicon.svg`
- `paycheck/index.html` -> `../assets/icons/site.webmanifest`
- `privacy/index.html` -> `../assets/components/footer.js?v=0.9.9.6`
- `privacy/index.html` -> `../assets/components/header.js?v=0.9.9.6`
- `privacy/index.html` -> `../assets/global.css?v=0.9.9.6`
- `privacy/index.html` -> `../assets/global.js?v=0.9.9.6`
- `privacy/index.html` -> `../assets/icons/apple-touch-icon.png`
- `privacy/index.html` -> `../assets/icons/favicon.ico`
- `privacy/index.html` -> `../assets/icons/favicon.svg`
- `privacy/index.html` -> `../assets/icons/site.webmanifest`
- `report-issue/index.html` -> `../assets/components/footer.js?v=0.9.9.6`
- `report-issue/index.html` -> `../assets/components/header.js?v=0.9.9.6`
- `report-issue/index.html` -> `../assets/global.css?v=0.9.9.6`
- `report-issue/index.html` -> `../assets/global.js?v=0.9.9.6`
- `report-issue/index.html` -> `../assets/icons/apple-touch-icon.png`
- `report-issue/index.html` -> `../assets/icons/favicon.ico`
- `report-issue/index.html` -> `../assets/icons/favicon.svg`
- `report-issue/index.html` -> `../assets/icons/site.webmanifest`
- `request-feature/index.html` -> `../assets/components/footer.js?v=0.9.9.6`
- `request-feature/index.html` -> `../assets/components/header.js?v=0.9.9.6`
- `request-feature/index.html` -> `../assets/global.css?v=0.9.9.6`
- `request-feature/index.html` -> `../assets/global.js?v=0.9.9.6`
- `request-feature/index.html` -> `../assets/icons/apple-touch-icon.png`
- `request-feature/index.html` -> `../assets/icons/favicon.ico`
- `request-feature/index.html` -> `../assets/icons/favicon.svg`
- `request-feature/index.html` -> `../assets/icons/site.webmanifest`
- `roadmap/index.html` -> `../assets/components/footer.js?v=0.9.9.6`
- `roadmap/index.html` -> `../assets/components/header.js?v=0.9.9.6`
- `roadmap/index.html` -> `../assets/global.css?v=0.9.9.6`
- `roadmap/index.html` -> `../assets/global.js?v=0.9.9.6`
- `roadmap/index.html` -> `../assets/icons/apple-touch-icon.png`
- `roadmap/index.html` -> `../assets/icons/favicon.ico`
- `roadmap/index.html` -> `../assets/icons/favicon.svg`
- `roadmap/index.html` -> `../assets/icons/site.webmanifest`
- `schedule/index.html` -> `../assets/components/footer.js?v=0.9.9.6`
- `schedule/index.html` -> `../assets/components/header.js?v=0.9.9.6`
- `schedule/index.html` -> `../assets/global.css?v=0.9.9.6`
- `schedule/index.html` -> `../assets/global.js?v=0.9.9.6`
- `status/index.html` -> `../assets/components/footer.js?v=0.9.9.6`
- `status/index.html` -> `../assets/components/header.js?v=0.9.9.6`
