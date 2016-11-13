import { Vibration } from "react-native";

export const NOTIFICATION_RECEIVED = 'proco/notifications/received';
export const NOTIFICATION_SHOW = 'proco/notifications/show';
export const NOTIFICATION_HIDE = 'proco/notifications/hide';

export const CREATE_ALERT = 'proco/alert/CREATE_ALERT';
export const DELETE_ALERT = 'proco/alert/DELETE_ALERT';

export const notificationReceived = params => ({
  type: NOTIFICATION_RECEIVED,
  payload: {
    ...params,
  },
});

export const notificationShow = params => ({
  type: NOTIFICATION_SHOW,
  payload: {
    ...params,
  },
});

export const notificationHide = id => ({
  type: NOTIFICATION_SHOW,
  payload: {
    id,
  },
});

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
