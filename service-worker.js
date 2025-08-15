const CACHE_NAME = 'academic-task-manager-cache-v7';
const CORE_CACHE = [
    './',
    './index.html',
    './app.js',
    './manifest.json'
];

const EXTENDED_CACHE = [
    'https://unpkg.com/react@18/umd/react.production.min.js',
    'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
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

// Instalar el Service Worker - Solo cache archivos esenciales primero
self.addEventListener('install', event => {
    console.log('[SW] Instalando Service Worker...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[SW] Cacheando archivos esenciales...');
                // Primero cachear solo los archivos esenciales
                return cache.addAll(CORE_CACHE);
            })
            .then(() => {
                console.log('[SW] Archivos esenciales cacheados');
                // Cachear archivos adicionales en background
                return caches.open(CACHE_NAME).then(cache => {
                    return Promise.allSettled(
                        EXTENDED_CACHE.map(url => {
                            return cache.add(url).catch(error => {
                                console.warn(`[SW] No se pudo cachear ${url}:`, error);
                            });
                        })
                    );
                });
            })
            .catch(error => {
                console.error('[SW] Error durante instalación:', error);
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

// Interceptar las peticiones de red (estrategia Cache First con fallback)
self.addEventListener('fetch', event => {
    // Skip caching for non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip caching for chrome-extension and other non-http requests
    if (!event.request.url.startsWith('http')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si la respuesta está en caché, la retornamos
                if (response) {
                    console.log('[SW] Sirviendo desde caché:', event.request.url);
                    return response;
                }
                
                // Si no, la buscamos en la red
                console.log('[SW] Buscando en red:', event.request.url);
                return fetch(event.request).then(
                    (networkResponse) => {
                        // Si la petición a la red falla, no hacemos nada
                        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                            return networkResponse;
                        }
                        
                        // Solo cachear ciertos tipos de recursos
                        const url = new URL(event.request.url);
                        const shouldCache = 
                            event.request.url.includes(self.location.origin) || // Archivos locales
                            url.hostname === 'unpkg.com' || // React
                            url.hostname === 'www.gstatic.com' || // Firebase
                            url.hostname === 'fonts.googleapis.com' || // Google Fonts
                            url.hostname === 'fonts.gstatic.com'; // Google Fonts CSS

                        if (shouldCache) {
                            // Clonamos la respuesta para poder guardarla en caché y retornarla
                            const responseToCache = networkResponse.clone();
                            caches.open(CACHE_NAME)
                                .then(cache => {
                                    cache.put(event.request, responseToCache);
                                })
                                .catch(error => {
                                    console.warn('[SW] Error al guardar en caché:', error);
                                });
                        }
                        
                        return networkResponse;
                    }
                ).catch(error => {
                    console.error('[SW] Error de red:', error);
                    // Retornar una respuesta de fallback si es necesario
                    if (event.request.destination === 'document') {
                        return caches.match('./index.html');
                    }
                    throw error;
                });
            })
    );
});
