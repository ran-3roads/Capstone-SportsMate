importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

const config = {
    apiKey: "AIzaSyAV6vOR6SR8eGX80KeWbHD6ZZ_QEZum9r0",
    authDomain: "test-pwa-5cd3c.firebaseapp.com",
    projectId: "test-pwa-5cd3c",
    storageBucket: "test-pwa-5cd3c.appspot.com",
    messagingSenderId: "208140601471",
    appId: "1:208140601471:web:de23bc1261da4fc747974a",
    measurementId: "G-K5B72LQDS0"
  };
firebase.initializeApp(config);

const messaging = firebase.messaging();

//백그라운드 서비스워커 설정
messaging.onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: payload,
    icon: "/firebase-logo.png",
  };
  
  self.registration.showNotification(notificationTitle, notificationOptions);
});