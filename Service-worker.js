const CACHE_NAME = "bbm-dominator-v0.3.10";

const FILES_TO_CACHE = [
  "./",
  "index.html",
  "styles.css",
  "app.js",
  "players.json",
  "manifest.json",
  "./engine/scoringEngine.js",
  "./engine/recommendationPipeline.js",
  "./engine/recommendationFactory.js",
  "./engine/constants.js",
  "./engine/valueStage.js",
  "draftlogic.js"
];


self.addEventListener(
"install",
event => {

event.waitUntil(

caches.open(CACHE_NAME)

.then(cache => {

return cache.addAll(FILES_TO_CACHE);

})

);

});


self.addEventListener("activate", event => {

event.waitUntil(

caches.keys().then(cacheNames => {

return Promise.all(

cacheNames.map(cache => {

if(cache !== CACHE_NAME){

return caches.delete(cache);

}

})

);

})

.then(() => self.clients.claim())

);

});


self.addEventListener(
"fetch",
event => {

event.respondWith(

caches.match(event.request)

.then(response => {

return response || fetch(event.request);

})

);

});
