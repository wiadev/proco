import React, {Component} from "react";
import {postLocation} from '../User';
import BackgroundGeolocation from "react-native-background-geolocation";

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
