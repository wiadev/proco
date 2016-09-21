import { database, timestamp, refs, getKey } from "../../core/Api";
import { assign } from "../../core/utils";
import { getThreadPeople } from "./api";
import { startWatching } from "../../core/Api/firebase";
import { loadSummary } from "../Profiles/actions";

const getThreadRef = (thread_id, uid) => {
  if (!refs[`threadRefs_${thread_id}`]) {
    refs[`threadRefs_${thread_id}`] = database.ref(`threads/messages/${thread_id}/${uid}`);
  }
  return refs[`threadRefs_${thread_id}`];
};

export const post = (thread_id, message) => {

  return async(dispatch, getState) => {

    const {auth: {uid}} = getState();

    const people = await getThreadPeople(thread_id);

    message = assign(message, {
      _id: getKey(),
      createdAt: timestamp,
      type: message.type || "message",
      user: message.user !== 'proco' ? uid : 'proco',
    });

    const updates = {};

    updates[`threads/messages/${thread_id}/_/${message._id}`] = message;

    people.forEach(to => {
      updates[`threads/messages/${thread_id}/${to}/${message._id}`] = message;
      updates[`inboxes/${to}/threads/${thread_id}/last_message`] = message;

      if (to !== uid) {
        updates[`inboxes/${to}/threads/${thread_id}/unseen_messages/${message._id}`] = true;
        updates[`inboxes/${to}/unseen_threads/${thread_id}`] = true;
      }
    });

    database.ref().update(updates);

  };
};

export const markThreadAsSeen = (thread_id) => {
  return async(dispatch, getState) => {
    const {auth: {uid}} = getState();
    database.ref(`inboxes/${uid}/unseen_threads/${thread_id}`).set(null);
  };
};

export const markMessageAsSeen = (thread_id, message_id) => {
  return async(dispatch, getState) => {
    const {auth: {uid}} = getState();

    const people = await getThreadPeople(thread_id);

    const updates = {};

    updates[`inboxes/${uid}/threads/${thread_id}/unseen_messages/${message_id}`] = null;
    updates[`threads/messages/${thread_id}/_/${message_id}/seen_by/${uid}`] = timestamp;

    people.forEach(to => {
      if (to !== uid) {
        updates[`threads/messages/${thread_id}/${to}/${message_id}/seen_by/${uid}`] = timestamp;
      }
    });

    database.ref().update(updates);
  };
};

export const startedTyping = (thread_id) => {
  return async(dispatch, getState) => {

  };
};

export const mute = (thread_id) => {
  return (dispatch, getState) => {
    const {auth: {uid}} = getState();

  };
};

export const unmute = (thread_id) => {
  return (dispatch, getState) => {
    const {auth: {uid}} = getState();

  };
};

export const startWatchingThreads = () => {
  return (dispatch, getState) => {
    const {auth: {uid}} = getState();

    dispatch(startWatching('userThreads', database.ref(`inboxes/${uid}`), async(data) => {

      const {threads = {}, unseen_threads = {}} = data ? data : {};

      for (let thread of Object.keys(threads)) {

        const people = await getThreadPeople(thread);
        people.splice(people.indexOf(uid), 1);

        threads[thread] = Object.assign(threads[thread], {
          people,
          unseen: threads[thread].unseen_messages ? Object.keys(threads[thread].unseen_messages) : [],
        });

        people.forEach(person => {
          dispatch(loadSummary(person));
        });

        dispatch(setInitialStateForThread(thread));

      }

      return {
        threads,
        unseen: Object.keys(unseen_threads),
      };

    }));

  };
};

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
      if (endAt) ef = ref.limitToLast(30);
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
      startAt = thread[thread.length - 1].createdAt;
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

const loadedMessages = (thread_id, messages) => ({
  type: 'LOADED_MESSAGES',
  payload: {
    thread_id,
    messages,
  },
});

export const stopWatchingThread = (thread_id) => {
  return (dispatch, getState) => {

    const {auth: {uid}} = getState();
    getThreadRef(thread_id, uid).off();

  };
};
