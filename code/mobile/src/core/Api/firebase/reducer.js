import { assign } from '../../utils';
import updeep from "updeep";

import * as userStates from '../../../modules/User/initialStates';

const initialState = {
  data: {
    userInfo: userStates.info,
    userIs: userStates.is,
  },
  getting: {},
  watching: {},
};

export default function reducer(state = initialState, action)  {
console.log("st", state, action)
  switch (action.type) {
    case 'FIREBASE_GET':
    case 'FIREBASE_WATCH':
      return makeFirebaseState(action, state, action.key, action.data);
    case 'FIREBASE_LOGIN':
    case 'FIREBASE_LOGOUT':
    case 'FIREBASE_LOGIN_ERROR':
      return updeep({
        authData: action.authData,
        authError: action.error
      }, state);
    case 'FIREBASE_GETTER_START':
    case 'FIREBASE_WATCHER_START':
      return assign(state, {
        [action.payload.type]: Object.assign({
          [action.payload.key]: {
            status: action.payload.status,
            ref: action.payload.ref
          },
        }, state[action.payload.type])
      });
    case 'FIREBASE_GETTER_STOP':
    case 'FIREBASE_WATCHER_STOP':
      return assign(state, {
        [action.payload.type]: Object.assign({
          [action.payload.key]: null,
        }, state[action.payload.type])
      });
    default:
      return state;
  }
};


function makeFirebaseState(action, state, key, value, merge = false) {
  value = Object.assign({
    isLoaded: true,
  }, value);
  value = merge ? value : updeep.constant(value);
  const data = updeep.updateIn(key, value, state.data);
  return assign(state, {
    data,
  });
}
