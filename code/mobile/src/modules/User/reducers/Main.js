import { assign } from '../../../core/utils';
import { AsyncStorage } from 'react-native';

import {
  USER_STARTED_LOADING,
  USER_UPDATED,
  USER_UNLOAD,
} from '../actionTypes';

export const initialState = {
  hasStartedLoading: false,
  isLoaded: false,
  isLoggedIn: false,
  fid: null,
  gender: null,
  first_name: null,
  birthday: null,
  network_email: null,
  network_is_verified: false,
};

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    default: return state;
    case USER_STARTED_LOADING:
      return assign(initialState, {
        hasStartedLoading: true,
      });
    case 'USER_UPDATED_INFO':
      return assign(state, {
        isLoaded: true,
      }, action.payload);
    case USER_UNLOAD:
      return initialState;
  }
}
