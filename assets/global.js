/*
Signal Labs
Shared Asset
File: assets/global.js
Version: v0.3
Purpose: Shared navigation, modal utilities, UTC helper, and ad slot initialization
*/

function getCurrentUtcTime() {
  return new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";
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

function getRelativeRootPath() {
  const path = window.location.pathname;

  if (path.includes("/overtime/") || path.includes("/timeoff/")) {
    return "../";
  }

  return "";
}

function getActiveToolPath() {
  const path = window.location.pathname;

  if (path.includes("/overtime/")) {
    return "overtime";
  }

  if (path.includes("/timeoff/")) {
    return "timeoff";
  }

  return "home";
}

function buildSignalNavigation() {
  if (document.querySelector(".signal-nav")) {
    return;
  }

  const rootPath = getRelativeRootPath();
  const activePath = getActiveToolPath();

  const nav = document.createElement("nav");
  nav.className = "signal-nav";
  nav.setAttribute("aria-label", "Signal Labs navigation");

  nav.innerHTML = `
    <div class="signal-nav-inner">
      <a class="signal-nav-brand" href="${rootPath}">Signal Labs</a>

      <div class="signal-nav-links">
        <a class="signal-nav-link ${activePath === "home" ? "is-active" : ""}" href="${rootPath}">Home</a>
        <a class="signal-nav-link ${activePath === "overtime" ? "is-active" : ""}" href="${rootPath}overtime/">Overtime</a>
        <a class="signal-nav-link ${activePath === "timeoff" ? "is-active" : ""}" href="${rootPath}timeoff/">Time Off</a>
      </div>
    </div>
  `;

  document.body.insertBefore(nav, document.body.firstChild);
}


function initializeAdSlots() {
  const adSlots = document.querySelectorAll("[data-ad-slot]");

  adSlots.forEach((slot) => {
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



/*
--------------------------------
v0.2.4 Modal UX Polish
--------------------------------
*/

function closeActiveTextModal() {
  const modal = document.getElementById("modal");

  if (!modal) {
    return;
  }

  modal.classList.add("hidden");
}

function initializeModalUxPolish() {
  const modal = document.getElementById("modal");
  const modalBox = modal ? modal.querySelector(".modal-box") : null;

  if (!modal) {
    return;
  }

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeActiveTextModal();
    }
  });

  if (modalBox) {
    modalBox.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) {
      closeActiveTextModal();
    }
  });
}


document.addEventListener("DOMContentLoaded", () => {
  buildSignalNavigation();
  initializeAdSlots();
  initializeModalUxPolish();

  const closeButton = document.getElementById("closeModal");
  const modal = document.getElementById("modal");

  if (closeButton) {
    closeButton.addEventListener("click", closeTextModal);
  }

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeTextModal();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeTextModal();
    }
  });

  const openChangelog = document.getElementById("openChangelog");
  const openRoadmap = document.getElementById("openRoadmap");

  if (openChangelog && !openChangelog.dataset.globalModalBound) {
    openChangelog.dataset.globalModalBound = "true";
    openChangelog.addEventListener("click", () => {
      openTextModal({
        title: "CHANGELOG",
        file: "CHANGELOG.md"
      });
    });
  }

  if (openRoadmap && !openRoadmap.dataset.globalModalBound) {
    openRoadmap.dataset.globalModalBound = "true";
    openRoadmap.addEventListener("click", () => {
      openTextModal({
        title: "ROADMAP",
        file: "ROADMAP.md"
      });
    });
  }
});
