/*
Signal Labs Shared Asset File: assets/global.js
Version: v0.9.0
Purpose: Shared navigation, metadata-aware footer links, modal/dialog, toast, UTC helper, action bar support, and ad slot initialization.
*/

function getCurrentUtcTime() {
  return new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";
}

function getRelativeRootPath() {
  const path = window.location.pathname;
  if (path.includes("/overtime/") || path.includes("/timeoff/") || path.includes("/paycheck/")) return "../";
  if (/^\/(changelog|roadmap|how-to|report-issue|request-feature|contact|about|privacy|terms|status)\//.test(path)) return "../";
  return "";
}

function getActiveToolPath() {
  const path = window.location.pathname;
  if (path.includes("/overtime/")) return "overtime";
  if (path.includes("/timeoff/")) return "timeoff";
  if (path.includes("/paycheck/")) return "paycheck";
  return "home";
}

function getSignalPageMeta() {
  const body = document.body || {};
  const dataset = body.dataset || {};
  const active = getActiveToolPath();
  const rootPath = getRelativeRootPath();
  return {
    area: dataset.signalArea || (active === "home" ? "Home" : active.charAt(0).toUpperCase() + active.slice(1)),
    title: dataset.signalTitle || document.title || "Signal Labs",
    version: dataset.signalVersion || "",
    theme: dataset.signalTheme || "",
    status: dataset.signalStatus || "",
    description: dataset.signalDescription || "Useful tools without the noise.",
    changelog: dataset.signalChangelog || rootPath + "changelog/",
    roadmap: dataset.signalRoadmap || rootPath + "roadmap/",
    howto: dataset.signalHowto || rootPath + "how-to/",
    globalLayout: dataset.signalGlobalLayout === "true"
  };
}

function bindSignalNavigationToggle(nav) {
  if (!nav || nav.dataset.signalNavBound) return;
  const button = nav.querySelector(".signal-nav-toggle");
  const links = nav.querySelector(".signal-nav-links");
  if (!button || !links) return;
  nav.dataset.signalNavBound = "true";
  button.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
}

function buildSignalNavigation() {
  const existingNav = document.querySelector(".signal-nav");
  if (existingNav) {
    bindSignalNavigationToggle(existingNav);
    return;
  }
  const rootPath = getRelativeRootPath();
  const activePath = getActiveToolPath();
  const nav = document.createElement("nav");
  nav.className = "signal-nav home-nav";
  nav.setAttribute("aria-label", "Signal Labs navigation");
  const navId = "signalNavLinks";
  const mark = `<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><rect x="4" y="4" width="24" height="24" rx="5"></rect><path d="M9 22h14"></path><path d="M10 18l5-5 4 4 5-7"></path><path d="M20 10h4v4"></path></svg>`;
  const link = (path, label) => `<a class="signal-nav-link ${activePath === path ? "is-active" : ""}" href="${rootPath}${path === "home" ? "" : path + "/"}">${label}</a>`;
  nav.innerHTML = `
    <div class="signal-nav-inner home-nav-inner">
      <a class="signal-nav-brand signal-nav-mark" href="${rootPath}" aria-label="Signal Labs home">${mark}</a>
      <button class="signal-nav-toggle" type="button" aria-expanded="false" aria-controls="${navId}">☰ Menu</button>
      <div id="${navId}" class="signal-nav-links home-nav-links">
        ${link("home", "Home")}
        ${link("paycheck", "Paycheck")}
        ${link("overtime", "Overtime")}
        ${link("timeoff", "Time Off")}
      </div>
    </div>
  `;
  document.body.insertBefore(nav, document.body.firstChild);
  bindSignalNavigationToggle(nav);
}

function buildSignalFooter() {
  const meta = getSignalPageMeta();
  if (!meta.globalLayout || document.querySelector(".signal-footer") || document.querySelector("footer.version")) return;
  const rootPath = getRelativeRootPath();
  const footer = document.createElement("footer");
  footer.className = "signal-footer";
  const metaText = [meta.area, meta.version, meta.theme].filter(Boolean).join(" · ");
  footer.innerHTML = `
    <div class="signal-footer-inner">
      <div>
        <div class="signal-footer-title">${meta.title}</div>
        <div class="signal-footer-meta">${metaText}</div>
        <div class="signal-footer-copy">© 2026 Signal Labs. All rights reserved.</div>
      </div>
      <div class="signal-footer-links">
        <a class="signal-footer-link" href="${rootPath}how-to/">How To</a>
        <a class="signal-footer-link" href="${rootPath}roadmap/">Roadmap</a>
        <a class="signal-footer-link" href="${rootPath}changelog/">Changelog</a>
      </div>
    </div>
  `;
  document.body.appendChild(footer);
}

function initializeAdSlots() {
  document.querySelectorAll("[data-ad-slot]").forEach((slot) => {
    const status = slot.dataset.adStatus || "disabled";
    slot.classList.add("ad-slot");
    if (status === "disabled") {
      slot.classList.add("is-disabled");
      slot.setAttribute("aria-hidden", "true");
      slot.hidden = true;
      return;
    }
    if (status === "placeholder") {
      slot.classList.add("is-placeholder");
      if (!slot.querySelector(".ad-placeholder")) {
        const placeholder = document.createElement("span");
        placeholder.className = "ad-placeholder";
        placeholder.textContent = "Ad slot reserved";
        slot.appendChild(placeholder);
      }
    }
  });
}

function ensureSignalModal() {
  let modal = document.getElementById("modal");
  if (modal) return modal;
  modal = document.createElement("div");
  modal.id = "modal";
  modal.className = "modal hidden";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "modalTitle");
  modal.innerHTML = `
    <div class="modal-box">
      <button id="closeModal" class="modal-close" type="button" aria-label="Close">×</button>
      <h2 id="modalTitle">Signal Labs</h2>
      <pre id="modalContent">Loading...</pre>
    </div>
  `;
  document.body.appendChild(modal);
  return modal;
}

function closeTextModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.classList.add("hidden");
}

function showSignalModal(options) {
  const modal = ensureSignalModal();
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.getElementById("modalContent");
  if (!modal || !modalTitle || !modalContent) return;
  modalTitle.textContent = (options && options.title) || "Signal Labs";
  modalContent.textContent = (options && options.message) || "";
  modal.classList.remove("hidden");
}

function showSignalToast(message, type) {
  if (!message) return;
  let zone = document.querySelector(".signal-toast-zone");
  if (!zone) {
    zone = document.createElement("div");
    zone.className = "signal-toast-zone";
    document.body.appendChild(zone);
  }
  const toast = document.createElement("div");
  toast.className = `signal-toast signal-toast-${type || "info"}`;
  toast.textContent = message;
  zone.appendChild(toast);
  window.setTimeout(() => toast.remove(), 4200);
}

function initializeModalUxPolish() {
  const closeButton = document.getElementById("closeModal");
  const modal = document.getElementById("modal");
  const modalBox = modal ? modal.querySelector(".modal-box") : null;
  if (closeButton && !closeButton.dataset.signalBound) {
    closeButton.dataset.signalBound = "true";
    closeButton.addEventListener("click", closeTextModal);
  }
  if (modal && !modal.dataset.signalBound) {
    modal.dataset.signalBound = "true";
    modal.addEventListener("click", (event) => { if (event.target === modal) closeTextModal(); });
  }
  if (modalBox && !modalBox.dataset.signalBound) {
    modalBox.dataset.signalBound = "true";
    modalBox.addEventListener("click", (event) => event.stopPropagation());
  }
  if (!document.documentElement.dataset.signalEscapeBound) {
    document.documentElement.dataset.signalEscapeBound = "true";
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeTextModal(); });
  }
}

function initializeTextModalTriggers() {
  document.querySelectorAll("[data-open-text-modal]").forEach((button) => {
    if (button.dataset.signalModalBound) return;
    button.dataset.signalModalBound = "true";
    const file = button.dataset.openTextModal;
    button.addEventListener("click", () => {
      if (file) window.location.href = file;
    });
  });
}

function initializeSharedActionBars() {
  document.querySelectorAll("[data-shared-action-bar], [data-signal-action-bar]").forEach((bar) => {
    bar.querySelectorAll("button[data-action-target]").forEach((button) => {
      const targetId = button.getAttribute("data-action-target");
      const target = targetId ? document.getElementById(targetId) : null;
      if (!target) {
        button.disabled = true;
        button.title = "Action unavailable on this page.";
      }
    });
  });
}

function initHomeFooterAccordions() {
  const groups = document.querySelectorAll('.home-footer-group');
  if (!groups.length) return;
  const sync = () => {
    const collapse = window.matchMedia('(max-width: 700px)').matches;
    groups.forEach((group) => {
      if (collapse) group.removeAttribute('open');
      else group.setAttribute('open', '');
    });
  };
  sync();
  window.addEventListener('resize', sync);
}

document.addEventListener("DOMContentLoaded", () => {
  buildSignalNavigation();
  buildSignalFooter();
  initializeAdSlots();
  initializeModalUxPolish();
  initializeTextModalTriggers();
  initializeSharedActionBars();
  initHomeFooterAccordions();
});
