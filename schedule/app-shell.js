/*
Signal Labs
Area: Signal Schedule
File: schedule/app-shell.js
Version: v3.3.0
Purpose: Desktop application shell, connected flyout navigation, and client-side theme engine.
*/
(function () {
  const body = document.body;
  if (!body || body.dataset.signalArea !== 'Signal Schedule') return;

  const version = 'v3.3.0';
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
    const groups = [
      { label: 'Overview', href: 'index.html', icon: '⌂' },
      { label: 'Calendar', href: 'schedule.html', icon: '▣', children: ['weekly-board.html', 'daily-board.html', 'schedule.html'] },
      { label: 'Employees', href: 'employees.html', icon: '👥', children: ['employees.html', 'profile.html', 'timeline.html', 'supervisors.html', 'seniority.html', 'qualifications.html', 'training.html', 'eligibility.html'] },
      { label: 'Assignments', href: 'assignments.html', icon: '▦', children: ['assignments.html', 'assignment-generator.html', 'conflict-detection.html'] },
      { label: 'Coverage', href: 'coverage.html', icon: '▥', children: ['staffing.html', 'coverage.html', 'coverage-spots.html'] },
      { label: 'Requests', href: 'leave.html', icon: '✎', children: ['approvals.html', 'leave.html', 'leave-banks.html', 'open-shifts.html', 'ot-volunteer-board.html', 'shift-trades.html', 'trades.html'] },
      { label: 'Rules', href: 'mandation.html', icon: '⚙', children: ['mandation.html', 'permissions.html', 'notifications.html', 'shortcodes.html', 'benefits.html'] },
      { label: 'Reports', href: 'reports.html', icon: '◴' },
      { label: 'Settings', href: 'settings.html', icon: '⚙' }
    ];

    linksWrap.innerHTML = '';
    nav.classList.add('schedule-subnav--flyout');

    const label = nav.querySelector('.schedule-subnav__label span:first-child');
    if (label) label.textContent = 'Signal Schedule';
    const role = nav.querySelector('.schedule-subnav__role');
    if (role) role.textContent = 'Desktop workspace';

    groups.forEach((group) => {
      const primary = byHref.get(group.href);
      const children = (group.children || []).map((href) => byHref.get(href)).filter(Boolean);
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
        <label class="schedule-theme-picker">
          <span>Theme</span>
          <select data-schedule-theme-picker aria-label="Choose Schedule theme">
            ${allowedThemes.map((theme) => `<option value="${theme}">${themeLabels[theme]}</option>`).join('')}
          </select>
        </label>
        <span class="schedule-app-chip schedule-app-chip--good">Alpha workspace</span>
        <span class="schedule-app-chip">${version}</span>
        <span class="schedule-app-chip schedule-app-chip--warn">Role-based panels</span>
      </div>
    `;

    const picker = toolbar.querySelector('[data-schedule-theme-picker]');
    if (picker) {
      picker.value = getStoredTheme();
      picker.addEventListener('change', (event) => applyTheme(event.target.value));
    }
  }

  function syncFooter() {
    const footer = document.getElementById('schedule-footer');
    if (footer) footer.dataset.scheduleVersion = version;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  }
})();
