import {database} from '../../core/Api';

export const getUserRef = (uid, child = null) => database().ref().child(`users/${uid}/${child || null}`);

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

export function syncLocalUserToDatabase(type) {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.auth.uid) return;
    const typeToReducer = {
      'is': 'isUser',
      'info': 'user',
      'settings': 'settings',
      'tokens': 'tokens',
      'filters': 'filters',
    };
    const dontSync = ['hasStartedLoading', 'isLoaded', 'unread_messages'];
    const data = state[typeToReducer[type]];
    const toSync = Object.keys(data).filter((key) => {
      return !(dontSync.indexOf(key) > -1);
    });
    let newData = {};
    toSync.forEach(key => newData[key] = data[key]);
    dispatch(updateUser(type, newData));
  }
}

export function updateUser(type, data = {}, after = () => {
}, immediatelyForLocal = false) {
  return (dispatch, getState) => {
    const state = getState();

    if (!state.auth.uid) {
      console.log("User is not logged in (trying to update)");
      return;
    }

    const ref = getUserRef(state.auth.uid, type);
    ref.update(data).then(() => {
      dispatch(updateUserLocally(type, data));
      after();
    });
  };
}

export function loadUser(type, realtime = false) {
  return (dispatch, getState) => {
    const {auth,isUser} = getState();
    if (!auth.uid) return;
    //if (type === 'is' && realtime === true && isUser.hasStartedLoading === true) return;

    const unsubs = getUserRef(auth.uid, type).on('value',
      async (snapshot) => {
        const data = await snapshot.val();
        if (data) {
          dispatch(updateUserLocally(type, data));
          if (unsubs && !realtime) unsubs();
        } else {
          dispatch(syncLocalUserToDatabase(type));
          if(type === 'info') {
            dispatch(generateInitialInfo());
          }
        }
      });
  };
}

export function generateInitialInfo() {
  return (dispatch, getState) => {
    const { tokens } = getState();
    if (!tokens.facebook) return;

    console.log("generaitng initial")
    const fields = ['id', 'name', 'birthday', 'gender', 'age_range', 'first_name', 'last_name'].join(',');
    fetch(`https://graph.facebook.com/v2.7/me?access_token=${tokens.facebook}&fields=${fields}`)
      .then((response) => response.json())
      .then((response) => {
        const { id, name, gender, age_range, first_name, last_name, birthday } = response;

        let info = {
          fid: id,
          name,
          gender,
          age_range_on_facebook: age_range,
          first_name,
          last_name
        };

        if (birthday) {
          let _birthday = birthday.split('/');
          info.birthday = `${_birthday[1]}/${_birthday[0]}/${_birthday[2]}`;
          info.birthyear = _birthday[2];
        }

        dispatch(updateUser('info', info));

      })
      .catch((error) => {
        console.error(error);
      });

  };
}
