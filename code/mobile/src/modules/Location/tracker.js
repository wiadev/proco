import React, {Component} from 'react';
import {
} from 'react-native';
import {connect} from 'react-redux';
import { database } from '../../core/Api';
import BackgroundGeolocation from "react-native-background-geolocation";

@connect(
  state => ({
    uid: state.auth.uid,
  }),
)
class BackgroundLocationTracker extends Component {

  constructor(props) {
    super(props);

    const { uid } = this.props;
    this.refForLocationChanges = database.ref(`users/location-data/location-changes/${uid}`);
    this.refForMotionChanges = database.ref(`users/location-data/motion-changes/${uid}`);
    this.refForProviderChanges = database.ref(`users/location-data/provider-changes/${uid}`);
    this.refForActivityChages = database.ref(`users/location-data/activity-changes/${uid}`);
    this.refForGeofence = database.ref(`users/location-data/geofence/${uid}`);

    BackgroundGeolocation.configure({
      // Geolocation Config
      desiredAccuracy: 0,
      stationaryRadius: 25,
      distanceFilter: 1000,
      // Activity Recognition
      stopTimeout: 1,
      // Application config
      debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
    }, function(state) {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

      if (!state.enabled) {
        BackgroundGeolocation.start(function() {
          console.log("- Start success");
        });
      }
    });
    // This handler fires whenever bgGeo receives a location update.
    BackgroundGeolocation.on('location', (location)  => {
      this.refForLocationChanges.push(location);
      console.log('- [js]location: ', JSON.stringify(location));
    });

    // This handler fires whenever bgGeo receives an error
    BackgroundGeolocation.on('error', function(error) {
      var type = error.type;
      var code = error.code;
      alert(type + " Error: " + code);
    });

    // This handler fires when movement states changes (stationary->moving; moving->stationary)
    BackgroundGeolocation.on('motionchange', (location) => {
      this.refForMotionChanges.push(location);
      console.log('- [js]motionchanged: ', JSON.stringify(location));
    });

    // This event fires when a chnage in motion activity is detected
    BackgroundGeolocation.on('activitychange', (activityName) => {
      this.refForActivityChages.push(activityName);
      console.log('- Current motion activity: ', activityName);  // eg: 'on_foot', 'still', 'in_vehicle'
    });

    // This event fires when the user toggles location-services
    BackgroundGeolocation.on('providerchange', (provider) => {
      this.refForProviderChanges.push(provider);
      console.log('- Location provider changed: ', provider.enabled);
    });
  }

  render() {
    return null;
  }
}

export default BackgroundLocationTracker;
