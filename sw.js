// Offline support: the game files are cached on first visit so it plays without a connection.
const CACHE = 'satc-v1';
const ASSETS = [
    './',
    './index.html',
    './quiz.html',
    './manifest.webmanifest',
    './icons/icon-192.png',
    './icons/icon-512.png',
    './icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
    self.skipWaiting();
});

self.addEventListener('activate', e => {
    e.waitUntil(caches.keys().then(keys =>
        Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
    self.clients.claim();
});

function putInCache(req, res) {
    if (res && (res.ok || res.type === 'opaque')) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
    }
    return res;
}

self.addEventListener('fetch', e => {
    if (e.request.method !== 'GET') return;
    const url = new URL(e.request.url);

    if (url.origin === location.origin) {
        // Network first so updates show up; fall back to the cache when offline.
        e.respondWith(
            fetch(e.request)
                .then(res => putInCache(e.request, res))
                .catch(() => caches.match(e.request, { ignoreSearch: true })
                    .then(r => r || caches.match('./index.html')))
        );
    } else if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
        // Fonts rarely change: serve from cache first.
        e.respondWith(
            caches.match(e.request).then(r => r || fetch(e.request).then(res => putInCache(e.request, res)))
        );
    }
});
