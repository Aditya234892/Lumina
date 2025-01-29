// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASaw_B6ooqHzEeOFgqufdHXylIqpCBK_4",
  authDomain: "lumina-dfdf8.firebaseapp.com",
  projectId: "lumina-dfdf8",
  storageBucket: "lumina-dfdf8.firebasestorage.app",
  messagingSenderId: "447742076562",
  appId: "1:447742076562:web:5e14dcc70d5c5e9db7e84b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
//Sign-In with google using google provider
export const googleProvider = new GoogleAuthProvider()
//Accessing Cloud Firestore
export const firestoredb = getFirestore(app);