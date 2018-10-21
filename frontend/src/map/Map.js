import React, { Component } from 'react';
import '../App.css';
import GoogleMap from './GoogleMap';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
// import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import { getStyle } from './routeUtils'

const TEST_FRIENDS = [
  { profile: './friend1.png', name: 'John Lee', mutualFriends: 'You share 1 mutual friend with Harry Yao' },
  { profile: './friend2.png', name: 'Charlotte Chen', mutualFriends: 'You share 3 mutual friends with Harry Yao' },
  { profile: './friend3.png', name: 'Amir Nagibi', mutualFriends: 'You share 2 mutual friends with Harry Yao' },
];

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
  },
  button: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  button2: {
    position: 'absolute',
    bottom: 80,
    left: 10,
  },
  friend: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'flex-start',
    position: 'absolute',
    width: '100%',
    height: '30%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    bottom: 0,
    overflow: 'scroll',
    padding: 5,
    // transition: '0.5s',
    // transform: 'translateY(100%)'
  },
  friendItem: {
    boxSizing: 'border-box',
    height: 50,
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
    display: 'flex',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 5,
    boxShadow: '0px 0px 5px rgba(100, 100, 100, 1)'
  }
};

const API_KEY = 'AIzaSyBfzfG_CDAaVM2mYzqBRhQAe70ZX_epyHA';

const FAB = ({ classes, onClick }) => (
  <Button onClick={onClick} variant="fab" color="secondary" aria-label="brightness_6" className={classes.button}>
    <Icon>brightness_6</Icon>
  </Button>
);

const FABStyled = withStyles(styles)(FAB);

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: [],
      type: 'light',
      friends: TEST_FRIENDS,
      openFriends: false,
    };
    this.getGeolocationData = this.getGeolocationData.bind(this);
    this.renderMap = this.renderMap.bind(this);
    this.switchTheme = this.switchTheme.bind(this);
    this.toggleFriends = this.toggleFriends.bind(this);
    this.navigateToChat = this.navigateToChat.bind(this);
  }

  componentDidMount() {
    // fetch current location from device GPS
    this.getGeolocationData();
    this.props.getCrimeData();
  }

  getGeolocationData() {
    const options = { method: 'POST' };

    fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY}`, options)
      .then(res => res.json())
      .then(({ location })  => {
        this.props.onUpdateCurrentLocation({
          lat: location.lat,
          lng: location.lng,
        });
      })
      .catch(err => console.error('Error: ', err));
  }

  toggleFriends(openFriends) {
    console.log('open ', openFriends);
    this.setState({ openFriends: !openFriends });
  }

  switchTheme(type) {
    const themes = {
      light: 'dark',
      dark: 'aubergine',
      aubergine: 'light'
    };
    console.log('theme is ', type);
    this.setState({ theme: getStyle(themes[type]), type: themes[type] });
  }

  navigateToChat() {
    this.props.history.push('/chat');
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
        theme={this.state.theme}
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
        theme={this.state.theme}
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

        <div style={styles.friend} className={this.state.openFriends ? 'slide-up' : 'slide-down'}>
          {this.state.friends.map((friend, id) => <div style={styles.friendItem} key={id}>
            <div style={{width: 50 }}>Profile</div>
            <div onClick={this.navigateToChat} style={{display: 'flex', flexFlow: 'column'}}>
              <p><b>{friend.name}</b></p>
              <p>{friend.mutualFriends}</p>
            </div>
          </div>)}
        </div>

        <div style={styles.button}>
          <FABStyled onClick={() => this.switchTheme(this.state.type)} />
        </div>
        <div style={styles.button2}>
          <FABStyled onClick={() => this.toggleFriends(this.state.openFriends)} />
        </div>
      </div>
    );
  }
}

export default MapPage;
