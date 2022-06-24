import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzoq_pn5AX6Ge3qooTCp7UeOJ2eumLVKE",
  authDomain: "tweet-lists-app.firebaseapp.com",
  projectId: "tweet-lists-app",
  storageBucket: "tweet-lists-app.appspot.com",
  messagingSenderId: "159215138296",
  appId: "1:159215138296:web:c1d00c3f5f4d65af6fd20d",
};

firebase.initializeApp(firebaseConfig);

const db = getFirestore();

export default db;
