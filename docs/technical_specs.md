# Custom New Tab Redirect (Chrome / Chromium, Manifest V3)

This extension lets you choose a custom URL that opens whenever you create a new tab.

It uses Chrome's `chrome_url_overrides.newtab` to replace the default new tab page with a small redirect page that reads your configured URL from `chrome.storage.sync` and navigates there.

## Files

- `manifest.json` – Manifest V3 configuration, new-tab override, and options page.
- `newtab.html` / `newtab.js` – The overridden new-tab page that loads your configured URL and redirects.
- `options.html` / `options.js` – Options UI for setting the URL.

## Loading the extension locally

1. Open Chrome (or a Chromium-based browser).
2. Navigate to `chrome://extensions`.
3. Enable **Developer mode** (top-right toggle).
4. Click **Load unpacked**.
5. Select the `chrome-newtab-extension` folder in this repository.

## Configuring your new-tab URL

1. After loading the extension, on `chrome://extensions` find **Custom New Tab Redirect**.
2. Click **Details** → **Extension options** (or **Options** button, depending on browser).
3. In the options page:
   - Enter the URL you want (e.g. `https://example.com` or `my.site.com`).
   - You can omit the protocol; `https://` will be added automatically.
   - Click **Save**.

New tabs will now open at the configured URL.

If you have not configured a URL yet, the new tab will remain on `about:blank` (no redirect).

## Notes and limitations

- The override is only for normal (non-incognito) windows.
- Only one extension can override the new-tab page at a time; if multiple try, the most recently enabled/installed wins.
- The extension only stores the configured URL in `chrome.storage.sync` and does not perform any tracking or analytics.

