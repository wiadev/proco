import FCM from "react-native-fcm";
import { eventChannel, takeLatest, takeEvery } from "redux-saga";
import { call, fork, put, select } from "redux-saga/effects";
import { delay, read } from "../sagas";
import { saveToken } from "../../modules/user/api";
import { getUID } from "../auth/api";
import { requestPermission } from "./api";
import { notificationSubscriber, tokenSubscriber } from "./subscribe";
import {
  CLOUD_NOTIFICATION_PERMISSION_REQUEST,
  FCM_TOKEN_RECEIVED,
  CLOUD_NOTIFICATION_RECEIVED,
  fcmTokenReceived,
  cloudNotificationPermissionRequestFailed
} from "./actions";

const subscribeToNotifications = emit =>
  eventChannel(emit => notificationSubscriber(emit));

const subscribeToFCMTokens = emit =>
  eventChannel(emit => tokenSubscriber(emit));

function* setFCMToken({payload: {token}}) {
  try {
    let uid = yield select(getUID);
    if (!uid) {
      // If we are not logged-in yet, try again in 256ms
      yield call(delay, 256);
      yield put(fcmTokenReceived(token));
    } else {
      yield call(saveToken, uid, 'fcm', token);
    }
  } catch (e) {
    //
  }
}

function* processPermissionRequest() {
  try {
    yield call(requestPermission);
    let token = call(FCM.getFCMToken);
    if (token) yield put(fcmTokenReceived(token));
  } catch (e) {
    yield put(cloudNotificationPermissionRequestFailed(e));
  }
}

function* processReceivedCloudNotification() {
  try {

  } catch (e) {
    //
  }
}

function* watchPermissionRequests() {
  yield * takeLatest(CLOUD_NOTIFICATION_PERMISSION_REQUEST, processPermissionRequest);
}

function* watchReceivedFCMTokens() {
  yield * takeLatest(FCM_TOKEN_RECEIVED, setFCMToken);
}

function* watchReceivedCloudNotifications() {
  yield * takeEvery(CLOUD_NOTIFICATION_RECEIVED, processReceivedCloudNotification);
}

export default [
  fork(read, subscribeToNotifications, null),
  fork(read, subscribeToFCMTokens, null),
  fork(watchPermissionRequests),
  fork(watchReceivedCloudNotifications),
  fork(watchReceivedFCMTokens),
];
