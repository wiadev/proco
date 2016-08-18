import {
  CREATE_ALERT,
  DELETE_ALERT
} from './actionTypes';

export function createAlert(alertParams) {
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