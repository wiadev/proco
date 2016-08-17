const Permissions = require('react-native-permissions');
const typemap = {
  'camera': 'CAMERA',
  'notification': 'NOTIFICATIONS',
  'location': 'LOCATION',
};

export function syncPermissions() {
  return (dispatch) => {
    Permissions.getPermissionStatus(['camera', 'notification', 'location', 'backgroundRefresh'])
      .then(payload => {
        dispatch({
          type: `PERMISSION_STATUS_CHANGED`,
          payload
        });
      });
  }
}
