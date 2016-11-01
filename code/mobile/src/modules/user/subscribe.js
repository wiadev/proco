import { getUserRef } from "../../core/firebase";
import { userDataActions } from "./actions";

export default function (uid, emit) {

  let infoRef = getUserRef(uid, 'info');
  let settingsRef = getUserRef(uid, 'settings');

  let initializedInfo = false;
  let initializedSettings = false;

  const checkInitialization = () => {
    if (initializedInfo && initializedSettings) {
      emit(userDataActions.userDataInitialized());
    }
  };

  const received = type => snap => {
    let value = snap.val();
    let key = snap.key;

    emit(userDataActions.userDataReceived(type, key, value));

    if (type === 'info' && key === 'onboarded' && value == true) {
      emit(userDataActions.userOnboarded(value));
    }

  };

  infoRef.once('value', () => {
    initializedInfo = true;
    checkInitialization();
  });

  settingsRef.once('value', () => {
    initializedSettings = true;
    checkInitialization();
  });

  infoRef.on('child_added', received('info'));
  infoRef.on('child_changed', received('info'));
  infoRef.on('child_removed', received('info'));

  settingsRef.on('child_added', received('settings'));
  settingsRef.on('child_changed', received('settings'));
  settingsRef.on('child_removed', received('settings'));

  return () => {
    infoRef.off();
    settingsRef.off();
  };


}
