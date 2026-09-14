/* Nur App-Dateien werden gecacht. Aufträge, Ordner und Fotos bleiben unberührt. */
const APP_VERSION = "v6";
const CACHE_PREFIX = "stickauftraege:" + self.registration.scope + ":";
const CACHE_NAME = CACHE_PREFIX + APP_VERSION;
const CORE = ["./index.html", "./manifest.webmanifest"];
const OPTIONAL = [
  "./favicon.ico", "./apple-touch-icon.png",
  "./icon-192-v6.png", "./icon-512-v6.png",
  "./icon-maskable-192-v6.png", "./icon-maskable-512-v6.png"
];
const SCOPE_URL = new URL(self.registration.scope);
const APP_URLS = new Set(["./", ...CORE, ...OPTIONAL]
  .map(pfad => new URL(pfad, SCOPE_URL).pathname));
const MANIFEST_URL = new URL("./manifest.webmanifest", SCOPE_URL).pathname;

async function dateiVorhalten(cache, pfad){
  const url = new URL(pfad, SCOPE_URL);
  const antwort = await fetch(url.href, { cache:"reload" });
  if(!antwort.ok) throw new Error(pfad + ": HTTP " + antwort.status);
  const typ = (antwort.headers.get("Content-Type") || "").toLowerCase();
  if(pfad.endsWith(".png") && !typ.includes("image/png")) throw new Error(pfad + ": Kein PNG");
  if(pfad.endsWith(".webmanifest")){
    const manifest = await antwort.clone().json();
    if(!manifest || !manifest.name || !Array.isArray(manifest.icons)) throw new Error("Ungültiges Manifest");
  }
  await cache.put(url.href, antwort);
}
self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.all(CORE.map(pfad => dateiVorhalten(cache, pfad)));
    /* Fehlende Zusatzdateien dürfen das gesamte Offline-Update nicht blockieren. */
    await Promise.all(OPTIONAL.map(pfad => dateiVorhalten(cache, pfad).catch(fehler => {
      console.warn("Zusatzdatei fehlt im Offline-Cache:", fehler.message);
    })));
    await self.skipWaiting();
  })());
});
self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const namen = await caches.keys();
    await Promise.all(namen.filter(name => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
      .map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});
self.addEventListener("fetch", event => {
  const anfrage = event.request;
  if(anfrage.method !== "GET") return;
  const url = new URL(anfrage.url);
  if(url.origin !== SCOPE_URL.origin || !url.pathname.startsWith(SCOPE_URL.pathname)) return;
  if(anfrage.mode !== "navigate" && !APP_URLS.has(url.pathname)) return;
  /* Die Upload-Prüfung darf keine alte Offline-Kopie als Erfolg melden. */
  if(url.searchParams.has("pwa-check")) return;

  event.respondWith((async () => {
    let antwort;
    try{
      const aktualisieren = anfrage.mode === "navigate" || url.pathname === MANIFEST_URL;
      antwort = await fetch(anfrage, aktualisieren ? { cache:"no-cache" } : {});
      if(antwort.ok && antwort.type === "basic"){
        const typ = (antwort.headers.get("Content-Type") || "").toLowerCase();
        const falsch = (url.pathname.endsWith(".png") && !typ.includes("image/png")) ||
          (url.pathname === MANIFEST_URL && typ.includes("text/html"));
        if(!falsch){
          try{
            const cache = await caches.open(CACHE_NAME);
            await cache.put(anfrage, antwort.clone());
          }catch(fehler){ console.warn("Offline-Speichern fehlgeschlagen:", fehler); }
        }
      }
      if(antwort.status < 500) return antwort;
    }catch(fehler){ /* Ohne Netz eine Kopie aus demselben App-Pfad verwenden. */ }
    try{
      const cache = await caches.open(CACHE_NAME);
      const gespeichert = await cache.match(anfrage) || await cache.match(url.origin + url.pathname);
      if(gespeichert) return gespeichert;
      if(anfrage.mode === "navigate"){
        const startseite = await cache.match(new URL("./index.html", SCOPE_URL).href);
        if(startseite) return startseite;
      }
    }catch(fehler){ console.warn("Offline-Lesen fehlgeschlagen:", fehler); }
    if(antwort) return antwort;
    if(anfrage.mode === "navigate") return new Response("Bitte einmal mit Internetverbindung öffnen.", {
      status:503, headers:{ "Content-Type":"text/plain; charset=utf-8" }
    });
    return Response.error();
  })());
});
