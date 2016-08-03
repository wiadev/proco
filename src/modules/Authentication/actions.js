import {
  STARTED,
  LOADED,
  LOGGED_IN_TO_FACEBOOK,
  LOGGED_IN_TO_FIREBASE,
  LOGGED_OUT,
} from './actionTypes';

export function loadAuth() {
  return (dispatch, getState) => {
    const { auth } = getState();

    if (auth.get('isLoaded')) return;

    dispatch({ type: STARTED });
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: LOGGED_IN_TO_FIREBASE,
          payload: {
            uid: user.uid
          }
        });
      } else {
        dispatch({ type: LOADED });
      }

      unsubscribe();
    });

  }
}

export function logout() {
  return dispatch => {
    AsyncStorage.clear().then(() => {
      dispatch({ type: LOGGED_OUT });
    });
  }
}
