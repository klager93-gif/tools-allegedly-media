function openTextModal(options) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.getElementById("modalContent");

  if (!modal || !modalTitle || !modalContent) {
    return;
  }

  modal.classList.remove("hidden");
  modalTitle.textContent = options.title || "Project Information";
  modalContent.textContent = "Loading...";

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
      modalContent.textContent = "Unable to load file.";
    });
}

function closeTextModal() {
  const modal = document.getElementById("modal");

  if (!modal) {
    return;
  }

  modal.classList.add("hidden");
}

function setupTextModal() {
  const modal = document.getElementById("modal");
  const closeModalButton = document.getElementById("closeModal");

  if (closeModalButton) {
    closeModalButton.addEventListener("click", closeTextModal);
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
}

function formatMoney(amount) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}

function formatNumber(value) {
  return value.toFixed(2);
}

function getCurrentUtcTime() {
  return new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";
}

document.addEventListener("DOMContentLoaded", () => {
  setupTextModal();
});