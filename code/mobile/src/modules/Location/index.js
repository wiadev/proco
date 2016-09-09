import { base, database } from '../../core/Api';
import { getCUID } from '../User/actions';
import GeoFire from 'geofire';

import { DeviceEventEmitter } from 'react-native';
var { RNLocation: Location } = require('NativeModules');

const oceanRef = database.ref('ocean');
const geoFire = new GeoFire(oceanRef);

DeviceEventEmitter.addListener(
  'locationUpdated',
  (location) => {
    console.log("location", location)
    const uid = getCUID();
    if (!uid) return;
    const { coords: { latitude, longitude } } = location;
    database.ref(`tests/location-tracking/${uid}`).push(location);
    return geoFire.set(uid, [latitude, longitude]);
  }
);


const startTracking = () => {
  Location.requestAlwaysAuthorization();
  Location.startUpdatingLocation();
  Location.setDistanceFilter(50);
};

export default startTracking;
