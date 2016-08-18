import FCM from 'react-native-fcm';

export const requestNotificationPermissions = () => {
  FCM.requestPermissions();
};

export const gotToken
 // for iOS
FCM.getFCMToken().then(fcm_token => {
  if (fcm_token) {
    dispatch(updateUser('tokens', {
      fcm_token
    }));
  }
});
this.notificationUnsubscribe = FCM.on('notification', (notif) => {
  // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
});
this.refreshUnsubscribe = FCM.on('refreshToken', (fcm_token) => {
  if (fcm_token) {
    dispatch(updateUser('tokens', {
      fcm_token
    }));
  }
});

FCM.subscribeToTopic('/topics/foo-bar');
FCM.unsubscribeFromTopic('/topics/foo-bar');
