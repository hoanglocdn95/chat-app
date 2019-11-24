import React, { Component } from 'react';
import $ from 'jquery';
import Messages from './message-list';
import Input from './input';
import _map from 'lodash/map';
import io from 'socket.io-client';

import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    //Khởi tạo state,
    this.state = {
      messages: [
        {id: 1, userId: 0, message: 'Hello'}
      ],
      user: null,
    }
    this.socket = null;
  }
    //Connetct với server nodejs, thông qua socket.io
  componentWillMount() {
    this.socket = io('localhost:6969');
    // lắng nghe event có tên 'id'
    this.socket.on('id', res => this.setState({user: res})) 
    //lắng nghe event 'newMessage' và gọi hàm newMessage khi có event
    this.socket.on('newMessage', (response) => {this.newMessage(response)}); 
  }
    //Khi có tin nhắn mới, sẽ push tin nhắn vào state mesgages, và nó sẽ được render ra màn hình
  newMessage(m) {
    const messages = this.state.messages;
    let ids = _map(messages, 'id');
    let max = Math.max(...ids);
    messages.push({
        id: max+1,
        userId: m.id,
        message: m.message
    });

    let objMessage = $('.messages');
    if (objMessage[0].scrollHeight - objMessage[0].scrollTop === objMessage[0].clientHeight ) {
        this.setState({messages});
        objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 300); //tạo hiệu ứng cuộn khi có tin nhắn mới

    } else {
        this.setState({messages});
        if (m.id === this.state.user) {
            objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 300);
        }
    }
  }
    //Gửi event socket newMessage với dữ liệu là nội dung tin nhắn
  sendnewMessage = m => {
    if (m.value) {
      //gửi event về server
      this.socket.emit("newMessage", m.value);
      m.value = ""; 
    }
  }

  render () {
    return (
      <div className="app__content">
        <h1>chat box</h1>
        <div className="chat_window">
          <Messages user={this.state.user} messages={this.state.messages} typing={this.state.typing}/>
          <Input sendMessage={this.sendnewMessage}/>
        </div>
      </div>
    )
  }
}
