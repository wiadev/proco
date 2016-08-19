import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { hideStatusBar, showStatusBar } from '../StatusBar/actions';

import {
  STARTED,
  LOADED,
  SET,
  UNLOAD,
} from './actionTypes';

import {
  createAlert,
} from '../InAppAlert/actions';

import {
  loadUser,
  updateUser,
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

const getAuth = (isFacebookReturn = false) =>{
  return (dispatch) => {
    const login = (user = null) => {
      getFacebookAccessToken()
        .then(facebook_token => {
          if (user) dispatch(loadAuth(user, facebook_token));
          return firebase.auth().signInWithCredential(
            firebase.auth.FacebookAuthProvider.credential(facebook_token)
          ).then(user => {
            dispatch(loadAuth(user, facebook_token))
          });
        })
        .catch((e) => {
          dispatch(logout());
        });
    };

    if (isFacebookReturn) {
      login();
      return;
    }

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      login(user);
    });
  };
};


export const loadAuth = (user, facebook_token) => {
  return (dispatch, getState) => {
    const { auth } = getState();

    if (!(auth.uid && auth.facebook_token)) {
      if (!user && !facebook_token) {
        dispatch(getAuth());
        return;
      }
      
      const { uid, token } = user;

      dispatch({
        type: SET,
        payload: {
          uid,
          firebase_token: token,
          facebook_token,
        }
      });

      dispatch(updateUser('tokens', {
        facebook_token,
      }));

    }

    dispatch(loadUser('info'));

    dispatch(serverAction({
      type: 'USER_PING',
      payload: {
        event: 'LOGGED_IN'
      }
    }));

  }
};

export function login() {
  return (dispatch) => {

    dispatch({ type: STARTED });
    dispatch(hideStatusBar());
    LoginManager.logInWithReadPermissions(
      ['public_profile', 'user_likes', 'user_friends', 'user_birthday']
    ).then((result) => {
      dispatch(showStatusBar());

      if (result.isCancelled) {

        dispatch(createAlert({
          type: 'info',
          title: 'Login was cancelled by you',
          duration: 900
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
      dispatch({ type: 'RESET' });
      Actions.LoginPage();
    });
  }
}
