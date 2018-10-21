import React, { Component } from 'react';
import { PAGE_MAP, PAGE_CHAT } from './constants';
import {BrowserRouter, Route} from 'react-router-dom';
import Navbar from './components/appbar';
import Chat from './chat/Chat.js'
import {connect} from 'react-redux';
import {userAuth} from './actions/authActions';
import MapPage from './map/Map.js'
import './styles/landing.css';

import Home from './components/home';
import Login_Page from './components/login';
import Register from './components/register';
import Landing from './components/Landing';

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
      <div>
      <Navbar/>
      <BrowserRouter>
          <div>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login_Page}/>
            <Route exact path="/maps" component={MapPage}/>
            <Route exact path="/chat" component={Chat}/>
            <Route exact path="/home" component= {Home}/>
          </div>
      </BrowserRouter>

        {/* Maps Page */}
        {/* {(this.state.page === PAGE_CHAT) && <ChatPage onRoute={this.onRoute}/>} */}

        {/* Chat Page */}
        {/* {(this.state.page === PAGE_MAP) && <MapPage onRoute={this.onRoute}/>} */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {
    user_profile
  } = state.authReducer;

  return {
    user_profile,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      userAuth: (values) => {
        dispatch(userAuth(values))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);