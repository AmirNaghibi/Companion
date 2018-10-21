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
      page: PAGE_MAP,
      path: TEST_PATH || [],
      currentLocation: null,
      destination: null,
      crimeData: TEST_CRIME_DATA || []
    };
    this.onRoute = this.onRoute.bind(this);
    this.onUpdateCurrentLocation = this.onUpdateCurrentLocation.bind(this);
    this.onUpdateDestination = this.onUpdateDestination.bind(this);
    this.onUpdateCrimeData = this.onUpdateCrimeData.bind(this);
  }

  onRoute(page) {
    console.log(page);
    if (page === PAGE_MAP || page === PAGE_CHAT) {
      this.setState({ page });
    }
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
        {(this.state.page === PAGE_CHAT) && <ChatPage
          onRoute={this.onRoute}
        />}

        {/* Chat Page */}
        {(this.state.page === PAGE_MAP) && <MapPage
          onUpdateCurrentLocation={this.onUpdateCurrentLocation}
          onMapClick={this.onUpdateDestination}
          currentLocation={this.state.currentLocation}
          crimeData={this.state.crimeData}
          destination={this.state.destination}
          path={this.state.path}
          onRoute={this.onRoute}
        />}
      </div>
    )
  }
}

export default App;