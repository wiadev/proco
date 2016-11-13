import FCM from "react-native-fcm";
import { cloudNotificationReceived, fcmTokenReceived } from "./actions";

// In both subscribers, we don't use or need the UID param but our generic read saga requires it.
export function tokenSubscriber(uid, emit) {
  let refreshUnsubscribe = FCM.on('refreshToken',
    token => emit(fcmTokenReceived(token))
  );

  return () => refreshUnsubscribe();
}

export function notificationSubscriber(uid, emit) {
  let notificationUnsubscribe = FCM.on('notification',
    notification => emit(cloudNotificationReceived(notification))
  );

  return () => notificationUnsubscribe();
}
