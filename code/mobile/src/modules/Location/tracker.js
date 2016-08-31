import React, {Component} from 'react';
import {
} from 'react-native';
import {connect} from 'react-redux';
import BackgroundGeolocation from "react-native-background-geolocation";

@connect()
class BackgroundLocationTracker extends Component {

  constructor(props) {
    super(props);

    BackgroundGeolocation.configure({
      // Geolocation Config
      desiredAccuracy: 0,
      stationaryRadius: 25,
      distanceFilter: 10,
      // Activity Recognition
      stopTimeout: 1,
      // Application config
      debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
      // HTTP / SQLite config
      url: 'http://posttestserver.com/post.php?dir=cordova-background-geolocation',
      batchSync: false,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
      autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
      maxDaysToPersist: 1,    // <-- Maximum days to persist a location in plugin's SQLite database when HTTP fails
      headers: {              // <-- Optional HTTP headers
        "X-FOO": "bar"
      },
      params: {               // <-- Optional HTTP params
        "auth_token": "maybe_your_server_authenticates_via_token_YES?"
      }
    }, function(state) {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

      if (!state.enabled) {
        BackgroundGeolocation.start(function() {
          console.log("- Start success");
        });
      }
    });
    // This handler fires whenever bgGeo receives a location update.
    BackgroundGeolocation.on('location', function(location) {
      console.log('- [js]location: ', JSON.stringify(location));
    });

    // This handler fires whenever bgGeo receives an error
    BackgroundGeolocation.on('error', function(error) {
      var type = error.type;
      var code = error.code;
      alert(type + " Error: " + code);
    });

    // This handler fires when movement states changes (stationary->moving; moving->stationary)
    BackgroundGeolocation.on('motionchange', function(location) {
      console.log('- [js]motionchanged: ', JSON.stringify(location));
    });

    // This event fires when a chnage in motion activity is detected
    BackgroundGeolocation.on('activitychange', function(activityName) {
      console.log('- Current motion activity: ', activityName);  // eg: 'on_foot', 'still', 'in_vehicle'
    });

    // This event fires when the user toggles location-services
    BackgroundGeolocation.on('providerchange', function(provider) {
      console.log('- Location provider changed: ', provider.enabled);
    });
  }

  render() {
    return null;
  }
}

export default BackgroundLocationTracker;
