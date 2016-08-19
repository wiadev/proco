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

export function requestPermission(type) {
  return (dispatch) => {
    Permissions.requestPermission(type)
      .then(response => {
        let toDispatch = {
          type: `PERMISSION_STATUS_CHANGED`,
          payload: {}
        };
        toDispatch.payload[type] = response;
        dispatch(toDispatch);
      })
      .catch(e => {
        console.log("permission error", e)
      });
  }
}

export function openSettings() {
  Permissions.openSettings();
}
