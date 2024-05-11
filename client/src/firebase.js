// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "nestconnect-3bd03.firebaseapp.com",
  projectId: "nestconnect-3bd03",
  storageBucket: "nestconnect-3bd03.appspot.com",
  messagingSenderId: "608106870962",
  appId: "1:608106870962:web:a2c5f47c9537239fae31ab"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);