import React from "react";
import useDoc from "./useDoc";

function ChannelInfo({ channelId }) {
  const channel = useDoc(`channels/${channelId}`);
  return (
    <div className="ChannelInfo">
      <div className="Topic">
        <p className="TopicMessage">{channel.topic}</p>
      </div>
      <div className="ChannelName">#{channel.id}</div>
    </div>
  );
}
export default ChannelInfo;
