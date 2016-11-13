import { database } from "../../core/firebase";
import { spotted,removed  } from "./actions";

export function focus (uid, emit) {
}

export function pool (uid, emit) {

  let ref = database.ref(`ocean/pools/${uid}`).orderByChild('added_on').limitToLast(15);
  let initialized = false;

  ref.on('child_added', snap => {
    let value = snap.val();
    let key = snap.key;
    emit(spotted(key, value.added_on, value.is_close));
  });

  ref.on('child_removed', snap => {
    let value = snap.val();
    let key = snap.key;
    emit(removed(key, value.added_on, value.is_close));
  });

  //ref.on('child_changed', received('info'));

  ref.once('value', () => {
    initialized = true;
  });

  return () => ref.off();

}
