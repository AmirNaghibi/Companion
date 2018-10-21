import React, { Component } from 'react';
import '../App.css';
import GoogleMap from './GoogleMap';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
// import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import { getStyle } from './routeUtils'

const TEST_FRIENDS = [
  { profile: 'https://scontent.fsea1-1.fna.fbcdn.net/v/t31.0-8/614849_10152392112135234_701775898_o.jpg?_nc_cat=110&_nc_ht=scontent.fsea1-1.fna&oh=c8ca431609d6f77d663618ba689a8808&oe=5C87A0C0', name: 'John Lee', mutualFriends: 'You share 1 mutual friend with Harry Yao' },
  { profile: 'https://scontent.fsea1-1.fna.fbcdn.net/v/t1.0-9/18119309_10206976070319196_8593262290938460166_n.jpg?_nc_cat=110&_nc_ht=scontent.fsea1-1.fna&oh=17ee4a8e081c583bfebc6ed872da8c6c&oe=5C428F0A', name: 'Charlotte Chen', mutualFriends: 'You share 3 mutual friends with Jatin Suneja' },
  { profile: 'https://scontent.fsea1-1.fna.fbcdn.net/v/t1.0-9/30124455_2076947005896033_4923734062704623616_o.jpg?_nc_cat=111&_nc_ht=scontent.fsea1-1.fna&oh=3d74880b51b98a040efc7385a422de78&oe=5C476F2B', name: 'Amir Nagibi', mutualFriends: 'You share 2 mutual friends with Harry Yao' },
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
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '40%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    boxShadow: '0 0 50px 30px rgba(0, 0, 0, 0.2)',
    bottom: 0,
    overflow: 'scroll',
    padding: 5,
  },
  friendItem: {
    boxSizing: 'border-box',
    height: 80,
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
            <div style={{height: 80, width: 80, overflow: 'hidden'}}>
            <img src={friend.profile} style={{display: 'block',
              height: '100%',
              width: 'auto' }} />
            </div>
            <div onClick={this.navigateToChat} style={{alignItems: 'flex-start', justifyContent: 'center', display: 'flex', flexFlow: 'column'}}>
              <p style={{textAlign: 'left', padding: '0 0 0 15px', margin: 0}}><b>{friend.name}</b></p>
              <p style={{textAlign: 'left', padding: '0 0 0 15px', margin: 0, marginTop: 2}}>{friend.mutualFriends}</p>
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
