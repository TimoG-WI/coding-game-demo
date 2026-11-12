# coding-game-demo

demo for a simple coding game

Drag-and-drop sorting uses a locally bundled copy of
[SortableJS 1.15.6](https://github.com/SortableJS/Sortable/tree/1.15.6) (MIT license).
It also works offline.

Python syntax highlighting uses locally bundled
[Prism 1.30.0](https://github.com/PrismJS/prism/tree/v1.30.0) (MIT license),
with colors for both light and dark themes.

The interface is inspired by the
[Online Weidmüller Configurator](https://configurator.weidmueller.com/).
The locally stored Weidmüller logo was extracted from its header. The logo and
brand belong to Weidmüller and are not covered by this project's MIT license.

## Offline use

Serve this directory over HTTPS (or localhost for development). Service workers
do not work when opening `index.html` directly with a `file://` URL.

Open the game once while online to cache it. After the service worker finishes
installing, the game can be reloaded offline or installed using the browser's
install option where supported. External Google Fonts are optional; offline play
uses the built-in fallback fonts.

Online visits refresh the cached game. When changing the cached PWA assets,
increment the cache version in `sw.js` to replace the previous cache.
