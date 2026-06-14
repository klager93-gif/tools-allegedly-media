# Schedule File Organization

As of v5.1.0, public Schedule HTML pages remain at `/schedule/*.html` to avoid breaking links. Page-specific CSS and JS support files are grouped under `/schedule/pages/` by module.

## Page support folders

- `/schedule/pages/calendar/`
- `/schedule/pages/coverage/`
- `/schedule/pages/people/`
- `/schedule/pages/requests/`
- `/schedule/pages/rules/`
- `/schedule/pages/settings/`
- `/schedule/pages/workspace/`

## Files intentionally kept at Schedule root

- Public HTML pages
- `app-shell.css`
- `app-shell.js`
- project documentation

## Removed legacy files

- `style.css`
- `script.js`
- `footer.css`
- `schedule-nav.css`

These were removed because the Schedule desktop UI is now controlled by `app-shell.css` and `app-shell.js`.
