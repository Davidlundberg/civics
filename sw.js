/* Civics service worker — offline-first for a fully static app.
   There is no API and no personal data on the server; the whole app is the
   shell, so a plain precache is the correct strategy. Bump VERSION on every
   deploy or phones keep serving the old HTML. */
var VERSION = "civics-v1.0.2";
var ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./static/icon-180.png",
  "./static/icon-192.png",
  "./static/icon-512.png",
  "./static/icon-512-maskable.png"
];

self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(VERSION)
      .then(function(c){ return c.addAll(ASSETS); })
      .then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys()
      .then(function(keys){
        return Promise.all(keys.filter(function(k){ return k!==VERSION; })
                              .map(function(k){ return caches.delete(k); }));
      })
      .then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(e){
  var req = e.request;
  if(req.method !== "GET") return;

  // Google Fonts: use the cache when it is there, but never let a failed
  // font request break the page — the CSS declares a system fallback.
  if(req.url.indexOf("fonts.googleapis.com")>=0 || req.url.indexOf("fonts.gstatic.com")>=0){
    e.respondWith(
      caches.match(req).then(function(hit){
        return hit || fetch(req).then(function(res){
          var copy=res.clone();
          caches.open(VERSION).then(function(c){ c.put(req, copy); });
          return res;
        }).catch(function(){ return new Response("", {status:200, headers:{"Content-Type":"text/css"}}); })
      })
    );
    return;
  }

  // App shell: network first so a deploy lands promptly, cache as the fallback.
  e.respondWith(
    fetch(req).then(function(res){
      var copy=res.clone();
      caches.open(VERSION).then(function(c){ c.put(req, copy); });
      return res;
    }).catch(function(){
      return caches.match(req).then(function(hit){
        return hit || caches.match("./index.html");
      });
    })
  );
});
