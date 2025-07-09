const CACHE_NAME = 'academic-task-manager-cache-v5';
const urlsToCache = [
    './',
    './index.html',
    './app.js',
    './manifest.json',
    'https://unpkg.com/react@18/umd/react.production.min.js',
    'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
    'https://unpkg.com/@babel/standalone/babel.min.js',
    'https://cdn.tailwindcss.com/3.4.0',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
    'https://www.gstatic.com/firebasejs/9.19.1/firebase-app-compat.js',
    'https://www.gstatic.com/firebasejs/9.19.1/firebase-auth-compat.js',
    'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore-compat.js',
    'https://www.gstatic.com/firebasejs/9.19.1/firebase-storage-compat.js',
    './icons/favicon-96x96.png',
    './icons/web-app-manifest-192x192.png',
    './icons/apple-touch-icon.png',
    './icons/web-app-manifest-512x512.png'
];

// Instalar el Service Worker y guardar los archivos en caché
self.addEventListener('install', event => {
    console.log('[SW] Instalando Service Worker...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[SW] Cache abierto, guardando archivos...');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('[SW] Fallo al guardar en caché durante la instalación:', error);
            })
    );
    self.skipWaiting();
});

// Activar el Service Worker y limpiar cachés antiguos
self.addEventListener('activate', event => {
    console.log('[SW] Activando Service Worker...');
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('[SW] Limpiando caché antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// Interceptar las peticiones de red (estrategia Cache First)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si la respuesta está en caché, la retornamos
                if (response) {
                    return response;
                }
                // Si no, la buscamos en la red
                return fetch(event.request).then(
                    (networkResponse) => {
                        // Si la petición a la red falla, no hacemos nada
                        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                            return networkResponse;
                        }
                        // Clonamos la respuesta para poder guardarla en caché y retornarla
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        return networkResponse;
                    }
                );
            })
    );
});
