import GeoFire from 'geofire';
import { database } from '../firebase';

const oceanRef = database.ref('ocean/index');
const geoFire = new GeoFire(oceanRef);

export const updateLocation = (uid, latitude, longitude) => 
  Promise.all([
    geoFire.set(uid, [latitude, longitude]),
    database.ref(`archived/location-history/${uid}`).push({
      coords: { latitude, longitude }
    })
  ]);
