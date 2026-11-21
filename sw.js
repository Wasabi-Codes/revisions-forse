/* Révisions FORSE : réseau d'abord (toujours la dernière version), copie locale si hors ligne */
const CACHE="forse-v2.01";
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(["./","./manifest.webmanifest","./icon-192.png","./icon-512.png"])))});
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>{
  const r=e.request;
  if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(CACHE).then(k=>k.put(r,c));return res}).catch(()=>caches.match(r).then(m=>m||caches.match("./"))));
});
