import { database } from "../../core/firebase";
import { getThreadRefAsString } from "./api";
import { newMessageReceived, threadSpotted, threadChanged } from "./actions";

export function list(uid) {

  let initialized = false;
  let ref = database.ref(`inboxes/${uid}/threads`);

  ref.on('child_added', snap => {
    const data = snap.val();

    emit(threadSpotted());

  });

  ref.on('child_changed', snap => {
    const data = snap.val();
    emit(threadChanged());
  });

  ref.once('value', () => {
    initialized = true;
  });

  return () => ref.off();

}

export function thread(uid, thread_id, emit) {
  const now = Date.now();

  emit(loadMessages(thread_id, now, 'LAST_MESSAGE'));

  let initialized = false;
  let ref = database.ref(getThreadRefAsString(thread_id, uid))
    .orderByChild('createdAt')
    .startAt(now)
    .limitToLast(1)
    .on('child_added', (snap) => {
      emit(newMessageReceived(thread_id, snap.val()));
    });

  ref.once('value', () => {
    initialized = true;
  });

  return () => ref.off();
}
