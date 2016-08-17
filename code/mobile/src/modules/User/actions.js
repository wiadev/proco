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
    const { auth, user } = getState();

    if (!auth.get('uid')) return;
    getUserRef(auth.get('uid'), type).once('value',
      (snap) => dispatch(updateUserLocally(type, snap.val()))
    );
  };
}
export function unloadUser() {
  return {
    type: USER_UNLOAD
  };
}
