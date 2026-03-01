const CACHE = "coros-cache-v1";
const FILES = [
  "./",
  "index.html",
  "songs.js",
  "manifest.json",
  "icon.png" // Asegúrate de tener esta imagen
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => {
      console.log("Caching files...");
      return cache.addAll(FILES);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => {
      return r || fetch(e.request).catch(() => {
          // Opcional: retornar una página offline si no hay red
      });
    })
  );
});
