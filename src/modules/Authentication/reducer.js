import { Map } from 'immutable';
import { AsyncStorage } from 'react-native';

import {
  STARTED,
  LOADED,
  LOGGED_IN_TO_FACEBOOK,
  LOGGED_IN_TO_FIREBASE,
  LOGGED_OUT,
} from './actionTypes';

export const initialState = Map({
  isLoaded: false,
  isInProgress: false,
  isLoggedIn: false,
  facebookToken: null,
  uid: null,
});

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    default: return state;
    case STARTED:
      return state.set('isLoaded', false).set('isInProgress', true);
    case LOADED:
      return state.set('isLoaded', true).set('isInProgress', false);
    case LOGGED_IN_TO_FACEBOOK:
      return state.set('facebookToken', action.payload.facebookToken);
    case LOGGED_IN_TO_FIREBASE:
      return state.set('isLoaded', true)
                  .set('isInProgress', false)
                  .set('isLoggedIn', true)
                  .set('uid', action.payload.uid);
    case LOGGED_OUT:
      return initialState;
  }
}
