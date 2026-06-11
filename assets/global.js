/*
Signal Labs Global JS
Version: v0.1.0-schedule-support
Purpose: Shared helpers for Signal Labs tools.
*/
(function () {
  function toast(message, type) {
    var zone = document.querySelector('.signal-toast-zone');
    if (!zone) {
      zone = document.createElement('div');
      zone.className = 'signal-toast-zone';
      document.body.appendChild(zone);
    }
    var item = document.createElement('div');
    item.className = 'signal-toast signal-toast-' + (type || 'info');
    item.textContent = message;
    zone.appendChild(item);
    window.setTimeout(function () {
      item.style.opacity = '0';
      item.style.transform = 'translateY(6px)';
      window.setTimeout(function () { item.remove(); }, 220);
    }, 2600);
  }

  function dollars(value) {
    return Number(value || 0).toLocaleString(undefined, { style: 'currency', currency: 'USD' });
  }

  window.SignalLabs = window.SignalLabs || {};
  window.SignalLabs.toast = toast;
  window.SignalLabs.dollars = dollars;
})();
