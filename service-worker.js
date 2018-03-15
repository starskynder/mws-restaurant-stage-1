(function() {
  "use strict";
  var filesToCache = [
    ".",
    "index.html",
    "404.html",
    "offline.html",
    "css/styles.css",
    "https://fonts.googleapis.com/css?family=Krona+One|Righteous",
    "img/1-2x.jpg",
    "img/1-1x.jpg",
    "img/1-2x.webp",
    "img/1-1x.webp",
    "img/2-2x.jpg",
    "img/2-1x.jpg",
    "img/2-2x.webp",
    "img/2-1x.webp",
    "img/3-2x.jpg",
    "img/3-1x.jpg",
    "img/3-2x.webp",
    "img/3-1x.webp",
    "img/4-2x.jpg",
    "img/4-1x.jpg",
    "img/4-2x.webp",
    "img/4-1x.webp",
    "img/5-2x.jpg",
    "img/5-1x.jpg",
    "img/5-2x.webp",
    "img/5-1x.webp",
    "img/6-2x.jpg",
    "img/6-1x.jpg",
    "img/6-2x.webp",
    "img/6-1x.webp",
    "img/7-2x.jpg",
    "img/7-1x.jpg",
    "img/7-2x.webp",
    "img/7-1x.webp",
    "img/8-2x.jpg",
    "img/8-1x.jpg",
    "img/8-2x.webp",
    "img/8-1x.webp",
    "img/9-2x.jpg",
    "img/9-1x.jpg",
    "img/9-2x.webp",
    "img/9-1x.webp",
    "img/10-2x.jpg",
    "img/10-1x.jpg",
    "img/10-2x.webp",
    "img/10-1x.webp",
    "img/food6-large.jpg",
    "img/food6-small.jpg",
    "img/no-match.png",
    "js/main.js",
    "js/restaurant_info.js",
    "js/dbhelper.js",
    "data/restaurants.json"
  ];

  let staticCacheName = "pages-cache-v1";

  self.addEventListener("install", function(event) {
    
    event.waitUntil(
      caches.open(staticCacheName).then(function(cache) {
        return cache.addAll(filesToCache);
      })
    );
  });

  self.addEventListener("fetch", function(event) {
    
    if (event.request.url.indexOf("maps.google") !== -1) {
      return false;
    }
    event.respondWith(
      caches
        .match(event.request)
        .then(function(response) {
          if (response) {
            
            return response;
          }
          
          return (
            fetch(event.request)
              // Add fetched files to the cache
              .then(function(response) {
                // Respond with custom 404 page
                if (response.status === 404) {
                  return caches.match("404.html");
                }

                return caches.open(staticCacheName).then(function(cache) {
                  if (event.request.url.indexOf("maps.google") !== -1) {
                    cache.put(event.request.url, response.clone());
                  }
                  return response;
                });
              })
          );
        })
        .catch(function(error) {
          // Respond with custom offline page
          console.log("Error, ", error);
          return caches.match("offline.html");
        })
    );
  });
})();
