/*
--------------------------------
Signal Labs Shared Scripts
Version: 0.2
Theme: Navigation
--------------------------------
*/

const SIGNAL_LABS_NAV_ITEMS = [
  {
    label: "Home",
    href: "/"
  },
  {
    label: "Overtime",
    href: "/overtime/"
  },
  {
    label: "Time Off",
    href: "/timeoff/"
  }
];

function normalizeSignalPath(pathname) {
  if (!pathname || pathname === "/index.html") {
    return "/";
  }

  let normalized = pathname;

  if (normalized.endsWith("index.html")) {
    normalized = normalized.slice(0, -10);
  }

  if (!normalized.endsWith("/")) {
    normalized += "/";
  }

  return normalized;
}

function getCurrentUtcTime() {
  return new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";
}

function injectSignalLabsNavigation() {
  if (document.querySelector("[data-signal-nav]")) {
    return;
  }

  const navWrap = document.createElement("div");
  navWrap.className = "signal-nav-wrap";
  navWrap.dataset.signalNav = "true";

  const nav = document.createElement("nav");
  nav.className = "signal-nav";
  nav.setAttribute("aria-label", "Signal Labs navigation");

  const brand = document.createElement("a");
  brand.className = "signal-nav-brand";
  brand.href = "/";
  brand.setAttribute("aria-label", "Signal Labs home");

  const mark = document.createElement("span");
  mark.className = "signal-nav-mark";
  mark.setAttribute("aria-hidden", "true");

  const brandText = document.createElement("span");
  brandText.textContent = "Signal Labs";

  brand.appendChild(mark);
  brand.appendChild(brandText);

  const links = document.createElement("div");
  links.className = "signal-nav-links";

  const currentPath = normalizeSignalPath(window.location.pathname);

  SIGNAL_LABS_NAV_ITEMS.forEach((item) => {
    const link = document.createElement("a");
    link.className = "signal-nav-link";
    link.href = item.href;
    link.textContent = item.label;

    if (normalizeSignalPath(item.href) === currentPath) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }

    links.appendChild(link);
  });

  nav.appendChild(brand);
  nav.appendChild(links);
  navWrap.appendChild(nav);

  document.body.insertBefore(navWrap, document.body.firstChild);
}

function openTextModal(options) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.getElementById("modalContent");

  if (!modal || !modalTitle || !modalContent || !options || !options.file) {
    return;
  }

  modalTitle.textContent = options.title || "Project Information";
  modalContent.textContent = "Loading...";
  modal.classList.remove("hidden");

  fetch(options.file)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Unable to load file.");
      }

      return response.text();
    })
    .then((text) => {
      modalContent.textContent = text;
    })
    .catch(() => {
      modalContent.textContent = "Unable to load this project file.";
    });
}

function closeTextModal() {
  const modal = document.getElementById("modal");

  if (modal) {
    modal.classList.add("hidden");
  }
}

function setupSignalLabsModal() {
  const modal = document.getElementById("modal");
  const closeModalButton = document.getElementById("closeModal");

  if (!modal) {
    return;
  }

  if (closeModalButton) {
    closeModalButton.addEventListener("click", closeTextModal);
  }

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeTextModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) {
      closeTextModal();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  injectSignalLabsNavigation();
  setupSignalLabsModal();
});
