import {database, refs} from "../index";

const defaultDataReducer = (data) => Promise.resolve(data);

export const startWatching = (key, ref, reducer = defaultDataReducer) => {
  return (dispatch) => {

    if (refs[key]) return false;
    refs[key] = ref;

    ref.on('value', snapshot => {
      reducer(snapshot.val()).then(data => {
        dispatch({
          type: 'FIREBASE_WATCH_' + key.toLocaleUpperCase(),
          payload: {
            key,
            data,
          },
        });
      });
    });

  }
};

export const stopWatching = (key) => {
  return () => {
    if (!refs[key]) return false;
    refs[key].off();
  };
};

export const stopWatchingAll = () => {
  return () => {
    Object.keys(refs).forEach(key => stopWatching(key));
  };
};

export const takeOnline = () => {
  return (dispatch, getState) => {
    const {auth: {uid}} = getState();
    const isOnlineRef = database.ref(`users/summary/${uid}/is_online`);
    isOnlineRef.set(true).then(() => isOnlineRef.onDisconnect().set(false));
  };
};
