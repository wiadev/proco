import {database} from '../../core/Api';
import deepEqual from 'deep-equal';

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
    case 'info': return hasChanged(state.user, data);
    case 'settings': return hasChanged(state.settings, data);
    case 'tokens': return hasChanged(state.tokens, data);
    case 'filters': return hasChanged(state.filters, data);
    case 'is': return hasChanged(state.isUser, data);
    default: return true;
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

export function updateUser(type, data = {}, after = () => {
}) {
  return (dispatch, getState) => {
    const state = getState();
    const { uid = null } = state.auth;

    if (!uid) {
      console.log("User is not logged in (trying to update)");
      return;
    }

    if (validateUserDataBeforeUpdate(type, data, state)){
      getUserRefForType(type, uid).update(data).then(() => after());
    } else {
      console.log("We have this data already");
    }

  };
}
