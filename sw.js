self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('game-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/game.css',
        '/game.js',
        '/dino.png',
        '/cactus.png',
        '/manifest.json'
      ]);
    })
  );
});

