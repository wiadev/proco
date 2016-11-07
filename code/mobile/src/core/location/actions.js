export const LOCATION_PERMISSION_REQUEST = 'proco/location/permission/REQUEST';
export const LOCATION_PERMISSION_REQUEST_FAILED = 'proco/location/permission/FAILED';
export const START_TRACKING_LOCATION = 'proco/location/START_TRACKING';
export const STOP_TRACKING_LOCATION = 'proco/location/STOP_TRACKING_LOCATION';
export const STARTED_TRACKING_LOCATION = 'proco/location/STARTED_TRACKING';
export const STOPPED_TRACKING_LOCATION = 'proco/location/STOPPED_TRACKING_LOCATION';
export const LOCATION_UPDATED = 'proco/location/UPDATED';

export const locationPermissionRequest = () => ({
  type: LOCATION_PERMISSION_REQUEST,
});

export const locationPermissionRequestFailed = status => ({
  type: LOCATION_PERMISSION_REQUEST_FAILED,
  payload: {
    status,
  },
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
