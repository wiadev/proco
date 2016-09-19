import { database, timestamp, getKey } from "../../core/Api";
import { getThreadPeople } from "./api";
import { startWatching } from "../../core/Api/firebase";

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
      console.log("data", data);

      const threads = data.threads ? data.threads : {};
      const unseen = data.unseen_threads ? Object.keys(data.unseen_threads) : [];

      for (let thread of Object.keys(data.threads)) {
        threads[thread] = Object.assign(data.threads[thread], {
          people: await getThreadPeople(thread),
          unseen: Object.keys(data.threads[thread].unseen_messages),
        });
      }

      return {
        threads,
        unseen
      };

    }));

  };
};
