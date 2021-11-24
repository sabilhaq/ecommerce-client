import "./ChatList.scss";
import React from "react";
import ChatItem from "./ChatItem";

export default function ChatList(props) {
  const nodeList = props.chats.map(chat => (
    <ChatItem
      key={chat._id}
      id={chat._id}
      status={"Chat " + chat.status}
      content={chat.content}
      sent={chat.sent}
      // resend={props.resend}
      // remove={props.remove}
      // edit={props.edit}
    />
  ));
  return nodeList;
}
