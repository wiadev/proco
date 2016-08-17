import { database } from '../../core/Api';

export const getUserRef = (uid, child = null) => database().ref(`users/${uid}/${child || null}`);

import {
  serverPromisedAction,
  serverAction
} from '../../core/Api/actions';

import {
  USER_STARTED_LOADING,
  USER_UPDATED,
  USER_UNLOAD,
} from './actionTypes';

export function updateUserLocally(type, data) {
  console.log("user update", type, data);
  return {
    type: `USER_UPDATED_${type}`,
    payload: {
      ...data
    }
  };
}

export function updateUser(type, data = {}, after = () => {}) {
  return (dispatch, getState) => {
    const { auth } = getState();
    getUserRef(auth.get('uid'), type).update(data).then(() => {
      dispatch(updateUserLocally(type, data));
      dispatch(serverAction({
        type: `USER_UPDATED_${type}`,
        payload: {
          ...data
        }
      }));

      after();

    });
  };
}

export function loadUser(type) {
  return (dispatch, getState) => {
    const { auth } = getState();
    if (!auth.get('uid')) return;

    console.log("user load", type)
    getUserRef(auth.get('uid'), type).once('value',
      (snap) => {
        console.log("snap", snap, snap.vol())
        dispatch(updateUserLocally(type, snap.val()))
      },
      (err) => {
        console.log("error", err);
      }
    );
  };
}
export function unloadUser() {
  return {
    type: USER_UNLOAD
  };
}
