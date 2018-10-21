import React, { Component } from 'react';
import { PAGE_MAP, PAGE_CHAT } from './constants';
import ChatPage from './chat/Chat.js'
import MapPage from './map/Map.js'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import './styles/landing.css';

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
        <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            
          </IconButton>
          <Typography variant="h6" color="inherit">
            Companion
          </Typography>
          <Button color="inherit">Signup</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

        {/* Maps Page */}
        {(this.state.page === PAGE_CHAT) && <ChatPage onRoute={this.onRoute}/>}

        {/* Chat Page */}
        {(this.state.page === PAGE_MAP) && <MapPage onRoute={this.onRoute}/>}
      </div>
    )
  }
}

export default App;