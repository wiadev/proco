import { Map } from 'immutable';

import {
  STARTED,
  LOADED,
  SET,
  UNLOAD,
} from './actionTypes';

export const initialState = Map({
  isLoaded: false,
  isInProgress: false,
  uid: null,
  firebase_token: null,
  facebook_token: null,
});

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    default: return state;
    case STARTED:
      return state.set('isLoaded', false)
                  .set('isInProgress', true);
    case LOADED:
      return state.set('isLoaded', true)
                  .set('isInProgress', false);
    case SET:
      return state.set('isLoaded', true)
                  .set('isInProgress', false)
                  .set('uid', action.payload.uid)
                  .set('firebase_token', action.payload.firebase_token)
                  .set('facebook_token', action.payload.facebook_token);
    case UNLOAD:
      return initialState;
  }

}
