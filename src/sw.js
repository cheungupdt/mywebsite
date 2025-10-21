const CACHE_NAME = 'kcsteam-v1';
const urlsToCache = [
  '/',
  '/assets/css/main.css',
  '/assets/css/components.css',
  '/assets/css/showcase.css',
  '/assets/css/contact.css',
  '/assets/js/navigation.js',
  '/assets/js/chatbot.js',
  '/assets/js/showcase.js',
  '/assets/js/parallax.js',
  '/assets/js/voice-synthesis.js',
  '/assets/js/contact-form.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});