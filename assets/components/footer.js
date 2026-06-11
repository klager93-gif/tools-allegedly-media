/*
Signal Labs Component File: assets/components/footer.js
Version: v0.9.9.4
Purpose: Shared Signal Labs footer component. Compatible with existing home-footer CSS.
*/
(function () {
  function rootPath() {
    var path = window.location.pathname;
    if (path.includes('/paycheck/') || path.includes('/pay-planner/') || path.includes('/overtime/') || path.includes('/timeoff/') || path.includes('/schedule/')) return '../';
    if (/^\/(changelog|roadmap|how-to|report-issue|request-feature|contact|about|privacy|terms|status)\//.test(path)) return '../';
    return '';
  }
  function meta() {
    var ds = document.body ? document.body.dataset : {};
    var path = window.location.pathname.replace(/^\/+|\/+$/g, '');
    var page = path ? path.split('/')[0] : 'home';
    var area = ds.signalArea || 'Home';
    var homePages = {
      '': true,
      'home': true,
      'about': true,
      'changelog': true,
      'contact': true,
      'how-to': true,
      'privacy': true,
      'report-issue': true,
      'request-feature': true,
      'roadmap': true,
      'status': true,
      'terms': true
    };
    var version = ds.signalVersion || (homePages[page] ? 'v0.9.9.4' : '');
    return {
      area: area,
      title: ds.signalTitle || 'Signal Labs',
      version: version,
      theme: ds.signalTheme || '',
      status: ds.signalStatus || 'Active Development',
      description: ds.signalDescription || 'Useful tools without the noise. Lightweight calculators and planning tools built for real-life decisions.',
      statusText: ds.signalStatusText || 'All systems operational. We are constantly improving and adding new tools.'
    };
  }
  function markSvg() {
    return '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><rect x="4" y="4" width="24" height="24" rx="5"></rect><path d="M9 22h14"></path><path d="M10 18l5-5 4 4 5-7"></path><path d="M20 10h4v4"></path></svg>';
  }
  function renderFooter() {
    var mount = document.getElementById('sl-footer');
    if (!mount || mount.dataset.signalRendered) return;
    var root = rootPath();
    var m = meta();
    var statusTitle = m.area && m.area !== 'Home' ? m.area + ' Status' : 'Status';
    mount.dataset.signalRendered = 'true';
    mount.innerHTML = '<footer class="home-footer signal-footer" aria-label="Signal Labs footer">' +
      '<div class="home-footer-main">' +
      '<section class="home-footer-brand" aria-label="Signal Labs summary"><div class="home-footer-brandline"><span class="home-footer-mark" aria-hidden="true">' + markSvg() + '</span><strong>Signal Labs</strong></div><p>Useful tools without the noise. Lightweight calculators and planning tools built for real-life decisions.</p></section>' +
      '<nav class="home-footer-links" aria-label="Footer resources">' +
      '<details class="home-footer-group" open><summary><span>Resources</span></summary><a href="' + root + 'changelog/">Changelog</a><a href="' + root + 'roadmap/">Roadmap</a><a href="' + root + 'how-to/">How To</a></details>' +
      '<details class="home-footer-group" open><summary><span>Support</span></summary><a href="' + root + 'report-issue/">Report an Issue</a><a href="' + root + 'request-feature/">Request a Feature</a><a href="' + root + 'contact/">Contact</a></details>' +
      '<details class="home-footer-group" open><summary><span>About</span></summary><a href="' + root + 'about/">About Signal Labs</a><a href="' + root + 'privacy/">Privacy Policy</a><a href="' + root + 'terms/">Terms of Use</a></details>' +
      '</nav>' +
      '<section class="home-footer-status" aria-label="Project status"><h3>' + statusTitle + '</h3><span class="home-status-pill">● ' + m.status + '</span><p>' + m.statusText + '</p><a class="home-status-link" href="' + root + 'status/">View Status <span aria-hidden="true">→</span></a></section>' +
      '</div>' +
      '<div class="home-footer-bottom"><span>© 2026 Signal Labs' + (m.version ? ' · ' + m.version : '') + '</span></div>' +
      '</footer>';
    syncFooterAccordions(mount);
  }
  function syncFooterAccordions(scope) {
    var groups = (scope || document).querySelectorAll('.home-footer-group');
    if (!groups.length) return;
    var sync = function () {
      var collapse = window.matchMedia('(max-width: 700px)').matches;
      groups.forEach(function (group) {
        if (collapse) group.removeAttribute('open');
        else group.setAttribute('open', '');
      });
    };
    sync();
    window.addEventListener('resize', sync);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderFooter);
  else renderFooter();
  window.SignalLabsFooter = { render: renderFooter };
})();
