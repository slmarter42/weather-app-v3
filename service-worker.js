const CACHE_NAME = 'weather-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/images/favicon.ico',
  '/images/icon-192x192.png',
  '/images/icon-512x512.png',
  '/images/apple-touch-icon-iphone60x60.png',
  '/images/apple-touch-icon-ipad-76x76.png',
  '/images/apple-touch-icon-iphone-retina-120x120.png',
  '/images/apple-touch-icon-ipad-retina-152x152.png'
];

// Install event: cache all necessary assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch event: respond with cached assets, or fetch from network if not cached
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Activate event: clean up any old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      )
    )
  );
});
