import GeoFire from "geofire";
import Permissions from 'react-native-permissions';

import { database, timestamp } from "../firebase";

const oceanRef = database.ref('ocean/index');
const geoFire = new GeoFire(oceanRef);

export const updateLocation = (uid, latitude, longitude) =>
  Promise.all([
    geoFire.set(uid, [latitude, longitude]),
    database.ref(`archived/location-history/${uid}`).push({
      coords: {latitude, longitude},
      timestamp,
    })
  ]);

export const requestPermission = () =>
  Permissions.requestPermission('location', 'always')
    .then(status => {
      if (status == !'authorized') return Promise.reject(status);
    });

export const getLatestLocation = ({location: {latitude, longitude}}) => ({
  latitude,
  longitude,
});
