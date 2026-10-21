self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('rtps-apply-v1').then(function (cache) {
      return cache.addAll([
        '/RTPS-Apply/',
        '/RTPS-Apply/index.html',
        '/RTPS-Apply/manifest.json',
        '/RTPS-Apply/icons/icon-192.png',
        '/RTPS-Apply/icons/icon-512.png'
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== 'rtps-apply-v1'; })
            .map(function (k) { return caches.delete(k); })
      );
    })
  );
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (res) {
      return res || fetch(e.request);
    })
  );
});
