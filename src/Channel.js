import React, { useEffect } from "react";
import ChannelInfo from "./ChannelInfo";
import ChatInputBox from "./ChatInputBox";
import Members from "./Members";
import Messages from "./Messages";
import { db } from "./firebase";

function Channel({ user, channelId }) {
  useEffect(() => {
    //заносит в документ юзера канал, в котором юзер находится
    db.doc(`/users/${user.uid}`).update({
      [`channels.${channelId}`]: true
    });
  }, [channelId, user.uid]);

  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChannelInfo channelId={channelId} />
        <Messages channelId={channelId} />
        <ChatInputBox user={user} channelId={channelId} />
      </div>
      <Members channelId={channelId} />
    </div>
  );
}
export default Channel;
