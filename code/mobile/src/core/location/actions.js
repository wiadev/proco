export const REQUEST_LOCATION_PERMISSION = 'proco/location/REQUEST_PERMISSION';
export const START_TRACKING_LOCATION = 'proco/location/START_TRACKING';
export const STOP_TRACKING_LOCATION = 'proco/location/STOP_TRACKING_LOCATION';
export const STARTED_TRACKING_LOCATION = 'proco/location/STARTED_TRACKING';
export const STOPPED_TRACKING_LOCATION = 'proco/location/STOPPED_TRACKING_LOCATION';
export const LOCATION_UPDATED = 'proco/location/UPDATED';

export const requestLocationPermission = () => ({
  type: REQUEST_LOCATION_PERMISSION,
});

export const startTracking = () => ({
  type: START_TRACKING_LOCATION,
});

export const stopTracking = () => ({
  type: STOP_TRACKING_LOCATION,
});

export const startedTracking = () => ({
  type: STARTED_TRACKING_LOCATION,
});

export const stoppedTracking = () => ({
  type: STOPPED_TRACKING_LOCATION,
});

export const locationUpdated = (latitude, longitude) => ({
  type: LOCATION_UPDATED,
  payload: {latitude, longitude},
});
