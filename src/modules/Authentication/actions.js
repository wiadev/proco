const { LoginManager, AccessToken } = require('react-native-fbsdk');

import {
  STARTED,
  LOGGED_IN,
  LOGGED_OUT,
} from './actionTypes';

import {
  showInAppAlert,
} from '../InAppAlert/actions';

import {
  loadUser,
  unloadUser,
} from '../User/actions';

import {
  serverAction
} from '../../core/Api/actions';

const getAuth = () =>{
  return (dispatch) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {

      if (user) {
        dispatch(loadAuth(user.uid));
      } else {
        AccessToken.getCurrentAccessToken()
          .then(data => {

            if (data) {
              const facebookToken = data.accessToken.toString();

              firebase.auth().signInWithCredential(
                firebase.auth.FacebookAuthProvider.credential(facebookToken)
              ).then((user) => {
                dispatch(loadAuth(user.uid, facebookToken));
              });
            } else {
              dispatch({type: LOGGED_OUT});
            }

        });
      }

      unsubscribe();
    });
  };
};


export const loadAuth = (uid, facebookToken = null) => {
  return (dispatch) => {

    if (!uid) {
      dispatch(getAuth());
      return;
    }

    dispatch({
      type: LOGGED_IN,
      payload: {
        uid,
        facebookToken
      }
    });

    if (facebookToken) {
      dispatch(serverAction({
        type: 'USER_SET_FACEBOOK_TOKEN',
        payload: {
          facebookToken
        },
      }));
    }

    dispatch(loadUser());

  }
};

export function login() {
  return (dispatch) => {

    dispatch({ type: STARTED });
    LoginManager.logInWithReadPermissions(
      ['public_profile', 'user_likes', 'user_friends', 'user_birthday']
    ).then((result) => {
      if (result.isCancelled) {
        dispatch(showInAppAlert({
          type: 'error',
          title: 'Login was cancelled',
          message: 'You\'ve cancelled the login flow'
        }));
      } else {
        dispatch(getAuth());
      }
    });

  };
}

export function logout() {
  return dispatch => {
    AsyncStorage.clear().then(() => {
      dispatch({ type: LOGGED_OUT });
      dispatch(unloadUser());
    });
  }
}
