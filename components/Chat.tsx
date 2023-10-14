import firebase from "firebase/app";
import "firebase/firebase";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

firebase.initializeApp({});

const auth = firebase.auth();
const firestore = firebase.firestore();
