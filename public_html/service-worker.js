// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

const CACHE_NAME = "Ma'rifatu Khirzah";
const urlsToCache = [
  "/",
  "/assets/css/johndoe.css",
  "/assets/js/jonhdoe.js",
  "/assets/imgs/profile.jpg",
  "/assets/imgs/icon-192x192.png",
  "/assets/imgs/icon-512x512.png",
  "/assets/vendors/themify-icons/css/themify-icons.css",
  "/assets/vendors/jquery/jquery-3.4.1.js",
  "/assets/vendors/bootstrap/bootstrap.bundle.js",
  "/assets/vendors/bootstrap/bootstrap.affix.js",
  "/assets/vendors/isotope/isotope.pkgd.js",
];

// Install event: PWA
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error("Failed to cache:", error);
      })
  );
});

// Activate event: hapus cache lama
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== CACHE_NAME) {
              return caches.delete(cache);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
      .catch((error) => {
        console.error("Failed to activate:", error);
      })
  );
});

// Fetch event: static assets
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyBLnHV-eUfofwBMOy2HY3ay_QxicfJ6azQ",
  authDomain: "projek-uts-7d89b.firebaseapp.com",
  projectId: "projek-uts-7d89b",
  storageBucket: "projek-uts-7d89b.firebasestorage.app",
  messagingSenderId: "235862170884",
  appId: "1:235862170884:web:a80e68a5142f6a62fd0451",
  measurementId: "G-KTKEBG33RW",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Website Khirzah";
  const notificationOptions = {
    body: "Push notifikasi firebase berhasil!",
    icon: "/imgs/profile.jpeg",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
