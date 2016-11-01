export const REQUEST_LOCATION_PERMISSON = 'proco/location/REQUEST_PERMISSON';
export const START_TRACKING_LOCATION = 'proco/location/START_TRACKING';
export const STOP_TRACKING_LOCATION = 'proco/location/STOP_TRACKING_LOCATION';
export const LOCATION_UPDATED = 'proco/location/UPDATED';

export const requestLocationPermission = () => ({
    type: START_TRACKING_LOCATION,
  });

export const startTracking = () => ({
    type: START_TRACKING_LOCATION,
  });

export const stopTracking = () => ({
    type: STOP_TRACKING_LOCATION,
  });

export const locationUpdated = (latitude, longitude) => ({
    type: LOCATION_UPDATED,
    payload: {latitude, longitude},
  });
