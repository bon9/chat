import React, { useEffect, useRef } from "react";
import useCollection from "./useCollection";
import useDocWithCache from "./useDocWithCache";
import formatDate from "date-fns/format";
import isSameDay from "date-fns/is_same_day";

function Messages({ channelId }) {
  const messages = useCollection(`channels/${channelId}/messages`, "createAt");

  const scrollerRef = useRef();

  useEffect(() => {
    const node = scrollerRef.current;
    node.scrollTop = node.scrollHeight;
  });

  return (
    <div ref={scrollerRef} className="Messages">
      <div className="EndOfMessages">That's every message!</div>
      {messages.map((message, index) => {
        const previous = messages[index - 1];
        const showAvatar = showShouldAvatar(previous, message);
        const showDay = showShouldDay(previous, message);
        return showAvatar ? (
          <FirstMessageFromUser
            message={message}
            showDay={showDay}
            key={message.id}
          />
        ) : (
          <div key={message.id}>
            <div className="Message no-avatar">
              <div className="MessageContent">{message.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FirstMessageFromUser({ message, showDay }) {
  // у каждого сообщения есть ключ user (создается в ChatInputBox), в значении path которого указана ссылка на отправителя в коллекции users
  const author = useDocWithCache(message.user.path);
  return (
    <div>
      {showDay && (
        <div className="Day">
          <div className="DayLine" />
          <div className="DayText">
            {new Date(message.createAt.seconds * 1000).toLocaleDateString()}
          </div>
          <div className="DayLine" />
        </div>
      )}
      <div className="Message with-avatar">
        <div
          className="Avatar"
          style={{ backgroundImage: author ? `url("${author.photoUrl}")` : "" }}
        />
        <div className="Author">
          <div>
            <span className="UserName">{author && author.displayName}</span>{" "}
            <span className="TimeStamp">
              {formatDate(message.createAt.seconds * 1000, "h:mm A")}
            </span>
          </div>
          <div className="MessageContent">{message.text}</div>
        </div>
      </div>
    </div>
  );
}

function showShouldAvatar(previous, message) {
  const isFirst = !previous;
  // показать аватар и т.д. если первое сообщение
  if (isFirst) {
    return true;
  }
  const differentUser = message.user.id !== previous.user.id;
  // показать аватар и т.д. если сменился пользователь
  if (differentUser) {
    return true;
  }
  const hasBeenAWhile =
    message.createAt.seconds - previous.createAt.seconds > 180;
  // показать аватар и т.д. если прошло 3 минуты от предыдущего сообщения
  return hasBeenAWhile;
}

function showShouldDay(previous, message) {
  // console.log(previous);
  // console.log(message);
  const isFirst = !previous;
  if (isFirst) {
    return true;
  }
  const isNewDay = !isSameDay(
    previous.createAt.seconds * 1000,
    message.createAt.seconds * 1000
  );
  return isNewDay;
}

export default Messages;
