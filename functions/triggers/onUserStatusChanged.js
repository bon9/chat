const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.firestore();

// синронизация состояние online user в database и cloud Firestore
module.exports = functions.database
  .ref("status/{userId}")
  .onUpdate((change, context) => {
    // if (online) after = offline
    // if (offline) after = online
    const eventStatus = change.after.val();
    const userDoc = db.doc(`users/${context.params.userId}`);

    return change.after.ref.once("value").then(snapshot => {
      const status = snapshot.val();
      if (status.lastChanged > eventStatus.lastChanged) {
        return;
      }

      eventStatus.lastChanged = new Date(eventStatus.lastChanged);
      userDoc.update({ status: eventStatus });
    });
  });
