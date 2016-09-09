import {AsyncStorage} from "react-native";
import { is as isReducer, info as infoReducer } from './dataReducers';
import {startWatching, takeOnline} from "../../core/Api/firebase";
import {database, base, getThreadPeople} from "../../core/Api";
import deepEqual from "deep-equal";

const typeMap = {
  info: 'INFO',
  settings: 'SETTINGS',
  tokens: 'TOKENS',
  filters: 'FILTERS',
  is: 'IS',
  drops: 'DROPS',
};

const types = Object.keys(typeMap);
export const isValidType = (type) => (types.indexOf(type) !== -1);

export const getUserRefForTypeAsString = (type, uid) => {
  if (!uid) throw new Error('UID_REQUIRED_FOR_REF');
  if (!isValidType(type)) throw new Error('INVALID_TYPE');
  return `users/${type}/${uid}`;
};

export const getUserRefForType = (type, uid) => database.ref(getUserRefForTypeAsString(type, uid));

const getUserUpdatedActionTypeFor = (type) => {
  return `USER_UPDATED_${typeMap[type]}`;
};

const hasChanged = (old, _new) => {
  return true; // @TODO: Ther is a bug with sync
  const keysToCompare = Object.keys(_new);
  let _old = {};
  keysToCompare.forEach(key => _old[key] = (old[key] ? old[key] : null));
  return !deepEqual(_old, _new);
};

const validateUserDataBeforeUpdate = (type, data, state) => {
  if (!isValidType(type)) throw new Error('INVALID_TYPE');

  switch (type) {
    case 'info':
      return hasChanged(state.user, data);
    case 'settings':
      return hasChanged(state.settings, data);
    case 'tokens':
      return hasChanged(state.tokens, data);
    case 'filters':
      return hasChanged(state.filters, data);
    case 'is':
      return hasChanged(state.isUser, data);
    default:
      return true;
  }
};

export function updateUserLocally(type, data) {
  if (!isValidType(type)) throw new Error('INVALID_TYPE');

  AsyncStorage.setItem('@Proco:CU:' + typeMap[type], JSON.stringify(data));

  return {
    type: getUserUpdatedActionTypeFor(type),
    payload: {
      ...data
    }
  };
}

export const getCUID = () => {
  const currentUser = base.auth().currentUser;
  return (currentUser ? currentUser.uid : null);
};

export function postQuestion(question) {
  const uid = getCUID();
  const usersRef = database.ref('users');
  const key = database.ref('keyGenerator').push().key;
  const questionUpdates = {
    [`info/${uid}/current_question`]: question,
    [`info/${uid}/current_question_id`]: key,
    [`summary/${uid}/current_question`]: question,
    [`summary/${uid}/current_question_id`]: key,
    [`questions/${key}`]: {
      uid,
      question,
      current: true,
      timestamp: base.database.ServerValue.TIMESTAMP
    },
  };
  return usersRef.update(questionUpdates);
}

export function postMessage(thread_id, message) {
  return getThreadPeople(thread_id)
    .then(to => {
      const root = database.ref();
      const key = root.child('keyGenerator').push().key;
      message = Object.assign(message, {
        key,
      });
      const updates = {
        [`threads/_/${thread_id}/${key}`]: message,
        [`threads/messages/${thread_id}/${to[0]}/${key}`]: message,
        [`threads/messages/${thread_id}/${to[1]}/${key}`]: message,
        [`users/inbox/${to[0]}/${to[1]}/last_message`]: message,
        [`users/inbox/${to[1]}/${to[0]}/last_message`]: message,
      };
      return root.update(updates);
    });
}

export function postLocation(type, data) {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    if (!uid) return;
    database.ref(`users/location-data/${type}-changes/${uid}`).push(data);
  }
}

export function updateUser(type, data = {}, after = () => {
}) {
  return (dispatch, getState) => {
    const state = getState();
    const {uid = null} = state.auth;

    if (!uid) {
      console.log("User is not logged in (trying to update)");
      return;
    }

    if (validateUserDataBeforeUpdate(type, data, state)) {
      getUserRefForType(type, uid).update(data).then(() => after());
    } else {
      console.log("We have this data already");
    }

  };
}

export function afterLoginActions() {
  return (dispatch, getState) => {
    const { auth: { uid } } = getState();

    dispatch(takeOnline());
    dispatch(startWatching('userInfo', database.ref(`users/info/${uid}`), infoReducer));
    dispatch(startWatching('userIs', database.ref(`users/is/${uid}`), isReducer));
    dispatch(startWatching('userSettings', database.ref(`users/settings/${uid}`)));
    dispatch(startWatching('userFilters', database.ref(`users/filters/${uid}`)));
  };
}
