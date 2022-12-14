'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "009c9e65172e010890f7f65fde438006",
"index.html": "ec356ed39aab7758565cbec0d2b02fdd",
"/": "ec356ed39aab7758565cbec0d2b02fdd",
"main.dart.js": "104d22ee862aa627401c59b3fdfa4279",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "d40c47d1c161f94dbcb13094d37f1f55",
"assets/AssetManifest.json": "f684abff0fc5e7e96fc854172410571a",
"assets/NOTICES": "a515a662c216d53cceb2617106a0c80a",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "0b2374d7b3caa05d082e2da226c98145",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/assets/images/download.png": "d44fb4df16f7098951bee400018fda96",
"assets/assets/images/FIAF-black.svg": "32a6f6932271752dcf00ffcea9ab5303",
"assets/assets/images/aws.png": "c3fd7cb4d02092a65ed6f30211c21a87",
"assets/assets/images/udemy_flutter.jpeg": "2c21085ab691ff2f696dcb9778963f2e",
"assets/assets/images/logo.png": "6257c7fbd6dda0616b4534ed97a91dae",
"assets/assets/images/FIAF-white.svg": "88083df97d254fd1177d3dd1b230e414",
"assets/assets/images/python.jpeg": "0430e1f8173a43a27da6373885d641e1",
"assets/assets/images/lenns2.png": "35b7833709e4f951f140f0ebf163077a",
"assets/assets/images/play_store.png": "5fe023301f0f78ffdf2b4d8470e12621",
"assets/assets/images/grow_green.jpeg": "f5db6a389af287d987bbfe64febf38db",
"assets/assets/images/FIAF-black-2-8.png": "5e0c8aa81f4f1afd0ebd844adcdd0c1f",
"assets/assets/images/app_store.png": "7b136111c2f4585d2e9c0b2a36a9884a",
"assets/assets/images/javascript.jpeg": "5102205bac2cc8a82504f2c11f1e1c8c",
"assets/assets/images/FIAF-white-2-8.png": "efe68fed52c275f80d54521586aebc71",
"assets/assets/images/coder.jpeg": "80f68614d6aae2efa6e2370ae4f8ea94",
"assets/assets/icons/aws-icon.webp": "f13aa912c79a8d70a05819b3f702cf56",
"assets/assets/icons/python.png": "9ae7d0c2a37c4626d2ea58f615906814",
"assets/assets/icons/instagram.png": "77a75a5acc7b7a91a54b2f6e27b0bba7",
"assets/assets/icons/aws.webp": "9ac89836147a24ffef721277f445e12c",
"assets/assets/icons/github.png": "857e66cc18fc68e997d7dd6706793b3f",
"assets/assets/icons/firebase.png": "c24b6b9c0fcd84c7b258879880472660",
"assets/assets/icons/aws.png": "18daf8cfae1e80c8d8d60f6869307d2e",
"assets/assets/icons/figma.png": "ac00fa7b6768286ad44283e4595dd07e",
"assets/assets/icons/new_dillivry_logo.png": "f2f056611ca6a6348d9a2f812ae55b56",
"assets/assets/icons/twitter.png": "8bf8b4ad569285d0e312ff46e2098bfe",
"assets/assets/icons/linkedin.png": "db258b08e73a8f7bd99442aa0901c794",
"assets/assets/icons/github2.png": "ec3a60c8c6539a07eb70b52f6737ea6e",
"assets/assets/icons/xata.png": "be76351e39f7e3d4f994dd11bb03f71b",
"assets/assets/icons/fastlane.png": "3dc8802d27d5bfc0fe083c310cc2d5d8",
"assets/assets/icons/dart.png": "c979b430b2da155059ebc0a22b0a26ac",
"assets/assets/icons/mongodb.png": "529e82c7f69c219af6a3f51883083eef",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
