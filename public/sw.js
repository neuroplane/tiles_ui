// Service Worker for Tiles UI PWA
const CACHE_NAME = 'tiles-ui-v1'
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/src/main.js',
  '/src/App.vue',
  '/src/style.css'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Install')
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        return self.skipWaiting()
      })
      .catch((err) => {
        console.error('[SW] Cache failed:', err)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => {
              console.log('[SW] Deleting old cache:', name)
              return caches.delete(name)
            })
        )
      })
      .then(() => {
        return self.clients.claim()
      })
  )
})

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }
  
  // Skip chrome-extension requests
  if (url.protocol === 'chrome-extension:') {
    return
  }
  
  // Network first strategy for API calls
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone response before caching
          const responseClone = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone)
          })
          return response
        })
        .catch(() => {
          return caches.match(request)
        })
    )
    return
  }
  
  // Cache first strategy for static assets
  event.respondWith(
    caches.match(request)
      .then((cached) => {
        if (cached) {
          // Return cached response and update cache in background
          fetch(request)
            .then((response) => {
              if (response.ok) {
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(request, response)
                })
              }
            })
            .catch(() => {})
          
          return cached
        }
        
        // Not in cache - fetch from network
        return fetch(request)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP ${response.status}`)
            }
            
            // Cache successful responses
            const responseClone = response.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone)
            })
            
            return response
          })
          .catch((error) => {
            console.error('[SW] Fetch failed:', error)
            // Return offline fallback if available
            if (request.mode === 'navigate') {
              return caches.match('/index.html')
            }
            throw error
          })
      })
  )
})

// Push notification support
self.addEventListener('push', (event) => {
  console.log('[SW] Push received')
  
  const options = {
    body: event.data?.text() || 'New notification',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    tag: 'tiles-ui-notification',
    requireInteraction: false
  }
  
  event.waitUntil(
    self.registration.showNotification('Tiles UI', options)
  )
})

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification click')
  
  event.notification.close()
  
  event.waitUntil(
    self.clients.matchAll({ type: 'window' })
      .then((clients) => {
        // Focus existing window if open
        for (const client of clients) {
          if (client.url && 'focus' in client) {
            return client.focus()
          }
        }
        // Open new window if not
        if (self.clients.openWindow) {
          return self.clients.openWindow('/')
        }
      })
  )
})

// Sync for background sync (if needed in future)
self.addEventListener('sync', (event) => {
  console.log('[SW] Sync:', event.tag)
})

// Message from main thread
self.addEventListener('message', (event) => {
  console.log('[SW] Message:', event.data)
  
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
