import React, {Component} from "react";
import { base, database } from '../../core/Api';
import {postLocation} from '../User';
import BackgroundGeolocation from "react-native-background-geolocation";
import GeoFire from 'geofire';

const oceanRef = database.ref('ocean');
const geoFire = new GeoFire(oceanRef);
const geoRef = geoFire.ref();
var geoQuery = geoFire.query({
  center: [-78.537960, 31.295810],
  radius: 1
});

let CUPool;
var onReadyRegistration = geoQuery.on("ready", function() {
  console.log("GeoQuery has loaded and fired all other events for initial data");
});

var onKeyEnteredRegistration = geoQuery.on("key_entered", function(key, location, distance) {
  if(CUPool) {
    CUPool.child(key).set({
      isProcessing: true,
    }).catch(e => console.log("FBERROR_KEY_ENTERED", e));
  }
  console.log(key + " entered query at " + location + " (" + distance + " km from center)");
});

var onKeyExitedRegistration = geoQuery.on("key_exited", function(key, location, distance) {
  if(CUPool) {
    CUPool.child(key).set(null).catch(e => console.log("FBERROR_KEY_EXITED", e));
  }
  console.log(key + " exited query to " + location + " (" + distance + " km from center)");
});

const pushLocationUpdate = (location) => {
  const uid = base.auth().currentUser.uid;
  if (!uid) return;

  if (!CUPool) CUPool = database.ref(`pools/${uid}`);

  const { coords: { latitude, longitude } } = location;
  const coordsArray = [latitude, longitude];

  geoFire.set(uid, coordsArray);
  geoQuery.updateCriteria({
    center: coordsArray,
  });

};

const startTracking = (store) => {

  BackgroundGeolocation.configure({
    // Geolocation Config
    desiredAccuracy: 0,
    stationaryRadius: 25,
    distanceFilter: 250,
    // Activity Recognition
    stopTimeout: 1,
    // Application config
    debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
    stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
    startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
  }, function (state) {
    console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

    if (!state.enabled) {
      BackgroundGeolocation.start(function () {
        console.log("- Start success");

      });
    }
  });
  // This handler fires whenever bgGeo receives a location update.
  BackgroundGeolocation.on('location', (location) => {
    console.log('- [js]location: ', JSON.stringify(location));
    store.dispatch(postLocation('location', location))
  });

  // This handler fires whenever bgGeo receives an error
  BackgroundGeolocation.on('error', function (error) {
    var type = error.type;
    var code = error.code;
    alert(type + " Error: " + code);
  });

  // This handler fires when movement states changes (stationary->moving; moving->stationary)
  BackgroundGeolocation.on('motionchange', (location) => {
    console.log('- [js]motionchanged: ', JSON.stringify(location));
    store.dispatch(postLocation('motion', location))
  });

  // This event fires when a chnage in motion activity is detected
  BackgroundGeolocation.on('activitychange', (activityName) => {
    console.log('- Current motion activity: ', activityName);  // eg: 'on_foot', 'still', 'in_vehicle'
    store.dispatch(postLocation('activity', activityName))

  });

  // This event fires when the user toggles location-services
  BackgroundGeolocation.on('providerchange', (provider) => {
    console.log('- Location provider changed: ', provider.enabled);
    store.dispatch(postLocation('provider', provider.enabled))
  });

};

export default startTracking;
