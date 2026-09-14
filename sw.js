/* Stickaufträge: Dateicache v5. Aufträge, Ordner und Fotos bleiben unverändert. */
const APP_VERSION = "v5";
const CACHE_PREFIX = "stickauftraege:" + self.registration.scope + ":";
const CACHE_NAME = CACHE_PREFIX + APP_VERSION;
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
  "./icons/icon-maskable-512.png",
  "./icons/icon-192-v5.png",
  "./icons/icon-512-v5.png",
  "./icons/icon-maskable-192-v5.png",
  "./icons/icon-maskable-512-v5.png"
];
const APP_URLS = new Set(APP_SHELL.map(pfad => new URL(pfad, self.registration.scope).pathname));
const MANIFEST_URL = new URL("./manifest.webmanifest", self.registration.scope).pathname;

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    try{
      const cache = await caches.open(CACHE_NAME);
      /* Nur ein vollständiges Paket aktivieren, keine alten HTTP-Cache-Kopien übernehmen. */
      await cache.addAll(APP_SHELL.map(pfad => new Request(
        new URL(pfad, self.registration.scope).href, { cache: "reload" }
      )));
      await self.skipWaiting();
    }catch(fehler){
      console.error("Offline-Update unvollständig. Bitte alle App-Dateien hochladen.", fehler);
      throw fehler;
    }
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const namen = await caches.keys();
    /* Caches anderer Apps oder Installationspfade nicht löschen. */
    await Promise.all(namen.filter(name => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
      .map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const anfrage = event.request;
  if(anfrage.method !== "GET") return;
  const url = new URL(anfrage.url);
  if(url.origin !== self.location.origin || !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;
  if(anfrage.mode !== "navigate" && !APP_URLS.has(url.pathname)) return;

  event.respondWith((async () => {
    let antwort;
    try{
      const istAktualisierung = anfrage.mode === "navigate" || url.pathname === MANIFEST_URL;
      antwort = await fetch(anfrage, istAktualisierung ? { cache: "no-cache" } : {});
      if(antwort.ok && antwort.type === "basic"){
        try{
          const cache = await caches.open(CACHE_NAME);
          await cache.put(anfrage, antwort.clone());
        }catch(fehler){
          console.warn("Datei konnte nicht offline gespeichert werden:", fehler);
        }
      }
      if(antwort.status < 500) return antwort;
    }catch(fehler){
      /* Ohne Netz die geprüfte Kopie aus diesem Installationspfad verwenden. */
    }

    try{
      const cache = await caches.open(CACHE_NAME);
      const gespeichert = await cache.match(anfrage);
      if(gespeichert) return gespeichert;
      if(anfrage.mode === "navigate"){
        const startseite = await cache.match(new URL("./index.html", self.registration.scope).href);
        if(startseite) return startseite;
      }
    }catch(fehler){
      console.warn("Offline-Dateien konnten nicht gelesen werden:", fehler);
    }

    if(antwort) return antwort;
    if(anfrage.mode === "navigate"){
      return new Response("Bitte einmal mit Internetverbindung öffnen.", {
        status: 503,
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    }
    return Response.error();
  })());
});
