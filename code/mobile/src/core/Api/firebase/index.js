import {database} from "../index";

const defaultDataReducer = (data) => Promise.resolve(data);

export const startWatching = (key, ref, reducer = defaultDataReducer) => {
  return (dispatch, getState) => {

    const {api: {watching}} = getState();

    if (watching[key]) return false;

    dispatch({
      type: 'FIREBASE_WATCHER_START',
      payload: {
        type: 'watching',
        key,
        status: true,
        ref,
      }
    });

    ref.on('value', snapshot => {
      reducer(snapshot.val()).then(data => {
        dispatch({
          type: 'FIREBASE_WATCH',
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
  return (dispatch) => {
    dispatch({
      type: 'FIREBASE_WATCHER_STOP',
      payload: {
        type: 'watching',
        key,
      }
    });
  };
};

export const stopWatchingAll = () => {
  return (dispatch, getState) => {
    const {api: {watching}} = getState();
    Object.keys(watching).forEach(key => {
      dispatch({
        type: 'FIREBASE_WATCHER_STOP',
        payload: {
          type: 'watching',
          key,
        }
      });
    });
  };
};

export const takeOnline = () => {
  return (dispatch, getState) => {
    const {auth: {uid}} = getState();
    const isOnlineRef = database.ref(`users/summary/${uid}/is_online`);
    isOnlineRef.set(true).then(() => isOnlineRef.onDisconnect().set(false));
  };
};