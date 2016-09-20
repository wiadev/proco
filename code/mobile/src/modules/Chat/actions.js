import { database, timestamp, refs, getKey } from "../../core/Api";
import { getThreadPeople } from "./api";
import { startWatching } from "../../core/Api/firebase";
import { loadSummary } from "../Profiles/actions";

export const post = (thread_id, message) => {

  return (dispatch, getState) => {

    const {auth: {uid}} = getState();

    getThreadPeople(thread_id).then(people => {

      if (!message._id) {
        message._id = getKey();
      }

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

    });

  };
};

export const markThreadAsSeen = (thread_id) => {
  return async(dispatch, getState) => {
    const {auth: {uid}} = getState();
    database.ref(`inboxes/${uid}/${thread_id}/unseen_threads/${thread_id}`).set(null);
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
        people.splice(uid, 1);

        threads[thread] = Object.assign(threads[thread], {
          people,
          unseen: threads[thread].unseen_messages ? Object.keys(threads[thread].unseen_messages) : [],
        });

        people.forEach(person => {
          dispatch(loadSummary(person));
        });

      }

      return {
        threads,
        unseen: Object.keys(unseen_threads),
      };

    }));

  };
};

export const loadThread = (thread_id, count = 30) => {
  return (dispatch, getState) => {
    const {auth: {uid}, threads} = getState();

    const thread = threads[thread_id];

    if (!thread) {
      dispatch(setInitialStateForThread());
      thread.last_message = 0;
    }

    database.ref()
      .orderByKey()
      .limitToLast(count)
      .startAt(thread.last_message)
      .once('value')
      .then(snap => snap.val())
      .then(messages => {
        if (messages) {
          //dispatch(loadedMessages(thread_id, Object.keys(obj).map(function (key) {return obj[key]});));
        }
      });


  };
};

export const startWatchingThread = (thread_id) => {
  return (dispatch, getState) => {
    const {auth: {uid}, threads} = getState();

    const thread = threads[thread_id];

    if (!thread) {
      dispatch(setInitialStateForThread());
    }

    refs[`messageTrackerFor_${thread_id}`] = database.ref(`threads/${thread_id}/${uid}`)
      .orderByKey()
      .limitToLast(1)
      .startAt()
      .on('child_added', (snap) => {
        dispatch(receivedMessages(thread_id, [snap.val()]));
      });
  };
};

const setInitialStateForThread = (thread_id) => ({
  type: 'SET_THREAD_INITIAL_STATE',
  payload: {
    thread_id,
  },
});

const loadedMessages = (thread_id, messages) => ({
  type: 'LOADED_MESSAGES',
  payload: {
    thread_id,
    messages,
  },
});

const receivedMessages = (thread_id, messages) => ({
  type: 'RECEIVED_MESSAGES',
  payload: {
    thread_id,
    messages,
  },
});

export const stopWatchingThread = (thread_id) => {
  return (dispatch, getState) => {

  };
};
