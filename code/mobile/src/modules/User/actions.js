import {database} from '../../core/Api';

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

const typeMap = {
  info: 'INFO',
  settings: 'SETTINGS',
  tokens: 'TOKENS'
};

const getUserUpdatedActionTypeFor = (type) => {
  return `USER_UPDATED_${typeMap[type]}`;
};

export function updateUserLocally(type, data) {
  console.log("user update", type, data);
  return {
    type: getUserUpdatedActionTypeFor(type),
    payload: {
      ...data
    }
  };
}

export function updateUser(type, data = {}, after = () => {
}) {
  return (dispatch, getState) => {
    const {auth} = getState();
    getUserRef(auth.get('uid'), type).update(data).then(() => {
      dispatch(updateUserLocally(type, data));
      dispatch(serverAction({
        type: getUserUpdatedActionTypeFor(type),
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
    const {auth} = getState();
    if (!auth.get('uid')) return;

    const unsubs = getUserRef(auth.get('uid'), type).on('value',
      (snap) => {
        if (snap) {
          const data = snap.val();
          if (data) {
            unsubs();
            dispatch(updateUserLocally(type, data));
          } else {
            dispatch(serverAction({
              type: 'USER_FIRST_LOGIN'
            }));
          }
        }
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
