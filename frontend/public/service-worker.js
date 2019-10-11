/* global workbox */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

const bgSyncPlugin = new workbox.backgroundSync.Plugin('answerQueue', {
    maxRetentionTime: 24 * 60
});

workbox.routing.registerRoute(
    '/answers',
    workbox.strategies.networkOnly({
        plugins: [bgSyncPlugin]
    }),
    'POST'
);

workbox.routing.registerRoute(
    /\.(?:js|css|html)$/,
    workbox.strategies.networkFirst()
);

workbox.routing.registerRoute(
    '/',
    workbox.strategies.networkFirst()
);

workbox.routing.registerRoute(
    '/questions',
    workbox.strategies.networkFirst(),
    'GET'
);
