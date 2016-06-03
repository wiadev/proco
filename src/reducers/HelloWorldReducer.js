import { Map } from 'immutable';
import { USER_LOGIN_SUCCESS, USER_LOGIN_ERROR } from './../core/actionList';

const initialState = Map({
  isLoggedIn: false,
  currentUser: null,
  authenticationToken: null,
});

export default function HelloWorldReducer(state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return state
        .set('isLoggedIn', true)
        .set('currentUser', action.payload.profile)
        .set('authenticationToken', action.payload.token);

    case USER_LOGIN_ERROR:
      return initialState;

    default:
      return state;
  }
}
