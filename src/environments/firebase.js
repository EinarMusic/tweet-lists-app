import firebase from "firebase/app";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAzoq_pn5AX6Ge3qooTCp7UeOJ2eumLVKE",
  authDomain: "tweet-lists-app.firebaseapp.com",
  projectId: "tweet-lists-app",
  storageBucket: "tweet-lists-app.appspot.com",
  messagingSenderId: "159215138296",
  appId: "1:159215138296:web:c1d00c3f5f4d65af6fd20d"
});

const db = firebaseApp.firestore();

export default db;
