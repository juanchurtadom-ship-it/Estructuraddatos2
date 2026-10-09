import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore }  from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyCRHTVc4rr-tqW30iuInMGo6vv9ktQBoTA",
  authDomain: "challenge-09-810bb.firebaseapp.com",
  projectId: "challenge-09-810bb",
  storageBucket: "challenge-09-810bb.firebasestorage.app",
  messagingSenderId: "643885420525",
  appId: "1:643885420525:web:04a0bd51759b66581de1e4",
  measurementId: "G-ETCHPQ6J8Z"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
