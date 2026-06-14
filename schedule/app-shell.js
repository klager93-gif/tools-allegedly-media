/*
Signal Labs
Area: Signal Schedule
File: schedule/app-shell.js
Version: v3.1.0
Purpose: Enhances Schedule pages with a desktop application toolbar and grouped navigation.
*/
(function () {
  const body = document.body;
  if (!body || body.dataset.signalArea !== 'Signal Schedule') return;

  const nav = document.querySelector('.schedule-subnav');
  const linksWrap = document.querySelector('.schedule-subnav__links');
  const title = body.dataset.signalTitle || document.title.replace('— Signal Schedule', '').trim() || 'Signal Schedule';
  const version = 'v3.1.0';
  body.dataset.signalVersion = version;

  if (linksWrap && !linksWrap.dataset.grouped) {
    const groups = [
      ['Command', ['index.html', 'weekly-board.html', 'daily-board.html', 'schedule.html', 'reports.html']],
      ['People', ['employees.html', 'profile.html', 'timeline.html', 'supervisors.html', 'seniority.html', 'qualifications.html', 'training.html', 'eligibility.html']],
      ['Staffing', ['assignments.html', 'assignment-generator.html', 'conflict-detection.html', 'staffing.html', 'coverage.html', 'coverage-spots.html']],
      ['Requests', ['approvals.html', 'leave.html', 'leave-banks.html', 'open-shifts.html', 'ot-volunteer-board.html', 'shift-trades.html', 'trades.html']],
      ['Rules & Admin', ['mandation.html', 'permissions.html', 'notifications.html', 'shortcodes.html', 'settings.html']]
    ];
    const existing = Array.from(linksWrap.querySelectorAll('a'));
    const byHref = new Map(existing.map((a) => [a.getAttribute('href'), a]));
    linksWrap.innerHTML = '';
    groups.forEach(([label, hrefs]) => {
      const available = hrefs.map((href) => byHref.get(href)).filter(Boolean);
      if (!available.length) return;
      const group = document.createElement('div');
      group.className = 'schedule-subnav__group';
      group.textContent = label;
      linksWrap.appendChild(group);
      available.forEach((a) => linksWrap.appendChild(a));
    });
    existing.forEach((a) => {
      if (!a.parentNode) linksWrap.appendChild(a);
    });
    linksWrap.dataset.grouped = 'true';
  }

  if (nav && !document.querySelector('.schedule-app-toolbar')) {
    const toolbar = document.createElement('header');
    toolbar.className = 'schedule-app-toolbar';
    toolbar.innerHTML = `
      <div>
        <p class="schedule-app-toolbar__eyebrow">Signal Schedule Desktop</p>
        <h1>${escapeHtml(title)}</h1>
      </div>
      <div class="schedule-app-toolbar__meta" aria-label="Workspace status">
        <span class="schedule-app-chip schedule-app-chip--good">Alpha workspace</span>
        <span class="schedule-app-chip">${version}</span>
        <span class="schedule-app-chip schedule-app-chip--warn">Role-based panels</span>
      </div>
    `;
    nav.insertAdjacentElement('afterend', toolbar);
  }

  const footer = document.getElementById('schedule-footer');
  if (footer) footer.dataset.scheduleVersion = version;

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  }
})();
