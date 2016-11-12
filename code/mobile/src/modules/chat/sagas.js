import { eventChannel, takeEvery, takeLatest } from "redux-saga";
import { call, cancel, fork, put, take, select } from "redux-saga/effects";
import { Actions } from "react-native-router-flux";
import { read } from "../../core/sagas";
import { getUID } from "../../core/auth/api";
import { MESSAGES_RECEIVED, THREAD_OPEN_REQUEST, THREAD_CLOSE_REQUEST, } from "./actions";
import {list as listSubscriptionCreator, thread as threadSubscriptionCreator, } from "./subscriber";

const subscribeToList = (uid, emit) =>
  eventChannel(emit => listSubscriptionCreator(uid, emit));

const subscribeToThread = (uid, thread_id, emit) =>
  eventChannel(emit => threadSubscriptionCreator(uid, thread_id, emit));

function* openThread(action) {
  let {payload: { thread_id }} = action;

  yield call(Actions.Thread, {
    thread_id,
  });

  let listener = yield fork(read, subscribeToThread(), uid, thread_id);
  yield take(THREAD_CLOSE_REQUEST);
  yield call(Actions.pop);
  yield cancel(listener);
}

function* processReceivedMessages(action) {
 let { payload } = action;

  let profile = yield select(getProfile, uid)
}

function* watchReceivedMessages() {
  yield * takeEvery(MESSAGES_RECEIVED, processRecievedMessages);
}

function* watchThreadOpenRequests() {
  yield * takeLatest(THREAD_OPEN_REQUEST, openThread);
}

const sagas = [
  fork(watchThreadOpenRequests),
  fork(watchReceivedMessages),
];

export default sagas;
