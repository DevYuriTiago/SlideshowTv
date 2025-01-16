const CACHE_NAME = 'slides-cache-v1';
const CACHE_TIME = 30 * 60 * 1000; // 30 minutos em milissegundos

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const cachedTime = cachedResponse ? new Date(cachedResponse.headers.get('date')).getTime() : 0;
      const now = new Date().getTime();

      // Se tiver cache e ele não estiver expirado, retorna o cache
      if (cachedResponse && (now - cachedTime) < CACHE_TIME) {
        return cachedResponse;
      }

      // Se não tiver cache ou estiver expirado, faz nova requisição
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
