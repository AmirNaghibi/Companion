import React, { Component } from 'react';
import '../App.css';
import { PAGE_CHAT } from '../constants';


class MapPage extends Component {
  render() {
    return (
      <div>
        <h1>This is the map interface</h1>
        <button onClick={() => this.props.onRoute(PAGE_CHAT)}>Go to Chat Page</button>
      </div>
    );
  }
}

export default MapPage;
