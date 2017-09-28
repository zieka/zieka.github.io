/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/assets/examples/xml_extractor_vbscript_example","f935a797161722edc7140980933ee29d"],["/assets/icon-256x256.png","4102eede612de214d169c387c2d0deb1"],["/assets/icon-512x512.png","4931725fb3fe948af6c0d28f1febfc6d"],["/assets/img/400x400.png","b506243d4ad9613f8ec5722d04dc7f1c"],["/assets/img/budgetparty.jpg","7d2daf43e7fdd150a20bbf33f1cd148f"],["/assets/img/budgetparty.webp","f3c46d1d7e9dbbe7bb3964638a139a03"],["/assets/img/error.png","13582dc55b8550e254b377b0a1e46478"],["/assets/img/etsy.jpg","ca3de1b6ab0607845105785ce63b085a"],["/assets/img/etsy.webp","af19ca430562c4ff7a10bd9a72262831"],["/assets/img/facebook.png","c35ae1991d73c1f8ab6b4a1db63865fe"],["/assets/img/facebook.webp","27cf4e294619fc4604117b28b146b937"],["/assets/img/github.png","f71891fef230f5efabee796a8b166883"],["/assets/img/github.webp","bc785a71fad4574c3b5811fd9afbfab7"],["/assets/img/gmail.png","6a39c5bcfa697282283a9003cd64cd24"],["/assets/img/gmail.webp","d54b1e48b983faba9fa98d2eb84124af"],["/assets/img/instagram.png","a3f3544e0b535ca7e3c21ef7eea8ba3f"],["/assets/img/instagram.webp","5d6f390caacc860b1c50417e65a67657"],["/assets/img/linkedin.png","dfd0343e66b4933f851d09998220dc5a"],["/assets/img/linkedin.webp","77654a605e8b4043a19f74d699194df0"],["/assets/img/predictive_text.jpg","72a3fbfa57c1266579339cc0dd0b1faa"],["/assets/img/predictive_text.webp","8677ef06932b4fdf846b50b97fe599c2"],["/assets/img/recipe_finder.jpg","805d70932564630979acc8b74078791d"],["/assets/img/recipe_finder.webp","7bdb87a8cb453b937696ea02e971f53d"],["/assets/img/superion.jpg","04e4c4e3b160230c4f935511a66487b0"],["/assets/img/superion.webp","82bc8100ef16f9579185eaaeef37adf1"],["/assets/img/usb-x.jpg","473d7cd556b8767cf6c78eb7418da1ae"],["/assets/img/usb-x.webp","02cde247b77c74cb11c7b3dc5e8ff2e4"],["/assets/img/xml_extractor.jpg","ce44bf2fcddde4f056bf0103229a9071"],["/assets/img/xml_extractor.webp","18bfd85d4b9585fdceb474c699a739a9"],["/assets/launcher-icon-0-75x.png","ab79ee261dce820c773183c465770519"],["/assets/launcher-icon-1-5x.png","8ad404780449446e4684bdcd14f639ea"],["/assets/launcher-icon-1x.png","a765cb06ba5e025dd34f6291bbc9a8a9"],["/assets/launcher-icon-2x.png","e0b4c707c570f3afb11817d7eb1e5c00"],["/assets/launcher-icon-3x.png","88c0a38e317fbcae818dea47b5e3447b"],["/assets/launcher-icon-4x.png","25880c111638ca8145676ca46d55284b"],["/assets/manifest.json","7efde6d7c3617ea7bea0a81d1a71dba0"],["/index.html","db4f2af6ed3f1c1cabbff2fa1aa80ffd"],["/inline.8182b4dcac0b2822618f.bundle.js","74810733177583027aac5cb8022ea8b3"],["/main.5c701f4166cdab0c8a11.bundle.js","3dc8bcd1a02c9365021c7ebed8c815d5"],["/styles.3ac6b2fe85d28e15e747.bundle.css","3ac6b2fe85d28e15e747265c451749d0"],["/vendor.5d4137be0b89f105bbf3.bundle.js","98a63c694551e4455a59f65b8171e2b8"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '/index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







