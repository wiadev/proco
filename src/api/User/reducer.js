import { Map } from 'immutable';

// Actions
const LOADED = 'proco/user/LOADED';
const SAVED = 'proco/user/SAVED';

export const initialState = Map({
  isLoaded: false,
});

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    default: return state;
    case LOADED:

      return state.set('isLoaded', true)
        .set('isLoggedIn', !!(action.payload.uid))
        .set('isLoggedIntoFacebook', !!(action.payload.facebookToken))
        .set('name', action.payload.name)
        .set('photoUrl', action.payload.photoUrl)
        .set('uid', action.payload.uid)
        .set('firebaseToken', action.payload.firebaseToken)
        .set('facebookToken', action.payload.facebookToken);
  }
}

// Action Creators
export function loadUser(payload) {
  return { type: LOADED, payload: {...payload} };
}

export function goLoadUser() {
  return dispatch => {
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        const facebookToken = data.accessToken.toString();
        dispatch(setFacebookToken({
          facebookToken
        }));
        return firebase.auth().signInWithCredential(
          firebase.auth.FacebookAuthProvider.credential(facebookToken)
        );
      }
    );
  };
}
