import React, { Component } from 'react';
import '../App.css';
import { PAGE_CHAT } from '../constants';
import GoogleMap from './GoogleMap';

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    display: 'flex',
    height: 'min-content',
    width: '100%',
  }
};

const API_KEY = 'AIzaSyBfzfG_CDAaVM2mYzqBRhQAe70ZX_epyHA';

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.fetchRoute = this.fetchRoute.bind(this);
    this.getGeolocationData = this.getGeolocationData.bind(this);
    this.renderMap = this.renderMap.bind(this);
  }

  componentDidMount() {
    // fetch current location from device GPS
    this.getGeolocationData();
  }

  getGeolocationData() {
    const options = { method: 'POST' };

    fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY}`, options)
      .then(res => res.json())
      .then(({ location })  => {
        console.log(location);
        this.props.onUpdateCurrentLocation({
          lat: location.lat,
          lng: location.lng,
        });
      })
      .catch(err => console.error('Error: ', err));
  }

  fetchRoute() {
  }

  renderMap() {
    const {
      currentLocation,
      destination,
      crimeData,
      path,
      onMapClick,
    } = this.props;

    const hasCurrentLocation = currentLocation && currentLocation.lat && currentLocation.lng;
    const hasDestination = destination && destination.lat && destination.lng;

    const completePath = [currentLocation, ...path, destination];

    if (hasCurrentLocation && hasDestination) {
      return <GoogleMap
        currentLocation={currentLocation}
        destination={destination}
        crimeData={crimeData}
        path={completePath}
        onMapClick={onMapClick}
      />
    }

    // Destination not yet selected
    if (hasCurrentLocation) {
      return <GoogleMap
        currentLocation={currentLocation}
        destination={null}
        crimeData={crimeData}
        path={null} // we wouldn't need a path if there's no destination
        onMapClick={onMapClick}
      />
    }

    // Never render something when current location is unavailable
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <h1>Current location unavailable - Please make sure your GPS is enabled</h1>
      </div>
    )
  }

  render() {
    return (
      <div style={styles.container}>

        {this.renderMap()}

        <div style={styles.buttonContainer}>
          <button onClick={this.fetchRoute}>Call Dummy Endpoint</button>
          <button onClick={() => this.props.onRoute(PAGE_CHAT)}>Go to Chat Page</button>
        </div>



      </div>
    );
  }
}

export default MapPage;
