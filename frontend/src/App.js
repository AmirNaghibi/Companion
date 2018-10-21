import React, { Component } from 'react';
import './App.css';
import { PAGE_MAP, PAGE_CHAT } from './constants';
import ChatPage from './chat/Chat.js'
import MapPage from './map/Map.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: PAGE_MAP
    };
    this.onRoute = this.onRoute.bind(this);
  }

  onRoute(page) {
    console.log(page);
    if (page === PAGE_MAP || page === PAGE_CHAT) {
      this.setState({ page });
    }
  }

  render() {
    return (
      <div className="App">
        {/* Header*/}
        <div style={{ height: 40, width: '100%', backgroundColor: '#c1c1c1'}}>HEADER</div>

        {/* Maps Page */}
        {(this.state.page === PAGE_CHAT) && <ChatPage onRoute={this.onRoute}/>}

        {/* Chat Page */}
        {(this.state.page === PAGE_MAP) && <MapPage onRoute={this.onRoute}/>}
      </div>
    )
  }
}

export default App;
