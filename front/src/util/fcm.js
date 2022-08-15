import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useDeferredValue } from "react";
const config = {
apiKey: "AIzaSyAV6vOR6SR8eGX80KeWbHD6ZZ_QEZum9r0",
authDomain: "test-pwa-5cd3c.firebaseapp.com",
projectId: "test-pwa-5cd3c",
storageBucket: "test-pwa-5cd3c.appspot.com",
messagingSenderId: "208140601471",
appId: "1:208140601471:web:de23bc1261da4fc747974a",
measurementId: "G-K5B72LQDS0"
};

if (config?.projectId) {
    // Initialize Firebase
    const app = initializeApp(config);
  
    if (app.name && typeof window !== 'undefined') {
      const analytics = getAnalytics(app);
      getToken(getMessaging(), {
        vapidKey:
          "BDHHQFu2Rry_3d-5Hm0jtfRI6NIfbxZYUGyStc7O0iyTDaU790-pLiuVSVXKk-zT7Hieudtb8Le3-QEIUmDMrAo",
      })
        .then((currentToken) => {
          if (currentToken) {
            // Send the token to your server and update the UI if necessary
            // ...
            console.log(currentToken);
          } else {
            // Show permission request UI
            console.log(
              "No registration token available. Request permission to generate one."
            );
            // ...
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
          // ...
        });
        onMessage(getMessaging(), (payload) => {
        console.log("Message received. ", payload);
        // ...
      });
       }

  }


//포그라운드 메시지 수신
