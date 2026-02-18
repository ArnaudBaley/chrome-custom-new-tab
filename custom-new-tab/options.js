const STORAGE_KEY = "redirectUrl";

function normalizeUrlForStorage(value) {
  if (!value || typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(trimmed)) {
    return "https://" + trimmed;
  }
  return trimmed;
}

function loadOptions() {
  if (!chrome || !chrome.storage || !chrome.storage.sync) {
    return;
  }

  chrome.storage.sync.get({ [STORAGE_KEY]: "" }, (items) => {
    const input = document.getElementById("redirect-url");
    if (!input) return;
    input.value = items[STORAGE_KEY] || "";
  });
}

function showStatus(message, isError = false) {
  const el = document.getElementById("status");
  if (!el) return;
  el.textContent = message;
  if (isError) {
    el.classList.add("error");
  } else {
    el.classList.remove("error");
  }
}

function saveOptions(event) {
  event.preventDefault();
  if (!chrome || !chrome.storage || !chrome.storage.sync) {
    showStatus("Storage API not available", true);
    return;
  }

  const input = document.getElementById("redirect-url");
  if (!input) return;

  const raw = input.value;
  if (!raw.trim()) {
    showStatus("Please enter a URL.", true);
    return;
  }

  const normalized = normalizeUrlForStorage(raw);

  try {
    // Validate URL format before saving.
    // eslint-disable-next-line no-new
    new URL(normalized);
  } catch {
    showStatus("That does not look like a valid URL.", true);
    return;
  }

  chrome.storage.sync.set({ [STORAGE_KEY]: normalized }, () => {
    showStatus("Saved.");
    setTimeout(() => {
      showStatus("");
    }, 2000);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadOptions();
  const form = document.getElementById("options-form");
  if (form) {
    form.addEventListener("submit", saveOptions);
  }
});

