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
  tokens: 'TOKENS',
  filters: 'DISCOVERY_FILTERS',
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
    console.log(auth);
    getUserRef(auth.uid, type).update(data).then(() => {
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
    if (!auth.uid) return;

    const unsubs = getUserRef(auth.uid, type).on('value',
      (snap) => {
        if (snap) {
          const data = snap.val();
          if (data) {
            dispatch(updateUserLocally(type, data));
            if(unsubs) unsubs();
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
