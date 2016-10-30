import { Record } from 'immutable';
import { authActions } from "./actions";

export const InitialAuthState = new Record({
  authenticated: false,
  uid: null,
  loaded: false,
});

export function authReducer(state = new InitialAuthState(), {payload, type}) {
  switch (type) {
    case authActions.SIGN_IN_FULFILLED:
      return state.merge({
        authenticated: true,
        uid: payload.uid,
        loaded: true,
      });

    case authActions.SIGN_OUT_FULFILLED:
      return state.merge({
        authenticated: false,
        uid: null,
        loaded: true,
      });

    default:
      return state;
  }
}
