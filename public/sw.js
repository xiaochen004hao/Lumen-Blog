const CACHE_NAME = 'lumen-shell-__BUILD_VERSION__';
const SHELL_URLS = ['/', '/offline', '/archive', '/404.html'];
const precachedAssets = new Set();

async function cacheAsset(cache, url) {
  const response = await fetch(url, { cache: 'reload' });
  if (response.ok) await cache.put(url, response);
  return response;
}

async function cachePage(cache, url) {
  const response = await fetch(url, { cache: 'reload' });
  if (!response.ok) return;

  await cache.put(url, response.clone());
  if (!(response.headers.get('content-type') || '').includes('text/html')) return;

  const html = await response.text();
  const assetUrls = [...html.matchAll(/(?:src|href)=["']([^"']+)["']/g)]
    .map((match) => match[1])
    .filter((value) => value.startsWith('/') && !value.startsWith('//') && value !== '/sw.js')
    .map((value) => value.split('#')[0])
    .filter(Boolean);

  await Promise.allSettled(
    [...new Set(assetUrls)].map(async (assetUrl) => {
      if (precachedAssets.has(assetUrl)) return;
      precachedAssets.add(assetUrl);
      try {
        await cacheAsset(cache, assetUrl);
      } catch (_) {
        /* A missing optional asset must not abort installation. */
      }
    })
  );
}

async function fetchAndCache(cache, request) {
  const response = await fetch(request);
  if (response.ok) {
    try {
      await cache.put(request, response.clone());
    } catch (_) {
      /* Storage can be unavailable or full; the network response still works. */
    }
  }
  return response;
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => Promise.allSettled(SHELL_URLS.map((url) => cachePage(cache, url))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== self.location.origin || request.headers.has('range')) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        try {
          return await fetchAndCache(cache, request);
        } catch (_) {
          const cached = await cache.match(request, { ignoreSearch: true });
          return cached || (await cache.match('/offline')) || (await cache.match('/404.html')) || Response.error();
        }
      })()
    );
    return;
  }

  const cacheFirst =
    url.pathname.startsWith('/_astro/') ||
    url.pathname.startsWith('/pagefind/') ||
    url.pathname.startsWith('/covers/') ||
    url.pathname.startsWith('/fonts/');

  if (cacheFirst) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(request);
        if (cached) return cached;
        try {
          return await fetchAndCache(cache, request);
        } catch (_) {
          return Response.error();
        }
      })()
    );
    return;
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request);
      if (cached) {
        event.waitUntil(fetchAndCache(cache, request).catch(() => {}));
        return cached;
      }
      try {
        return await fetchAndCache(cache, request);
      } catch (_) {
        return Response.error();
      }
    })()
  );
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
