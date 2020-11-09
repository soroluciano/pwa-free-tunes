// //This is the "Offline page" service worker



// //Install stage sets up the offline page in the cahche and opens a new cache

// self.addEventListener('install', function(event) {

//   var offlinePage = new Request('offline.html');

//   event.waitUntil(

//   fetch(offlinePage).then(function(response) {

//     return caches.open('pwabuilder-offline').then(function(cache) {

//       console.log('[PWA Builder] Cached offline page during Install'+ response.url);

//       return cache.put(offlinePage, response);

//     });

//   }));

// });



// //If any fetch fails, it will show the offline page.

// //Maybe this should be limited to HTML documents?

// self.addEventListener('fetch', function(event) {

//   event.respondWith(

//     fetch(event.request).catch(function(error) {

//         console.error( '[PWA Builder] Network request Failed. Serving offline page ' + error );

//         return caches.open('pwabuilder-offline').then(function(cache) {

//           return cache.match('offline.html');

//       });

//     }));

// });



// //This is a event that can be fired from your page to tell the SW to update the offline page

// self.addEventListener('refreshOffline', function(response) {

//   return caches.open('pwabuilder-offline').then(function(cache) {

//     console.log('[PWA Builder] Offline page updated from refreshOffline event: '+ response.url);

//     return cache.put(offlinePage, response);

//   });

// });




const cacheName = 'v1';


self.addEventListener('install', e =>{
    console.log('Service Worker: Install');
});

//evento de activacion
self.addEventListener('activate', e =>{
    console.log('Service Worker: Activated');
    e.waitUntil(
        caches.keys().then(cacheNames =>{
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName){
                        console.log('Service Worker: Clearing old cache');           
                    return caches.delete(cache);   
                    }                    
                })
            )
        })
    )
});



// self.addEventListener("push", function() {
//     e.waitUntil(
//       fetch("/updates")
//       .then(function() {
//         return self.registration.showNotification("New updates");
//       })
//     );
//   });
self.addEventListener('fetch', e => {
e.respondWith(
    caches.open(cacheName).then(cache => {
      cache.match(e.request).then(cacheResponse => {
        const networkFetch = fetch(e.request).then(networkResponse => {
          cache.put(e.request, networkResponse.clone());
          return networkResponse
        });
  
        return cacheResponse || networkFetch;
      });
    }).catch(error => {
      console.log('error in cache open: ', error)
    })
  );
}); 

//viejo metodo de fetching 
// self.addEventListener('fetch', e => {
//     console.log('Service worker: Fetching');
//     e.respondWith(
//         fetch(e.request)
//     //.catch(() => caches.match(e.request)));
//         .then(res => {
//         const resClone = res.clone();
//         caches
//         .open(cacheName)
//         .then(cache => {
//             cache.put(e.request,resClone);
//         });
//         return res;
//         }).catch(err => caches.match(e.request).then(res => res))
//     );
// });



