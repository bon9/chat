import React from "react";
import { db } from "./firebase";

function ChatInputBox({ user, channelId }) {
  const placeholder = `Message #${channelId}`;
  return (
    <form
      onSubmit={event => {
        // ex. input, div, span
        // elenemts[0] = input
        event.preventDefault();
        const value = event.target.elements[0].value;
        // указываем путь в базе, можно просто db.collection("channels/general/messages")
        db.collection("channels")
          .doc(channelId)
          .collection("messages")
          .add({
            user: db.collection("users").doc(user.uid),
            text: value,
            createAt: new Date()
          });
        event.target.reset();
      }}
      className="ChatInputBox"
    >
      <input className="ChatInput" placeholder={placeholder} />
    </form>
  );
}
export default ChatInputBox;
