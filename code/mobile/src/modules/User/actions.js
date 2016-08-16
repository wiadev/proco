import { database } from '../../core/Api';

import {
  serverPromisedAction,
  serverAction
} from '../../core/Api/actions';

import {
  USER_STARTED_LOADING,
  USER_UPDATED,
  USER_UNLOAD,
} from './actionTypes';

function updateUserLocally(data) {
  return {
    type: USER_UPDATED,
    payload: {
      ...data
    }
  };
}

export function updateUser(data) {
  return (dispatch, getState) => {
    dispatch(updateUserLocally(data));
    dispatch(serverAction({
      type: 'USER_UPDATE',
      payload: {
        ...data
      }
    }));
  };
}

export function loadUser() {
  return (dispatch, getState) => {
    const { auth, user} = getState();

    if (!auth.get('uid')) return;
    if (user.get('hasStartedLoading')) return;

    dispatch({
      type: USER_STARTED_LOADING
    });

    const ref = database().ref(`users/${auth.get('uid')}/info`);

    ref.on('value', (snap) => {
      const info = snap.val();
      if (info) {
        dispatch(updateUserLocally(info));
      }
    });

  };
}
export function unloadUser() {
  return {
    type: USER_UNLOAD
  };
}
