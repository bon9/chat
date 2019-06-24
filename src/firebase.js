import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAeIlEwg-zWEK7KmBmhlVXMM7HQ2WJmmuA",
  authDomain: "chat-app-4acb1.firebaseapp.com",
  databaseURL: "https://chat-app-4acb1.firebaseio.com",
  projectId: "chat-app-4acb1",
  storageBucket: "chat-app-4acb1.appspot.com",
  messagingSenderId: "869976613758",
  appId: "1:869976613758:web:6f60605d16550a6b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { db, firebase };
