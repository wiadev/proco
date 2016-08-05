import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { AsyncStorage } from 'react-native';

import {
  STARTED,
  LOADED,
  SET,
  UNLOAD,
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

function getFacebookAccessToken() {

  return new Promise ((resolve, reject) => {
    return AccessToken.getCurrentAccessToken().then((data) => {
      if (data) {
        resolve(data.accessToken.toString());
      } else {
        reject();
      }
    });
  });

}

const getAuth = () =>{
  return (dispatch) => {

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {

      unsubscribe();

      getFacebookAccessToken()
        .then(facebookToken => {
          if (user) {
            dispatch(loadAuth(user.uid, facebookToken));
          } else {
            firebase.auth().signInWithCredential(
              firebase.auth.FacebookAuthProvider.credential(facebookToken)
            ).then((user) => {
              dispatch(loadAuth(user.uid, facebookToken));
            });
          }
        })
        .catch(() => dispatch(logout()));

    });
  };
};


export const loadAuth = (uid, facebookToken) => {
  return (dispatch, getState) => {

    if (!uid || !facebookToken) {
      const { auth } = getState();
      if(!uid) uid = auth.get('uid');
      if(!facebookToken) facebookToken = auth.get('facebookToken');
    }

    if (!uid || !facebookToken) {
      dispatch(getAuth());
      return;
    }

    dispatch({
      type: SET,
      payload: {
        uid,
        facebookToken,
      }
    });

    dispatch(loadUser());

    dispatch(serverAction({
      type: 'USER_SET_FACEBOOK_TOKEN',
      payload: {
        facebookToken
      }
    }));

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

        dispatch(logout());

      } else {
        dispatch(getAuth());
      }
    });

  };
}

export function logout() {
  return dispatch => {
    Promise.all([AsyncStorage.clear(), firebase.auth().signOut()]).then(() => {
      dispatch({ type: 'USER_LOGOUT' });
      dispatch({ type: LOADED });

      // go back to login
    });
  }
}
