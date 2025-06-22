const CACHE_NAME = 'academic-task-manager-cache-v3';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    'https://unpkg.com/react@18/umd/react.production.min.js',
    'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
    'https://unpkg.com/@babel/standalone/babel.min.js',
    'https://cdn.tailwindcss.com/3.4.0',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
    // Rutas de iconos con rutas relativas para GitHub Pages
    './icons/favicon.ico',
    './icons/favicon.svg',
    './icons/favicon-96x96.png',
    './icons/apple-touch-icon.png',
    './icons/web-app-manifest-192x192.png',
    './icons/web-app-manifest-512x512.png'
];

// Install event: caches the static assets
self.addEventListener('install', event => {
    console.log('[SW] Instalando Service Worker...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[SW] Cache abierto');
                return cache.addAll(urlsToCache.map(url => {
                    // Convierte URLs relativas a absolutas para el cache
                    return new Request(url, { mode: 'cors' });
                })).catch(error => {
                    console.warn('[SW] Error caching some resources:', error);
                    // Continúa aunque falle algún recurso
                    return Promise.resolve();
                });
            })
            .catch(error => {
                console.error('[SW] Error al abrir cache:', error);
            })
    );
    // Fuerza la activación inmediata
    self.skipWaiting();
});

// Activate event: cleans up old caches
self.addEventListener('activate', event => {
    console.log('[SW] Activando Service Worker...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('[SW] Limpiando cache antiguo:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => {
            console.log('[SW] Service Worker activado');
            // Toma control de todas las páginas inmediatamente
            return self.clients.claim();
        })
    );
});

// Fetch event: Cache First strategy with fallbacks
self.addEventListener('fetch', event => {
    // Solo maneja requests HTTP/HTTPS
    if (!event.request.url.startsWith('http')) {
        return;
    }

    // Ignora requests de extensiones del navegador
    if (event.request.url.includes('extension://')) {
        return;
    }

    // Network First para recursos externos que cambian frecuentemente
    if (event.request.url.includes('cdn.tailwindcss.com') || 
        event.request.url.includes('unpkg.com') ||
        event.request.url.includes('googleapis.com')) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    // Si la respuesta es exitosa, actualiza el cache
                    if (response.status === 200) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => cache.put(event.request, responseClone))
                            .catch(error => console.warn('[SW] Error updating cache:', error));
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

    // Cache First para recursos locales
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    console.log('[SW] Serving from cache:', event.request.url);
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

                        console.log('[SW] Fetching from network:', event.request.url);

                        // Clona la respuesta para guardar en cache
                        const responseToCache = networkResponse.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            })
                            .catch(error => {
                                console.warn('[SW] Error caching response:', error);
                            });

                        return networkResponse;
                    })
                    .catch(error => {
                        console.warn('[SW] Network fetch failed:', error);
                        
                        // Para páginas HTML, podrías retornar una página offline
                        if (event.request.destination === 'document') {
                            return caches.match('./index.html');
                        }
                        
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

// Manejo de actualizaciones
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({ version: CACHE_NAME });
    }
});
