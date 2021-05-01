import "firebase/analytics";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/performance";
import "firebase/storage";

const clientCredentials = {
  apiKey: "AIzaSyCv4AKxmzFuW3xavtqAcFTLAmMSsN1Yeyk",
  authDomain: "wellbee-312321.firebaseapp.com",
  projectId: "wellbee-312321",
  storageBucket: "wellbee-312321.appspot.com",
  messagingSenderId: "248275279743",
  appId: "1:248275279743:web:3293d39de47844cf8a844a",
  measurementId: "G-HR8CSXZVV7",
};

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials);
  // Check that `window` is in scope for the analytics module!
  if (typeof window !== "undefined") {
    // Enable analytics. https://firebase.google.com/docs/analytics/get-started
    if ("measurementId" in clientCredentials) {
      firebase.analytics();
      firebase.performance();
    }
  }
}

export default firebase;
