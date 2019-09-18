let nonce = 1;

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

// Precaching html, basic css, and portrait.
workbox.precaching.precacheAndRoute([
    '/styles/index.css',
    '/static/img/headshot_dithered_transparent.png',
    { url: '/index.html'},
]);

workbox.routing.registerRoute(
    // Cache that JS
    /.*\.js/,
    workbox.strategies.networkFirst()
);

workbox.routing.registerRoute(
    // Cache CSS files
    /.*\.css/,
    // Use cache but update in the background ASAP
    workbox.strategies.staleWhileRevalidate({
        // Use a custom cache name
        cacheName: 'css-cache',
    })
);
  
workbox.routing.registerRoute(
    // Cache image files
    /.*\.(?:png|jpg|jpeg|svg|gif)/,
    // Use the cache if it's available
    workbox.strategies.cacheFirst({
        // Use a custom cache name
        cacheName: 'image-cache',
        plugins: [
        new workbox.expiration.Plugin({
            // Cache all 7 images.
            maxEntries: 7,
            // Cache for just 1 day, I won't steal your memory for too long.
            maxAgeSeconds: 1 * 24 * 60 * 60,
        })
        ],
    })
);

