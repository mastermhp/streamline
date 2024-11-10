// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "streamline-90242.firebaseapp.com",
  projectId: "streamline-90242",
  storageBucket: "streamline-90242.firebasestorage.app",
  messagingSenderId: "906624923775",
  appId: "1:906624923775:web:e18e27d763df113d68e74a",
  measurementId: "G-QT793W7NLZ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)