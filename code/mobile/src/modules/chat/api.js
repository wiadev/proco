import { database, getFirebaseDataWithCache } from "../../core/firebase";

export const getThreadPeople = thread_id =>
  getFirebaseDataWithCache(`threads/info/${thread_id}/people`)
    .then(people => Object.keys(people));

export const getThreadRefAsString = (uid, thread_id) => `threads/messages/${thread_id}/${uid}`;

export const markThreadAsSeen = (uid, thread_id) =>
  database.ref(`inboxes/${uid}/unseen_threads/${thread_id}`).set(null);

export const post = async(uid, thread_id, message) => {

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
