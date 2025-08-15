const CACHE_NAME = 'academic-task-manager-v8';

// Solo cache archivos locales esenciales
const CACHE_FILES = [
    './',
    './index.html',
    './app.js',
    './manifest.json'
];

// Instalación simple
self.addEventListener('install', event => {
    console.log('[SW] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(CACHE_FILES))
            .catch(error => console.error('[SW] Install failed:', error))
    );
    self.skipWaiting();
});

// Activación - limpiar caches viejos
self.addEventListener('activate', event => {
    console.log('[SW] Activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[SW] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// Fetch simple - solo cache archivos locales
self.addEventListener('fetch', event => {
    // Solo interceptar peticiones GET
    if (event.request.method !== 'GET') return;
    
    // Solo cachear archivos de nuestro dominio
    if (!event.request.url.startsWith(self.location.origin)) return;
    
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
            .catch(() => {
                // Si falla, retornar index.html para SPA
                if (event.request.destination === 'document') {
                    return caches.match('./index.html');
                }
            })
    );
});
