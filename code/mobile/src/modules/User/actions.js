import {AsyncStorage} from "react-native";
import {is as isReducer, info as infoReducer} from "./dataReducers";
import {startWatching, stopWatchingAll, takeOnline} from "../../core/Api/firebase";
import {startWatchingPool, startWatchingPoolStatus} from '../Pool/actions';
import {database, base, timestamp} from "../../core/Api";

const typeMap = {
  info: 'INFO',
  settings: 'SETTINGS',
  tokens: 'TOKENS',
  filters: 'FILTERS',
  is: 'IS',
};

const types = Object.keys(typeMap);
export const isValidType = (type) => (types.indexOf(type) !== -1);

export const getUserRefForTypeAsString = (type, uid) => {
  if (!uid) throw new Error('UID_REQUIRED_FOR_REF');
  if (!isValidType(type)) throw new Error('INVALID_TYPE');
  return `users/${type}/${uid}`;
};

export const getUserRefForType = (type, uid) => database.ref(getUserRefForTypeAsString(type, uid));

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
      timestamp: timestamp
    },
  };
  return usersRef.update(questionUpdates);
}

export const postLocation = (type, data) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    if (!uid) return;
    database.ref(`users/location-data/${type}-changes/${uid}`).push(data);
  }
};

export const update = (type, data = {}) => {
  return (dispatch, getState) => {
    const state = getState();
    const {uid = null} = state.auth;

    if (!uid) {
      console.log("User is not logged in (trying to update)");
      return;
    }

    getUserRefForType(type, uid).update(data);

  };
};

export const afterLoginActions = () => {
  return (dispatch, getState) => {
    const {auth: {uid}} = getState();

    if (!uid) {
      console.log("THIS SHOULDN'T BE HERE");
      return;
    }

    dispatch(takeOnline());
    dispatch(startWatching('userInfo', database.ref(`users/info/${uid}`), infoReducer));
    dispatch(startWatching('userIs', database.ref(`users/is/${uid}`), isReducer));
    dispatch(startWatching('userSettings', database.ref(`users/settings/${uid}`)));
    dispatch(startWatching('userFilters', database.ref(`users/filters/${uid}`)));
    dispatch(startWatching('userInboxUnseenThreads', database.ref(`inboxes/${uid}/unseen_threads`)));
    dispatch(startWatchingPoolStatus());
    dispatch(startWatchingPool());

  };
};

export const beforeLogoutActions = () => {
  return (dispatch, getState) => {
    dispatch(stopWatchingAll());
  };
};

export const updateLoopKey = (loop_key) => {
  return (dispatch, getState) => {
    const { auth: { uid } } = getState();
    database.ref('users').update({
      [`info/${uid}/loop_key`]: loop_key,
      [`summary/${uid}/loop_key`]: loop_key,
      [`loops/${uid}/${loop_key}`]: timestamp,
    });
  };
};
