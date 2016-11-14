import { database, timestamp, getKey, getFirebaseDataWithCache } from "../../core/firebase";
import { assign } from "../../core/utils";

export const getThreadPeople = thread_id =>
  getFirebaseDataWithCache(`threads/info/${thread_id}/people`)
    .then(people => Object.keys(people));

export const getThreadRefAsString = (uid, thread_id) => `threads/messages/${thread_id}/${uid}`;

export const markThreadAsSeen = (uid, thread_id) =>
  database.ref(`inboxes/${uid}/unseen_threads/${thread_id}`).set(null);

export const send = async(uid, thread_id, message) => {

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

  return database.ref().update(updates);

};

export const markMessageAsSeen = async(uid, thread_id, message_id) => {
  const people = await getThreadPeople(thread_id);

  const updates = {};

  updates[`inboxes/${uid}/threads/${thread_id}/unseen_messages/${message_id}`] = null;
  updates[`threads/messages/${thread_id}/_/${message_id}/seen_by/${uid}`] = timestamp;

  people.forEach(to => {
    if (to !== uid) {
      updates[`threads/messages/${thread_id}/${to}/${message_id}/seen_by/${uid}`] = timestamp;
    }
  });

  return database.ref().update(updates);
};

export const loadMessages = async(uid, thread_id, endAt, startAt) => {
  console.log("LOAD MESSAGES uid", uid, thread_id);
  let ref = database.ref(getThreadRefAsString(uid, thread_id)).orderByChild('createdAt');

  if (endAt) ref = ref.endAt(endAt);
  if (startAt !== null) {
    ref = ref.startAt(startAt);
  } else {
    ref = ref.limitToLast(30);
  }

  return ref.once('value')
    .then(snap => snap.val())
    .then(messages => {
      if (messages) {
        return Object.keys(messages).map(message => messages[message]);
      } else {
        return [];
      }
    });

};

export const getMessageObjectForApp = (state, message) => {
  let user = state.profiles.profiles[message.user];
  if (!user) {
    if (state.auth.get('uid') === message.user) {
      user = {
        name: state.user.info.get('name'),
        avatar: state.user.info.get('avatar'),
      }
    } else {
      return null;
    }
  }
  return assign(message, {
    user: {
      _id: message.user,
      name: user.name,
      avatar: user.avatar,
    },
  });
};
