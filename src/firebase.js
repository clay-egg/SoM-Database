// src/firebase.js
import { initializeApp } from 'firebase/app'; // Import from Firebase v9+ (modular SDK)
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth'; // Auth service import
import { getFirestore } from 'firebase/firestore'; // Firestore service import

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAm7B_bdMezQ-rqFjScE593hGGCVBa7VZ0",
  authDomain: "curriculum-statistics.firebaseapp.com",
  projectId: "curriculum-statistics",
  storageBucket: "curriculum-statistics.appspot.com",
  messagingSenderId: "51782680110",
  appId: "1:51782680110:web:6bc2a46eb9f791892a29bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);
// Enable local persistence
setPersistence(auth, browserLocalPersistence);

// Export the services for use in other parts of the app
export { auth, firestore };
