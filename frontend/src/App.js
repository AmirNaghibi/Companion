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
import Dialog from '@material-ui/core/Dialog';
import Logo from './assets/images/logo.svg';
import { withStyles } from '@material-ui/core/styles';
import TWITTER_1 from './assets/images/twitter-feed1.svg';
import TWITTER_2 from './assets/images/twitter-feed2.svg';
import {connect} from 'react-redux';
import {userAuth} from './actions/authActions';
import {auth, firebase} from './firebase'
import { calcRoute } from './map/routeUtils';

import ChatApp from './components/ChatApp';

const TEST_TWITTER = [
  { uri: TWITTER_1, lat: 47.66003713198761, lng: -122.31556885183716 },
  { uri: TWITTER_2, lat: 47.67225652151954, lng: -122.32677793787104 },
];

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

const processPaths = (paths) => {
  return paths.map(coord => ({ lat: coord.lat(), lng: coord.lng() }));
};

const StyledAppBar = withStyles({
  root: {
    background: 'white',
    boxShadow: '0 0 5px #c1c1c1'
  }
})(AppBar);

const StyledToolbar = withStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between'
  }
})(Toolbar);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      path: [],
      currentLocation: null,
      destination: null,
      crimeData: [],
      isLandingOpen: true,
      activeTwitterId: null,
      isDialogOpen: false,
    };
    this.onTwitterClick = this.onTwitterClick.bind(this);
    this.onUpdateCurrentLocation = this.onUpdateCurrentLocation.bind(this);
    this.onUpdateDestination = this.onUpdateDestination.bind(this);
    this.getCrimeData = this.getCrimeData.bind(this);
    this.updatePath = this.updatePath.bind(this);
    this.dismissLanding = this.dismissLanding.bind(this);
    this.showDialog = this.showDialog.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount(){
    firebase.auth.onAuthStateChanged(user_data => {
      this.props.userAuth(user_data);
    })
  }

  onTwitterClick(activeTwitterId) {
    this.setState({ activeTwitterId })
  }

  onUpdateCurrentLocation(currentLocation) {
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
      this.updatePath(this.state.currentLocation, destination);
    } else {
      console.error('ERROR: unable to update destination');
      this.setState({ destination: null, path: [] });
    }
  }

  updatePath(start, destination) {
    calcRoute(start, destination, (result, status) => {
      if (status === 'OK') {
        const path = processPaths(result.routes[0].overview_path);
        this.setState({ destination, path });
      } else {
        this.setState({ destination: null, path: [] });
        console.error('ERROR: unable to retrieve path', result);
      }
    });
  }

  dismissLanding() {
    window.setTimeout(() => {
      this.setState({ isLandingOpen: false });
    }, 500);

  }

  getCrimeData() {
    const options = { method: 'GET' };

    fetch('https://seyfu-220110.appspot.com/crimedata', options)
      .then(res => res.json())
      .then(crimeData  => {
        this.setState({ crimeData })
      })
      .catch(err => console.error('Error: ', err));
  }

  showDialog() {
    this.setState({ isDialogOpen: true })
  }

  handleClose() {
    this.setState({ isDialogOpen: false})
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="inner-container">
            {(this.state.isLandingOpen && (window.location.href === 'http://localhost:3000/')) && <Landing onClick={this.dismissLanding} />}
            <StyledAppBar position="static">
              <StyledToolbar>
                <Typography variant="h6" color="inherit"><Link to="/map"><img src={Logo} style={{ height: 30 }}/>
                </Link></Typography>
                  <div style={{ display: 'flex' }}>
                {this.props.user_profile && (window.location.href === 'http://localhost:3000/') && <Link to="/register"><Button className="menu-button" color="inherit">Register</Button></Link>}
                {(this.props.user_profile && (window.location.href.includes('register'))) && <Link to="/login" ><Button className="menu-button" color="inherit">Sign in</Button></Link>}
                {!this.props.user_profile && <Link to="/"><Button className="menu-button" color="inherit" onClick={auth.doSignOut}>Sign out</Button></Link>}
                {(this.props.user_profile && (window.location.href.includes('map'))) && <Button className="menu-button" color="primary" onClick={this.showDialog}>HELP ME</Button>}
                </div>
              </StyledToolbar>
            </StyledAppBar>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/" component={Login}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/chat" component={ChatApp}/>
            <Route exact path="/map" render={(routeProps) => (<MapPage
              onUpdateCurrentLocation={this.onUpdateCurrentLocation}
              onMapClick={this.onUpdateDestination}
              getCrimeData={this.getCrimeData}
              currentLocation={this.state.currentLocation}
              crimeData={this.state.crimeData}
              destination={this.state.destination}
              path={this.state.path}
              handleClose={this.handleClose}
              isDialogOpen={this.state.isDialogOpen}
              activeTwitterId={this.state.activeTwitterId}
              onTwitterClick={this.onTwitterClick}
              {...routeProps}
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
