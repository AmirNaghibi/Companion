import React from 'react';
import io from 'socket.io-client';
import config from '../config';
import Messages from './Messages';
import ChatInput from './ChatInput';
import '../styles/ChatApp.css';

import '../styles/chat_styles.css'
class ChatApp extends React.Component {
  socket = {};
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.sendHandler = this.sendHandler.bind(this);
    
    // Connect to the server
    this.socket = io(config.api, { query: `username=${props.username}` }).connect();

    // Listen for messages from the server
    this.socket.on('server:message', message => {
      this.addMessage(message);
    });
  }

  sendHandler(message) {
    const messageObject = {
      username: this.props.username,
      message
    };

    // Emit the message to the server
    this.socket.emit('client:message', messageObject);

    messageObject.fromMe = true;
    this.addMessage(messageObject);
  }

  addMessage(message) {
    // Append the message to the component state
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }

  render() {
    return (
      <div className="container chat-header">
        <h3>CHATTING WITH AMIR</h3>
        <Messages messages={this.state.messages} />
        
          <ChatInput onSend={this.sendHandler} className="chat-input" />
        
        
      </div>
    );
  }

}
ChatApp.defaultProps = {
  username: 'Charlotte'
};

export default ChatApp;
