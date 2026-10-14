// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6fnW_LSYQyjzgk-pKMJsIMDOf8P_KkLs",
  authDomain: "parcial-2-1b161.firebaseapp.com",
  projectId: "parcial-2-1b161",
  storageBucket: "parcial-2-1b161.firebasestorage.app",
  messagingSenderId: "977429661699",
  appId: "1:977429661699:web:16ab972a4c40d2cb552636",
  measurementId: "G-RZ9RQ6KETW"
};

// Initialize Firebase;
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);