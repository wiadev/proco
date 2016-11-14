import { eventChannel, takeEvery, takeLatest } from "redux-saga";
import { call, fork, take, select, put } from "redux-saga/effects";
import { Actions } from "react-native-router-flux";
import { read, delay } from "../../core/sagas";
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
  LOAD_MESSAGES,
  threadAdded,
  messagesReceived,
  addMessagesToThread,
  loadMessages as loadMessagesRequest,
} from "./actions";
import {
  threads as threadsSubscriptionCreator,
  unseenThreads as unseenThreadsSubscriptionCreator,
  subscribeToThread
} from "./subscribers";
import { send, getThreadPeople, loadMessages, getMessageObjectForApp } from "./api";

const subscribeToThreads = (uid, emit) =>
  eventChannel(emit => threadsSubscriptionCreator(uid, emit));

const subscribeToUnseenThreads = (uid, emit) =>
  eventChannel(emit => unseenThreadsSubscriptionCreator(uid, emit));

function* processReceivedMessage(thread_id, message) {
  console.log("got new", thread_id, message);

  try {
    let messageObject = yield select(getMessageObjectForApp, message);
    if (messageObject) {
      yield put(addMessagesToThread(thread_id, [messageObject]));
    } else {
      yield call(delay, 100);
      yield fork(processReceivedMessage, thread_id, message);
    }
  } catch (e) {
    console.log("error", e);
  }

}

function* processReceivedMessages({payload: {thread_id, messages}}) {
  for (let message in messages) {
    yield fork(processReceivedMessage, thread_id, messages[message]);
  }
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
  yield fork(read, subscribeToThreads);
}

function* startWatchingUnseenThreadList() {
  yield fork(read, subscribeToUnseenThreads);
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

function* processOpenCloseRequest({type, payload: {thread_id}}) {
  if (type === THREAD_CLOSE_REQUEST) {
    yield call(Actions.pop);
  } else {
    yield call(Actions.Conversation, {
      thread_id,
    });
    let uid = yield select(getUID);
    let now = Date.now();
    yield put(loadMessagesRequest(thread_id, now, 'LAST_MESSAGE'));
    const chan = yield call(subscribeToThread, uid, thread_id, now);
    try {
      while (true) {
        let seconds = yield take(chan);
        yield put(seconds);
      }
    } finally {
      console.log('countdown terminated')
    }
  }

}

function* processLoadMessagesRequest({payload: {thread_id, endAt, startAt}}) {
  try {
    let uid = yield select(getUID);
    let messages = yield call(loadMessages, uid, thread_id, endAt, startAt);
    yield put(messagesReceived(thread_id, messages));
  } catch (e) {
    console.log("error", e);
  }
}

function* watchThreadOpenCloseRequests() {
  yield * takeLatest([THREAD_OPEN_REQUEST, THREAD_CLOSE_REQUEST], processOpenCloseRequest)
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

function* watchLoadMessagesRequests() {
  yield * takeEvery(LOAD_MESSAGES, processLoadMessagesRequest);
}


export default [
  fork(watchThreadOpenCloseRequests),
  fork(watchReceivedMessages),
  fork(watchSendMessageRequests),
  fork(watchThreadList),
  fork(watchUnseenThreadList),
  fork(watchSpottedThreads),
  fork(watchChangedThreads),
  fork(watchLoadMessagesRequests),
];
