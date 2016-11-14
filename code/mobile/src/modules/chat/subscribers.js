import { database } from "../../core/firebase";
import { getThreadRefAsString } from "./api";
import { eventChannel } from "redux-saga";
import { messagesReceived, threadSpotted, threadChanged, unseenThreadSpotted, unseenThreadSeen } from "./actions";

export function threads(uid, emit) {

  let initialized = false;
  let ref = database.ref(`inboxes/${uid}/threads`);

  ref.on('child_added', snap => {
    const data = snap.val();
    emit(threadSpotted(snap.key, data));
  });

  ref.on('child_changed', snap => {
    const data = snap.val();
    emit(threadChanged(snap.key, data));
  });

  ref.once('value', () => {
    initialized = true;
  });

  return () => ref.off();

}

export function unseenThreads(uid, emit) {

  let initialized = false;
  let ref = database.ref(`inboxes/${uid}/unseen_threads`);

  ref.on('child_added', snap => {
    emit(unseenThreadSpotted(snap.key));
  });

  ref.on('child_removed', snap => {
    emit(unseenThreadSeen(snap.key));
  });

  ref.once('value', () => {
    initialized = true;
  });

  return () => ref.off();

}

export function subscribeToThread(uid, thread_id, now) {
  return eventChannel(emit => {
    let initialized = false;
    let ref = database.ref(getThreadRefAsString(uid, thread_id))
      .orderByChild('createdAt')
      .startAt(now)
      .limitToLast(1);

    ref.on('child_added', snap => {
      const data = snap.val();
      emit(messagesReceived(thread_id, [data]));
    });

    ref.once('value', () => {
      initialized = true;
    });

    return () => ref.off();
  });
}
