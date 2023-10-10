// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY66WCkQ366_XEwF_fZ0Ca8xPsjxUvtT8",
  authDomain: "money-tracker-37bff.firebaseapp.com",
  projectId: "money-tracker-37bff",
  storageBucket: "money-tracker-37bff.appspot.com",
  messagingSenderId: "250886990885",
  appId: "1:250886990885:web:46f61baf8ac978490aa3cc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
