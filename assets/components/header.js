/*
Signal Labs Component File: assets/components/header.js
Version: v0.9.2
Purpose: Shared Signal Labs header/navigation component for Home, public pages, and tools.
*/
(function () {
  function rootPath() {
    var path = window.location.pathname;
    if (path.includes('/paycheck/') || path.includes('/pay-planner/') || path.includes('/overtime/') || path.includes('/timeoff/')) return '../';
    if (/^\/(changelog|roadmap|how-to|report-issue|request-feature|contact|about|privacy|terms|status)\//.test(path)) return '../';
    return '';
  }
  function activePath() {
    var path = window.location.pathname;
    if (path.includes('/pay-planner/')) return 'pay-planner';
    if (path.includes('/paycheck/')) return 'paycheck';
    if (path.includes('/overtime/')) return 'overtime';
    if (path.includes('/timeoff/')) return 'timeoff';
    return 'home';
  }
  function markSvg() {
    return '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><rect x="4" y="4" width="24" height="24" rx="5"></rect><path d="M9 22h14"></path><path d="M10 18l5-5 4 4 5-7"></path><path d="M20 10h4v4"></path></svg>';
  }
  function navLink(root, active, key, label) {
    var href = key === 'home' ? root : root + key + '/';
    return '<a class="signal-nav-link ' + (active === key ? 'is-active' : '') + '" href="' + href + '">' + label + '</a>';
  }
  function renderHeader() {
    var mount = document.getElementById('sl-header');
    if (!mount || mount.dataset.signalRendered) return;
    var root = rootPath();
    var active = activePath();
    mount.dataset.signalRendered = 'true';
    mount.innerHTML = '<nav class="signal-nav home-nav" aria-label="Signal Labs navigation">' +
      '<div class="signal-nav-inner home-nav-inner">' +
      '<a class="signal-nav-brand signal-nav-mark" href="' + root + '" aria-label="Signal Labs home">' + markSvg() + '</a>' +
      '<button class="signal-nav-toggle" type="button" aria-expanded="false" aria-controls="signalNavLinks">☰ Menu</button>' +
      '<div id="signalNavLinks" class="signal-nav-links home-nav-links">' +
      navLink(root, active, 'home', 'Home') +
      navLink(root, active, 'paycheck', 'Paycheck') +
      navLink(root, active, 'overtime', 'Overtime') +
      navLink(root, active, 'timeoff', 'Time Off') +
      '</div></div></nav>';
    var nav = mount.querySelector('.signal-nav');
    var button = mount.querySelector('.signal-nav-toggle');
    var links = mount.querySelector('.signal-nav-links');
    if (button && links) {
      button.addEventListener('click', function () {
        var open = links.classList.toggle('is-open');
        button.setAttribute('aria-expanded', String(open));
      });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderHeader);
  else renderHeader();
  window.SignalLabsHeader = { render: renderHeader };
})();
