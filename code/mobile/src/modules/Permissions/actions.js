const Permissions = require('react-native-permissions');
import FCM from 'react-native-fcm';
import { update } from '../User/actions';

const typeMap = {
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

export const openSettings = () => Permissions.openSettings();

export function updateNotificationToken(fcm_token) {
  return (dispatch, getState) => {
    if (!fcm_token) return;
    const { auth, tokens } = getState();

    if (!auth.uid) return;

    if (tokens.fcm === fcm_token) {
      console.log("Already have it");
      return;
    }

    dispatch({
      type: `PERMISSION_STATUS_CHANGED`,
      payload: {
        notification: 'authorized',
      }
    });

    dispatch(update('tokens', {
      fcm: fcm_token,
    }));

  }
}
