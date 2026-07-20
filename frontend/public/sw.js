self.addEventListener('install', (e) => { self.skipWaiting(); });`nself.addEventListener('activate', (e) => { e.waitUntil(clients.claim()); });`nself.addEventListener('fetch', (e) => {});
