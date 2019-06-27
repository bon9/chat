import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";

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
// rtbd - real time database
const rtdb = firebase.database();

function setupPresence(user) {
  // функция-триггер между базами см в ../functions>index.js

  //установка online/offline в realtime db
  const isOfflineForRTDB = {
    state: "offline",
    lastChanged: firebase.database.ServerValue.TIMESTAMP
  };

  const isOnlineForRTDB = {
    state: "online",
    lastChanged: firebase.database.ServerValue.TIMESTAMP
  };

  //установка online/offline в cloud firestore
  const isOfflineForFirestore = {
    state: "offline",
    lastChanged: firebase.firestore.FieldValue.serverTimestamp()
  };

  const isOnlineForFirestore = {
    state: "online",
    lastChanged: firebase.firestore.FieldValue.serverTimestamp()
  };
  // ref в realtime тоже самое что например doc в cloud (вроде как)))
  const rtdbRef = rtdb.ref(`/status/${user.uid}`);
  const userDoc = db.doc(`/users/${user.uid}`);

  rtdb.ref(".info/connected").on("value", async snapshot => {
    if (snapshot.val() === false) {
      // offline для database
      userDoc.update({
        status: isOfflineForFirestore
      });
      return;
    }

    // offline для database (если online, то на событие дисконект вешаем isOfflineForRTDB)
    await rtdbRef.onDisconnect().set(isOfflineForRTDB);
    // online for cloud store
    rtdbRef.set(isOnlineForRTDB);
    // online for  database
    userDoc.update({
      status: isOnlineForFirestore
    });
    // status: {
    // 	user.uid: {
    // 		state: "online",
    // 		lastChanged: time
    //}
    //}
  });
}

export { db, firebase, setupPresence };
