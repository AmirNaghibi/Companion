import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import ChatPage from './chat/Chat'
import MapPage from './map/Map'
import Register from './components/register';
import Login from './components/login';
import Landing from './components/Landing';
import Home from './components/home';
import AppBar from '@material-ui/core/AppBar';
import Toolbar  from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {connect} from 'react-redux';
import {userAuth} from './actions/authActions';
import {auth, firebase} from './firebase'

import ButtonAppBar from './components/ButtonAppBar';

const TEST_PATH = [
  { lat: 47.65641, lng: -122.3132624 },
  { lat: 47.6575286, lng: -122.3141852 },
  { lat: 47.6594009, lng: -122.3161383 },
  { lat: 47.6609129, lng: -122.3192261 },
  { lat: 47.6626159, lng: -122.3165597 },
];

const TEST_CRIME_DATA = [
  { Latitude: 47.65851470026042, Longitude: -122.31498548014832, Description: 'SHOPLIFTING', Date: '05/05/2017 06:40:32 PM' },
  { Latitude: 47.65903499736511, Longitude: -122.3180968426056, Description: 'THEFT - CAR PROWL', Date: '06/05/2017 08:30:02 PM' },
  { Latitude: 47.66119643672335, Longitude: -122.31405258178711, Description: 'SUSPICIOUS CIRCUMSTANCES', Date: '19/05/2017 03:30:33 AM' },
];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      path: TEST_PATH || [],
      currentLocation: null,
      destination: null,
      crimeData: TEST_CRIME_DATA || []
    };
    this.onUpdateCurrentLocation = this.onUpdateCurrentLocation.bind(this);
    this.onUpdateDestination = this.onUpdateDestination.bind(this);
    this.onUpdateCrimeData = this.onUpdateCrimeData.bind(this);
  }

  componentDidMount(){
    firebase.auth.onAuthStateChanged(user_data => {
      this.props.userAuth(user_data);
    })
  }

  onUpdateCurrentLocation(currentLocation) {
    console.log('current location is ', currentLocation);
    if (currentLocation && currentLocation.lat && currentLocation.lng) {
      this.setState({ currentLocation })
    } else {
      console.error('ERROR: unable to update current location');
      this.setState({ currentLocation: null });
    }
  }

  onUpdateDestination(e) {
    const destination = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    console.log(destination);
    if (destination && destination.lat && destination.lng) {
      this.setState({ destination });
    } else {
      console.error('ERROR: unable to update destination');
      this.setState({ destination: null });
    }
  }

  onUpdateCrimeData(data) {
    // TODO - add an API call here to retrieve the crime data from the server
    console.log('updating crime data...');
    const crimeData = TEST_CRIME_DATA;
    this.setState({ crimeData });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="inner-container">
            <AppBar position="static">
              <Toolbar>
                {/*<IconButton color="inherit" aria-label="Menu"></IconButton>*/}
                <Typography variant="h6" color="inherit">Sefuu</Typography>
                {this.props.user_profile && <Link to="/register"><Button className="menu-button" color="inherit">Register</Button></Link>}
                {this.props.user_profile && <Link to="/login" ><Button className="menu-button" color="inherit">Sign in</Button></Link>}
                {!this.props.user_profile && <Link to="/"><Button className="menu-button" color="inherit" onClick={auth.doSignOut}>Sign out</Button></Link>}
              </Toolbar>
            </AppBar>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/chat" render={() => (<ChatPage />)} />
            <Route exact path="/map" render={() => (<MapPage
              onUpdateCurrentLocation={this.onUpdateCurrentLocation}
              onMapClick={this.onUpdateDestination}
              currentLocation={this.state.currentLocation}
              crimeData={this.state.crimeData}
              destination={this.state.destination}
              path={this.state.path}
            />)} />
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
