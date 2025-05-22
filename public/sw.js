// @ts-nocheck

const CACHE_NAME = "takto-cache-v1";
const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/readme.html",
  "/faq.html",
  "/team.html",
  "/accessibility.html",
  "/404.html",
  "/css/styles.css",
  "/js/app.js",
  "/favicon.ico",
  "/TAKTO BLACK.svg",
  "/TAKTO WHITE.svg",
];

self.addEventListener("install", function (event) {
  var evt = event;
  evt.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener("activate", function (event) {
  var evt = event;
  evt.waitUntil(
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
  var evt = event;
  evt.respondWith(
    caches.match(evt.request).then(function (response) {
      return response || fetch(evt.request);
    })
  );
});
