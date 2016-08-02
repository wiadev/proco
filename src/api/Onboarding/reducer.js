import { Map } from 'immutable';
import { AsyncStorage } from 'react-native';

import { Promised, Dispatcher } from '../Queue';

// Actions
const SAVE_BIRTHDAY = 'proco/auth/STARTED';
const SAVE_GENDER = 'proco/auth/LOADED';
const SEND_VERIFICATION_CODE = 'proco/auth/LOGGED_IN';
const CHECK_VERIFICATON_CODE = 'proco/auth/LOGGED_OUT';

export const initialState = Map({
  isLoaded: false,
  isLoggedIn: false
});

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    default: return state;
    case STARTED:
      return state.set('isLoaded', false);
    case LOADED:
      return state.set('isLoaded', true).set('isLoggedIn', false);
    case LOGGED_IN:
      return state.set('isLoaded', true)
        .set('isLoggedIn', true)
        .set('uid', action.payload.uid)
        .set('fid', action.payload.fid)
        .set('birthday', action.payload.birthday)
        .set('gender', action.payload.gender)
        .set('first_name', action.payload.first_name)
        .set('facebook_token', action.payload.facebook_token)
        .set('network', action.payload.network)
        .set('onboardingFormStatus', action.payload.onboardingFormStatus);
    case LOGGED_OUT:
      return initialState;
  }
}

// Action Creators
export function startAuth() {
  return { type: STARTED };
}

export function loadAuth(payload) {
  return { type: LOADED, payload: {...payload} };
}

export function login(payload) {
  console.log("payload", payload)
  return { type: LOGGED_IN, payload: {...payload} };
}

export function goLogin(facebookToken, uid) {
  return dispatch => {
    return Promised(Dispatcher('USER_LOGIN', {
      facebookToken,
      uid
    })).then(data => {
      console.log("data", data)
      dispatch(login(data.result))
    })
      .catch(e => {
        console.log("promise error", e)
      });
  };
}

export function logout() {
  return { type: LOGGED_OUT };
}

export function goLogout() {
  return dispatch => {
    AsyncStorage.clear().then(() => {
      dispatch(logout());
    });
  }
}
