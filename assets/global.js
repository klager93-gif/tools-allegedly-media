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

document.addEventListener("DOMContentLoaded", () => {
  buildSignalNavigation();

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
