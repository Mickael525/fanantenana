/* ZivOr PWA — Service Worker v12 + FCM */

importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

const CACHE = 'zivor-v12';
const BASE  = self.registration.scope;
const CORE  = [
  BASE,
  BASE+'index.html',
  BASE+'admin.html',
  BASE+'manifest.json',
  BASE+'icon-72.png',
  BASE+'icon-144.png',
  BASE+'icon-192.png',
  BASE+'icon-384.png',
  BASE+'icon-512.png',
  BASE+'css/app.css',
  BASE+'css/admin.css',
  BASE+'js/ui-helpers.js',
  BASE+'js/bible-data.js',
  BASE+'js/bible-engine.js',
  BASE+'js/audio-player.js',
  BASE+'js/app.js',
  BASE+'js/admin.js'
];
const BIBLE = [BASE+'bible-mg.json', BASE+'bible-fr.json', BASE+'bible-en.json'];

/* ── Firebase init pour FCM ── */
firebase.initializeApp({
  apiKey:            "AIzaSyAIet6GftRvcyJMCyUDERSCVmmZq0d-A-Q",
  authDomain:        "fanantenana-cf5ea.firebaseapp.com",
  projectId:         "fanantenana-cf5ea",
  storageBucket:     "fanantenana-cf5ea.appspot.com",
  messagingSenderId: "746464673923",
  appId:             "1:746464673923:web:e6bd1564141d5a081ddbb6"
});
const messaging = firebase.messaging();

/* ── Notifications en arrière-plan ── */
messaging.onBackgroundMessage(function(payload) {
  const n     = payload.notification || {};
  const data  = payload.data || {};
  const title = n.title || '🙏 ZivOr';
  const body  = n.body  || '';
  const url   = data.url || BASE;
  self.registration.showNotification(title, {
    body:    body,
    icon:    BASE + 'icon-192.png',
    badge:   BASE + 'icon-72.png',
    data:    { url: url },
    vibrate: [200, 100, 200],
  });
});

/* ── Clic notification → ouvrir app ── */
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || BASE;
  e.waitUntil(
    clients.matchAll({ type:'window', includeUncontrolled:true }).then(wcs => {
      for (const wc of wcs) {
        if (wc.url.includes(self.registration.scope)) {
          wc.focus();
          return wc.navigate ? wc.navigate(url) : wc.focus();
        }
      }
      return clients.openWindow(url);
    })
  );
});

/* ── Install ── */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(CORE.map(u => new Request(u,{cache:'reload'}))))
      .then(() => {
        return caches.open(CACHE).then(c =>
          Promise.all(BIBLE.map(u =>
            fetch(u,{cache:'reload'}).then(r => { if(r.ok) c.put(u,r); }).catch(()=>{})
          ))
        );
      })
      .catch(()=>{})
      .then(() => self.skipWaiting())
  );
});

/* ── Activate ── */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* ── Fetch ── */
self.addEventListener('fetch', e => {
  const url = e.request.url;
  if (url.startsWith('chrome-extension') ||
      url.includes('firestore') || url.includes('firebase') ||
      url.includes('gstatic')   || url.includes('googleapis') ||
      url.includes('getbible')  || url.includes('bolls.life') ||
      url.includes('jsdelivr')  || url.includes('bible-api')  ||
      url.includes('githubusercontent') || url.includes('fonts.goog') ||
      url.includes('helloao')   || url.includes('labs.bible')) {
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (url.includes('index.html') || url.endsWith('/') || url.endsWith('/fanantenana/')) {
        return fetch(e.request)
          .then(resp => {
            if (resp && resp.status === 200) {
              caches.open(CACHE).then(c => c.put(e.request, resp.clone()));
            }
            return resp;
          })
          .catch(() => cached || caches.match(BASE + 'index.html'));
      }
      if (cached) return cached;
      return fetch(e.request)
        .then(resp => {
          if (resp && resp.status === 200 && e.request.method === 'GET') {
            caches.open(CACHE).then(c => c.put(e.request, resp.clone()));
          }
          return resp;
        })
        .catch(() => caches.match(BASE + 'index.html'));
    })
  );
});

/* ── Push manuel (fallback) ── */
self.addEventListener('push', e => {
  if (!e.data) return;
  try {
    const d = e.data.json();
    e.waitUntil(
      self.registration.showNotification(d.title || 'ZivOr', {
        body:    d.body  || '',
        icon:    BASE + 'icon-192.png',
        badge:   BASE + 'icon-72.png',
        data:    { url: d.url || BASE },
        vibrate: [200, 100, 200],
      })
    );
  } catch(err) {}
});
