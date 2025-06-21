const CACHE_NAME = 'academic-task-manager-cache-v2';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    'https://unpkg.com/react@18/umd/react.production.min.js',
    'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
    'https://unpkg.com/@babel/standalone/babel.min.js',
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
    // Rutas de iconos que deben ser cacheadas
    '/icons/favicon.ico',
    '/icons/favicon.svg',
    '/icons/favicon-96x96.png',
    '/icons/apple-touch-icon.png',
    '/icons/web-app-manifest-192x192.png',
    '/icons/web-app-manifest-512x512.png'
];

// Install event: caches the static assets
self.addEventListener('install', event => {
    console.log('Service Worker instalándose...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Cache abierto');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('Service Worker: Error al abrir cache:', error);
            })
    );
    // Fuerza la activación inmediata
    self.skipWaiting();
});

// Activate event: cleans up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker activándose...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Limpiando cache antiguo', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => {
            // Toma control de todas las páginas inmediatamente
            return self.clients.claim();
        })
    );
});

// Fetch event: Cache First strategy for assets, Network First for API calls
self.addEventListener('fetch', event => {
    // Solo maneja requests HTTP/HTTPS
    if (!event.request.url.startsWith('http')) {
        return;
    }

    // Network First para requests de API o contenido dinámico
    if (event.request.url.includes('/api/') || 
        event.request.method !== 'GET') {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    // Clona la respuesta para cache
                    const responseClone = response.clone();
                    if (response.status === 200) {
                        caches.open(CACHE_NAME)
                            .then(cache => cache.put(event.request, responseClone));
                    }
                    return response;
                })
                .catch(() => {
                    // Si falla la red, intenta desde cache
                    return caches.match(event.request);
                })
        );
        return;
    }

    // Cache First para el resto de recursos
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                // Si no está en cache, busca en la red
                return fetch(event.request)
                    .then(networkResponse => {
                        // Verifica que la respuesta sea válida
                        if (!networkResponse || 
                            networkResponse.status !== 200 || 
                            networkResponse.type !== 'basic') {
                            return networkResponse;
                        }

                        // Clona la respuesta para guardar en cache
                        const responseToCache = networkResponse.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return networkResponse;
                    })
                    .catch(error => {
                        console.log('Service Worker: Error al hacer fetch:', error);
                        // Podrías retornar una página offline aquí
                        throw error;
                    });
            })
    );
});

// Mensaje desde la aplicación principal
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
