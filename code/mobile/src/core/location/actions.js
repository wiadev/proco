export const LOCATION_PERMISSION_REQUEST = 'Proco/Location/PermissionRequest';
export const LOCATION_PERMISSION_REQUEST_FAILED = 'Proco/Location/PermissionRequestFailed';
export const START_TRACKING_LOCATION = 'Proco/Location/StartTracking';
export const STOP_TRACKING_LOCATION = 'Proco/Location/StopTracking';
export const STARTED_TRACKING_LOCATION = 'Proco/Location/StartedTracking';
export const STOPPED_TRACKING_LOCATION = 'Proco/Location/StoppedTracking';
export const LOCATION_UPDATED = 'Proco/Location/Updated';

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
