import { database, getCUID } from '../firebase';
import GeoFire from 'geofire';

import { DeviceEventEmitter } from 'react-native';
var { RNLocation: Location } = require('NativeModules');


export function subscriber(uid, emit) {

DeviceEventEmitter.addListener(
  'locationUpdated',
  ({ coords: { latitude, longitude } }) => {
    emit(locationUpdated({
      uid, latitude, longitude,
    }))
  }
);

  return () => DeviceEventEmitter.removeAllListeners('locationUpdated');
}


function* startLocationTracking() {
    yield call([Location, Location.requestAlwaysAuthorization]);
    yield call([Location, Location.startUpdatingLocation]);
    yield call([Location, Location.setDistanceFilter], 50);
    let listener = yield fork(watchLocation, payload.uid);

    yield take([authActions.SIGN_OUT_FULFILLED]);
    yield cancel(listener);
  }
}

function* watchLocation() {
  while (true) {

    yield take(START_TRACKING_LOCATION);
    yield fork(watch)
    yield take(STARTED_TRACKING_LOCATION);

    let listener = yield fork(watchLocation, payload.uid);

    yield take([authActions.SIGN_OUT_FULFILLED]);
    yield cancel(listener);
  }
}

export const userSagas = [
  fork(watchAuthentication),
];

