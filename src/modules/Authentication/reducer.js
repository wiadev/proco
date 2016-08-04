import { Map } from 'immutable';

import {
  STARTED,
  LOGGED_IN,
  LOGGED_OUT,
} from './actionTypes';

export const initialState = Map({
  isLoaded: false,
  isInProgress: false,
  isLoggedIn: false,
  uid: null,
  facebookToken: null,
});

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    default: return state;
    case STARTED:
      return state.set('isLoaded', false)
                  .set('isInProgress', true);
    case LOGGED_IN:
      return state.set('isLoaded', true)
                  .set('isInProgress', false)
                  .set('isLoggedIn', true)
                  .set('uid', action.payload.uid)
                  .set('facebookToken', action.payload.facebookToken);
    case LOGGED_OUT:
      return initialState.set('isLoaded', true);
  }

}
