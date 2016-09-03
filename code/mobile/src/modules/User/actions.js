import {database, getFirebaseDataWithCache} from "../../core/Api";
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

  return {
    type: getUserUpdatedActionTypeFor(type),
    payload: {
      ...data
    }
  };
}

const getCUID = () => {
  const uid = base.auth().currentUser.uid;
  if (!uid) throw new Error('CANT_WITHOUT_CUID');
  return uid;
};

export function postAnswer(qid, answer = null) {
  const uid = getCUID();
  return database.ref(`game/answers/${qid}/${uid}`).set({
    uid,
    answer,
    timestamp: base.e.database.ServerValue.TIMESTAMP
  });
}

export function postQuestion(question) {
  const uid = getCUID();
  const usersRef = database.ref('users');
  const key = usersRef.child('questions').push().key;
  const questionUpdates = {
    [`info/${uid}/current_question`]: question,
    [`info/${uid}/current_question_id`]: key,
    [`summary/${uid}/current_question`]: question,
    [`summary/${uid}/current_question_id`]: key,
    [`questions/${key}`]: {
      uid,
      question,
      current: true,
      timestamp: base.e.database.ServerValue.TIMESTAMP
    },
  };
  return usersRef.update(questionUpdates);
}


export function markAsSeen(qid) {
  const uid = getCUID();
  return database.ref(`users/questions/${qid}/seen_by/${uid}`).set(true);
}

export function changeBlockStatusFor(user, status = true) {
  const uid = getCUID();
  return database.ref(`users/blocks/${uid}/${user}`).set(status);
}

export function changeMatchStatusFor(uidToMatch, status = true) {
  const uid = getCUID();
  const matchUpdates = {
    [`${uid}/${uidToMatch}`]: status,
    [`${uidToMatch}/${uid}`]: status,
  };
  return database.ref('users/matches').update(matchUpdates);
}

export function changeMuteStatusFor(user, status = true) { // We mute by user, not message or thread
  return database.ref(`users/inbox/${getCUID()}/${user}/is_muted`).set(status);
}

export function postMessage(thread_id, message) {
  const threadIsTo = `threads/info/${thread_id}/to`;
  return getFirebaseDataWithCache(threadIsTo)
    .then(data => Object.keys(data))
    .then(to => {
      const root = database.ref();
      const key = root.push().key;
      const message = Object.assign({
        key,
      }, message);
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
