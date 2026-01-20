/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqy5R829I2Rj1aMnWRr-tG8cGU-8V_Oz8",
  authDomain: "incand26-d628d.firebaseapp.com",
  projectId: "incand26-d628d",
  storageBucket: "incand26-d628d.firebasestorage.app",
  messagingSenderId: "316723572534",
  appId: "1:316723572534:web:65510eac4331db0a228d97",
  measurementId: "G-01C6J0EY0Z"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth: Auth = getAuth(app);
void setPersistence(auth, browserLocalPersistence);

export {app, auth}