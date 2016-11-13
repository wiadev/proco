import { Record } from "immutable";
import {
  FCM_TOKEN_RECEIVED,
  CLOUD_NOTIFICATION_PERMISSION_REQUEST_FAILED,
  CLOUD_NOTIFICATION_PERMISSION_REQUEST,
} from "./actions";
import { SIGN_OUT_FULFILLED } from "../auth/actions";

const CloudNotifications = new Record({
  token: null,
  receiving: false,
  permission_status: null,
  permission_requested: false,
});

export default function cloudNotificationsReducer(state = new CloudNotifications(), {payload, type}) {
  switch (type) {
    case FCM_TOKEN_RECEIVED:
      return state.set('token', payload.token);
    case CLOUD_NOTIFICATION_PERMISSION_REQUEST_FAILED:
      return state.set('permission_requested', true, 'permission_status', payload.status);
    case CLOUD_NOTIFICATION_PERMISSION_REQUEST:
      return state.set('permission_status', 'authorized').set('receiving', true);
    case SIGN_OUT_FULFILLED:
      return new CloudNotifications();
    default:
      return state;
  }
}
