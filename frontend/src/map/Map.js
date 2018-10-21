import React, { Component } from 'react';
import '../App.css';
import { PAGE_CHAT } from '../constants';


class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.fetchRoute = this.fetchRoute.bind(this);
  }
  fetchRoute() {
    fetch('http://example.com/movies.json', {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        start: 0.142422,
        end: 0.443322,
      }),
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(JSON.stringify(myJson));
      });
  }

  render() {
    return (
      <div>
        <h1>This is the map interface</h1>
        <button onClick={this.fetchRoute}>Call Dummy Endpoint</button>
        <button onClick={() => this.props.onRoute(PAGE_CHAT)}>Go to Chat Page</button>
      </div>
    );
  }
}

export default MapPage;
