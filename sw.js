const CACHE_NAME = "takto-cache-v1";
const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/readme.html",
  "/faq.html",
  "/team.html",
  "/accessibility.html",
  "/404.html",
  "/app/css/styles.css",
  "/app/js/app.js",
  "/favicon.ico",
  "/assets/public/TAKTO BLACK.svg",
  "/assets/public/TAKTO WHITE.svg",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (name) {
            return name !== CACHE_NAME;
          })
          .map(function (name) {
            return caches.delete(name);
          })
      );
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
