import React, { Component } from 'react';
import '../App.css';
// import { PAGE_MAP } from '../constants';


class Chat extends Component {
  render() {
    console.log('chat');
    return (
      <div>
        <h1>This is the chat interface</h1>
        {/* <button onClick={() => this.props.onRoute(PAGE_MAP)}>Go to Map Page</button> */}
      </div>
    );
  }
}

export default Chat;