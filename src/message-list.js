import React from "react";
import MessageItem from "./message-item";

export default class MessagesList extends React.Component {
  render() {
    return (
      <ul className="messages">
        {this.props.messages.map(item => (
          <MessageItem
            key={item.id}
            data={item}
          />
        ))}
      </ul>
    );
  }
}
