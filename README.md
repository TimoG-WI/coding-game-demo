# coding-game-demo

demo for a simple coding game

## Offline use

Serve this directory over HTTPS (or localhost for development). Service workers
do not work when opening `index.html` directly with a `file://` URL.

Open the game once while online to cache it. After the service worker finishes
installing, the game can be reloaded offline or installed using the browser's
install option where supported. External Google Fonts are optional; offline play
uses the built-in fallback fonts.

Online visits refresh the cached game. When changing the cached PWA assets,
increment the cache version in `sw.js` to replace the previous cache.
