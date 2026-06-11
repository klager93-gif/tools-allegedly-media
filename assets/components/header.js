/*
Signal Labs Component File: assets/components/header.js
Version: v0.9.9.4
Purpose: Shared Signal Labs header/navigation component.
*/
(function () {
  function rootPath() {
    var path = window.location.pathname;
    if (/^\/(paycheck|pay-planner|overtime|timeoff|schedule)\//.test(path)) return '../';
    if (/^\/(changelog|roadmap|how-to|report-issue|request-feature|contact|about|privacy|terms|status)\//.test(path)) return '../';
    return '';
  }

  function renderHeader() {
    var mount = document.getElementById('sl-header');
    if (!mount || mount.dataset.signalRendered) return;

    var root = rootPath();
    var current = window.location.pathname.replace(/^\/+|\/+$/g, '').split('/')[0] || 'home';
    var links = [
      { key: 'home', label: 'Home', href: root },
      { key: 'paycheck', label: 'Paycheck', href: root + 'paycheck/' },
      { key: 'overtime', label: 'Overtime', href: root + 'overtime/' },
      { key: 'timeoff', label: 'Time Off', href: root + 'timeoff/' },
      { key: 'schedule', label: 'Schedule', href: root + 'schedule/' },
      { key: 'roadmap', label: 'Roadmap', href: root + 'roadmap/' }
    ];

    mount.dataset.signalRendered = 'true';
    mount.innerHTML = '<nav class="signal-nav" aria-label="Signal Labs navigation">' +
      '<div class="signal-nav-inner">' +
      '<a class="signal-nav-brand" href="' + root + '"><span aria-hidden="true">⌁</span><span>Signal Labs</span></a>' +
      '<button class="signal-nav-toggle" type="button" aria-expanded="false" aria-controls="signalNavLinks">Menu</button>' +
      '<div class="signal-nav-links" id="signalNavLinks">' +
      links.map(function (link) {
        var active = link.key === current || (link.key === 'home' && current === '');
        return '<a class="signal-nav-link' + (active ? ' is-active' : '') + '" href="' + link.href + '">' + link.label + '</a>';
      }).join('') +
      '</div>' +
      '</div>' +
      '</nav>';

    var toggle = mount.querySelector('.signal-nav-toggle');
    var menu = mount.querySelector('.signal-nav-links');
    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        var open = menu.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderHeader);
  else renderHeader();
  window.SignalLabsHeader = { render: renderHeader };
})();
