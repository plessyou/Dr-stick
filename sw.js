/* Stickaufträge – Service Worker
   Bei jedem Update die Zahl hochzählen, dann holt sich die App die neuen Dateien.
   Deine Aufträge liegen getrennt davon im Gerätespeicher und werden nie angefasst. */
const CACHE_NAME = "stickauftraege-v4";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./favicon.ico",
  "./icons/favicon-16.png",
  "./icons/favicon-32.png",
  "./icons/apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-192.png",
  "./icons/icon-maskable-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    /* Einzeln ablegen: eine fehlende Datei darf die Installation nicht kippen */
    await Promise.all(APP_SHELL.map(pfad => cache.add(pfad).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const namen = await caches.keys();
    await Promise.all(namen.filter(n => n !== CACHE_NAME).map(n => caches.delete(n)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const anfrage = event.request;
  if(anfrage.method !== "GET") return;

  let url;
  try{ url = new URL(anfrage.url); }catch(e){ return; }
  if(url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    try{
      const antwort = await fetch(anfrage);
      if(antwort && antwort.ok && antwort.type === "basic"){
        const kopie = antwort.clone();
        caches.open(CACHE_NAME).then(c => c.put(anfrage, kopie)).catch(() => {});
      }
      return antwort;
    }catch(e){
      const gespeichert = await caches.match(anfrage, { ignoreSearch:true });
      if(gespeichert) return gespeichert;
      if(anfrage.mode === "navigate"){
        return (await caches.match("./index.html")) ||
               (await caches.match("./")) ||
               new Response("Offline", { status:503, headers:{ "Content-Type":"text/plain" } });
      }
      return Response.error();
    }
  })());
});
