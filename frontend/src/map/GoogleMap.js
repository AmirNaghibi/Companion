import React, { Component } from 'react';
import '../App.css';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker,
  Polyline } from 'react-google-maps';
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";
const request = require('request');
const { compose, withProps, lifecycle } = require("recompose");

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

const extractHeatmapData = (crimeData) => {
  const result = crimeData
    .filter(data => data.Latitude && data.Longitude)
    .map(data => (new window.google.maps.LatLng(data.Latitude, data.Longitude)));


  console.log('it id ', result[0].lat());

  return result;
};

const extractHeatmapData1 = (crimeData) => {
  const result = [];

  crimeData
    .filter(data => data.Latitude && data.Longitude)
    .forEach(data => {
      result.unshift(data.Latitude);
      result.unshift(data.Longitude);
    });

  return result;
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
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBfzfG_CDAaVM2mYzqBRhQAe70ZX_epyHA&v=3.exp&libraries=geometry,drawing,places,visualization",
    loadingElement: <div style={{ height: '100%', width: '100%' }} />,
    containerElement: <div style={{ height: '100%', width: '100%' }} />,
    mapElement: <div style={{ height: '100%', width: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {

    }
  })
)(props => {
  const {
    currentLocation,
    destination,
    crimeData,
    path,
    onMapClick
  } = props;

  const heatMapOptions = {
    // gradient: ['#dc143c', '#f08080'],
    radius: 25,
  };

  return (
    <GoogleMap
      labelAnchor={new window.google.maps.Point(0, 0)}
      defaultZoom={16}
      defaultCenter={currentLocation}
      style={{ width: 800 }}
      onClick={onMapClick}
    >
      {/* TODO: add a toast to prompt user to select a destination */}
      <Marker position={currentLocation} />

      {/* Destination Marker */}
      {destination && <Marker position={destination} />}

      {/* Route PolyLine */}
      {(destination && path) && <Polyline
        path={path}
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
        }}
      />}

      {/* Heat Map */}
      {crimeData && <HeatmapLayer
        data={extractHeatmapData(crimeData)}
        options={heatMapOptions}
      />}

      {/* Crime Markers */}
      {/* TODO - Replace markers with icons */}
      {crimeData && crimeData.map(data => <Marker position={{lat: data.Latitude, lng: data.Longitude }} />)}
    </GoogleMap>)}
);

export default GoogleMapComponent;
