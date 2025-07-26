// Optimized Service Worker for My Son Sanctuary Kiosk
const CACHE_NAME = 'my-son-kiosk-v4';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/images/my-son-1.png',
  '/images/my-son-2.jpg',
  '/images/my-son-3.png',
  '/images/my-son-4.jpg',
  '/images/my-son-map.jpg',
  '/images/thap-a.jpg',
  '/images/thap-h.jpg',
  '/images/thap-k.png',
  '/images/cham-festival.jpg',
  '/images/manifest.json'
];

// Install - cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => 
        Promise.all(
          cacheNames
            .filter(name => name !== CACHE_NAME)
            .map(name => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Fetch - cache-first strategy for images, network-first for data
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  
  // Cache-first for images
  if (url.pathname.includes('/images/')) {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request)
          .then(fetchResponse => {
            if (fetchResponse.status === 200) {
              const responseClone = fetchResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseClone));
            }
            return fetchResponse;
          })
        )
    );
    return;
  }

  // Network-first for everything else
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, responseClone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
      .catch(() => {
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      })
  );
});