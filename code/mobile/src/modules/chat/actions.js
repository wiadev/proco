import { database, timestamp, refs, getKey } from "../../core/firebase";
import { assign } from "../../core/utils";
import { getThreadPeople } from "./api";
//import { loadSummary } from "../Profiles/actions";

export const MESSAGES_RECEIVED = 'Proco/Chat/MessagesReceived';
export const THREAD_OPEN_REQUEST = 'Proco/Chat/ThreadOpenRequest';
export const THREAD_CLOSE_REQUEST = 'Proco/Chat/ThreadCloseRequest';
export const THREAD_ADDED = 'Proco/Chat/ThreadAdded';
export const THREAD_CHANGED = 'Proco/Chat/ThreadChanged';

export const messagesReceived = (thread_id, messages) => ({
  type: MESSAGES_RECEIVED,
  payload: {
    thread_id,
    messages,
  },
});

const getMessageObjectForApp = (message, profiles) => {
  const user = profiles[message.user];
  return assign(message, {
    user: {
      _id: message.user,
      name: user.name,
      avatar: user.avatar,
    },
  });
};

export const loadMessages = (thread_id, endAt, startAt) => {
  console.log("load messages", thread_id, endAt, startAt);
  return (dispatch, getState) => {
    const {auth: {uid}, profiles: {profiles}} = getState();

    let ref = getThreadRef(thread_id, uid).orderByChild('createdAt');

    if (endAt) ref = ref.endAt(endAt);
    if (startAt !== null) {
      ref = ref.startAt(startAt);
    } else {
      ref = ref.limitToLast(30);
    }

    ref.once('value')
      .then(snap => snap.val())
      .then(messages => {
        if (messages) {

         console.log("got messages", messages, startAt, endAt, Object.keys(messages).length);

          dispatch(loadedMessages(thread_id,
            Object.keys(messages).map(message => getMessageObjectForApp(messages[message], profiles))
          ));

        }
      });

  };
};

export const startWatchingThread = (thread_id) => {
  return (dispatch, getState) => {
    const {auth: {uid}, profiles: {profiles}, chat: {messages}} = getState();

    const now = Date.now();

    let ref = getThreadRef(thread_id, uid)
      .orderByChild('createdAt')
      .startAt(now)
      .limitToLast(1)
      .on('child_added', (snap) => {
        console.log("child added", now, snap.val());
        dispatch(loadedMessages(thread_id, [getMessageObjectForApp(snap.val(), profiles)]));
      });

    const thread = messages[thread_id];

    let startAt = null;

    if (thread.length > 1) {
      startAt = thread[0].createdAt + 1;
    }

    dispatch(loadMessages(thread_id, now, startAt));

  };
};

const setInitialStateForThread = (thread_id) => {
  return (dispatch, getState) => {
    const {chat: {messages}} = getState();

    if (messages[thread_id]) return;

    dispatch({
      type: 'SET_THREAD_INITIAL_STATE',
      payload: {
        thread_id,
      },
    })
  };
};

export const loadedMessages = (thread_id, messages) => ({
  type: 'LOADED_MESSAGES',
  payload: {
    thread_id,
    messages,
  },
});

export const threadAdded = (thread_id, payload) => ({
  type: THREAD_ADDED,
  payload: {
    thread_id,
    payload,
  },
});

export const threadChanged = (thread_id, payload) => ({
  type: THREAD_CHANGED,
  payload: {
    thread_id,
    payload,
  },
});

export const openThread = (thread_id, payload) => ({
  type: THREAD_OPEN_REQUEST,
  payload: {
    thread_id,
    payload,
  },
});
