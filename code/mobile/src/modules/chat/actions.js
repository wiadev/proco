import { assign } from "../../core/utils";

export const CHAT_MESSAGE_SEND_REQUEST = 'Proco/Chat/MessageSendRequest';
export const LOAD_MESSAGES = 'Proco/Chat/LoadMessages';
export const MESSAGES_RECEIVED = 'Proco/Chat/MessagesReceived';
export const THREAD_OPEN_REQUEST = 'Proco/Chat/ThreadOpenRequest';
export const THREAD_CLOSE_REQUEST = 'Proco/Chat/ThreadCloseRequest';
export const THREAD_SPOTTED = 'Proco/Chat/ThreadSpotted';
export const THREAD_ADDED = 'Proco/Chat/ThreadAdded';
export const THREAD_CHANGED = 'Proco/Chat/ThreadChanged';
export const ADD_MESSAGES_TO_THREAD = 'Proco/Chat/AddMessagesToThread';
export const UNSEEN_THREAD_SPOTTED = 'Proco/Chat/UnseenThreadSpotted';
export const UNSEEN_THREAD_SEEN= 'Proco/Chat/UnseenThreadSeen';

export const messagesReceived = (thread_id, messages) => ({
  type: MESSAGES_RECEIVED,
  payload: {
    thread_id,
    messages,
  },
});

export const addMessagesToThread = (thread_id, messages) => ({
  type: ADD_MESSAGES_TO_THREAD,
  payload: {
    thread_id,
    messages,
  },
});

export const loadMessages = (thread_id, endAt, startAt) => ({
  type: LOAD_MESSAGES,
  payload: {
    thread_id, endAt, startAt,
  },
});

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

export const threadSpotted = (thread_id, payload) => ({
  type: THREAD_SPOTTED,
  payload: {
    thread_id,
    ...payload,
  },
});

export const threadAdded = (thread_id, payload) => ({
  type: THREAD_ADDED,
  payload: {
    thread_id,
    ...payload,
  },
});

export const threadChanged = (thread_id, payload) => ({
  type: THREAD_CHANGED,
  payload: {
    thread_id,
    ...payload,
  },
});

export const openThread = thread_id => ({
  type: THREAD_OPEN_REQUEST,
  payload: {
    thread_id,
  },
});

export const closeThread = thread_id => ({
  type: THREAD_CLOSE_REQUEST,
  payload: {
    thread_id,
  },
});

export const send = (thread_id, message) => ({
  type: CHAT_MESSAGE_SEND_REQUEST,
  payload: {
    thread_id,
    message,
  },
});


export const unseenThreadSpotted = thread_id => ({
  type: UNSEEN_THREAD_SPOTTED,
  payload: {
    thread_id,
  },
});

export const unseenThreadSeen = thread_id => ({
  type: UNSEEN_THREAD_SEEN,
  payload: {
    thread_id,
  },
});
