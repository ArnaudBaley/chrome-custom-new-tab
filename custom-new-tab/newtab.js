const DEFAULT_URL = "about:blank";
const STORAGE_KEY = "redirectUrl";

function normalizeUrl(value) {
  if (!value || typeof value !== "string") return DEFAULT_URL;
  const trimmed = value.trim();
  if (!trimmed) return DEFAULT_URL;

  // If the user omitted the protocol, assume https.
  if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(trimmed)) {
    return "https://" + trimmed;
  }
  return trimmed;
}

function getTargetUrl() {
  return new Promise((resolve) => {
    if (!chrome || !chrome.storage || !chrome.storage.sync) {
      resolve(DEFAULT_URL);
      return;
    }

    chrome.storage.sync.get({ [STORAGE_KEY]: DEFAULT_URL }, (items) => {
      const raw = items[STORAGE_KEY];
      let candidate = normalizeUrl(raw);
      try {
        // Validate the URL; fall back if invalid.
        // eslint-disable-next-line no-new
        new URL(candidate);
      } catch {
        candidate = DEFAULT_URL;
      }
      resolve(candidate);
    });
  });
}

function redirectTo(url) {
  try {
    window.location.replace(url);
  } catch {
    window.location.href = url;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getTargetUrl().then(redirectTo);
});

