// 뱀 일기 — 오프라인용 서비스 워커
const CACHE = 'snake-diary-v3';
const SHELL = ['./', './index.html', './manifest.json', './icon-180.png', './icon-192.png', './icon-512.png',
  './config.js', './img/bowl.png', './img/thermo.png', './img/note.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;   // 깃허브 API는 그대로 통과
  if (url.pathname.includes('/knock7/')) return;   // 노크 게임은 일기 앱 캐시와 섞이지 않게 그대로 통과
  // 페이지는 새 버전을 먼저 받고, 안 되면 저장해 둔 것
  if (e.request.mode === 'navigate' || url.pathname.endsWith('/config.js')) {
    e.respondWith(fetch(e.request).then(r => { const c = r.clone(); const key = e.request.mode === 'navigate' ? './index.html' : e.request; caches.open(CACHE).then(x => x.put(key, c)); return r; })
      .catch(() => caches.match(e.request.mode === 'navigate' ? './index.html' : e.request)));
    return;
  }
  // 그림 같은 파일은 저장해 둔 것을 먼저
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); return r; })));
});
