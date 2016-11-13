export const CLOUD_NOTIFICATION_PERMISSION_REQUEST = 'Proco/core/FCM/PermissionRequest';
export const CLOUD_NOTIFICATION_PERMISSION_REQUEST_FAILED = 'Proco/core/FCM/PermissionRequestFailed';
export const FCM_TOKEN_RECEIVED = 'Proco/core/FCM/TokenReceived';
export const CLOUD_NOTIFICATION_RECEIVED = 'Proco/core/FCM/NotificationReceived';

export const cloudNotificationPermissionRequest = () => ({
  type: CLOUD_NOTIFICATION_PERMISSION_REQUEST,
});

export const cloudNotificationPermissionRequestFailed = status => ({
  type: CLOUD_NOTIFICATION_PERMISSION_REQUEST_FAILED,
  payload: {
    status,
  },
});

export const fcmTokenReceived = token => ({
  type: FCM_TOKEN_RECEIVED,
  payload: { token },
});
export const cloudNotificationReceived = notification => ({
  type: CLOUD_NOTIFICATION_RECEIVED,
  payload: { ...notification },
});
