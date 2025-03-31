// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.Firebase_API_KEY,
  authDomain: process.env.Firebase_AUTH_DOMAIN,
  projectId: process.env.Firebase_PROJECT_ID,
  storageBucket: process.env.Firebase_STORAGE_BUCKET,
  messagingSenderId: process.env.Firebase_MESSAGING_SENDER_ID,
  appId: process.env.Firebase_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
