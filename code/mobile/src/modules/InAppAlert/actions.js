import {
  Vibration,
} from 'react-native';

import {
  CREATE_ALERT,
  DELETE_ALERT
} from './actionTypes';

export function createAlert(alertParams) {
  Vibration.vibrate([0, 500, 200, 500]);
  return {
    type: CREATE_ALERT,
    payload: alertParams
  };
}

export function deleteAlert(alertOrAlertId) {
    return {
        type: DELETE_ALERT,
        payload: alertOrAlertId
    };
}
