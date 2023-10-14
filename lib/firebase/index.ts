// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBNjUOti848Ax557rWXPiy917frI26Quc",
  authDomain: "money-tracker-14be5.firebaseapp.com",
  projectId: "money-tracker-14be5",
  storageBucket: "money-tracker-14be5.appspot.com",
  messagingSenderId: "156411479424",
  appId: "1:156411479424:web:888e6c355b9de36af1ad65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
