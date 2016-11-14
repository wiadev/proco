import { eventChannel, takeEvery, takeLatest } from "redux-saga";
import { call, cancel, fork, take, select, put } from "redux-saga/effects";
import { Actions } from "react-native-router-flux";
import { read } from "../../core/sagas";
import { getUID } from "../../core/auth/api";
import { SIGN_IN_FULFILLED } from "../../core/auth/actions";
import { profileLoadRequest } from "../profiles/actions";
import { vibrationRequest } from "../inappalerts/actions";
import {
  MESSAGES_RECEIVED,
  CHAT_MESSAGE_SEND_REQUEST,
  THREAD_OPEN_REQUEST,
  THREAD_SPOTTED,
  THREAD_CHANGED,
  THREAD_CLOSE_REQUEST,
  threadAdded
} from "./actions";
import {
  threads as threadsSubscriptionCreator,
  unseenThreads as unseenThreadsSubscriptionCreator,
  thread as threadSubscriptionCreator,
} from "./subscribers";
import { send, getThreadPeople } from "./api";

const subscribeToThreads = (uid, emit) =>
  eventChannel(emit => threadsSubscriptionCreator(uid, emit));

const subscribeToUnseenThreads = (uid, emit) =>
  eventChannel(emit => unseenThreadsSubscriptionCreator(uid, emit));

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

function* processSendMessageRequest({payload: {thread_id, message}}) {

  try {
    let uid = yield select(getUID);
    yield call(send, uid, thread_id, message);
  } catch (e) {
    console.log(e);
  }

}

function* processSpottedThread({payload: {thread_id, last_message}}) {

  try {
    let uid = yield select(getUID);
    let people = yield call(getThreadPeople, thread_id);
    people = people.filter(person => person !== uid);

    for (let person of people) {
      yield put(profileLoadRequest(person));
    }

    yield put(threadAdded(thread_id, {
      people,
      last_message,
    }));

    yield put(vibrationRequest());
  } catch (e) {
    console.log(e);
  }

}

function* processChangedThread({payload: {last_message: {user}}}) {
  let uid = yield select(getUID);
  if (uid !== user) {
    yield put(vibrationRequest());
  }
}

function* startWatchingThreadList() {
  let uid = yield select(getUID);
  yield fork(read, subscribeToThreads, uid);
}

function* startWatchingUnseenThreadList() {
  let uid = yield select(getUID);
  yield fork(read, subscribeToUnseenThreads, uid);
}

function* watchReceivedMessages() {
  yield * takeEvery(MESSAGES_RECEIVED, processReceivedMessages);
}

function* watchSpottedThreads() {
  yield * takeLatest(THREAD_SPOTTED, processSpottedThread);
}

function* watchChangedThreads() {
  yield * takeLatest(THREAD_CHANGED, processChangedThread);
}

function* watchThreadOpenRequests() {
  yield * takeLatest(THREAD_OPEN_REQUEST, processThreadOpenRequest);
}

function* watchSendMessageRequests() {
  yield * takeLatest(CHAT_MESSAGE_SEND_REQUEST, processSendMessageRequest);
}

function* watchThreadList() {
  yield * takeLatest(SIGN_IN_FULFILLED, startWatchingThreadList);
}

function* watchUnseenThreadList() {
  yield * takeLatest(SIGN_IN_FULFILLED, startWatchingUnseenThreadList);
}

export default [
  fork(watchThreadOpenRequests),
  fork(watchReceivedMessages),
  fork(watchSendMessageRequests),
  fork(watchThreadList),
  fork(watchUnseenThreadList),
  fork(watchSpottedThreads),
  fork(watchChangedThreads),
];
