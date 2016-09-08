import { base, database } from '../../core/Api';
import { getCUID } from '../User/actions';
import BackgroundGeolocation from "react-native-background-geolocation";
import GeoFire from 'geofire';

const oceanRef = database.ref('ocean');
const geoFire = new GeoFire(oceanRef);

const pushLocationUpdate = (location) => {
  const uid = getCUID();
  if (!uid) return;
  const { coords: { latitude, longitude } } = location;
  database.ref(`tests/location-tracking/${uid}`).push(location);
  return geoFire.set(uid, [latitude, longitude]);
};

export const resetPool = () => database.ref(`users/pools/${getCUID()}`).set(null);

const startTracking = () => {

  BackgroundGeolocation.configure({
    // Geolocation Config
    desiredAccuracy: 0,
    stationaryRadius: 25,
    distanceFilter: 250,
    // Activity Recognition
    stopTimeout: 1,
    useSignificantChangesOnly: true,
    // Application config
    debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
    stopOnTerminate: true,   // <-- Allow the background-service to continue tracking when user closes the app.
    startOnBoot: false,        // <-- Auto start tracking when device is powered-up.
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
    pushLocationUpdate(location);
  });

  // This handler fires whenever bgGeo receives an error
  BackgroundGeolocation.on('error', function (error) {
    var type = error.type;
    var code = error.code;
    const uid = getCUID();
    if (uid) database.ref(`tests/location-tracking-error/${uid}`).push(error);

  });

  // This handler fires when movement states changes (stationary->moving; moving->stationary)
  BackgroundGeolocation.on('motionchange', (location) => {
    console.log('- [js]motionchanged: ', JSON.stringify(location));

    const uid = getCUID();
    if (uid) database.ref(`tests/location-tracking-motion/${uid}`).push(location);

  });

  // This event fires when a chnage in motion activity is detected
  BackgroundGeolocation.on('activitychange', (activityName) => {
    console.log('- Current motion activity: ', activityName);  // eg: 'on_foot', 'still', 'in_vehicle'

    const uid = getCUID();
    if (uid) database.ref(`tests/location-tracking-activity/${uid}`).push(activityName);

  });

  // This event fires when the user toggles location-services
  BackgroundGeolocation.on('providerchange', (provider) => {
    console.log('- Location provider changed: ', provider.enabled);

    const uid = getCUID();
    if (uid) database.ref(`tests/location-tracking-provider/${uid}`).push(provider);

  });

};

export default startTracking;
