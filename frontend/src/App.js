import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import Landing from './components/Landing';
import Home from './components/home';

import {connect} from 'react-redux';
import {userAuth} from './actions/authActions';

import {firebase} from './firebase'

import ButtonAppBar from './components/ButtonAppBar';

class App extends Component {

  componentDidMount(){
    firebase.auth.onAuthStateChanged(user_data => {
      this.props.userAuth(user_data);
    })
  }

  render() {
    return (      
      <div>
        <BrowserRouter>
          <div>
          <ButtonAppBar authUser = {this.props.user_profile}/>
            <Route exact path="/" component= {Landing}/>
            <Route exact path="/register" component= {Register}/>
            <Route exact path="/login" component= {Login}/>
            <Route exact path="/home" component= {Home}/>
          </div>
        </BrowserRouter>
      </div>
    );
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


// this is the main page of our app...