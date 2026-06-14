/*
Signal Labs
Area: Signal Schedule
File: schedule/app-shell.js
Version: v4.3.0
Purpose: Desktop application shell, connected flyout navigation, app-styled controls, publishing navigation, dense workspace defaults, and client-side theme engine.
*/
(function () {
  const body = document.body;
  if (!body || body.dataset.signalArea !== 'Signal Schedule') return;

  const version = 'v4.3.0';
  const title = body.dataset.signalTitle || document.title.replace('— Signal Schedule', '').trim() || 'Signal Schedule';
  const themeKey = 'signalScheduleTheme';
  const allowedThemes = ['midnight', 'light', 'slate', 'cad', 'high-contrast'];
  const themeLabels = {
    midnight: 'Midnight',
    light: 'Light',
    slate: 'Slate',
    cad: 'CAD',
    'high-contrast': 'Contrast'
  };

  body.dataset.signalVersion = version;
  applyTheme(getStoredTheme());
  rebuildNavigation();
  insertToolbar();
  syncFooter();
  enableDenseWorkspace();

  function getStoredTheme() {
    const stored = localStorage.getItem(themeKey);
    if (allowedThemes.includes(stored)) return stored;
    const declared = body.dataset.scheduleThemeMode;
    if (allowedThemes.includes(declared)) return declared;
    return 'midnight';
  }

  function applyTheme(theme) {
    const clean = allowedThemes.includes(theme) ? theme : 'light';
    body.dataset.scheduleTheme = clean;
    document.documentElement.dataset.scheduleTheme = clean;
    localStorage.setItem(themeKey, clean);
  }

  function rebuildNavigation() {
    const nav = document.querySelector('.schedule-subnav');
    const linksWrap = document.querySelector('.schedule-subnav__links');
    if (!nav || !linksWrap || linksWrap.dataset.flyout === 'true') return;

    const currentPath = location.pathname.split('/').pop() || 'index.html';
    const existing = Array.from(linksWrap.querySelectorAll('a'));
    const byHref = new Map(existing.map((a) => [a.getAttribute('href'), a]));
    const linkLabels = {
      'index.html': 'Overview',
      'workspace.html': 'Scheduling Workspace',
      'builder.html': 'Schedule Builder',
      'schedule.html': 'Calendar',
      'weekly-board.html': 'Weekly View',
      'daily-board.html': 'Daily Board',
      'employees.html': 'Employees',
      'profile.html': 'Profile',
      'timeline.html': 'Timeline',
      'supervisors.html': 'Supervisors',
      'seniority.html': 'Seniority & Rotation',
      'qualifications.html': 'Qualifications',
      'training.html': 'Training & Certs',
      'eligibility.html': 'Eligibility',
      'availability.html': 'Availability & Preferences',
      'assignments.html': 'Assignments',
      'assignment-generator.html': 'Assignment Generator',
      'draft-planning.html': 'Draft Planning',
      'planning.html': 'Planning Forecast',
      'publishing.html': 'Publishing',
      'conflict-detection.html': 'Conflict Detection',
      'coverage.html': 'Coverage Board',
      'coverage-spots.html': 'Coverage Spots',
      'staffing.html': 'Minimum Staffing',
      'leave.html': 'Leave Requests',
      'leave-banks.html': 'Leave Banks',
      'open-shifts.html': 'Open Shifts',
      'ot-volunteer-board.html': 'OT Volunteer Board',
      'shift-trades.html': 'Shift Trades',
      'trades.html': 'Trades Compatibility',
      'approvals.html': 'Approvals',
      'mandation.html': 'Mandation',
      'permissions.html': 'Permissions',
      'notifications.html': 'Notifications',
      'shortcodes.html': 'Shortcodes',
      'benefits.html': 'Benefit Ledger',
      'visibility.html': 'Visibility & Privacy',
      'reports.html': 'Reports',
      'settings.html': 'Settings',
      'employee/index.html': 'Employee Portal'
    };
    const makeNavLink = (href) => {
      const found = byHref.get(href);
      if (found) return found;
      const a = document.createElement('a');
      a.href = href;
      a.textContent = linkLabels[href] || href.replace('.html', '').replace(/-/g, ' ');
      return a;
    };
    const groups = [
      { label: 'Overview', href: 'index.html', icon: '⌂', children: ['index.html', 'workspace.html', 'planning.html', 'draft-planning.html'] },
      { label: 'Calendar', href: 'builder.html', icon: '▣', children: ['builder.html', 'workspace.html', 'planning.html', 'draft-planning.html', 'publishing.html', 'weekly-board.html', 'daily-board.html', 'schedule.html'] },
      { label: 'Employees', href: 'employees.html', icon: '👥', children: ['employees.html', 'employee/index.html', 'availability.html', 'profile.html', 'timeline.html', 'supervisors.html', 'seniority.html', 'qualifications.html', 'training.html', 'eligibility.html'] },
      { label: 'Assignments', href: 'assignments.html', icon: '▦', children: ['assignments.html', 'assignment-generator.html', 'planning.html', 'draft-planning.html', 'publishing.html', 'conflict-detection.html'] },
      { label: 'Coverage', href: 'coverage.html', icon: '▥', children: ['staffing.html', 'coverage.html', 'coverage-spots.html'] },
      { label: 'Requests', href: 'leave.html', icon: '✎', children: ['approvals.html', 'leave.html', 'leave-banks.html', 'open-shifts.html', 'ot-volunteer-board.html', 'shift-trades.html'] },
      { label: 'Rules', href: 'mandation.html', icon: '⚙', children: ['mandation.html', 'permissions.html', 'notifications.html', 'visibility.html', 'shortcodes.html', 'benefits.html', 'availability.html'] },
      { label: 'Reports', href: 'reports.html', icon: '◴' },
      { label: 'Settings', href: 'settings.html', icon: '⚙', children: ['settings.html', 'visibility.html'] }
    ];

    linksWrap.innerHTML = '';
    nav.classList.add('schedule-subnav--flyout');

    const label = nav.querySelector('.schedule-subnav__label span:first-child');
    if (label) label.textContent = 'Signal Schedule';
    const role = nav.querySelector('.schedule-subnav__role');
    if (role) role.textContent = 'Desktop workspace';

    groups.forEach((group) => {
      const primary = makeNavLink(group.href);
      const children = (group.children || []).map((href) => makeNavLink(href)).filter(Boolean);
      if (!primary && !children.length) return;

      const item = document.createElement('div');
      item.className = 'schedule-nav-item';
      const active = [group.href].concat(group.children || []).includes(currentPath);
      if (active) item.classList.add('is-active');

      const a = primary || children[0].cloneNode(true);
      a.className = 'schedule-nav-primary';
      a.innerHTML = `<span class="schedule-nav-icon" aria-hidden="true">${group.icon || '•'}</span><span>${escapeHtml(group.label)}</span>${children.length ? '<span class="schedule-nav-caret" aria-hidden="true">›</span>' : ''}`;
      if (active) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
      item.appendChild(a);

      if (children.length) {
        const flyout = document.createElement('div');
        flyout.className = 'schedule-nav-flyout';
        const heading = document.createElement('div');
        heading.className = 'schedule-nav-flyout__heading';
        heading.textContent = group.label;
        flyout.appendChild(heading);
        children.forEach((child) => {
          const clone = child.cloneNode(true);
          clone.className = 'schedule-nav-flyout__link';
          if ((clone.getAttribute('href') || '') === currentPath) clone.setAttribute('aria-current', 'page');
          else clone.removeAttribute('aria-current');
          flyout.appendChild(clone);
        });
        item.appendChild(flyout);
      }
      linksWrap.appendChild(item);
    });

    linksWrap.dataset.flyout = 'true';
  }

  function insertToolbar() {
    const nav = document.querySelector('.schedule-subnav');
    let toolbar = document.querySelector('.schedule-app-toolbar');
    if (!nav) return;
    if (!toolbar) {
      toolbar = document.createElement('header');
      toolbar.className = 'schedule-app-toolbar';
      nav.insertAdjacentElement('afterend', toolbar);
    }
    toolbar.innerHTML = `
      <div>
        <p class="schedule-app-toolbar__eyebrow">Signal Schedule Desktop</p>
        <h1>${escapeHtml(title)}</h1>
      </div>
      <div class="schedule-app-toolbar__meta" aria-label="Workspace controls">
        <div class="schedule-theme-menu" data-schedule-theme-menu>
          <button class="schedule-control schedule-theme-menu__button" type="button" data-schedule-theme-button aria-haspopup="listbox" aria-expanded="false">
            <span class="schedule-control__label">Theme</span>
            <span data-schedule-theme-label>${themeLabels[getStoredTheme()]}</span>
            <span class="schedule-control__caret" aria-hidden="true">›</span>
          </button>
          <div class="schedule-theme-menu__panel" data-schedule-theme-panel role="listbox" aria-label="Choose Schedule theme">
            ${allowedThemes.map((theme) => `<button type="button" role="option" class="schedule-theme-menu__option" data-theme-option="${theme}" aria-selected="${getStoredTheme() === theme ? 'true' : 'false'}"><span class="schedule-theme-menu__check" aria-hidden="true">✓</span><span>${themeLabels[theme]}</span></button>`).join('')}
          </div>
        </div>
        <span class="schedule-app-chip schedule-app-chip--good">Theme-ready workspace</span>
        <span class="schedule-app-chip">${version}</span>
        <span class="schedule-app-chip schedule-app-chip--warn">Desktop UI</span>
      </div>
    `;

    wireThemeMenu(toolbar);
  }

  function wireThemeMenu(toolbar) {
    const menu = toolbar.querySelector('[data-schedule-theme-menu]');
    if (!menu) return;
    const button = menu.querySelector('[data-schedule-theme-button]');
    const label = menu.querySelector('[data-schedule-theme-label]');
    const options = Array.from(menu.querySelectorAll('[data-theme-option]'));
    const close = () => {
      menu.classList.remove('is-open');
      if (button) button.setAttribute('aria-expanded', 'false');
    };
    const open = () => {
      menu.classList.add('is-open');
      if (button) button.setAttribute('aria-expanded', 'true');
    };
    const setTheme = (theme) => {
      applyTheme(theme);
      if (label) label.textContent = themeLabels[theme] || theme;
      options.forEach((option) => option.setAttribute('aria-selected', option.dataset.themeOption === theme ? 'true' : 'false'));
      close();
    };
    if (button) {
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        menu.classList.contains('is-open') ? close() : open();
      });
      button.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          open();
          const selected = menu.querySelector('[aria-selected="true"]') || options[0];
          if (selected) selected.focus();
        }
      });
    }
    options.forEach((option) => {
      option.addEventListener('click', (event) => {
        event.stopPropagation();
        setTheme(option.dataset.themeOption);
      });
      option.addEventListener('keydown', (event) => {
        const index = options.indexOf(option);
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          (options[index + 1] || options[0]).focus();
        }
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          (options[index - 1] || options[options.length - 1]).focus();
        }
        if (event.key === 'Escape') {
          event.preventDefault();
          close();
          if (button) button.focus();
        }
      });
    });
    document.addEventListener('click', (event) => {
      if (!menu.contains(event.target)) close();
    });
  }

  function syncFooter() {
    const footer = document.getElementById('schedule-footer');
    if (!footer) return;
    footer.dataset.scheduleVersion = version;
    footer.className = 'schedule-footer';
    footer.innerHTML = `
      <div class="schedule-footer__inner">
        <div class="schedule-footer__brand">
          <span class="schedule-footer__title">Signal Schedule • ${version}</span>
          <span class="schedule-footer__meta">Built by Signal Labs</span>
        </div>
        <nav class="schedule-footer__links" aria-label="Schedule footer links">
          <a href="README.md">Docs</a><span class="schedule-footer__dot">•</span>
          <a href="ROADMAP.md">Roadmap</a><span class="schedule-footer__dot">•</span>
          <a href="CHANGELOG.md">Changelog</a>
        </nav>
      </div>`;
  }


  function enableDenseWorkspace() {
    body.classList.add('schedule-density-standard');
    const main = document.querySelector('main');
    if (main) main.classList.add('schedule-workspace');

    document.querySelectorAll('main section').forEach((section) => {
      section.classList.add('schedule-section');
    });

    document.querySelectorAll('table').forEach((table) => {
      table.classList.add('schedule-data-table');
      const wrap = table.parentElement;
      if (wrap && !wrap.classList.contains('schedule-table-scroll')) {
        wrap.classList.add('schedule-table-scroll');
      }
    });

    document.querySelectorAll('[class*="grid"]').forEach((grid) => {
      if (!grid.classList.contains('schedule-nav-flyout')) grid.classList.add('schedule-dense-grid');
    });

    document.querySelectorAll('[class*="toolbar"]:not(.schedule-app-toolbar)').forEach((toolbar) => {
      toolbar.classList.add('schedule-command-bar');
    });
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  }
})();
