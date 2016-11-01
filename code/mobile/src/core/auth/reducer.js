import { Record } from 'immutable';
import { SIGN_IN_FULFILLED, SIGN_OUT_FULFILLED} from "./actions";

export const InitialAuthState = new Record({
  authenticated: false,
  loaded: false,
  uid: null,
  name: null,
});

export default function authReducer(state = new InitialAuthState(), {payload, type}) {

  switch (type) {
    case SIGN_IN_FULFILLED:
      return state.merge({
        authenticated: true,
        loaded: true,
        uid: payload.uid,
        name: payload.name,
      });

    case SIGN_OUT_FULFILLED:
      return state.merge({
        authenticated: false,
        uid: null,
        loaded: true,
      });

    default:
      return state;
  }
}
