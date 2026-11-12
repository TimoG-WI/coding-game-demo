const CACHE_PREFIX = 'tresor-hack-';
const CACHE_NAME = `${CACHE_PREFIX}v12`;
const INDEX_URL = new URL('./index.html', self.location.href).href;
const APP_ASSETS = ['./index.html', './manifest.webmanifest', './icon.svg', './sortable.min.js',
    './prism-core.min.js', './prism-python.min.js', './weidmueller-logo.svg']
    .map(path => new URL(path, self.location.href).href);

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(APP_ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(names => Promise.all(names
                .filter(name => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
                .map(name => caches.delete(name))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    if (request.method !== 'GET' || url.origin !== self.location.origin) return;

    if (request.mode === 'navigate' &&
        (url.pathname === new URL(INDEX_URL).pathname ||
            url.pathname === new URL('./', self.location.href).pathname)) {
        event.respondWith((async () => {
            const cache = await caches.open(CACHE_NAME);
            try {
                const response = await fetch(request);
                if (response.ok) {
                    await cache.put(INDEX_URL, response.clone());
                    return response;
                }
                return (await cache.match(INDEX_URL)) || response;
            } catch (error) {
                const cached = await cache.match(INDEX_URL);
                if (cached) return cached;
                throw error;
            }
        })());
    } else if (APP_ASSETS.includes(url.href)) {
        event.respondWith((async () => {
            const cache = await caches.open(CACHE_NAME);
            return (await cache.match(request)) || fetch(request);
        })());
    }
});