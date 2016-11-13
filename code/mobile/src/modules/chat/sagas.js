import { eventChannel, takeEvery, takeLatest } from "redux-saga";
import { call, cancel, fork, take, select } from "redux-saga/effects";
import { Actions } from "react-native-router-flux";
import { read } from "../../core/sagas";
import { getUID } from "../../core/auth/api";
import { MESSAGES_RECEIVED, CHAT_MESSAGE_SEND_REQUEST, THREAD_OPEN_REQUEST, THREAD_CLOSE_REQUEST } from "./actions";
import { list as listSubscriptionCreator, thread as threadSubscriptionCreator } from "./subscriber";
import { send } from "./api";

const subscribeToList = (uid, emit) =>
  eventChannel(emit => listSubscriptionCreator(uid, emit));

const subscribeToThread = (uid, thread_id, emit) =>
  eventChannel(emit => threadSubscriptionCreator(uid, thread_id, emit));

function* processThreadOpenRequest(action) {
  let {payload: {thread_id}} = action;

  yield call(Actions.Thread, {
    thread_id,
  });

  let listener = yield fork(read, subscribeToThread(), uid, thread_id);
  yield take(THREAD_CLOSE_REQUEST);
  yield call(Actions.pop);
  yield cancel(listener);
}

function* processReceivedMessages(action) {
  let {payload} = action;

  let profile = yield select(getProfile, uid)
}

function* processSendMessageRequest(action) {
  let {payload: {thread_id, message}} = action;

  try {
    let uid = yield select(getUID);
    yield call(send, uid, thread_id, message);

  } catch (e) {

  }
}

function* watchReceivedMessages() {
  yield * takeEvery(MESSAGES_RECEIVED, processReceivedMessages);
}

function* watchThreadOpenRequests() {
  yield * takeLatest(THREAD_OPEN_REQUEST, processThreadOpenRequest);
}

function* watchSendMessageRequests() {
  yield * takeLatest(CHAT_MESSAGE_SEND_REQUEST, processSendMessageRequest);
}

export default  [
  fork(watchThreadOpenRequests),
  fork(watchReceivedMessages),
  fork(watchSendMessageRequests),
];
