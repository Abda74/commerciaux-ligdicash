const CACHE_NAME = 'ligdicash-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/bootstrap-5.3.3-dist/css/bootstrap.min.css',
    '/bootstrap-5.3.3-dist/js/bootstrap.js',
    '/script.js',
    '/manifest.json',
    '/icon/ligdicash-192x192.png',
    '/icon/ligdicash-200x200.png',
    '/icon/ligdicash-512x512.png',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    const requestURL = new URL(event.request.url);

    // Vérifier si l'URL correspond à l'inscription
    if (requestURL.pathname === '/referal/8175977614320507790178') {
        // Vider le cache
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        return caches.delete(cacheName);
                    })
                );
            })
        );
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
