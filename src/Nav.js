import React from "react";
import useCollection from "./useCollection";
import { firebase, db } from "./firebase";
import { Link } from "@reach/router";

function Nav({ user }) {
  const channels = useCollection("channels");
  return (
    <div className="Nav">
      <div className="User">
        <img className="UserImage" alt={user.displayName} src={user.photoUrl} />
        <div>
          <div className="UserName">{user.displayName}</div>
          <div>
            <button
              onClick={() => {
                firebase.auth().signOut();
                changeStatusToOffline(user.uid);
              }}
              className="text-button"
            >
              log out
            </button>
          </div>
        </div>
      </div>
      <nav className="ChannelNav">
        {channels.map(channel => (
          <Link key={channel.id} to={`/channel/${channel.id}`}>
            # {channel.id}
          </Link>
        ))}
      </nav>
    </div>
  );
}

function changeStatusToOffline(userId) {
  const userDoc = db.doc(`/users/${userId}`);
  userDoc.update({
    status: {
      state: "offline",
      lastChanged: firebase.firestore.FieldValue.serverTimestamp()
    }
  });
}

export default Nav;
