const Permissions = require('react-native-permissions');
import FCM from 'react-native-fcm';
import { updateUser } from '../User/actions';

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
    if (type === 'notifications') {
      FCM.requestPermissions();
      return;
    }
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

export function updateNotificationToken(fcm_token) {
  return (dispatch) => {
    if (!fcm_token) return;

    dispatch({
      type: `PERMISSION_STATUS_CHANGED`,
      payload: {
        notification: 'authorized',
      }
    });

    dispatch(updateUser('tokens', {
      fcm_token
    }));

  }
}
