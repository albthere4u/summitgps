// 앱 셸은 network-first(업데이트 즉시 반영), 위성 타일은 cache-first(오프라인용)
const SHELL = 'shell-v1', TILES = 'tiles-v1';
const ASSETS = ['./', './index.html', './venues.js', './manifest.json', './assets/resort-map.png',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css', 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'];

self.addEventListener('install', e => { e.waitUntil(caches.open(SHELL).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });

self.addEventListener('fetch', e => {
  const u = e.request.url;
  if (u.includes('arcgisonline.com')) {
    e.respondWith(caches.open(TILES).then(async c => {
      const hit = await c.match(e.request); if (hit) return hit;
      const r = await fetch(e.request); if (r.ok) c.put(e.request, r.clone()); return r;
    }));
    return;
  }
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then(r => { caches.open(SHELL).then(c => c.put(e.request, r.clone())); return r; })
    .catch(() => caches.match(e.request)));
});
