# PWA Setup

The frontend uses `vite-plugin-pwa`.

Configured in:

```text
frontend/vite.config.ts
```

## Features

- Web app manifest
- Generated service worker
- Offline fallback at `/offline.html`
- API runtime cache with network-first behavior
- Install prompt through `beforeinstallprompt`
- `Download App` prompt when the browser exposes install capability

## Icons

Current placeholder:

```text
frontend/public/icons/icon.svg
```

Before launch, replace it with production PNG icons:

- `192x192`
- `512x512`
- maskable icon

Then update the `icons` array in `frontend/vite.config.ts`.

## Mobile Install

Android Chrome usually shows the custom `Download App` prompt after PWA criteria are met.

iOS Safari does not expose `beforeinstallprompt`; users install through Share -> Add to Home Screen.
