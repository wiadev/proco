const Permissions = require('react-native-permissions');
const typemap = {
  'camera': 'CAMERA',
  'notification': 'NOTIFICATIONS',
  'location': 'LOCATION',
};

export function syncPermissions() {
  return (dispatch) => {
    Permissions.checkMultiplePermissions(['camera', 'notification', 'location', 'backgroundRefresh'])
      .then(payload => {
        dispatch({
          type: `PERMISSION_STATUS_CHANGED`,
          payload
        });
      })
      .catch(e => {
        console.log("permission error", e)
      });
  }
}


export function requestCameraPermissions() {

}

export function requestNotificationsPermissions() {

}

export function requestLocationPermissions() {

}
