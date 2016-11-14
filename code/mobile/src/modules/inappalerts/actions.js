export const VIBRATION_REQUEST = 'Proco/Notifications/VibrationRequest';

export const NOTIFICATION_RECEIVED = 'proco/notifications/received';
export const NOTIFICATION_SHOW = 'proco/notifications/show';
export const NOTIFICATION_HIDE = 'proco/notifications/hide';

export const CREATE_ALERT = 'proco/alert/CREATE_ALERT';
export const DELETE_ALERT = 'proco/alert/DELETE_ALERT';

export const vibrationRequest = () => ({
  type: VIBRATION_REQUEST,
});

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
