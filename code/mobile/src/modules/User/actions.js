import {database} from '../../core/Api';

export const getUserRef = (uid, child = null) => database().ref(`users/${uid}/${child || null}`);

import {
  serverAction,
} from '../../core/Api/actions';

const typeMap = {
  info: 'INFO',
  settings: 'SETTINGS',
  tokens: 'TOKENS',
  filters: 'FILTERS',
  is: 'IS',
};

const getUserUpdatedActionTypeFor = (type) => {
  return `USER_UPDATED_${typeMap[type]}`;
};

export function updateUserLocally(type, data) {
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
    const state = getState();
    console.log("state", state);
    console.log("update user", type, data, after)
    if (!state.auth.uid) {
      setTimeout(() => { // Poor way to defer requests
        dispatch(updateUser(type, data, after));
      }, 250);
      return;
    }

    getUserRef(state.auth.uid, type).update(data).then(() => {
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

export function loadUser(type, realtime = false) {
  return (dispatch, getState) => {
    const {auth} = getState();
    if (!auth.uid) return;

    const unsubs = getUserRef(auth.uid, type).on('value',
      (snap) => {
        if (snap) {
          const data = snap.val();
          if (data) {
            dispatch(updateUserLocally(type, data));
            if(unsubs && !realtime) unsubs();
          } else {
            dispatch(serverAction({
              type: 'USER_GENERATE_DATA',
              payload: {
                type
              }
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
