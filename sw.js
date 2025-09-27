const CACHE_NAME = 'Aqva Harvest-cache-v1'; // Change this version to force update

const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/logo.png',
  '/manifest.json'
];

// Install event: cache files
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Activate worker immediately

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

// Activate event: clear old caches
self.addEventListener('activate', (event) => {
  clients.claim(); // Start controlling all clients immediately

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            // Delete old caches
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: respond with cached or network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
