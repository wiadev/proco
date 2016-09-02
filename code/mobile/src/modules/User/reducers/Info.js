import { assign } from '../../../core/utils';
import { AsyncStorage } from 'react-native';

import {
  USER_UNLOAD,
} from '../actionTypes';

export const initialState = {
  isLoaded: false,
  fid: null,
  gender: null,
  first_name: null,
  birthday: null,
  email: null,
  unread_messages: 0,
};

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    default: return state;
    case 'USER_UPDATED_INFO':
      return assign(state, {
        isLoaded: true,
      }, action.payload);
    case USER_UNLOAD:
      return initialState;
  }
}
