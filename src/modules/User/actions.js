import FirebaseWrapper from '../../core/Api/FirebaseWrapper';

import {
  serverPromisedAction,
  serverAction
} from '../../core/Api/actions';

import {
  LOAD_USER,
  UPDATE_USER,
  UNLOAD_USER
} from './actionTypes';

export function updateUser(data) {
  return (dispatch, getState) => {
    dispatch(serverPromisedAction({
      type: 'USER_UPDATE',
      payload: {
        ...data
      },
      after: (results) => {
        dispatch(userUpdate(results));
      }
    }));
  };
}

export function loadUser() {
  return (dispatch, getState) => {
    const { auth } = getState();

  };
}
export function unloadUser() {
  return {
    type: UNLOAD_USER
  };
}
