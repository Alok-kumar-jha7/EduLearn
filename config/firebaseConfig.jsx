import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
   apiKey: "AIzaSyDQZdTJpNwbN1tDSTvfpc1xhbQwFDs2BgE",
  authDomain: "educationtetech.firebaseapp.com",
  projectId: "educationtetech",
  storageBucket: "educationtetech.firebasestorage.app",
  messagingSenderId: "516379020506",
  appId: "1:516379020506:web:40254daf99557afb3e69e3",
  measurementId: "G-9TD4NV9RQ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;