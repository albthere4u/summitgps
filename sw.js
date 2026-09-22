// 앱 셸: network-first(업데이트 즉시 반영), 실패 시 캐시(오프라인)
const SHELL = 'shell-v5';
const ASSETS = ['./', './index.html', './venues.js', './manifest.json', './assets/icon.png', './assets/resort-map-v3.png'];

self.addEventListener('install', e => { e.waitUntil(caches.open(SHELL).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k=>k!==SHELL).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then(r => { if (r.ok) caches.open(SHELL).then(c => c.put(e.request, r.clone())); return r; })
    .catch(() => caches.match(e.request)));
});
