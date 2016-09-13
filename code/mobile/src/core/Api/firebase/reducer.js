import { assign } from '../../utils';
import updeep from "updeep";

import * as userStates from '../../../modules/User/initialStates';

const initialState = {
  data: {
    userInfo: userStates.info,
    userIs: userStates.is,
  },
};

export default function reducer(state = initialState, action)  {

  switch (action.type) {
    case 'FIREBASE_WATCH_USERINFO':
    case 'FIREBASE_WATCH_USERIS':
    case 'FIREBASE_WATCH_USERSETTINGS':
    case 'FIREBASE_WATCH_USERFILTERS':
      return makeFirebaseState(action, state, action.payload.key, action.payload.data);
    case 'FIREBASE_LOGIN':
    case 'FIREBASE_LOGOUT':
    case 'FIREBASE_LOGIN_ERROR':
      return updeep({
        authData: action.payload.authData,
        authError: action.payload.error
      }, state);
    default:
      return state;
  }
};


function makeFirebaseState(action, state, key, value, merge = false) {
  value = assign(state.data[key], {
    isLoaded: true,
  }, value);
  value = merge ? value : updeep.constant(value);
  const data = updeep.updateIn(key, value, state.data);
  return assign(state, {
    data,
  });
}
