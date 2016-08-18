import { Map } from 'immutable';
import { AsyncStorage } from 'react-native';

import {
  USER_STARTED_LOADING,
  USER_UPDATED,
  USER_UNLOAD,
} from '../actionTypes';

export const initialState = Map({
  hasStartedLoading: false,
  isLoaded: false,
  isLoggedIn: false,
  fid: null,
  gender: null,
  first_name: null,
  birthday: null,
  network_email: null,
  network_is_verified: false,
});

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    default: return state;
    case USER_STARTED_LOADING:
      return initialState.set('hasStartedLoading', true);
    case 'USER_UPDATED_INFO':
      return state.set('isLoaded', true)
                  .set('fid', action.payload.fid)
                  .set('gender', action.payload.gender)
                  .set('first_name', action.payload.first_name)
                  .set('birthday', action.payload.birthday)
                  .set('network_email', action.payload.network_email)
                  .set('network_is_verified', action.payload.network_is_verified);
    case USER_UNLOAD:
      return initialState;
  }
}
