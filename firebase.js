// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "twitter-clone-b8516.firebaseapp.com",
  projectId: "twitter-clone-b8516",
  storageBucket: "twitter-clone-b8516.appspot.com",
  messagingSenderId: "1085224725879",
  appId: "1:1085224725879:web:7f0c76d3a7aa6137c9c572",
  measurementId: "G-7598WN51DB"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()
const analytics = getAnalytics(app);

export { app, db, storage }