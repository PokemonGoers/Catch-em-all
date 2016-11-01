// Caching Service Worker
// https://developers.google.com/web/fundamentals/getting-started/primers/service-workers

// Will be replaced automatically on build
// /hooks/after_build/010_update_cache_version.js
const CACHE_VERSION = '###CACHE_VERSION###';

const cacheWhitelist = [
  /\.html($|\?.*)/,
  /\.js($|\?.*)/,
  /\.css($|\?.*)/,
  /\.woff2($|\?.*)/
];

function shouldCache(response) {
  if (!response || response.status !== 200 || response.type !== 'basic') {
    return false;
  }
  return cacheWhitelist.some(whitelist => response.url.match(whitelist));
}

self.addEventListener('activate', (event) => {
  console.debug('[SW] Activate');

  // Delete old caches (not named CACHE_VERSION).
  let cleanCache = caches.keys().then(cacheNames => {
    let cleanCachePromises = cacheNames.map(cacheName => {
      if (cacheName.indexOf(CACHE_VERSION) === -1) {
        // If this cache name isn't present in the array of "expected" cache names, then delete it.
        console.debug('[SW] Cache clear', cacheName);
        return caches.delete(cacheName);
      }
    });

    return Promise.all(cleanCachePromises);
  });

  event.waitUntil(cleanCache);
});


self.addEventListener('fetch', (event) => {
  let request = event.request;

  let readCache = caches.open(CACHE_VERSION).then((cache) => {
    return cache.match(event.request).then((response) => {
      if (response) {
        // Return the cached response
        console.debug('[SW] Cache hit', request.url);
        return response;
      }

      // Otherwise fetch the resource from the network.
      let fetchRequest = event.request.clone();
      return fetch(fetchRequest).then((response) => {
        if (shouldCache(response)) {
          // Cache fetched resource
          console.debug('[SW] Cache add', response.url);
          let cacheResponse = response.clone();
          cache.put(event.request, cacheResponse);
        }

        // Return the original response object, which will be used to fulfill the resource request.
        return response;
      }).catch(error => console.error('[SW] Fetch error', error));
    }).catch((error) => console.error('[SW] Cache error', error));
  });

  event.respondWith(readCache);
});
