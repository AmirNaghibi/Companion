import React, { Component } from 'react';
import '../App.css';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Polyline } from 'react-google-maps';
const request = require('request');
const { compose, withProps, lifecycle } = require("recompose");

const API_KEY = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWE0NjFiZTZmNTk5YzE2ZGEzZDVhNzgiLCJpYXQiOjE1MjA3MjIzNjZ9.eAUtQuvek8JdumKiEdP-0KhAw6BngBZqJFSWrfBIxhU';
const fleet = {};

const TEST_START = {
  lat: 47.6564522,
  lng: -122.3277878
};

const TEST_DEST = {
  lat: 47.65641,
  lng: -122.3132624,
};

const TEST_PATH = {
  start: {
    location: {
      lat: 47.6564522,
      lng: -122.3277878
    }
  },
  end: {
    location: {
      lat: 47.65641,
      lng: -122.3132624,
    }
  }
};

function getLatLon(arr) {
  const result = [
    { lat: 47.6564522, lng: -122.3277878 },
    { lat: 47.65641, lng: -122.3132624 },
    ];

  // const res = arr.map(item => {
  //   return {
  //     lat: combined[item.location_id].location.lat,
  //     lng: combined[item.location_id].location.lng
  //   }
  // });

  // for (let i = 1; i<res.length; i++) {
  //   res2.push([res[i-1], res[i]]);
  // }

  return result;
}

const GoogleMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBfzfG_CDAaVM2mYzqBRhQAe70ZX_epyHA&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: '100%', width: '100%' }} />,
    containerElement: <div style={{ height: '100%', width: '100%' }} />,
    mapElement: <div style={{ height: '100%', width: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new window.google.maps.DirectionsService();

      DirectionsService.route({
        origin: new window.google.maps.LatLng(49.2485585, -123.0579327),
        destination: new window.google.maps.LatLng(49.2679807, -123.1886416),
        travelMode: window.google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  })
)(props => {
  // const coordinates = props.pathCoordinates;
  const coordinates = getLatLon([]);
  // console.log(props.pathCoordinates);

  return (
    <GoogleMap
      labelAnchor={new window.google.maps.Point(0, 0)}
      defaultZoom={13}
      defaultCenter = {{ lat: TEST_START.lat, lng: TEST_START.lng }}
      style={{ width: 800 }}
    >
      <Polyline
        path={coordinates}
        geodesic={true}
        options={{
          strokeColor: '#ff2527',
          // strokeOpacity: 0.0,
          strokeWeight: 4,
          // icons: [{
          //   icon: lineSymbol,
          //   offset: '0',
          //   repeat: '20px'
          // }],
        }}/>
    </GoogleMap>)}
);

export default GoogleMapComponent;
